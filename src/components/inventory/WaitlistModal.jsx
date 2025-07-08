import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useInventory } from '../../hooks/useInventory'

const { FiX, FiBell, FiUsers, FiMail, FiUser, FiPhone } = FiIcons

const WaitlistModal = ({ isOpen, onClose, product, inventory }) => {
  const [guestData, setGuestData] = useState({
    name: '',
    email: '',
    phone: '',
    notifyVia: 'email' // 'email', 'sms', 'both'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { joinWaitlist } = useInventory(product?.id)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await joinWaitlist(guestData)
      
      if (error) throw error
      
      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        setGuestData({ name: '', email: '', phone: '', notifyVia: 'email' })
      }, 2000)
    } catch (err) {
      console.error('Error joining waitlist:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setGuestData({
      ...guestData,
      [e.target.name]: e.target.value
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiBell} className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Join Waitlist</h3>
              <p className="text-sm text-gray-600">{product?.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <SafeIcon icon={FiX} className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiUsers} className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                You're on the list!
              </h4>
              <p className="text-gray-600 mb-4">
                We'll notify you as soon as this item is back in stock.
              </p>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-700">
                  You're #{inventory?.waitlist_count + 1} in line
                </p>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Waitlist Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Current Waitlist</span>
                  <div className="flex items-center text-purple-600">
                    <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1" />
                    <span className="font-medium">{inventory?.waitlist_count || 0} people waiting</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {/* Mock avatars for visual appeal */}
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-medium"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">and others are waiting</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={guestData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={guestData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={guestData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+234 803 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How would you like to be notified?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'email', label: 'Email only' },
                      { value: 'sms', label: 'SMS only' },
                      { value: 'both', label: 'Both email and SMS' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="notifyVia"
                          value={option.value}
                          checked={guestData.notifyVia === option.value}
                          onChange={handleChange}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Expected Delivery Info */}
                {inventory?.estimated_restock_date && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Expected back in stock:</strong>{' '}
                      {new Date(inventory.estimated_restock_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !guestData.name || !guestData.email}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>

              {/* Benefits */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Waitlist Benefits:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• First to know when back in stock</li>
                  <li>• 24-hour priority access window</li>
                  <li>• No commitment required</li>
                  <li>• Unsubscribe anytime</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default WaitlistModal