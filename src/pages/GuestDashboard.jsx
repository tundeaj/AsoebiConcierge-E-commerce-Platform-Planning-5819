import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalendar, FiMapPin, FiClock, FiCheck, FiX, FiShoppingBag, FiTruck, FiHeart, FiShare2 } = FiIcons;

const GuestDashboard = () => {
  const { token } = useParams();
  const [rsvpStatus, setRsvpStatus] = useState('pending');
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Mock guest data - replace with actual API call
  const guestData = {
    name: 'Kemi Adesanya',
    email: 'kemi@email.com',
    event: {
      title: 'Adunni & Tunde Wedding',
      date: '2024-06-15',
      time: '2:00 PM',
      location: 'The Civic Centre, Lagos, Nigeria',
      description: 'Join us for a beautiful celebration of love and unity.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=400&fit=crop',
      organizer: 'Adunni Johnson',
    },
    asoebi: {
      fabric: 'Premium French Lace',
      color: 'Royal Blue & Gold',
      packages: [
        {
          id: 1,
          name: 'Standard Package',
          price: 35000,
          items: ['2.5 yards of fabric', 'Basic styling guide'],
          image: 'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=300&h=300&fit=crop',
        },
        {
          id: 2,
          name: 'Premium Package',
          price: 55000,
          items: ['2.5 yards of fabric', 'Gele head tie', 'Styling guide', 'Accessories'],
          image: 'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=300&h=300&fit=crop',
        },
        {
          id: 3,
          name: 'VIP Package',
          price: 85000,
          items: ['3 yards of fabric', 'Gele head tie', 'Premium accessories', 'Personal styling session'],
          image: 'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=300&h=300&fit=crop',
        },
      ],
    },
    order: {
      status: 'pending',
      trackingNumber: null,
      package: null,
    },
  };

  const handleRSVP = (status) => {
    setRsvpStatus(status);
    // Handle RSVP submission
  };

  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-playfair font-bold mb-4"
            >
              You're Invited!
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-semibold mb-2"
            >
              {guestData.event.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg opacity-90"
            >
              Hello {guestData.name}!
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <img
            src={guestData.event.image}
            alt={guestData.event.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiCalendar} className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold">{new Date(guestData.event.date).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiClock} className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-semibold">{guestData.event.time}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiMapPin} className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold">{guestData.event.location}</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">{guestData.event.description}</p>
          
          <div className="flex space-x-4">
            <button
              onClick={() => handleRSVP('confirmed')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                rsvpStatus === 'confirmed'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              <SafeIcon icon={FiCheck} className="w-5 h-5 inline mr-2" />
              Accept
            </button>
            <button
              onClick={() => handleRSVP('declined')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                rsvpStatus === 'declined'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              <SafeIcon icon={FiX} className="w-5 h-5 inline mr-2" />
              Decline
            </button>
          </div>
        </motion.div>

        {/* RSVP Confirmation */}
        {rsvpStatus !== 'pending' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-6 mb-8 ${
              rsvpStatus === 'confirmed' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <SafeIcon 
                icon={rsvpStatus === 'confirmed' ? FiCheck : FiX} 
                className={`w-6 h-6 ${rsvpStatus === 'confirmed' ? 'text-green-600' : 'text-red-600'}`} 
              />
              <div>
                <h3 className={`font-semibold ${rsvpStatus === 'confirmed' ? 'text-green-900' : 'text-red-900'}`}>
                  {rsvpStatus === 'confirmed' ? 'Thank you for accepting!' : 'We understand you cannot attend'}
                </h3>
                <p className={`text-sm ${rsvpStatus === 'confirmed' ? 'text-green-700' : 'text-red-700'}`}>
                  {rsvpStatus === 'confirmed' 
                    ? 'We look forward to celebrating with you!' 
                    : 'You will be missed at this special celebration.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Asoebi Section */}
        {rsvpStatus === 'confirmed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Asoebi Packages</h2>
            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                <strong>Fabric:</strong> {guestData.asoebi.fabric}
              </p>
              <p className="text-gray-600">
                <strong>Color:</strong> {guestData.asoebi.color}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guestData.asoebi.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPackage === pkg.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePackageSelect(pkg.id)}
                >
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-2xl font-bold text-primary-600 mb-3">{formatPrice(pkg.price)}</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {pkg.items.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {selectedPackage && (
              <div className="mt-6 text-center">
                <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center space-x-2">
                  <SafeIcon icon={FiShoppingBag} className="w-5 h-5" />
                  <span>Order Selected Package</span>
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Order Status */}
        {guestData.order.status !== 'pending' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Status</h2>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiTruck} className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Your order is being processed</p>
                <p className="text-gray-600">Tracking Number: #AS2024001234</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-xl shadow-sm p-6 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Share the Joy</h2>
          <p className="text-gray-600 mb-6">Help us spread the word about this special celebration!</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2">
              <SafeIcon icon={FiShare2} className="w-5 h-5" />
              <span>Share on Facebook</span>
            </button>
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2">
              <SafeIcon icon={FiHeart} className="w-5 h-5" />
              <span>Send Love</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GuestDashboard;