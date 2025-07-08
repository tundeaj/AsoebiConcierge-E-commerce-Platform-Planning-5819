import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiCheck, FiX, FiUpload, FiUser, FiMail, FiPhone,
  FiMapPin, FiHome, FiShoppingBag, FiDollarSign,
  FiCreditCard, FiSend, FiArrowRight, FiArrowLeft
} = FiIcons;

const VendorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Profile Info
    businessName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    website: '',
    description: '',
    
    // Business Details
    businessType: '',
    businessCategory: '',
    yearsInBusiness: '',
    employees: '',
    
    // Financial Information
    bankName: '',
    accountName: '',
    accountNumber: '',
    taxId: '',
    
    // Product Information
    productTypes: [],
    priceRange: '',
    customizationOptions: false,
    deliveryOptions: [],
    
    // Documents
    businessRegistration: null,
    idDocument: null,
    portfolioImages: [],
    
    // Terms
    agreeTerms: false
  });
  
  const totalSteps = 5;
  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (type === 'file') {
      if (name === 'portfolioImages') {
        setFormData({
          ...formData,
          [name]: [...formData.portfolioImages, ...files]
        });
      } else {
        setFormData({
          ...formData,
          [name]: files[0]
        });
      }
    } else if (type === 'radio') {
      setFormData({
        ...formData,
        [name]: value
      });
    } else if (name === 'productTypes' || name === 'deliveryOptions') {
      const updatedArray = formData[name].includes(value)
        ? formData[name].filter(item => item !== value)
        : [...formData[name], value];
      
      setFormData({
        ...formData,
        [name]: updatedArray
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to an API
    // For now, we'll just move to the success step
    setCurrentStep(totalSteps);
  };
  
  const removePortfolioImage = (index) => {
    setFormData({
      ...formData,
      portfolioImages: formData.portfolioImages.filter((_, i) => i !== index)
    });
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Business Profile</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your business name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiMail} className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="business@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Phone *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiPhone} className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+234 803 123 4567"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiHome} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your business address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="City"
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="State"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Website (Optional)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://yourbusiness.com"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tell us about your business, products, and services..."
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Business Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Type *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select business type</option>
                  <option value="sole_proprietor">Sole Proprietor</option>
                  <option value="partnership">Partnership</option>
                  <option value="limited_liability">Limited Liability Company</option>
                  <option value="corporation">Corporation</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Category *
                </label>
                <select
                  id="businessCategory"
                  name="businessCategory"
                  value={formData.businessCategory}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select business category</option>
                  <option value="fabric_supplier">Fabric Supplier</option>
                  <option value="tailor">Tailor/Seamstress</option>
                  <option value="designer">Fashion Designer</option>
                  <option value="accessories">Accessories Vendor</option>
                  <option value="event_planner">Event Planner</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-gray-700 mb-1">
                    Years in Business *
                  </label>
                  <select
                    id="yearsInBusiness"
                    name="yearsInBusiness"
                    value={formData.yearsInBusiness}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select years</option>
                    <option value="less_than_1">Less than 1 year</option>
                    <option value="1_to_3">1-3 years</option>
                    <option value="3_to_5">3-5 years</option>
                    <option value="5_to_10">5-10 years</option>
                    <option value="more_than_10">More than 10 years</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Employees *
                  </label>
                  <select
                    id="employees"
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select range</option>
                    <option value="1">Just me</option>
                    <option value="2_to_5">2-5 employees</option>
                    <option value="6_to_10">6-10 employees</option>
                    <option value="11_to_20">11-20 employees</option>
                    <option value="more_than_20">More than 20 employees</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Financial Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name *
                </label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your bank name"
                />
              </div>
              
              <div>
                <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Name *
                </label>
                <input
                  type="text"
                  id="accountName"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Account holder name"
                />
              </div>
              
              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiCreditCard} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your account number"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                  Tax ID / Business Registration Number *
                </label>
                <input
                  type="text"
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your tax ID or business registration number"
                />
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Product Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Types *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'lace', label: 'Lace' },
                    { id: 'ankara', label: 'Ankara' },
                    { id: 'aso_oke', label: 'Aso-Oke' },
                    { id: 'chiffon', label: 'Chiffon/Silk' },
                    { id: 'george', label: 'George/Guinea' },
                    { id: 'adire', label: 'Adire' },
                    { id: 'accessories', label: 'Accessories' },
                    { id: 'other', label: 'Other' },
                  ].map(option => (
                    <label key={option.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="productTypes"
                        value={option.id}
                        checked={formData.productTypes.includes(option.id)}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range *
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'budget', label: 'Budget (Under ₦15,000)' },
                    { id: 'mid_range', label: 'Mid-range (₦15,000 - ₦50,000)' },
                    { id: 'premium', label: 'Premium (₦50,000 - ₦150,000)' },
                    { id: 'luxury', label: 'Luxury (Above ₦150,000)' },
                  ].map(option => (
                    <label key={option.id} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="priceRange"
                        value={option.id}
                        checked={formData.priceRange === option.id}
                        onChange={handleChange}
                        className="rounded-full border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="customizationOptions"
                    checked={formData.customizationOptions}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">Offer customization options</span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Options *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'pickup', label: 'Store Pickup' },
                    { id: 'local_delivery', label: 'Local Delivery' },
                    { id: 'nationwide', label: 'Nationwide Delivery' },
                    { id: 'international', label: 'International Shipping' },
                  ].map(option => (
                    <label key={option.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="deliveryOptions"
                        value={option.id}
                        checked={formData.deliveryOptions.includes(option.id)}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio Images (Upload at least 3) *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="portfolioImages"
                    name="portfolioImages"
                    onChange={handleChange}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                  <label htmlFor="portfolioImages" className="cursor-pointer">
                    <SafeIcon icon={FiUpload} className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-700">
                      <span className="text-primary-600 font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </label>
                </div>
                
                {formData.portfolioImages.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Uploaded Images ({formData.portfolioImages.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {Array.from(formData.portfolioImages).map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Portfolio ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removePortfolioImage(index)}
                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <SafeIcon icon={FiX} className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiCheck} className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Application Submitted</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Your vendor application has been submitted successfully! We'll review your details and get back to you within 2-3 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Go to Login
              </Link>
              <Link
                to="/"
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiShoppingBag} className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-playfair font-bold text-gray-900">Vendor Onboarding</h1>
          <p className="text-gray-600 mt-2">Join our marketplace and start selling your products</p>
        </div>
        
        {/* Progress Steps */}
        {currentStep < totalSteps && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[...Array(totalSteps - 1)].map((_, i) => (
                <React.Fragment key={i}>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      i + 1 < currentStep
                        ? 'bg-primary-600 text-white'
                        : i + 1 === currentStep
                        ? 'bg-primary-100 text-primary-600 border border-primary-500'
                        : 'bg-gray-200 text-gray-500'
                    } transition-colors`}
                  >
                    {i + 1 < currentStep ? (
                      <SafeIcon icon={FiCheck} className="w-5 h-5" />
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </div>
                  
                  {i < totalSteps - 2 && (
                    <div
                      className={`flex-1 h-1 ${
                        i + 1 < currentStep ? 'bg-primary-500' : 'bg-gray-200'
                      } transition-colors`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Business Details</span>
              <span>Financial Info</span>
              <span>Products</span>
              <span>Review</span>
            </div>
          </div>
        )}
        
        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            {/* Form Controls */}
            {currentStep < totalSteps && (
              <div className="mt-8 flex justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < totalSteps - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <span>Next</span>
                    <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                  </button>
                ) : currentStep === totalSteps - 1 ? (
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <span>Submit Application</span>
                    <SafeIcon icon={FiSend} className="w-4 h-4" />
                  </button>
                ) : null}
              </div>
            )}
          </form>
        </div>
        
        {/* Already have an account? */}
        {currentStep < totalSteps && (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorOnboarding;