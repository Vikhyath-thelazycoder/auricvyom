// AURICVISTA Saved Trips & Wishlist Component
import { appState } from "../state.js";
import { DESTINATIONS } from "../data/destinations.js";
import { renderDestinationCard } from "./DestinationCard.js";

export function renderSavedTripsView() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "saved-trips-section";

  const renderContent = () => {
    const { wishlist } = appState.getState();

    section.innerHTML = `
      <div class="content-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div>
            <span class="section-tag-gold">❤️ YOUR CURATED WISHLIST</span>
            <h2 class="section-main-title">Saved Escapes & Sanctuaries</h2>
            <p class="section-desc-muted">
              All your favorite Karnataka coffee bungalows, heritage palaces, coastal villas, and marquee world destinations saved in one place.
            </p>
          </div>

          <div style="color: var(--gold-light); font-size: 0.95rem; font-weight: 600;">
            <span>${wishlist.length} Items Saved</span>
          </div>
        </div>

        <!-- Wishlist Grid -->
        ${wishlist.length === 0 ? `
          <div style="text-align: center; padding: 80px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1.5px dashed var(--border-gold); max-width: 650px; margin: 0 auto;">
            <div style="font-size: 3.5rem; margin-bottom: 16px;">✨</div>
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--text-white); margin-bottom: 8px;">Your Wishlist is Empty</h3>
            <p style="color: var(--text-secondary); margin-bottom: 24px; line-height: 1.6;">
              Explore our curated portfolio of Karnataka destinations and luxury sanctuaries, and click the heart icon on any card to save it here.
            </p>
            <button class="btn-primary-gold" id="explore-from-saved-btn">
              Explore Destinations
            </button>
          </div>
        ` : `
          <div class="destinations-grid" id="saved-cards-grid"></div>
        `}
      </div>
    `;

    if (wishlist.length > 0) {
      const grid = section.querySelector("#saved-cards-grid");
      wishlist.forEach(wItem => {
        // Find full destination object if matches
        const dest = DESTINATIONS.find(d => d.id === wItem.id) || {
          id: wItem.id,
          name: wItem.name,
          country: wItem.country,
          state: wItem.state,
          image: wItem.image,
          rating: wItem.rating,
          startingPrice: wItem.startingPrice,
          tagline: "Saved luxury retreat"
        };
        grid.appendChild(renderDestinationCard(dest));
      });
    }

    section.querySelector("#explore-from-saved-btn")?.addEventListener("click", () => {
      appState.setActiveTab("destinations");
    });
  };

  appState.subscribe(() => {
    if (appState.getState().activeTab === "saved") {
      renderContent();
    }
  });

  renderContent();
  return section;
}
