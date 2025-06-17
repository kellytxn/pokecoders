const FABRIC_SCORES = {
  "Organic Cotton": 1.0,
  "Recycled Polyester": 1.0,
  "Hemp": 1.0,
  "Linen": 0.9,
  "Lyocell": 0.85,
  "Spandex": 0.8,
  "Cotton": 0.7,
  "Polyester": 0.5,
  "Wool": 0.6,
  "Leather": 0.1,
  "Acrylic": 0.3,
  "Nylon": 0.4,
  "Bamboo Viscose": 0.5,
  "Bamboo Lyocell": 0.8,
  "Silk": 0.7,
  "Recycled Nylon": 0.7,
  "Recycled Cotton": 0.8,
};

const DEAL_BREAKERS = [
  "Animal Products",
  "Synthetic Virgin Polyester",
  "Non-transparent Sourcing",
];

/**
 * Sustainability score with fabric weighted more heavily:
 * - Fabric score weighted by 3.5 (greater influence)
 * - Ethical causes weighted by 0.4 each (less influence)
 * - Deal breaker penalty softened at -0.5 each
 * - Baseline bonus 0.5 for inflation
 * - Clamped 0 to 5
 */
export function computeSustainabilityScore(product) {
  let score = 0;

  // 1. Fabric score (average) weighted by 3.5
  if (product.fabricComposition && product.fabricComposition.length > 0) {
    const total = product.fabricComposition.reduce((acc, fabric) => {
      const fabricScore = FABRIC_SCORES[fabric] ?? 0.4;
      return acc + fabricScore;
    }, 0);
    score += (total / product.fabricComposition.length) * 3.5;
  }

  // 2. Ethical causes weighted by 0.4 each
  if (product.ethicalCauses && product.ethicalCauses.length > 0) {
    score += 0.4 * product.ethicalCauses.length;
  }

  // 3. Penalize deal breakers
  if (product.dealBreakers && product.dealBreakers.length > 0) {
    for (const issue of product.dealBreakers) {
      if (DEAL_BREAKERS.includes(issue)) {
        score -= 0.5;
      }
    }
  }

  // 4. Baseline bonus
  score += 0.5;

  // Clamp to 0-5
  score = Math.max(0, Math.min(5, score));

  return parseFloat(score.toFixed(1));
}