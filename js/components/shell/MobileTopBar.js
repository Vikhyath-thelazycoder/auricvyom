// AURICVISTA Mobile Top Bar Component (Multi-Variant Architecture)
// Master Authority: Phase 2 Step 5 & Step 15
// Supports: Standard Header, Back+Title Header, Transparent Cinematic Header, and Contextual Action Header

import { appState, ROUTES } from "../../state.js";
import { router } from "../../router.js";

export function renderMobileTopBar() {
  const topBar = document.createElement("header");
  topBar.className = "mobile-top-bar";
  topBar.id = "mobile-header";
  topBar.setAttribute("role", "banner");
  topBar.setAttribute("aria-label", "Mobile Header");

  const updateHeaderDOM = () => {
    const {
      currentRoute,
      headerVariant,
      headerTitle,
      headerSubtitle,
      unreadNotifications
    } = appState.getState();

    // Determine variant automatically if route is a sub-page
    const isSubPage = currentRoute !== ROUTES.EXPLORE &&
      currentRoute !== ROUTES.TRIPS &&
      currentRoute !== ROUTES.CONNECT &&
      currentRoute !== ROUTES.INBOX &&
      currentRoute !== ROUTES.PROFILE;

    const activeVariant = isSubPage ? (headerVariant === "standard" ? "back_title" : headerVariant) : headerVariant;

    // Apply header classes
    topBar.className = `mobile-top-bar header-variant-${activeVariant}`;

    if (activeVariant === "back_title") {
      // 1. Back + Title Header Variant
      const displayTitle = getRouteTitle(currentRoute) || headerTitle;
      topBar.innerHTML = `
        <div class="header-back-title-wrap">
          <button class="top-action-btn" id="mobile-back-btn" aria-label="Go back to previous screen">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
          
          <div class="header-titles-col">
            <h1 class="header-main-title">${displayTitle}</h1>
            ${headerSubtitle ? `<span class="header-sub-title">${headerSubtitle}</span>` : ""}
          </div>
        </div>

        <div class="top-bar-actions">
          <button class="top-action-btn" id="mobile-search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          <button class="top-action-btn" id="mobile-drawer-btn" aria-label="Open navigation menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      `;

      topBar.querySelector("#mobile-back-btn")?.addEventListener("click", () => {
        router.back();
      });
    } else {
      // 2. Standard Page Header Variant (with Drawer Menu Trigger & Monogram)
      topBar.innerHTML = `
        <div class="header-left-cluster">
          <button class="top-action-btn" id="mobile-drawer-btn" aria-label="Open main navigation menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <div class="brand-logo-wrap" id="topbar-brand-home" role="button" tabindex="0" aria-label="AuricVista Home">
            <div class="brand-logo-mark">
              <span>AV</span>
            </div>
            <div class="brand-wordmark">
              AURIC<span>VISTA</span>
            </div>
          </div>
        </div>

        <div class="top-bar-actions">
          <button class="top-action-btn" id="mobile-search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          <button class="top-action-btn" id="mobile-notif-btn" aria-label="Notifications (${unreadNotifications} unread)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            ${unreadNotifications > 0 ? `<span class="action-badge-dot"></span>` : ""}
          </button>
        </div>
      `;

      topBar.querySelector("#topbar-brand-home")?.addEventListener("click", () => {
        router.navigate(ROUTES.EXPLORE);
      });

      topBar.querySelector("#mobile-notif-btn")?.addEventListener("click", () => {
        appState.openDrawer("notifications");
      });
    }

    // Shared actions for both variants
    topBar.querySelector("#mobile-search-btn")?.addEventListener("click", () => {
      appState.openSearchOverlay();
    });

    topBar.querySelector("#mobile-drawer-btn")?.addEventListener("click", () => {
      appState.openDrawer("mainNav");
    });
  };

  appState.subscribe(() => {
    updateHeaderDOM();
  });

  updateHeaderDOM();
  return topBar;
}

function getRouteTitle(route) {
  if (route.startsWith("/stays/")) return "Stay Details";
  if (route.startsWith("/stays")) return "Bespoke Stays";
  if (route.startsWith("/destinations")) return "Destinations";
  if (route.startsWith("/trips/create")) return "Plan Journey";
  if (route.startsWith("/trips/")) return "Trip Details";
  if (route.startsWith("/connect/travel-buddies")) return "Travel Buddies";
  if (route.startsWith("/connect/dating")) return "Travel Dating";
  if (route.startsWith("/connect/flatmates")) return "Flatmate Discovery";
  if (route.startsWith("/groups/")) return "Community Squad";
  if (route.startsWith("/groups")) return "Communities";
  if (route.startsWith("/chat")) return "Direct Chat";
  if (route.startsWith("/ai")) return "Auric AI Concierge";
  if (route.startsWith("/wallet")) return "Auric Wallet & Splits";
  if (route.startsWith("/safety")) return "Safety & Emergency SOS";
  if (route.startsWith("/verification")) return "KYC Verification";
  if (route.startsWith("/notifications")) return "Notifications";
  if (route.startsWith("/settings")) return "Settings";
  if (route.startsWith("/support")) return "Help & Support";
  if (route.startsWith("/auth")) return "Authentication";
  if (route.startsWith("/onboarding")) return "Welcome to AuricVista";
  if (route.startsWith("/partner")) return "Host / Partner Portal";
  if (route.startsWith("/admin")) return "Administrative Console";
  return null;
}
