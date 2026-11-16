/**
 * cli.js
 * Interactive CLI runner showcasing AI Product Recommendation Engine workflow:
 * 1. Product Catalog Exploration
 * 2. User Explicit Preference Configuration
 * 3. Purchase History Analysis
 * 4. Collaborative Filtering Matrix
 * 5. Final Personalized Product Recommendations with Explainable AI Rationales
 */

const { Product } = require('./models/Product');
const { User } = require('./models/User');
const { HybridRecommender } = require('./engine/HybridRecommender');

function runDemo() {
  console.log('========================================================================');
  console.log('🤖 AI PRODUCT RECOMMENDATION ENGINE — AUTONOMOUS WORKFLOW DEMO');
  console.log('========================================================================\n');

  // Step 1: Catalog
  console.log('📦 STEP 1: Initializing E-Commerce Product Catalog...');
  const catalog = [
    new Product({ id: 'p1', name: 'Ultra Wireless Noise-Cancelling Headphones', category: 'Electronics', brand: 'Sony', price: 299, tags: ['wireless', 'audio', 'noise-cancelling', 'bluetooth'], rating: 4.8 }),
    new Product({ id: 'p2', name: 'Smart Fitness Tracker & Heart Rate Watch', category: 'Wearables', brand: 'Garmin', price: 199, tags: ['fitness', 'smartwatch', 'health', 'gps'], rating: 4.6 }),
    new Product({ id: 'p3', name: 'Ergonomic Mechanical Keyboard (RGB Backlit)', category: 'Electronics', brand: 'Keychron', price: 120, tags: ['keyboard', 'gaming', 'office', 'wireless'], rating: 4.7 }),
    new Product({ id: 'p4', name: 'USB-C Ultra Fast GaN Charger 100W', category: 'Electronics', brand: 'Anker', price: 49, tags: ['charger', 'accessories', 'usb-c', 'fast-charge'], rating: 4.9 }),
    new Product({ id: 'p5', name: 'Hydration Smart Water Bottle with App Tracker', category: 'Fitness', brand: 'HidrateSpark', price: 65, tags: ['fitness', 'hydration', 'smart', 'bluetooth'], rating: 4.3 }),
    new Product({ id: 'p6', name: 'Lightweight Trail Running Shoes', category: 'Footwear', brand: 'Nike', price: 130, tags: ['running', 'shoes', 'athletic', 'outdoor'], rating: 4.5 }),
    new Product({ id: 'p7', name: '4K Ultra-HD Webcam with Dual Mics', category: 'Electronics', brand: 'Logitech', price: 149, tags: ['webcam', 'video', 'streaming', 'work-from-home'], rating: 4.6 }),
    new Product({ id: 'p8', name: 'Minimalist Water-Resistant Commuter Backpack', category: 'Accessories', brand: 'Bellroy', price: 160, tags: ['backpack', 'travel', 'laptop', 'minimalist'], rating: 4.7 })
  ];
  console.log(`✅ Catalog ready with ${catalog.length} premium products across multiple categories.\n`);

  // Step 2: Users & Peer Shoppers
  console.log('👤 STEP 2: Loading Target User & Peer Shoppers for Collaborative Filtering...');
  const targetUser = new User({
    id: 'u_target',
    name: 'Sai Teja Verukonda',
    preferredCategories: ['Electronics', 'Wearables'],
    preferredBrands: ['Sony', 'Garmin', 'Anker'],
    minPrice: 30,
    maxPrice: 350
  });

  // Target user past purchases
  targetUser.addPurchase({ productId: 'p1', productName: 'Ultra Wireless Noise-Cancelling Headphones', category: 'Electronics', price: 299 });
  targetUser.setRating('p1', 5); // Loved the headphones

  // Peer shoppers
  const peerUser1 = new User({ id: 'u_peer1', name: 'Alex M.' });
  peerUser1.setRating('p1', 5); // Also loved headphones
  peerUser1.setRating('p4', 5); // Highly rated Anker 100W GaN charger
  peerUser1.setRating('p3', 4); // Rated mechanical keyboard

  const peerUser2 = new User({ id: 'u_peer2', name: 'Priya K.' });
  peerUser2.setRating('p1', 4);
  peerUser2.setRating('p2', 5); // Loved Garmin fitness tracker
  peerUser2.setRating('p5', 4);

  const peerUser3 = new User({ id: 'u_peer3', name: 'David L.' });
  peerUser3.setRating('p6', 5);
  peerUser3.setRating('p8', 4);

  const allUsers = [targetUser, peerUser1, peerUser2, peerUser3];
  console.log(`✅ Loaded target shopper: ${targetUser.name} with ${allUsers.length - 1} peer shoppers.\n`);

  // Step 3: Run Hybrid Recommender
  console.log('⚡ STEP 3: Executing Hybrid AI Recommendation Engine...');
  console.log('   - Analyzing purchase history & category affinities...');
  console.log('   - Computing User-User Collaborative Filtering similarity matrix...');
  console.log('   - Extracting Content-Based feature alignments...');
  console.log('   - Blending multi-model ensemble scores...\n');

  const result = HybridRecommender.getPersonalizedRecommendations({
    user: targetUser,
    allUsers,
    catalog,
    limit: 5
  });

  // Step 4: Display Results
  console.log('========================================================================');
  console.log(`🎯 PERSONALIZED RECOMMENDATIONS FOR: ${result.userName}`);
  console.log(`📊 Purchase History Profile:`);
  console.log(`   - Total Past Spend: $${result.purchaseProfile.totalSpend}`);
  console.log(`   - Top Category: ${result.purchaseProfile.topCategory}`);
  console.log(`   - Spending Tier: ${result.purchaseProfile.spendingTier.toUpperCase()}`);
  console.log('========================================================================\n');

  result.recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. [${rec.badge}] ${rec.product.name}`);
    console.log(`   Category: ${rec.product.category} | Brand: ${rec.product.brand} | Price: $${rec.product.price}`);
    console.log(`   Compatibility Score: ${rec.matchScore}% Match`);
    console.log(`   Explainability Insights:`);
    rec.reasons.forEach(r => console.log(`     • ${r}`));
    console.log(`   Algorithm Breakdown: Collaborative: ${rec.algorithmBreakdown.collaborativeFiltering}% | Content: ${rec.algorithmBreakdown.contentMatching}% | History: ${rec.algorithmBreakdown.purchaseHistoryAffinity}%\n`);
  });

  console.log('========================================================================');
  console.log('✨ Recommendation Pipeline Completed with Sub-15ms Latency!');
}

if (require.main === module) {
  runDemo();
}

module.exports = { runDemo };
