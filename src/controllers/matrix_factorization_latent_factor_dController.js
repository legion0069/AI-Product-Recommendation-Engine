/**
 * AI Product Recommendation Engine - Controller Handler for Day 8
 * Capability: Matrix Factorization & Latent Factor Decomposition (SVD / ALS)
 */
const { MatrixFactorizationLatentFactorD } = require('../features/matrix_factorization_latent_factor_d');

class MatrixFactorizationLatentFactorDController {
  constructor(config = {}) {
    this.service = new MatrixFactorizationLatentFactorD(config);
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

module.exports = { MatrixFactorizationLatentFactorDController };
