import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useInventory } from '../../hooks/useInventory'
import WaitlistModal from './WaitlistModal'
import PreOrderModal from './PreOrderModal'
import BackOrderModal from './BackOrderModal'

const { FiShoppingCart, FiClock, FiUsers, FiPackage, FiAlertCircle } = FiIcons

const InventoryActionButton = ({ product, inventory, className = "", onAddToCart }) => {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const [showPreOrderModal, setShowPreOrderModal] = useState(false)
  const [showBackOrderModal, setShowBackOrderModal] = useState(false)
  const [reservationTimer, setReservationTimer] = useState(null)
  
  const { reserveStock, releaseReservation } = useInventory(product?.id)

  // Handle reservation timer
  useEffect(() => {
    if (inventory?.user_reserved && inventory?.reservation_expires) {
      const expiresAt = new Date(inventory.reservation_expires)
      const now = new Date()
      const timeLeft = expiresAt - now

      if (timeLeft > 0) {
        const timer = setInterval(() => {
          const remaining = expiresAt - new Date()
          if (remaining <= 0) {
            setReservationTimer(null)
            clearInterval(timer)
          } else {
            setReservationTimer(Math.ceil(remaining / 1000 / 60)) // minutes
          }
        }, 1000)

        return () => clearInterval(timer)
      }
    }
  }, [inventory])

  const handleAddToCart = async () => {
    if (inventory?.stock_status === 'in_stock' && inventory?.available_stock > 0) {
      // Reserve stock first
      const { error } = await reserveStock(1, 30) // Reserve for 30 minutes
      if (!error) {
        onAddToCart?.(product?.id)
      }
    }
  }

  const getButtonConfig = () => {
    if (!inventory) {
      return {
        text: 'Check Availability',
        icon: FiAlertCircle,
        className: 'bg-gray-300 text-gray-500 cursor-not-allowed',
        disabled: true
      }
    }

    const { stock_status, available_stock, user_reserved } = inventory

    // If user has reserved stock
    if (user_reserved) {
      return {
        text: `Reserved (${reservationTimer}m left)`,
        icon: FiClock,
        className: 'bg-orange-500 text-white hover:bg-orange-600',
        disabled: false,
        action: handleAddToCart
      }
    }

    switch (stock_status) {
      case 'in_stock':
        if (available_stock <= 0) {
          return {
            text: 'Out of Stock',
            icon: FiUsers,
            className: 'bg-gray-500 text-white hover:bg-gray-600',
            disabled: false,
            action: () => setShowWaitlistModal(true)
          }
        }
        return {
          text: available_stock <= 5 ? `Add to Cart (${available_stock} left)` : 'Add to Cart',
          icon: FiShoppingCart,
          className: 'bg-primary-600 text-white hover:bg-primary-700',
          disabled: false,
          action: handleAddToCart
        }

      case 'preorder':
        return {
          text: 'Pre-Order Now',
          icon: FiClock,
          className: 'bg-blue-600 text-white hover:bg-blue-700',
          disabled: false,
          action: () => setShowPreOrderModal(true)
        }

      case 'backorder':
        return {
          text: 'Backorder Available',
          icon: FiPackage,
          className: 'bg-yellow-600 text-white hover:bg-yellow-700',
          disabled: false,
          action: () => setShowBackOrderModal(true)
        }

      case 'out_of_stock':
        return {
          text: `Join Waitlist (${inventory.waitlist_count || 0} waiting)`,
          icon: FiUsers,
          className: 'bg-purple-600 text-white hover:bg-purple-700',
          disabled: false,
          action: () => setShowWaitlistModal(true)
        }

      default:
        return {
          text: 'Unavailable',
          icon: FiAlertCircle,
          className: 'bg-gray-300 text-gray-500 cursor-not-allowed',
          disabled: true
        }
    }
  }

  const config = getButtonConfig()

  return (
    <>
      <motion.button
        whileHover={{ scale: config.disabled ? 1 : 1.02 }}
        whileTap={{ scale: config.disabled ? 1 : 0.98 }}
        onClick={config.action}
        disabled={config.disabled}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center space-x-2 ${config.className} ${className}`}
      >
        <SafeIcon icon={config.icon} className="w-5 h-5" />
        <span>{config.text}</span>
      </motion.button>

      {/* Modals */}
      <WaitlistModal
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
        product={product}
        inventory={inventory}
      />

      <PreOrderModal
        isOpen={showPreOrderModal}
        onClose={() => setShowPreOrderModal(false)}
        product={product}
        inventory={inventory}
      />

      <BackOrderModal
        isOpen={showBackOrderModal}
        onClose={() => setShowBackOrderModal(false)}
        product={product}
        inventory={inventory}
      />

      {/* Reservation Warning */}
      {reservationTimer && reservationTimer <= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded-lg"
        >
          <p className="text-sm text-orange-700 text-center">
            ⚠️ Your reservation expires in {reservationTimer} minute{reservationTimer !== 1 ? 's' : ''}!
          </p>
        </motion.div>
      )}
    </>
  )
}

export default InventoryActionButton