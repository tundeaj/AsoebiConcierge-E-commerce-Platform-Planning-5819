import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiDollarSign, FiPackage, FiUsers, FiTrendingUp, FiPlus, FiEdit, 
  FiEye, FiTrash2, FiDownload, FiUpload, FiSettings, FiStar,
  FiShoppingBag, FiClock, FiTruck, FiAlertCircle, FiCheckCircle
} = FiIcons;

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');

  // Mock vendor data
  const vendorStats = {
    totalRevenue: 2450000,
    monthlyRevenue: 450000,
    totalProducts: 45,
    activeProducts: 42,
    totalOrders: 234,
    pendingOrders: 12,
    completedOrders: 210,
    totalCustomers: 189,
    avgRating: 4.8,
    totalReviews: 156,
    conversionRate: 3.2,
    returnRate: 2.1,
  };

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Adunni Johnson',
      product: 'Premium French Lace',
      quantity: 2,
      amount: 70000,
      status: 'processing',
      date: '2024-01-15',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 'ORD-002',
      customer: 'Kemi Adesanya',
      product: 'Royal Ankara Collection',
      quantity: 1,
      amount: 18000,
      status: 'shipped',
      date: '2024-01-14',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 'ORD-003',
      customer: 'Tunde Adebayo',
      product: 'Handwoven Aso-Oke',
      quantity: 1,
      amount: 65000,
      status: 'delivered',
      date: '2024-01-12',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 'ORD-004',
      customer: 'Bola Okafor',
      product: 'Silk Chiffon Elegance',
      quantity: 3,
      amount: 84000,
      status: 'processing',
      date: '2024-01-11',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
  ];

  const products = [
    {
      id: 1,
      name: 'Premium French Lace',
      image: 'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=100&h=100&fit=crop',
      price: 35000,
      stock: 15,
      sold: 342,
      rating: 4.8,
      reviews: 124,
      status: 'active',
      featured: true,
    },
    {
      id: 2,
      name: 'Royal Ankara Collection',
      image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=100&h=100&fit=crop',
      price: 18000,
      stock: 28,
      sold: 156,
      rating: 4.6,
      reviews: 89,
      status: 'active',
      featured: false,
    },
    {
      id: 3,
      name: 'Handwoven Aso-Oke',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&h=100&fit=crop',
      price: 65000,
      stock: 8,
      sold: 89,
      rating: 4.9,
      reviews: 67,
      status: 'active',
      featured: true,
    },
    {
      id: 4,
      name: 'Silk Chiffon Elegance',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=100&h=100&fit=crop',
      price: 28000,
      stock: 0,
      sold: 78,
      rating: 4.7,
      reviews: 92,
      status: 'out_of_stock',
      featured: false,
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProductStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ title, value, change, icon, color, format = 'number' }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {format === 'currency' ? formatPrice(value) : 
             format === 'percentage' ? `${value}%` : 
             value}
          </p>
          {change && (
            <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {change} this month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <SafeIcon icon={icon} className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-playfair font-bold text-gray-900">Vendor Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your products, orders, and business analytics</p>
            </div>
            <div className="flex space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center space-x-2">
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'products', label: 'Products' },
                { id: 'orders', label: 'Orders' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'settings', label: 'Settings' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Revenue"
                value={vendorStats.totalRevenue}
                change="+12.5%"
                icon={FiDollarSign}
                color="bg-green-500"
                format="currency"
              />
              <StatCard
                title="Active Products"
                value={vendorStats.activeProducts}
                change="+3"
                icon={FiPackage}
                color="bg-blue-500"
              />
              <StatCard
                title="Total Orders"
                value={vendorStats.totalOrders}
                change="+18"
                icon={FiShoppingBag}
                color="bg-purple-500"
              />
              <StatCard
                title="Average Rating"
                value={vendorStats.avgRating}
                change="+0.2"
                icon={FiStar}
                color="bg-gold-500"
                format="percentage"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-medium text-orange-600">{vendorStats.pendingOrders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-medium text-green-600">{vendorStats.completedOrders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Orders</span>
                    <span className="font-medium text-gray-900">{vendorStats.totalOrders}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-medium text-blue-600">{vendorStats.conversionRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Return Rate</span>
                    <span className="font-medium text-red-600">{vendorStats.returnRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-medium text-gray-900">{vendorStats.totalReviews}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Revenue</span>
                    <span className="font-medium text-green-600">{formatPrice(vendorStats.monthlyRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">New Customers</span>
                    <span className="font-medium text-blue-600">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Products Sold</span>
                    <span className="font-medium text-gray-900">127</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View All Orders
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Order</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">{order.id}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={order.avatar}
                              alt={order.customer}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-gray-900">{order.customer}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {order.product} (×{order.quantity})
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {formatPrice(order.amount)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Products Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Your Products</h3>
                <div className="flex space-x-3">
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center space-x-2">
                    <SafeIcon icon={FiDownload} className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2">
                    <SafeIcon icon={FiPlus} className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-medium text-gray-900">Product</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-900">Price</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-900">Stock</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-900">Sold</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-900">Rating</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-medium text-gray-900">{product.name}</h4>
                              {product.featured && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gold-100 text-gold-800 mt-1">
                                  <SafeIcon icon={FiStar} className="w-3 h-3 mr-1" />
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-900">
                          {formatPrice(product.price)}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`font-medium ${
                            product.stock === 0 ? 'text-red-600' : 
                            product.stock <= 10 ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{product.sold}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-1">
                            <SafeIcon icon={FiStar} className="w-4 h-4 text-gold-500 fill-current" />
                            <span className="text-gray-900">{product.rating}</span>
                            <span className="text-gray-500 text-sm">({product.reviews})</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProductStatusColor(product.status)}`}>
                            {product.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-600 hover:text-primary-600 transition-colors">
                              <SafeIcon icon={FiEye} className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-primary-600 transition-colors">
                              <SafeIcon icon={FiEdit} className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-red-600 transition-colors">
                              <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">All Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Order ID</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Product</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Amount</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.concat(recentOrders).map((order, index) => (
                    <tr key={`${order.id}-${index}`} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium text-gray-900">{order.id}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={order.avatar}
                            alt={order.customer}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-gray-900">{order.customer}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {order.product} (×{order.quantity})
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {formatPrice(order.amount)}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                            View
                          </button>
                          <button className="text-gray-600 hover:text-primary-600 font-medium text-sm">
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Revenue Chart Placeholder</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
              <div className="space-y-4">
                {products.slice(0, 3).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.sold} sold</p>
                      </div>
                    </div>
                    <span className="font-medium text-gray-900">{formatPrice(product.price * product.sold)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Settings</h3>
              <p className="text-gray-600">Manage your vendor profile, payment settings, and business information.</p>
              <div className="mt-6">
                <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;