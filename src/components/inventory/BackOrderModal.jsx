import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useInventory } from '../../hooks/useInventory'
import { useCurrency } from '../../hooks/useCurrency'

const { FiX, FiPackage, FiTruck, FiCalendar, FiAlertCircle, FiCheck } = FiIcons

const BackOrderModal = ({ isOpen, onClose, product, inventory }) => {
  const [orderData, setOrderData] = useState({
    quantity: 1,
    size: '',
    color: '',
    priorityLevel: 'standard',
    guestInfo: {
      name: '',
      email: '',
      phone: ''
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { placeBackorder } = useInventory(product?.id)
  const { formatPrice } = useCurrency()

  const deliveryEstimates = {
    standard: { days: '7-14', price: 0 },
    priority: { days: '5-10', price: 5000 },
    express: { days: '3-7', price: 10000 }
  }

  const calculateTotal = () => {
    const basePrice = product?.price * orderData.quantity
    const priorityFee = deliveryEstimates[orderData.priorityLevel].price
    return basePrice + priorityFee
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const estimatedDelivery = new Date()
      const maxDays = parseInt(deliveryEstimates[orderData.priorityLevel].days.split('-')[1])
      estimatedDelivery.setDate(estimatedDelivery.getDate() + maxDays)

      const orderPayload = {
        ...orderData,
        amountPaid: calculateTotal(),
        estimatedDelivery: estimatedDelivery.toISOString()
      }

      const { error } = await placeBackorder(orderPayload)
      if (error) throw error

      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        setOrderData({
          quantity: 1,
          size: '',
          color: '',
          priorityLevel: 'standard',
          guestInfo: { name: '', email: '', phone: '' }
        })
      }, 3000)
    } catch (err) {
      console.error('Error placing backorder:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setOrderData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setOrderData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiPackage} className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Place Backorder</h3>
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
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Backorder Confirmed!
                </h4>
                <p className="text-gray-600 mb-4">
                  Your order has been placed and you're in the fulfillment queue.
                </p>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    Expected delivery: {deliveryEstimates[orderData.priorityLevel].days} working days
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Backorder Info */}
              <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Temporary Stock Shortage</h4>
                    <p className="text-sm text-yellow-700 mb-2">
                      This item is temporarily out of stock, but we can fulfill your order soon.
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <SafeIcon icon={FiPackage} className="w-4 h-4 mr-1" />
                      <span>{inventory?.backorder_count || 0} orders in queue</span>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <select
                      value={orderData.quantity}
                      onChange={(e) => handleChange('quantity', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <select
                      value={orderData.size}
                      onChange={(e) => handleChange('size', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="">Select size</option>
                      <option value="small">Small (2.5 yards)</option>
                      <option value="medium">Medium (3 yards)</option>
                      <option value="large">Large (5 yards)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color Preference
                  </label>
                  <input
                    type="text"
                    value={orderData.color}
                    onChange={(e) => handleChange('color', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="e.g., Royal Blue, Gold, etc."
                  />
                </div>

                {/* Priority Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Priority
                  </label>
                  <div className="space-y-3">
                    {Object.entries(deliveryEstimates).map(([key, { days, price }]) => (
                      <label key={key} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="priorityLevel"
                          value={key}
                          checked={orderData.priorityLevel === key}
                          onChange={(e) => handleChange('priorityLevel', e.target.value)}
                          className="mt-1 text-yellow-600 focus:ring-yellow-500"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900 capitalize">{key}</span>
                            <span className="text-sm text-gray-600">
                              {price > 0 ? `+${formatPrice(price)}` : 'Free'}
                            </span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <SafeIcon icon={FiTruck} className="w-4 h-4 mr-1" />
                            <span>{days} working days</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Contact Information</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={orderData.guestInfo.name}
                      onChange={(e) => handleChange('guestInfo.name', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={orderData.guestInfo.email}
                      onChange={(e) => handleChange('guestInfo.email', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={orderData.guestInfo.phone}
                      onChange={(e) => handleChange('guestInfo.phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Product ({orderData.quantity}x)</span>
                      <span>{formatPrice(product?.price * orderData.quantity)}</span>
                    </div>
                    {deliveryEstimates[orderData.priorityLevel].price > 0 && (
                      <div className="flex justify-between">
                        <span>Priority Fee</span>
                        <span>{formatPrice(deliveryEstimates[orderData.priorityLevel].price)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatPrice(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-900 mb-1">Backorder Terms:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Payment processed immediately</li>
                    <li>• Priority fulfillment when stock arrives</li>
                    <li>• Regular updates on delivery progress</li>
                    <li>• Full refund if unable to fulfill</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !orderData.guestInfo.name || !orderData.guestInfo.email}
                  className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : `Place Backorder - ${formatPrice(calculateTotal())}`}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default BackOrderModal