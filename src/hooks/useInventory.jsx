import { useState, useEffect } from 'react'
import { inventoryService } from '../services/supabaseService'

export const useInventory = (productId) => {
  const [inventory, setInventory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (productId) {
      fetchInventory()
    }
  }, [productId])

  const fetchInventory = async () => {
    try {
      setLoading(true)
      const { data, error } = await inventoryService.getProductInventory(productId)
      if (error) throw error
      setInventory(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const joinWaitlist = async (guestData) => {
    try {
      const { data, error } = await inventoryService.joinWaitlist(productId, guestData)
      if (error) throw error
      // Update local state
      setInventory(prev => ({
        ...prev,
        waitlist_count: prev.waitlist_count + 1,
        user_waitlisted: true
      }))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  const leaveWaitlist = async () => {
    try {
      const { error } = await inventoryService.leaveWaitlist(productId)
      if (error) throw error
      setInventory(prev => ({
        ...prev,
        waitlist_count: Math.max(0, prev.waitlist_count - 1),
        user_waitlisted: false
      }))
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  const placePreOrder = async (orderData) => {
    try {
      const { data, error } = await inventoryService.placePreOrder(productId, orderData)
      if (error) throw error
      setInventory(prev => ({
        ...prev,
        preorder_count: prev.preorder_count + 1,
        user_preordered: true
      }))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  const placeBackorder = async (orderData) => {
    try {
      const { data, error } = await inventoryService.placeBackorder(productId, orderData)
      if (error) throw error
      setInventory(prev => ({
        ...prev,
        backorder_count: prev.backorder_count + 1,
        user_backordered: true
      }))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  const reserveStock = async (quantity = 1, duration = 30) => {
    try {
      const { data, error } = await inventoryService.reserveStock(productId, quantity, duration)
      if (error) throw error
      setInventory(prev => ({
        ...prev,
        available_stock: prev.available_stock - quantity,
        user_reserved: true,
        reservation_expires: data.expires_at
      }))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  const releaseReservation = async () => {
    try {
      const { error } = await inventoryService.releaseReservation(productId)
      if (error) throw error
      await fetchInventory() // Refresh to get updated stock
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  return {
    inventory,
    loading,
    error,
    refetch: fetchInventory,
    joinWaitlist,
    leaveWaitlist,
    placePreOrder,
    placeBackorder,
    reserveStock,
    releaseReservation
  }
}

export const useWaitlistNotifications = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Listen for real-time waitlist notifications
    const subscription = inventoryService.subscribeToWaitlistNotifications((notification) => {
      setNotifications(prev => [notification, ...prev])
    })

    return () => subscription?.unsubscribe()
  }, [])

  const markAsRead = async (notificationId) => {
    try {
      await inventoryService.markNotificationAsRead(notificationId)
      setNotifications(prev => prev.filter(n => n.id !== notificationId))
    } catch (err) {
      console.error('Error marking notification as read:', err)
    }
  }

  return {
    notifications,
    markAsRead
  }
}