import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiCalendar, FiClock, FiCheck, FiUsers, FiShoppingBag, FiDollarSign,
  FiPlusCircle, FiList, FiGrid, FiPaperclip, FiEdit, FiTrash2, FiPlus,
  FiClipboard, FiStar, FiAlertCircle, FiCheckCircle, FiXCircle
} = FiIcons;

const PlannerDashboard = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [viewMode, setViewMode] = useState('board');
  
  // Mock event data
  const event = {
    id: 1,
    title: "Adunni & Tunde's Wedding",
    date: '2024-06-15',
    daysLeft: 45,
    budget: 2500000,
    spent: 1750000,
    guestCount: 250,
    confirmedGuests: 185
  };
  
  // Mock tasks data
  const tasks = [
    {
      id: 1,
      title: "Select and order Asoebi fabric",
      dueDate: "2024-03-20",
      status: "completed",
      priority: "high",
      assignee: {
        name: "Adunni Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
      },
      category: "asoebi"
    },
    {
      id: 2,
      title: "Coordinate with fabric vendors",
      dueDate: "2024-03-25",
      status: "completed",
      priority: "medium",
      assignee: {
        name: "Kemi Adesanya",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
      },
      category: "asoebi"
    },
    {
      id: 3,
      title: "Distribute Asoebi to bridesmaids",
      dueDate: "2024-04-15",
      status: "in_progress",
      priority: "medium",
      assignee: {
        name: "Adunni Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
      },
      category: "asoebi"
    },
    {
      id: 4,
      title: "Follow up with guests who haven't RSVP'd",
      dueDate: "2024-04-20",
      status: "in_progress",
      priority: "high",
      assignee: {
        name: "Bola Okafor",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
      },
      category: "guests"
    },
    {
      id: 5,
      title: "Confirm vendor payments",
      dueDate: "2024-05-01",
      status: "not_started",
      priority: "high",
      assignee: {
        name: "Tunde Adebayo",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      category: "finance"
    },
    {
      id: 6,
      title: "Send reminders to all guests",
      dueDate: "2024-05-15",
      status: "not_started",
      priority: "medium",
      assignee: {
        name: "Kemi Adesanya",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
      },
      category: "guests"
    }
  ];
  
  // Mock team members data
  const team = [
    {
      id: 1,
      name: "Adunni Johnson",
      role: "Bride/Event Host",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      tasksAssigned: 2,
      tasksCompleted: 1
    },
    {
      id: 2,
      name: "Tunde Adebayo",
      role: "Groom/Finance",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      tasksAssigned: 1,
      tasksCompleted: 0
    },
    {
      id: 3,
      name: "Kemi Adesanya",
      role: "Maid of Honor",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      tasksAssigned: 2,
      tasksCompleted: 1
    },
    {
      id: 4,
      name: "Bola Okafor",
      role: "Best Man",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      tasksAssigned: 1,
      tasksCompleted: 0
    }
  ];
  
  // Mock asoebi data
  const asoebiStats = {
    fabric: "Premium French Lace",
    totalOrders: 142,
    delivered: 98,
    pending: 44,
    price: "₦35,000",
    revenue: "₦4,970,000"
  };
  
  // Helper functions
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <SafeIcon icon={FiClock} className="w-5 h-5 text-blue-500" />;
      case 'not_started':
        return <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-gray-400" />;
      default:
        return <SafeIcon icon={FiXCircle} className="w-5 h-5 text-red-500" />;
    }
  };
  
  const getCategoryColor = (category) => {
    switch (category) {
      case 'asoebi':
        return 'bg-purple-100 text-purple-800';
      case 'guests':
        return 'bg-blue-100 text-blue-800';
      case 'finance':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getFormattedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Filter tasks by status for Kanban view
  const notStartedTasks = tasks.filter(task => task.status === 'not_started');
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-playfair font-bold text-gray-900">Event Planner</h1>
              <Link to={`/event/${event.id}`} className="text-primary-600 hover:text-primary-700">
                {event.title}
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg flex items-center">
                <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                <span>{getFormattedDate(event.date)}</span>
              </div>
              <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg flex items-center">
                <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
                <span>{event.daysLeft} days left</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget</p>
                <p className="text-2xl font-bold text-gray-900">₦2.5M</p>
                <p className="text-sm text-green-600">₦750K remaining</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Guests</p>
                <p className="text-2xl font-bold text-gray-900">{event.confirmedGuests}/{event.guestCount}</p>
                <p className="text-sm text-blue-600">{Math.round((event.confirmedGuests / event.guestCount) * 100)}% confirmed</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiUsers} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Asoebi Orders</p>
                <p className="text-2xl font-bold text-gray-900">{asoebiStats.totalOrders}</p>
                <p className="text-sm text-purple-600">{asoebiStats.delivered} delivered</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiShoppingBag} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{completedTasks.length}/{tasks.length}</p>
                <p className="text-sm text-green-600">{Math.round((completedTasks.length / tasks.length) * 100)}% completed</p>
              </div>
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiCheck} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'tasks', label: 'Tasks' },
                { id: 'team', label: 'Team' },
                { id: 'asoebi', label: 'Asoebi Management' },
                { id: 'budget', label: 'Budget' },
                { id: 'timeline', label: 'Timeline' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
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
        </div>
        
        {/* Content */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            {/* Tasks Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Tasks</h2>
              <div className="flex space-x-4">
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('board')}
                    className={`px-4 py-2 ${viewMode === 'board' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'} hover:bg-primary-50 transition-colors flex items-center space-x-1`}
                  >
                    <SafeIcon icon={FiGrid} className="w-4 h-4" />
                    <span>Board</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'} hover:bg-primary-50 transition-colors flex items-center space-x-1`}
                  >
                    <SafeIcon icon={FiList} className="w-4 h-4" />
                    <span>List</span>
                  </button>
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-1">
                  <SafeIcon icon={FiPlus} className="w-4 h-4" />
                  <span>Add Task</span>
                </button>
              </div>
            </div>
            
            {/* Tasks Content */}
            {viewMode === 'board' ? (
              // Kanban Board View
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Not Started Column */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-gray-50 border-b p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-gray-500" />
                      <h3 className="font-semibold text-gray-900">Not Started</h3>
                    </div>
                    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                      {notStartedTasks.length}
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    {notStartedTasks.map(task => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                          Due: {getFormattedDate(task.dueDate)}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                            {task.category}
                          </span>
                          <div className="flex items-center space-x-2">
                            <img
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                              className="w-6 h-6 rounded-full"
                              title={task.assignee.name}
                            />
                            <div className="flex space-x-1">
                              <button className="text-gray-400 hover:text-primary-600 transition-colors">
                                <SafeIcon icon={FiEdit} className="w-4 h-4" />
                              </button>
                              <button className="text-gray-400 hover:text-red-600 transition-colors">
                                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <button className="w-full text-gray-500 hover:text-primary-600 hover:bg-gray-50 p-2 rounded-lg flex items-center justify-center transition-colors">
                      <SafeIcon icon={FiPlusCircle} className="w-5 h-5 mr-1" />
                      <span>Add Task</span>
                    </button>
                  </div>
                </div>
                
                {/* In Progress Column */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-blue-50 border-b p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiClock} className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">In Progress</h3>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {inProgressTasks.length}
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    {inProgressTasks.map(task => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                          Due: {getFormattedDate(task.dueDate)}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                            {task.category}
                          </span>
                          <div className="flex items-center space-x-2">
                            <img
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                              className="w-6 h-6 rounded-full"
                              title={task.assignee.name}
                            />
                            <div className="flex space-x-1">
                              <button className="text-gray-400 hover:text-primary-600 transition-colors">
                                <SafeIcon icon={FiEdit} className="w-4 h-4" />
                              </button>
                              <button className="text-gray-400 hover:text-red-600 transition-colors">
                                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <button className="w-full text-gray-500 hover:text-primary-600 hover:bg-gray-50 p-2 rounded-lg flex items-center justify-center transition-colors">
                      <SafeIcon icon={FiPlusCircle} className="w-5 h-5 mr-1" />
                      <span>Add Task</span>
                    </button>
                  </div>
                </div>
                
                {/* Completed Column */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-green-50 border-b p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-gray-900">Completed</h3>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {completedTasks.length}
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    {completedTasks.map(task => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                          Completed: {getFormattedDate(task.dueDate)}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                            {task.category}
                          </span>
                          <div className="flex items-center space-x-2">
                            <img
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                              className="w-6 h-6 rounded-full"
                              title={task.assignee.name}
                            />
                            <div className="flex space-x-1">
                              <button className="text-gray-400 hover:text-red-600 transition-colors">
                                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // List View
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Task</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Assignee</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map(task => (
                        <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{task.title}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(task.status)}
                              <span className="capitalize">{task.status.replace('_', ' ')}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{getFormattedDate(task.dueDate)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                              {task.category}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <img
                                src={task.assignee.avatar}
                                alt={task.assignee.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-gray-700">{task.assignee.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button className="text-gray-400 hover:text-primary-600 transition-colors">
                                <SafeIcon icon={FiEdit} className="w-4 h-4" />
                              </button>
                              <button className="text-gray-400 hover:text-red-600 transition-colors">
                                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'team' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-1">
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                <span>Add Member</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map(member => (
                <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center text-center mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mb-3"
                    />
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>Tasks Assigned:</span>
                    <span className="font-medium text-gray-900">{member.tasksAssigned}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>Tasks Completed:</span>
                    <span className="font-medium text-green-600">{member.tasksCompleted}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(member.tasksCompleted / member.tasksAssigned) * 100}%` }}
                    ></div>
                  </div>
                  
                  <button className="w-full border border-primary-500 text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg transition-colors">
                    View Tasks
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'asoebi' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Asoebi Management</h2>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                View All Orders
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Asoebi Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fabric:</span>
                    <span className="font-medium text-gray-900">{asoebiStats.fabric}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium text-gray-900">{asoebiStats.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Orders:</span>
                    <span className="font-medium text-gray-900">{asoebiStats.totalOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivered:</span>
                    <span className="font-medium text-green-600">{asoebiStats.delivered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-medium text-amber-600">{asoebiStats.pending}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Revenue:</span>
                    <span className="font-medium text-gray-900">{asoebiStats.revenue}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Delivery Status</h3>
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Delivery Progress</span>
                    <span>{Math.round((asoebiStats.delivered / asoebiStats.totalOrders) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(asoebiStats.delivered / asoebiStats.totalOrders) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">{asoebiStats.delivered}</div>
                    <div className="text-gray-700">Delivered</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-amber-600">{asoebiStats.pending}</div>
                    <div className="text-gray-700">Pending</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Guest Asoebi Status</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Guest</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">RSVP Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Order Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Delivery</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                            alt="Adunni Johnson"
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-medium text-gray-900">Adunni Johnson</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Confirmed
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Delivered
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">Jan 15, 2024</td>
                      <td className="py-3 px-4">
                        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                          View
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                            alt="Kemi Adesanya"
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-medium text-gray-900">Kemi Adesanya</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Confirmed
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          Shipped
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">Est. Jan 20, 2024</td>
                      <td className="py-3 px-4">
                        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                          Track
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                            alt="Tunde Adebayo"
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-medium text-gray-900">Tunde Adebayo</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Confirmed
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Processing
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">Est. Jan 25, 2024</td>
                      <td className="py-3 px-4">
                        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                          View
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                            alt="Bola Okafor"
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-medium text-gray-900">Bola Okafor</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Pending
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                          Not Ordered
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">—</td>
                      <td className="py-3 px-4">
                        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                          Send Reminder
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'budget' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Budget Tracker</h2>
            <p className="text-gray-600">This section allows you to track your event budget and expenses.</p>
            <div className="mt-6">
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                View Budget Details
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Event Timeline</h2>
            <p className="text-gray-600">This section allows you to view and manage your event timeline.</p>
            <div className="mt-6">
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                View Timeline
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlannerDashboard;