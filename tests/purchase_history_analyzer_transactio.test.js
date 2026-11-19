/**
 * Automated Test Suite for Day 4: Purchase History Analyzer & Transaction Ledger Ingestion
 */
const assert = require('assert');
const { PurchaseHistoryAnalyzerTransactio } = require('../src/features/purchase_history_analyzer_transactio');
const { PurchaseHistoryAnalyzerTransactioController } = require('../src/controllers/purchase_history_analyzer_transactioController');
const { cosineSimilarity, normalizeRatings } = require('../src/utils/purchase_history_analyzer_transactioUtils');

async function runTest() {
  console.log('🧪 Testing PurchaseHistoryAnalyzerTransactio...');
  const service = new PurchaseHistoryAnalyzerTransactio();
  const output = await service.computeRecommendations({ id: 'u1' }, [{ id: 'p1', name: 'Item 1' }]);
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 4);
  assert.strictEqual(output.recommendations.length, 1);

  const controller = new PurchaseHistoryAnalyzerTransactioController();
  const res = await controller.handleRequest({ user: { id: 'u1' }, catalog: [{ id: 'p1' }] });
  assert.strictEqual(res.statusCode, 200);

  const sim = cosineSimilarity([1, 2, 3], [1, 2, 3]);
  assert.strictEqual(Math.round(sim), 1);
  console.log('✅ PurchaseHistoryAnalyzerTransactio passed all verification checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
