/**
 * CollaborativeFiltering.js
 * User-Based and Item-Based Collaborative Filtering Recommender
 */

class CollaborativeFiltering {
  /**
   * Compute Cosine Similarity between two users based on their product ratings
   * @param {Object} ratingsA - { [productId]: rating }
   * @param {Object} ratingsB - { [productId]: rating }
   * @returns {number} Similarity score between 0.0 and 1.0
   */
  static computeUserSimilarity(ratingsA = {}, ratingsB = {}) {
    const productsA = Object.keys(ratingsA);
    const commonProducts = productsA.filter(p => ratingsB[p] !== undefined);

    if (commonProducts.length === 0) return 0.0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    commonProducts.forEach(prodId => {
      const rA = ratingsA[prodId];
      const rB = ratingsB[prodId];
      dotProduct += rA * rB;
    });

    Object.values(ratingsA).forEach(r => normA += r * r);
    Object.values(ratingsB).forEach(r => normB += r * r);

    if (normA === 0 || normB === 0) return 0.0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Predict product ratings for target user using top-K similar neighbors
   * @param {User} targetUser
   * @param {Array<User>} allUsers
   * @param {Array<Product>} catalog
   * @param {number} topKNeighbors
   * @returns {Array<Object>} Predicted product recommendations
   */
  static recommendUserBased(targetUser, allUsers = [], catalog = [], topKNeighbors = 5) {
    const targetRatings = targetUser.ratings || {};
    const neighborSimilarities = [];

    // 1. Calculate similarity with all other users
    allUsers.forEach(otherUser => {
      if (otherUser.id === targetUser.id) return;
      const sim = this.computeUserSimilarity(targetRatings, otherUser.ratings || {});
      if (sim > 0.05) {
        neighborSimilarities.push({ user: otherUser, similarity: sim });
      }
    });

    neighborSimilarities.sort((a, b) => b.similarity - a.similarity);
    const topNeighbors = neighborSimilarities.slice(0, topKNeighbors);

    if (topNeighbors.length === 0) return [];

    // 2. Score candidate products not yet rated by target user
    const productScores = {};
    const similaritySum = {};

    topNeighbors.forEach(({ user: neighbor, similarity }) => {
      Object.entries(neighbor.ratings || {}).forEach(([prodId, rating]) => {
        // Skip if target user already rated this product
        if (targetRatings[prodId] !== undefined) return;

        productScores[prodId] = (productScores[prodId] || 0) + (similarity * rating);
        similaritySum[prodId] = (similaritySum[prodId] || 0) + similarity;
      });
    });

    const catalogMap = new Map(catalog.map(p => [p.id, p]));
    const recommendations = [];

    Object.keys(productScores).forEach(prodId => {
      const totalSim = similaritySum[prodId];
      if (totalSim > 0) {
        const predictedRating = productScores[prodId] / totalSim;
        const product = catalogMap.get(prodId);
        if (product) {
          recommendations.push({
            product,
            predictedRating: Number(predictedRating.toFixed(2)),
            confidence: Number(Math.min(1.0, totalSim / topNeighbors.length).toFixed(2)),
            source: 'collaborative_filtering'
          });
        }
      }
    });

    recommendations.sort((a, b) => b.predictedRating - a.predictedRating);
    return recommendations;
  }
}

module.exports = { CollaborativeFiltering };
