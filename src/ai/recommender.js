const parsePrepMinutes = (prepTime) => {
  const match = String(prepTime).match(/(\d+)/);
  return match ? Number(match[1]) : 20;
};

export const getRecommendation = (menu) => {
  if (!Array.isArray(menu) || menu.length === 0) {
    return null;
  }

  const scored = menu
    .map((item) => {
      const rating = Number(item.rating) || 0;
      const minutes = parsePrepMinutes(item.prepTime);
      const popularityScore = rating * 12 - minutes * 0.45;

      return {
        item,
        score: popularityScore,
        reason: `${item.tag} dish with a ${item.rating} rating and a ${item.prepTime} prep time.`,
      };
    })
    .sort((a, b) => b.score - a.score);

  const top = scored[0];

  return {
    item: top.item,
    title: 'Recommended for you',
    subtitle: 'Best balance of rating, speed, and menu appeal',
    reason: top.reason,
    score: top.score,
  };
};

export const recommendFood = (menu) => {
  const recommendation = getRecommendation(menu);

  if (!recommendation) {
    return 'No recommendation available right now.';
  }

  const { item } = recommendation;
  return `Try ${item.name} today. ${item.tag} and ready in ${item.prepTime}.`;
};
