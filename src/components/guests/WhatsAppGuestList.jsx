import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUsers, FiPhone, FiMail, FiCheck, FiX, FiShoppingBag, FiAlertCircle, FiFilter, FiSearch, FiDownload } = FiIcons;

const WhatsAppGuestList = ({ guests, loading, error, onExport }) => {
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState('all');
  const [filterRsvp, setFilterRsvp] = useState('all');

  // Filter guests when search term or filters change
  useEffect(() => {
    if (!guests) return;
    
    const filtered = guests.filter(guest => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        (guest.name && guest.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (guest.phone && guest.phone.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (guest.email && guest.email.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Source filter (WhatsApp vs. Manual)
      const matchesSource = filterSource === 'all' || 
        (filterSource === 'whatsapp' && guest.source === 'whatsapp_import') || 
        (filterSource === 'manual' && guest.source !== 'whatsapp_import');
      
      // RSVP status filter
      const matchesRsvp = filterRsvp === 'all' || guest.rsvp_status === filterRsvp;
      
      return matchesSearch && matchesSource && matchesRsvp;
    });
    
    setFilteredGuests(filtered);
  }, [guests, searchTerm, filterSource, filterRsvp]);

  // Get WhatsApp-imported guests count
  const whatsappGuestsCount = guests ? guests.filter(g => g.source === 'whatsapp_import').length : 0;
  
  // Get RSVP stats
  const rsvpStats = guests ? {
    confirmed: guests.filter(g => g.rsvp_status === 'confirmed').length,
    pending: guests.filter(g => g.rsvp_status === 'pending').length,
    declined: guests.filter(g => g.rsvp_status === 'declined').length
  } : { confirmed: 0, pending: 0, declined: 0 };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
          <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-40 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-medium text-red-800">Error loading guests</h3>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Guest List</h2>
        <button 
          onClick={onExport} 
          className="bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiDownload} className="w-4 h-4" />
          <span>Export Guest List</span>
        </button>
      </div>
      
      {/* Stats summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-primary-600">{guests?.length || 0}</p>
          <p className="text-sm text-gray-600">Total Guests</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{whatsappGuestsCount}</p>
          <p className="text-sm text-gray-600">From WhatsApp</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">{rsvpStats.confirmed}</p>
          <p className="text-sm text-gray-600">Confirmed</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-yellow-600">{rsvpStats.pending}</p>
          <p className="text-sm text-gray-600">Pending</p>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, phone or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFilter} className="text-gray-500" />
            <span className="text-sm text-gray-600">Source:</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterSource('all')}
              className={`px-3 py-1 rounded-full text-sm ${filterSource === 'all' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterSource('whatsapp')}
              className={`px-3 py-1 rounded-full text-sm ${filterSource === 'whatsapp' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => setFilterSource('manual')}
              className={`px-3 py-1 rounded-full text-sm ${filterSource === 'manual' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Manual
            </button>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <SafeIcon icon={FiFilter} className="text-gray-500" />
            <span className="text-sm text-gray-600">RSVP:</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterRsvp('all')}
              className={`px-3 py-1 rounded-full text-sm ${filterRsvp === 'all' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterRsvp('confirmed')}
              className={`px-3 py-1 rounded-full text-sm ${filterRsvp === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilterRsvp('pending')}
              className={`px-3 py-1 rounded-full text-sm ${filterRsvp === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterRsvp('declined')}
              className={`px-3 py-1 rounded-full text-sm ${filterRsvp === 'declined' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Declined
            </button>
          </div>
        </div>
      </div>
      
      {/* Guest list table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RSVP</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asoebi</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredGuests.length > 0 ? (
              filteredGuests.map((guest, index) => (
                <motion.tr
                  key={guest.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{guest.name || '-'}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center text-sm text-gray-600">
                        <SafeIcon icon={FiPhone} className="w-4 h-4 mr-1 text-gray-400" />
                        {guest.phone || '-'}
                      </div>
                      {guest.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <SafeIcon icon={FiMail} className="w-4 h-4 mr-1 text-gray-400" />
                          {guest.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                        guest.rsvp_status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : guest.rsvp_status === 'declined'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      <SafeIcon
                        icon={guest.rsvp_status === 'confirmed' ? FiCheck : guest.rsvp_status === 'declined' ? FiX : FiClock}
                        className="w-3 h-3 mr-1"
                      />
                      {guest.rsvp_status || 'pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                        guest.asoebi_status === 'ordered' || guest.asoebi_status === 'delivered'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <SafeIcon icon={FiShoppingBag} className="w-3 h-3 mr-1" />
                      {(guest.asoebi_status || 'not ordered').replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                        guest.source === 'whatsapp_import' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {guest.source === 'whatsapp_import' ? 'WhatsApp' : 'Manual'}
                    </span>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                  <SafeIcon icon={FiUsers} className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                  <p className="text-lg font-medium">No guests found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Guest count */}
      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredGuests.length} of {guests?.length || 0} guests
      </div>
    </div>
  );
};

export default WhatsAppGuestList;