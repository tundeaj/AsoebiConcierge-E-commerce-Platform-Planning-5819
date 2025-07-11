import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalendar, FiMapPin, FiCheck, FiX, FiShoppingBag, FiUser, FiMail, FiPhone, FiCheckCircle } = FiIcons;

const GuestRSVP = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [step, setStep] = useState(1); // 1: RSVP, 2: Asoebi Selection, 3: Confirmation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rsvp_status: '',
    asoebi_package: '',
    asoebi_status: 'not_ordered',
    whatsapp_number: '',
  });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: null });
  
  // Detect if WhatsApp number is available from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const phone = queryParams.get('phone');
    
    if (phone) {
      setFormData(prev => ({ 
        ...prev, 
        phone,
        whatsapp_number: phone
      }));
    }
    
    // Fetch event details
    const fetchEventDetails = async () => {
      try {
        // Simulate API call for now
        // In real implementation, use eventService.getEvent(eventId)
        setTimeout(() => {
          setEvent({
            id: eventId,
            title: "Adunni & Tunde's Wedding",
            date: '2024-06-15',
            time: '2:00 PM',
            location: 'The Civic Centre, Lagos, Nigeria',
            description: 'Join us for a beautiful celebration of love and unity.',
            image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=400&fit=crop',
            organizer: 'Adunni Johnson',
            asoebi: {
              packages: [
                { id: 1, name: 'Standard Package', price: 35000, items: ['2.5 yards of fabric', 'Basic styling guide'] },
                { id: 2, name: 'Premium Package', price: 55000, items: ['3 yards of fabric', 'Gele head tie', 'Styling guide', 'Accessories'] },
                { id: 3, name: 'VIP Package', price: 85000, items: ['5 yards of fabric', 'Premium accessories', 'Personal styling session'] },
              ],
            },
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching event:', err);
        setLoading(false);
      }
    };
    
    fetchEventDetails();
  }, [eventId]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRSVP = (status) => {
    setFormData(prev => ({ ...prev, rsvp_status: status }));
    if (status === 'confirmed') {
      setStep(2);
    } else {
      handleSubmit();
    }
  };
  
  const handleAsoebiSelection = (packageId) => {
    setFormData(prev => ({ 
      ...prev, 
      asoebi_package: packageId,
      asoebi_status: 'ordered'
    }));
    handleSubmit();
  };
  
  const handleSubmit = async () => {
    setSubmitStatus({ loading: true, error: null });
    
    try {
      // Simulate API call for now
      // In real implementation, use guestService.createGuest() or updateGuest()
      console.log('Submitting guest data:', { ...formData, event_id: eventId });
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStep(3); // Move to confirmation
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      setSubmitStatus({ loading: false, error: err.message });
    } finally {
      setSubmitStatus({ loading: false, error: null });
    }
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading event details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-primary-600 to-accent-600 text-white py-8">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
              <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
            </div>
            <div className="flex items-center">
              <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-1" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNum) => (
              <React.Fragment key={stepNum}>
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full 
                    ${step > stepNum 
                      ? 'bg-primary-600 text-white' 
                      : step === stepNum 
                        ? 'bg-primary-100 text-primary-600 border border-primary-500' 
                        : 'bg-gray-200 text-gray-500'
                    } transition-colors`}
                >
                  {step > stepNum ? (
                    <SafeIcon icon={FiCheck} className="w-4 h-4" />
                  ) : (
                    <span>{stepNum}</span>
                  )}
                </div>
                
                {stepNum < 3 && (
                  <div 
                    className={`flex-1 h-1 ${step > stepNum ? 'bg-primary-500' : 'bg-gray-200'} transition-colors`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Your Details</span>
            <span>Asoebi Package</span>
            <span>Confirmation</span>
          </div>
        </div>
        
        {/* Main Content Based on Step */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">RSVP for this Event</h2>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your email address"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <p className="text-gray-700 font-medium mb-3">Will you be attending?</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleRSVP('confirmed')}
                      className="flex items-center justify-center space-x-2 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <SafeIcon icon={FiCheck} className="w-5 h-5" />
                      <span>Yes, I'll Attend</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleRSVP('declined')}
                      className="flex items-center justify-center space-x-2 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <SafeIcon icon={FiX} className="w-5 h-5" />
                      <span>No, I Can't</span>
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
          
          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Your Asoebi Package</h2>
              <p className="text-gray-600 mb-4">
                Select the Asoebi package you'd like to order for this event.
              </p>
              
              <div className="space-y-4">
                {event.asoebi.packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => handleAsoebiSelection(pkg.id)}
                    className="w-full flex justify-between items-start p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors"
                  >
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">{pkg.name}</h3>
                      <p className="text-primary-600 font-bold mb-2">{formatPrice(pkg.price)}</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {pkg.items.map((item, i) => (
                          <li key={i} className="flex items-center">
                            <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                ))}
                
                <button
                  onClick={() => handleAsoebiSelection(null)}
                  className="w-full p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-center"
                >
                  <p className="font-medium text-gray-700">I'll decide later</p>
                  <p className="text-sm text-gray-500">Skip Asoebi selection for now</p>
                </button>
              </div>
            </>
          )}
          
          {step === 3 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <SafeIcon icon={FiCheckCircle} className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h2>
              <p className="text-gray-600 mb-6">
                Your RSVP has been successfully submitted. We look forward to celebrating with you!
              </p>
              
              {formData.asoebi_status === 'ordered' && (
                <div className="bg-primary-50 p-4 rounded-lg mb-6 text-left">
                  <h3 className="font-medium text-gray-900 mb-2">Your Asoebi Package</h3>
                  <p className="text-primary-600 font-medium">
                    {event.asoebi.packages.find(p => p.id === parseInt(formData.asoebi_package))?.name}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    You will be contacted with payment details shortly.
                  </p>
                </div>
              )}
              
              <button
                onClick={() => navigate('/')}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Return to Home
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GuestRSVP;