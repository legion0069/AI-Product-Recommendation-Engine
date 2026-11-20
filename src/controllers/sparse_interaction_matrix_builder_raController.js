/**
 * AI Product Recommendation Engine - Controller Handler for Day 5
 * Capability: Sparse Interaction Matrix Builder & Rating Normalizer
 */
const { SparseInteractionMatrixBuilderRa } = require('../features/sparse_interaction_matrix_builder_ra');

class SparseInteractionMatrixBuilderRaController {
  constructor(config = {}) {
    this.service = new SparseInteractionMatrixBuilderRa(config);
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

module.exports = { SparseInteractionMatrixBuilderRaController };
