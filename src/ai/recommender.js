export const recommendFood = (menu) => {
  const random = menu[Math.floor(Math.random() * menu.length)];
  return `Try ${random.name} today. ${random.tag} and ready in ${random.prepTime}.`;
};
