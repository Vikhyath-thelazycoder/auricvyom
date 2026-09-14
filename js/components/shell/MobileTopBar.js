// AURICVISTA Mobile Top Bar Component
import { appState, SCREEN_IDS } from "../../state.js";

export function renderMobileTopBar() {
  const topBar = document.createElement("header");
  topBar.className = "mobile-top-bar";
  topBar.id = "mobile-header";

  const renderContent = () => {
    const { unreadNotifications } = appState.getState();

    topBar.innerHTML = `
      <div class="brand-logo-wrap" id="topbar-brand-home" role="button" tabindex="0" aria-label="AuricVista Home">
        <div class="brand-logo-mark">
          <span>AV</span>
        </div>
        <div class="brand-wordmark">
          AURIC<span>VISTA</span>
        </div>
      </div>

      <div class="top-bar-actions">
        <button class="top-action-btn" id="topbar-search-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>

        <button class="top-action-btn" id="topbar-notif-btn" aria-label="Notifications (${unreadNotifications} unread)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          ${unreadNotifications > 0 ? `<span class="action-badge-dot"></span>` : ""}
        </button>
      </div>
    `;

    topBar.querySelector("#topbar-brand-home")?.addEventListener("click", () => {
      appState.setScreen(SCREEN_IDS.EXPLORE_HOME);
    });

    topBar.querySelector("#topbar-search-btn")?.addEventListener("click", () => {
      appState.openModal("search");
    });

    topBar.querySelector("#topbar-notif-btn")?.addEventListener("click", () => {
      appState.showToast("You have 2 trip updates and 1 new match alert ✨");
    });
  };

  appState.subscribe(() => {
    // Only re-render if unreadNotifications changed to avoid destroying listeners unnecessarily
  });

  renderContent();
  return topBar;
}
