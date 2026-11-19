/**
 * AI Product Recommendation Engine - Controller Handler for Day 4
 * Capability: Purchase History Analyzer & Transaction Ledger Ingestion
 */
const { PurchaseHistoryAnalyzerTransactio } = require('../features/purchase_history_analyzer_transactio');

class PurchaseHistoryAnalyzerTransactioController {
  constructor(config = {}) {
    this.service = new PurchaseHistoryAnalyzerTransactio(config);
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

module.exports = { PurchaseHistoryAnalyzerTransactioController };
