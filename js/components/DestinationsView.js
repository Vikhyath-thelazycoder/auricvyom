// AURICVISTA Destinations Discovery View Component (Advanced Filtering Edition)
import { DESTINATIONS } from "../data/destinations.js";
import { appState } from "../state.js";
import { renderDestinationCard } from "./DestinationCard.js";
import { renderFilterBar } from "./FilterBar.js";

export function renderDestinationsView() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "destinations-section";

  const renderContent = () => {
    const { 
      filterRegion, 
      searchQuery, 
      budgetRange, 
      durationFilter, 
      travelTypeFilter, 
      selectedInterests, 
      minRating, 
      maxDistance, 
      sortBy 
    } = appState.getState();

    // Multi-dimensional filtering logic
    let filtered = DESTINATIONS.filter(dest => {
      // 1. Search query matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesCountry = dest.country.toLowerCase().includes(q);
        const matchesState = (dest.state || "").toLowerCase().includes(q);
        const matchesTagline = (dest.tagline || "").toLowerCase().includes(q);
        const matchesDesc = (dest.description || "").toLowerCase().includes(q);
        const matchesVibe = (dest.vibe || []).some(v => v.toLowerCase().includes(q));
        if (!matchesName && !matchesCountry && !matchesState && !matchesTagline && !matchesDesc && !matchesVibe) {
          return false;
        }
      }

      // 2. Region / Category filter
      if (filterRegion === "karnataka") {
        if (!dest.state || dest.state.toLowerCase() !== "karnataka") return false;
      } else if (filterRegion === "india") {
        if (dest.country.toLowerCase() !== "india") return false;
      } else if (filterRegion === "global") {
        if (dest.country.toLowerCase() === "india") return false;
      } else if (filterRegion === "wildlife") {
        if (dest.category !== "Wildlife" && !(dest.vibe && dest.vibe.some(v => v.toLowerCase().includes("wildlife") || v.toLowerCase().includes("safari")))) return false;
      } else if (filterRegion === "mountains") {
        if (dest.category !== "Mountains" && dest.category !== "Nature" && !(dest.vibe && dest.vibe.some(v => v.toLowerCase().includes("hills") || v.toLowerCase().includes("peak")))) return false;
      } else if (filterRegion === "coastal") {
        if (dest.category !== "Coastal" && !(dest.vibe && dest.vibe.some(v => v.toLowerCase().includes("beach") || v.toLowerCase().includes("island")))) return false;
      } else if (filterRegion === "heritage") {
        if (dest.category !== "Culture" && dest.category !== "Heritage" && !(dest.vibe && dest.vibe.some(v => v.toLowerCase().includes("palace") || v.toLowerCase().includes("temple") || v.toLowerCase().includes("unesco")))) return false;
      }

      // 3. Budget Range Filter
      if (budgetRange !== "all") {
        const b = dest.budgetTierNumeric || { min: 4000, max: 20000 };
        if (budgetRange === "0-2000" && b.min > 2000) return false;
        if (budgetRange === "2000-5000" && (b.max < 2000 || b.min > 5000)) return false;
        if (budgetRange === "5000-10000" && (b.max < 5000 || b.min > 10000)) return false;
        if (budgetRange === "10000-25000" && (b.max < 10000 || b.min > 25000)) return false;
        if (budgetRange === "25000+" && b.max < 25000) return false;
      }

      // 4. Duration Filter
      if (durationFilter !== "all") {
        const dur = (dest.recommendedDuration || "").toLowerCase();
        if (durationFilter === "1day" && !dur.includes("1")) return false;
        if (durationFilter === "2-3days" && !dur.includes("2") && !dur.includes("3")) return false;
        if (durationFilter === "4-7days" && !dur.includes("4") && !dur.includes("5") && !dur.includes("6") && !dur.includes("7")) return false;
        if (durationFilter === "7+days" && !dur.includes("7") && !dur.includes("8") && !dur.includes("9")) return false;
      }

      // 5. Travel Type Filter
      if (travelTypeFilter !== "all") {
        if (dest.travelTypes && !dest.travelTypes.includes(travelTypeFilter)) return false;
      }

      // 6. Interests Filter
      if (selectedInterests.length > 0) {
        const destInterests = [...(dest.interests || []), ...(dest.vibe || []), dest.category];
        const hasMatchingInterest = selectedInterests.some(req => 
          destInterests.some(di => di.toLowerCase().includes(req.toLowerCase()))
        );
        if (!hasMatchingInterest) return false;
      }

      // 7. Minimum Rating Filter
      if (minRating > 0 && (dest.rating || 4.9) < minRating) {
        return false;
      }

      // 8. Maximum Distance Filter (from Bengaluru)
      if (maxDistance > 0 && dest.distanceFromBlr !== undefined && dest.distanceFromBlr > maxDistance) {
        return false;
      }

      return true;
    });

    // Sort Logic
    if (sortBy === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    } else if (sortBy === "price_asc") {
      filtered.sort((a, b) => (a.budgetTierNumeric?.min || 4000) - (b.budgetTierNumeric?.min || 4000));
    } else if (sortBy === "price_desc") {
      filtered.sort((a, b) => (b.budgetTierNumeric?.max || 20000) - (a.budgetTierNumeric?.max || 20000));
    } else if (sortBy === "distance") {
      filtered.sort((a, b) => (a.distanceFromBlr || 1000) - (b.distanceFromBlr || 1000));
    }

    section.innerHTML = `
      <div class="content-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div>
            <span class="section-tag-gold">✨ DISCOVERY ENGINE • INDIA FIRST</span>
            <h2 class="section-main-title">Curated Escapes & Sanctuaries</h2>
            <p class="section-desc-muted">
              Filter by budget in ₹, road-trip distance from Bengaluru, travel companion style, and niche interests.
            </p>
          </div>

          <div style="color: var(--gold-light); font-size: 0.95rem; font-weight: 600; text-align: right;">
            <span>${filtered.length} Discovered</span>
          </div>
        </div>

        <!-- Filter Tabs Pills (Region Base) -->
        <div class="filter-tabs-pills">
          <button class="filter-pill-btn ${filterRegion === 'all' ? 'active' : ''}" data-region="all">
            🌟 All Destinations (${DESTINATIONS.length})
          </button>
          <button class="filter-pill-btn ${filterRegion === 'karnataka' ? 'active' : ''}" data-region="karnataka">
            👑 Karnataka Jewels (14)
          </button>
          <button class="filter-pill-btn ${filterRegion === 'wildlife' ? 'active' : ''}" data-region="wildlife">
            🐅 Wildlife & Safari
          </button>
          <button class="filter-pill-btn ${filterRegion === 'mountains' ? 'active' : ''}" data-region="mountains">
            ⛰️ Western Ghats & Highlands
          </button>
          <button class="filter-pill-btn ${filterRegion === 'coastal' ? 'active' : ''}" data-region="coastal">
            🏖️ Coastal & Konkan Beaches
          </button>
          <button class="filter-pill-btn ${filterRegion === 'heritage' ? 'active' : ''}" data-region="heritage">
            🏛️ Royal Palaces & UNESCO
          </button>
          <button class="filter-pill-btn ${filterRegion === 'india' ? 'active' : ''}" data-region="india">
            🇮🇳 Pan-India
          </button>
          <button class="filter-pill-btn ${filterRegion === 'global' ? 'active' : ''}" data-region="global">
            🌍 Global Marquee
          </button>
        </div>

        <!-- Advanced Filter & Sort Bar Mount -->
        <div id="filter-bar-mount"></div>

        <!-- Cards Grid Container -->
        <div class="destinations-grid" id="dest-cards-grid" style="margin-top: 24px;"></div>
      </div>
    `;

    // Mount Filter Bar
    const filterMount = section.querySelector("#filter-bar-mount");
    if (filterMount) {
      filterMount.appendChild(renderFilterBar());
    }

    // Render cards into grid
    const grid = section.querySelector("#dest-cards-grid");
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1.5px dashed var(--border-subtle);">
          <div style="font-size: 3rem; margin-bottom: 12px;">🗺️</div>
          <h3 style="font-size: 1.3rem; color: var(--text-white); margin-bottom: 8px;">No destinations matched your filters</h3>
          <p style="color: var(--text-secondary); margin-bottom: 20px;">Try adjusting your budget range, duration, or distance criteria.</p>
          <button class="btn-primary-gold" id="clear-all-filter-state-btn" style="padding: 10px 24px; font-size: 0.9rem;">
            Reset All Filters
          </button>
        </div>
      `;
      section.querySelector("#clear-all-filter-state-btn")?.addEventListener("click", () => {
        appState.resetFilters();
      });
    } else {
      filtered.forEach(dest => {
        grid.appendChild(renderDestinationCard(dest));
      });
    }

    // Attach region pill listeners
    section.querySelectorAll(".filter-pill-btn[data-region]").forEach(btn => {
      btn.addEventListener("click", () => {
        const region = btn.dataset.region;
        appState.setState({ filterRegion: region });
      });
    });
  };

  appState.subscribe(() => {
    renderContent();
  });

  renderContent();
  return section;
}
