/**
 * Automated Test Suite for Day 6: User-Based Collaborative Filtering (User-User Cosine & Pearson)
 */
const assert = require('assert');
const { UserBasedCollaborativeFilteringU } = require('../src/features/user_based_collaborative_filtering_u');
const { UserBasedCollaborativeFilteringUController } = require('../src/controllers/user_based_collaborative_filtering_uController');
const { cosineSimilarity, normalizeRatings } = require('../src/utils/user_based_collaborative_filtering_uUtils');

async function runTest() {
  console.log('🧪 Testing UserBasedCollaborativeFilteringU...');
  const service = new UserBasedCollaborativeFilteringU();
  const output = await service.computeRecommendations({ id: 'u1' }, [{ id: 'p1', name: 'Item 1' }]);
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 6);
  assert.strictEqual(output.recommendations.length, 1);

  const controller = new UserBasedCollaborativeFilteringUController();
  const res = await controller.handleRequest({ user: { id: 'u1' }, catalog: [{ id: 'p1' }] });
  assert.strictEqual(res.statusCode, 200);

  const sim = cosineSimilarity([1, 2, 3], [1, 2, 3]);
  assert.strictEqual(Math.round(sim), 1);
  console.log('✅ UserBasedCollaborativeFilteringU passed all verification checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
