/**
 * AI Product Recommendation Engine - Controller Handler for Day 2
 * Capability: Product Catalog Repository & Multidimensional Tagging Store
 */
const { ProductCatalogRepositoryMultidime } = require('../features/product_catalog_repository_multidime');

class ProductCatalogRepositoryMultidimeController {
  constructor(config = {}) {
    this.service = new ProductCatalogRepositoryMultidime(config);
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

module.exports = { ProductCatalogRepositoryMultidimeController };
