/**
 * Automated Test Suite for Day 5: Sparse Interaction Matrix Builder & Rating Normalizer
 */
const assert = require('assert');
const { SparseInteractionMatrixBuilderRa } = require('../src/features/sparse_interaction_matrix_builder_ra');
const { SparseInteractionMatrixBuilderRaController } = require('../src/controllers/sparse_interaction_matrix_builder_raController');
const { cosineSimilarity, normalizeRatings } = require('../src/utils/sparse_interaction_matrix_builder_raUtils');

async function runTest() {
  console.log('🧪 Testing SparseInteractionMatrixBuilderRa...');
  const service = new SparseInteractionMatrixBuilderRa();
  const output = await service.computeRecommendations({ id: 'u1' }, [{ id: 'p1', name: 'Item 1' }]);
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 5);
  assert.strictEqual(output.recommendations.length, 1);

  const controller = new SparseInteractionMatrixBuilderRaController();
  const res = await controller.handleRequest({ user: { id: 'u1' }, catalog: [{ id: 'p1' }] });
  assert.strictEqual(res.statusCode, 200);

  const sim = cosineSimilarity([1, 2, 3], [1, 2, 3]);
  assert.strictEqual(Math.round(sim), 1);
  console.log('✅ SparseInteractionMatrixBuilderRa passed all verification checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
