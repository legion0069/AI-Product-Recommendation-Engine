/**
 * Automated Test Suite for Day 13: Implicit Feedback Processor (Clicks, Views, Cart Additions & Dwell Time)
 */
const assert = require('assert');
const { ImplicitFeedbackProcessorClicksV } = require('../src/features/implicit_feedback_processor_clicks_v');
const { ImplicitFeedbackProcessorClicksVController } = require('../src/controllers/implicit_feedback_processor_clicks_vController');
const { cosineSimilarity, normalizeRatings } = require('../src/utils/implicit_feedback_processor_clicks_vUtils');

async function runTest() {
  console.log('🧪 Testing ImplicitFeedbackProcessorClicksV...');
  const service = new ImplicitFeedbackProcessorClicksV();
  const output = await service.computeRecommendations({ id: 'u1' }, [{ id: 'p1', name: 'Item 1' }]);
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 13);
  assert.strictEqual(output.recommendations.length, 1);

  const controller = new ImplicitFeedbackProcessorClicksVController();
  const res = await controller.handleRequest({ user: { id: 'u1' }, catalog: [{ id: 'p1' }] });
  assert.strictEqual(res.statusCode, 200);

  const sim = cosineSimilarity([1, 2, 3], [1, 2, 3]);
  assert.strictEqual(Math.round(sim), 1);
  console.log('✅ ImplicitFeedbackProcessorClicksV passed all verification checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
