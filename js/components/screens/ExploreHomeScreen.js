// AURICVISTA EXPLORE_HOME — Canonical Mobile-First Screen Component
// Faithfully matches prd/design.md §24-36 and templet/app view.png (Screen 1)

import { appState, SCREEN_IDS } from "../../state.js";
import { destinations } from "../../data/destinations.js";
import { stays } from "../../data/stays.js";
import { people } from "../../data/people.js";
import { userTrips } from "../../data/trips.js";
import { communities } from "../../data/communities.js";
import { createAuricSearchBar } from "../primitives/AuricSearchBar.js";

export function renderExploreHomeScreen() {
  const container = document.createElement("div");
  container.className = "screen-explore-home";
  container.id = "screen-explore-home";

  const renderScreen = () => {
    container.innerHTML = "";

    // ------------------------------------------------------------------------
    // 1. CINEMATIC MOBILE HERO SECTION
    // ------------------------------------------------------------------------
    const heroSection = document.createElement("section");
    heroSection.className = "mobile-cinematic-hero";
    heroSection.innerHTML = `
      <div class="hero-media-backdrop">
        <img 
          src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=85" 
          alt="Karnataka Western Ghats and Scenic Lake Vista"
          id="hero-main-backdrop-img"
        />
      </div>
      <div class="hero-vignette-overlay"></div>

      <div class="hero-content-stack">
        <!-- Weather & Heritage Tag -->
        <div class="hero-kicker-badge" id="hero-weather-kicker">
          <span>📍 Hampi</span>
          <span style="color: var(--gold-primary);">•</span>
          <span>🌤️ 24°C Sunset</span>
          <span style="color: var(--gold-primary);">•</span>
          <span>UNESCO Heritage</span>
        </div>

        <!-- Editorial Typography -->
        <div class="hero-headline-group">
          <h1 class="hero-editorial-headline">
            Explore Beyond Travel
          </h1>
          <p class="hero-editorial-subtitle">
            Discover. Connect. Journey Together.
          </p>
        </div>

        <!-- Integrated Floating Luxury Search Bar -->
        <div id="hero-search-mount"></div>
      </div>
    `;

    // Mount Search Bar inside Hero
    const searchMount = heroSection.querySelector("#hero-search-mount");
    searchMount.appendChild(createAuricSearchBar({
      placeholder: "Where do you want to go?",
      pillTag: "Dates & Guests",
      onClick: () => appState.openModal("search")
    }));

    container.appendChild(heroSection);

    // ------------------------------------------------------------------------
    // 2. POPULAR DESTINATIONS SECTION
    // ------------------------------------------------------------------------
    const destSection = document.createElement("section");
    destSection.innerHTML = `
      <div class="section-header-bar">
        <div>
          <h2 class="section-title">Popular Destinations</h2>
          <p class="section-subtitle">Trending escapes across Karnataka & India</p>
        </div>
        <button class="see-all-link" id="view-all-dest-btn">
          <span>View all</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <div class="mobile-snap-row" id="destinations-snap-carousel">
        ${destinations.map(d => `
          <div class="mobile-snap-item">
            <div class="auric-destination-card" data-dest-id="${d.id}">
              <div class="dest-image-wrap">
                <img src="${d.image}" alt="${d.name}" loading="lazy" />
                <div class="dest-card-overlay"></div>
                <div class="dest-rating-pill">
                  <span>★</span>
                  <span>${d.rating}</span>
                </div>
              </div>
              <div class="dest-card-body">
                <div class="dest-name">${d.name}</div>
                <div class="dest-region">${d.region}</div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    destSection.querySelectorAll(".auric-destination-card").forEach(card => {
      card.addEventListener("click", () => {
        const destId = card.dataset.destId;
        const dest = destinations.find(d => d.id === destId);
        if (dest) appState.openModal("destination", dest);
      });
    });

    destSection.querySelector("#view-all-dest-btn")?.addEventListener("click", () => {
      appState.openModal("search");
    });

    container.appendChild(destSection);

    // ------------------------------------------------------------------------
    // 3. TOP STAYS NEAR YOU SECTION
    // ------------------------------------------------------------------------
    const staysSection = document.createElement("section");
    const { stayCategoryFilter } = appState.getState();

    const filteredStays = stayCategoryFilter === "all" 
      ? stays 
      : stays.filter(s => s.category === stayCategoryFilter);

    staysSection.innerHTML = `
      <div class="section-header-bar">
        <div>
          <h2 class="section-title">Top Stays Near You</h2>
          <p class="section-subtitle">Verified boutique villas, homestays & hostels</p>
        </div>
        <button class="see-all-link" id="view-all-stays-btn">
          <span>View all</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <!-- Category Filter Chips -->
      <div class="filter-chips-row" id="stays-category-chips">
        <button class="auric-chip ${stayCategoryFilter === 'all' ? 'active' : ''}" data-cat="all">All</button>
        <button class="auric-chip ${stayCategoryFilter === 'homestay' ? 'active' : ''}" data-cat="homestay">Homestay</button>
        <button class="auric-chip ${stayCategoryFilter === 'hostel' ? 'active' : ''}" data-cat="hostel">Hostel</button>
        <button class="auric-chip ${stayCategoryFilter === 'resort' ? 'active' : ''}" data-cat="resort">Resort</button>
        <button class="auric-chip ${stayCategoryFilter === 'pg' ? 'active' : ''}" data-cat="pg">PG & Co-Living</button>
      </div>

      <!-- Horizontal Stays Snap Carousel -->
      <div class="mobile-snap-row" id="stays-snap-carousel">
        ${filteredStays.map(s => {
          const isFav = appState.isWishlisted(s.id);
          return `
            <div class="mobile-snap-item">
              <div class="auric-stay-card" data-stay-id="${s.id}">
                <div class="stay-image-wrap">
                  <img src="${s.image}" alt="${s.name}" loading="lazy" />
                  <span class="stay-type-badge">${s.type}</span>
                  <button class="stay-favorite-btn ${isFav ? 'favorited' : ''}" data-fav-id="${s.id}" aria-label="Save to Wishlist">
                    ${isFav ? '♥' : '♡'}
                  </button>
                </div>
                <div class="stay-card-body">
                  <div class="stay-title" title="${s.name}">${s.name}</div>
                  <div class="stay-meta-row">
                    <span class="stay-location">${s.location.split(',')[0]}</span>
                    <span class="stay-rating">★ ${s.rating}</span>
                  </div>
                  <div class="stay-price-row">
                    <span class="stay-price-val">${s.currency}${s.price.toLocaleString()}</span>
                    <span class="stay-price-unit">/ ${s.pricePeriod}</span>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    staysSection.querySelectorAll(".auric-chip[data-cat]").forEach(chip => {
      chip.addEventListener("click", () => {
        appState.setStayCategoryFilter(chip.dataset.cat);
      });
    });

    staysSection.querySelectorAll(".auric-stay-card").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".stay-favorite-btn")) return;
        const stayId = card.dataset.stayId;
        const stay = stays.find(s => s.id === stayId);
        if (stay) appState.openModal("stay", stay);
      });
    });

    staysSection.querySelectorAll(".stay-favorite-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const stayId = btn.dataset.favId;
        appState.toggleWishlist(stayId);
      });
    });

    staysSection.querySelector("#view-all-stays-btn")?.addEventListener("click", () => {
      appState.openModal("search");
    });

    container.appendChild(staysSection);

    // ------------------------------------------------------------------------
    // 4. CONNECT & SOCIAL DISCOVERY PREVIEW
    // ------------------------------------------------------------------------
    const connectSection = document.createElement("section");
    connectSection.style.marginTop = "var(--space-6)";
    const { currentSocialMode } = appState.getState();
    const traveler = people[0]; // Ananya as primary showcase

    connectSection.innerHTML = `
      <div class="section-header-bar" style="padding-top: 0;">
        <div>
          <h2 class="section-title">Discover People</h2>
          <p class="section-subtitle">Verified travel companions & roommates</p>
        </div>
        <button class="see-all-link" id="goto-connect-btn">
          <span>Connect</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <div class="social-preview-card">
        <!-- Mode Switcher -->
        <div class="social-mode-tabs">
          <button class="social-tab-btn ${currentSocialMode === 'buddy' ? 'active' : ''}" data-social-mode="buddy">
            Travel Buddy
          </button>
          <button class="social-tab-btn ${currentSocialMode === 'dating' ? 'active-dating' : ''}" data-social-mode="dating">
            Dating
          </button>
          <button class="social-tab-btn ${currentSocialMode === 'flatmate' ? 'active' : ''}" data-social-mode="flatmate">
            Flatmates
          </button>
        </div>

        <!-- Traveler Card -->
        <div class="traveler-mini-profile">
          <div class="traveler-avatar-wrap">
            <img src="${traveler.avatar}" alt="${traveler.name}" />
          </div>
          <div class="traveler-info-col">
            <div class="traveler-name-row">
              <span class="traveler-name">${traveler.name}, ${traveler.age}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#10B981" class="verified-badge-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div class="traveler-location">📍 ${traveler.location} • ${traveler.occupation}</div>
            <div class="traveler-tags-wrap">
              ${traveler.tags.map(t => `<span class="traveler-tag">⛰️ ${t}</span>`).join("")}
            </div>
          </div>
        </div>

        <div style="margin-top: var(--space-4); display: flex; gap: var(--space-2);">
          <button class="btn-gold" id="social-profile-cta" style="flex: 1; padding: 8px 16px; font-size: 0.82rem;">
            <span>👋 Say Hi to ${traveler.name}</span>
          </button>
          <button class="btn-outline" id="social-browse-cta" style="padding: 8px 16px; font-size: 0.82rem;">
            <span>Browse Profiles</span>
          </button>
        </div>
      </div>
    `;

    connectSection.querySelectorAll(".social-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        appState.setSocialMode(btn.dataset.socialMode);
      });
    });

    connectSection.querySelector("#goto-connect-btn")?.addEventListener("click", () => {
      appState.setScreen(SCREEN_IDS.CONNECT_HOME);
    });

    connectSection.querySelector("#social-profile-cta")?.addEventListener("click", () => {
      appState.showToast(`Connection request sent to ${traveler.name}! ✨`);
    });

    connectSection.querySelector("#social-browse-cta")?.addEventListener("click", () => {
      appState.setScreen(SCREEN_IDS.CONNECT_HOME);
    });

    container.appendChild(connectSection);

    // ------------------------------------------------------------------------
    // 5. CONTEXTUAL AI TRIP PLANNER CARD
    // ------------------------------------------------------------------------
    const aiSection = document.createElement("section");
    aiSection.style.marginTop = "var(--space-6)";
    aiSection.innerHTML = `
      <div class="ai-planner-card">
        <div class="ai-card-badge">
          <span>✨</span>
          <span>Auric AI Concierge</span>
        </div>
        <h3 class="ai-card-title">
          Curate your bespoke itinerary in seconds
        </h3>
        <p class="ai-card-desc">
          Instant multi-day schedules with verified homestays, private jeep safaris, and budget estimates.
        </p>

        <!-- Interactive Quick Suggestion Chips -->
        <div class="ai-chip-suggestions">
          <button class="ai-prompt-chip" data-prompt="Coorg 4 days under ₹15,000">☕ 4-day Coorg under ₹15k</button>
          <button class="ai-prompt-chip" data-prompt="Weekend Hampi ruins tour">🏛️ Weekend Hampi ruins</button>
          <button class="ai-prompt-chip" data-prompt="Kabini tiger safari weekend">🐅 Kabini big cat safari</button>
          <button class="ai-prompt-chip" data-prompt="Solo backpacking Gokarna">🌊 Solo trek Gokarna</button>
        </div>

        <button class="btn-gold" id="start-ai-planner-btn" style="width: 100%;">
          <span>✨ Plan My Custom Trip</span>
        </button>
      </div>
    `;

    aiSection.querySelectorAll(".ai-prompt-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const promptText = chip.dataset.prompt;
        appState.showToast(`AI Trip Planner: Generating plan for "${promptText}"... ✨`);
        setTimeout(() => {
          appState.setScreen(SCREEN_IDS.TRIPS_HOME);
        }, 600);
      });
    });

    aiSection.querySelector("#start-ai-planner-btn")?.addEventListener("click", () => {
      appState.setScreen(SCREEN_IDS.TRIPS_HOME);
    });

    container.appendChild(aiSection);

    // ------------------------------------------------------------------------
    // 6. CONTEXTUAL UPCOMING TRIP CARD
    // ------------------------------------------------------------------------
    const trip = userTrips[0];
    const tripSection = document.createElement("section");
    tripSection.style.marginTop = "var(--space-6)";
    tripSection.innerHTML = `
      <div class="section-header-bar" style="padding-top: 0;">
        <div>
          <h2 class="section-title">Upcoming Trip</h2>
          <p class="section-subtitle">Your active travel itinerary</p>
        </div>
      </div>

      <div class="upcoming-trip-card" id="upcoming-trip-trigger">
        <div class="upcoming-trip-header">
          <div>
            <div class="trip-title">${trip.title}</div>
            <div class="trip-meta">${trip.dates} • ${trip.membersCount} Members</div>
          </div>
          <span class="trip-status-pill">${trip.progressPercentage}% Ready</span>
        </div>

        <div class="trip-progress-bar-bg">
          <div class="trip-progress-fill" style="width: ${trip.progressPercentage}%;"></div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: var(--text-secondary);">
          <span>${trip.itineraryStats}</span>
          <span>Budget: ${trip.currency}${trip.budgetSpent.toLocaleString()} / ${trip.currency}${trip.budgetTotal.toLocaleString()}</span>
        </div>
      </div>
    `;

    tripSection.querySelector("#upcoming-trip-trigger")?.addEventListener("click", () => {
      appState.setScreen(SCREEN_IDS.TRIPS_HOME);
    });

    container.appendChild(tripSection);

    // ------------------------------------------------------------------------
    // 7. ACTIVE GROUPS & SQUADS SECTION
    // ------------------------------------------------------------------------
    const groupSection = document.createElement("section");
    groupSection.style.marginTop = "var(--space-6)";
    groupSection.innerHTML = `
      <div class="section-header-bar" style="padding-top: 0;">
        <div>
          <h2 class="section-title">Active Squads & Groups</h2>
          <p class="section-subtitle">Join verified communities traveling now</p>
        </div>
      </div>

      <div class="mobile-snap-row">
        ${communities.map(c => `
          <div class="mobile-snap-item" style="width: 250px;">
            <div class="auric-stay-card" style="width: 100%; cursor: pointer;" data-group-id="${c.id}">
              <div style="height: 110px; position: relative; overflow: hidden;">
                <img src="${c.image}" alt="${c.name}" style="width: 100%; height: 100%; object-fit: cover;" />
                <div class="dest-card-overlay"></div>
                <span class="stay-type-badge" style="background: rgba(34,197,94,0.85); color: #080B10; font-weight: 800;">
                  ● ${c.activeNow} Active Now
                </span>
              </div>
              <div style="padding: var(--space-3);">
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${c.name}</div>
                <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 2px;">${c.membersCount} members • ${c.status}</div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    groupSection.querySelectorAll("[data-group-id]").forEach(card => {
      card.addEventListener("click", () => {
        appState.showToast("Group chat & squad details available in Connect tab!");
        appState.setScreen(SCREEN_IDS.CONNECT_HOME);
      });
    });

    container.appendChild(groupSection);

    // ------------------------------------------------------------------------
    // 8. TRUST & SAFETY PROOF POINTS SECTION
    // ------------------------------------------------------------------------
    const trustSection = document.createElement("section");
    trustSection.style.marginTop = "var(--space-6)";
    trustSection.style.marginBottom = "var(--space-6)";
    trustSection.innerHTML = `
      <div class="section-header-bar" style="padding-top: 0;">
        <div>
          <h2 class="section-title">Why AuricVista</h2>
          <p class="section-subtitle">Engineered for luxury, connection & safety</p>
        </div>
      </div>

      <div class="trust-grid">
        <div class="trust-item-card">
          <div class="trust-item-metric">2M+</div>
          <div class="trust-item-label">Verified travelers exploring India</div>
        </div>
        <div class="trust-item-card">
          <div class="trust-item-metric">10,000+</div>
          <div class="trust-item-label">Verified homestays & luxury villas</div>
        </div>
        <div class="trust-item-card">
          <div class="trust-item-metric">4.9 ★</div>
          <div class="trust-item-label">Trust rating across guest bookings</div>
        </div>
        <div class="trust-item-card">
          <div class="trust-item-metric">24×7</div>
          <div class="trust-item-label">Emergency SOS & roadside assistance</div>
        </div>
      </div>
    `;

    container.appendChild(trustSection);
  };

  appState.subscribe((state) => {
    if (state.activeScreen === SCREEN_IDS.EXPLORE_HOME) {
      // Re-render when category filter or social mode changes
      renderScreen();
    }
  });

  renderScreen();
  return container;
}
