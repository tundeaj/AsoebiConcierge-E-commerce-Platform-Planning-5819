import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import WhatsAppGuestList from '../components/guests/WhatsAppGuestList';
import WhatsAppOnboarding from '../components/guests/WhatsAppOnboarding';
import { useGuests } from '../hooks/useGuests';

const { FiCalendar, FiMapPin, FiUsers, FiEdit, FiShare2, FiDownload, FiPlus, FiSettings, FiEye, FiMail, FiPhone, FiClock, FiDollarSign, FiShoppingBag, FiTruck, FiCheckCircle, FiAlertCircle, FiBarChart3 } = FiIcons;

const EventDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { guests, loading: guestsLoading, error: guestsError, exportGuestsToExcel } = useGuests(id);

  // Mock event data - replace with actual API call
  const event = {
    id: id,
    title: "Adunni & Tunde's Wedding",
    date: '2024-06-15',
    time: '2:00 PM',
    location: 'The Civic Centre, Victoria Island, Lagos',
    description: 'Join us for a beautiful celebration of love and unity as we exchange vows and begin our journey together.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=400&fit=crop',
    host: {
      name: 'Adunni Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
      email: 'adunni@email.com',
      phone: '+234 803 123 4567'
    },
    stats: {
      totalGuests: 250,
      confirmedGuests: 185,
      pendingGuests: 45,
      declinedGuests: 20
    },
    asoebi: {
      orders: 142,
      delivered: 98,
      pending: 44,
      fabric: 'Premium French Lace',
      color: 'Royal Blue & Gold',
      price: 35000
    },
    budget: {
      total: 2500000,
      spent: 1750000,
      remaining: 750000
    },
    status: 'active'
  };

  useEffect(() => {
    // Simulate loading guests data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, }).format(price);
  };

  const handleExportGuests = () => {
    exportGuestsToExcel();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="relative">
            <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </div>
                <div className="flex items-center">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-1" />
                  {event.location}
                </div>
              </div>
            </div>
            <div className="absolute top-6 right-6 flex space-x-2">
              <button className="bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center space-x-2">
                <SafeIcon icon={FiShare2} className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2">
                <SafeIcon icon={FiEdit} className="w-4 h-4" />
                <span>Edit Event</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Guests</p>
                <p className="text-2xl font-bold text-gray-900">{event.stats.totalGuests}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiUsers} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">{event.stats.confirmedGuests}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiCheckCircle} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Asoebi Orders</p>
                <p className="text-2xl font-bold text-gray-900">{event.asoebi.orders}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiShoppingBag} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Used</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((event.budget.spent / event.budget.total) * 100)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiBarChart3} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'guests', label: 'Guest Management' },
                { id: 'asoebi', label: 'Asoebi Management' },
                { id: 'budget', label: 'Budget & Expenses' },
                { id: 'timeline', label: 'Timeline' },
                { id: 'settings', label: 'Settings' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>
                <p className="text-gray-600 mb-6">{event.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiCalendar} className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiMapPin} className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiUsers} className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Expected Guests</p>
                      <p className="font-medium">{event.stats.totalGuests} people</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="font-medium">{formatPrice(event.budget.total)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RSVP Progress */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">RSVP Progress</h2>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Confirmed Guests</span>
                    <span>{Math.round((event.stats.confirmedGuests / event.stats.totalGuests) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.stats.confirmedGuests / event.stats.totalGuests) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{event.stats.confirmedGuests}</p>
                    <p className="text-sm text-gray-600">Confirmed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">{event.stats.pendingGuests}</p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">{event.stats.declinedGuests}</p>
                    <p className="text-sm text-gray-600">Declined</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Host Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Host Information</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <img src={event.host.avatar} alt={event.host.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-gray-900">{event.host.name}</p>
                    <p className="text-sm text-gray-500">Event Organizer</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiMail} className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{event.host.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiPhone} className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{event.host.phone}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    to={`/planner`}
                    className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiSettings} className="w-4 h-4" />
                    <span>Open Event Planner</span>
                  </Link>
                  <button 
                    onClick={handleExportGuests}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiDownload} className="w-4 h-4" />
                    <span>Download Guest List</span>
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center space-x-2">
                    <SafeIcon icon={FiShare2} className="w-4 h-4" />
                    <span>Share Event Link</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guests' && (
          <div className="space-y-6">
            <WhatsAppOnboarding eventId={event.id} eventTitle={event.title} />
            <WhatsAppGuestList guests={guests} loading={guestsLoading} error={guestsError} />
          </div>
        )}

        {activeTab === 'asoebi' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Asoebi Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{event?.asoebi?.orders || 0}</div>
                <div className="text-gray-600">Total Orders</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{event?.asoebi?.delivered || 0}</div>
                <div className="text-gray-600">Delivered</div>
              </div>
              <div className="text-center p-6 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{event?.asoebi?.pending || 0}</div>
                <div className="text-gray-600">Pending</div>
              </div>
            </div>

            {/* Detailed Asoebi Management to be implemented */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
              <SafeIcon icon={FiSettings} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Asoebi Management</h3>
              <p className="text-gray-600 mb-6">
                Detailed Asoebi management features are being developed. You'll be able to track orders, manage deliveries, and send notifications to guests.
              </p>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Set Up Asoebi Details
              </button>
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Budget & Expenses</h2>
            <p className="text-gray-600">Budget tracking features will be implemented here.</p>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Event Timeline</h2>
            <p className="text-gray-600">Event timeline and milestone tracking will be implemented here.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Event Settings</h2>
            <p className="text-gray-600">Event configuration and settings will be implemented here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;