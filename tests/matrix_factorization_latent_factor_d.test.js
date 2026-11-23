/**
 * Automated Test Suite for Day 8: Matrix Factorization & Latent Factor Decomposition (SVD / ALS)
 */
const assert = require('assert');
const { MatrixFactorizationLatentFactorD } = require('../src/features/matrix_factorization_latent_factor_d');
const { MatrixFactorizationLatentFactorDController } = require('../src/controllers/matrix_factorization_latent_factor_dController');
const { cosineSimilarity, normalizeRatings } = require('../src/utils/matrix_factorization_latent_factor_dUtils');

async function runTest() {
  console.log('🧪 Testing MatrixFactorizationLatentFactorD...');
  const service = new MatrixFactorizationLatentFactorD();
  const output = await service.computeRecommendations({ id: 'u1' }, [{ id: 'p1', name: 'Item 1' }]);
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 8);
  assert.strictEqual(output.recommendations.length, 1);

  const controller = new MatrixFactorizationLatentFactorDController();
  const res = await controller.handleRequest({ user: { id: 'u1' }, catalog: [{ id: 'p1' }] });
  assert.strictEqual(res.statusCode, 200);

  const sim = cosineSimilarity([1, 2, 3], [1, 2, 3]);
  assert.strictEqual(Math.round(sim), 1);
  console.log('✅ MatrixFactorizationLatentFactorD passed all verification checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
