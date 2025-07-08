import React from 'react'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'

const { FiPackage, FiClock, FiUsers, FiAlertTriangle, FiCheck } = FiIcons

const StockStatusBadge = ({ inventory, className = "" }) => {
  if (!inventory) return null

  const getStatusConfig = () => {
    const { stock_status, available_stock, total_stock, preorder_available, backorder_available } = inventory

    switch (stock_status) {
      case 'in_stock':
        if (available_stock <= 5) {
          return {
            icon: FiAlertTriangle,
            text: `Only ${available_stock} left!`,
            className: 'bg-orange-100 text-orange-800 border-orange-200',
            urgent: true
          }
        }
        return {
          icon: FiCheck,
          text: 'In Stock',
          className: 'bg-green-100 text-green-800 border-green-200'
        }
      
      case 'preorder':
        return {
          icon: FiClock,
          text: 'Pre-order Available',
          className: 'bg-blue-100 text-blue-800 border-blue-200'
        }
      
      case 'backorder':
        return {
          icon: FiPackage,
          text: 'Backorder Available',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        }
      
      case 'out_of_stock':
        return {
          icon: FiUsers,
          text: 'Join Waitlist',
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        }
      
      default:
        return {
          icon: FiPackage,
          text: 'Check Availability',
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.className} ${className}`}>
      <SafeIcon icon={config.icon} className="w-4 h-4 mr-1" />
      <span className={config.urgent ? 'animate-pulse' : ''}>{config.text}</span>
    </div>
  )
}

export default StockStatusBadge