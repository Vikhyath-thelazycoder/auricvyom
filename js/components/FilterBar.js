// AURICVISTA Advanced Filter & Sort Component
import { appState } from "../state.js";

export function renderFilterBar() {
  const container = document.createElement("div");
  container.className = "advanced-filter-container";
  container.id = "advanced-filter-bar";

  const renderContent = () => {
    const { 
      budgetRange, 
      durationFilter, 
      travelTypeFilter, 
      selectedInterests, 
      minRating, 
      maxDistance, 
      sortBy,
      activeModal
    } = appState.getState();

    // Count active custom filters
    let activeFilterCount = 0;
    if (budgetRange !== "all") activeFilterCount++;
    if (durationFilter !== "all") activeFilterCount++;
    if (travelTypeFilter !== "all") activeFilterCount++;
    if (selectedInterests.length > 0) activeFilterCount += selectedInterests.length;
    if (minRating > 0) activeFilterCount++;
    if (maxDistance > 0) activeFilterCount++;

    const isDrawerOpen = activeModal === "filterDrawer";

    container.innerHTML = `
      <!-- Main Sticky Quick Filter Pills Bar -->
      <div class="filter-bar-inner">
        <div class="quick-filter-scroll">
          <!-- Advanced Filter Drawer Trigger -->
          <button class="filter-pill-btn filter-drawer-trigger ${activeFilterCount > 0 ? 'active' : ''}" id="open-filter-drawer-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <line x1="4" y1="21" x2="4" y2="14"/>
              <line x1="4" y1="10" x2="4" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12" y2="3"/>
              <line x1="20" y1="21" x2="20" y2="16"/>
              <line x1="20" y1="12" x2="20" y2="3"/>
              <line x1="1" y1="14" x2="7" y2="14"/>
              <line x1="9" y1="8" x2="15" y2="8"/>
              <line x1="17" y1="16" x2="23" y2="16"/>
            </svg>
            <span>All Filters ${activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
          </button>

          <!-- Budget Range Selector -->
          <div class="filter-dropdown-wrapper">
            <select class="filter-select-pill" id="quick-budget-select">
              <option value="all" ${budgetRange === 'all' ? 'selected' : ''}>💰 Budget: Any</option>
              <option value="0-2000" ${budgetRange === '0-2000' ? 'selected' : ''}>₹0 – ₹2,000</option>
              <option value="2000-5000" ${budgetRange === '2000-5000' ? 'selected' : ''}>₹2,000 – ₹5,000</option>
              <option value="5000-10000" ${budgetRange === '5000-10000' ? 'selected' : ''}>₹5,000 – ₹10,000</option>
              <option value="10000-25000" ${budgetRange === '10000-25000' ? 'selected' : ''}>₹10,000 – ₹25,000</option>
              <option value="25000+" ${budgetRange === '25000+' ? 'selected' : ''}>₹25,000+ (Ultra-Luxe)</option>
            </select>
          </div>

          <!-- Duration Selector -->
          <div class="filter-dropdown-wrapper">
            <select class="filter-select-pill" id="quick-duration-select">
              <option value="all" ${durationFilter === 'all' ? 'selected' : ''}>⏱️ Duration: Any</option>
              <option value="1day" ${durationFilter === '1day' ? 'selected' : ''}>1 Day (Day Trip)</option>
              <option value="2-3days" ${durationFilter === '2-3days' ? 'selected' : ''}>2–3 Days (Weekend)</option>
              <option value="4-7days" ${durationFilter === '4-7days' ? 'selected' : ''}>4–7 Days (Week)</option>
              <option value="7+days" ${durationFilter === '7+days' ? 'selected' : ''}>7+ Days (Odyssey)</option>
            </select>
          </div>

          <!-- Travel Type Selector -->
          <div class="filter-dropdown-wrapper">
            <select class="filter-select-pill" id="quick-travel-type-select">
              <option value="all" ${travelTypeFilter === 'all' ? 'selected' : ''}>👥 Travel Type: All</option>
              <option value="Solo" ${travelTypeFilter === 'Solo' ? 'selected' : ''}>Solo Traveler</option>
              <option value="Couple" ${travelTypeFilter === 'Couple' ? 'selected' : ''}>Couple / Romantic</option>
              <option value="Family" ${travelTypeFilter === 'Family' ? 'selected' : ''}>Family Vacation</option>
              <option value="Friends" ${travelTypeFilter === 'Friends' ? 'selected' : ''}>Friends Trip</option>
              <option value="Group" ${travelTypeFilter === 'Group' ? 'selected' : ''}>Group Expedition</option>
            </select>
          </div>

          <!-- Rating Quick Filter -->
          <button class="filter-pill-btn ${minRating === 4.5 ? 'active' : ''}" id="quick-rating-45-btn">
            ★ 4.5+ Top Rated
          </button>

          <!-- Distance from Bengaluru -->
          <div class="filter-dropdown-wrapper">
            <select class="filter-select-pill" id="quick-distance-select">
              <option value="0" ${maxDistance === 0 ? 'selected' : ''}>🚗 Distance from BLR: Any</option>
              <option value="150" ${maxDistance === 150 ? 'selected' : ''}>Within 150 km</option>
              <option value="300" ${maxDistance === 300 ? 'selected' : ''}>Within 300 km</option>
              <option value="500" ${maxDistance === 500 ? 'selected' : ''}>Within 500 km</option>
            </select>
          </div>

          ${activeFilterCount > 0 ? `
            <button class="filter-pill-btn reset-pill" id="reset-all-filters-btn" style="color: #f43f5e; border-color: rgba(244,63,94,0.3);">
              ✕ Reset (${activeFilterCount})
            </button>
          ` : ''}
        </div>

        <!-- Sort By Dropdown -->
        <div class="sort-by-wrap">
          <span style="font-size: 0.8rem; color: var(--text-muted); white-space: nowrap;">Sort by:</span>
          <select class="filter-select-pill sort-select" id="sort-by-select">
            <option value="recommended" ${sortBy === 'recommended' ? 'selected' : ''}>✨ Recommended</option>
            <option value="popular" ${sortBy === 'popular' ? 'selected' : ''}>🔥 Popular</option>
            <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>⭐ Highest Rated</option>
            <option value="price_asc" ${sortBy === 'price_asc' ? 'selected' : ''}>₹ Lowest Price</option>
            <option value="price_desc" ${sortBy === 'price_desc' ? 'selected' : ''}>₹ Highest Price</option>
            <option value="distance" ${sortBy === 'distance' ? 'selected' : ''}>📍 Nearest from BLR</option>
          </select>
        </div>
      </div>

      <!-- Slide-in Advanced Filter Drawer Modal -->
      <div class="filter-drawer-backdrop ${isDrawerOpen ? 'active' : ''}" id="filter-drawer-backdrop">
        <div class="filter-drawer-panel">
          <div class="filter-drawer-header">
            <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-white);">Advanced Filters</h3>
            <button id="close-filter-drawer-btn" style="color: var(--text-white); font-size: 1.3rem;">✕</button>
          </div>

          <div class="filter-drawer-body">
            <!-- Budget Section -->
            <div class="drawer-section">
              <h4 class="drawer-section-title">Budget per Night (₹)</h4>
              <div class="drawer-pills-grid">
                ${[
                  { id: "all", label: "Any Budget" },
                  { id: "0-2000", label: "₹0 – ₹2,000" },
                  { id: "2000-5000", label: "₹2,000 – ₹5,000" },
                  { id: "5000-10000", label: "₹5,000 – ₹10,000" },
                  { id: "10000-25000", label: "₹10,000 – ₹25,000" },
                  { id: "25000+", label: "₹25,000+ (Luxe)" }
                ].map(b => `
                  <button class="drawer-choice-pill ${budgetRange === b.id ? 'active' : ''}" data-budget="${b.id}">
                    ${b.label}
                  </button>
                `).join("")}
              </div>
            </div>

            <!-- Duration Section -->
            <div class="drawer-section">
              <h4 class="drawer-section-title">Recommended Duration</h4>
              <div class="drawer-pills-grid">
                ${[
                  { id: "all", label: "Any Duration" },
                  { id: "1day", label: "1 Day (Day Excursion)" },
                  { id: "2-3days", label: "2–3 Days (Weekend)" },
                  { id: "4-7days", label: "4–7 Days (Full Circuit)" },
                  { id: "7+days", label: "7+ Days (Odyssey)" }
                ].map(d => `
                  <button class="drawer-choice-pill ${durationFilter === d.id ? 'active' : ''}" data-duration="${d.id}">
                    ${d.label}
                  </button>
                `).join("")}
              </div>
            </div>

            <!-- Interests & Vibe Section -->
            <div class="drawer-section">
              <h4 class="drawer-section-title">Interests & Travel Themes</h4>
              <div class="drawer-chips-wrap">
                ${["Nature", "Adventure", "Beach", "Wildlife", "Heritage", "Food", "Culture", "Nightlife", "Spiritual", "Luxury"].map(interest => `
                  <button class="drawer-interest-chip ${selectedInterests.includes(interest) ? 'active' : ''}" data-interest="${interest}">
                    ${selectedInterests.includes(interest) ? '✓ ' : ''}${interest}
                  </button>
                `).join("")}
              </div>
            </div>

            <!-- Travel Type -->
            <div class="drawer-section">
              <h4 class="drawer-section-title">Travel Companion Style</h4>
              <div class="drawer-pills-grid">
                ${["Solo", "Couple", "Family", "Friends", "Group"].map(tt => `
                  <button class="drawer-choice-pill ${travelTypeFilter === tt ? 'active' : ''}" data-traveltype="${tt}">
                    ${tt}
                  </button>
                `).join("")}
              </div>
            </div>
          </div>

          <div class="filter-drawer-footer">
            <button class="btn-outline-glass" id="drawer-clear-btn" style="padding: 10px 20px;">
              Clear All
            </button>
            <button class="btn-primary-gold" id="drawer-apply-btn" style="padding: 10px 28px;">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    `;

    // Listeners
    container.querySelector("#quick-budget-select")?.addEventListener("change", (e) => {
      appState.setState({ budgetRange: e.target.value });
    });

    container.querySelector("#quick-duration-select")?.addEventListener("change", (e) => {
      appState.setState({ durationFilter: e.target.value });
    });

    container.querySelector("#quick-travel-type-select")?.addEventListener("change", (e) => {
      appState.setState({ travelTypeFilter: e.target.value });
    });

    container.querySelector("#quick-rating-45-btn")?.addEventListener("click", () => {
      appState.setState({ minRating: minRating === 4.5 ? 0 : 4.5 });
    });

    container.querySelector("#quick-distance-select")?.addEventListener("change", (e) => {
      appState.setState({ maxDistance: parseInt(e.target.value) || 0 });
    });

    container.querySelector("#sort-by-select")?.addEventListener("change", (e) => {
      appState.setState({ sortBy: e.target.value });
    });

    container.querySelector("#reset-all-filters-btn")?.addEventListener("click", () => {
      appState.resetFilters();
    });

    // Drawer triggers
    container.querySelector("#open-filter-drawer-btn")?.addEventListener("click", () => {
      appState.setState({ activeModal: "filterDrawer" });
    });

    container.querySelector("#close-filter-drawer-btn")?.addEventListener("click", () => {
      appState.closeModal();
    });

    container.querySelector("#filter-drawer-backdrop")?.addEventListener("click", (e) => {
      if (e.target.id === "filter-drawer-backdrop") {
        appState.closeModal();
      }
    });

    container.querySelectorAll("[data-budget]").forEach(btn => {
      btn.addEventListener("click", () => {
        appState.setState({ budgetRange: btn.dataset.budget });
      });
    });

    container.querySelectorAll("[data-duration]").forEach(btn => {
      btn.addEventListener("click", () => {
        appState.setState({ durationFilter: btn.dataset.duration });
      });
    });

    container.querySelectorAll("[data-traveltype]").forEach(btn => {
      btn.addEventListener("click", () => {
        const val = btn.dataset.traveltype === travelTypeFilter ? "all" : btn.dataset.traveltype;
        appState.setState({ travelTypeFilter: val });
      });
    });

    container.querySelectorAll("[data-interest]").forEach(btn => {
      btn.addEventListener("click", () => {
        appState.toggleInterest(btn.dataset.interest);
      });
    });

    container.querySelector("#drawer-clear-btn")?.addEventListener("click", () => {
      appState.resetFilters();
      appState.closeModal();
    });

    container.querySelector("#drawer-apply-btn")?.addEventListener("click", () => {
      appState.closeModal();
    });
  };

  appState.subscribe(() => {
    renderContent();
  });

  renderContent();
  return container;
}
