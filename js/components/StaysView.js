// AURICVISTA Stays Marketplace Component (Expanded Complete Edition)
import { STAYS } from "../data/stays.js";
import { appState } from "../state.js";

export function renderStaysView() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "stays-section";

  let selectedCategory = "all";
  let searchDest = "";
  let selectedAmenities = [];

  const renderContent = () => {
    // Filter stays
    const filteredStays = STAYS.filter(stay => {
      if (selectedCategory !== "all" && stay.propertyType !== selectedCategory) return false;
      if (searchDest.trim()) {
        const q = searchDest.toLowerCase();
        if (!stay.name.toLowerCase().includes(q) && !stay.destinationName.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (selectedAmenities.length > 0) {
        const matchesAll = selectedAmenities.every(a => stay.amenities.some(sa => sa.toLowerCase().includes(a.toLowerCase())));
        if (!matchesAll) return false;
      }
      return true;
    });

    section.innerHTML = `
      <div class="content-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div>
            <span class="section-tag-gold">🏨 SANCTUARIES & HERITAGE ESTATES</span>
            <h2 class="section-main-title">Luxury Stays & Villas</h2>
            <p class="section-desc-muted">
              Discover private plantation cottages, royal palace suites, and rainforest treehouses curated for unparalleled privacy and comfort.
            </p>
          </div>

          <div style="color: var(--gold-light); font-size: 0.95rem; font-weight: 600;">
            <span>${filteredStays.length} Stays Available</span>
          </div>
        </div>

        <!-- Stays Top Search Bar -->
        <div style="background: var(--bg-surface); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); padding: 18px 24px; margin-bottom: 28px; box-shadow: var(--shadow-md);">
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 16px; align-items: center; flex-wrap: wrap;">
            <!-- Destination Input -->
            <div>
              <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 4px;">Destination / Stay Name</label>
              <input 
                type="text" 
                id="stays-search-dest-input" 
                value="${searchDest}" 
                placeholder="Coorg, Kabini, Hampi, Gokarna..." 
                style="width: 100%; background: rgba(255,255,255,0.06); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px; color: var(--text-white); font-size: 0.9rem; outline: none;"
              />
            </div>

            <!-- Check-in -->
            <div>
              <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 4px;">Check-in</label>
              <input 
                type="date" 
                value="${new Date().toISOString().split('T')[0]}" 
                style="width: 100%; background: rgba(255,255,255,0.06); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px; color: var(--text-white); font-size: 0.85rem; outline: none;"
              />
            </div>

            <!-- Check-out -->
            <div>
              <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 4px;">Check-out</label>
              <input 
                type="date" 
                value="${new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]}" 
                style="width: 100%; background: rgba(255,255,255,0.06); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px; color: var(--text-white); font-size: 0.85rem; outline: none;"
              />
            </div>

            <!-- Guests & Rooms -->
            <div>
              <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 4px;">Guests & Rooms</label>
              <select style="width: 100%; background: rgba(255,255,255,0.06); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px; color: var(--text-white); font-size: 0.85rem; outline: none; cursor: pointer;">
                <option value="2-1">2 Guests, 1 Room</option>
                <option value="1-1">1 Guest, 1 Room</option>
                <option value="4-2">4 Guests, 2 Rooms</option>
                <option value="6-3">6 Guests, Villa</option>
              </select>
            </div>

            <!-- Search Button -->
            <div style="align-self: flex-end;">
              <button class="btn-primary-gold" id="stays-search-filter-btn" style="padding: 10px 24px; font-size: 0.9rem;">
                🔍 Search Stays
              </button>
            </div>
          </div>
        </div>

        <!-- 8 Property Type Categories -->
        <div class="filter-tabs-pills" style="margin-bottom: 18px;">
          ${[
            { id: "all", label: "🌟 All Stays" },
            { id: "Hotels", label: "🏨 Hotels" },
            { id: "Resort", label: "🌴 Resorts" },
            { id: "Homestays", label: "🏡 Homestays" },
            { id: "Villas", label: "🏰 Villas" },
            { id: "Hostels", label: "🎒 Hostels" },
            { id: "Luxury", label: "⚜️ Luxury Stays" },
            { id: "Unique", label: "✨ Unique Stays" }
          ].map(c => `
            <button class="filter-pill-btn ${selectedCategory === c.id ? 'active' : ''}" data-stay-cat="${c.id}">
              ${c.label}
            </button>
          `).join("")}
        </div>

        <!-- Quick Amenity Filters -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; align-items: center;">
          <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Amenities:</span>
          ${["Breakfast Included", "Pool", "Parking", "Wi-Fi", "Air Conditioning", "Pet Friendly", "Forest Spa"].map(am => `
            <button class="amenity-chip-btn ${selectedAmenities.includes(am) ? 'active' : ''}" data-am="${am}" style="padding: 6px 14px; background: ${selectedAmenities.includes(am) ? 'var(--gold-primary)' : 'rgba(255,255,255,0.05)'}; color: ${selectedAmenities.includes(am) ? '#07090e' : 'var(--text-secondary)'}; border: 1px solid ${selectedAmenities.includes(am) ? 'var(--gold-primary)' : 'var(--border-subtle)'}; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 600; cursor: pointer;">
              ${selectedAmenities.includes(am) ? '✓ ' : ''}${am}
            </button>
          `).join("")}
        </div>

        <!-- Stays Grid -->
        <div class="destinations-grid" id="stays-cards-grid">
          ${filteredStays.map(stay => `
            <div class="destination-card" id="stay-card-${stay.id}">
              <div class="card-media-wrap">
                <img src="${stay.image}" alt="${stay.name}" class="card-cover-img" loading="lazy" />
                <div class="card-overlay-gradient"></div>
                <div class="card-top-badges">
                  <span class="badge-state-pill">${stay.propertyType || stay.category}</span>
                  <button class="card-wishlist-btn ${appState.isWishlisted(stay.id) ? 'active' : ''}" data-stay-id="${stay.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="${appState.isWishlisted(stay.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                </div>
                <div class="card-rating-badge" style="position: absolute; bottom: 12px; right: 16px; z-index: 3;">
                  <span>★</span>
                  <span>${stay.rating}</span>
                </div>
              </div>

              <div class="card-content-body">
                <div>
                  <h3 class="card-destination-name">${stay.name}</h3>
                  <p style="font-size: 0.82rem; color: var(--gold-light); margin-bottom: 10px; font-weight: 600;">📍 ${stay.destinationName}</p>
                  <p class="card-tagline-text">${stay.description}</p>
                  
                  <div class="card-vibes-row">
                    ${stay.amenities.slice(0, 3).map(a => `<span class="vibe-tag">✓ ${a}</span>`).join("")}
                  </div>
                </div>

                <div class="card-footer-meta" style="flex-direction: column; align-items: stretch; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <div>
                      <div class="price-label-small">Per Night</div>
                      <div class="price-value-bold">₹${stay.pricePerNight.toLocaleString('en-IN')}</div>
                    </div>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">+ ₹${stay.taxesAndFees || Math.round(stay.pricePerNight * 0.18)} taxes/fees</span>
                  </div>

                  <div style="display: flex; gap: 10px;">
                    <button class="btn-outline-glass view-stay-details-btn" data-stay-id="${stay.id}" style="flex: 1; justify-content: center; padding: 10px; font-size: 0.85rem;">
                      View Details
                    </button>
                    <button class="btn-primary-gold reserve-stay-now-btn" data-stay-id="${stay.id}" style="flex: 1; justify-content: center; padding: 10px; font-size: 0.85rem;">
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    // Listeners
    section.querySelector("#stays-search-dest-input")?.addEventListener("input", (e) => {
      searchDest = e.target.value;
    });

    section.querySelector("#stays-search-filter-btn")?.addEventListener("click", () => {
      renderContent();
    });

    section.querySelectorAll("[data-stay-cat]").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedCategory = btn.dataset.stayCat;
        renderContent();
      });
    });

    section.querySelectorAll(".amenity-chip-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const am = btn.dataset.am;
        const idx = selectedAmenities.indexOf(am);
        if (idx !== -1) {
          selectedAmenities.splice(idx, 1);
        } else {
          selectedAmenities.push(am);
        }
        renderContent();
      });
    });

    // View Details triggers StayDetailModal
    section.querySelectorAll(".view-stay-details-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const stayId = btn.dataset.stayId;
        const stay = STAYS.find(s => s.id === stayId);
        if (stay) {
          appState.setState({
            selectedStayDetail: stay,
            activeModal: "stayDetail"
          });
        }
      });
    });

    // Reserve button launches 6-step Booking Modal
    section.querySelectorAll(".reserve-stay-now-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const stayId = btn.dataset.stayId;
        const stay = STAYS.find(s => s.id === stayId);
        if (stay) {
          appState.setState({
            selectedStayForBooking: stay,
            selectedExperienceForBooking: null,
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
        const stayId = btn.dataset.stayId;
        const stay = STAYS.find(s => s.id === stayId);
        if (stay) {
          appState.toggleWishlist(stay);
          renderContent();
        }
      });
    });
  };

  appState.subscribe(() => {
    if (appState.getState().activeTab === "stays") {
      renderContent();
    }
  });

  renderContent();
  return section;
}
