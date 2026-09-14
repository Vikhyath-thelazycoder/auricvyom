// AURICVISTA Mobile Bottom Navigation Dock Component
// Canonical 5-Destination Architecture mandated by prd/design.md §16
// 1. EXPLORE  2. TRIPS  3. CONNECT  4. INBOX  5. PROFILE

import { appState, SCREEN_IDS } from "../../state.js";

export function renderMobileBottomNav() {
  const dock = document.createElement("nav");
  dock.className = "mobile-bottom-dock";
  dock.id = "mobile-bottom-dock";
  dock.setAttribute("role", "navigation");
  dock.setAttribute("aria-label", "Primary Mobile Navigation");

  const updateDockDOM = () => {
    const { activeScreen, unreadMessages } = appState.getState();

    dock.innerHTML = `
      <!-- 1. EXPLORE -->
      <button 
        class="dock-item-btn ${activeScreen === SCREEN_IDS.EXPLORE_HOME ? "active" : ""}" 
        data-screen="${SCREEN_IDS.EXPLORE_HOME}"
        aria-label="Explore Home"
        aria-current="${activeScreen === SCREEN_IDS.EXPLORE_HOME ? "page" : "false"}"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
        <span>Explore</span>
      </button>

      <!-- 2. TRIPS -->
      <button 
        class="dock-item-btn ${activeScreen === SCREEN_IDS.TRIPS_HOME ? "active" : ""}" 
        data-screen="${SCREEN_IDS.TRIPS_HOME}"
        aria-label="Trips and Itineraries"
        aria-current="${activeScreen === SCREEN_IDS.TRIPS_HOME ? "page" : "false"}"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
        </svg>
        <span>Trips</span>
      </button>

      <!-- 3. CONNECT -->
      <button 
        class="dock-item-btn ${activeScreen === SCREEN_IDS.CONNECT_HOME ? "active" : ""}" 
        data-screen="${SCREEN_IDS.CONNECT_HOME}"
        aria-label="Connect and Travel Buddies"
        aria-current="${activeScreen === SCREEN_IDS.CONNECT_HOME ? "page" : "false"}"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span>Connect</span>
      </button>

      <!-- 4. INBOX -->
      <button 
        class="dock-item-btn ${activeScreen === SCREEN_IDS.INBOX ? "active" : ""}" 
        data-screen="${SCREEN_IDS.INBOX}"
        aria-label="Inbox and Chats"
        aria-current="${activeScreen === SCREEN_IDS.INBOX ? "page" : "false"}"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        ${unreadMessages > 0 ? `<span class="dock-badge-counter">${unreadMessages}</span>` : ""}
        <span>Inbox</span>
      </button>

      <!-- 5. PROFILE -->
      <button 
        class="dock-item-btn ${activeScreen === SCREEN_IDS.PROFILE ? "active" : ""}" 
        data-screen="${SCREEN_IDS.PROFILE}"
        aria-label="Profile and Settings"
        aria-current="${activeScreen === SCREEN_IDS.PROFILE ? "page" : "false"}"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Profile</span>
      </button>
    `;

    dock.querySelectorAll("[data-screen]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetScreen = btn.dataset.screen;
        appState.setScreen(targetScreen);
      });
    });
  };

  appState.subscribe(() => {
    updateDockDOM();
  });

  updateDockDOM();
  return dock;
}
