// AURICVISTA Desktop Profile Dropdown Component
// Master Authority: Phase 2 Step 4 & Step 14
// Floating account menu with profile summary, navigation links, and auth switcher

import { appState, ROUTES } from "../../state.js";
import { router } from "../../router.js";

export function renderProfileDropdown() {
  const container = document.createElement("div");
  container.className = "profile-dropdown-container";
  container.id = "profile-dropdown-menu";

  const updateDropdownDOM = () => {
    const { activeDropdown, authStatus, currentUser } = appState.getState();

    if (activeDropdown !== "profile") {
      container.innerHTML = "";
      return;
    }

    const isAuth = authStatus === "authenticated" && currentUser;

    container.innerHTML = `
      <div 
        class="profile-dropdown-card" 
        role="menu" 
        aria-orientation="vertical" 
        aria-labelledby="desktop-profile-btn"
      >
        <!-- Account Header Card -->
        <div class="dropdown-user-header">
          ${isAuth ? `
            <img src="${currentUser.avatar}" alt="${currentUser.name}" class="dropdown-avatar" />
            <div class="dropdown-user-info">
              <div class="dropdown-name-row">
                <span class="user-fullname">${currentUser.name}</span>
                ${currentUser.isVerified ? `<span class="user-badge-verified">✓</span>` : ""}
              </div>
              <span class="user-handle">${currentUser.username}</span>
              <span class="user-membership-tier">${currentUser.membershipTier}</span>
            </div>
          ` : `
            <div class="dropdown-user-info">
              <span class="user-fullname">Guest Explorer</span>
              <span class="user-handle">Explore mode active</span>
            </div>
          `}
        </div>

        <div class="dropdown-divider"></div>

        <!-- Quick Links -->
        <div class="dropdown-nav-items">
          <a href="#${ROUTES.PROFILE}" class="dropdown-item" role="menuitem" data-route="#${ROUTES.PROFILE}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>My Profile & KYC</span>
          </a>

          <a href="#${ROUTES.TRIPS}" class="dropdown-item" role="menuitem" data-route="#${ROUTES.TRIPS}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
            </svg>
            <span>My Journeys & Bookings</span>
          </a>

          <a href="#${ROUTES.WALLET}" class="dropdown-item" role="menuitem" data-route="#${ROUTES.WALLET}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <span>Auric Wallet (₹${isAuth ? currentUser.walletBalanceINR.toLocaleString("en-IN") : "0"})</span>
          </a>

          <a href="#${ROUTES.SAFETY}" class="dropdown-item" role="menuitem" data-route="#${ROUTES.SAFETY}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Safety Center & Emergency SOS</span>
          </a>

          <a href="#${ROUTES.SETTINGS}" class="dropdown-item" role="menuitem" data-route="#${ROUTES.SETTINGS}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            <span>Preferences & Settings</span>
          </a>
        </div>

        <div class="dropdown-divider"></div>

        <!-- Auth State Switcher Action -->
        <div class="dropdown-footer-actions">
          <button class="dropdown-auth-toggle-btn" id="dropdown-toggle-auth-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>${isAuth ? "Sign Out (Switch to Guest)" : "Sign In (Demo Account)"}</span>
          </button>
        </div>
      </div>
    `;

    // Item click navigates and closes
    container.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", () => {
        appState.closeDropdown();
      });
    });

    container.querySelector("#dropdown-toggle-auth-btn")?.addEventListener("click", () => {
      appState.closeDropdown();
      appState.toggleAuth();
    });
  };

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!container.contains(e.target) && !e.target.closest("#desktop-profile-btn")) {
      appState.closeDropdown();
    }
  });

  appState.subscribe(() => {
    updateDropdownDOM();
  });

  updateDropdownDOM();
  return container;
}
