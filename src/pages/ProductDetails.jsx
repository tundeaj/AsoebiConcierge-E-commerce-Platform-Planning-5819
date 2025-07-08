import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiArrowLeft, FiShoppingCart, FiHeart, FiShare2, FiStar,
  FiTruck, FiShield, FiCheck, FiAward, FiClock, FiPackage
} = FiIcons;

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  // Mock product data - replace with actual API call
  const product = {
    id: 1,
    name: 'Premium French Lace Collection',
    vendor: {
      name: 'Adire Palace',
      id: 'adire-palace',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      verified: true,
      rating: 4.8,
      location: 'Lagos, Nigeria',
      badges: ['Top Seller', 'Fast Shipper']
    },
    category: 'lace',
    price: 35000,
    originalPrice: 45000,
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571513801192-b9d3d6e14b3c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506629905607-c28f2b6f8e5e?w=600&h=600&fit=crop',
    ],
    description: 'Elegant French lace with intricate patterns, perfect for weddings and special occasions. This premium lace fabric is imported directly from France and features delicate embroidery work that will make your outfit stand out.',
    longDescription: `
      <p>Our Premium French Lace Collection offers exceptional quality and design for your special occasions.</p>
      <p>Features:</p>
      <ul>
        <li>Imported directly from France</li>
        <li>Delicate embroidery and beadwork</li>
        <li>Soft, comfortable texture</li>
        <li>Perfect drape for elegant outfits</li>
        <li>Available in multiple colors and sizes</li>
      </ul>
      <p>This fabric is perfect for wedding attire, special occasion dresses, and high-end traditional outfits.</p>
    `,
    colors: [
      { name: 'Royal Gold', code: '#8B4513', image: 'https://images.unsplash.com/photo-1594736797933-d0d3a0e7bb6d?w=80&h=80&fit=crop' },
      { name: 'Champagne', code: '#DAA520', image: 'https://images.unsplash.com/photo-1571513801192-b9d3d6e14b3c?w=80&h=80&fit=crop' },
      { name: 'Bronze', code: '#CD853F', image: 'https://images.unsplash.com/photo-1506629905607-c28f2b6f8e5e?w=80&h=80&fit=crop' },
    ],
    sizes: ['2.5 yards', '3 yards', '5 yards'],
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: 'Adunni Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        date: '2024-01-15',
        comment: 'Beautiful fabric! The quality exceeded my expectations. Used it for my wedding and got so many compliments.',
      },
      {
        id: 2,
        user: 'Tunde Adebayo',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        rating: 4,
        date: '2024-01-10',
        comment: 'Great fabric and fast delivery. The color is slightly different from what I expected but still beautiful.',
      },
      {
        id: 3,
        user: 'Kemi Adesanya',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        date: '2023-12-28',
        comment: 'Absolutely stunning fabric! The embroidery is exquisite and the quality is top-notch. Will buy again!',
      },
    ],
    totalReviews: 124,
    sales: 342,
    badges: ['Bestseller', 'Fast Delivery', 'Premium Quality'],
    features: ['Premium Quality', 'Hand-crafted', 'International Shipping'],
    deliveryTime: '2-5 days',
    variations: [
      { id: 1, name: 'Standard Package', price: 35000, description: '2.5 yards + basic styling guide' },
      { id: 2, name: 'Premium Package', price: 55000, description: '3 yards + gele + accessories' },
      { id: 3, name: 'VIP Package', price: 85000, description: '5 yards + premium accessories + styling session' }
    ],
    wishlistCount: 89,
    addedToWishlist: false,
    discount: 22,
    trending: true,
    relatedProducts: [2, 5, 8],
  };

  const incrementQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotalPrice = () => {
    let basePrice = product.price;
    if (selectedVariation) {
      const variation = product.variations.find(v => v.id === selectedVariation);
      if (variation) {
        basePrice = variation.price;
      }
    }
    return basePrice * quantity;
  };

  const addToCart = () => {
    // Handle add to cart logic
    console.log('Added to cart:', {
      productId: product.id,
      quantity,
      selectedSize,
      selectedColor,
      selectedVariation,
      totalPrice: calculateTotalPrice(),
    });
  };

  const toggleWishlist = () => {
    // Handle wishlist toggle
    console.log('Toggle wishlist for product:', product.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Link
            to="/marketplace"
            className="inline-flex items-center text-gray-600 hover:text-primary-600"
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Link>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="p-6">
              <div className="relative mb-4 aspect-square">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      -{product.discount}% OFF
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={toggleWishlist}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
                      product.addedToWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <SafeIcon icon={FiHeart} className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                    <SafeIcon icon={FiShare2} className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`p-1 rounded-lg border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6 lg:pt-10">
              {/* Vendor Info */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={product.vendor.avatar}
                  alt={product.vendor.name}
                  className="w-8 h-8 rounded-full"
                />
                <Link
                  to={`/vendor/${product.vendor.id}`}
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {product.vendor.name}
                </Link>
                {product.vendor.verified && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <SafeIcon icon={FiShield} className="w-3 h-3 mr-1" />
                    Verified
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

              {/* Ratings */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon
                      key={i}
                      icon={FiStar}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-gold-500 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.rating} ({product.totalReviews} reviews)</span>
                <span className="text-sm text-gray-600">{product.sales} sold</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-primary-600">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
                {product.discount > 0 && (
                  <span className="text-sm text-red-600 font-medium">Save {product.discount}%</span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`relative w-12 h-12 rounded-full border-2 transition-colors ${
                        selectedColor === index
                          ? 'border-primary-500'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div
                        className="w-full h-full rounded-full overflow-hidden"
                        style={{ backgroundColor: color.code }}
                      >
                        <img
                          src={color.image}
                          alt={color.name}
                          className="w-full h-full object-cover mix-blend-multiply opacity-90"
                        />
                      </div>
                      {selectedColor === index && (
                        <div className="absolute -right-1 -bottom-1 bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          <SafeIcon icon={FiCheck} className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {selectedColor !== null && (
                  <p className="text-sm text-gray-600 mt-2">{product.colors[selectedColor].name}</p>
                )}
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(index)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedSize === index
                          ? 'bg-primary-50 border-primary-500 text-primary-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Package Variations */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Select Package</h3>
                <div className="space-y-2">
                  {product.variations.map((variation) => (
                    <button
                      key={variation.id}
                      onClick={() => setSelectedVariation(variation.id)}
                      className={`w-full flex justify-between items-center px-4 py-3 rounded-lg border transition-colors ${
                        selectedVariation === variation.id
                          ? 'bg-primary-50 border-primary-500'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-left">
                        <p className={`font-medium ${
                          selectedVariation === variation.id ? 'text-primary-700' : 'text-gray-900'
                        }`}>
                          {variation.name}
                        </p>
                        <p className="text-sm text-gray-600">{variation.description}</p>
                      </div>
                      <p className="font-bold text-gray-900">{formatPrice(variation.price)}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="w-12 h-10 border border-gray-300 rounded-lg flex items-center justify-center text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stockCount}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.stockCount} available
                  </span>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                <span className="text-gray-700 font-medium">Total Price:</span>
                <span className="text-2xl font-bold text-primary-600">{formatPrice(calculateTotalPrice())}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={addToCart}
                  disabled={!product.inStock || selectedColor === null || selectedSize === null || selectedVariation === null}
                  className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`px-4 py-3 rounded-lg border transition-colors ${
                    product.addedToWishlist
                      ? 'border-red-300 bg-red-50 text-red-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon icon={FiHeart} className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setShowReviews(false)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  !showReviews
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setShowReviews(true)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  showReviews
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({product.totalReviews})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {!showReviews ? (
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: product.longDescription }} />

                {/* Product Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                      <SafeIcon icon={FiShield} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Premium Quality</h3>
                      <p className="text-gray-600 text-sm">Imported directly from France with highest quality standards</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                      <SafeIcon icon={FiTruck} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Fast Delivery</h3>
                      <p className="text-gray-600 text-sm">Guaranteed delivery within 2-5 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                      <SafeIcon icon={FiPackage} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Secure Packaging</h3>
                      <p className="text-gray-600 text-sm">Special packaging to ensure fabric arrives in perfect condition</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <SafeIcon
                        key={i}
                        icon={FiStar}
                        className={`w-6 h-6 ${
                          i < Math.floor(product.rating) ? 'text-gold-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-xl text-gray-900">{product.rating} out of 5</p>
                    <p className="text-sm text-gray-600">Based on {product.totalReviews} reviews</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start space-x-3">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">{review.user}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <SafeIcon
                                      key={i}
                                      icon={FiStar}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? 'text-gold-500 fill-current' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mt-2">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-2 rounded-lg font-medium transition-colors">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Shipping & Vendor Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Shipping Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiTruck} className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Delivery Time</p>
                  <p className="text-gray-600 text-sm">{product.deliveryTime} (standard delivery)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiClock} className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Processing Time</p>
                  <p className="text-gray-600 text-sm">1-2 business days</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiAward} className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Shipping Policy</p>
                  <p className="text-gray-600 text-sm">Free shipping on orders over ₦100,000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vendor Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Vendor Information</h2>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={product.vendor.avatar}
                alt={product.vendor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center">
                  <h3 className="font-semibold text-gray-900 mr-2">{product.vendor.name}</h3>
                  {product.vendor.verified && (
                    <SafeIcon icon={FiShield} className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <p className="text-gray-600 text-sm">{product.vendor.location}</p>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <SafeIcon
                        key={i}
                        icon={FiStar}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.vendor.rating) ? 'text-gold-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">{product.vendor.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.vendor.badges.map((badge, index) => (
                <span
                  key={index}
                  className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
            <Link
              to={`/vendor/${product.vendor.id}`}
              className="block w-full bg-primary-50 text-primary-700 text-center py-2 rounded-lg font-medium hover:bg-primary-100 transition-colors"
            >
              Visit Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;