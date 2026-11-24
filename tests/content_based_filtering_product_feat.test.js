/**
 * Automated Test Suite for Day 9: Content-Based Filtering & Product Feature Vector Extraction
 */
const assert = require('assert');
const { ContentBasedFilteringProductFeat } = require('../src/features/content_based_filtering_product_feat');
const { ContentBasedFilteringProductFeatController } = require('../src/controllers/content_based_filtering_product_featController');
const { cosineSimilarity, normalizeRatings } = require('../src/utils/content_based_filtering_product_featUtils');

async function runTest() {
  console.log('🧪 Testing ContentBasedFilteringProductFeat...');
  const service = new ContentBasedFilteringProductFeat();
  const output = await service.computeRecommendations({ id: 'u1' }, [{ id: 'p1', name: 'Item 1' }]);
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 9);
  assert.strictEqual(output.recommendations.length, 1);

  const controller = new ContentBasedFilteringProductFeatController();
  const res = await controller.handleRequest({ user: { id: 'u1' }, catalog: [{ id: 'p1' }] });
  assert.strictEqual(res.statusCode, 200);

  const sim = cosineSimilarity([1, 2, 3], [1, 2, 3]);
  assert.strictEqual(Math.round(sim), 1);
  console.log('✅ ContentBasedFilteringProductFeat passed all verification checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
