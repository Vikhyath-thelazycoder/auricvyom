// AURICVISTA Global Search UI Foundation Component
// Master Authority: Phase 2 Step 11 & Step 15
// Accessible search overlay with category filters, recent queries, trending destinations, and keyboard navigation

import { appState, ROUTES } from "../../state.js";
import { router } from "../../router.js";

export function renderGlobalSearchOverlay() {
  const container = document.createElement("div");
  container.className = "search-overlay-root";
  container.id = "global-search-root";

  let focusTrapHandler = null;

  const updateSearchDOM = () => {
    const { searchOverlayOpen, recentSearches, searchQuery, stayCategoryFilter } = appState.getState();

    if (focusTrapHandler) {
      document.removeEventListener("keydown", focusTrapHandler);
      focusTrapHandler = null;
    }

    if (!searchOverlayOpen) {
      container.innerHTML = "";
      return;
    }

    const categories = [
      { id: "all", label: "All Curations" },
      { id: "destinations", label: "Destinations" },
      { id: "stays", label: "Estates & Stays" },
      { id: "trips", label: "Journeys" },
      { id: "people", label: "Travel Buddies" }
    ];

    const trending = [
      "Kabini river safari lodge",
      "Coorg private coffee estate",
      "Hampi boulder ruins trek",
      "Gokarna secluded cliffside villa",
      "Chikmagalur misty peak homestay"
    ];

    container.innerHTML = `
      <div class="search-overlay-backdrop" id="search-backdrop-layer">
        <div 
          class="search-overlay-modal" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="global-search-label"
          tabindex="-1"
        >
          <!-- Top Search Input Header -->
          <div class="search-overlay-header">
            <div class="search-input-field-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2.2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              
              <input 
                type="text" 
                class="search-overlay-input" 
                id="global-search-input" 
                placeholder="Search Karnataka destinations, stays, or buddies..."
                value="${searchQuery || ""}"
                autocomplete="off"
                aria-label="Search AuricVista"
              />

              ${searchQuery ? `
                <button class="search-clear-input-btn" id="search-clear-input-btn" aria-label="Clear input">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              ` : ""}
            </div>

            <button class="search-cancel-btn" id="search-cancel-btn" aria-label="Close search">
              <span class="desktop-esc-hint">ESC</span>
              <span class="mobile-close-label">Close</span>
            </button>
          </div>

          <!-- Category Filter Chips -->
          <div class="search-categories-bar" role="tablist" aria-label="Search Categories">
            ${categories.map(cat => `
              <button 
                class="search-category-chip ${stayCategoryFilter === cat.id ? "active" : ""}" 
                data-category="${cat.id}"
                role="tab"
                aria-selected="${stayCategoryFilter === cat.id}"
              >
                ${cat.label}
              </button>
            `).join("")}
          </div>

          <!-- Search Content Body -->
          <div class="search-overlay-body" id="search-scrollable-body">
            <!-- Recent Searches Section -->
            ${recentSearches && recentSearches.length > 0 ? `
              <div class="search-section-block">
                <div class="search-section-header">
                  <span class="search-section-title">Recent Searches</span>
                  <button class="search-clear-history-btn" id="clear-search-history-btn">Clear All</button>
                </div>
                <div class="recent-searches-list">
                  ${recentSearches.map(term => `
                    <div class="recent-search-row" data-search-term="${term}" role="button" tabindex="0">
                      <div class="recent-row-left">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span>${term}</span>
                      </div>
                      <span class="recent-arrow-hint">↗</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- Trending Suggestions -->
            <div class="search-section-block">
              <div class="search-section-header">
                <span class="search-section-title">Trending in Karnataka</span>
              </div>
              <div class="trending-tags-grid">
                ${trending.map(item => `
                  <button class="trending-tag-pill" data-search-term="${item}">
                    <span class="trending-flame">✨</span>
                    <span>${item}</span>
                  </button>
                `).join("")}
              </div>
            </div>

            <!-- Future Backend Search Pipeline Notice (Quiet Luxury) -->
            <div class="search-footer-intel">
              <span>Verified Search Architecture • Phase 2 Foundation</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const input = container.querySelector("#global-search-input");
    const backdrop = container.querySelector("#search-backdrop-layer");
    const cancelBtn = container.querySelector("#search-cancel-btn");
    const clearInputBtn = container.querySelector("#search-clear-input-btn");
    const clearHistoryBtn = container.querySelector("#clear-search-history-btn");

    // Auto focus input
    setTimeout(() => {
      input?.focus();
    }, 60);

    const closeSearch = () => {
      appState.closeSearchOverlay();
    };

    cancelBtn?.addEventListener("click", closeSearch);
    backdrop?.addEventListener("click", (e) => {
      if (e.target === backdrop) closeSearch();
    });

    clearInputBtn?.addEventListener("click", () => {
      appState.setSearchQuery("");
      input?.focus();
    });

    clearHistoryBtn?.addEventListener("click", () => {
      appState.clearRecentSearches();
    });

    // Category chips
    container.querySelectorAll("[data-category]").forEach(chip => {
      chip.addEventListener("click", () => {
        appState.setStayCategoryFilter(chip.dataset.category);
      });
    });

    // Recent items click
    container.querySelectorAll("[data-search-term]").forEach(item => {
      item.addEventListener("click", () => {
        const term = item.dataset.searchTerm;
        appState.addRecentSearch(term);
        closeSearch();
        router.navigate(`${ROUTES.EXPLORE}?search=${encodeURIComponent(term)}`);
        appState.showToast({
          type: "info",
          message: `Showing curations for "${term}"`
        });
      });
    });

    // Input Enter handler
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && input.value.trim()) {
        const query = input.value.trim();
        appState.addRecentSearch(query);
        closeSearch();
        router.navigate(`${ROUTES.EXPLORE}?search=${encodeURIComponent(query)}`);
        appState.showToast({
          type: "info",
          message: `Searching for "${query}"...`
        });
      }
    });

    // Focus trap inside search overlay
    const modal = container.querySelector(".search-overlay-modal");
    const focusable = modal?.querySelectorAll('button, input, [tabindex="0"]');
    if (focusable && focusable.length > 0) {
      focusTrapHandler = (e) => {
        if (e.key === "Tab") {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener("keydown", focusTrapHandler);
    }
  };

  appState.subscribe(() => {
    updateSearchDOM();
  });

  updateSearchDOM();
  return container;
}
