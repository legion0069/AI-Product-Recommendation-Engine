/**
 * HybridRecommender.js
 * Multi-algorithm hybrid recommendation blender:
 * Combines Collaborative Filtering, Content-Based Preference Matching, and Transactional Purchase History
 */

const { CollaborativeFiltering } = require('./CollaborativeFiltering');
const { ContentBasedFilter } = require('./ContentBasedFilter');
const { PurchaseHistoryAnalyzer } = require('./PurchaseHistoryAnalyzer');

class HybridRecommender {
  /**
   * Generate holistic personalized product recommendations
   * @param {Object} params
   * @param {User} params.user - Target customer
   * @param {Array<User>} params.allUsers - Peer users for collaborative filtering
   * @param {Array<Product>} params.catalog - Full product catalog
   * @param {number} [params.limit=6] - Max recommendations to return
   * @returns {Object} Personalized recommendation feed with explainability
   */
  static getPersonalizedRecommendations({
    user,
    allUsers = [],
    catalog = [],
    limit = 6
  }) {
    // 1. Analyze purchase history
    const purchaseProfile = PurchaseHistoryAnalyzer.analyze(user, catalog);

    // 2. Collaborative filtering candidates
    const cfCandidates = CollaborativeFiltering.recommendUserBased(user, allUsers, catalog, 5);

    // 3. Content-based candidates
    const contentCandidates = ContentBasedFilter.recommend(user, catalog);

    // 4. Combine and weight scores
    const mergedScores = new Map();

    // Ingest CF items
    cfCandidates.forEach(item => {
      const prodId = item.product.id;
      const normalizedScore = (item.predictedRating / 5.0) * 100;
      mergedScores.set(prodId, {
        product: item.product,
        cfScore: normalizedScore,
        contentScore: 0,
        historyScore: 0,
        reasons: [`Customers with similar taste rated this ${item.predictedRating} ★`]
      });
    });

    // Ingest Content items
    contentCandidates.forEach(item => {
      const prodId = item.product.id;
      if (mergedScores.has(prodId)) {
        const existing = mergedScores.get(prodId);
        existing.contentScore = item.matchScore;
        existing.reasons.push(...item.reasons);
      } else {
        mergedScores.set(prodId, {
          product: item.product,
          cfScore: 0,
          contentScore: item.matchScore,
          historyScore: 0,
          reasons: item.reasons
        });
      }
    });

    // Ingest Purchase history affinity boost
    if (purchaseProfile.categoryAffinity.length > 0) {
      const topCat = purchaseProfile.topCategory;
      catalog.forEach(product => {
        // Do not re-recommend products already in purchase history
        if (purchaseProfile.purchasedProductIds.has(product.id)) return;

        if (product.category.toLowerCase() === topCat) {
          const prodId = product.id;
          if (mergedScores.has(prodId)) {
            const existing = mergedScores.get(prodId);
            existing.historyScore = 25;
            existing.reasons.push(`Complements your previous purchases in ${product.category}`);
          } else {
            mergedScores.set(prodId, {
              product,
              cfScore: 0,
              contentScore: 40,
              historyScore: 25,
              reasons: [`Based on your frequent orders in ${product.category}`]
            });
          }
        }
      });
    }

    // 5. Final ensemble scoring formula: (CF * 0.45) + (Content * 0.35) + (History * 0.20)
    const finalizedList = [];

    mergedScores.forEach(entry => {
      // Exclude already purchased items
      if (purchaseProfile.purchasedProductIds.has(entry.product.id)) return;

      const finalScore = Math.round(
        (entry.cfScore * 0.45) +
        (entry.contentScore * 0.35) +
        (entry.historyScore * 0.20)
      );

      let badge = '💡 Recommended';
      if (finalScore >= 80) badge = '🔥 Best Match for You';
      else if (finalScore >= 65) badge = '⭐ High Compatibility';
      else if (entry.historyScore > 0) badge = '📦 Buy Again Category';

      finalizedList.push({
        product: entry.product,
        matchScore: Math.min(100, Math.max(25, finalScore)),
        badge,
        reasons: Array.from(new Set(entry.reasons)),
        algorithmBreakdown: {
          collaborativeFiltering: Math.round(entry.cfScore),
          contentMatching: Math.round(entry.contentScore),
          purchaseHistoryAffinity: Math.round(entry.historyScore)
        }
      });
    });

    // Sort descending by match score
    finalizedList.sort((a, b) => b.matchScore - a.matchScore);

    return {
      userId: user.id,
      userName: user.name,
      purchaseProfile,
      recommendations: finalizedList.slice(0, limit),
      generatedAt: new Date().toISOString()
    };
  }
}

module.exports = { HybridRecommender };
