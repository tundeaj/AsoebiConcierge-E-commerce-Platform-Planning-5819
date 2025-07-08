import { supabase } from '../lib/supabase'

export const inventoryService = {
  // Get product inventory status
  async getProductInventory(productId) {
    const { data, error } = await supabase
      .from('product_inventory_asoebi2024')
      .select(`
        *,
        waitlist_count:waitlist_asoebi2024(count),
        preorder_count:preorders_asoebi2024(count),
        backorder_count:backorders_asoebi2024(count),
        user_waitlisted:waitlist_asoebi2024!inner(id),
        user_preordered:preorders_asoebi2024!inner(id),
        user_backordered:backorders_asoebi2024!inner(id),
        user_reserved:stock_reservations_asoebi2024!inner(id)
      `)
      .eq('product_id', productId)
      .single()

    return { data, error }
  },

  // Join waitlist
  async joinWaitlist(productId, guestData) {
    const { data: user } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from('waitlist_asoebi2024')
      .insert([{
        product_id: productId,
        user_id: user?.user?.id,
        guest_email: guestData.email,
        guest_name: guestData.name,
        guest_phone: guestData.phone,
        joined_at: new Date().toISOString()
      }])
      .select()

    return { data, error }
  },

  // Leave waitlist
  async leaveWaitlist(productId) {
    const { data: user } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('waitlist_asoebi2024')
      .delete()
      .eq('product_id', productId)
      .eq('user_id', user?.user?.id)

    return { error }
  },

  // Place pre-order
  async placePreOrder(productId, orderData) {
    const { data: user } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from('preorders_asoebi2024')
      .insert([{
        product_id: productId,
        user_id: user?.user?.id,
        quantity: orderData.quantity,
        size: orderData.size,
        color: orderData.color,
        payment_type: orderData.paymentType, // 'full' or 'partial'
        amount_paid: orderData.amountPaid,
        total_amount: orderData.totalAmount,
        guest_info: orderData.guestInfo,
        event_id: orderData.eventId,
        status: 'confirmed',
        created_at: new Date().toISOString()
      }])
      .select()

    return { data, error }
  },

  // Place backorder
  async placeBackorder(productId, orderData) {
    const { data: user } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from('backorders_asoebi2024')
      .insert([{
        product_id: productId,
        user_id: user?.user?.id,
        quantity: orderData.quantity,
        size: orderData.size,
        color: orderData.color,
        amount_paid: orderData.amountPaid,
        guest_info: orderData.guestInfo,
        event_id: orderData.eventId,
        priority_level: orderData.priorityLevel || 'standard',
        estimated_delivery: orderData.estimatedDelivery,
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select()

    return { data, error }
  },

  // Reserve stock temporarily
  async reserveStock(productId, quantity, durationMinutes = 30) {
    const { data: user } = await supabase.auth.getUser()
    const expiresAt = new Date(Date.now() + durationMinutes * 60 * 1000).toISOString()

    const { data, error } = await supabase
      .from('stock_reservations_asoebi2024')
      .insert([{
        product_id: productId,
        user_id: user?.user?.id,
        quantity: quantity,
        expires_at: expiresAt,
        status: 'active'
      }])
      .select()

    return { data: data?.[0], error }
  },

  // Release reservation
  async releaseReservation(productId) {
    const { data: user } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('stock_reservations_asoebi2024')
      .update({ status: 'released' })
      .eq('product_id', productId)
      .eq('user_id', user?.user?.id)
      .eq('status', 'active')

    return { error }
  },

  // Update inventory status (admin/vendor function)
  async updateInventoryStatus(productId, updates) {
    const { data, error } = await supabase
      .from('product_inventory_asoebi2024')
      .update(updates)
      .eq('product_id', productId)
      .select()

    return { data, error }
  },

  // Notify waitlist when stock available
  async notifyWaitlist(productId, message) {
    // Get all waitlisted users for this product
    const { data: waitlistUsers, error: waitlistError } = await supabase
      .from('waitlist_asoebi2024')
      .select('*')
      .eq('product_id', productId)
      .eq('notified', false)

    if (waitlistError || !waitlistUsers?.length) return { error: waitlistError }

    // Create notifications
    const notifications = waitlistUsers.map(user => ({
      product_id: productId,
      user_id: user.user_id,
      guest_email: user.guest_email,
      message: message,
      type: 'stock_available',
      created_at: new Date().toISOString()
    }))

    const { data, error } = await supabase
      .from('waitlist_notifications_asoebi2024')
      .insert(notifications)

    // Mark waitlist entries as notified
    await supabase
      .from('waitlist_asoebi2024')
      .update({ 
        notified: true, 
        notified_at: new Date().toISOString() 
      })
      .eq('product_id', productId)

    return { data, error }
  },

  // Subscribe to real-time notifications
  subscribeToWaitlistNotifications(callback) {
    const { data: user } = supabase.auth.getUser()

    return supabase
      .channel('waitlist_notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'waitlist_notifications_asoebi2024',
        filter: `user_id=eq.${user?.user?.id}`
      }, callback)
      .subscribe()
  },

  // Mark notification as read
  async markNotificationAsRead(notificationId) {
    const { error } = await supabase
      .from('waitlist_notifications_asoebi2024')
      .update({ read_at: new Date().toISOString() })
      .eq('id', notificationId)

    return { error }
  },

  // Get delivery estimates
  async getDeliveryEstimates(productId, location) {
    const { data, error } = await supabase
      .from('delivery_estimates_asoebi2024')
      .select('*')
      .eq('product_id', productId)
      .eq('location', location)
      .single()

    return { data, error }
  },

  // Auto-cleanup expired reservations
  async cleanupExpiredReservations() {
    const { error } = await supabase
      .from('stock_reservations_asoebi2024')
      .update({ status: 'expired' })
      .lt('expires_at', new Date().toISOString())
      .eq('status', 'active')

    return { error }
  }
}

export default inventoryService