/**
 * AI Product Recommendation Engine - Controller Handler for Day 13
 * Capability: Implicit Feedback Processor (Clicks, Views, Cart Additions & Dwell Time)
 */
const { ImplicitFeedbackProcessorClicksV } = require('../features/implicit_feedback_processor_clicks_v');

class ImplicitFeedbackProcessorClicksVController {
  constructor(config = {}) {
    this.service = new ImplicitFeedbackProcessorClicksV(config);
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

module.exports = { ImplicitFeedbackProcessorClicksVController };
