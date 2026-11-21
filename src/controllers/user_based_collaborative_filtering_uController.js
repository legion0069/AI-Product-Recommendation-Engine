/**
 * AI Product Recommendation Engine - Controller Handler for Day 6
 * Capability: User-Based Collaborative Filtering (User-User Cosine & Pearson)
 */
const { UserBasedCollaborativeFilteringU } = require('../features/user_based_collaborative_filtering_u');

class UserBasedCollaborativeFilteringUController {
  constructor(config = {}) {
    this.service = new UserBasedCollaborativeFilteringU(config);
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

module.exports = { UserBasedCollaborativeFilteringUController };
