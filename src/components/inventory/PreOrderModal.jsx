import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useInventory } from '../../hooks/useInventory'
import { useCurrency } from '../../hooks/useCurrency'

const { FiX, FiClock, FiUsers, FiCalendar, FiDollarSign, FiShield } = FiIcons

const PreOrderModal = ({ isOpen, onClose, product, inventory }) => {
  const [orderData, setOrderData] = useState({
    quantity: 1,
    size: '',
    color: '',
    paymentType: 'full', // 'full' or 'partial'
    guestInfo: {
      name: '',
      email: '',
      phone: ''
    },
    eventId: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Details, 2: Payment, 3: Confirmation

  const { placePreOrder } = useInventory(product?.id)
  const { formatPrice } = useCurrency()

  const calculateTotal = () => {
    return product?.price * orderData.quantity
  }

  const calculateDeposit = () => {
    return Math.round(calculateTotal() * 0.3) // 30% deposit
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const orderPayload = {
        ...orderData,
        totalAmount: calculateTotal(),
        amountPaid: orderData.paymentType === 'full' ? calculateTotal() : calculateDeposit()
      }

      const { error } = await placePreOrder(orderPayload)
      if (error) throw error

      setCurrentStep(3)
    } catch (err) {
      console.error('Error placing pre-order:', err)
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
        className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiClock} className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Pre-Order</h3>
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

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? '✓' : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Details</span>
            <span>Payment</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Pre-order Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <SafeIcon icon={FiCalendar} className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Expected Availability</p>
                    <p className="text-sm text-blue-700">
                      {inventory?.expected_arrival_date ? 
                        new Date(inventory.expected_arrival_date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 
                        'To be announced'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-blue-600">
                  <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1" />
                  <span className="text-sm">{inventory?.preorder_count || 0} people have pre-ordered</span>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <select
                      value={orderData.quantity}
                      onChange={(e) => handleChange('quantity', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Royal Blue, Gold, etc."
                  />
                </div>

                {/* Guest Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Contact Information</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={orderData.guestInfo.name}
                      onChange={(e) => handleChange('guestInfo.name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={orderData.guestInfo.email}
                      onChange={(e) => handleChange('guestInfo.email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={orderData.guestInfo.phone}
                      onChange={(e) => handleChange('guestInfo.phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                disabled={!orderData.guestInfo.name || !orderData.guestInfo.email}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Payment Options */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Payment Options</h4>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentType"
                      value="full"
                      checked={orderData.paymentType === 'full'}
                      onChange={(e) => handleChange('paymentType', e.target.value)}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Pay in Full</span>
                        <span className="text-lg font-bold text-gray-900">{formatPrice(calculateTotal())}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Pay the full amount now and secure your order
                      </p>
                      <div className="flex items-center mt-2 text-green-600">
                        <SafeIcon icon={FiShield} className="w-4 h-4 mr-1" />
                        <span className="text-sm">5% discount included</span>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentType"
                      value="partial"
                      checked={orderData.paymentType === 'partial'}
                      onChange={(e) => handleChange('paymentType', e.target.value)}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Partial Payment</span>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{formatPrice(calculateDeposit())}</div>
                          <div className="text-sm text-gray-500">30% deposit</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Pay {formatPrice(calculateDeposit())} now, remaining {formatPrice(calculateTotal() - calculateDeposit())} before shipment
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Product</span>
                    <span>{product?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity</span>
                    <span>{orderData.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size</span>
                    <span>{orderData.size || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Color</span>
                    <span>{orderData.color || 'Not specified'}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total Amount</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                    <div className="flex justify-between text-blue-600">
                      <span>Amount Due Now</span>
                      <span>{formatPrice(orderData.paymentType === 'full' ? calculateTotal() : calculateDeposit())}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Pre-Order'}
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Pre-Order Confirmed!
                </h4>
                <p className="text-gray-600">
                  Your pre-order has been successfully placed. We'll keep you updated on the production progress.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">What happens next?</h5>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  <li>• You'll receive an email confirmation shortly</li>
                  <li>• We'll notify you when production begins</li>
                  <li>• You'll get tracking info once shipping starts</li>
                  <li>• Expected delivery: {inventory?.expected_arrival_date ? 
                    new Date(inventory.expected_arrival_date).toLocaleDateString() : 
                    'TBA'}</li>
                </ul>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default PreOrderModal