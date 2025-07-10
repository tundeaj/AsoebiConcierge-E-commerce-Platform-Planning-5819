import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import Carousel from '../components/common/Carousel';
import EventCard from '../components/events/EventCard';
import { useCurrency } from '../hooks/useCurrency';

const { 
  FiArrowRight, FiUsers, FiShoppingBag, FiTruck, FiStar, FiCheck, 
  FiHeart, FiGift, FiCalendar, FiMapPin, FiEye, FiShare2, 
  FiTrendingUp, FiShield, FiAward, FiTarget, FiClock
} = FiIcons;

const Home = () => {
  const [activeEventTab, setActiveEventTab] = useState('trending');
  const { formatPrice } = useCurrency();
  
  // Simple typewriter effect
  const [currentWord, setCurrentWord] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  
  const words = ['Concierge', 'Marketplace', 'Showcase'];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const word = words[currentWord];
      
      if (!isDeleting) {
        if (currentChar < word.length) {
          setText(word.substring(0, currentChar + 1));
          setCurrentChar(currentChar + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentChar > 0) {
          setText(word.substring(0, currentChar - 1));
          setCurrentChar(currentChar - 1);
        } else {
          setIsDeleting(false);
          setCurrentWord((currentWord + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [currentChar, currentWord, isDeleting, words]);

  const features = [
    {
      icon: FiUsers,
      title: 'Community Hub',
      description: 'Connect with event hosts, guests, and vendors in our vibrant community platform.',
    },
    {
      icon: FiShoppingBag,
      title: 'Multivendor Marketplace',
      description: 'Browse fabrics and accessories from verified vendors across Nigeria and beyond.',
    },
    {
      icon: FiTruck,
      title: 'Smart Logistics',
      description: 'AI-powered delivery optimization and real-time tracking for all orders.',
    },
    {
      icon: FiGift,
      title: 'Crowdfunding & Gifting',
      description: 'Enable guests to contribute to events and send collaborative gifts.',
    },
  ];

  const featuredEvents = [
    {
      id: 1,
      title: 'Adunni & Tunde\'s Royal Wedding',
      date: '2024-06-15',
      location: 'Lagos, Nigeria',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=250&fit=crop',
      attendees: 245,
      rsvpCount: 189,
      hostAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      hostName: 'Adunni Johnson',
      hostVerified: true,
      category: 'Wedding',
      price: 35000,
      featured: true,
      trending: false,
    },
    {
      id: 2,
      title: 'Kemi\'s Milestone Birthday Celebration',
      date: '2024-05-20',
      location: 'Abuja, Nigeria',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=250&fit=crop',
      attendees: 120,
      rsvpCount: 98,
      hostAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      hostName: 'Kemi Adesanya',
      hostVerified: true,
      category: 'Birthday',
      price: 25000,
      featured: true,
      trending: false,
    },
    {
      id: 3,
      title: 'Bola & Segun Anniversary Gala',
      date: '2024-04-10',
      location: 'Ibadan, Nigeria',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=250&fit=crop',
      attendees: 180,
      rsvpCount: 165,
      hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      hostName: 'Bola Okafor',
      hostVerified: true,
      category: 'Anniversary',
      price: 40000,
      featured: true,
      trending: false,
    },
  ];

  const stats = [
    { number: '2,500+', label: 'Active Vendors', icon: FiShoppingBag },
    { number: '15,000+', label: 'Community Members', icon: FiUsers },
    { number: '1,200+', label: 'Events Hosted', icon: FiCalendar },
    { number: '₦450M+', label: 'Platform Revenue', icon: FiTrendingUp },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Typewriter Effect */}
      <section className="relative bg-gradient-to-r from-primary-600 to-accent-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
              Your Premium Aso-ebi{' '}
              <span className="text-gold-400">
                {text}
                <span className="animate-pulse text-gold-300">|</span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Streamline your Asoebi coordination, guest management, and event logistics with our comprehensive platform designed for Nigerian weddings and special occasions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Start Planning Your Event</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </Link>
              <Link 
                to="/marketplace" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Explore Marketplace</span>
                <SafeIcon icon={FiShoppingBag} className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <SafeIcon icon={stat.icon} className="w-8 h-8 text-primary-600 mr-2" />
                  <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Carousel 
            items={featuredEvents} 
            title="Featured Events" 
            itemsPerView={3} 
            renderItem={(event, index) => (
              <EventCard 
                event={{ ...event, price: formatPrice(event.price) }} 
                index={index} 
              />
            )} 
          />
          
          <div className="text-center mt-12">
            <Link 
              to="/events" 
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Explore All Events</span>
              <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From vendor marketplace to community features and event planning tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors border border-gray-100 hover:border-primary-200"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-accent-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-playfair font-bold mb-6">
              Join Nigeria's Largest Event Community
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Whether you're hosting events, selling fabrics, or looking to celebrate - there's a place for you in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-gold-500 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold-400 transition-colors inline-flex items-center space-x-2"
              >
                <span>Join as Host/Guest</span>
                <SafeIcon icon={FiUsers} className="w-5 h-5" />
              </Link>
              <Link 
                to="/vendor/onboarding" 
                className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-30 transition-colors inline-flex items-center space-x-2"
              >
                <span>Become a Vendor</span>
                <SafeIcon icon={FiShoppingBag} className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;