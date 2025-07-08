import { useState, useEffect } from 'react'
import { eventService, productService, vendorService, orderService, reviewService } from '../services/supabaseService'

// Custom hooks for different entities
export const useEvents = (filters = {}) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await eventService.getEvents(filters)
      if (error) throw error
      setEvents(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createEvent = async (eventData) => {
    try {
      const { data, error } = await eventService.createEvent(eventData)
      if (error) throw error
      setEvents(prev => [data[0], ...prev])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  const updateEvent = async (id, updates) => {
    try {
      const { data, error } = await eventService.updateEvent(id, updates)
      if (error) throw error
      setEvents(prev => prev.map(event => event.id === id ? { ...event, ...data[0] } : event))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  const deleteEvent = async (id) => {
    try {
      const { error } = await eventService.deleteEvent(id)
      if (error) throw error
      setEvents(prev => prev.filter(event => event.id !== id))
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent
  }
}

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await productService.getProducts(filters)
      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (productData) => {
    try {
      const { data, error } = await productService.createProduct(productData)
      if (error) throw error
      setProducts(prev => [data[0], ...prev])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  const updateProduct = async (id, updates) => {
    try {
      const { data, error } = await productService.updateProduct(id, updates)
      if (error) throw error
      setProducts(prev => prev.map(product => product.id === id ? { ...product, ...data[0] } : product))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    createProduct,
    updateProduct
  }
}

export const useVendors = (filters = {}) => {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchVendors()
  }, [])

  const fetchVendors = async () => {
    try {
      setLoading(true)
      const { data, error } = await vendorService.getVendors(filters)
      if (error) throw error
      setVendors(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createVendor = async (vendorData) => {
    try {
      const { data, error } = await vendorService.createVendor(vendorData)
      if (error) throw error
      setVendors(prev => [data[0], ...prev])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  return {
    vendors,
    loading,
    error,
    refetch: fetchVendors,
    createVendor
  }
}

export const useOrders = (userId = null, vendorId = null) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (userId || vendorId) {
      fetchOrders()
    }
  }, [userId, vendorId])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      let data, error
      if (userId) {
        ({ data, error } = await orderService.getUserOrders(userId))
      } else if (vendorId) {
        ({ data, error } = await orderService.getVendorOrders(vendorId))
      }
      if (error) throw error
      setOrders(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createOrder = async (orderData) => {
    try {
      const { data, error } = await orderService.createOrder(orderData)
      if (error) throw error
      setOrders(prev => [data[0], ...prev])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  const updateOrderStatus = async (id, status) => {
    try {
      const { data, error } = await orderService.updateOrderStatus(id, status)
      if (error) throw error
      setOrders(prev => prev.map(order => order.id === id ? { ...order, status } : order))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    createOrder,
    updateOrderStatus
  }
}

export const useReviews = (productId = null, vendorId = null) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (productId || vendorId) {
      fetchReviews()
    }
  }, [productId, vendorId])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      let data, error
      if (productId) {
        ({ data, error } = await reviewService.getProductReviews(productId))
      } else if (vendorId) {
        ({ data, error } = await reviewService.getVendorReviews(vendorId))
      }
      if (error) throw error
      setReviews(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createReview = async (reviewData) => {
    try {
      const { data, error } = await reviewService.createReview(reviewData)
      if (error) throw error
      setReviews(prev => [data[0], ...prev])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  return {
    reviews,
    loading,
    error,
    refetch: fetchReviews,
    createReview
  }
}