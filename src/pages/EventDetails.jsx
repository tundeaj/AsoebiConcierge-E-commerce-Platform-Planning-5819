import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useGuests } from '../hooks/useGuests';
import { useCurrency } from '../hooks/useCurrency';
import { eventService } from '../services/supabaseService';
import * as XLSX from 'xlsx';

const { 
  FiArrowLeft, FiUsers, FiCalendar, FiMapPin, FiShare2, FiEdit, 
  FiDownload, FiMail, FiPhone, FiPlus, FiUpload, FiTrash2, 
  FiEdit3, FiChevronDown, FiCheck, FiX, FiAlertCircle, FiSearch,
  FiFilter, FiSettings, FiInfo
} = FiIcons;

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRsvp, setFilterRsvp] = useState('all');
  const [filterAsoebi, setFilterAsoebi] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState('');
  const [event, setEvent] = useState(null);
  const [eventLoading, setEventLoading] = useState(true);
  
  const fileInputRef = useRef(null);
  
  const { formatPrice } = useCurrency();
  const { 
    guests, 
    loading, 
    error, 
    addGuest, 
    updateGuest, 
    deleteGuest, 
    importGuestsFromExcel, 
    exportGuestsToExcel,
    refetch
  } = useGuests(id);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setEventLoading(true);
        const { data, error } = await eventService.getEvent(id);
        if (error) throw error;
        setEvent(data || {
          id: id,
          title: 'Loading...',
          date: new Date().toISOString(),
          time: 'Loading...',
          location: 'Loading...',
          description: 'Loading event details...',
          status: 'active',
          progress: 0,
          totalGuests: 0,
          confirmedGuests: 0,
          pendingGuests: 0,
          declinedGuests: 0,
          budget: 0,
          spent: 0,
          image: 'https://via.placeholder.com/800x400',
          organizer: {
            name: 'Loading...',
            email: 'loading@example.com',
            phone: 'Loading...',
          },
          asoebi: {
            fabric: 'Loading...',
            color: 'Loading...',
            price: 0,
            orders: 0,
            delivered: 0,
            pending: 0,
          },
          timeline: []
        });
      } catch (err) {
        console.error('Error fetching event:', err);
      } finally {
        setEventLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  // Filter guests based on search term and filters
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = 
      guest.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      guest.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      guest.phone?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      guest.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRsvp = filterRsvp === 'all' || guest.rsvp_status === filterRsvp;
    const matchesAsoebi = filterAsoebi === 'all' || guest.asoebi_status === filterAsoebi;
    
    return matchesSearch && matchesRsvp && matchesAsoebi;
  });

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
      setIsImporting(true);
      setImportError('');
      
      try {
        const response = await importGuestsFromExcel(file);
        if (response.error) {
          throw response.error;
        }
        
        // Reset the input
        e.target.value = '';
        
        // Show success message or update UI
      } catch (error) {
        console.error('Error importing guests:', error);
        setImportError(error.message || 'Failed to import guests');
      } finally {
        setIsImporting(false);
      }
    }
  };

  const handleExport = () => {
    if (guests.length === 0) {
      alert('No guests to export');
      return;
    }
    
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
      name: guest.name || '',
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
  
  const handleUpdateRsvpStatus = async (guestId, newStatus) => {
    await updateGuest(guestId, { rsvp_status: newStatus });
    setShowActionMenu(null);
  };
  
  const handleUpdateAsoebiStatus = async (guestId, newStatus) => {
    await updateGuest(guestId, { asoebi_status: newStatus });
    setShowActionMenu(null);
  };

  if (eventLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading event details...</p>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-playfair font-bold text-gray-900">{event?.title}</h1>
              <div className="flex items-center space-x-4 mt-2 text-gray-600">
                <span className="flex items-center">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                  {event?.date ? new Date(event.date).toLocaleDateString() : 'Date not set'} at {event?.time || 'Time not set'}
                </span>
                <span className="flex items-center">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-1" />
                  {event?.location || 'Location not set'}
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
          <img 
            src={event?.image || 'https://via.placeholder.com/800x400'} 
            alt={event?.title} 
            className="w-full h-64 object-cover rounded-xl"
          />
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
                <p className="text-gray-600 leading-relaxed">{event?.description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Guests</p>
                      <p className="text-2xl font-bold text-gray-900">{guests.length}</p>
                    </div>
                    <SafeIcon icon={FiUsers} className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Confirmed</p>
                      <p className="text-2xl font-bold text-green-600">
                        {guests.filter(g => g.rsvp_status === 'confirmed').length}
                      </p>
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
                      <p className="text-2xl font-bold text-yellow-600">
                        {guests.filter(g => g.rsvp_status === 'pending').length}
                      </p>
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
                    <span className="font-semibold text-gray-900">{formatPrice(event?.budget || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Amount Spent</span>
                    <span className="font-semibold text-gray-900">{formatPrice(event?.spent || 0)}</span>
                  </div>
                  
                  {event?.budget > 0 && (
                    <>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, ((event.spent || 0) / event.budget) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{Math.round(((event.spent || 0) / event.budget) * 100)}% of budget used</span>
                        <span>{formatPrice((event.budget || 0) - (event.spent || 0))} remaining</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Organizer Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Organizer</h2>
                <div className="space-y-3">
                  <p className="font-medium text-gray-900">{event?.organizer?.name}</p>
                  <div className="flex items-center text-gray-600">
                    <SafeIcon icon={FiMail} className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event?.organizer?.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event?.organizer?.phone}</span>
                  </div>
                </div>
              </div>

              {/* Asoebi Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Asoebi Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fabric</span>
                    <span className="font-medium">{event?.asoebi?.fabric}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Color</span>
                    <span className="font-medium">{event?.asoebi?.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="font-medium">{formatPrice(event?.asoebi?.price || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Orders</span>
                    <span className="font-medium">{event?.asoebi?.orders || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivered</span>
                    <span className="font-medium text-green-600">{event?.asoebi?.delivered || 0}</span>
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
                  <button 
                    onClick={handleExport}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center justify-center space-x-2"
                  >
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
                  accept=".xlsx,.xls" 
                  onChange={handleFileUpload} 
                />
                
                <button 
                  onClick={handleImportClick}
                  disabled={isImporting}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SafeIcon icon={isImporting ? FiClock : FiUpload} className="w-4 h-4" />
                  <span>{isImporting ? 'Importing...' : 'Import Excel'}</span>
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
            
            {/* Import Error Message */}
            {importError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                <SafeIcon icon={FiAlertCircle} className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{importError}</span>
              </div>
            )}
            
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search guests by name, email, phone..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <SafeIcon icon={FiFilter} className="w-4 h-4 mr-2" />
                  <span>Filters</span>
                  <SafeIcon icon={FiChevronDown} className={`w-4 h-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        RSVP Status
                      </label>
                      <select 
                        value={filterRsvp}
                        onChange={(e) => setFilterRsvp(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="all">All Statuses</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="declined">Declined</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Asoebi Status
                      </label>
                      <select 
                        value={filterAsoebi}
                        onChange={(e) => setFilterAsoebi(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="all">All Statuses</option>
                        <option value="not_ordered">Not Ordered</option>
                        <option value="ordered">Ordered</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Guest Count */}
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredGuests.length} of {guests.length} guests
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
                  ) : filteredGuests.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-500">
                        {guests.length === 0 ? (
                          <div className="flex flex-col items-center">
                            <SafeIcon icon={FiUsers} className="w-12 h-12 text-gray-300 mb-3" />
                            <p className="text-lg font-medium text-gray-700 mb-2">No guests added yet</p>
                            <p className="text-gray-500 mb-4">Add your first guest or import from Excel</p>
                            <div className="flex gap-3">
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
                              <button 
                                onClick={handleImportClick}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-1"
                              >
                                <SafeIcon icon={FiUpload} className="w-4 h-4" />
                                <span>Import Excel</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium">No guests found matching your filters</p>
                            <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                            <button 
                              onClick={() => {
                                setSearchTerm('');
                                setFilterRsvp('all');
                                setFilterAsoebi('all');
                                setShowFilters(false);
                              }}
                              className="mt-3 text-primary-600 hover:text-primary-700 font-medium"
                            >
                              Clear all filters
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredGuests.map((guest) => (
                      <tr key={guest.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{guest.name}</td>
                        <td className="py-3 px-4 text-gray-600 truncate max-w-[200px]">{guest.email || '-'}</td>
                        <td className="py-3 px-4 text-gray-600">{guest.phone || '-'}</td>
                        <td className="py-3 px-4 text-gray-600">{guest.location || '-'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(guest.rsvp_status)}`}>
                            {guest.rsvp_status || 'pending'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAsoebiBadge(guest.asoebi_status)}`}>
                            {(guest.asoebi_status || 'not_ordered').replace('_', ' ')}
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
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                              {/* RSVP Status Update */}
                              <div className="px-4 py-2">
                                <p className="text-xs font-medium text-gray-500 mb-1">RSVP Status</p>
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => handleUpdateRsvpStatus(guest.id, 'confirmed')}
                                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                                      guest.rsvp_status === 'confirmed'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                                    }`}
                                  >
                                    Confirmed
                                  </button>
                                  <button
                                    onClick={() => handleUpdateRsvpStatus(guest.id, 'pending')}
                                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                                      guest.rsvp_status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-100 text-gray-700 hover:bg-yellow-50'
                                    }`}
                                  >
                                    Pending
                                  </button>
                                  <button
                                    onClick={() => handleUpdateRsvpStatus(guest.id, 'declined')}
                                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                                      guest.rsvp_status === 'declined'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-gray-100 text-gray-700 hover:bg-red-50'
                                    }`}
                                  >
                                    Declined
                                  </button>
                                </div>
                              </div>
                              
                              {/* Asoebi Status Update */}
                              <div className="px-4 py-2 border-t border-gray-100">
                                <p className="text-xs font-medium text-gray-500 mb-1">Asoebi Status</p>
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => handleUpdateAsoebiStatus(guest.id, 'not_ordered')}
                                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                                      guest.asoebi_status === 'not_ordered'
                                        ? 'bg-gray-200 text-gray-800'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                  >
                                    Not Ordered
                                  </button>
                                  <button
                                    onClick={() => handleUpdateAsoebiStatus(guest.id, 'ordered')}
                                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                                      guest.asoebi_status === 'ordered'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
                                    }`}
                                  >
                                    Ordered
                                  </button>
                                  <button
                                    onClick={() => handleUpdateAsoebiStatus(guest.id, 'delivered')}
                                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                                      guest.asoebi_status === 'delivered'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                                    }`}
                                  >
                                    Delivered
                                  </button>
                                </div>
                              </div>
                              
                              <div className="border-t border-gray-100 mt-2 pt-2">
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
                Detailed Asoebi management features are being developed. You'll be able to track orders,
                manage deliveries, and send notifications to guests.
              </p>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Set Up Asoebi Details
              </button>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Event Timeline</h2>
            
            {event?.timeline && event.timeline.length > 0 ? (
              <div className="space-y-4">
                {event.timeline.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{item.event}</span>
                        <span className="text-sm text-gray-600">{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8">
                <SafeIcon icon={FiInfo} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Timeline Events</h3>
                <p className="text-gray-600 mb-6">
                  You haven't added any events to your timeline yet. Create milestones to track your event progress.
                </p>
                <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Add Timeline Event
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Guest Modal */}
      <AnimatePresence>
        {showGuestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-lg w-full max-w-md"
            >
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventDetails;