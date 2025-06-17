// scorer.js (inflated scoring)

// Basic rules (same fabric scores)
const FABRIC_SCORES = {
  "Organic Cotton": 1.0,
  "Recycled Polyester": 1.0,
  "Hemp": 1.0,
  "Linen": 0.9,           
  "Conventional Cotton": 0.7,
  "Polyester": 0.5,        
  "Wool": 0.6,             
  "Leather": 0.1,          
};

const DEAL_BREAKERS = [
  "Animal Products",
  "Synthetic Virgin Polyester",
  "Non-transparent Sourcing",
];

/**
 * Inflated sustainability score calculation:
 * - Fabric scores weighted normally, slightly increased baseline
 * - Ethical causes weighted more heavily
 * - Deal breaker penalty softened
 * - Final bonus added to inflate scores generally
 */

export function computeSustainabilityScore(product) {
  let score = 0;

  // 1. Fabric score (average)
  if (product.fabricComposition && product.fabricComposition.length > 0) {
    const total = product.fabricComposition.reduce((acc, fabric) => {
      const fabricScore = FABRIC_SCORES[fabric] ?? 0.4;
      return acc + fabricScore;
    }, 0);
    score += total / product.fabricComposition.length;
  }

  // 2. Ethical causes
  if (product.ethicalCauses) {
    score += 1.0 * product.ethicalCauses.length;
  }

  // 3. Penalize deal breakers
  if (product.dealBreakers) {
    for (const issue of product.dealBreakers) {
      if (DEAL_BREAKERS.includes(issue)) {
        score -= 0.5;
      }
    }
  }

  score += 0.5;


  score = Math.max(0, Math.min(5, score));

  return parseFloat(score.toFixed(1));
}