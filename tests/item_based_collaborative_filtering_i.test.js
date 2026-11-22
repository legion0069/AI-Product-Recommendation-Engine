/**
 * Automated Test Suite for Day 7: Item-Based Collaborative Filtering (Item-Item Adjusted Cosine)
 */
const assert = require('assert');
const { ItemBasedCollaborativeFilteringI } = require('../src/features/item_based_collaborative_filtering_i');
const { ItemBasedCollaborativeFilteringIController } = require('../src/controllers/item_based_collaborative_filtering_iController');
const { cosineSimilarity, normalizeRatings } = require('../src/utils/item_based_collaborative_filtering_iUtils');

async function runTest() {
  console.log('🧪 Testing ItemBasedCollaborativeFilteringI...');
  const service = new ItemBasedCollaborativeFilteringI();
  const output = await service.computeRecommendations({ id: 'u1' }, [{ id: 'p1', name: 'Item 1' }]);
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 7);
  assert.strictEqual(output.recommendations.length, 1);

  const controller = new ItemBasedCollaborativeFilteringIController();
  const res = await controller.handleRequest({ user: { id: 'u1' }, catalog: [{ id: 'p1' }] });
  assert.strictEqual(res.statusCode, 200);

  const sim = cosineSimilarity([1, 2, 3], [1, 2, 3]);
  assert.strictEqual(Math.round(sim), 1);
  console.log('✅ ItemBasedCollaborativeFilteringI passed all verification checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
