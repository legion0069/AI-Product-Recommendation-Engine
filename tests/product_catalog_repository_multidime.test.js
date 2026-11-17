/**
 * Automated Test Suite for Day 2: Product Catalog Repository & Multidimensional Tagging Store
 */
const assert = require('assert');
const { ProductCatalogRepositoryMultidime } = require('../src/features/product_catalog_repository_multidime');
const { ProductCatalogRepositoryMultidimeController } = require('../src/controllers/product_catalog_repository_multidimeController');
const { cosineSimilarity, normalizeRatings } = require('../src/utils/product_catalog_repository_multidimeUtils');

async function runTest() {
  console.log('🧪 Testing ProductCatalogRepositoryMultidime...');
  const service = new ProductCatalogRepositoryMultidime();
  const output = await service.computeRecommendations({ id: 'u1' }, [{ id: 'p1', name: 'Item 1' }]);
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 2);
  assert.strictEqual(output.recommendations.length, 1);

  const controller = new ProductCatalogRepositoryMultidimeController();
  const res = await controller.handleRequest({ user: { id: 'u1' }, catalog: [{ id: 'p1' }] });
  assert.strictEqual(res.statusCode, 200);

  const sim = cosineSimilarity([1, 2, 3], [1, 2, 3]);
  assert.strictEqual(Math.round(sim), 1);
  console.log('✅ ProductCatalogRepositoryMultidime passed all verification checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
