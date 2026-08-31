// AURICVISTA Destination Deep Showcase Modal & Discovery Hub Component
import { appState } from "../state.js";
import { STAYS } from "../data/stays.js";
import { EXPERIENCES } from "../data/experiences.js";
import { RESTAURANTS } from "../data/restaurants.js";
import { DESTINATIONS } from "../data/destinations.js";

export function renderDestinationModal() {
  const backdrop = document.createElement("div");
  backdrop.className = "auric-modal-backdrop";
  backdrop.id = "destination-modal-backdrop";

  let currentTab = "overview";

  const renderModalContent = () => {
    const { selectedDestination, activeModal } = appState.getState();
    if (activeModal !== "destination" || !selectedDestination) {
      backdrop.classList.remove("active");
      backdrop.innerHTML = "";
      return;
    }

    const dest = selectedDestination;
    const attractions = dest.topAttractions || [];
    const thingsToDo = dest.thingsToDo || [];
    const food = dest.foodAndCulture || { overview: "", signatureDishes: [], culturalTraditions: [] };
    const budget = dest.estimatedBudget || {};
    const itinerary = dest.sampleItinerary || [];
    const gallery = dest.gallery || [dest.image];
    const isWish = appState.isWishlisted(dest.id);
    const duration = dest.recommendedDuration || "2–3 Days";
    const dist = dest.distanceFromBlr !== undefined ? dest.distanceFromBlr : 260;

    // Associated Stays, Experiences, Restaurants
    const destinationStays = STAYS.filter(s => s.destinationId === dest.id || s.destinationName.toLowerCase().includes(dest.name.toLowerCase().split(' ')[0]));
    const destinationExp = EXPERIENCES.filter(e => e.destinationId === dest.id || e.destinationName.toLowerCase().includes(dest.name.toLowerCase().split(' ')[0]));
    const destinationRestaurants = RESTAURANTS.filter(r => r.destinationId === dest.id || r.destinationName.toLowerCase().includes(dest.name.toLowerCase().split(' ')[0]));
    const nearby = dest.nearbyDestinations || [];
    const tips = dest.travelTips || [
      "Book stays and private safaris in advance during peak season.",
      "Carry breathable shoes and comfortable clothing for nature trails.",
      "Support local artisanal craftsmen and culinary heritage."
    ];

    backdrop.innerHTML = `
      <div class="modal-window-container" id="dest-modal-window">
        <!-- Close Button -->
        <button class="modal-close-btn" id="modal-close-x" title="Close (Esc)">✕</button>

        <!-- Modal Hero Banner with Template.jpg Visual Aesthetics -->
        <div class="modal-destination-hero">
          <img src="${dest.cinematicImage || dest.image}" alt="${dest.name}" class="modal-hero-img" />
          <div class="modal-hero-overlay"></div>
          
          <div class="modal-hero-content">
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px; flex-wrap: wrap;">
              <span class="badge-state-pill">📍 ${dest.state ? `${dest.state}, ` : ''}${dest.country}</span>
              <span class="badge-state-pill" style="background: rgba(7,9,14,0.85); border-color: var(--gold-primary); color: var(--gold-light);">⏱️ ${duration}</span>
              ${dist > 0 ? `<span class="badge-state-pill" style="background: rgba(7,9,14,0.85); border-color: rgba(255,255,255,0.3);">🚗 ${dist} km from Bengaluru</span>` : ''}
            </div>

            <h2 class="modal-dest-title">${dest.name}</h2>
            <p class="modal-dest-tagline">${dest.tagline || dest.description}</p>
          </div>

          <!-- Quick Floating Top Actions: Save & Share -->
          <div style="position: absolute; top: 20px; right: 80px; display: flex; gap: 10px; z-index: 50;">
            <button class="action-icon-btn ${isWish ? 'active' : ''}" id="modal-wish-toggle" title="Save to Wishlist" style="width: 44px; height: 44px; ${isWish ? 'background:#e11d48; border-color:#e11d48; color:#fff;' : ''}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="${isWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>

            <button class="action-icon-btn" id="modal-share-btn" title="Share Destination Link" style="width: 44px; height: 44px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Sticky Modal Tabs Header -->
        <div class="modal-tabs-header">
          <button class="modal-tab-btn ${currentTab === 'overview' ? 'active' : ''}" data-tab="overview">
            📖 Overview
          </button>
          <button class="modal-tab-btn ${currentTab === 'attractions' ? 'active' : ''}" data-tab="attractions">
            📍 Top Attractions (${attractions.length})
          </button>
          <button class="modal-tab-btn ${currentTab === 'things-to-do' ? 'active' : ''}" data-tab="things-to-do">
            🎟️ Activities (${thingsToDo.length})
          </button>
          <button class="modal-tab-btn ${currentTab === 'stays' ? 'active' : ''}" data-tab="stays">
            🏨 Luxury Stays (${destinationStays.length})
          </button>
          <button class="modal-tab-btn ${currentTab === 'food-culture' ? 'active' : ''}" data-tab="food-culture">
            🍴 Food & Dining (${destinationRestaurants.length})
          </button>
          <button class="modal-tab-btn ${currentTab === 'budget' ? 'active' : ''}" data-tab="budget">
            💰 Estimated Budget
          </button>
          <button class="modal-tab-btn ${currentTab === 'itinerary' ? 'active' : ''}" data-tab="itinerary">
            🗺️ Sample Route (${itinerary.length} Days)
          </button>
          <button class="modal-tab-btn ${currentTab === 'nearby' ? 'active' : ''}" data-tab="nearby">
            🧭 Nearby & Tips (${nearby.length})
          </button>
          <button class="modal-tab-btn ${currentTab === 'map' ? 'active' : ''}" data-tab="map">
            📍 Map
          </button>
        </div>

        <!-- Modal Dynamic Tab Body -->
        <div class="modal-tab-body" id="modal-dynamic-tab-content">
          ${renderTabContent(currentTab, dest, attractions, thingsToDo, food, budget, itinerary, gallery, destinationStays, destinationExp, destinationRestaurants, nearby, tips)}
        </div>

        <!-- Modal Footer Actions -->
        <div style="padding: 20px 36px; border-top: 1px solid var(--border-subtle); background: var(--bg-secondary); display: flex; justify-content: space-between; align-items: center; border-bottom-left-radius: var(--radius-lg); border-bottom-right-radius: var(--radius-lg); flex-wrap: wrap; gap: 14px;">
          <div>
            <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">Starting Estimate</span>
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--gold-primary);">${dest.startingPrice || '₹4,999'}</div>
          </div>

          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="${dest.googleMapsUri || `https://maps.google.com/?q=${encodeURIComponent(dest.name)}`}" target="_blank" rel="noopener noreferrer" class="btn-outline-glass" style="padding: 10px 20px; font-size: 0.9rem;">
              🗺️ View on Map
            </a>
            <button class="btn-outline-glass" id="modal-add-planner-btn" style="padding: 10px 22px; font-size: 0.9rem;">
              ➕ Add to Trip Planner
            </button>
            <button class="btn-primary-gold" id="modal-book-now-btn" style="padding: 10px 24px; font-size: 0.9rem;">
              🏨 Book Stays & Experiences
            </button>
          </div>
        </div>
      </div>
    `;

    backdrop.classList.add("active");

    // Tab switching
    backdrop.querySelectorAll(".modal-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentTab = btn.dataset.tab;
        renderModalContent();
      });
    });

    backdrop.querySelector("#modal-close-x")?.addEventListener("click", () => {
      appState.closeModal();
    });

    backdrop.querySelector("#modal-wish-toggle")?.addEventListener("click", () => {
      appState.toggleWishlist(dest);
      renderModalContent();
    });

    backdrop.querySelector("#modal-share-btn")?.addEventListener("click", () => {
      navigator.clipboard?.writeText(window.location.origin + "/#destinations");
      appState.showToast(`✨ Link to ${dest.name} copied to clipboard!`);
    });

    backdrop.querySelector("#modal-add-planner-btn")?.addEventListener("click", () => {
      const customTrip = appState.getState().customTrip;
      const updatedDays = [...customTrip.days];
      updatedDays[0].activities.push({
        id: "custom-" + Date.now(),
        title: `Explore ${dest.name} Highlights & Sanctuaries`,
        cost: 3500,
        type: "sightseeing",
        time: "10:00 AM"
      });
      appState.setState({ customTrip: { ...customTrip, days: updatedDays } });
      appState.showToast(`✨ Added ${dest.name} to Day 1 of your Trip Planner!`);
    });

    backdrop.querySelector("#modal-book-now-btn")?.addEventListener("click", () => {
      appState.closeModal();
      appState.setActiveTab("stays");
    });
  };

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      appState.closeModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && appState.getState().activeModal === "destination") {
      appState.closeModal();
    }
  });

  appState.subscribe(() => {
    renderModalContent();
  });

  return backdrop;
}

function renderTabContent(tab, dest, attractions, thingsToDo, food, budget, itinerary, gallery, destinationStays, destinationExp, destinationRestaurants, nearby, tips) {
  if (tab === "overview") {
    return `
      <div>
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px; margin-bottom: 36px;">
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white); margin-bottom: 14px;">The Soul of ${dest.name}</h3>
            <p style="color: var(--text-secondary); line-height: 1.8; font-size: 1rem; margin-bottom: 20px;">
              ${dest.overviewLong || dest.description}
            </p>

            <h4 style="font-size: 1.1rem; color: var(--gold-light); margin-bottom: 12px;">Curated Highlights</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
              ${(dest.highlights || []).map(h => `
                <li style="display: flex; gap: 10px; align-items: flex-start; color: var(--text-primary); font-size: 0.95rem;">
                  <span style="color: var(--gold-primary);">✦</span>
                  <span>${h}</span>
                </li>
              `).join("")}
            </ul>
          </div>

          <!-- Quick Stats Panel -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 24px; display: flex; flex-direction: column; gap: 16px;">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Best Season to Visit</span>
              <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-white); margin-top: 4px;">🌤️ ${dest.bestTimeToVisit || 'October – March'}</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Recommended Duration</span>
              <div style="font-size: 1.05rem; font-weight: 700; color: var(--gold-light); margin-top: 4px;">⏱️ ${dest.recommendedDuration || '2–3 Days'}</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Average Temperature</span>
              <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-white); margin-top: 4px;">🌡️ ${dest.averageTemperature || '22°C / 72°F'}</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Community Rating</span>
              <div style="font-size: 1.05rem; font-weight: 700; color: var(--gold-light); margin-top: 4px;">⭐ ${dest.rating || 4.9} / 5.0 (${dest.reviewsCount || 350} verified reviews)</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Distance from Bengaluru</span>
              <div style="font-size: 0.95rem; color: var(--text-white); margin-top: 4px;">🚗 ${dest.distanceFromBlr || 260} km</div>
            </div>
          </div>
        </div>

        <!-- Gallery Showcase -->
        <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--text-white); margin-bottom: 16px;">Cinematic Photo Gallery</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
          ${gallery.map(img => `
            <img src="${img}" alt="${dest.name}" style="width: 100%; height: 180px; object-fit: cover; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);" loading="lazy" />
          `).join("")}
        </div>
      </div>
    `;
  }

  if (tab === "attractions") {
    return `
      <div>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white); margin-bottom: 24px;">Must-Visit Sightseeing & Natural Wonders</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          ${attractions.map(att => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); overflow: hidden;">
              <img src="${att.image}" alt="${att.name}" style="width: 100%; height: 180px; object-fit: cover;" loading="lazy" />
              <div style="padding: 20px;">
                <span class="badge-state-pill" style="font-size: 0.7rem; margin-bottom: 8px; display: inline-block;">${att.tag || 'Sightseeing'}</span>
                <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-white); margin-bottom: 8px;">${att.name}</h4>
                <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">${att.description}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (tab === "things-to-do") {
    return `
      <div>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white); margin-bottom: 24px;">Things to Do & Bespoke Activities</h3>
        <div style="display: flex; flex-direction: column; gap: 18px;">
          ${thingsToDo.map(t => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 24px; display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap;">
              <div>
                <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 6px;">
                  <span class="badge-state-pill" style="font-size: 0.7rem;">${t.type || 'Activity'}</span>
                  <span style="font-size: 0.82rem; color: var(--gold-light);">⏱️ ${t.duration || '2-3 Hours'}</span>
                </div>
                <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-white); margin-bottom: 6px;">${t.title}</h4>
                <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${t.description}</p>
              </div>
              <button class="btn-outline-glass" style="white-space: nowrap; padding: 8px 18px; font-size: 0.85rem;">
                Reserve Activity
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (tab === "stays") {
    return `
      <div>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white); margin-bottom: 24px;">Luxury Stays & Heritage Sanctuaries in ${dest.name}</h3>
        ${destinationStays.length === 0 ? `
          <div style="padding: 40px; text-align: center; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
            <div style="font-size: 2.5rem; margin-bottom: 12px;">🏨</div>
            <h4 style="color: var(--text-white); font-size: 1.1rem; margin-bottom: 6px;">Exclusive Villas & Sanctuaries</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Our luxury concierge desk can arrange private coffee bungalows or heritage villas on request.</p>
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
            ${destinationStays.map(s => `
              <div style="background: var(--bg-card); border: 1px solid var(--border-gold); border-radius: var(--radius-md); overflow: hidden;">
                <img src="${s.image}" alt="${s.name}" style="width: 100%; height: 180px; object-fit: cover;" />
                <div style="padding: 20px;">
                  <span class="badge-state-pill" style="font-size: 0.7rem; margin-bottom: 8px; display: inline-block;">${s.category}</span>
                  <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-white); margin-bottom: 4px;">${s.name}</h4>
                  <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">${s.description}</p>
                  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 12px;">
                    <div>
                      <span style="font-size: 0.7rem; color: var(--text-muted);">Per Night</span>
                      <div style="color: var(--gold-primary); font-weight: 800; font-size: 1.15rem;">${s.priceDisplay}</div>
                    </div>
                    <button class="btn-primary-gold" style="padding: 6px 16px; font-size: 0.82rem;">Book Stay</button>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      </div>
    `;
  }

  if (tab === "food-culture") {
    return `
      <div>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white); margin-bottom: 12px;">Gastronomy & Cultural Heritage</h3>
        <p style="color: var(--text-secondary); line-height: 1.8; font-size: 0.98rem; margin-bottom: 28px;">
          ${food.overview || 'Authentic regional culinary dishes, spice profiles, and age-old harvesting traditions.'}
        </p>

        <h4 style="font-size: 1.15rem; color: var(--gold-light); margin-bottom: 16px;">Signature Delicacies</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 32px;">
          ${(food.signatureDishes || []).map(dish => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px;">
              <h5 style="font-size: 1rem; font-weight: 700; color: var(--text-white); margin-bottom: 6px;">🍲 ${dish.name}</h5>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${dish.description}</p>
            </div>
          `).join("")}
        </div>

        ${destinationRestaurants.length > 0 ? `
          <h4 style="font-size: 1.15rem; color: var(--gold-light); margin-bottom: 16px;">Famous Local Restaurants & Eateries</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 32px;">
            ${destinationRestaurants.map(r => `
              <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px; display: flex; gap: 16px; align-items: center;">
                <img src="${r.image}" alt="${r.name}" style="width: 80px; height: 75px; border-radius: var(--radius-sm); object-fit: cover;" />
                <div style="flex: 1;">
                  <h5 style="font-size: 1.05rem; font-weight: 700; color: var(--text-white); margin-bottom: 4px;">${r.name}</h5>
                  <div style="font-size: 0.8rem; color: var(--gold-light);">${r.cuisine} • ⭐ ${r.rating}</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">${r.priceRange}</div>
                </div>
              </div>
            `).join("")}
          </div>
        ` : ''}

        <h4 style="font-size: 1.15rem; color: var(--gold-light); margin-bottom: 12px;">Cultural Traditions & Living Heritage</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
          ${(food.culturalTraditions || []).map(trad => `
            <li style="display: flex; gap: 10px; color: var(--text-primary); font-size: 0.92rem;">
              <span style="color: var(--gold-primary);">❖</span>
              <span>${trad}</span>
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  }

  if (tab === "budget") {
    return `
      <div>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white); margin-bottom: 24px;">Trip Budgeting & Cost Breakdown</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
          <div style="background: var(--bg-card); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 20px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Tier & Daily Estimate</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--gold-primary); margin: 6px 0;">${budget.tier || 'Luxury'}</div>
            <div style="font-size: 0.95rem; color: var(--text-white);">${budget.dailyEstimate || '₹10,000 per day (couple)'}</div>
          </div>
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Accommodation</div>
            <div style="font-size: 0.92rem; color: var(--text-primary); margin-top: 6px;">${budget.accommodation || 'Private boutique villa or heritage estate'}</div>
          </div>
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Private Transport</div>
            <div style="font-size: 0.92rem; color: var(--text-primary); margin-top: 6px;">${budget.privateTransport || 'Chauffeured SUV / private rental'}</div>
          </div>
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Dining & Activities</div>
            <div style="font-size: 0.92rem; color: var(--text-primary); margin-top: 6px;">${budget.dining || 'Gourmet regional meals and guided nature excursions'}</div>
          </div>
        </div>
      </div>
    `;
  }

  if (tab === "itinerary") {
    return `
      <div>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white); margin-bottom: 24px;">Recommended Day-by-Day Journey</h3>
        <div style="display: flex; flex-direction: column; gap: 20px; border-left: 2px dashed var(--gold-primary); padding-left: 24px; margin-left: 10px;">
          ${itinerary.map(day => `
            <div style="position: relative;">
              <div style="position: absolute; left: -31px; top: 0; width: 14px; height: 14px; border-radius: 50%; background: var(--gold-primary); border: 2px solid var(--bg-surface);"></div>
              <span class="badge-state-pill" style="font-size: 0.7rem; margin-bottom: 6px; display: inline-block;">Day ${day.day}</span>
              <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-white); margin-bottom: 6px;">${day.title}</h4>
              <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">${day.description}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (tab === "nearby") {
    return `
      <div>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white); margin-bottom: 20px;">Nearby Destinations & Road Trips</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 36px;">
          ${nearby.map(nb => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; display: flex; gap: 16px; align-items: center; padding: 14px; cursor: pointer;">
              <img src="${nb.image}" alt="${nb.name}" style="width: 70px; height: 60px; border-radius: var(--radius-sm); object-fit: cover;" />
              <div>
                <h5 style="font-size: 1rem; font-weight: 700; color: var(--text-white); margin-bottom: 4px;">${nb.name}</h5>
                <span style="font-size: 0.8rem; color: var(--gold-light); font-weight: 600;">🚗 ${nb.distanceKm} km away</span>
              </div>
            </div>
          `).join("")}
        </div>

        <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--gold-light); margin-bottom: 14px;">Insider Travel Tips & Etiquette</h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${tips.map(tip => `
            <div style="display: flex; gap: 10px; background: rgba(255,255,255,0.04); padding: 12px 16px; border-radius: var(--radius-sm); color: var(--text-primary); font-size: 0.9rem;">
              <span style="color: var(--gold-primary);">💡</span>
              <span>${tip}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (tab === "map") {
    return `
      <div>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white); margin-bottom: 16px;">Interactive Location & Directions</h3>
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 24px; margin-bottom: 20px;">
          <p style="color: var(--text-white); font-size: 1rem; margin-bottom: 8px;"><strong>Formatted Address:</strong> ${dest.formattedAddress || `${dest.name}, ${dest.country}`}</p>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 16px;"><strong>GPS Coordinates:</strong> ${dest.coordinates ? `${dest.coordinates.lat}° N, ${dest.coordinates.lng}° E` : 'India'}</p>
          <a href="${dest.googleMapsUri || `https://maps.google.com/?q=${encodeURIComponent(dest.name)}`}" target="_blank" rel="noopener noreferrer" class="btn-primary-gold" style="padding: 10px 20px; font-size: 0.88rem; display: inline-flex;">
            🗺️ Open in Google Maps
          </a>
        </div>
      </div>
    `;
  }

  return "";
}
