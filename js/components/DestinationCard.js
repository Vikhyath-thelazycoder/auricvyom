// AURICVISTA Destination Card Component (Enhanced Discovery Edition)
import { appState } from "../state.js";

export function renderDestinationCard(dest) {
  const card = document.createElement("div");
  card.className = "destination-card";
  card.id = `dest-card-${dest.id}`;

  const isWish = appState.isWishlisted(dest.id);
  const stateBadge = dest.state ? `${dest.state}` : dest.country;
  const vibes = dest.vibe || dest.interests || ["Heritage", "Luxury"];
  const duration = dest.recommendedDuration || "2–3 Days";
  const dist = dest.distanceFromBlr !== undefined ? dest.distanceFromBlr : 250;

  card.innerHTML = `
    <!-- Card Media with Zoom Effect -->
    <div class="card-media-wrap">
      <img 
        src="${dest.image}" 
        alt="${dest.name}" 
        class="card-cover-img"
        loading="lazy"
      />
      <div class="card-overlay-gradient"></div>

      <!-- Top Badges -->
      <div class="card-top-badges">
        <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
          <span class="badge-state-pill">${stateBadge}</span>
          ${dist > 0 && dist <= 500 ? `<span class="badge-state-pill" style="border-color: rgba(255,255,255,0.3); background: rgba(7,9,14,0.85); font-size: 0.68rem;">🚗 ${dist} km</span>` : ''}
        </div>

        <button class="card-wishlist-btn ${isWish ? 'active' : ''}" title="Save to Wishlist" data-dest-id="${dest.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <!-- Floating Bottom Media Metadata (Duration + Rating) -->
      <div style="position: absolute; bottom: 12px; left: 16px; right: 16px; display: flex; justify-content: space-between; align-items: center; z-index: 3;">
        <span style="font-size: 0.75rem; color: var(--gold-light); background: rgba(7,9,14,0.75); backdrop-filter: blur(8px); padding: 3px 10px; border-radius: var(--radius-full); border: 1px solid var(--border-gold); font-weight: 600;">
          ⏱️ ${duration}
        </span>

        <div class="card-rating-badge" style="background: rgba(7,9,14,0.85); backdrop-filter: blur(8px); border: 1px solid var(--border-gold);">
          <span>★</span>
          <span>${dest.rating || 4.9}</span>
        </div>
      </div>
    </div>

    <!-- Card Content Body -->
    <div class="card-content-body">
      <div>
        <div class="card-title-row">
          <h3 class="card-destination-name">${dest.name}</h3>
        </div>

        <p class="card-tagline-text">${dest.tagline || dest.description}</p>

        <!-- Vibe & Interest Tags -->
        <div class="card-vibes-row">
          ${vibes.slice(0, 3).map(v => `<span class="vibe-tag">${v}</span>`).join("")}
        </div>
      </div>

      <!-- Card Footer Meta -->
      <div class="card-footer-meta">
        <div>
          <div class="price-label-small">Starting From</div>
          <div class="price-value-bold">${dest.startingPrice || '₹4,999'}</div>
        </div>

        <button class="card-explore-btn">
          <span>Discover</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline; margin-left:4px; vertical-align:middle;">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Click card to open deep modal
  card.addEventListener("click", (e) => {
    if (e.target.closest(".card-wishlist-btn")) {
      e.stopPropagation();
      const updatedWish = appState.toggleWishlist(dest);
      const btn = card.querySelector(".card-wishlist-btn");
      if (updatedWish) {
        btn.classList.add("active");
        btn.querySelector("svg").setAttribute("fill", "currentColor");
      } else {
        btn.classList.remove("active");
        btn.querySelector("svg").setAttribute("fill", "none");
      }
      return;
    }
    appState.openDestinationModal(dest);
  });

  return card;
}
