// AURICVISTA Experiences Marketplace Component (14 Categories)
import { EXPERIENCES } from "../data/experiences.js";
import { appState } from "../state.js";

export function renderExperiencesView() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "experiences-section";

  let activeExpCategory = "all";
  let activeDifficulty = "all";

  const expCategories = [
    { id: "all", label: "🌟 All Experiences" },
    { id: "Trekking", label: "🥾 Trekking" },
    { id: "Safari", label: "🐅 Wildlife & Safari" },
    { id: "Adventure", label: "🧗 Whitewater & Rapids" },
    { id: "Scuba diving", label: "🤿 Scuba & Marine" },
    { id: "Cultural experiences", label: "🏛️ Heritage & Coracle" },
    { id: "Food experiences", label: "☕ Coffee & Gastronomy" },
    { id: "Night experiences", label: "🌌 Night Rainforest" }
  ];

  const renderContent = () => {
    const filteredExp = EXPERIENCES.filter(exp => {
      if (activeExpCategory !== "all" && exp.category !== activeExpCategory) return false;
      if (activeDifficulty !== "all" && exp.difficulty !== activeDifficulty) return false;
      return true;
    });

    section.innerHTML = `
      <div class="content-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div>
            <span class="section-tag-gold">🎟️ CURATED IMMERSIONS & OUTDOORS</span>
            <h2 class="section-main-title">Bespoke Experiences & Expeditions</h2>
            <p class="section-desc-muted">
              From bean-to-cup plantation roasting and Grade III+ river rapids to nocturnal rainforest walks and PADI coral reef diving.
            </p>
          </div>

          <div style="color: var(--gold-light); font-size: 0.95rem; font-weight: 600;">
            <span>${filteredExp.length} Experiences Available</span>
          </div>
        </div>

        <!-- 14 Category Filter Pills -->
        <div class="filter-tabs-pills" style="margin-bottom: 20px;">
          ${expCategories.map(c => `
            <button class="filter-pill-btn ${activeExpCategory === c.id ? 'active' : ''}" data-exp-cat="${c.id}">
              ${c.label}
            </button>
          `).join("")}
        </div>

        <!-- Difficulty Pills -->
        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 32px;">
          <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Difficulty:</span>
          ${["all", "Easy", "Moderate", "Challenging"].map(diff => `
            <button class="filter-pill-btn ${activeDifficulty === diff ? 'active' : ''}" data-diff="${diff}" style="padding: 6px 16px; font-size: 0.8rem;">
              ${diff === 'all' ? 'Any Difficulty' : diff}
            </button>
          `).join("")}
        </div>

        <!-- Experiences Grid -->
        <div class="destinations-grid" id="exp-cards-grid">
          ${filteredExp.map(exp => `
            <div class="destination-card" id="exp-card-${exp.id}">
              <div class="card-media-wrap">
                <img src="${exp.image}" alt="${exp.title}" class="card-cover-img" loading="lazy" />
                <div class="card-overlay-gradient"></div>
                <div class="card-top-badges">
                  <span class="badge-state-pill">${exp.category}</span>
                  <button class="card-wishlist-btn ${appState.isWishlisted(exp.id) ? 'active' : ''}" data-exp-id="${exp.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="${appState.isWishlisted(exp.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                </div>
                <div style="position: absolute; bottom: 12px; left: 16px; right: 16px; display: flex; justify-content: space-between; align-items: center; z-index: 3;">
                  <span style="font-size: 0.75rem; color: var(--gold-light); background: rgba(7,9,14,0.8); backdrop-filter: blur(8px); padding: 3px 10px; border-radius: var(--radius-full); border: 1px solid var(--border-gold); font-weight: 600;">
                    ⏱️ ${exp.duration}
                  </span>
                  <div class="card-rating-badge">
                    <span>★</span>
                    <span>${exp.rating}</span>
                  </div>
                </div>
              </div>

              <div class="card-content-body">
                <div>
                  <h3 class="card-destination-name" style="font-size: 1.2rem;">${exp.title}</h3>
                  <p style="font-size: 0.82rem; color: var(--gold-light); margin-bottom: 8px; font-weight: 600;">📍 ${exp.destinationName}</p>
                  <p class="card-tagline-text">${exp.description}</p>
                  
                  <!-- Inclusions -->
                  <div style="margin-bottom: 16px;">
                    <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 4px;">Includes:</span>
                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                      ${(exp.included || []).slice(0, 3).map(inc => `<span class="vibe-tag" style="font-size: 0.7rem;">✓ ${inc}</span>`).join("")}
                    </div>
                  </div>
                </div>

                <div class="card-footer-meta" style="flex-direction: column; align-items: stretch; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <div>
                      <div class="price-label-small">Per Person</div>
                      <div class="price-value-bold">${exp.priceDisplay}</div>
                    </div>
                    <span class="badge-state-pill" style="font-size: 0.65rem; padding: 2px 6px;">⚡ ${exp.difficulty}</span>
                  </div>

                  <div style="display: flex; gap: 10px;">
                    <button class="btn-outline-glass view-exp-details-btn" data-exp-id="${exp.id}" style="flex: 1; justify-content: center; padding: 10px; font-size: 0.85rem;">
                      View Details
                    </button>
                    <button class="btn-primary-gold book-exp-btn" data-exp-id="${exp.id}" style="flex: 1; justify-content: center; padding: 10px; font-size: 0.85rem;">
                      Book Activity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    // Category Listeners
    section.querySelectorAll("[data-exp-cat]").forEach(btn => {
      btn.addEventListener("click", () => {
        activeExpCategory = btn.dataset.expCat;
        renderContent();
      });
    });

    section.querySelectorAll("[data-diff]").forEach(btn => {
      btn.addEventListener("click", () => {
        activeDifficulty = btn.dataset.diff;
        renderContent();
      });
    });

    // View Details triggers ExperienceDetailModal
    section.querySelectorAll(".view-exp-details-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const expId = btn.dataset.expId;
        const exp = EXPERIENCES.find(x => x.id === expId);
        if (exp) {
          appState.setState({
            selectedExperienceDetail: exp,
            activeModal: "experienceDetail"
          });
        }
      });
    });

    // Book Activity triggers checkout
    section.querySelectorAll(".book-exp-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const expId = btn.dataset.expId;
        const exp = EXPERIENCES.find(x => x.id === expId);
        if (exp) {
          appState.setState({
            selectedExperienceForBooking: exp,
            selectedStayForBooking: null,
            selectedPackageForBooking: null,
            selectedFlightForBooking: null,
            activeModal: "booking"
          });
        }
      });
    });

    // Wishlist toggle
    section.querySelectorAll(".card-wishlist-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const expId = btn.dataset.expId;
        const exp = EXPERIENCES.find(x => x.id === expId);
        if (exp) {
          appState.toggleWishlist(exp);
          renderContent();
        }
      });
    });
  };

  appState.subscribe(() => {
    if (appState.getState().activeTab === "experiences") {
      renderContent();
    }
  });

  renderContent();
  return section;
}
