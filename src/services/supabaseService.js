import { supabase } from '../lib/supabase'

// Auth Services
export const authService = {
  // Sign up new user
  async signUp(email, password, userData = {}) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name || `${userData.firstName} ${userData.lastName}`,
            role: userData.role || 'guest',
            phone: userData.phone,
            ...userData
          }
        }
      })
      
      if (error) throw error
      
      // If user role is vendor, create vendor profile
      if (userData.role === 'vendor' && data.user) {
        await this.createVendorProfile(data.user.id, userData)
      }
      
      return { data, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { data: null, error }
    }
  },

  // Sign in user
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { data: null, error }
    }
  },

  // Sign out user
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error }
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      return { user, error }
    } catch (error) {
      console.error('Get current user error:', error)
      return { user: null, error }
    }
  },

  // Update user profile
  async updateProfile(updates) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      })
      return { data, error }
    } catch (error) {
      console.error('Update profile error:', error)
      return { data: null, error }
    }
  },

  // Create vendor profile
  async createVendorProfile(userId, vendorData) {
    try {
      const { data, error } = await supabase
        .from('vendor_profiles')
        .insert([{
          user_id: userId,
          business_name: vendorData.businessName || vendorData.business_name,
          business_description: vendorData.businessDescription || vendorData.description,
          business_address: vendorData.businessAddress || vendorData.address,
          business_phone: vendorData.businessPhone || vendorData.phone,
          business_email: vendorData.businessEmail || vendorData.email,
          business_type: vendorData.businessType || vendorData.business_type,
          business_category: vendorData.businessCategory || vendorData.business_category,
          verification_status: 'pending'
        }])
        .select()

      return { data, error }
    } catch (error) {
      console.error('Create vendor profile error:', error)
      return { data: null, error }
    }
  },

  // Get user profile
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      return { data, error }
    } catch (error) {
      console.error('Get user profile error:', error)
      return { data: null, error }
    }
  },

  // Get vendor profile
  async getVendorProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('vendor_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      return { data, error }
    } catch (error) {
      console.error('Get vendor profile error:', error)
      return { data: null, error }
    }
  }
}

// Currency Services
export const currencyService = {
  // Get all currencies - fallback to mock data
  async getCurrencies() {
    try {
      const { data, error } = await supabase
        .from('currency_options')
        .select('*')
        .eq('active', true)
        .order('name', { ascending: true })
      
      if (error) throw error
      return { data, error }
    } catch (err) {
      // Fallback to mock data
      const mockCurrencies = [
        { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rate: 1.0 },
        { code: 'USD', name: 'US Dollar', symbol: '$', rate: 0.0012 },
        { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.0009 },
        { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.0011 }
      ]
      return { data: mockCurrencies, error: null }
    }
  },

  // Get currency by code
  async getCurrencyByCode(code) {
    try {
      const { data, error } = await supabase
        .from('currency_options')
        .select('*')
        .eq('code', code)
        .single()
      
      if (error) throw error
      return { data, error }
    } catch (err) {
      // Fallback to mock data
      const mockCurrency = { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rate: 1.0 }
      return { data: mockCurrency, error: null }
    }
  }
}

// Event Service
export const eventService = {
  async createEvent(eventData) {
    try {
      const { data: user } = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from('events')
        .insert([{
          user_id: user?.user?.id,
          ...eventData,
          created_at: new Date().toISOString()
        }])
        .select()
      
      return { data, error }
    } catch (error) {
      console.error('Create event error:', error)
      return { data: null, error }
    }
  },

  async getEvents(filters = {}) {
    try {
      const { data: user } = await supabase.auth.getUser()
      let query = supabase
        .from('events')
        .select('*')
        .eq('user_id', user?.user?.id)
      
      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status)
      }
      
      const { data, error } = await query.order('created_at', { ascending: false })
      return { data, error }
    } catch (error) {
      console.error('Get events error:', error)
      return { data: [], error }
    }
  },

  async getEvent(id) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()
      
      return { data, error }
    } catch (error) {
      console.error('Get event error:', error)
      return { data: null, error }
    }
  },

  async updateEvent(id, updates) {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
      
      return { data, error }
    } catch (error) {
      console.error('Update event error:', error)
      return { data: null, error }
    }
  },

  async deleteEvent(id) {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
      
      return { error }
    } catch (error) {
      console.error('Delete event error:', error)
      return { error }
    }
  }
}

