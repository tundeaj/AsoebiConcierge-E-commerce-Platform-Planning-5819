import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import Carousel from '../components/common/Carousel';
import EventCard from '../components/events/EventCard';
import { useCurrency } from '../hooks/useCurrency';

const { FiArrowRight, FiUsers, FiShoppingBag, FiTruck, FiStar, FiCheck, FiHeart, FiGift, FiCalendar, FiMapPin, FiEye, FiShare2, FiTrendingUp, FiShield, FiAward, FiTarget, FiClock } = FiIcons;

const Home = () => {
  const [activeEventTab, setActiveEventTab] = useState('trending');
  const { formatPrice } = useCurrency();

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

  // Featured Events Data
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
    {
      id: 4,
      title: 'Traditional Yoruba Engagement',
      date: '2024-07-08',
      location: 'Ibadan, Nigeria',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=250&fit=crop',
      attendees: 95,
      rsvpCount: 78,
      hostAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      hostName: 'Ade Olumide',
      hostVerified: true,
      category: 'Engagement',
      price: 30000,
      featured: true,
      trending: false,
    },
    {
      id: 5,
      title: 'Corporate Annual Dinner',
      date: '2024-08-15',
      location: 'Lagos, Nigeria',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=250&fit=crop',
      attendees: 300,
      rsvpCount: 280,
      hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      hostName: 'TechCorp Nigeria',
      hostVerified: true,
      category: 'Corporate',
      price: 45000,
      featured: true,
      trending: false,
    },
  ];

  // Trending Events Data
  const trendingEvents = [
    {
      id: 6,
      title: 'Lagos Fashion Week After Party',
      date: '2024-03-25',
      location: 'Victoria Island, Lagos',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop',
      attendees: 500,
      rsvpCount: 456,
      hostAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      hostName: 'Fashion Hub Lagos',
      hostVerified: true,
      category: 'Fashion',
      price: 50000,
      featured: false,
      trending: true,
    },
    {
      id: 7,
      title: 'Igbo Cultural Festival 2024',
      date: '2024-04-20',
      location: 'Enugu, Nigeria',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop',
      attendees: 800,
      rsvpCount: 720,
      hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      hostName: 'Igbo Heritage Foundation',
      hostVerified: true,
      category: 'Cultural',
      price: 15000,
      featured: false,
      trending: true,
    },
    {
      id: 8,
      title: 'Afrobeats Concert Night',
      date: '2024-05-30',
      location: 'Abuja, Nigeria',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
      attendees: 1000,
      rsvpCount: 890,
      hostAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      hostName: 'Afrobeats Central',
      hostVerified: true,
      category: 'Concert',
      price: 20000,
      featured: false,
      trending: true,
    },
    {
      id: 9,
      title: 'Tech Startup Networking Event',
      date: '2024-06-10',
      location: 'Lagos, Nigeria',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop',
      attendees: 200,
      rsvpCount: 185,
      hostAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      hostName: 'Lagos Tech Hub',
      hostVerified: true,
      category: 'Networking',
      price: 10000,
      featured: false,
      trending: true,
    },
    {
      id: 10,
      title: 'Children\'s Day Celebration',
      date: '2024-05-27',
      location: 'Port Harcourt, Nigeria',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=250&fit=crop',
      attendees: 150,
      rsvpCount: 142,
      hostAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      hostName: 'Kids Fun Zone',
      hostVerified: true,
      category: 'Family',
      price: 5000,
      featured: false,
      trending: true,
    },
  ];

  const trendingFashion = [
    {
      id: 1,
      name: 'Premium French Lace',
      vendor: 'Adire Palace',
      price: 35000,
      originalPrice: 45000,
      image: 'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=300&h=300&fit=crop',
      rating: 4.8,
      sales: 142,
      badge: 'Bestseller',
      stockLeft: 8,
      colors: ['#8B4513', '#DAA520', '#CD853F'],
    },
    {
      id: 2,
      name: 'Royal Ankara Collection',
      vendor: 'Textile Dreams',
      price: 18000,
      originalPrice: 25000,
      image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=300&h=300&fit=crop',
      rating: 4.6,
      sales: 89,
      badge: 'Hot Deal',
      stockLeft: 15,
      colors: ['#FF6B35', '#F7931E', '#FFD23F'],
    },
    {
      id: 3,
      name: 'Handwoven Aso-Oke',
      vendor: 'Heritage Weavers',
      price: 65000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop',
      rating: 4.9,
      sales: 67,
      badge: 'Premium',
      stockLeft: 3,
      colors: ['#8B0000', '#FFD700', '#000080'],
    },
    {
      id: 4,
      name: 'Silk Chiffon Elegance',
      vendor: 'Luxury Fabrics Ltd',
      price: 28000,
      originalPrice: 35000,
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=300&fit=crop',
      rating: 4.7,
      sales: 92,
      badge: 'Limited',
      stockLeft: 12,
      colors: ['#FFB6C1', '#DDA0DD', '#E6E6FA'],
    },
  ];

  const testimonials = [
    {
      name: 'Adunni Olamide',
      role: 'Bride & Event Host',
      content: 'The multivendor platform made our wedding planning seamless. We found amazing vendors and our guests loved the community features!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
      event: 'Royal Wedding - 250 guests',
    },
    {
      name: 'Tunde Adebayo',
      role: 'Fabric Vendor',
      content: 'As a vendor, this platform has tripled my sales. The analytics dashboard and customer management tools are incredible!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      event: 'Monthly Revenue: ₦2.4M',
    },
    {
      name: 'Kemi Adesanya',
      role: 'Community Member',
      content: 'I love following events and vendors in the community. The social features make event planning feel like a celebration itself!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
      event: 'Following 45 vendors',
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
      {/* Original Hero Section - Restored */}
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
              Premium Event Management Platform for Nigerian Celebrations
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
                event={{
                  ...event,
                  price: formatPrice(event.price)
                }}
                index={index}
              />
            )}
            className="mb-16"
          />

          {/* Trending Events Carousel */}
          <Carousel
            items={trendingEvents}
            title="Trending Events"
            itemsPerView={3}
            renderItem={(event, index) => (
              <EventCard
                event={{
                  ...event,
                  price: formatPrice(event.price)
                }}
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

      {/* Trending Fashion Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
              Trending Fashion & Top Sellers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what others are wearing and shop from our top-rated vendors
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingFashion.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group border"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold text-white ${
                        item.badge === 'Bestseller'
                          ? 'bg-green-500'
                          : item.badge === 'Hot Deal'
                          ? 'bg-red-500'
                          : item.badge === 'Premium'
                          ? 'bg-purple-500'
                          : 'bg-orange-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  {/* Stock Countdown */}
                  {item.stockLeft <= 10 && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        {item.stockLeft} left
                      </span>
                    </div>
                  )}
                  {/* Quick Actions */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-2">
                      <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                        <SafeIcon icon={FiHeart} className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                        <SafeIcon icon={FiEye} className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <SafeIcon
                          key={i}
                          icon={FiStar}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating) ? 'text-gold-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({item.sales})</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">by {item.vendor}</p>
                  {/* Colors */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm text-gray-500">Colors:</span>
                    <div className="flex space-x-1">
                      {item.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary-600">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Stock Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Stock Level</span>
                      <span>{item.stockLeft} remaining</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          item.stockLeft <= 5
                            ? 'bg-red-500'
                            : item.stockLeft <= 10
                            ? 'bg-orange-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(100, (item.stockLeft / 20) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <Link
                    to={`/product/${item.id}`}
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center inline-flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiShoppingBag} className="w-4 h-4" />
                    <span>View Product</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/marketplace"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Explore Full Marketplace</span>
              <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
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
                className="text-center p-6 rounded-xl bg-white hover:bg-primary-50 transition-colors border border-gray-100 hover:border-primary-200"
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

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stories from hosts, vendors, and community members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <SafeIcon key={i} icon={FiStar} className="w-5 h-5 text-gold-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="text-sm text-primary-600 font-medium">
                  {testimonial.event}
                </div>
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