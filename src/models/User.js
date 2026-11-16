/**
 * User.js
 * Domain model for users, explicit preferences, and purchase interactions
 */

class User {
  constructor({
    id,
    name,
    email = '',
    preferredCategories = [],
    preferredBrands = [],
    priceSensitivity = 'medium', // 'low', 'medium', 'high'
    minPrice = 0,
    maxPrice = 10000,
    purchaseHistory = [],
    ratings = {} // { [productId]: rating (1-5) }
  } = {}) {
    this.id = id || `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    this.name = name || 'Anonymous Shopper';
    this.email = email;
    this.preferredCategories = Array.isArray(preferredCategories) ? preferredCategories.map(c => c.toLowerCase()) : [];
    this.preferredBrands = Array.isArray(preferredBrands) ? preferredBrands.map(b => b.toLowerCase()) : [];
    this.priceSensitivity = priceSensitivity;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.purchaseHistory = Array.isArray(purchaseHistory) ? purchaseHistory : [];
    this.ratings = typeof ratings === 'object' && ratings !== null ? { ...ratings } : {};
  }

  addPurchase(purchase) {
    const item = {
      orderId: purchase.orderId || `ord_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      productId: purchase.productId,
      productName: purchase.productName || '',
      category: purchase.category || '',
      price: Number(purchase.price) || 0,
      timestamp: purchase.timestamp || new Date().toISOString()
    };
    this.purchaseHistory.push(item);
    return item;
  }

  setRating(productId, rating) {
    const r = Math.max(1, Math.min(5, Number(rating) || 3));
    this.ratings[productId] = r;
  }

  addPreferredCategory(category) {
    const clean = (category || '').toLowerCase().trim();
    if (clean && !this.preferredCategories.includes(clean)) {
      this.preferredCategories.push(clean);
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      preferredCategories: this.preferredCategories,
      preferredBrands: this.preferredBrands,
      priceSensitivity: this.priceSensitivity,
      purchaseHistory: this.purchaseHistory,
      ratings: this.ratings
    };
  }
}

module.exports = { User };
