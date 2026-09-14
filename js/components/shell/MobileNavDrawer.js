// AURICVISTA Mobile Navigation Drawer Component
// Master Authority: Phase 2 Step 10 & Step 15
// Accessible slide-in navigation drawer with PRD categories, swipe dismissal, focus trap, and auth toggle

import { appState, ROUTES } from "../../state.js";
import { router } from "../../router.js";

export function renderMobileNavDrawer() {
  const container = document.createElement("div");
  container.className = "mobile-drawer-root";
  container.id = "mobile-drawer-root";

  let focusTrapHandler = null;

  const updateDrawerDOM = () => {
    const { activeDrawer, authStatus, currentUser, currentRoute } = appState.getState();

    // Clean up focus trap
    if (focusTrapHandler) {
      document.removeEventListener("keydown", focusTrapHandler);
      focusTrapHandler = null;
    }

    if (activeDrawer !== "mainNav") {
      container.innerHTML = "";
      return;
    }

    const isAuth = authStatus === "authenticated" && currentUser;

    container.innerHTML = `
      <div class="drawer-backdrop" id="drawer-backdrop-layer">
        <aside 
          class="mobile-nav-drawer" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="drawer-user-name"
          tabindex="-1"
          id="main-nav-drawer"
        >
          <!-- Drawer Header with User Card & Close -->
          <div class="drawer-header">
            <div class="drawer-user-card" id="drawer-user-card">
              ${isAuth ? `
                <img src="${currentUser.avatar}" alt="${currentUser.name}" class="drawer-avatar" />
                <div class="drawer-user-meta">
                  <div class="drawer-user-row">
                    <span class="drawer-user-name" id="drawer-user-name">${currentUser.name}</span>
                    <span class="user-badge-verified">✓</span>
                  </div>
                  <span class="drawer-user-handle">${currentUser.username}</span>
                  <div class="drawer-kyc-pill">${currentUser.kycLevel}</div>
                </div>
              ` : `
                <div class="drawer-guest-avatar">
                  <span>?</span>
                </div>
                <div class="drawer-user-meta">
                  <span class="drawer-user-name" id="drawer-user-name">Guest Explorer</span>
                  <span class="drawer-user-handle">Preview Mode</span>
                  <button class="drawer-quick-signin-btn" id="drawer-signin-btn">Sign In to Sync</button>
                </div>
              `}
            </div>

            <button class="drawer-close-btn" id="drawer-close-icon-btn" aria-label="Close navigation menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- Drawer Navigation Scrollable Sections -->
          <div class="drawer-nav-sections" id="drawer-scrollable-body">
            <!-- 1. TRAVEL SECTION -->
            <div class="drawer-section">
              <div class="drawer-section-heading">EXPLORE & STAYS</div>
              <a href="#${ROUTES.EXPLORE}" class="drawer-link ${currentRoute === ROUTES.EXPLORE ? "active" : ""}" data-route="#${ROUTES.EXPLORE}">
                <span class="drawer-link-icon">🧭</span>
                <span class="drawer-link-label">Explore Home</span>
              </a>
              <a href="#${ROUTES.STAYS}" class="drawer-link ${currentRoute.startsWith(ROUTES.STAYS) ? "active" : ""}" data-route="#${ROUTES.STAYS}">
                <span class="drawer-link-icon">🏡</span>
                <span class="drawer-link-label">Bespoke Stays & Estates</span>
              </a>
              <a href="#${ROUTES.DESTINATIONS}" class="drawer-link ${currentRoute.startsWith(ROUTES.DESTINATIONS) ? "active" : ""}" data-route="#${ROUTES.DESTINATIONS}">
                <span class="drawer-link-icon">🗺️</span>
                <span class="drawer-link-label">Curated Destinations</span>
              </a>
            </div>

            <!-- 2. CONNECT SECTION -->
            <div class="drawer-section">
              <div class="drawer-section-heading">CONNECT & SOCIAL</div>
              <a href="#${ROUTES.CONNECT_BUDDIES}" class="drawer-link ${currentRoute === ROUTES.CONNECT_BUDDIES ? "active" : ""}" data-route="#${ROUTES.CONNECT_BUDDIES}">
                <span class="drawer-link-icon">🎒</span>
                <span class="drawer-link-label">Travel Buddies</span>
              </a>
              <a href="#${ROUTES.CONNECT_DATING}" class="drawer-link ${currentRoute === ROUTES.CONNECT_DATING ? "active" : ""}" data-route="#${ROUTES.CONNECT_DATING}">
                <span class="drawer-link-icon">💘</span>
                <span class="drawer-link-label">Travel Dating</span>
                <span class="drawer-pill-accent">Verified</span>
              </a>
              <a href="#${ROUTES.CONNECT_FLATMATES}" class="drawer-link ${currentRoute === ROUTES.CONNECT_FLATMATES ? "active" : ""}" data-route="#${ROUTES.CONNECT_FLATMATES}">
                <span class="drawer-link-icon">🛋️</span>
                <span class="drawer-link-label">Flatmate Discovery</span>
              </a>
              <a href="#${ROUTES.GROUPS}" class="drawer-link ${currentRoute.startsWith(ROUTES.GROUPS) ? "active" : ""}" data-route="#${ROUTES.GROUPS}">
                <span class="drawer-link-icon">👥</span>
                <span class="drawer-link-label">Community Squads</span>
              </a>
            </div>

            <!-- 3. JOURNEYS SECTION -->
            <div class="drawer-section">
              <div class="drawer-section-heading">JOURNEYS & CONCIERGE</div>
              <a href="#${ROUTES.TRIPS}" class="drawer-link ${currentRoute === ROUTES.TRIPS ? "active" : ""}" data-route="#${ROUTES.TRIPS}">
                <span class="drawer-link-icon">✈️</span>
                <span class="drawer-link-label">My Journeys</span>
              </a>
              <a href="#${ROUTES.TRIPS_CREATE}" class="drawer-link ${currentRoute === ROUTES.TRIPS_CREATE ? "active" : ""}" data-route="#${ROUTES.TRIPS_CREATE}">
                <span class="drawer-link-icon">✨</span>
                <span class="drawer-link-label">AI Itinerary Planner</span>
              </a>
              <a href="#${ROUTES.AI}" class="drawer-link ${currentRoute === ROUTES.AI ? "active" : ""}" data-route="#${ROUTES.AI}">
                <span class="drawer-link-icon">🤖</span>
                <span class="drawer-link-label">Auric Concierge Chat</span>
              </a>
            </div>

            <!-- 4. FINANCE & SAFETY -->
            <div class="drawer-section">
              <div class="drawer-section-heading">FINANCE & SAFETY</div>
              <a href="#${ROUTES.WALLET}" class="drawer-link ${currentRoute === ROUTES.WALLET ? "active" : ""}" data-route="#${ROUTES.WALLET}">
                <span class="drawer-link-icon">💳</span>
                <span class="drawer-link-label">Auric Wallet & Splits</span>
                ${isAuth ? `<span class="drawer-pill-gold">₹${currentUser.walletBalanceINR.toLocaleString("en-IN")}</span>` : ""}
              </a>
              <a href="#${ROUTES.SAFETY}" class="drawer-link ${currentRoute === ROUTES.SAFETY ? "active" : ""}" data-route="#${ROUTES.SAFETY}">
                <span class="drawer-link-icon">🛡️</span>
                <span class="drawer-link-label">Safety Center & SOS</span>
                <span class="drawer-pill-danger">24/7 Monitored</span>
              </a>
            </div>

            <!-- 5. ACCOUNT & PREFERENCES -->
            <div class="drawer-section">
              <div class="drawer-section-heading">ACCOUNT & SETTINGS</div>
              <a href="#${ROUTES.PROFILE}" class="drawer-link ${currentRoute === ROUTES.PROFILE ? "active" : ""}" data-route="#${ROUTES.PROFILE}">
                <span class="drawer-link-icon">👤</span>
                <span class="drawer-link-label">Profile & Badges</span>
              </a>
              <a href="#${ROUTES.VERIFICATION}" class="drawer-link ${currentRoute === ROUTES.VERIFICATION ? "active" : ""}" data-route="#${ROUTES.VERIFICATION}">
                <span class="drawer-link-icon">🪪</span>
                <span class="drawer-link-label">KYC Government Verification</span>
              </a>
              <a href="#${ROUTES.NOTIFICATIONS}" class="drawer-link ${currentRoute === ROUTES.NOTIFICATIONS ? "active" : ""}" data-route="#${ROUTES.NOTIFICATIONS}">
                <span class="drawer-link-icon">🔔</span>
                <span class="drawer-link-label">Notifications</span>
              </a>
              <a href="#${ROUTES.SETTINGS}" class="drawer-link ${currentRoute === ROUTES.SETTINGS ? "active" : ""}" data-route="#${ROUTES.SETTINGS}">
                <span class="drawer-link-icon">⚙️</span>
                <span class="drawer-link-label">Preferences & Privacy</span>
              </a>
              <a href="#${ROUTES.SUPPORT}" class="drawer-link ${currentRoute === ROUTES.SUPPORT ? "active" : ""}" data-route="#${ROUTES.SUPPORT}">
                <span class="drawer-link-icon">💬</span>
                <span class="drawer-link-label">Help & Concierge Support</span>
              </a>
            </div>
          </div>

          <!-- Drawer Footer with Auth Toggle & Version -->
          <div class="drawer-footer">
            <button class="drawer-auth-btn" id="drawer-auth-mode-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>${isAuth ? "Sign Out (Switch to Guest)" : "Sign In with Demo Account"}</span>
            </button>
            <div class="drawer-version-tag">AuricVista v2.1.0 • Karnataka Luxury Travel</div>
          </div>
        </aside>
      </div>
    `;

    const drawer = container.querySelector(".mobile-nav-drawer");
    const backdrop = container.querySelector("#drawer-backdrop-layer");
    const closeBtn = container.querySelector("#drawer-close-icon-btn");
    const authBtn = container.querySelector("#drawer-auth-mode-btn");
    const signinBtn = container.querySelector("#drawer-signin-btn");

    const closeDrawer = () => {
      appState.closeDrawer();
    };

    closeBtn?.addEventListener("click", closeDrawer);
    backdrop?.addEventListener("click", (e) => {
      if (e.target === backdrop) closeDrawer();
    });

    // Handle link clicks: navigate and close drawer
    container.querySelectorAll(".drawer-link").forEach((link) => {
      link.addEventListener("click", () => {
        closeDrawer();
      });
    });

    authBtn?.addEventListener("click", () => {
      closeDrawer();
      appState.toggleAuth();
    });

    signinBtn?.addEventListener("click", () => {
      closeDrawer();
      appState.toggleAuth();
    });

    // Touch swipe-left to close gesture
    let touchStartX = 0;
    let touchCurrentX = 0;

    drawer?.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    drawer?.addEventListener("touchmove", (e) => {
      touchCurrentX = e.touches[0].clientX;
      const deltaX = touchCurrentX - touchStartX;
      if (deltaX < 0 && drawer) {
        drawer.style.transform = `translateX(${deltaX}px)`;
      }
    }, { passive: true });

    drawer?.addEventListener("touchend", () => {
      const deltaX = touchCurrentX - touchStartX;
      if (deltaX < -80) {
        closeDrawer();
      } else if (drawer) {
        drawer.style.transform = "";
      }
      touchStartX = 0;
      touchCurrentX = 0;
    });

    // Focus Management
    const focusableElements = drawer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 50);
    }

    focusTrapHandler = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", focusTrapHandler);
  };

  appState.subscribe(() => {
    updateDrawerDOM();
  });

  updateDrawerDOM();
  return container;
}
