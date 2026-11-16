/**
 * Automated Test Suite for Day 1: Project Setup, Architecture & Recommendation Domain Schemas
 */
const assert = require('assert');
const { ProjectSetupArchitectureRecommend } = require('../src/features/project_setup_architecture_recommend');
const { ProjectSetupArchitectureRecommendController } = require('../src/controllers/project_setup_architecture_recommendController');
const { cosineSimilarity, normalizeRatings } = require('../src/utils/project_setup_architecture_recommendUtils');

async function runTest() {
  console.log('🧪 Testing ProjectSetupArchitectureRecommend...');
  const service = new ProjectSetupArchitectureRecommend();
  const output = await service.computeRecommendations({ id: 'u1' }, [{ id: 'p1', name: 'Item 1' }]);
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 1);
  assert.strictEqual(output.recommendations.length, 1);

  const controller = new ProjectSetupArchitectureRecommendController();
  const res = await controller.handleRequest({ user: { id: 'u1' }, catalog: [{ id: 'p1' }] });
  assert.strictEqual(res.statusCode, 200);

  const sim = cosineSimilarity([1, 2, 3], [1, 2, 3]);
  assert.strictEqual(Math.round(sim), 1);
  console.log('✅ ProjectSetupArchitectureRecommend passed all verification checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
