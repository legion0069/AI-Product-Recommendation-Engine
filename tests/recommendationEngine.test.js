/**
 * recommendationEngine.test.js
 * Automated unit and integration test suite for AI Product Recommendation Engine
 */

const assert = require('assert');
const { Product } = require('../src/models/Product');
const { User } = require('../src/models/User');
const { PurchaseHistoryAnalyzer } = require('../src/engine/PurchaseHistoryAnalyzer');
const { CollaborativeFiltering } = require('../src/engine/CollaborativeFiltering');
const { ContentBasedFilter } = require('../src/engine/ContentBasedFilter');
const { HybridRecommender } = require('../src/engine/HybridRecommender');

console.log('🧪 Starting AI Product Recommendation Engine Test Suite...\n');

function runTests() {
  let passed = 0;
  let total = 0;

  function test(name, fn) {
    total++;
    try {
      fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}\n     ${err.message}`);
    }
  }

  // Test 1: Product model initialization
  test('Product model instantiates with tags and feature tokens', () => {
    const prod = new Product({
      id: 'p_test',
      name: 'Wireless Earbuds',
      category: 'Audio',
      brand: 'Bose',
      price: 199,
      tags: ['audio', 'wireless']
    });

    assert.strictEqual(prod.id, 'p_test');
    assert.strictEqual(prod.price, 199);
    assert.strictEqual(prod.tags.includes('wireless'), true);
    assert.strictEqual(prod.getFeatureTokens().includes('audio'), true);
  });

  // Test 2: User model and purchase history
  test('User model records purchases and ratings', () => {
    const user = new User({ id: 'u_test', name: 'Shopper' });
    user.addPurchase({ productId: 'p1', price: 50, category: 'Apparel' });
    user.setRating('p1', 5);

    assert.strictEqual(user.purchaseHistory.length, 1);
    assert.strictEqual(user.ratings['p1'], 5);
  });

  // Test 3: Purchase History Analyzer
  test('PurchaseHistoryAnalyzer computes total spend, AOV, and top categories', () => {
    const user = new User({ id: 'u_test' });
    user.addPurchase({ productId: 'p1', price: 100, category: 'Electronics' });
    user.addPurchase({ productId: 'p2', price: 200, category: 'Electronics' });
    user.addPurchase({ productId: 'p3', price: 50, category: 'Books' });

    const analysis = PurchaseHistoryAnalyzer.analyze(user);
    assert.strictEqual(analysis.totalOrders, 3);
    assert.strictEqual(analysis.totalSpend, 350);
    assert.strictEqual(analysis.averageOrderValue, Number((350 / 3).toFixed(2)));
    assert.strictEqual(analysis.topCategory, 'electronics');
    assert.strictEqual(analysis.spendingTier, 'mid-market');
  });

  // Test 4: Collaborative Filtering
  test('CollaborativeFiltering computes similarity and predicts ratings', () => {
    const u1 = new User({ id: 'u1', ratings: { p1: 5, p2: 4, p3: 2 } });
    const u2 = new User({ id: 'u2', ratings: { p1: 5, p2: 4, p4: 5 } });

    const sim = CollaborativeFiltering.computeUserSimilarity(u1.ratings, u2.ratings);
    assert.strictEqual(sim > 0.7, true);

    const catalog = [
      new Product({ id: 'p4', name: 'Product 4', category: 'Tech' })
    ];

    const recs = CollaborativeFiltering.recommendUserBased(u1, [u1, u2], catalog);
    assert.strictEqual(recs.length, 1);
    assert.strictEqual(recs[0].product.id, 'p4');
    assert.strictEqual(recs[0].predictedRating, 5);
  });

  // Test 5: Content-Based Filtering
  test('ContentBasedFilter scores products aligning with category and brand', () => {
    const user = new User({
      id: 'u1',
      preferredCategories: ['Smart Home'],
      preferredBrands: ['Philips']
    });

    const catalog = [
      new Product({ id: 'p1', name: 'Smart Bulb', category: 'Smart Home', brand: 'Philips', price: 30, rating: 4.8 }),
      new Product({ id: 'p2', name: 'Coffee Mug', category: 'Kitchen', brand: 'Generic', price: 10, rating: 3.5 })
    ];

    const recs = ContentBasedFilter.recommend(user, catalog);
    assert.strictEqual(recs.length > 0, true);
    assert.strictEqual(recs[0].product.id, 'p1');
    assert.strictEqual(recs[0].matchScore >= 70, true);
  });

  // Test 6: Hybrid Recommender
  test('HybridRecommender combines CF, content, and history into personalized feed', () => {
    const targetUser = new User({
      id: 'target',
      preferredCategories: ['Audio'],
      preferredBrands: ['Sony']
    });
    targetUser.addPurchase({ productId: 'p1', category: 'Audio', price: 150 });
    targetUser.setRating('p1', 5);

    const peer = new User({ id: 'peer', ratings: { p1: 5, p2: 5 } });

    const catalog = [
      new Product({ id: 'p1', name: 'Headphones', category: 'Audio', brand: 'Sony', price: 150 }),
      new Product({ id: 'p2', name: 'Speakers', category: 'Audio', brand: 'Sony', price: 200, rating: 4.9 })
    ];

    const result = HybridRecommender.getPersonalizedRecommendations({
      user: targetUser,
      allUsers: [targetUser, peer],
      catalog,
      limit: 2
    });

    assert.strictEqual(result.recommendations.length, 1);
    assert.strictEqual(result.recommendations[0].product.id, 'p2');
    assert.strictEqual(result.recommendations[0].matchScore >= 75, true);
  });

  console.log(`\n📊 Test Run Completed: ${passed} / ${total} tests passed.`);
  if (passed !== total) {
    process.exit(1);
  }
}

runTests();
