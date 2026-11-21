/**
 * AI Product Recommendation Engine - Mathematical & Vector Utilities for Day 6
 * Focus: User-Based Collaborative Filtering (User-User Cosine & Pearson)
 */

function cosineSimilarity(vecA = [], vecB = []) {
  if (!vecA.length || !vecB.length || vecA.length !== vecB.length) return 0.0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0.0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function normalizeRatings(ratings = []) {
  if (!ratings.length) return [];
  const mean = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  return ratings.map(r => Number((r - mean).toFixed(3)));
}

module.exports = { cosineSimilarity, normalizeRatings };
