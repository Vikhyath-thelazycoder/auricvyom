// AURICVISTA Dynamic Personalization & Recommendation Engine Component
import { DESTINATIONS } from "../data/destinations.js";
import { appState } from "../state.js";
import { renderDestinationCard } from "./DestinationCard.js";

export function renderPersonalizationSection() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "personalization-section";

  const renderContent = () => {
    const { currentUser, wishlist, activeTripPlan } = appState.getState();
    const likedDest = wishlist.length > 0 ? wishlist[0].name : "Coorg";

    // Recommendations logic
    const recommendedForYou = DESTINATIONS.filter(d => 
      d.state && d.state.toLowerCase() === "karnataka" && d.rating >= 4.95
    ).slice(0, 3);

    const becauseYouLiked = DESTINATIONS.filter(d => 
      d.name !== likedDest && (d.category === "Nature" || d.category === "Culture")
    ).slice(0, 3);

    section.innerHTML = `
      <div class="content-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div>
            <span class="section-tag-gold">✨ CURATED FOR ${currentUser.name.toUpperCase()}</span>
            <h2 class="section-main-title">Personalized Escapes & Inspiration</h2>
            <p class="section-desc-muted">
              Tailored recommendations crafted from your travel history, wishlist choices, and active ${activeTripPlan.travelStyle} escape.
            </p>
          </div>

          <div style="font-size: 0.85rem; color: var(--gold-light); font-weight: 700;">
            💎 Diamond Tier Smart AI Suggestions
          </div>
        </div>

        <!-- Group 1: Recommended For You -->
        <div style="margin-bottom: 48px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-white);">
              🌟 Top Recommended for You
            </h3>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Handpicked Luxury Escapes</span>
          </div>

          <div class="destinations-grid" id="rec-grid-1">
            ${recommendedForYou.map(d => renderDestinationCard(d).outerHTML).join("")}
          </div>
        </div>

        <!-- Group 2: Because you liked... -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-white);">
              ☕ Because You Liked ${likedDest}
            </h3>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Highland & Plantation Alternatives</span>
          </div>

          <div class="destinations-grid" id="rec-grid-2">
            ${becauseYouLiked.map(d => renderDestinationCard(d).outerHTML).join("")}
          </div>
        </div>
      </div>
    `;

    // Re-bind card clicks
    section.querySelectorAll(".destination-card").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".card-wishlist-btn")) {
          e.stopPropagation();
          const destId = card.id.replace("dest-card-", "");
          const dest = DESTINATIONS.find(d => d.id === destId);
          if (dest) {
            appState.toggleWishlist(dest);
            renderContent();
          }
          return;
        }

        const destId = card.id.replace("dest-card-", "");
        const dest = DESTINATIONS.find(d => d.id === destId);
        if (dest) {
          appState.openDestinationModal(dest);
        }
      });
    });
  };

  appState.subscribe(() => {
    renderContent();
  });

  renderContent();
  return section;
}
