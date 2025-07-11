import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import VendorProfile from './pages/VendorProfile';
import VendorDashboard from './pages/VendorDashboard';
import VendorOnboarding from './pages/VendorOnboarding';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Community from './pages/Community';
import Analytics from './pages/Analytics';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import GuestRSVP from './pages/GuestRSVP';
import GuestDashboard from './pages/GuestDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PlannerDashboard from './pages/PlannerDashboard';
import OrderTracking from './pages/OrderTracking';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/events" element={<Events />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/vendor/:vendorId" element={<VendorProfile />} />
              <Route path="/vendor-dashboard" element={<VendorDashboard />} />
              <Route path="/vendor/onboarding" element={<VendorOnboarding />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/community" element={<Community />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/guest-rsvp/:eventId" element={<GuestRSVP />} />
              <Route path="/guest-dashboard/:token" element={<GuestDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/planner" element={<PlannerDashboard />} />
              <Route path="/order/:orderId" element={<OrderTracking />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;