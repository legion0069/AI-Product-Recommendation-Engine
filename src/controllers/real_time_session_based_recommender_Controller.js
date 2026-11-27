/**
 * AI Product Recommendation Engine - Controller Handler for Day 12
 * Capability: Real-Time Session-Based Recommender & Short-Term Intent Tracker
 */
const { RealTimeSessionBasedRecommender_ } = require('../features/real_time_session_based_recommender_');

class RealTimeSessionBasedRecommender_Controller {
  constructor(config = {}) {
    this.service = new RealTimeSessionBasedRecommender_(config);
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

module.exports = { RealTimeSessionBasedRecommender_Controller };
