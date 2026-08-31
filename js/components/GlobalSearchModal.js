// AURICVISTA Multi-Entity Global Search Engine Component
import { appState } from "../state.js";
import { DESTINATIONS } from "../data/destinations.js";
import { STAYS } from "../data/stays.js";
import { EXPERIENCES } from "../data/experiences.js";
import { RESTAURANTS } from "../data/restaurants.js";
import { PACKAGES } from "../data/packages.js";
import { FLIGHT_ROUTES } from "../data/flights.js";
import { TRANSPORT_SERVICES } from "../data/transport.js";

export function renderGlobalSearchModal() {
  const backdrop = document.createElement("div");
  backdrop.className = "auric-modal-backdrop";
  backdrop.id = "global-search-backdrop";

  let searchQuery = "";
  let activeFilterCategory = "all";

  const renderContent = () => {
    const { activeModal, searchHistory } = appState.getState();
    if (activeModal !== "search") {
      backdrop.classList.remove("active");
      backdrop.innerHTML = "";
      return;
    }

    const q = searchQuery.toLowerCase().trim();

    // Multi-entity search matching
    const matchedDestinations = q ? DESTINATIONS.filter(d => 
      d.name.toLowerCase().includes(q) || 
      (d.state || '').toLowerCase().includes(q) || 
      (d.tagline || '').toLowerCase().includes(q) ||
      (d.vibe || []).some(v => v.toLowerCase().includes(q)) ||
      (d.interests || []).some(i => i.toLowerCase().includes(q))
    ) : [];

    const matchedStays = q ? STAYS.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.destinationName.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.amenities.some(a => a.toLowerCase().includes(q))
    ) : [];

    const matchedExperiences = q ? EXPERIENCES.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.destinationName.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
    ) : [];

    const matchedRestaurants = q ? RESTAURANTS.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.destinationName.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.specialties.some(s => s.toLowerCase().includes(q))
    ) : [];

    const matchedPackages = q ? PACKAGES.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.overview.toLowerCase().includes(q) ||
      p.destinations.some(d => d.toLowerCase().includes(q))
    ) : [];

    const matchedFlights = q ? FLIGHT_ROUTES.filter(f =>
      f.fromCity.toLowerCase().includes(q) ||
      f.toCity.toLowerCase().includes(q) ||
      f.airline.toLowerCase().includes(q) ||
      f.from.toLowerCase().includes(q) ||
      f.to.toLowerCase().includes(q)
    ) : [];

    const totalResults = matchedDestinations.length + matchedStays.length + matchedExperiences.length + matchedRestaurants.length + matchedPackages.length + matchedFlights.length;

    backdrop.innerHTML = `
      <div class="modal-window-container" style="max-width: 860px;" id="search-modal-window">
        <!-- Search Input Bar -->
        <div style="padding: 24px 32px; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 16px;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input 
            type="text" 
            id="global-search-input" 
            value="${searchQuery}" 
            placeholder="Search Karnataka escapes, coffee bungalows, tiger safaris, restaurants, flights..." 
            style="flex: 1; background: transparent; border: none; outline: none; font-size: 1.15rem; color: var(--text-white); font-family: inherit;"
            autocomplete="off"
            autofocus
          />
          ${searchQuery ? `<button id="clear-search-x" style="color: var(--text-muted); font-size: 1rem; padding: 4px;">✕ Clear</button>` : ''}
          <button id="search-close-x" style="color: var(--text-white); font-size: 1.4rem; padding: 4px; margin-left: 8px;">✕</button>
        </div>

        <div style="padding: 24px 32px; max-height: 70vh; overflow-y: auto;">
          ${!q ? `
            <!-- Recent Searches / History -->
            ${searchHistory.length > 0 ? `
              <div style="margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Recent Searches</span>
                  <button id="clear-history-btn" style="font-size: 0.75rem; color: var(--gold-light); cursor: pointer;">Clear History</button>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                  ${searchHistory.map(term => `
                    <button class="search-history-chip" data-query="${term}" style="display: flex; align-items: center; gap: 6px; padding: 6px 14px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); border-radius: var(--radius-full); color: var(--text-secondary); font-size: 0.82rem; cursor: pointer;">
                      <span>🕒</span>
                      <span>${term}</span>
                    </button>
                  `).join("")}
                </div>
              </div>
            ` : ''}

            <!-- Popular Karnataka Searches -->
            <div style="margin-bottom: 28px;">
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 10px;">Popular in Karnataka</span>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${[
                  "Coorg Coffee Estates", "Hampi Boulder Ruins", "Kabini Black Panther", 
                  "Gokarna Om Beach", "Dandeli Whitewater Rafting", "Udupi Temple Feast", 
                  "Sakleshpur Star Fort", "Mysuru Royal Palace", "Agumbe Rainforest", "Bandipur Tiger Safari"
                ].map(tag => `
                  <button class="search-popular-pill" data-query="${tag}" style="padding: 7px 16px; background: rgba(212,175,55,0.1); border: 1px solid var(--border-gold); border-radius: var(--radius-full); color: var(--gold-light); font-size: 0.82rem; font-weight: 600; cursor: pointer;">
                    ${tag}
                  </button>
                `).join("")}
              </div>
            </div>

            <!-- Explore Categories Grid -->
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 12px;">Browse by Experience Category</span>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
                ${[
                  { label: "👑 Karnataka Jewels", tab: "karnataka" },
                  { label: "☕ Coffee Estates", tab: "estate" },
                  { label: "🐅 Wildlife Safaris", tab: "wildlife" },
                  { label: "🏖️ Coastal & Beaches", tab: "coastal" },
                  { label: "🏛️ Royal Heritage", tab: "heritage" },
                  { label: "✈️ Flight Connections", tab: "flights" }
                ].map(cat => `
                  <button class="search-category-tile" data-cat="${cat.tab}" style="padding: 14px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.9rem; font-weight: 600; text-align: left; cursor: pointer; transition: all 0.2s;">
                    ${cat.label}
                  </button>
                `).join("")}
              </div>
            </div>
          ` : `
            <!-- Results Header & Counter -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <span style="font-size: 0.85rem; color: var(--text-secondary);">
                Found <strong style="color: var(--gold-light);">${totalResults} results</strong> for "${searchQuery}"
              </span>
            </div>

            ${totalResults === 0 ? `
              <div style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
                <h4 style="font-size: 1.15rem; color: var(--text-white); margin-bottom: 6px;">No exact matches found</h4>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">Try searching for "Coorg", "Hampi", "Kabini", "Safari", or "Rafting".</p>
              </div>
            ` : `
              <!-- Group 1: Destinations -->
              ${matchedDestinations.length > 0 ? `
                <div style="margin-bottom: 28px;">
                  <h4 style="font-family: var(--font-serif); font-size: 1.05rem; color: var(--gold-light); margin-bottom: 12px;">
                    🗺️ Destinations (${matchedDestinations.length})
                  </h4>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${matchedDestinations.map(d => `
                      <div class="search-result-item" data-type="dest" data-id="${d.id}" style="display: flex; align-items: center; gap: 16px; padding: 12px 16px; background: var(--bg-surface); border-radius: var(--radius-md); cursor: pointer; border: 1px solid var(--border-subtle); transition: all 0.2s;">
                        <img src="${d.image}" alt="${d.name}" style="width: 56px; height: 48px; border-radius: var(--radius-sm); object-fit: cover;" />
                        <div style="flex: 1;">
                          <div style="font-size: 1rem; font-weight: 700; color: var(--text-white);">${d.name}</div>
                          <span style="font-size: 0.8rem; color: var(--text-secondary);">📍 ${d.state || d.country} • ⏱️ ${d.recommendedDuration || '2-3 Days'} • ⭐ ${d.rating || 4.9}</span>
                        </div>
                        <span style="color: var(--gold-primary); font-size: 0.9rem; font-weight: 700;">${d.startingPrice || '₹4,999'}</span>
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ''}

              <!-- Group 2: Hotels & Stays -->
              ${matchedStays.length > 0 ? `
                <div style="margin-bottom: 28px;">
                  <h4 style="font-family: var(--font-serif); font-size: 1.05rem; color: var(--gold-light); margin-bottom: 12px;">
                    🏨 Hotels, Bungalows & Safari Lodges (${matchedStays.length})
                  </h4>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${matchedStays.map(s => `
                      <div class="search-result-item" data-type="stay" data-id="${s.id}" style="display: flex; align-items: center; gap: 16px; padding: 12px 16px; background: var(--bg-surface); border-radius: var(--radius-md); cursor: pointer; border: 1px solid var(--border-subtle); transition: all 0.2s;">
                        <img src="${s.image}" alt="${s.name}" style="width: 56px; height: 48px; border-radius: var(--radius-sm); object-fit: cover;" />
                        <div style="flex: 1;">
                          <div style="font-size: 1rem; font-weight: 700; color: var(--text-white);">${s.name}</div>
                          <span style="font-size: 0.8rem; color: var(--text-secondary);">📍 ${s.destinationName} • ${s.category} • ⭐ ${s.rating}</span>
                        </div>
                        <div style="text-align: right;">
                          <span style="font-size: 0.7rem; color: var(--text-muted);">Per Night</span>
                          <div style="color: var(--gold-primary); font-size: 0.95rem; font-weight: 800;">${s.priceDisplay}</div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ''}

              <!-- Group 3: Bespoke Experiences -->
              ${matchedExperiences.length > 0 ? `
                <div style="margin-bottom: 28px;">
                  <h4 style="font-family: var(--font-serif); font-size: 1.05rem; color: var(--gold-light); margin-bottom: 12px;">
                    🎟️ Experiences & Activities (${matchedExperiences.length})
                  </h4>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${matchedExperiences.map(e => `
                      <div class="search-result-item" data-type="exp" data-id="${e.id}" style="display: flex; align-items: center; gap: 16px; padding: 12px 16px; background: var(--bg-surface); border-radius: var(--radius-md); cursor: pointer; border: 1px solid var(--border-subtle); transition: all 0.2s;">
                        <img src="${e.image}" alt="${e.title}" style="width: 56px; height: 48px; border-radius: var(--radius-sm); object-fit: cover;" />
                        <div style="flex: 1;">
                          <div style="font-size: 1rem; font-weight: 700; color: var(--text-white);">${e.title}</div>
                          <span style="font-size: 0.8rem; color: var(--text-secondary);">📍 ${e.destinationName} • ⏱️ ${e.duration} • ⭐ ${e.rating}</span>
                        </div>
                        <div style="text-align: right;">
                          <span style="font-size: 0.7rem; color: var(--text-muted);">Per Person</span>
                          <div style="color: var(--gold-primary); font-size: 0.95rem; font-weight: 800;">${e.priceDisplay}</div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ''}

              <!-- Group 4: Restaurants & Food -->
              ${matchedRestaurants.length > 0 ? `
                <div style="margin-bottom: 28px;">
                  <h4 style="font-family: var(--font-serif); font-size: 1.05rem; color: var(--gold-light); margin-bottom: 12px;">
                    🍴 Regional Restaurants & Dining (${matchedRestaurants.length})
                  </h4>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${matchedRestaurants.map(r => `
                      <div class="search-result-item" data-type="rest" data-id="${r.id}" style="display: flex; align-items: center; gap: 16px; padding: 12px 16px; background: var(--bg-surface); border-radius: var(--radius-md); cursor: pointer; border: 1px solid var(--border-subtle); transition: all 0.2s;">
                        <img src="${r.image}" alt="${r.name}" style="width: 56px; height: 48px; border-radius: var(--radius-sm); object-fit: cover;" />
                        <div style="flex: 1;">
                          <div style="font-size: 1rem; font-weight: 700; color: var(--text-white);">${r.name}</div>
                          <span style="font-size: 0.8rem; color: var(--text-secondary);">📍 ${r.destinationName} • ${r.cuisine} • ⭐ ${r.rating}</span>
                        </div>
                        <span style="color: var(--emerald-light); font-size: 0.85rem; font-weight: 700;">${r.priceRange}</span>
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ''}

              <!-- Group 5: Tour Packages -->
              ${matchedPackages.length > 0 ? `
                <div style="margin-bottom: 28px;">
                  <h4 style="font-family: var(--font-serif); font-size: 1.05rem; color: var(--gold-light); margin-bottom: 12px;">
                    🧭 Tour Packages & Circuits (${matchedPackages.length})
                  </h4>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${matchedPackages.map(p => `
                      <div class="search-result-item" data-type="pkg" data-id="${p.id}" style="display: flex; align-items: center; gap: 16px; padding: 12px 16px; background: var(--bg-surface); border-radius: var(--radius-md); cursor: pointer; border: 1px solid var(--border-subtle); transition: all 0.2s;">
                        <img src="${p.image}" alt="${p.title}" style="width: 56px; height: 48px; border-radius: var(--radius-sm); object-fit: cover;" />
                        <div style="flex: 1;">
                          <div style="font-size: 1rem; font-weight: 700; color: var(--text-white);">${p.title}</div>
                          <span style="font-size: 0.8rem; color: var(--text-secondary);">⏱️ ${p.duration} • Starts: ${p.startingCity}</span>
                        </div>
                        <div style="text-align: right;">
                          <span style="font-size: 0.7rem; color: var(--text-muted);">All-Inclusive</span>
                          <div style="color: var(--gold-primary); font-size: 0.95rem; font-weight: 800;">${p.priceDisplay}</div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ''}

              <!-- Group 6: Flights -->
              ${matchedFlights.length > 0 ? `
                <div style="margin-bottom: 28px;">
                  <h4 style="font-family: var(--font-serif); font-size: 1.05rem; color: var(--gold-light); margin-bottom: 12px;">
                    ✈️ Flights (${matchedFlights.length})
                  </h4>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${matchedFlights.map(f => `
                      <div class="search-result-item" data-type="flight" data-id="${f.id}" style="display: flex; align-items: center; gap: 16px; padding: 12px 16px; background: var(--bg-surface); border-radius: var(--radius-md); cursor: pointer; border: 1px solid var(--border-subtle); transition: all 0.2s;">
                        <div style="font-size: 1.5rem; background: rgba(255,255,255,0.06); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                          ${f.logo}
                        </div>
                        <div style="flex: 1;">
                          <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-white);">${f.airline} (${f.flightNumber})</div>
                          <span style="font-size: 0.8rem; color: var(--text-secondary);">${f.fromCity} (${f.from}) ➔ ${f.toCity} (${f.to}) • ⏱️ ${f.duration}</span>
                        </div>
                        <span style="color: var(--gold-primary); font-size: 0.95rem; font-weight: 800;">₹${f.priceEconomy.toLocaleString('en-IN')}</span>
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ''}
            `}
          `}
        </div>
      </div>
    `;

    backdrop.classList.add("active");

    const input = backdrop.querySelector("#global-search-input");
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      input.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderContent();
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && searchQuery.trim()) {
          appState.addSearchHistory(searchQuery);
        }
      });
    }

    backdrop.querySelector("#clear-search-x")?.addEventListener("click", () => {
      searchQuery = "";
      renderContent();
    });

    backdrop.querySelector("#search-close-x")?.addEventListener("click", () => {
      appState.closeModal();
    });

    backdrop.querySelector("#clear-history-btn")?.addEventListener("click", () => {
      appState.clearSearchHistory();
      renderContent();
    });

    backdrop.querySelectorAll(".search-history-chip, .search-popular-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        searchQuery = btn.dataset.query;
        appState.addSearchHistory(searchQuery);
        renderContent();
      });
    });

    backdrop.querySelectorAll(".search-category-tile").forEach(btn => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.cat;
        appState.closeModal();
        if (cat === "flights") {
          appState.setActiveTab("flights");
        } else if (cat === "estate") {
          appState.setActiveTab("stays");
        } else {
          appState.setState({ filterRegion: cat, activeTab: "destinations" });
        }
      });
    });

    // Handle clicking matched search results
    backdrop.querySelectorAll(".search-result-item").forEach(item => {
      item.addEventListener("click", () => {
        const type = item.dataset.type;
        const id = item.dataset.id;

        if (searchQuery.trim()) {
          appState.addSearchHistory(searchQuery);
        }

        appState.closeModal();

        if (type === "dest") {
          const d = DESTINATIONS.find(x => x.id === id);
          if (d) appState.openDestinationModal(d);
        } else if (type === "stay") {
          const s = STAYS.find(x => x.id === id);
          if (s) {
            appState.setState({
              selectedStayForBooking: s,
              selectedExperienceForBooking: null,
              selectedPackageForBooking: null,
              selectedFlightForBooking: null,
              activeModal: "booking"
            });
          }
        } else if (type === "exp") {
          const e = EXPERIENCES.find(x => x.id === id);
          if (e) {
            appState.setState({
              selectedExperienceForBooking: e,
              selectedStayForBooking: null,
              selectedPackageForBooking: null,
              selectedFlightForBooking: null,
              activeModal: "booking"
            });
          }
        } else if (type === "pkg") {
          const p = PACKAGES.find(x => x.id === id);
          if (p) {
            appState.setState({
              selectedPackageForBooking: p,
              selectedStayForBooking: null,
              selectedExperienceForBooking: null,
              selectedFlightForBooking: null,
              activeModal: "booking"
            });
          }
        } else if (type === "flight") {
          const fl = FLIGHT_ROUTES.find(x => x.id === id);
          if (fl) {
            appState.setState({
              selectedFlightForBooking: fl,
              selectedStayForBooking: null,
              selectedExperienceForBooking: null,
              selectedPackageForBooking: null,
              activeModal: "booking"
            });
          }
        } else if (type === "rest") {
          const r = RESTAURANTS.find(x => x.id === id);
          if (r) {
            const dest = DESTINATIONS.find(d => d.id === r.destinationId);
            if (dest) appState.openDestinationModal(dest);
          }
        }
      });
    });
  };

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      appState.closeModal();
    }
  });

  appState.subscribe(() => {
    renderContent();
  });

  return backdrop;
}
