// AURICVISTA Complete User Dashboard Component
import { appState } from "../state.js";
import { renderDestinationCard } from "./DestinationCard.js";
import { DESTINATIONS } from "../data/destinations.js";

export function renderUserDashboardView() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "user-dashboard-section";

  let activeDashboardTab = "trips"; // trips, bookings, wishlist, journal, recently_viewed, settings
  let wishlistFilter = "all"; // all, destination, stay, experience

  const renderContent = () => {
    const { 
      currentUser, 
      bookings, 
      savedTripPlans, 
      wishlist, 
      travelStories, 
      recentlyViewed, 
      savedPaymentMethods 
    } = appState.getState();

    const userStories = travelStories.filter(s => s.author === currentUser.name || s.author.includes("Vikhyath"));

    section.innerHTML = `
      <div class="content-container">
        <!-- User Profile Hero Banner -->
        <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); padding: 32px; margin-bottom: 36px; box-shadow: var(--shadow-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px;">
          <div style="display: flex; gap: 20px; align-items: center;">
            <img src="${currentUser.avatar}" alt="${currentUser.name}" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid var(--gold-primary); object-fit: cover;" />
            <div>
              <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 4px;">
                <h2 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--text-white);">${currentUser.name}</h2>
                <span class="badge-state-pill" style="font-size: 0.7rem; background: rgba(212,175,55,0.2); border-color: var(--gold-primary); color: var(--gold-light);">
                  👑 ${currentUser.tier}
                </span>
              </div>
              <p style="font-size: 0.88rem; color: var(--text-secondary);">${currentUser.email} • ${currentUser.phone}</p>
            </div>
          </div>

          <!-- Quick Stats Counter -->
          <div style="display: flex; gap: 24px; text-align: center;">
            <div style="padding: 10px 20px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
              <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Auric Points</span>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--gold-primary);">${currentUser.loyaltyPoints.toLocaleString()}</div>
            </div>
            <div style="padding: 10px 20px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
              <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Trips Built</span>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--text-white);">${savedTripPlans.length}</div>
            </div>
            <div style="padding: 10px 20px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
              <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Confirmed Passes</span>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--emerald-light);">${bookings.length}</div>
            </div>
          </div>
        </div>

        <!-- Dashboard Navigation Pills -->
        <div class="filter-tabs-pills" style="margin-bottom: 32px;">
          <button class="filter-pill-btn ${activeDashboardTab === 'trips' ? 'active' : ''}" data-dtab="trips">
            🗺️ My Trips (${savedTripPlans.length})
          </button>
          <button class="filter-pill-btn ${activeDashboardTab === 'bookings' ? 'active' : ''}" data-dtab="bookings">
            🎟️ Bookings & Passes (${bookings.length})
          </button>
          <button class="filter-pill-btn ${activeDashboardTab === 'wishlist' ? 'active' : ''}" data-dtab="wishlist">
            ❤️ Wishlist (${wishlist.length})
          </button>
          <button class="filter-pill-btn ${activeDashboardTab === 'journal' ? 'active' : ''}" data-dtab="journal">
            📖 Travel Journal (${userStories.length})
          </button>
          <button class="filter-pill-btn ${activeDashboardTab === 'recently_viewed' ? 'active' : ''}" data-dtab="recently_viewed">
            🕒 Recently Viewed (${recentlyViewed.length})
          </button>
          <button class="filter-pill-btn ${activeDashboardTab === 'settings' ? 'active' : ''}" data-dtab="settings">
            ⚙️ Preferences & Wallet
          </button>
        </div>

        <!-- Dynamic Dashboard Body -->
        <div id="dashboard-tab-content-mount">
          ${renderTabPane(activeDashboardTab, savedTripPlans, bookings, wishlist, userStories, recentlyViewed, currentUser, savedPaymentMethods, wishlistFilter)}
        </div>
      </div>
    `;

    // Tab switcher
    section.querySelectorAll("[data-dtab]").forEach(btn => {
      btn.addEventListener("click", () => {
        activeDashboardTab = btn.dataset.dtab;
        renderContent();
      });
    });

    // Wishlist subcategory filter
    section.querySelectorAll("[data-wcat]").forEach(btn => {
      btn.addEventListener("click", () => {
        wishlistFilter = btn.dataset.wcat;
        renderContent();
      });
    });

    // Logout trigger
    section.querySelector("#dash-logout-btn")?.addEventListener("click", () => {
      appState.logout();
    });
  };

  appState.subscribe(() => {
    if (appState.getState().activeTab === "dashboard") {
      renderContent();
    }
  });

  renderContent();
  return section;
}

