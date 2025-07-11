import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPackage, FiTruck, FiCheck, FiClock, FiMapPin, FiCalendar, FiPhone, FiMail, FiUser } = FiIcons;

const OrderTracking = () => {
  const { orderId } = useParams();

  // Mock order data - replace with actual API call
  const order = {
    id: orderId || 'ORD-001',
    status: 'in_transit',
    customer: {
      name: 'Adunni Johnson',
      email: 'adunni@email.com',
      phone: '+234 803 123 4567',
      address: '123 Lagos Street, Victoria Island, Lagos'
    },
    product: {
      name: 'Premium French Lace',
      quantity: 2,
      price: 35000,
      image: 'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=200&h=200&fit=crop'
    },
    timeline: [
      {
        status: 'order_placed',
        date: '2024-01-15T10:30:00',
        description: 'Order placed successfully'
      },
      {
        status: 'payment_confirmed',
        date: '2024-01-15T10:35:00',
        description: 'Payment confirmed'
      },
      {
        status: 'processing',
        date: '2024-01-15T14:20:00',
        description: 'Order is being processed'
      },
      {
        status: 'in_transit',
        date: '2024-01-16T09:15:00',
        description: 'Order has been shipped'
      }
    ],
    expectedDelivery: '2024-01-18',
    carrier: {
      name: 'Express Delivery',
      trackingNumber: 'TRK123456789'
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'order_placed':
        return FiPackage;
      case 'payment_confirmed':
        return FiCheck;
      case 'processing':
        return FiClock;
      case 'in_transit':
        return FiTruck;
      case 'delivered':
        return FiCheck;
      default:
        return FiPackage;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'order_placed':
        return 'bg-blue-500';
      case 'payment_confirmed':
        return 'bg-green-500';
      case 'processing':
        return 'bg-yellow-500';
      case 'in_transit':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Order Tracking</h1>
              <p className="text-gray-600">Order #{order.id}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                In Transit
              </span>
              <span className="text-gray-500">|</span>
              <div className="flex items-center text-gray-600">
                <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                Expected: {new Date(order.expectedDelivery).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tracking Timeline */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Tracking Timeline</h2>
            <div className="space-y-8">
              {order.timeline.map((event, index) => (
                <div key={event.status} className="relative">
                  {index < order.timeline.length - 1 && (
                    <div className="absolute top-8 left-4 w-0.5 h-full bg-gray-200"></div>
                  )}
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full ${getStatusColor(event.status)} flex items-center justify-center text-white z-10`}>
                      <SafeIcon icon={getStatusIcon(event.status)} className="w-4 h-4" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">
                        {event.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            {/* Product Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
              <div className="flex items-center space-x-4">
                <img src={order.product.image} alt={order.product.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="font-medium text-gray-900">{order.product.name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {order.product.quantity}</p>
                  <p className="text-sm font-medium text-primary-600">
                    {formatPrice(order.product.price * order.product.quantity)}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{order.customer.name}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiMapPin} className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-600">{order.customer.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-600">{order.customer.phone}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-600">{order.customer.email}</p>
                </div>
              </div>
            </div>

            {/* Carrier Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Carrier Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Carrier</p>
                  <p className="font-medium text-gray-900">{order.carrier.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tracking Number</p>
                  <p className="font-medium text-gray-900">{order.carrier.trackingNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;