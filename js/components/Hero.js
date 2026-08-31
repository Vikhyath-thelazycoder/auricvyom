// AURICVISTA Hero Section Component (Template.jpg Inspired Visual Concept)
import { appState } from "../state.js";

export function renderHero() {
  const heroContainer = document.createElement("section");
  heroContainer.className = "poster-hero";
  heroContainer.id = "hero-section";

  heroContainer.innerHTML = `
    <!-- Cinematic Background with Dark Gradient Overlay -->
    <div class="hero-bg-layer">
      <img 
        src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=2400&q=85" 
        alt="Karnataka Western Ghats Mist & Heritage" 
        class="hero-bg-image"
        id="hero-bg-img"
      />
      <div class="hero-gradient-overlay"></div>
      <div class="hero-vignette"></div>
    </div>

    <!-- Curved / Dashed Travel Route SVG with Animated Airplane -->
    <svg class="hero-flight-path-svg" viewBox="0 0 2000 700" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        id="flight-path-curve" 
        class="flight-curve-dashed" 
        d="M 100,550 C 450,220 850,520 1350,180 C 1600,60 1850,250 2000,120" 
      />
      <!-- Small Airplane icon traveling along the route -->
      <g class="animated-flight-plane">
        <path d="M-12,-8 L14,0 L-12,8 L-6,0 Z" fill="#d4af37" filter="drop-shadow(0 0 8px rgba(212,175,55,0.8))"/>
        <circle cx="14" cy="0" r="3" fill="#ffffff" />
      </g>
    </svg>

    <!-- Floating Decorative Elements -->
    <div class="hero-floating-elements">
      <!-- Floating Circular Seal -->
      <div class="floating-circular-seal" title="AuricVista Royal India Heritage">
        <span class="seal-inner-icon">⚜️</span>
        <span class="seal-text">INDIA FIRST<br/>LUXURY</span>
      </div>

      <!-- Floating Weather & Elevation Tag -->
      <div class="floating-weather-tag">
        <span>📍 Western Ghats</span>
        <span style="color: var(--gold-primary);">•</span>
        <span>🌤️ 22°C</span>
        <span style="color: var(--gold-primary);">•</span>
        <span>⛰️ 1,930 m</span>
      </div>
    </div>

    <!-- Center Hero Editorial Typography -->
    <div class="hero-center-content">
      <div class="hero-subtitle-pill">
        <span>✨ Bespoke Journeys • Discover • Explore • Plan • Travel</span>
      </div>

      <!-- Huge Oversized Destination Typography -->
      <h1 class="hero-giant-heading">
        <span>KARNATAKA</span>
      </h1>

      <p class="hero-editorial-desc">
        Discover breathtaking landscapes, ancient heritage, hidden escapes and unforgettable experiences. From the misty coffee highlands of Coorg and the boulder empire of Hampi, to pristine Arabian Sea cliffs in Gokarna.
      </p>

      <!-- Call to Action Buttons -->
      <div class="hero-cta-group">
        <button class="btn-primary-gold" id="hero-explore-btn">
          <span>Explore Karnataka</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        <button class="btn-outline-glass" id="hero-plan-btn">
          <span>✨ Plan Your Trip</span>
        </button>
      </div>
    </div>

    <!-- Floating Rounded/Dashed Service Panel Near Bottom (6 Interactive Items) -->
    <div class="floating-service-dock" id="service-dock">
      <button class="service-item-btn" data-service="flights">
        <span class="service-icon-wrap">✈️</span>
        <span>Flights</span>
      </button>

      <button class="service-item-btn" data-service="stays">
        <span class="service-icon-wrap">🏨</span>
        <span>Stays</span>
      </button>

      <button class="service-item-btn" data-service="transport">
        <span class="service-icon-wrap">🚗</span>
        <span>Transport</span>
      </button>

      <button class="service-item-btn" data-service="sightseeing">
        <span class="service-icon-wrap">📍</span>
        <span>Sightseeing</span>
      </button>

      <button class="service-item-btn" data-service="food">
        <span class="service-icon-wrap">🍴</span>
        <span>Food & Culture</span>
      </button>

      <button class="service-item-btn" data-service="experiences">
        <span class="service-icon-wrap">🎟️</span>
        <span>Experiences</span>
      </button>
    </div>
  `;

  // Attach event listeners
  const exploreBtn = heroContainer.querySelector("#hero-explore-btn");
  exploreBtn.addEventListener("click", () => {
    appState.setState({ filterRegion: "karnataka", activeTab: "destinations" });
    const target = document.getElementById("destinations-section");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });

  const planBtn = heroContainer.querySelector("#hero-plan-btn");
  planBtn.addEventListener("click", () => {
    appState.setActiveTab("planner");
  });

  const serviceButtons = heroContainer.querySelectorAll(".service-item-btn");
  serviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const service = btn.dataset.service;
      if (service === "flights") {
        appState.setActiveTab("flights");
      } else if (service === "stays") {
        appState.setActiveTab("stays");
      } else if (service === "experiences") {
        appState.setActiveTab("experiences");
      } else if (service === "transport") {
        appState.setActiveTab("flights");
      } else if (service === "sightseeing") {
        appState.setState({ filterRegion: "karnataka", activeTab: "destinations" });
      } else if (service === "food") {
        appState.setState({ filterRegion: "karnataka", activeTab: "destinations" });
      }
    });
  });

  return heroContainer;
}
