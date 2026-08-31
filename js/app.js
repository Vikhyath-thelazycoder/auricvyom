// AURICVISTA Main Application Entry & Coordinator (Production Master Architecture)
import { appState } from "./state.js";
import { renderNavbar } from "./components/Navbar.js";
import { renderHero } from "./components/Hero.js";
import { renderExploreIndiaView } from "./components/ExploreIndiaView.js";
import { renderDestinationsView } from "./components/DestinationsView.js";
import { renderStaysView } from "./components/StaysView.js";
import { renderStayDetailModal } from "./components/StayDetailModal.js";
import { renderExperiencesView } from "./components/ExperiencesView.js";
import { renderExperienceDetailModal } from "./components/ExperienceDetailModal.js";
import { renderTransportView } from "./components/TransportView.js";
import { renderPackagesView } from "./components/PackagesView.js";
import { renderTripPlanner } from "./components/TripPlanner.js";
import { renderAIPlanner } from "./components/AIPlanner.js";
import { renderUserDashboardView } from "./components/UserDashboardView.js";
import { renderTravelJournalView } from "./components/TravelJournalView.js";
import { renderReviewsSection } from "./components/ReviewsSection.js";
import { renderPersonalizationSection } from "./components/PersonalizationSection.js";
import { renderMobileBottomNav } from "./components/MobileBottomNav.js";
import { renderSavedTripsView } from "./components/SavedTripsView.js";
import { renderMyBookingsView } from "./components/MyBookingsView.js";
import { renderDestinationModal } from "./components/DestinationModal.js";
import { renderBookingModal } from "./components/BookingModal.js";
import { renderAuthModal } from "./components/AuthModal.js";
import { renderGlobalSearchModal } from "./components/GlobalSearchModal.js";
import { renderFooter } from "./components/Footer.js";

class AuricVistaApp {
  constructor() {
    this.appRoot = document.getElementById("app-root");
    this.init();
  }

  init() {
    this.renderShell();
    this.bindEvents();

    let lastTab = null;
    appState.subscribe((state) => {
      if (state.activeTab !== lastTab) {
        lastTab = state.activeTab;
        this.renderMainContent(state.activeTab);
      }
      this.renderToast(state.toastMessage);
    });

    this.renderMainContent(appState.getState().activeTab);
  }

