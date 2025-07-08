import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiMapPin, FiPhone, FiMail, FiGlobe, FiStar, FiShield,
  FiTruck, FiPackage, FiClock, FiGrid, FiList, FiHeart,
  FiShoppingCart, FiEye, FiMessageSquare, FiFilter, FiChevronDown,
  FiAward, FiThumbsUp
} = FiIcons;

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [activeTab, setActiveTab] = useState('products');
  const [viewMode, setViewMode] = useState('grid');
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock vendor data
  const vendor = {
    id: vendorId || 'adire-palace',
    name: 'Adire Palace',
    slogan: 'Premium Nigerian Fabrics for Every Celebration',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=1200&h=300&fit=crop',
    description: "Adire Palace is a premium fabric vendor specializing in high-quality traditional and contemporary Nigerian textiles. We source directly from the finest artisans and manufacturers to bring you authentic, beautiful fabrics for all your special occasions. Our collection includes exquisite lace, Ankara, Aso-Oke, and other traditional Nigerian fabrics.",
    location: 'Lagos, Nigeria',
    phone: '+234 803 123 4567',
    email: 'hello@adirepalace.com',
    website: 'www.adirepalace.com',
    memberSince: '2022-03-15',
    socialLinks: {
      instagram: 'adirepalace',
      facebook: 'AdirePalace',
      twitter: 'adirepalace'
    },
    stats: {
      products: 45,
      sales: 342,
      followers: 1256,
      rating: 4.8,
      reviews: 124
    },
    badges: ['Verified Vendor', 'Top Seller', 'Fast Shipping'],
    isVerified: true,
    deliveryOptions: [
      'Store Pickup',
      'Local Delivery (Lagos)',
      'Nationwide Shipping',
      'International Shipping'
    ],
    paymentOptions: [
      'Bank Transfer',
      'Credit/Debit Cards',
      'Mobile Money',
      'PayPal (International)'
    ]
  };
  
  // Mock product categories
  const categories = [
    { id: 'all', name: 'All Products', count: 45 },
    { id: 'lace', name: 'Lace', count: 18 },
    { id: 'ankara', name: 'Ankara', count: 12 },
    { id: 'aso-oke', name: 'Aso-Oke', count: 8 },
    { id: 'adire', name: 'Adire', count: 7 }
  ];
  
  // Mock products
  const products = [
    {
      id: 1,
      name: 'Premium French Lace',
      price: 35000,
      originalPrice: 45000,
      discount: 22,
      image: 'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=300&h=300&fit=crop',
      category: 'lace',
      rating: 4.8,
      reviews: 34,
      inStock: true,
      stockCount: 15,
      badges: ['Bestseller'],
      addedToWishlist: false,
      isNew: false
    },
    {
      id: 2,
      name: 'Royal Ankara Print',
      price: 18000,
      originalPrice: 25000,
      discount: 28,
      image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=300&h=300&fit=crop',
      category: 'ankara',
      rating: 4.6,
      reviews: 28,
      inStock: true,
      stockCount: 25,
      badges: ['Hot Deal'],
      addedToWishlist: true,
      isNew: false
    },
    {
      id: 3,
      name: 'Handwoven Aso-Oke',
      price: 65000,
      originalPrice: null,
      discount: 0,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop',
      category: 'aso-oke',
      rating: 4.9,
      reviews: 19,
      inStock: true,
      stockCount: 8,
      badges: ['Premium'],
      addedToWishlist: false,
      isNew: false
    },
    {
      id: 4,
      name: 'Adire Eleko Pattern',
      price: 22000,
      originalPrice: null,
      discount: 0,
      image: 'https://images.unsplash.com/photo-1568252542512-9a39a3ff9dca?w=300&h=300&fit=crop',
      category: 'adire',
      rating: 4.7,
      reviews: 16,
      inStock: true,
      stockCount: 20,
      badges: [],
      addedToWishlist: false,
      isNew: true
    },
    {
      id: 5,
      name: 'Embroidered Lace Set',
      price: 42000,
      originalPrice: 55000,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1571513801192-b9d3d6e14b3c?w=300&h=300&fit=crop',
      category: 'lace',
      rating: 4.8,
      reviews: 22,
      inStock: true,
      stockCount: 12,
      badges: ['Premium'],
      addedToWishlist: false,
      isNew: false
    },
    {
      id: 6,
      name: 'Modern Ankara Design',
      price: 15000,
      originalPrice: 20000,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=300&fit=crop',
      category: 'ankara',
      rating: 4.5,
      reviews: 14,
      inStock: true,
      stockCount: 18,
      badges: [],
      addedToWishlist: false,
      isNew: true
    }
  ];
  
  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: 'Adunni Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '2024-01-15',
      title: 'Exceptional Quality and Service',
      comment: 'I ordered the Premium French Lace for my wedding, and I am beyond impressed! The quality was exceptional, and the delivery was prompt. The team was very responsive and helpful throughout the process. Highly recommend!',
      product: 'Premium French Lace',
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=100&h=100&fit=crop'
      ],
      helpful: 12
    },
    {
      id: 2,
      user: 'Tunde Adebayo',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      rating: 4,
      date: '2024-01-10',
      title: 'Great Ankara Fabrics',
      comment: 'The Ankara prints are vibrant and of good quality. Shipping was a bit delayed but the overall experience was positive. Would order again.',
      product: 'Royal Ankara Print',
      images: [],
      helpful: 5
    },
    {
      id: 3,
      user: 'Kemi Adesanya',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '2023-12-28',
      title: 'Stunning Aso-Oke',
      comment: 'The handwoven Aso-Oke is absolutely stunning! The craftsmanship is impeccable and the colors are rich and beautiful. It was perfect for our traditional ceremony. Everyone was asking where I got it from!',
      product: 'Handwoven Aso-Oke',
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&h=100&fit=crop'
      ],
      helpful: 8
    }
  ];
  
  // Filter products based on category
  const filteredProducts = products.filter(product => {
    return selectedCategory === 'all' || product.category === selectedCategory;
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
        return b.isNew ? 1 : -1;
      case 'popular':
      default:
        return b.reviews - a.reviews;
    }
  });
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };
  
  const toggleWishlist = (productId) => {
    // Handle wishlist toggle
    console.log('Toggle wishlist for product:', productId);
  };
  
  const addToCart = (productId) => {
    // Handle add to cart
    console.log('Add to cart:', productId);
  };
  
  const markReviewHelpful = (reviewId) => {
    // Handle marking review as helpful
    console.log('Mark review as helpful:', reviewId);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 bg-gray-300">
        <img
          src={vendor.coverImage}
          alt={`${vendor.name}'s cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Vendor Header */}
        <div className="relative bg-white rounded-xl shadow-sm -mt-20 mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <img
                src={vendor.avatar}
                alt={vendor.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover -mt-20 sm:-mt-24"
              />
              
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold text-gray-900">{vendor.name}</h1>
                  {vendor.isVerified && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <SafeIcon icon={FiShield} className="w-3 h-3 mr-1" />
                      Verified Vendor
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mt-1">{vendor.slogan}</p>
                
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <div className="flex items-center text-gray-600 text-sm">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-1" />
                    {vendor.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <SafeIcon icon={FiStar} className="w-4 h-4 mr-1 text-gold-500" />
                    <span>{vendor.stats.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{vendor.stats.reviews} reviews</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <SafeIcon icon={FiPackage} className="w-4 h-4 mr-1" />
                    {vendor.stats.sales} sales
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-3">
                  {vendor.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3 self-start">
                <button
                  onClick={toggleFollow}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isFollowing
                      ? 'bg-primary-50 text-primary-700 border border-primary-300'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Description */}
            <div className="mt-6">
              <p className="text-gray-600">{vendor.description}</p>
            </div>
            
            {/* Contact & Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <SafeIcon icon={FiPhone} className="w-5 h-5 mr-3" />
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <SafeIcon icon={FiMail} className="w-5 h-5 mr-3" />
                    <span>{vendor.email}</span>
                  </div>
                  {vendor.website && (
                    <div className="flex items-center text-gray-600">
                      <SafeIcon icon={FiGlobe} className="w-5 h-5 mr-3" />
                      <a
                        href={`https://${vendor.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {vendor.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Shipping & Delivery</h3>
                
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiTruck} className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Delivery Options</p>
                      <ul className="text-sm text-gray-600 list-disc pl-4 mt-1">
                        {vendor.deliveryOptions.map((option, i) => (
                          <li key={i}>{option}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiClock} className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Processing Time</p>
                      <p className="text-sm text-gray-600">1-2 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs & Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'products', label: 'Products' },
                { id: 'reviews', label: `Reviews (${vendor.stats.reviews})` },
                { id: 'about', label: 'About' },
                { id: 'policies', label: 'Policies' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
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
          
          <div className="p-6">
            {activeTab === 'products' && (
              <div className="space-y-6">
                {/* Products Header */}
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex space-x-4 items-center">
                    <div className="relative">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 transition-colors"
                      >
                        <SafeIcon icon={FiFilter} className="w-4 h-4 text-gray-500" />
                        <span>Filter</span>
                        <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-500" />
                      </button>
                      
                      {showFilters && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                          <div className="space-y-1 mb-4">
                            {categories.map(category => (
                              <button
                                key={category.id}
                                onClick={() => {
                                  setSelectedCategory(category.id);
                                  setShowFilters(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                                  selectedCategory === category.id
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <span>{category.name}</span>
                                <span className="text-gray-500 text-xs">{category.count}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      className="bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                  
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2 ${
                        viewMode === 'grid'
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700'
                      } hover:bg-primary-50 transition-colors`}
                    >
                      <SafeIcon icon={FiGrid} className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-4 py-2 ${
                        viewMode === 'list'
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700'
                      } hover:bg-primary-50 transition-colors`}
                    >
                      <SafeIcon icon={FiList} className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Products Grid/List */}
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                  {sortedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      <div className={`relative ${viewMode === 'list' ? 'w-40 h-40' : 'w-full h-60'}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Badges */}
                        {product.badges.length > 0 && (
                          <div className="absolute top-2 left-2">
                            {product.badges.map((badge, i) => (
                              <span
                                key={i}
                                className={`px-2 py-1 rounded-full text-xs font-medium text-white block mb-1 ${
                                  badge === 'Bestseller'
                                    ? 'bg-green-500'
                                    : badge === 'Hot Deal'
                                    ? 'bg-red-500'
                                    : badge === 'Premium'
                                    ? 'bg-purple-500'
                                    : 'bg-blue-500'
                                }`}
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Discount Badge */}
                        {product.discount > 0 && (
                          <div className="absolute top-2 right-2">
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              -{product.discount}%
                            </span>
                          </div>
                        )}
                        
                        {/* Quick Actions */}
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                                product.addedToWishlist
                                  ? 'bg-red-500 text-white'
                                  : 'bg-white text-gray-600 hover:bg-gray-50'
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
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        
                        {/* Rating */}
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <SafeIcon
                                key={i}
                                icon={FiStar}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-gold-500 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({product.reviews})</span>
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-600">{product.stockCount} in stock</span>
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
                            <span>Add to Cart</span>
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
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <SafeIcon icon={FiPackage} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">
                      {selectedCategory !== 'all'
                        ? `There are no products in the "${
                            categories.find(c => c.id === selectedCategory)?.name || 'selected'
                          }" category.`
                        : 'No products match your criteria.'}
                    </p>
                    {selectedCategory !== 'all' && (
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                      >
                        View All Products
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Reviews Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <SafeIcon
                          key={i}
                          icon={FiStar}
                          className={`w-6 h-6 ${
                            i < Math.floor(vendor.stats.rating)
                              ? 'text-gold-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div>
                      <span className="font-bold text-2xl text-gray-900">{vendor.stats.rating}</span>
                      <span className="text-gray-600 ml-1">/ 5</span>
                    </div>
                    <span className="text-gray-600">Based on {vendor.stats.reviews} reviews</span>
                  </div>
                  
                  <Link
                    to={`/review/vendor/${vendor.id}`}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Write a Review
                  </Link>
                </div>
                
                {/* Review List */}
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4">
                          <img
                            src={review.avatar}
                            alt={review.user}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.user}</h4>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <SafeIcon
                                    key={i}
                                    icon={FiStar}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-gold-500 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Purchased:</span> {review.product}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                        <p className="text-gray-700">{review.comment}</p>
                        
                        {review.images && review.images.length > 0 && (
                          <div className="mt-4 flex space-x-2">
                            {review.images.map((image, i) => (
                              <div key={i} className="w-16 h-16 rounded-lg overflow-hidden">
                                <img src={image} alt={`Review ${i + 1}`} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => markReviewHelpful(review.id)}
                            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                          >
                            <SafeIcon icon={FiThumbsUp} className="w-4 h-4" />
                            <span>Helpful ({review.helpful})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About {vendor.name}</h3>
                  <p className="text-gray-600">{vendor.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">{vendor.location}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="font-medium text-gray-900">
                        {new Date(vendor.memberSince).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Sales</p>
                      <p className="font-medium text-gray-900">{vendor.stats.sales}+</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Average Rating</p>
                      <div className="flex items-center">
                        <p className="font-medium text-gray-900 mr-2">{vendor.stats.rating}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <SafeIcon
                              key={i}
                              icon={FiStar}
                              className={`w-4 h-4 ${
                                i < Math.floor(vendor.stats.rating)
                                  ? 'text-gold-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications & Achievements</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                      <SafeIcon icon={FiShield} className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Verified Vendor</p>
                        <p className="text-sm text-gray-600">Identity & business verified</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                      <SafeIcon icon={FiAward} className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Top Seller</p>
                        <p className="text-sm text-gray-600">Consistent high performance</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                      <SafeIcon icon={FiTruck} className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">Fast Shipping</p>
                        <p className="text-sm text-gray-600">Reliable & prompt delivery</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'policies' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Policy</h3>
                  <p className="text-gray-600 mb-4">
                    We strive to provide the fastest and most reliable shipping options for all our customers.
                    All orders are processed within 1-2 business days. Delivery times may vary depending on
                    your location and the shipping option selected.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Delivery Options</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {vendor.deliveryOptions.map((option, i) => (
                        <li key={i}>{option}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Return & Refund Policy</h3>
                  <p className="text-gray-600 mb-4">
                    We want you to be completely satisfied with your purchase. If you're not happy with your
                    order for any reason, please contact us within 7 days of receiving your item.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Return Conditions</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>Item must be unused and in original packaging</li>
                      <li>Custom orders cannot be returned unless defective</li>
                      <li>Buyer is responsible for return shipping costs</li>
                      <li>Refunds will be processed within 5-7 business days after inspection</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Options</h3>
                  <p className="text-gray-600 mb-4">
                    We offer multiple payment options to make your shopping experience convenient and secure.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Accepted Payment Methods</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {vendor.paymentOptions.map((option, i) => (
                        <li key={i}>{option}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;