/**
 * AI Product Recommendation Engine - Controller Handler for Day 7
 * Capability: Item-Based Collaborative Filtering (Item-Item Adjusted Cosine)
 */
const { ItemBasedCollaborativeFilteringI } = require('../features/item_based_collaborative_filtering_i');

class ItemBasedCollaborativeFilteringIController {
  constructor(config = {}) {
    this.service = new ItemBasedCollaborativeFilteringI(config);
  }

  async handleRequest(req = {}) {
    try {
      const user = req.user || req.body?.user || {};
      const catalog = req.catalog || req.body?.catalog || [];
      const options = req.options || req.body?.options || {};
      const result = await this.service.computeRecommendations(user, catalog, options);
      return { statusCode: 200, data: result };
    } catch (err) {
      return { statusCode: 500, error: err.message || 'Recommendation controller error' };
    }
  }
}

module.exports = { ItemBasedCollaborativeFilteringIController };
