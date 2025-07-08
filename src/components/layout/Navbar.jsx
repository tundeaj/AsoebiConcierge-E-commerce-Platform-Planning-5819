import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../hooks/useAuth';
import { useCurrency } from '../../hooks/useCurrency';

const { FiMenu, FiX, FiUser, FiLogIn, FiShoppingBag, FiCalendar, FiHome, FiInfo, FiMail, FiUsers, FiStore, FiSettings, FiBell, FiDollarSign } = FiIcons;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { currencies, currentCurrency, changeCurrency } = useCurrency();

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/events', label: 'Events', icon: FiCalendar },
    { path: '/marketplace', label: 'Marketplace', icon: FiShoppingBag },
    { path: '/community', label: 'Community', icon: FiUsers },
    { path: '/about', label: 'About', icon: FiInfo },
    { path: '/contact', label: 'Contact', icon: FiMail },
  ];

  const userMenuItems = {
    host: [
      { path: '/dashboard', label: 'My Dashboard', icon: FiUser },
      { path: '/planner', label: 'Event Planner', icon: FiCalendar },
      { path: '/profile/me', label: 'My Profile', icon: FiUser },
      { path: '/settings', label: 'Settings', icon: FiSettings },
    ],
    vendor: [
      { path: '/vendor-dashboard', label: 'Vendor Dashboard', icon: FiStore },
      { path: '/vendor/me', label: 'My Store', icon: FiShoppingBag },
      { path: '/profile/me', label: 'My Profile', icon: FiUser },
      { path: '/settings', label: 'Settings', icon: FiSettings },
    ],
    admin: [
      { path: '/admin-dashboard', label: 'Admin Panel', icon: FiSettings },
      { path: '/dashboard', label: 'Dashboard', icon: FiUser },
      { path: '/profile/me', label: 'My Profile', icon: FiUser },
    ]
  };
  
  const handleCurrencyChange = async (code) => {
    await changeCurrency(code);
    setIsCurrencyMenuOpen(false);
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      setIsUserMenuOpen(false);
      navigate('/login');
    }
  };

  const isActive = (path) => location.pathname === path;

  // Mock user data if authenticated - replace with actual auth state
  const userData = user ? {
    name: user.user_metadata?.full_name || 'User',
    email: user.email,
    role: user.user_metadata?.role || 'host',
    avatar: user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    notifications: 3
  } : null;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">AC</span>
            </div>
            <div className="flex flex-col">
              <span className="font-playfair text-lg font-bold text-gray-800 leading-tight">
                AsoebiConcierge
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                Multivendor Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
              >
                <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
                <span>{currentCurrency?.code || 'NGN'}</span>
              </button>
              
              {isCurrencyMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => handleCurrencyChange(currency.code)}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        currentCurrency?.code === currency.code ? 'text-primary-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <span>{currency.name} ({currency.symbol})</span>
                      {currentCurrency?.code === currency.code && (
                        <span className="text-primary-600">✓</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            
            {userData ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <SafeIcon icon={FiBell} className="w-5 h-5" />
                  {userData.notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {userData.notifications}
                    </span>
                  )}
                </button>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{userData.role}</p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      {userMenuItems[userData.role]?.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <SafeIcon icon={item.icon} className="w-4 h-4" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button 
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <SafeIcon icon={FiLogIn} className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <SafeIcon icon={FiLogIn} className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiUser} className="w-4 h-4" />
                  <span>Join Now</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <SafeIcon icon={isOpen ? FiX : FiMenu} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Currency selector for mobile */}
            <div className="border-t border-gray-200 pt-2">
              <div className="px-3 py-2 text-sm text-gray-500 font-medium">Currency</div>
              <div className="space-y-1 px-3">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => {
                      handleCurrencyChange(currency.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-sm ${
                      currentCurrency?.code === currency.code ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{currency.name} ({currency.symbol})</span>
                    {currentCurrency?.code === currency.code && (
                      <span className="text-primary-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {userData ? (
              <>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex items-center px-3 py-2">
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{userData.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{userData.role}</p>
                    </div>
                  </div>
                  {userMenuItems[userData.role]?.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                    >
                      <SafeIcon icon={item.icon} className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md w-full mt-2"
                  >
                    <SafeIcon icon={FiLogIn} className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-200 pt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                >
                  <SafeIcon icon={FiLogIn} className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors mx-3 mt-2"
                >
                  <SafeIcon icon={FiUser} className="w-5 h-5" />
                  <span>Join Now</span>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;