  renderShell() {
    this.appRoot.innerHTML = `
      <!-- Sticky Glass Navbar Container -->
      <div id="navbar-mount"></div>

      <!-- Main Dynamic Content Container -->
      <main class="app-main-content" id="main-content-mount"></main>

      <!-- Footer Mount -->
      <div id="footer-mount"></div>

      <!-- Mobile Sticky Bottom Dock Navigation -->
      <div id="mobile-bottom-mount"></div>

      <!-- Modals Mount -->
      <div id="modals-mount"></div>

      <!-- Toast Notification Mount -->
      <div id="toast-mount" style="position: fixed; bottom: 85px; right: 24px; z-index: 9999; pointer-events: none;"></div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" id="mobile-drawer">
        <div style="padding: 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle);">
          <div class="brand-title" style="font-size: 1.2rem;">AURIC<span>VISTA</span></div>
          <button id="close-drawer-btn" style="color: var(--text-white); font-size: 1.4rem;">✕</button>
        </div>
        <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
          <button class="nav-link-btn" data-nav="home" style="text-align: left; font-size: 1.05rem;">Explore Home</button>
          <button class="nav-link-btn" data-nav="explore" style="text-align: left; font-size: 1.05rem;">Explore India</button>
          <button class="nav-link-btn" data-nav="destinations" style="text-align: left; font-size: 1.05rem;">Destinations</button>
          <button class="nav-link-btn" data-nav="stays" style="text-align: left; font-size: 1.05rem;">Luxury Stays</button>
          <button class="nav-link-btn" data-nav="experiences" style="text-align: left; font-size: 1.05rem;">Experiences</button>
          <button class="nav-link-btn" data-nav="transport" style="text-align: left; font-size: 1.05rem;">Transport & Flights</button>
          <button class="nav-link-btn" data-nav="packages" style="text-align: left; font-size: 1.05rem;">Tour Packages</button>
          <button class="nav-link-btn" data-nav="planner" style="text-align: left; font-size: 1.05rem;">Trip Planner</button>
          <button class="nav-link-btn" data-nav="journal" style="text-align: left; font-size: 1.05rem;">Travel Journal</button>
          <button class="nav-link-btn" data-nav="dashboard" style="text-align: left; font-size: 1.05rem;">My Dashboard</button>
          <button class="nav-link-btn ai-chip" data-nav="ai_planner" style="text-align: left; font-size: 1.05rem; justify-content: flex-start;">✨ AI Companion</button>
          <button class="nav-link-btn" data-nav="saved" style="text-align: left; font-size: 1.05rem;">Saved Wishlist</button>
        </div>
      </div>
    `;

    // Mount Navbar & Footer & Mobile Dock
    document.getElementById("navbar-mount").appendChild(renderNavbar());
    document.getElementById("footer-mount").appendChild(renderFooter());
    document.getElementById("mobile-bottom-mount").appendChild(renderMobileBottomNav());

    // Mount Modals
    const modalsMount = document.getElementById("modals-mount");
    modalsMount.appendChild(renderDestinationModal());
    modalsMount.appendChild(renderStayDetailModal());
    modalsMount.appendChild(renderExperienceDetailModal());
    modalsMount.appendChild(renderBookingModal());
    modalsMount.appendChild(renderAuthModal());
    modalsMount.appendChild(renderGlobalSearchModal());

    // Mobile drawer listeners
    const drawer = document.getElementById("mobile-drawer");
    document.getElementById("close-drawer-btn")?.addEventListener("click", () => {
      drawer.classList.remove("active");
    });

    drawer.querySelectorAll("[data-nav]").forEach(btn => {
      btn.addEventListener("click", () => {
        appState.setActiveTab(btn.dataset.nav);
        drawer.classList.remove("active");
      });
    });
  }

  renderToast(msg) {
    const toastMount = document.getElementById("toast-mount");
    if (!toastMount) return;
    if (!msg) {
      toastMount.innerHTML = "";
      return;
    }
    toastMount.innerHTML = `
      <div style="background: rgba(13, 21, 36, 0.96); border: 1px solid var(--border-gold); border-radius: var(--radius-full); padding: 12px 24px; color: var(--gold-light); font-weight: 700; font-size: 0.92rem; box-shadow: var(--shadow-lg); backdrop-filter: blur(14px); animation: fadeIn 0.3s ease;">
        ${msg}
      </div>
    `;
  }

