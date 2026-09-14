// AURICVISTA Desktop & Tablet Top Navigation Component
// Master Authority: prd/design.md §17 & Phase 2 Step 4
// Quiet Luxury Desktop Navigation Bar sharing semantic navigation model with mobile

import { appState, ROUTES } from "../../state.js";
import { router } from "../../router.js";
import { renderProfileDropdown } from "./ProfileDropdown.js";

export function renderDesktopTopNav() {
  const nav = document.createElement("header");
  nav.className = "desktop-top-nav";
  nav.id = "desktop-top-nav";
  nav.setAttribute("role", "banner");
  nav.setAttribute("aria-label", "Primary Desktop Navigation");

  const updateNavDOM = () => {
    const { currentRoute, unreadNotifications, authStatus, currentUser } = appState.getState();

    const isAuth = authStatus === "authenticated" && currentUser;

    const navLinks = [
      { label: "Explore", route: ROUTES.EXPLORE, icon: "🧭" },
      { label: "Stays", route: ROUTES.STAYS, icon: "🏡" },
      { label: "Trips", route: ROUTES.TRIPS, icon: "✈️" },
      { label: "Connect", route: ROUTES.CONNECT, icon: "💘" },
      { label: "Communities", route: ROUTES.GROUPS, icon: "👥" },
      { label: "AI Concierge", route: ROUTES.AI, icon: "✨" }
    ];

    nav.innerHTML = `
      <div class="desktop-nav-inner">
        <!-- Brand Wordmark & Monogram -->
        <div class="desktop-brand-wrap" id="desktop-brand-home" role="button" tabindex="0" aria-label="AuricVista Home">
          <div class="brand-logo-mark">
            <span>AV</span>
          </div>
          <div class="brand-wordmark">
            AURIC<span>VISTA</span>
          </div>
        </div>

        <!-- Center Nav Items -->
        <nav class="desktop-nav-links" role="navigation" aria-label="Main Navigation">
          ${navLinks.map(item => {
            const isActive = currentRoute === item.route || currentRoute.startsWith(item.route + "/");
            return `
              <a 
                href="#${item.route}" 
                class="desktop-nav-link ${isActive ? "active" : ""}" 
                data-route="#${item.route}"
                aria-current="${isActive ? "page" : "false"}"
              >
                <span>${item.label}</span>
              </a>
            `;
          }).join("")}
        </nav>

        <!-- Right Utilities & Actions -->
        <div class="desktop-nav-actions">
          <!-- Global Search Trigger with Keyboard Shortcut Hint -->
          <button class="desktop-search-trigger" id="desktop-search-btn" aria-label="Search destinations and stays (Command K)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span class="search-placeholder-text">Search Karnataka...</span>
            <kbd class="shortcut-kbd">⌘K</kbd>
          </button>

          <!-- Region / Currency Pill -->
          <div class="currency-pill" role="status" aria-label="Currency INR">
            <span class="flag-icon">🇮🇳</span>
            <span>INR (₹)</span>
          </div>

          <!-- Notification Bell -->
          <button class="desktop-icon-btn" id="desktop-notif-btn" aria-label="Notifications (${unreadNotifications} unread)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            ${unreadNotifications > 0 ? `
              <span class="notif-badge-count">${unreadNotifications}</span>
            ` : ""}
          </button>

          <!-- Profile / Sign In Dropdown Trigger -->
          <div class="desktop-profile-wrapper" id="desktop-profile-container">
            ${isAuth ? `
              <button 
                class="desktop-profile-btn" 
                id="desktop-profile-btn" 
                aria-expanded="false" 
                aria-haspopup="true"
                aria-label="User account menu for ${currentUser.name}"
              >
                <img src="${currentUser.avatar}" alt="${currentUser.name}" class="profile-avatar-img" />
                <span class="profile-name-text">${currentUser.name.split(" ")[0]}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
            ` : `
              <button class="desktop-signin-btn" id="desktop-signin-btn">
                Sign In
              </button>
            `}
            <!-- Dropdown Mount Point -->
            <div id="desktop-dropdown-mount"></div>
          </div>
        </div>
      </div>
    `;

    // Self-mount ProfileDropdown inside desktop-dropdown-mount
    nav.querySelector("#desktop-dropdown-mount")?.appendChild(renderProfileDropdown());

    // Brand click
    nav.querySelector("#desktop-brand-home")?.addEventListener("click", () => {
      router.navigate(ROUTES.EXPLORE);
    });

    // Search button click
    nav.querySelector("#desktop-search-btn")?.addEventListener("click", () => {
      appState.openSearchOverlay();
    });

    // Notification click -> Open notifications drawer/sheet
    nav.querySelector("#desktop-notif-btn")?.addEventListener("click", () => {
      appState.openDrawer("notifications");
    });

    // Profile click
    nav.querySelector("#desktop-profile-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      appState.toggleDropdown("profile");
    });

    // Sign in click
    nav.querySelector("#desktop-signin-btn")?.addEventListener("click", () => {
      appState.toggleAuth();
    });
  };

  appState.subscribe(() => {
    updateNavDOM();
  });

  updateNavDOM();
  return nav;
}
