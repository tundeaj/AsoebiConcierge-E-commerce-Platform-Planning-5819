import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiUser, FiCalendar, FiMapPin, FiMail, FiPhone, FiGlobe, 
  FiHeart, FiUsers, FiShoppingBag, FiMessageSquare, FiImage,
  FiStar, FiEdit, FiLink, FiGrid, FiList, FiChevronDown, FiCheck
} = FiIcons;

const Profile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllBio, setShowAllBio] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Mock user data - replace with actual API call
  const user = {
    id: 'adunni',
    name: 'Adunni Johnson',
    role: 'Event Host',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=300&fit=crop',
    bio: "Wedding enthusiast and event planner based in Lagos, Nigeria. I'm passionate about creating beautiful celebrations that honor Nigerian traditions while incorporating modern elements. Recently married and excited to share my journey and tips with others planning their special day!",
    location: 'Lagos, Nigeria',
    email: 'adunni@email.com',
    phone: '+234 803 123 4567',
    website: 'www.adunnievents.com',
    memberSince: '2023-06-15',
    socialLinks: {
      instagram: 'adunni_events',
      facebook: 'AdunniEvents',
      twitter: 'adunni_events'
    },
    stats: {
      posts: 34,
      events: 12,
      followers: 1256,
      following: 245
    },
    badges: ['Top Contributor', 'Event Expert', 'Verified Host'],
    isVerified: true,
    isCurrentUser: false,
    recentActivity: {
      lastSeen: '2024-01-15T15:30:00',
      lastPosted: '2024-01-14T10:15:00'
    }
  };

  const userPosts = [
    {
      id: 1,
      type: 'event',
      title: "Our Royal Wedding Highlights",
      content: "We're excited to share some beautiful moments from our royal wedding celebration! Thank you to all our guests and vendors who made it special.",
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
    },
    {
      id: 2,
      type: 'post',
      title: "5 Tips for Choosing the Perfect Asoebi",
      content: "After coordinating dozens of events, here are my top tips for selecting the perfect Asoebi fabric for your celebration:",
      date: '2024-01-10',
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=400&h=400&fit=crop',
      ],
      likes: 178,
      comments: 34,
      shares: 15,
      isLiked: false,
      tags: ['tips', 'asoebi', 'planning'],
    },
    {
      id: 3,
      type: 'question',
      title: "Vendor recommendations for traditional drummers?",
      content: "We're looking for excellent traditional drummers for our engagement ceremony next month. Any recommendations in the Lagos area?",
      date: '2024-01-05',
      images: [],
      likes: 32,
      comments: 28,
      shares: 5,
      isLiked: false,
      tags: ['question', 'vendors', 'traditional'],
    },
  ];

  const userEvents = [
    {
      id: 1,
      title: 'Adunni & Tunde Wedding',
      date: '2024-01-08',
      location: 'Lagos, Nigeria',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
      guests: 250,
      status: 'completed',
    },
    {
      id: 2,
      title: 'Bridal Shower',
      date: '2023-12-18',
      location: 'Lagos, Nigeria',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
      guests: 45,
      status: 'completed',
    },
    {
      id: 3,
      title: 'Anniversary Celebration',
      date: '2025-01-08',
      location: 'Lagos, Nigeria',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
      guests: 120,
      status: 'planning',
    },
  ];

  const userFollowers = [
    {
      id: 'kemi',
      name: 'Kemi Adesanya',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
      role: 'Event Host',
      isFollowing: true,
    },
    {
      id: 'tunde',
      name: 'Tunde Adebayo',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      role: 'Vendor',
      isFollowing: false,
    },
    {
      id: 'bola',
      name: 'Bola Okafor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
      role: 'Event Host',
      isFollowing: true,
    },
  ];

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  // Get content based on active tab
  const getTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
            {userPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  
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
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex space-x-6">
                      <button className={`flex items-center space-x-1 ${
                        post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      } transition-colors`}>
                        <SafeIcon icon={FiHeart} className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors">
                        <SafeIcon icon={FiMessageSquare} className="w-5 h-5" />
                        <span>{post.comments}</span>
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
        );
      case 'events':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'completed' ? 'bg-green-100 text-green-800' :
                      event.status === 'planning' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
                      {event.guests} guests
                    </div>
                  </div>
                  
                  <Link
                    to={`/event/${event.id}`}
                    className="block w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center"
                  >
                    View Event
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        );
      case 'followers':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userFollowers.map((follower, index) => (
              <motion.div
                key={follower.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Link to={`/profile/${follower.id}`}>
                    <img
                      src={follower.avatar}
                      alt={follower.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </Link>
                  <div>
                    <Link
                      to={`/profile/${follower.id}`}
                      className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
                    >
                      {follower.name}
                    </Link>
                    <p className="text-sm text-gray-500">{follower.role}</p>
                  </div>
                </div>
                
                <button
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    follower.isFollowing
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  } transition-colors`}
                >
                  {follower.isFollowing ? (
                    <span className="flex items-center">
                      <SafeIcon icon={FiCheck} className="w-3 h-3 mr-1" />
                      Following
                    </span>
                  ) : 'Follow'}
                </button>
              </motion.div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 bg-gray-300">
        <img
          src={user.coverImage}
          alt={`${user.name}'s cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Profile Header */}
        <div className="relative bg-white rounded-xl shadow-sm -mt-20 mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover -mt-20 sm:-mt-24"
              />
              
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                  {user.isVerified && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <SafeIcon icon={FiCheck} className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mt-1">{user.role}</p>
                
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <div className="flex items-center text-gray-600 text-sm">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                    Joined {new Date(user.memberSince).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-3">
                  {user.badges.map((badge, index) => (
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
                {user.isCurrentUser ? (
                  <Link
                    to="/profile/edit"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={toggleFollow}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        isFollowing
                          ? 'bg-primary-50 text-primary-700 border border-primary-300'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      {isFollowing ? (
                        <span className="flex items-center space-x-1">
                          <SafeIcon icon={FiCheck} className="w-4 h-4" />
                          <span>Following</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1">
                          <SafeIcon icon={FiUsers} className="w-4 h-4" />
                          <span>Follow</span>
                        </span>
                      )}
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Bio */}
            <div className="mt-6">
              <p className="text-gray-600">
                {showAllBio ? user.bio : `${user.bio.slice(0, 150)}${user.bio.length > 150 ? '...' : ''}`}
                {user.bio.length > 150 && (
                  <button
                    onClick={() => setShowAllBio(!showAllBio)}
                    className="text-primary-600 hover:text-primary-700 font-medium ml-1"
                  >
                    {showAllBio ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </p>
            </div>
            
            {/* Contact & Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <SafeIcon icon={FiMail} className="w-5 h-5 mr-3" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <SafeIcon icon={FiPhone} className="w-5 h-5 mr-3" />
                    <span>{user.phone}</span>
                  </div>
                  {user.website && (
                    <div className="flex items-center text-gray-600">
                      <SafeIcon icon={FiGlobe} className="w-5 h-5 mr-3" />
                      <a
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {user.website}
                      </a>
                    </div>
                  )}
                  {user.socialLinks && (
                    <div className="flex items-center space-x-3 mt-3">
                      {user.socialLinks.instagram && (
                        <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                          <SafeIcon icon={FiLink} className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary-600">{user.stats.posts}</p>
                    <p className="text-gray-600">Posts</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary-600">{user.stats.events}</p>
                    <p className="text-gray-600">Events</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary-600">{user.stats.followers}</p>
                    <p className="text-gray-600">Followers</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary-600">{user.stats.following}</p>
                    <p className="text-gray-600">Following</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <div className="flex justify-between items-center">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'posts', label: 'Posts' },
                  { id: 'events', label: 'Events' },
                  { id: 'followers', label: 'Followers' },
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
              
              {activeTab === 'posts' && (
                <div className="flex border border-gray-300 rounded-lg overflow-hidden mr-4">
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
              )}
            </div>
          </div>

          <div className="p-6">
            {getTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;