// AURICVISTA Mobile Bottom Navigation Dock Component
// Master Authority: prd/design.md §16 & Phase 2 Step 3
// Canonical 5-Destination Architecture with Route Synchronization & Accessibility

import { appState, ROUTES } from "../../state.js";
import { router } from "../../router.js";

export function renderMobileBottomNav() {
  const dock = document.createElement("nav");
  dock.className = "mobile-bottom-dock";
  dock.id = "mobile-bottom-dock";
  dock.setAttribute("role", "navigation");
  dock.setAttribute("aria-label", "Primary Mobile Navigation");

  const updateDockDOM = () => {
    const { currentRoute, unreadMessages, unreadNotifications } = appState.getState();

    const isExplore = currentRoute === ROUTES.EXPLORE || currentRoute === "/";
    const isTrips = currentRoute.startsWith(ROUTES.TRIPS);
    const isConnect = currentRoute.startsWith(ROUTES.CONNECT) || currentRoute.startsWith(ROUTES.GROUPS);
    const isInbox = currentRoute.startsWith(ROUTES.INBOX) || currentRoute.startsWith(ROUTES.CHAT);
    const isProfile = currentRoute.startsWith(ROUTES.PROFILE) || currentRoute.startsWith(ROUTES.VERIFICATION) || currentRoute.startsWith(ROUTES.SETTINGS);

    dock.innerHTML = `
      <!-- 1. EXPLORE -->
      <a 
        href="#${ROUTES.EXPLORE}" 
        class="dock-item-btn ${isExplore ? "active" : ""}" 
        data-route="#${ROUTES.EXPLORE}"
        aria-label="Explore Home"
        aria-current="${isExplore ? "page" : "false"}"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
        <span>Explore</span>
      </a>

      <!-- 2. TRIPS -->
      <a 
        href="#${ROUTES.TRIPS}" 
        class="dock-item-btn ${isTrips ? "active" : ""}" 
        data-route="#${ROUTES.TRIPS}"
        aria-label="Trips and Itineraries"
        aria-current="${isTrips ? "page" : "false"}"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
        </svg>
        <span>Trips</span>
      </a>

      <!-- 3. CONNECT -->
      <a 
        href="#${ROUTES.CONNECT}" 
        class="dock-item-btn ${isConnect ? "active" : ""}" 
        data-route="#${ROUTES.CONNECT}"
        aria-label="Connect and Travel Buddies"
        aria-current="${isConnect ? "page" : "false"}"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span>Connect</span>
      </a>

      <!-- 4. INBOX -->
      <a 
        href="#${ROUTES.INBOX}" 
        class="dock-item-btn ${isInbox ? "active" : ""}" 
        data-route="#${ROUTES.INBOX}"
        aria-label="Inbox and Chats (${unreadMessages} unread messages)"
        aria-current="${isInbox ? "page" : "false"}"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        ${unreadMessages > 0 ? `<span class="dock-badge-counter">${unreadMessages}</span>` : ""}
        <span>Inbox</span>
      </a>

      <!-- 5. PROFILE -->
      <a 
        href="#${ROUTES.PROFILE}" 
        class="dock-item-btn ${isProfile ? "active" : ""}" 
        data-route="#${ROUTES.PROFILE}"
        aria-label="Profile and Settings"
        aria-current="${isProfile ? "page" : "false"}"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Profile</span>
      </a>
    `;

    dock.querySelectorAll("a[data-route]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const routePath = link.getAttribute("data-route").replace(/^#/, "");
        router.navigate(routePath);
      });
    });
  };

  appState.subscribe(() => {
    updateDockDOM();
  });

  updateDockDOM();
  return dock;
}
