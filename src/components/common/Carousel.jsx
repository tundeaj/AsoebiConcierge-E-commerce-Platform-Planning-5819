import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiChevronLeft, FiChevronRight } = FiIcons;

const Carousel = ({ 
  items, 
  title, 
  itemsPerView = 4, 
  gap = 24, 
  renderItem,
  className = "",
  showArrows = true 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);

  // Calculate max index based on items per view
  const maxIndex = Math.max(0, items.length - itemsPerView);

  useEffect(() => {
    updateScrollButtons();
  }, [currentIndex, items.length, itemsPerView]);

  const updateScrollButtons = () => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < maxIndex);
  };

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    }
  };

  const getTransformValue = () => {
    if (!carouselRef.current) return 0;
    const itemWidth = (carouselRef.current.offsetWidth - gap * (itemsPerView - 1)) / itemsPerView;
    return -(currentIndex * (itemWidth + gap));
  };

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-playfair font-bold text-gray-900">{title}</h2>
        
        {showArrows && (
          <div className="flex space-x-2">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                canScrollLeft 
                  ? 'border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white' 
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              }`}
            >
              <SafeIcon icon={FiChevronLeft} className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                canScrollRight 
                  ? 'border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white' 
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              }`}
            >
              <SafeIcon icon={FiChevronRight} className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Carousel Container */}
      <div className="overflow-hidden" ref={carouselRef}>
        <motion.div
          className="flex"
          style={{ gap: `${gap}px` }}
          animate={{ x: getTransformValue() }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="flex-shrink-0"
              style={{ width: `calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})` }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots Indicator */}
      {maxIndex > 0 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;