import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ConversationList from '../components/messages/ConversationList';
import ChatBox from '../components/messages/ChatBox';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: "Adire Palace",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      lastMessage: "Your order has been confirmed",
      lastMessageTime: "2m ago",
      unreadCount: 2,
      online: true,
      status: "Verified Vendor",
    },
    {
      id: 2,
      name: "Textile Dreams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      lastMessage: "When will the new collection arrive?",
      lastMessageTime: "1h ago",
      unreadCount: 0,
      online: false,
      status: "Vendor",
    }
  ];

  // Mock messages data
  const messages = [
    {
      id: 1,
      text: "Hello! I'm interested in your French Lace collection.",
      timestamp: "2024-01-15T10:30:00",
      isSender: true
    },
    {
      id: 2,
      text: "Hi! Thanks for your interest. We have several designs available.",
      timestamp: "2024-01-15T10:31:00",
      isSender: false,
      attachments: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=300&h=300&fit=crop'
        }
      ]
    },
    {
      id: 3,
      text: "This looks beautiful! What's the price per yard?",
      timestamp: "2024-01-15T10:32:00",
      isSender: true
    }
  ];

  const handleSendMessage = (message) => {
    console.log('Sending message:', message);
    // Handle message sending logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">
            Communicate with vendors and manage your conversations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ConversationList
              conversations={conversations}
              selectedId={selectedConversation?.id}
              onSelect={setSelectedConversation}
              className="h-full"
            />
          </motion.div>

          {/* Chat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            {selectedConversation ? (
              <ChatBox
                messages={messages}
                onSendMessage={handleSendMessage}
                recipient={selectedConversation}
                className="h-full"
              />
            ) : (
              <div className="h-full bg-white rounded-lg shadow-sm flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select a Conversation
                  </h3>
                  <p className="text-gray-600">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Messages;