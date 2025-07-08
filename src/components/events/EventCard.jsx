import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiCalendar, FiMapPin, FiUsers, FiEye, FiHeart, 
  FiShare2, FiStar, FiTrendingUp, FiClock 
} = FiIcons;

const EventCard = ({ event, index = 0, variant = 'default' }) => {
  const formatPrice = (price) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {event.featured && (
            <span className="bg-gold-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              ⭐ Featured
            </span>
          )}
          {event.trending && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              🔥 Trending
            </span>
          )}
          {event.category && (
            <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {event.category}
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors">
            <SafeIcon icon={FiHeart} className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors">
            <SafeIcon icon={FiShare2} className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Price */}
        {event.price && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-white bg-opacity-90 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
              {formatPrice(event.price)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Host Info */}
        {event.hostAvatar && event.hostName && (
          <div className="flex items-center space-x-2 mb-3">
            <img
              src={event.hostAvatar}
              alt={event.hostName}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600">{event.hostName}</span>
            {event.hostVerified && (
              <SafeIcon icon={FiStar} className="w-3 h-3 text-gold-500" />
            )}
          </div>
        )}

        {/* Event Title */}
        <Link to={`/event/${event.id}`}>
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
            {event.title}
          </h3>
        </Link>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          {event.attendees && (
            <div className="flex items-center text-gray-600 text-sm">
              <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
              {event.rsvpCount || 0} of {event.attendees} attending
            </div>
          )}
        </div>

        {/* RSVP Progress */}
        {event.attendees && event.rsvpCount && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>RSVP Progress</span>
              <span>{Math.round((event.rsvpCount / event.attendees) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(event.rsvpCount / event.attendees) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            to={`/event/${event.id}`}
            className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center inline-flex items-center justify-center space-x-1"
          >
            <SafeIcon icon={FiEye} className="w-4 h-4" />
            <span>View Event</span>
          </Link>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiCalendar} className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;