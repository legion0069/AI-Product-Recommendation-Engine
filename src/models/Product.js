/**
 * Product.js
 * Domain model for products within the AI Recommendation Engine
 */

class Product {
  constructor({
    id,
    name,
    category,
    brand,
    price,
    tags = [],
    rating = 4.0,
    reviewCount = 0,
    attributes = {}
  } = {}) {
    this.id = id || `prod_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    this.name = name || 'Untitled Product';
    this.category = category || 'General';
    this.brand = brand || 'Generic';
    this.price = Number(price) || 0.0;
    this.tags = Array.isArray(tags) ? tags.map(t => t.toLowerCase()) : [];
    this.rating = Number(rating) || 4.0;
    this.reviewCount = Number(reviewCount) || 0;
    this.attributes = attributes || {};
    this.createdAt = new Date().toISOString();
  }

  /**
   * Compute feature vector representation for content-based similarity
   */
  getFeatureTokens() {
    return [
      this.category.toLowerCase(),
      this.brand.toLowerCase(),
      ...this.tags,
      ...Object.values(this.attributes).map(v => String(v).toLowerCase())
    ];
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      brand: this.brand,
      price: this.price,
      tags: this.tags,
      rating: this.rating,
      reviewCount: this.reviewCount,
      attributes: this.attributes
    };
  }
}

module.exports = { Product };
