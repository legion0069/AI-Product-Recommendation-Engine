/**
 * Automated Test Suite for Day 12: Real-Time Session-Based Recommender & Short-Term Intent Tracker
 */
const assert = require('assert');
const { RealTimeSessionBasedRecommender_ } = require('../src/features/real_time_session_based_recommender_');
const { RealTimeSessionBasedRecommender_Controller } = require('../src/controllers/real_time_session_based_recommender_Controller');
const { cosineSimilarity, normalizeRatings } = require('../src/utils/real_time_session_based_recommender_Utils');

async function runTest() {
  console.log('🧪 Testing RealTimeSessionBasedRecommender_...');
  const service = new RealTimeSessionBasedRecommender_();
  const output = await service.computeRecommendations({ id: 'u1' }, [{ id: 'p1', name: 'Item 1' }]);
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 12);
  assert.strictEqual(output.recommendations.length, 1);

  const controller = new RealTimeSessionBasedRecommender_Controller();
  const res = await controller.handleRequest({ user: { id: 'u1' }, catalog: [{ id: 'p1' }] });
  assert.strictEqual(res.statusCode, 200);

  const sim = cosineSimilarity([1, 2, 3], [1, 2, 3]);
  assert.strictEqual(Math.round(sim), 1);
  console.log('✅ RealTimeSessionBasedRecommender_ passed all verification checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
