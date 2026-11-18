/**
 * Automated Test Suite for Day 3: User Preference Profiler & Explicit Interest Matrix
 */
const assert = require('assert');
const { UserPreferenceProfilerExplicitIn } = require('../src/features/user_preference_profiler_explicit_in');
const { UserPreferenceProfilerExplicitInController } = require('../src/controllers/user_preference_profiler_explicit_inController');
const { cosineSimilarity, normalizeRatings } = require('../src/utils/user_preference_profiler_explicit_inUtils');

async function runTest() {
  console.log('🧪 Testing UserPreferenceProfilerExplicitIn...');
  const service = new UserPreferenceProfilerExplicitIn();
  const output = await service.computeRecommendations({ id: 'u1' }, [{ id: 'p1', name: 'Item 1' }]);
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 3);
  assert.strictEqual(output.recommendations.length, 1);

  const controller = new UserPreferenceProfilerExplicitInController();
  const res = await controller.handleRequest({ user: { id: 'u1' }, catalog: [{ id: 'p1' }] });
  assert.strictEqual(res.statusCode, 200);

  const sim = cosineSimilarity([1, 2, 3], [1, 2, 3]);
  assert.strictEqual(Math.round(sim), 1);
  console.log('✅ UserPreferenceProfilerExplicitIn passed all verification checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
