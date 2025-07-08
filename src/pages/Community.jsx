import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiUsers, FiMessageSquare, FiHeart, FiCalendar, FiShoppingBag, 
  FiGlobe, FiSearch, FiFilter, FiGrid, FiList, FiEye, FiShare2,
  FiMoreHorizontal, FiStar, FiTrendingUp, FiMapPin, FiClock
} = FiIcons;

const Community = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');

  const tabs = [
    { id: 'trending', label: 'Trending', icon: FiTrendingUp },
    { id: 'latest', label: 'Latest', icon: FiClock },
    { id: 'events', label: 'Events', icon: FiCalendar },
    { id: 'vendors', label: 'Vendors', icon: FiShoppingBag },
    { id: 'members', label: 'Members', icon: FiUsers },
  ];

  // Mock community data
  const communityPosts = [
    {
      id: 1,
      type: 'event',
      title: "Adunni & Tunde's Wedding Highlights",
      content: "We're excited to share some beautiful moments from our royal wedding celebration! Thank you to all our guests and vendors who made it special.",
      author: {
        id: 'adunni',
        name: 'Adunni Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
        role: 'Event Host'
      },
      date: '2024-01-15',
      images: [
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
      ],
      likes: 245,
      comments: 56,
      shares: 32,
      isLiked: true,
      tags: ['wedding', 'celebration', 'asoebi'],
      trending: true,
    },
    {
      id: 2,
      type: 'vendor',
      title: "New Premium French Lace Collection Just Arrived!",
      content: "We've just received our new shipment of premium French lace directly from Paris. Limited quantities available - perfect for your next special occasion!",
      author: {
        id: 'textile-dreams',
        name: 'Textile Dreams',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
        role: 'Verified Vendor'
      },
      date: '2024-01-14',
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=400&h=400&fit=crop',
      ],
      likes: 178,
      comments: 34,
      shares: 15,
      isLiked: false,
      product: {
        id: 1,
        name: 'Premium French Lace',
        price: '₦35,000',
        originalPrice: '₦45,000',
        discount: 22,
      },
      tags: ['fabric', 'lace', 'new-arrival'],
      trending: true,
    },
    {
      id: 3,
      type: 'discussion',
      title: "What's your favorite Asoebi color combination?",
      content: "I'm planning my sister's wedding for next month and trying to decide on the perfect Asoebi color combination. What are your favorites? Looking for something elegant but unique!",
      author: {
        id: 'kemi',
        name: 'Kemi Adesanya',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
        role: 'Community Member'
      },
      date: '2024-01-12',
      images: [],
      likes: 89,
      comments: 124,
      shares: 5,
      isLiked: false,
      poll: {
        question: 'Favorite color combinations?',
        options: [
          { text: 'Blue & Gold', votes: 45 },
          { text: 'Burgundy & Silver', votes: 32 },
          { text: 'Emerald & Champagne', votes: 67 },
          { text: 'Purple & Peach', votes: 28 },
        ],
        totalVotes: 172,
        userVoted: 2
      },
      tags: ['question', 'colors', 'planning'],
      trending: false,
    },
    {
      id: 4,
      type: 'event',
      title: "Traditional Engagement Ceremony - Igba Nkwu",
      content: "Sharing some beautiful moments from our traditional engagement ceremony. The cultural displays were amazing!",
      author: {
        id: 'bola',
        name: 'Bola Okafor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
        role: 'Event Host'
      },
      date: '2024-01-10',
      images: [
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
      ],
      likes: 156,
      comments: 42,
      shares: 18,
      isLiked: false,
      event: {
        id: 2,
        title: 'Bola & Chike Traditional Engagement',
        date: '2024-01-08',
        location: 'Enugu, Nigeria',
      },
      tags: ['traditional', 'igbo', 'engagement'],
      trending: true,
    },
  ];

  // Filter posts based on active tab and search
  const filteredPosts = communityPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesTab = activeTab === 'trending' ? post.trending :
                      activeTab === 'latest' ? true :
                      activeTab === 'events' ? post.type === 'event' :
                      activeTab === 'vendors' ? post.type === 'vendor' :
                      activeTab === 'members' ? post.type === 'discussion' : true;
    
    return matchesSearch && matchesTab;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'likes':
        return b.likes - a.likes;
      case 'comments':
        return b.comments - a.comments;
      case 'popular':
      default:
        return (b.likes + b.comments * 2) - (a.likes + a.comments * 2);
    }
  });

  const toggleLike = (postId) => {
    console.log('Toggle like for post:', postId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-gray-900">Community</h1>
          <p className="text-gray-600 mt-1">Connect with event hosts, vendors, and community members</p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search community posts, events, members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <SafeIcon icon={FiFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                >
                  <option value="popular">Most Popular</option>
                  <option value="recent">Most Recent</option>
                  <option value="likes">Most Liked</option>
                  <option value="comments">Most Discussed</option>
                </select>
              </div>

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
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 min-w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md font-medium transition-colors inline-flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Community Posts */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
          {sortedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                {/* Author Info */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <Link to={`/profile/${post.author.id}`}>
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </Link>
                    <div>
                      <Link to={`/profile/${post.author.id}`} className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
                        {post.author.name}
                      </Link>
                      <p className="text-sm text-gray-500">{post.author.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <SafeIcon icon={FiMoreHorizontal} className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Post Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>

                {/* Post Content */}
                <p className="text-gray-600 mb-4">{post.content}</p>

                {/* Post Type Specific Content */}
                {post.type === 'vendor' && post.product && (
                  <Link
                    to={`/product/${post.product.id}`}
                    className="block bg-gray-50 rounded-lg p-4 mb-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                        <SafeIcon icon={FiShoppingBag} className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{post.product.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-primary-600">{post.product.price}</span>
                          {post.product.originalPrice && (
                            <>
                              <span className="text-sm text-gray-500 line-through">{post.product.originalPrice}</span>
                              <span className="text-sm text-red-600">-{post.product.discount}%</span>
                            </>
                          )}
                        </div>
                        <span className="text-sm text-primary-600 font-medium">View Product</span>
                      </div>
                    </div>
                  </Link>
                )}

                {post.type === 'event' && post.event && (
                  <Link
                    to={`/event/${post.event.id}`}
                    className="block bg-gray-50 rounded-lg p-4 mb-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                        <SafeIcon icon={FiCalendar} className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{post.event.title}</h4>
                        <div className="flex items-center text-sm text-gray-600 space-x-3">
                          <span className="flex items-center">
                            <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                            {new Date(post.event.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-1" />
                            {post.event.location}
                          </span>
                        </div>
                        <span className="text-sm text-primary-600 font-medium">View Event</span>
                      </div>
                    </div>
                  </Link>
                )}

                {post.type === 'discussion' && post.poll && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-3">{post.poll.question}</h4>
                    <div className="space-y-2">
                      {post.poll.options.map((option, i) => (
                        <div key={i} className="relative">
                          <div className="w-full h-10 bg-gray-200 rounded-lg overflow-hidden">
                            <div
                              className={`h-full ${
                                post.poll.userVoted === i ? 'bg-primary-500' : 'bg-primary-200'
                              }`}
                              style={{ width: `${(option.votes / post.poll.totalVotes) * 100}%` }}
                            ></div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-between px-3">
                            <span className="font-medium text-gray-900">{option.text}</span>
                            <span className="text-sm font-medium">
                              {Math.round((option.votes / post.poll.totalVotes) * 100)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{post.poll.totalVotes} votes</p>
                  </div>
                )}

                {/* Post Images */}
                {post.images && post.images.length > 0 && (
                  <div className={`mb-4 grid gap-2 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {post.images.map((image, i) => (
                      <img
                        key={i}
                        src={image}
                        alt={`${post.title} image ${i + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, i) => (
                      <Link
                        key={i}
                        to={`/community/tag/${tag}`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex space-x-6">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center space-x-1 ${
                        post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      } transition-colors`}
                    >
                      <SafeIcon icon={FiHeart} className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors">
                      <SafeIcon icon={FiMessageSquare} className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors">
                      <SafeIcon icon={FiShare2} className="w-5 h-5" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                  <Link
                    to={`/community/post/${post.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedPosts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <SafeIcon icon={FiUsers} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Be the first to post in this category!'}
            </p>
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              Create New Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;