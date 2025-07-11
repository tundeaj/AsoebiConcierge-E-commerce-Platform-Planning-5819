import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSend, FiPaperclip, FiImage, FiX, FiMoreVertical, FiDownload } = FiIcons;

const ChatBox = ({ 
  messages = [], 
  onSendMessage, 
  recipient,
  isLoading = false,
  className = ""
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() || attachments.length > 0) {
      onSendMessage({
        text: newMessage,
        attachments: attachments
      });
      setNewMessage('');
      setAttachments([]);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'file'
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className={`flex flex-col h-full bg-white rounded-lg shadow-sm ${className}`}>
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={recipient.avatar} 
            alt={recipient.name} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900">{recipient.name}</h3>
            <p className="text-sm text-gray-500">{recipient.status}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <SafeIcon icon={FiMoreVertical} className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] ${
                message.isSender 
                  ? 'bg-primary-600 text-white rounded-l-lg rounded-tr-lg' 
                  : 'bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg'
              } p-3`}
            >
              {message.text && <p className="text-sm">{message.text}</p>}
              
              {message.attachments?.map((attachment, i) => (
                <div key={i} className="mt-2">
                  {attachment.type === 'image' ? (
                    <img 
                      src={attachment.url} 
                      alt="Attachment" 
                      className="rounded-lg max-w-full"
                    />
                  ) : (
                    <a 
                      href={attachment.url}
                      download
                      className="flex items-center space-x-2 text-sm hover:underline"
                    >
                      <SafeIcon icon={FiDownload} className="w-4 h-4" />
                      <span>{attachment.name}</span>
                    </a>
                  )}
                </div>
              ))}
              
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="p-2 border-t flex gap-2 overflow-x-auto">
          {attachments.map((attachment, index) => (
            <div key={index} className="relative">
              {attachment.type === 'image' ? (
                <img 
                  src={attachment.preview} 
                  alt="Attachment preview" 
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiPaperclip} className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <button
                onClick={() => removeAttachment(index)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <SafeIcon icon={FiX} className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiImage} className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiPaperclip} className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading || (!newMessage.trim() && !attachments.length)}
            className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SafeIcon icon={FiSend} className="w-5 h-5" />
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="image/*,.pdf,.doc,.docx"
          className="hidden"
        />
      </form>
    </div>
  );
};

export default ChatBox;