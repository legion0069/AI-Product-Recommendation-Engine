/**
 * ContentBasedFilter.js
 * Content-based recommendation filtering matching product feature tokens against user preferences
 */

class ContentBasedFilter {
  /**
   * Score candidate products based on explicit user preferences
   * @param {User} user
   * @param {Array<Product>} catalog
   * @returns {Array<Object>} Ranked content-based recommendations
   */
  static recommend(user, catalog = []) {
    const prefCategories = user.preferredCategories || [];
    const prefBrands = user.preferredBrands || [];
    const ratedProductIds = new Set(Object.keys(user.ratings || {}));

    const scoredProducts = [];

    catalog.forEach(product => {
      // Skip if already purchased or rated
      if (ratedProductIds.has(product.id)) return;

      let score = 0;
      const reasons = [];

      // Category matching (High weight)
      if (prefCategories.includes(product.category.toLowerCase())) {
        score += 45;
        reasons.push(`Matches your interest in ${product.category}`);
      }

      // Brand matching
      if (prefBrands.includes(product.brand.toLowerCase())) {
        score += 25;
        reasons.push(`From your favorite brand ${product.brand}`);
      }

      // Price preference matching
      if (product.price >= user.minPrice && product.price <= user.maxPrice) {
        score += 15;
      }

      // Product quality rating boost
      if (product.rating >= 4.5) {
        score += 15;
        reasons.push(`Top customer rated (${product.rating} ★)`);
      } else if (product.rating >= 4.0) {
        score += 8;
      }

      if (score > 20) {
        scoredProducts.push({
          product,
          matchScore: Math.min(100, score),
          reasons: reasons.length > 0 ? reasons : ['Trending in your preferred catalog'],
          source: 'content_based'
        });
      }
    });

    scoredProducts.sort((a, b) => b.matchScore - a.matchScore);
    return scoredProducts;
  }
}

module.exports = { ContentBasedFilter };
