/**
 * Automated Test Suite for Day 11: Cold-Start Onboarding Strategy & Popularity Fallback Engine
 */
const assert = require('assert');
const { ColdStartOnboardingStrategyPopul } = require('../src/features/cold_start_onboarding_strategy_popul');
const { ColdStartOnboardingStrategyPopulController } = require('../src/controllers/cold_start_onboarding_strategy_populController');
const { cosineSimilarity, normalizeRatings } = require('../src/utils/cold_start_onboarding_strategy_populUtils');

async function runTest() {
  console.log('🧪 Testing ColdStartOnboardingStrategyPopul...');
  const service = new ColdStartOnboardingStrategyPopul();
  const output = await service.computeRecommendations({ id: 'u1' }, [{ id: 'p1', name: 'Item 1' }]);
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 11);
  assert.strictEqual(output.recommendations.length, 1);

  const controller = new ColdStartOnboardingStrategyPopulController();
  const res = await controller.handleRequest({ user: { id: 'u1' }, catalog: [{ id: 'p1' }] });
  assert.strictEqual(res.statusCode, 200);

  const sim = cosineSimilarity([1, 2, 3], [1, 2, 3]);
  assert.strictEqual(Math.round(sim), 1);
  console.log('✅ ColdStartOnboardingStrategyPopul passed all verification checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
