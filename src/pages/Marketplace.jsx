import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiShoppingCart, FiHeart, FiEye, FiFilter, FiSearch, FiGrid, FiList, 
  FiStar, FiTrendingUp, FiClock, FiShield, FiTruck, FiPercent,
  FiUser, FiMapPin, FiAward
} = FiIcons;

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilters, setSelectedFilters] = useState({
    onSale: false,
    inStock: false,
    fastDelivery: false,
    verified: false,
  });

  const categories = [
    { id: 'all', name: 'All Products', count: 1247 },
    { id: 'lace', name: 'Lace', count: 342 },
    { id: 'ankara', name: 'Ankara', count: 289 },
    { id: 'aso-oke', name: 'Aso-Oke', count: 156 },
    { id: 'silk', name: 'Silk', count: 98 },
    { id: 'chiffon', name: 'Chiffon', count: 134 },
    { id: 'accessories', name: 'Accessories', count: 228 },
  ];

  const products = [
    {
      id: 1,
      name: 'Premium French Lace Collection',
      vendor: {
        name: 'Adire Palace',
        id: 'adire-palace',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        verified: true,
        rating: 4.8,
        location: 'Lagos, Nigeria'
      },
      category: 'lace',
      price: 35000,
      originalPrice: 45000,
      image: 'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=400&h=400&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1571513801192-b9d3d6e14b3c?w=400&h=400&fit=crop',
      ],
      description: 'Elegant French lace with intricate patterns, perfect for weddings and special occasions.',
      colors: ['#8B4513', '#DAA520', '#CD853F'],
      sizes: ['2.5 yards', '3 yards', '5 yards'],
      inStock: true,
      stockCount: 15,
      rating: 4.8,
      reviews: 124,
      sales: 342,
      badges: ['Bestseller', 'Fast Delivery'],
      features: ['Premium Quality', 'Hand-crafted', 'International Shipping'],
      deliveryTime: '2-5 days',
      variations: [
        { name: 'Standard Package', price: 35000, description: '2.5 yards + basic styling guide' },
        { name: 'Premium Package', price: 55000, description: '3 yards + gele + accessories' },
        { name: 'VIP Package', price: 85000, description: '5 yards + premium accessories + styling session' }
      ],
      wishlistCount: 89,
      addedToWishlist: false,
      addedToCart: false,
      discount: 22,
      trending: true,
      newArrival: false,
    },
    {
      id: 2,
      name: 'Royal Ankara Print Collection',
      vendor: {
        name: 'Textile Dreams',
        id: 'textile-dreams',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        verified: true,
        rating: 4.6,
        location: 'Kano, Nigeria'
      },
      category: 'ankara',
      price: 18000,
      originalPrice: 25000,
      image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=400&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop',
      ],
      description: 'Vibrant traditional Ankara fabric with authentic African patterns.',
      colors: ['#FF6B35', '#F7931E', '#FFD23F'],
      sizes: ['2 yards', '3 yards', '4 yards'],
      inStock: true,
      stockCount: 28,
      rating: 4.6,
      reviews: 89,
      sales: 156,
      badges: ['Hot Deal', 'Limited Edition'],
      features: ['100% Cotton', 'Colorfast', 'Machine Washable'],
      deliveryTime: '3-7 days',
      variations: [
        { name: 'Single Yard', price: 18000, description: '2 yards' },
        { name: 'Family Package', price: 45000, description: '6 yards for family coordination' },
      ],
      wishlistCount: 67,
      addedToWishlist: false,
      addedToCart: false,
      discount: 28,
      trending: false,
      newArrival: true,
    },
    {
      id: 3,
      name: 'Handwoven Aso-Oke Heritage',
      vendor: {
        name: 'Heritage Weavers',
        id: 'heritage-weavers',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        verified: true,
        rating: 4.9,
        location: 'Oyo, Nigeria'
      },
      category: 'aso-oke',
      price: 65000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
      ],
      description: 'Traditional handwoven Aso-Oke fabric by master craftsmen.',
      colors: ['#8B0000', '#FFD700', '#000080'],
      sizes: ['3 yards', '4 yards', '6 yards'],
      inStock: true,
      stockCount: 8,
      rating: 4.9,
      reviews: 67,
      sales: 89,
      badges: ['Premium', 'Artisan Made'],
      features: ['Handwoven', 'Heritage Quality', 'Authentic Yoruba'],
      deliveryTime: '5-10 days',
      variations: [
        { name: 'Traditional Set', price: 65000, description: '3 yards traditional weave' },
        { name: 'Royal Set', price: 120000, description: '6 yards with gold threading' },
      ],
      wishlistCount: 156,
      addedToWishlist: true,
      addedToCart: false,
      discount: 0,
      trending: true,
      newArrival: false,
    },
    {
      id: 4,
      name: 'Silk Chiffon Elegance',
      vendor: {
        name: 'Luxury Fabrics Ltd',
        id: 'luxury-fabrics',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        verified: true,
        rating: 4.7,
        location: 'Abuja, Nigeria'
      },
      category: 'chiffon',
      price: 28000,
      originalPrice: 35000,
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop',
      ],
      description: 'Luxurious silk chiffon blend perfect for elegant occasions.',
      colors: ['#FFB6C1', '#DDA0DD', '#E6E6FA'],
      sizes: ['2 yards', '3 yards'],
      inStock: true,
      stockCount: 22,
      rating: 4.7,
      reviews: 92,
      sales: 78,
      badges: ['Limited Stock'],
      features: ['Silk Blend', 'Lightweight', 'Drapes Beautifully'],
      deliveryTime: '2-4 days',
      variations: [
        { name: 'Standard Length', price: 28000, description: '2 yards' },
        { name: 'Extended Length', price: 42000, description: '3 yards' },
      ],
      wishlistCount: 45,
      addedToWishlist: false,
      addedToCart: false,
      discount: 20,
      trending: false,
      newArrival: false,
    },
    {
      id: 5,
      name: 'Embroidered Lace Masterpiece',
      vendor: {
        name: 'Adire Palace',
        id: 'adire-palace',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        verified: true,
        rating: 4.8,
        location: 'Lagos, Nigeria'
      },
      category: 'lace',
      price: 42000,
      originalPrice: 55000,
      image: 'https://images.unsplash.com/photo-1571513801192-b9d3d6e14b3c?w=400&h=400&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1571513801192-b9d3d6e14b3c?w=400&h=400&fit=crop',
      ],
      description: 'Handcrafted embroidered lace with detailed beadwork.',
      colors: ['#FFFFFF', '#F5F5DC', '#FFF8DC'],
      sizes: ['2.5 yards', '3 yards'],
      inStock: true,
      stockCount: 12,
      rating: 4.8,
      reviews: 156,
      sales: 234,
      badges: ['Bestseller', 'Premium'],
      features: ['Hand Embroidered', 'Beadwork Detail', 'Luxury Grade'],
      deliveryTime: '3-6 days',
      variations: [
        { name: 'Classic White', price: 42000, description: '2.5 yards embroidered lace' },
        { name: 'Ivory Elegance', price: 48000, description: '3 yards with premium beading' },
      ],
      wishlistCount: 198,
      addedToWishlist: false,
      addedToCart: true,
      discount: 24,
      trending: true,
      newArrival: false,
    },
    {
      id: 6,
      name: 'Geometric Ankara Modern',
      vendor: {
        name: 'Modern African Prints',
        id: 'modern-african',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        verified: false,
        rating: 4.5,
        location: 'Ibadan, Nigeria'
      },
      category: 'ankara',
      price: 15000,
      originalPrice: 20000,
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop',
      ],
      description: 'Modern geometric Ankara design for contemporary fashion.',
      colors: ['#4169E1', '#FF1493', '#32CD32'],
      sizes: ['2 yards', '3 yards'],
      inStock: true,
      stockCount: 35,
      rating: 4.5,
      reviews: 78,
      sales: 123,
      badges: ['New Arrival'],
      features: ['Modern Design', 'Vibrant Colors', 'Quality Print'],
      deliveryTime: '4-8 days',
      variations: [
        { name: 'Standard Cut', price: 15000, description: '2 yards' },
        { name: 'Extended Cut', price: 22500, description: '3 yards' },
      ],
      wishlistCount: 34,
      addedToWishlist: false,
      addedToCart: false,
      discount: 25,
      trending: false,
      newArrival: true,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && product.price < 20000) ||
                        (priceRange === 'mid' && product.price >= 20000 && product.price < 40000) ||
                        (priceRange === 'high' && product.price >= 40000);
    
    const matchesFilters = (!selectedFilters.onSale || product.originalPrice) &&
                          (!selectedFilters.inStock || product.inStock) &&
                          (!selectedFilters.fastDelivery || product.deliveryTime.includes('2-5') || product.deliveryTime.includes('2-4')) &&
                          (!selectedFilters.verified || product.vendor.verified);

    return matchesSearch && matchesCategory && matchesPrice && matchesFilters;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.newArrival ? 1 : -1;
      case 'popular':
      default:
        return b.sales - a.sales;
    }
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleWishlist = (productId) => {
    // Handle wishlist toggle
    console.log('Toggle wishlist for product:', productId);
  };

  const addToCart = (productId) => {
    // Handle add to cart
    console.log('Add to cart:', productId);
  };

  const toggleFilter = (filterName) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-1">Discover premium fabrics and accessories from verified vendors</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-gray-500">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'low', label: 'Under ₦20,000' },
                  { id: 'mid', label: '₦20,000 - ₦40,000' },
                  { id: 'high', label: 'Above ₦40,000' },
                ].map(range => (
                  <button
                    key={range.id}
                    onClick={() => setPriceRange(range.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      priceRange === range.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="space-y-3">
                {[
                  { key: 'onSale', label: 'On Sale', icon: FiPercent },
                  { key: 'inStock', label: 'In Stock', icon: FiShield },
                  { key: 'fastDelivery', label: 'Fast Delivery', icon: FiTruck },
                  { key: 'verified', label: 'Verified Vendors', icon: FiAward },
                ].map(filter => (
                  <label key={filter.key} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters[filter.key]}
                      onChange={() => toggleFilter(filter.key)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <SafeIcon icon={filter.icon} className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{filter.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products, vendors, or descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'} hover:bg-primary-50 transition-colors`}
                  >
                    <SafeIcon icon={FiGrid} className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'} hover:bg-primary-50 transition-colors`}
                  >
                    <SafeIcon icon={FiList} className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {sortedProducts.length} of {products.length} products
              </p>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6'}>
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-64 h-64' : 'w-full h-64'}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-1">
                      {product.badges.map((badge, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                            badge === 'Bestseller' ? 'bg-green-500' :
                            badge === 'Hot Deal' ? 'bg-red-500' :
                            badge === 'Premium' ? 'bg-purple-500' :
                            badge === 'New Arrival' ? 'bg-blue-500' :
                            badge === 'Limited Edition' ? 'bg-orange-500' :
                            'bg-gray-500'
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                      {product.trending && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-pink-500 text-white">
                          🔥 Trending
                        </span>
                      )}
                    </div>

                    {/* Discount */}
                    {product.discount > 0 && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{product.discount}%
                        </span>
                      </div>
                    )}

                    {/* Stock Alert */}
                    {product.stockCount <= 10 && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Only {product.stockCount} left
                        </span>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                            product.addedToWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <SafeIcon icon={FiHeart} className="w-4 h-4" />
                        </button>
                        <Link
                          to={`/product/${product.id}`}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <SafeIcon icon={FiEye} className="w-4 h-4 text-gray-600" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    {/* Vendor Info */}
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src={product.vendor.avatar}
                        alt={product.vendor.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <Link
                        to={`/vendor/${product.vendor.id}`}
                        className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {product.vendor.name}
                      </Link>
                      {product.vendor.verified && (
                        <SafeIcon icon={FiShield} className="w-4 h-4 text-blue-500" />
                      )}
                    </div>

                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                    {/* Colors */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-500">Colors:</span>
                      <div className="flex space-x-1">
                        {product.colors.slice(0, 3).map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                        )}
                      </div>
                    </div>

                    {/* Rating & Sales */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <SafeIcon
                              key={i}
                              icon={FiStar}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? 'text-gold-500 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({product.reviews})</span>
                      </div>
                      <span className="text-sm text-gray-500">{product.sales} sold</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <SafeIcon icon={FiTruck} className="w-4 h-4 mr-1" />
                        {product.deliveryTime}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors inline-flex items-center justify-center space-x-2 ${
                          product.inStock
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <SafeIcon icon={FiShoppingCart} className="w-4 h-4" />
                        <span>{product.addedToCart ? 'Added' : product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                      </button>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          product.addedToWishlist
                            ? 'border-red-300 bg-red-50 text-red-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <SafeIcon icon={FiHeart} className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <SafeIcon icon={FiSearch} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setPriceRange('all');
                    setSelectedFilters({
                      onSale: false,
                      inStock: false,
                      fastDelivery: false,
                      verified: false,
                    });
                  }}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More */}
            {sortedProducts.length > 0 && sortedProducts.length < products.length && (
              <div className="text-center mt-12">
                <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;