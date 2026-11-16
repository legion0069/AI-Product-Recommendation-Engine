/**
 * AI Product Recommendation Engine - Controller Handler for Day 1
 * Capability: Project Setup, Architecture & Recommendation Domain Schemas
 */
const { ProjectSetupArchitectureRecommend } = require('../features/project_setup_architecture_recommend');

class ProjectSetupArchitectureRecommendController {
  constructor(config = {}) {
    this.service = new ProjectSetupArchitectureRecommend(config);
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

module.exports = { ProjectSetupArchitectureRecommendController };
