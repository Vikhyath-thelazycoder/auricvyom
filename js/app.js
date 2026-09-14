// AURICVISTA Main Application Entry & Coordinator
// Master Architecture: Mobile-First Luxury Travel & Social Discovery

import { appState, SCREEN_IDS } from "./state.js";
import { renderMobileTopBar } from "./components/shell/MobileTopBar.js";
import { renderMobileBottomNav } from "./components/shell/MobileBottomNav.js";
import { renderSearchModal } from "./components/shell/SearchModal.js";
import { renderDestinationModal } from "./components/shell/DestinationModal.js";
import { renderStayModal } from "./components/shell/StayModal.js";

import { renderExploreHomeScreen } from "./components/screens/ExploreHomeScreen.js";
import { renderTripsHomeScreen } from "./components/screens/TripsHomeScreen.js";
import { renderConnectHomeScreen } from "./components/screens/ConnectHomeScreen.js";
import { renderInboxScreen } from "./components/screens/InboxScreen.js";
import { renderProfileScreen } from "./components/screens/ProfileScreen.js";

class AuricVistaApp {
  constructor() {
    this.appRoot = document.getElementById("app-root");
    this.currentScreen = null;
    this.init();
  }

  init() {
    this.renderShell();
    this.bindState();
  }

  renderShell() {
    this.appRoot.innerHTML = `
      <!-- Mobile Top Navigation Header -->
      <div id="navbar-mount"></div>

      <!-- Main Dynamic Content Container -->
      <main class="app-main-content" id="main-content-mount" role="main"></main>

      <!-- Modals & Sheets Mount -->
      <div id="modals-mount"></div>

      <!-- Toast Feedback Mount -->
      <div id="toast-mount" style="position: fixed; bottom: calc(var(--mobile-nav-height) + var(--safe-bottom) + 16px); left: 50%; transform: translateX(-50%); z-index: 9999; pointer-events: none; width: max-content; max-width: 90vw;"></div>

      <!-- Canonical 5-Tab Mobile Bottom Navigation Dock -->
      <div id="mobile-dock-mount"></div>
    `;

    // Mount Header & Bottom Dock
    document.getElementById("navbar-mount").appendChild(renderMobileTopBar());
    document.getElementById("mobile-dock-mount").appendChild(renderMobileBottomNav());

    // Mount Modals
    const modalsMount = document.getElementById("modals-mount");
    modalsMount.appendChild(renderSearchModal());
    modalsMount.appendChild(renderDestinationModal());
    modalsMount.appendChild(renderStayModal());
  }

  bindState() {
    let lastScreen = null;

    appState.subscribe((state) => {
      if (state.activeScreen !== lastScreen) {
        lastScreen = state.activeScreen;
        this.renderScreen(state.activeScreen);
      }
      this.renderToast(state.toastMessage);
    });

    // Initial Screen Mount
    this.renderScreen(appState.getState().activeScreen);
  }

  renderScreen(screenId) {
    const mainMount = document.getElementById("main-content-mount");
    if (!mainMount) return;

    mainMount.innerHTML = "";

    switch (screenId) {
      case SCREEN_IDS.EXPLORE_HOME:
        mainMount.appendChild(renderExploreHomeScreen());
        break;
      case SCREEN_IDS.TRIPS_HOME:
        mainMount.appendChild(renderTripsHomeScreen());
        break;
      case SCREEN_IDS.CONNECT_HOME:
        mainMount.appendChild(renderConnectHomeScreen());
        break;
      case SCREEN_IDS.INBOX:
        mainMount.appendChild(renderInboxScreen());
        break;
      case SCREEN_IDS.PROFILE:
        mainMount.appendChild(renderProfileScreen());
        break;
      default:
        mainMount.appendChild(renderExploreHomeScreen());
        break;
    }
  }

  renderToast(msg) {
    const toastMount = document.getElementById("toast-mount");
    if (!toastMount) return;

    if (!msg) {
      toastMount.innerHTML = "";
      return;
    }

    toastMount.innerHTML = `
      <div style="background: rgba(14, 20, 30, 0.96); border: 1px solid var(--border-gold); border-radius: var(--radius-full); padding: 10px 20px; color: var(--gold-light); font-weight: 700; font-size: 0.85rem; box-shadow: var(--shadow-lg), var(--shadow-gold); backdrop-filter: blur(14px); text-align: center; animation: toastSlideUp 0.28s ease;">
        ${msg}
      </div>
    `;
  }
}

// Auto-boot on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  new AuricVistaApp();
});
