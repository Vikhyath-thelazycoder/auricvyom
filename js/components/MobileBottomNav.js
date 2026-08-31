// AURICVISTA Mobile Sticky Bottom Navigation Dock Component
import { appState } from "../state.js";

export function renderMobileBottomNav() {
  const nav = document.createElement("div");
  nav.className = "mobile-bottom-nav";
  nav.id = "mobile-bottom-dock";

  const updateNav = () => {
    const { activeTab, wishlist, bookings, isAuthenticated } = appState.getState();

    nav.innerHTML = `
      <button class="mobile-dock-item ${activeTab === 'explore' || activeTab === 'destinations' ? 'active' : ''}" data-nav="explore">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
        <span>Explore</span>
      </button>

      <button class="mobile-dock-item" id="mobile-dock-search">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <span>Search</span>
      </button>

      <button class="mobile-dock-item ${activeTab === 'planner' ? 'active' : ''}" data-nav="planner">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
        <span>Planner</span>
      </button>

      <button class="mobile-dock-item ${activeTab === 'saved' ? 'active' : ''}" data-nav="saved" style="position: relative;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        ${wishlist.length > 0 ? `<span class="mobile-badge-counter">${wishlist.length}</span>` : ''}
        <span>Wishlist</span>
      </button>

      <button class="mobile-dock-item ${activeTab === 'dashboard' || activeTab === 'bookings' ? 'active' : ''}" data-nav="${isAuthenticated ? 'dashboard' : 'auth'}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Profile</span>
      </button>
    `;

    nav.querySelectorAll("[data-nav]").forEach(btn => {
      btn.addEventListener("click", () => {
        const dest = btn.dataset.nav;
        if (dest === "auth") {
          appState.setState({ activeModal: "authModal" });
        } else {
          appState.setActiveTab(dest);
        }
      });
    });

    nav.querySelector("#mobile-dock-search")?.addEventListener("click", () => {
      appState.setState({ activeModal: "search" });
    });
  };

  appState.subscribe(() => {
    updateNav();
  });

  updateNav();
  return nav;
}
