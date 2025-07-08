import React from 'react'
import { motion } from 'framer-motion'

const StockProgressBar = ({ inventory, showReserved = true, className = "" }) => {
  if (!inventory) return null

  const { total_stock, available_stock, reserved_stock, preorder_count, waitlist_count } = inventory

  // Calculate percentages
  const availablePercentage = (available_stock / total_stock) * 100
  const reservedPercentage = showReserved ? (reserved_stock / total_stock) * 100 : 0
  const usedPercentage = 100 - availablePercentage - reservedPercentage

  const getStockColor = () => {
    if (availablePercentage > 50) return 'bg-green-500'
    if (availablePercentage > 20) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div className="flex h-full">
          {/* Used Stock */}
          {usedPercentage > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${usedPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gray-400"
            />
          )}
          
          {/* Reserved Stock */}
          {reservedPercentage > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${reservedPercentage}%` }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="bg-yellow-400"
            />
          )}
          
          {/* Available Stock */}
          {availablePercentage > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${availablePercentage}%` }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className={getStockColor()}
            />
          )}
        </div>
      </div>

      {/* Stock Info */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex space-x-4">
          <span className="text-gray-600">
            <span className="font-medium text-gray-900">{available_stock}</span> available
          </span>
          {showReserved && reserved_stock > 0 && (
            <span className="text-gray-600">
              <span className="font-medium text-yellow-600">{reserved_stock}</span> reserved
            </span>
          )}
          <span className="text-gray-600">
            <span className="font-medium text-gray-900">{total_stock}</span> total
          </span>
        </div>
        
        {/* Demand Indicators */}
        <div className="flex space-x-3 text-xs">
          {preorder_count > 0 && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {preorder_count} pre-orders
            </span>
          )}
          {waitlist_count > 0 && (
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              {waitlist_count} waiting
            </span>
          )}
        </div>
      </div>

      {/* FOMO Message */}
      {availablePercentage < 30 && available_stock > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-red-600 text-sm font-medium animate-pulse">
            🔥 High demand! Only {available_stock} left
          </p>
        </div>
      )}
    </div>
  )
}

export default StockProgressBar