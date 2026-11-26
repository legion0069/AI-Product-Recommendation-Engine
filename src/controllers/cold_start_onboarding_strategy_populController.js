/**
 * AI Product Recommendation Engine - Controller Handler for Day 11
 * Capability: Cold-Start Onboarding Strategy & Popularity Fallback Engine
 */
const { ColdStartOnboardingStrategyPopul } = require('../features/cold_start_onboarding_strategy_popul');

class ColdStartOnboardingStrategyPopulController {
  constructor(config = {}) {
    this.service = new ColdStartOnboardingStrategyPopul(config);
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

module.exports = { ColdStartOnboardingStrategyPopulController };
