// AURICVISTA Reusable Shimmer Skeleton Loaders

export function createCardSkeleton(width = "165px", height = "210px") {
  const card = document.createElement("div");
  card.className = "skeleton";
  card.style.width = width;
  card.style.height = height;
  card.style.borderRadius = "var(--radius-md)";
  card.style.flexShrink = "0";
  return card;
}

export function createHeroSkeleton() {
  const hero = document.createElement("div");
  hero.className = "skeleton";
  hero.style.width = "100%";
  hero.style.height = "55vh";
  hero.style.borderRadius = "0";
  return hero;
}
