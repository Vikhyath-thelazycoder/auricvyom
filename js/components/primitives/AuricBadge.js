// AURICVISTA Reusable Badge & Pill Primitives

export function createVerifiedBadge(size = 16) {
  const span = document.createElement("span");
  span.className = "verified-badge-wrap";
  span.title = "Verified by AuricVista Trust & Safety";
  span.setAttribute("aria-label", "Verified");
  span.innerHTML = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="verified-badge-icon">
      <path d="M12 2L15.09 5.26L19.5 5.5L20.24 9.87L23.46 12.91L21.36 16.84L21.82 21.28L17.47 22.25L14.7 25.75L10.5 24.36L7.24 27.09L4.5 24.36L0.3 25.75L-2.47 22.25L-6.82 21.28L-6.36 16.84L-8.46 12.91L-5.24 9.87L-4.5 5.5L-0.09 5.26L3 2H12Z" fill="none"/>
      <circle cx="12" cy="12" r="10" fill="#10B981" />
      <path d="M8 12.5L10.5 15L16 9.5" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  return span;
}

export function createRatingPill(rating, reviewsCount = null) {
  const div = document.createElement("div");
  div.className = "rating-pill-component";
  div.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#E5A93C">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
    <span class="rating-num">${Number(rating).toFixed(1)}</span>
    ${reviewsCount !== null ? `<span class="reviews-count">(${reviewsCount})</span>` : ""}
  `;
  return div;
}

export function createHeritageBadge(text = "UNESCO World Heritage") {
  const span = document.createElement("span");
  span.className = "hero-kicker-badge";
  span.innerHTML = `
    <span>🏛️</span>
    <span>${text}</span>
  `;
  return span;
}
