import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiDollarSign, FiUsers, FiShoppingBag, FiTrendingUp, FiActivity, 
  FiAlertCircle, FiCheckCircle, FiClock, FiEye, FiEdit, FiTrash2,
  FiShield, FiSettings, FiDownload, FiBell, FiFlag, FiStar
} = FiIcons;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');

  // Mock admin data
  const platformStats = {
    totalRevenue: 45000000,
    monthlyRevenue: 8500000,
    platformCommission: 4500000,
    totalVendors: 256,
    activeVendors: 189,
    totalEvents: 1247,
    activeEvents: 89,
    totalUsers: 15430,
    newUsers: 234,
    totalOrders: 5670,
    pendingOrders: 45,
    disputedOrders: 12,
    refundRequests: 8,
    avgRating: 4.6,
    totalReviews: 3420,
  };

  const pendingApprovals = [
    {
      id: 1,
      type: 'vendor',
      name: 'Heritage Fabrics Ltd',
      email: 'info@heritagefabrics.ng',
      submitted: '2024-01-15',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      status: 'pending'
    },
    {
      id: 2,
      type: 'event',
      name: 'Royal Wedding Celebration',
      organizer: 'Adunni Johnson',
      submitted: '2024-01-14',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      status: 'pending'
    },
    {
      id: 3,
      type: 'refund',
      name: 'Order #25463',
      customer: 'Tunde Adebayo',
      amount: '₦45,000',
      submitted: '2024-01-13',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      status: 'pending'
    }
  ];

  const recentEvents = [
    {
      id: 1,
      title: 'Adunni & Tunde Wedding',
      host: 'Adunni Johnson',
      date: '2024-06-15',
      guests: 250,
      revenue: 875000,
      status: 'active',
    },
    {
      id: 2,
      title: 'Kemi\'s 30th Birthday',
      host: 'Kemi Adesanya',
      date: '2024-05-20',
      guests: 120,
      revenue: 450000,
      status: 'pending',
    },
    {
      id: 3,
      title: 'Bola & Segun Anniversary',
      host: 'Bola Okafor',
      date: '2024-04-10',
      guests: 180,
      revenue: 650000,
      status: 'completed',
    }
  ];

  const topVendors = [
    {
      id: 1,
      name: 'Adire Palace',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      products: 45,
      sales: 342,
      revenue: 12500000,
      rating: 4.8,
      status: 'verified',
    },
    {
      id: 2,
      name: 'Textile Dreams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      products: 37,
      sales: 289,
      revenue: 9800000,
      rating: 4.6,
      status: 'verified',
    },
    {
      id: 3,
      name: 'Heritage Weavers',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      products: 25,
      sales: 156,
      revenue: 8500000,
      rating: 4.9,
      status: 'verified',
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
             value.toLocaleString()}
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
              <h1 className="text-3xl font-playfair font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage platform, events, vendors, and users</p>
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
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Generate Report
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
                { id: 'vendors', label: 'Vendors' },
                { id: 'events', label: 'Events' },
                { id: 'users', label: 'Users' },
                { id: 'reports', label: 'Reports' },
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
                title="Platform Revenue"
                value={platformStats.totalRevenue}
                change="+15.3%"
                icon={FiDollarSign}
                color="bg-green-500"
                format="currency"
              />
              <StatCard
                title="Total Users"
                value={platformStats.totalUsers}
                change="+234"
                icon={FiUsers}
                color="bg-blue-500"
              />
              <StatCard
                title="Active Vendors"
                value={platformStats.activeVendors}
                change="+12"
                icon={FiShoppingBag}
                color="bg-purple-500"
              />
              <StatCard
                title="Active Events"
                value={platformStats.activeEvents}
                change="+8"
                icon={FiActivity}
                color="bg-amber-500"
              />
            </div>

            {/* Pending Approvals */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  {pendingApprovals.length} pending
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Submitted By</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingApprovals.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900 capitalize">{item.type}</td>
                        <td className="py-3 px-4 text-gray-700">{item.name}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.avatar}
                              alt={item.customer || item.organizer}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-gray-700">{item.customer || item.organizer || item.email}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(item.submitted).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                              Review
                            </button>
                            <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                              Approve
                            </button>
                            <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Health</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Commission Revenue</span>
                    <span className="font-medium text-green-600">{formatPrice(platformStats.platformCommission)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Disputed Orders</span>
                    <span className="font-medium text-red-600">{platformStats.disputedOrders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Refund Requests</span>
                    <span className="font-medium text-yellow-600">{platformStats.refundRequests}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Platform Rating</span>
                    <span className="font-medium text-blue-600">{platformStats.avgRating}/5.0</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Events</h3>
                <div className="space-y-4">
                  {recentEvents.slice(0, 3).map((event, index) => (
                    <div key={event.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.host}</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-900">{formatPrice(event.revenue)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Vendors</h3>
                <div className="space-y-4">
                  {topVendors.slice(0, 3).map((vendor, index) => (
                    <div key={vendor.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <img
                          src={vendor.avatar}
                          alt={vendor.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{vendor.name}</p>
                          <div className="flex items-center text-sm text-gray-600">
                            <SafeIcon icon={FiStar} className="w-3 h-3 text-gold-500 mr-1" />
                            <span>{vendor.rating}</span>
                          </div>
                        </div>
                      </div>
                      <span className="font-medium text-gray-900">{formatPrice(vendor.revenue)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-gray-900">
                      <span className="font-medium">Vendor approved:</span> Heritage Fabrics Ltd
                    </p>
                    <p className="text-sm text-gray-500">30 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <SafeIcon icon={FiUsers} className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-gray-900">
                      <span className="font-medium">New user registered:</span> Bola Okafor
                    </p>
                    <p className="text-sm text-gray-500">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                    <SafeIcon icon={FiAlertCircle} className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-gray-900">
                      <span className="font-medium">Refund request:</span> Order #25463
                    </p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <SafeIcon icon={FiShoppingBag} className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-gray-900">
                      <span className="font-medium">New product added:</span> Premium French Lace
                    </p>
                    <p className="text-sm text-gray-500">4 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'vendors' && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Vendor Management</h2>
            <p className="text-gray-600">This section allows you to manage all vendors on the platform.</p>
            <div className="mt-6">
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                View All Vendors
              </button>
            </div>
          </div>
        )}

        {(activeTab === 'events' || activeTab === 'users' || activeTab === 'reports' || activeTab === 'settings') && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;