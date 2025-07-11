import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiTrendingUp, FiUsers, FiDollarSign, FiShoppingBag,
  FiCalendar, FiPieChart, FiBarChart2, FiMap,
  FiDownload, FiFilter, FiRefreshCw
} = FiIcons;

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(false);

  // Mock analytics data
  const overviewStats = {
    revenue: { value: 4500000, change: '+15.3%' },
    orders: { value: 342, change: '+12.8%' },
    customers: { value: 189, change: '+8.4%' },
    conversion: { value: 3.2, change: '+1.2%' }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const refreshData = () => {
    setLoading(true);
    // Simulate data refresh
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Track your business performance and insights</p>
          </div>
          <div className="flex space-x-4">
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
            <button
              onClick={refreshData}
              className={`bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 ${loading ? 'opacity-75 cursor-wait' : ''}`}
              disabled={loading}
            >
              <SafeIcon icon={FiRefreshCw} className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Revenue',
              value: overviewStats.revenue.value,
              change: overviewStats.revenue.change,
              icon: FiDollarSign,
              color: 'bg-green-500'
            },
            {
              title: 'Total Orders',
              value: overviewStats.orders.value,
              change: overviewStats.orders.change,
              icon: FiShoppingBag,
              color: 'bg-blue-500'
            },
            {
              title: 'Total Customers',
              value: overviewStats.customers.value,
              change: overviewStats.customers.change,
              icon: FiUsers,
              color: 'bg-purple-500'
            },
            {
              title: 'Conversion Rate',
              value: `${overviewStats.conversion.value}%`,
              change: overviewStats.conversion.change,
              icon: FiTrendingUp,
              color: 'bg-amber-500'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {typeof stat.value === 'number' && stat.title === 'Total Revenue'
                      ? formatPrice(stat.value)
                      : stat.value}
                  </p>
                  <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} this month
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
              <button className="text-gray-500 hover:text-gray-700">
                <SafeIcon icon={FiFilter} className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Revenue Chart Placeholder</p>
            </div>
          </div>

          {/* Orders Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Order Analytics</h3>
              <button className="text-gray-500 hover:text-gray-700">
                <SafeIcon icon={FiFilter} className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Orders Chart Placeholder</p>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                    <div>
                      <p className="font-medium text-gray-900">Product {index + 1}</p>
                      <p className="text-sm text-gray-600">123 sales</p>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900">{formatPrice(150000)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Insights */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Insights</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">New Customers</span>
                  <span className="text-green-600">+24</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Repeat Customers</span>
                  <span className="text-blue-600">+18</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Geographic Data */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
            <div className="space-y-4">
              {['Lagos', 'Abuja', 'Port Harcourt'].map((city, index) => (
                <div key={city} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiMap} className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{city}</span>
                  </div>
                  <span className="text-gray-600">{45 - index * 10}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;