function renderTabPane(tab, savedTripPlans, bookings, wishlist, userStories, recentlyViewed, currentUser, savedPaymentMethods, wishlistFilter) {
  if (tab === "trips") {
    return `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white);">My Planned Itineraries</h3>
          <button class="btn-primary-gold" onclick="appState.setActiveTab('planner')" style="padding: 8px 18px; font-size: 0.85rem;">
            ＋ Plan New Itinerary
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px;">
          ${savedTripPlans.map(trip => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-gold); border-radius: var(--radius-lg); padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <span class="badge-state-pill" style="font-size: 0.7rem; margin-bottom: 8px; display: inline-block;">
                  ⏱️ ${trip.daysCount} Days • ${trip.travelStyle}
                </span>
                <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-white); margin-bottom: 6px;">${trip.title}</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 14px;">📍 ${trip.destination}</p>
                <div style="font-size: 0.82rem; color: var(--gold-light); margin-bottom: 16px;">
                  💰 Target Budget: ₹${trip.budgetSummary?.targetBudget.toLocaleString('en-IN') || '15,000'}
                </div>
              </div>

              <button class="btn-outline-glass" onclick="appState.setState({ activeTripPlan: ${JSON.stringify(trip).replace(/"/g, '&quot;')}, activeTab: 'planner' })" style="padding: 8px 16px; font-size: 0.85rem; justify-content: center;">
                Open in Studio ›
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (tab === "bookings") {
    return `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white);">Confirmed Reservations & Vouchers</h3>
        ${bookings.map(b => `
          <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); padding: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div style="display: flex; gap: 20px; align-items: center;">
              <img src="${b.image}" alt="${b.title}" style="width: 100px; height: 80px; border-radius: var(--radius-md); object-fit: cover;" />
              <div>
                <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                  <span class="badge-state-pill" style="font-size: 0.7rem; color: var(--emerald-light); border-color: var(--emerald-accent);">● ${b.status}</span>
                  <span style="font-size: 0.8rem; color: var(--gold-light); font-weight: 700;">Pass: ${b.voucherCode}</span>
                </div>
                <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--text-white);">${b.title}</h4>
                <p style="font-size: 0.82rem; color: var(--text-secondary);">📍 ${b.destination} • 📅 Booked: ${b.bookingDate}</p>
              </div>
            </div>

            <div style="text-align: right;">
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--gold-primary); margin-bottom: 8px;">₹${b.totalPrice.toLocaleString('en-IN')}</div>
              <button class="btn-outline-glass" onclick="window.print()" style="padding: 6px 14px; font-size: 0.8rem;">
                🖨️ Print Pass
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  if (tab === "wishlist") {
    const filteredWish = wishlist.filter(w => {
      if (wishlistFilter === "all") return true;
      return w.type === wishlistFilter;
    });

    return `
      <div>
        <div style="display: flex; gap: 8px; margin-bottom: 24px;">
          <button class="filter-pill-btn ${wishlistFilter === 'all' ? 'active' : ''}" data-wcat="all" style="padding: 6px 14px; font-size: 0.8rem;">All (${wishlist.length})</button>
          <button class="filter-pill-btn ${wishlistFilter === 'destination' ? 'active' : ''}" data-wcat="destination" style="padding: 6px 14px; font-size: 0.8rem;">Destinations</button>
          <button class="filter-pill-btn ${wishlistFilter === 'stay' ? 'active' : ''}" data-wcat="stay" style="padding: 6px 14px; font-size: 0.8rem;">Hotels & Villas</button>
          <button class="filter-pill-btn ${wishlistFilter === 'experience' ? 'active' : ''}" data-wcat="experience" style="padding: 6px 14px; font-size: 0.8rem;">Experiences</button>
        </div>

        <div class="destinations-grid">
          ${filteredWish.map(w => {
            const dest = DESTINATIONS.find(d => d.id === w.id) || {
              id: w.id,
              name: w.name,
              country: w.country || "India",
              state: w.state || "",
              image: w.image,
              rating: w.rating || 4.9,
              startingPrice: w.startingPrice,
              tagline: "Saved Sanctuary"
            };
            return renderDestinationCard(dest).outerHTML;
          }).join("")}
        </div>
      </div>
    `;
  }

  if (tab === "journal") {
    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white);">My Travel Journal & Published Stories</h3>
          <button class="btn-primary-gold" onclick="appState.setState({ activeModal: 'storyModal' })" style="padding: 8px 18px; font-size: 0.85rem;">
            ✍️ Write a Story
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px;">
          ${userStories.map(story => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-gold); border-radius: var(--radius-lg); overflow: hidden;">
              <img src="${story.coverImage}" alt="${story.title}" style="width: 100%; height: 180px; object-fit: cover;" />
              <div style="padding: 20px;">
                <span class="badge-state-pill" style="font-size: 0.7rem; margin-bottom: 6px; display: inline-block;">📍 ${story.destination}</span>
                <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--text-white); margin-bottom: 6px;">${story.title}</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">${story.excerpt}</p>
                <span style="font-size: 0.75rem; color: var(--gold-light);">📅 ${story.tripDates} • ⏱️ ${story.readingTime}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (tab === "recently_viewed") {
    return `
      <div>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white); margin-bottom: 24px;">Recently Viewed Sanctuaries</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
          ${recentlyViewed.map(item => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; display: flex; gap: 14px; align-items: center; padding: 12px; cursor: pointer;">
              <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 60px; border-radius: var(--radius-sm); object-fit: cover;" />
              <div>
                <h5 style="font-size: 0.95rem; font-weight: 700; color: var(--text-white);">${item.name}</h5>
                <span style="font-size: 0.75rem; color: var(--gold-light); text-transform: uppercase;">${item.type}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (tab === "settings") {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px;">
          <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--gold-light); margin-bottom: 16px;">Saved Payment Methods Architecture</h4>
          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
            ${(savedPaymentMethods.upi || []).map(upi => `
              <div style="padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); display: flex; justify-content: space-between; font-size: 0.88rem; color: var(--text-white);">
                <span>📱 UPI: ${upi}</span>
                <span style="color: var(--emerald-light);">Verified</span>
              </div>
            `).join("")}
            ${(savedPaymentMethods.cards || []).map(c => `
              <div style="padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); display: flex; justify-content: space-between; font-size: 0.88rem; color: var(--text-white);">
                <span>💳 ${c.brand} (•••• ${c.last4})</span>
                <span style="color: var(--text-muted); font-size: 0.8rem;">Exp: ${c.expiry}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px;">
          <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--gold-light); margin-bottom: 16px;">Traveler Preferences</h4>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 24px;">
            <div><strong>Preferred Currency:</strong> ₹ INR (Indian Rupee)</div>
            <div><strong>Travel Style:</strong> Luxury & Nature Highlands</div>
            <div><strong>Home Airport:</strong> BLR Kempegowda Bengaluru</div>
            <div><strong>Dietary:</strong> Gourmet & Vedic Vegetarian</div>
          </div>

          <button class="btn-outline-glass" id="dash-logout-btn" style="color: #f43f5e; border-color: rgba(244,63,94,0.3); padding: 8px 20px;">
            Sign Out of Account
          </button>
        </div>
      </div>
    `;
  }

  return "";
}
