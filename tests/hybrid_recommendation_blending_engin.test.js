/**
 * Automated Test Suite for Day 10: Hybrid Recommendation Blending Engine (Weighted Multi-Model Ensemble)
 */
const assert = require('assert');
const { HybridRecommendationBlendingEngin } = require('../src/features/hybrid_recommendation_blending_engin');
const { HybridRecommendationBlendingEnginController } = require('../src/controllers/hybrid_recommendation_blending_enginController');
const { cosineSimilarity, normalizeRatings } = require('../src/utils/hybrid_recommendation_blending_enginUtils');

async function runTest() {
  console.log('🧪 Testing HybridRecommendationBlendingEngin...');
  const service = new HybridRecommendationBlendingEngin();
  const output = await service.computeRecommendations({ id: 'u1' }, [{ id: 'p1', name: 'Item 1' }]);
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 10);
  assert.strictEqual(output.recommendations.length, 1);

  const controller = new HybridRecommendationBlendingEnginController();
  const res = await controller.handleRequest({ user: { id: 'u1' }, catalog: [{ id: 'p1' }] });
  assert.strictEqual(res.statusCode, 200);

  const sim = cosineSimilarity([1, 2, 3], [1, 2, 3]);
  assert.strictEqual(Math.round(sim), 1);
  console.log('✅ HybridRecommendationBlendingEngin passed all verification checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
