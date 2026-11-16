/**
 * PurchaseHistoryAnalyzer.js
 * In-depth transactional analytics on customer purchase history to derive behavioral interest vectors
 */

class PurchaseHistoryAnalyzer {
  /**
   * Analyze transaction history for a given user
   * @param {User} user
   * @param {Array<Product>} catalog
   * @returns {Object} Comprehensive behavioral profile
   */
  static analyze(user, catalog = []) {
    const history = user.purchaseHistory || [];
    if (history.length === 0) {
      return {
        totalOrders: 0,
        totalSpend: 0,
        averageOrderValue: 0,
        purchasedProductIds: new Set(),
        categoryAffinity: {},
        brandAffinity: {},
        topCategory: null,
        topBrand: null,
        spendingTier: 'budget'
      };
    }

    const catalogMap = new Map(catalog.map(p => [p.id, p]));
    const purchasedProductIds = new Set();
    const categoryCounts = {};
    const brandCounts = {};
    let totalSpend = 0;

    history.forEach(tx => {
      purchasedProductIds.add(tx.productId);
      const product = catalogMap.get(tx.productId);
      const price = Number(tx.price) || (product ? product.price : 0);
      totalSpend += price;

      const category = (tx.category || (product ? product.category : 'General')).toLowerCase();
      const brand = (product ? product.brand : 'Generic').toLowerCase();

      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      brandCounts[brand] = (brandCounts[brand] || 0) + 1;
    });

    const averageOrderValue = history.length > 0 ? (totalSpend / history.length) : 0;

    // Sort category affinities
    const sortedCategories = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, count]) => ({ category: cat, count, share: count / history.length }));

    // Sort brand affinities
    const sortedBrands = Object.entries(brandCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([brand, count]) => ({ brand, count, share: count / history.length }));

    let spendingTier = 'budget';
    if (averageOrderValue > 300) spendingTier = 'luxury';
    else if (averageOrderValue > 100) spendingTier = 'mid-market';

    return {
      totalOrders: history.length,
      totalSpend: Number(totalSpend.toFixed(2)),
      averageOrderValue: Number(averageOrderValue.toFixed(2)),
      purchasedProductIds,
      categoryAffinity: sortedCategories,
      brandAffinity: sortedBrands,
      topCategory: sortedCategories[0]?.category || null,
      topBrand: sortedBrands[0]?.brand || null,
      spendingTier
    };
  }
}

module.exports = { PurchaseHistoryAnalyzer };
