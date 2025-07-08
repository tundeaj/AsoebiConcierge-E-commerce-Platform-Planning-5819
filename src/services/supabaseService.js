import { supabase } from '../lib/supabase'

// Auth Services
export const authService = {
  // Sign up new user
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Sign in user
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out user
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Update user profile
  async updateProfile(updates) {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    })
    return { data, error }
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

// Mock services for all other functionality
export const eventService = {
  async createEvent(eventData) {
    return { data: [{ id: 1, ...eventData }], error: null }
  },
  async getEvents(filters = {}) {
    return { data: [], error: null }
  },
  async getEvent(id) {
    return { data: null, error: null }
  },
  async updateEvent(id, updates) {
    return { data: [updates], error: null }
  },
  async deleteEvent(id) {
    return { data: null, error: null }
  }
}

export const guestService = {
  async createGuest(guestData) {
    return { data: [{ id: Date.now(), ...guestData }], error: null }
  },
  async getEventGuests(eventId) {
    return { data: [], error: null }
  },
  async getGuest(id) {
    return { data: null, error: null }
  },
  async updateGuest(id, updates) {
    return { data: [updates], error: null }
  },
  async deleteGuest(id) {
    return { data: null, error: null }
  },
  async importGuests(guests, eventId) {
    return { data: guests.map((g, i) => ({ id: i, ...g })), error: null }
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