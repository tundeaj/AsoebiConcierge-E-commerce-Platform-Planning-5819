import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useGuests } from '../hooks/useGuests';
import { useCurrency } from '../hooks/useCurrency';
import * as XLSX from 'xlsx';

const { FiArrowLeft, FiUsers, FiCalendar, FiMapPin, FiShare2, FiEdit, FiDownload, FiMail, FiPhone, FiPlus, FiUpload, FiTrash2, FiEdit3, FiChevronDown, FiCheck, FiX } = FiIcons;

const EventDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestFormData, setGuestFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    rsvp_status: 'pending',
    asoebi_status: 'not_ordered'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentGuestId, setCurrentGuestId] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(null);
  
  const fileInputRef = useRef(null);
  const { formatPrice } = useCurrency();
  const { guests, loading, addGuest, updateGuest, deleteGuest, importGuestsFromExcel, exportGuestsToExcel } = useGuests(id);

  // Mock event data - replace with actual API call
  const event = {
    id: 1,
    title: 'Adunni & Tunde Wedding',
    date: '2024-06-15',
    time: '2:00 PM',
    location: 'The Civic Centre, Lagos, Nigeria',
    description: 'A beautiful traditional wedding celebration bringing together two families in love and unity.',
    status: 'active',
    progress: 85,
    totalGuests: 250,
    confirmedGuests: 185,
    pendingGuests: 45,
    declinedGuests: 20,
    budget: 2500000,
    spent: 1875000,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=400&fit=crop',
    organizer: {
      name: 'Adunni Johnson',
      email: 'adunni@email.com',
      phone: '+234 803 123 4567',
    },
    asoebi: {
      fabric: 'Premium French Lace',
      color: 'Royal Blue & Gold',
      price: 35000,
      orders: 142,
      delivered: 98,
      pending: 44,
    },
    timeline: [
      { date: '2024-03-15', event: 'Event Created', status: 'completed' },
      { date: '2024-03-20', event: 'Guest List Uploaded', status: 'completed' },
      { date: '2024-04-01', event: 'Invitations Sent', status: 'completed' },
      { date: '2024-04-15', event: 'Asoebi Orders Open', status: 'completed' },
      { date: '2024-05-01', event: 'Final RSVP Deadline', status: 'pending' },
      { date: '2024-05-15', event: 'Asoebi Delivery', status: 'pending' },
      { date: '2024-06-15', event: 'Event Day', status: 'pending' },
    ],
  };

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    
    if (isEditing && currentGuestId) {
      await updateGuest(currentGuestId, guestFormData);
    } else {
      await addGuest(guestFormData);
    }
    
    setShowGuestModal(false);
    resetGuestForm();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await importGuestsFromExcel(file);
        // Reset the input
        e.target.value = '';
      } catch (error) {
        console.error('Error importing guests:', error);
      }
    }
  };

  const handleExport = () => {
    exportGuestsToExcel();
  };

  const resetGuestForm = () => {
    setGuestFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      rsvp_status: 'pending',
      asoebi_status: 'not_ordered'
    });
    setIsEditing(false);
    setCurrentGuestId(null);
  };

  const editGuest = (guest) => {
    setGuestFormData({
      name: guest.name,
      email: guest.email || '',
      phone: guest.phone || '',
      location: guest.location || '',
      rsvp_status: guest.rsvp_status || 'pending',
      asoebi_status: guest.asoebi_status || 'not_ordered'
    });
    setIsEditing(true);
    setCurrentGuestId(guest.id);
    setShowGuestModal(true);
    setShowActionMenu(null);
  };

  const handleDeleteGuest = async (guestId) => {
    if (window.confirm('Are you sure you want to delete this guest?')) {
      await deleteGuest(guestId);
    }
    setShowActionMenu(null);
  };

  const toggleActionMenu = (guestId) => {
    setShowActionMenu(showActionMenu === guestId ? null : guestId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAsoebiBadge = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'ordered':
        return 'bg-blue-100 text-blue-800';
      case 'not_ordered':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/events" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-4">
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-playfair font-bold text-gray-900">{event.title}</h1>
              <div className="flex items-center space-x-4 mt-2 text-gray-600">
                <span className="flex items-center">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </span>
                <span className="flex items-center">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-1" />
                  {event.location}
                </span>
              </div>
            </div>
            <div className="flex space-x-3 mt-4 lg:mt-0">
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center space-x-2">
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

        {/* Event Image */}
        <div className="mb-8">
          <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-xl" />
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['overview', 'guests', 'asoebi', 'timeline'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Event Description */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Description</h2>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Guests</p>
                      <p className="text-2xl font-bold text-gray-900">{event.totalGuests}</p>
                    </div>
                    <SafeIcon icon={FiUsers} className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Confirmed</p>
                      <p className="text-2xl font-bold text-green-600">{event.confirmedGuests}</p>
                    </div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">✓</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">{event.pendingGuests}</p>
                    </div>
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">?</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget Overview */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Overview</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Budget</span>
                    <span className="font-semibold text-gray-900">{formatPrice(event.budget)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Amount Spent</span>
                    <span className="font-semibold text-gray-900">{formatPrice(event.spent)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>75% of budget used</span>
                    <span>{formatPrice(event.budget - event.spent)} remaining</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Organizer Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Organizer</h2>
                <div className="space-y-3">
                  <p className="font-medium text-gray-900">{event.organizer.name}</p>
                  <div className="flex items-center text-gray-600">
                    <SafeIcon icon={FiMail} className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.organizer.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.organizer.phone}</span>
                  </div>
                </div>
              </div>

              {/* Asoebi Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Asoebi Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fabric</span>
                    <span className="font-medium">{event.asoebi.fabric}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Color</span>
                    <span className="font-medium">{event.asoebi.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="font-medium">{formatPrice(event.asoebi.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Orders</span>
                    <span className="font-medium">{event.asoebi.orders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivered</span>
                    <span className="font-medium text-green-600">{event.asoebi.delivered}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                    Send Reminder
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center justify-center space-x-2">
                    <SafeIcon icon={FiDownload} className="w-4 h-4" />
                    <span>Export Guest List</span>
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guests' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Guest List</h2>
              <div className="flex flex-wrap gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={handleImportClick}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-1"
                >
                  <SafeIcon icon={FiUpload} className="w-4 h-4" />
                  <span>Import Excel</span>
                </button>
                <button
                  onClick={handleExport}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center space-x-1"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Export Excel</span>
                </button>
                <button
                  onClick={() => {
                    resetGuestForm();
                    setShowGuestModal(true);
                  }}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-1"
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4" />
                  <span>Add Guest</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">RSVP Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Asoebi</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="py-4 text-center text-gray-500">Loading guests...</td>
                    </tr>
                  ) : guests.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-4 text-center text-gray-500">No guests added yet. Add your first guest!</td>
                    </tr>
                  ) : (
                    guests.map((guest) => (
                      <tr key={guest.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">{guest.name}</td>
                        <td className="py-3 px-4 text-gray-600">{guest.email || '-'}</td>
                        <td className="py-3 px-4 text-gray-600">{guest.phone || '-'}</td>
                        <td className="py-3 px-4 text-gray-600">{guest.location || '-'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(guest.rsvp_status)}`}>
                            {guest.rsvp_status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAsoebiBadge(guest.asoebi_status)}`}>
                            {guest.asoebi_status?.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4 relative">
                          <button
                            onClick={() => toggleActionMenu(guest.id)}
                            className="text-gray-600 hover:text-primary-600 transition-colors"
                          >
                            <SafeIcon icon={FiChevronDown} className="w-5 h-5" />
                          </button>
                          
                          {showActionMenu === guest.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                              <button
                                onClick={() => editGuest(guest)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                              >
                                <SafeIcon icon={FiEdit} className="w-4 h-4 mr-2" />
                                <span>Edit Guest</span>
                              </button>
                              <button
                                onClick={() => handleDeleteGuest(guest.id)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                              >
                                <SafeIcon icon={FiTrash2} className="w-4 h-4 mr-2" />
                                <span>Delete Guest</span>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'asoebi' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Asoebi Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{event.asoebi.orders}</div>
                <div className="text-gray-600">Total Orders</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{event.asoebi.delivered}</div>
                <div className="text-gray-600">Delivered</div>
              </div>
              <div className="text-center p-6 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{event.asoebi.pending}</div>
                <div className="text-gray-600">Pending</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Event Timeline</h2>
            <div className="space-y-4">
              {event.timeline.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{item.event}</span>
                      <span className="text-sm text-gray-600">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Guest Modal */}
      {showGuestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                {isEditing ? 'Edit Guest' : 'Add New Guest'}
              </h3>
              <button
                onClick={() => setShowGuestModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <SafeIcon icon={FiX} className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleGuestSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={guestFormData.name}
                  onChange={(e) => setGuestFormData({ ...guestFormData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={guestFormData.email}
                  onChange={(e) => setGuestFormData({ ...guestFormData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={guestFormData.phone}
                  onChange={(e) => setGuestFormData({ ...guestFormData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={guestFormData.location}
                  onChange={(e) => setGuestFormData({ ...guestFormData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="rsvp_status" className="block text-sm font-medium text-gray-700 mb-1">
                  RSVP Status
                </label>
                <select
                  id="rsvp_status"
                  value={guestFormData.rsvp_status}
                  onChange={(e) => setGuestFormData({ ...guestFormData, rsvp_status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
              <div>
                <label htmlFor="asoebi_status" className="block text-sm font-medium text-gray-700 mb-1">
                  Asoebi Status
                </label>
                <select
                  id="asoebi_status"
                  value={guestFormData.asoebi_status}
                  onChange={(e) => setGuestFormData({ ...guestFormData, asoebi_status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="not_ordered">Not Ordered</option>
                  <option value="ordered">Ordered</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowGuestModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  {isEditing ? 'Update Guest' : 'Add Guest'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;