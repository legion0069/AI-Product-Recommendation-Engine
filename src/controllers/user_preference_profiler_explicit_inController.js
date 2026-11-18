/**
 * AI Product Recommendation Engine - Controller Handler for Day 3
 * Capability: User Preference Profiler & Explicit Interest Matrix
 */
const { UserPreferenceProfilerExplicitIn } = require('../features/user_preference_profiler_explicit_in');

class UserPreferenceProfilerExplicitInController {
  constructor(config = {}) {
    this.service = new UserPreferenceProfilerExplicitIn(config);
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

module.exports = { UserPreferenceProfilerExplicitInController };