// Guest Service
export const guestService = {
  async createGuest(guestData) {
    try {
      const { data, error } = await supabase
        .from('guests')
        .insert([{
          ...guestData,
          created_at: new Date().toISOString()
        }])
        .select()
      
      return { data, error }
    } catch (error) {
      console.error('Create guest error:', error)
      return { data: null, error }
    }
  },

  async getEventGuests(eventId) {
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false })
      
      return { data, error }
    } catch (error) {
      console.error('Get event guests error:', error)
      return { data: [], error }
    }
  },

  async getGuest(id) {
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('id', id)
        .single()
      
      return { data, error }
    } catch (error) {
      console.error('Get guest error:', error)
      return { data: null, error }
    }
  },

  async updateGuest(id, updates) {
    try {
      const { data, error } = await supabase
        .from('guests')
        .update(updates)
        .eq('id', id)
        .select()
      
      return { data, error }
    } catch (error) {
      console.error('Update guest error:', error)
      return { data: null, error }
    }
  },

  async deleteGuest(id) {
    try {
      const { error } = await supabase
        .from('guests')
        .delete()
        .eq('id', id)
      
      return { error }
    } catch (error) {
      console.error('Delete guest error:', error)
      return { error }
    }
  },

  async importGuests(guests, eventId) {
    try {
      // Add event_id and created_at to each guest
      const guestsWithEventId = guests.map(guest => ({
        ...guest,
        event_id: eventId,
        created_at: new Date().toISOString()
      }))
      
      const { data, error } = await supabase
        .from('guests')
        .insert(guestsWithEventId)
        .select()
      
      return { data, error }
    } catch (error) {
      console.error('Import guests error:', error)
      return { data: null, error }
    }
  }
}

export const inventoryService = {
  async getProductInventory(productId) {
    return { 
      data: {
        product_id: productId,
        stock_status: 'in_stock',
        available_stock: 10,
        total_stock: 20,
        reserved_stock: 0,
        waitlist_count: 0,
        preorder_count: 0,
        backorder_count: 0
      }, 
      error: null 
    }
  },
  async joinWaitlist(productId, guestData) {
    return { data: [{ id: 1, product_id: productId, ...guestData }], error: null }
  },
  async leaveWaitlist(productId) {
    return { error: null }
  },
  async placePreOrder(productId, orderData) {
    return { data: [{ id: 1, product_id: productId, ...orderData }], error: null }
  },
  async placeBackorder(productId, orderData) {
    return { data: [{ id: 1, product_id: productId, ...orderData }], error: null }
  },
  async reserveStock(productId, quantity, duration) {
    return { data: { id: 1, expires_at: new Date(Date.now() + duration * 60000) }, error: null }
  },
  async releaseReservation(productId) {
    return { error: null }
  },
  subscribeToWaitlistNotifications(callback) {
    return { unsubscribe: () => {} }
  },
  async markNotificationAsRead(notificationId) {
    return { error: null }
  }
}

// Add missing services for useSupabase hook
export const productService = {
  async getProducts(filters = {}) {
    return { data: [], error: null }
  },
  async createProduct(productData) {
    return { data: [{ id: Date.now(), ...productData }], error: null }
  },
  async updateProduct(id, updates) {
    return { data: [updates], error: null }
  }
}

export const vendorService = {
  async getVendors(filters = {}) {
    return { data: [], error: null }
  },
  async createVendor(vendorData) {
    return { data: [{ id: Date.now(), ...vendorData }], error: null }
  }
}

export const orderService = {
  async getUserOrders(userId) {
    return { data: [], error: null }
  },
  async getVendorOrders(vendorId) {
    return { data: [], error: null }
  },
  async createOrder(orderData) {
    return { data: [{ id: Date.now(), ...orderData }], error: null }
  },
  async updateOrderStatus(id, status) {
    return { data: [{ id, status }], error: null }
  }
}

export const reviewService = {
  async getProductReviews(productId) {
    return { data: [], error: null }
  },
  async getVendorReviews(vendorId) {
    return { data: [], error: null }
  },
  async createReview(reviewData) {
    return { data: [{ id: Date.now(), ...reviewData }], error: null }
  }
}

export default {
  authService,
  eventService,
  guestService,
  currencyService,
  inventoryService,
  productService,
  vendorService,
  orderService,
  reviewService
}