  renderMainContent(activeTab) {
    const mainMount = document.getElementById("main-content-mount");
    mainMount.innerHTML = "";

    if (activeTab === "home") {
      // EXACT HOMEPAGE STRUCTURE AS SPECIFIED:
      // 1. FULL-SCREEN AURICVISTA HERO
      mainMount.appendChild(renderHero());

      // 2. Smart Search
      const smartSearchSection = document.createElement("section");
      smartSearchSection.style.padding = "40px 0 20px";
      smartSearchSection.innerHTML = `
        <div class="content-container">
          <div style="background: var(--bg-surface); border: 1.5px solid var(--border-gold); border-radius: var(--radius-full); padding: 10px 24px; display: flex; align-items: center; justify-content: space-between; box-shadow: var(--shadow-md); cursor: pointer;" id="home-smart-search-trigger">
            <div style="display: flex; align-items: center; gap: 14px; color: var(--text-secondary);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <span style="font-size: 0.98rem;">Search coffee bungalows in Coorg, boulder ruins in Hampi, tiger safaris in Kabini...</span>
            </div>
            <span class="badge-state-pill" style="font-size: 0.75rem;">Ctrl+K</span>
          </div>
        </div>
      `;
      smartSearchSection.querySelector("#home-smart-search-trigger")?.addEventListener("click", () => {
        appState.setState({ activeModal: "search" });
      });
      mainMount.appendChild(smartSearchSection);

      // 3. Dynamic Personalization (Recommended for you, Because you liked...)
      mainMount.appendChild(renderPersonalizationSection());

      // 4. Explore Karnataka & Trending India & Weekend Getaways & Hidden Gems (Explore India Hub)
      mainMount.appendChild(renderExploreIndiaView());

      // 5. Popular Stays
      mainMount.appendChild(renderStaysView());

      // 6. Unique Experiences
      mainMount.appendChild(renderExperiencesView());

      // 7. Travel Packages
      mainMount.appendChild(renderPackagesView());

      // 8. Multi-Modal Transport (Flights, Trains, Buses, Cabs)
      mainMount.appendChild(renderTransportView());

      // 9. AI Trip Planner Preview & Companion
      mainMount.appendChild(renderAIPlanner());

      // 10. Travel Stories & Gazette
      mainMount.appendChild(renderTravelJournalView());

      // 11. Verified Traveler Reviews
      mainMount.appendChild(renderReviewsSection());

      // 12. Final "Plan Your Journey" Hero CTA Banner
      const finalCta = document.createElement("section");
      finalCta.className = "section-spacing";
      finalCta.innerHTML = `
        <div class="content-container">
          <div style="background: linear-gradient(135deg, rgba(18,27,43,0.95), rgba(7,9,14,0.98)), url('https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1400&q=80') center/cover; border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); padding: 80px 48px; text-align: center; box-shadow: var(--shadow-lg); position: relative; overflow: hidden;">
            <div style="max-width: 780px; margin: 0 auto; position: relative; z-index: 2;">
              <span class="section-tag-gold" style="font-size: 0.9rem;">✨ YOUR JOURNEY AWAITS</span>
              <h2 style="font-family: var(--font-serif); font-size: clamp(2.4rem, 4.5vw, 3.8rem); color: var(--text-white); margin-bottom: 16px; line-height: 1.15;">
                Craft Your Masterpiece Escape with AuricVista
              </h2>
              <p style="color: var(--text-secondary); font-size: 1.15rem; line-height: 1.7; margin-bottom: 32px;">
                Experience India’s finest heritage sanctuaries, misty coffee highlands, and private safaris with an intelligent companion by your side.
              </p>
              <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                <button class="btn-primary-gold" onclick="appState.setActiveTab('planner')" style="padding: 16px 36px; font-size: 1rem;">
                  ✨ Plan My Trip in Studio
                </button>
                <button class="btn-outline-glass" onclick="appState.setActiveTab('stays')" style="padding: 16px 32px; font-size: 1rem;">
                  🏨 Explore Luxury Stays
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      mainMount.appendChild(finalCta);

    } else if (activeTab === "explore") {
      mainMount.appendChild(renderExploreIndiaView());
    } else if (activeTab === "destinations") {
      mainMount.appendChild(renderDestinationsView());
    } else if (activeTab === "stays") {
      mainMount.appendChild(renderStaysView());
    } else if (activeTab === "experiences") {
      mainMount.appendChild(renderExperiencesView());
    } else if (activeTab === "transport" || activeTab === "flights") {
      mainMount.appendChild(renderTransportView());
    } else if (activeTab === "packages") {
      mainMount.appendChild(renderPackagesView());
    } else if (activeTab === "planner") {
      mainMount.appendChild(renderTripPlanner());
    } else if (activeTab === "journal") {
      mainMount.appendChild(renderTravelJournalView());
    } else if (activeTab === "dashboard") {
      mainMount.appendChild(renderUserDashboardView());
    } else if (activeTab === "ai_planner") {
      mainMount.appendChild(renderAIPlanner());
    } else if (activeTab === "saved") {
      mainMount.appendChild(renderSavedTripsView());
    } else if (activeTab === "bookings") {
      mainMount.appendChild(renderMyBookingsView());
    }
  }

  bindEvents() {
    window.addEventListener("error", (e) => {
      console.warn("AuricVista runtime event", e);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AuricVistaApp();
});
