import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSearch, FiMoreVertical } = FiIcons;

const ConversationList = ({
  conversations = [],
  selectedId,
  onSelect,
  className = ""
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
          />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="overflow-y-auto">
        {conversations.map((conversation) => (
          <motion.button
            key={conversation.id}
            onClick={() => onSelect(conversation)}
            className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors border-b ${
              selectedId === conversation.id ? 'bg-primary-50' : ''
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="relative">
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {conversation.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 truncate">
                  {conversation.name}
                </h3>
                <span className="text-xs text-gray-500">
                  {conversation.lastMessageTime}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-600 truncate">
                  {conversation.lastMessage}
                </p>
                {conversation.unreadCount > 0 && (
                  <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;