import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShoppingCart, FiHeart, FiEye, FiFilter, FiSearch, FiGrid, FiList } = FiIcons;

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'All Fabrics' },
    { id: 'lace', name: 'Lace' },
    { id: 'ankara', name: 'Ankara' },
    { id: 'aso-oke', name: 'Aso-Oke' },
    { id: 'silk', name: 'Silk' },
    { id: 'chiffon', name: 'Chiffon' },
    { id: 'accessories', name: 'Accessories' },
  ];

  const fabrics = [
    {
      id: 1,
      name: 'Premium French Lace',
      category: 'lace',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=400&h=400&fit=crop',
      description: 'Elegant French lace with intricate patterns',
      colors: ['#8B4513', '#DAA520', '#CD853F'],
      inStock: true,
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: 'Royal Ankara Print',
      category: 'ankara',
      price: 8000,
      image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=400&fit=crop',
      description: 'Vibrant traditional Ankara fabric',
      colors: ['#FF6B35', '#F7931E', '#FFD23F'],
      inStock: true,
      rating: 4.6,
      reviews: 89,
    },
    {
      id: 3,
      name: 'Handwoven Aso-Oke',
      category: 'aso-oke',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
      description: 'Traditional handwoven Aso-Oke fabric',
      colors: ['#8B0000', '#FFD700', '#000080'],
      inStock: true,
      rating: 4.9,
      reviews: 67,
    },
    {
      id: 4,
      name: 'Silk Chiffon Blend',
      category: 'chiffon',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop',
      description: 'Luxurious silk chiffon blend',
      colors: ['#FFB6C1', '#DDA0DD', '#E6E6FA'],
      inStock: false,
      rating: 4.7,
      reviews: 92,
    },
    {
      id: 5,
      name: 'Embroidered Lace',
      category: 'lace',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1571513801192-b9d3d6e14b3c?w=400&h=400&fit=crop',
      description: 'Handcrafted embroidered lace',
      colors: ['#FFFFFF', '#F5F5DC', '#FFF8DC'],
      inStock: true,
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 6,
      name: 'Geometric Ankara',
      category: 'ankara',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop',
      description: 'Modern geometric Ankara design',
      colors: ['#4169E1', '#FF1493', '#32CD32'],
      inStock: true,
      rating: 4.5,
      reviews: 78,
    },
    {
      id: 7,
      name: 'Gold Gele Set',
      category: 'accessories',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&h=400&fit=crop',
      description: 'Premium gold gele with matching accessories',
      colors: ['#FFD700', '#FFA500', '#FF8C00'],
      inStock: true,
      rating: 4.6,
      reviews: 43,
    },
    {
      id: 8,
      name: 'Velvet Lace Premium',
      category: 'lace',
      price: 40000,
      image: 'https://images.unsplash.com/photo-1506629905607-c28f2b6f8e5e?w=400&h=400&fit=crop',
      description: 'Luxurious velvet lace fabric',
      colors: ['#800080', '#4B0082', '#8B008B'],
      inStock: true,
      rating: 4.9,
      reviews: 201,
    },
  ];

  const filteredFabrics = fabrics.filter(fabric => {
    const matchesSearch = fabric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fabric.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || fabric.category === selectedCategory;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && fabric.price < 15000) ||
                        (priceRange === 'mid' && fabric.price >= 15000 && fabric.price < 30000) ||
                        (priceRange === 'high' && fabric.price >= 30000);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-gray-900">Fabric Catalog</h1>
          <p className="text-gray-600 mt-1">Discover premium fabrics and accessories for your events</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search fabrics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <SafeIcon icon={FiFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="all">All Prices</option>
              <option value="low">Under ₦15,000</option>
              <option value="mid">₦15,000 - ₦30,000</option>
              <option value="high">Above ₦30,000</option>
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
            Showing {filteredFabrics.length} of {fabrics.length} fabrics
          </p>
        </div>

        {/* Fabric Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {filteredFabrics.map((fabric, index) => (
            <motion.div
              key={fabric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'w-full h-64'}`}>
                <img
                  src={fabric.image}
                  alt={fabric.name}
                  className="w-full h-full object-cover"
                />
                {!fabric.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                    <SafeIcon icon={FiHeart} className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                    <SafeIcon icon={FiEye} className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{fabric.name}</h3>
                  <span className="text-lg font-bold text-primary-600">{formatPrice(fabric.price)}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{fabric.description}</p>

                {/* Colors */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-sm text-gray-500">Colors:</span>
                  <div className="flex space-x-1">
                    {fabric.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <SafeIcon
                        key={i}
                        icon={FiEye}
                        className={`w-4 h-4 ${i < Math.floor(fabric.rating) ? 'text-gold-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({fabric.reviews})</span>
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!fabric.inStock}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors inline-flex items-center justify-center space-x-2 ${
                    fabric.inStock
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <SafeIcon icon={FiShoppingCart} className="w-4 h-4" />
                  <span>{fabric.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFabrics.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiFilter} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No fabrics found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange('all');
              }}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;