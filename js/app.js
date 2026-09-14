// AURICVISTA Main Application Shell Coordinator
// Master Authority: Phase 2 Primary Deliverables & Architecture Hierarchy
// Integrates: DesktopTopNav, MobileTopBar, MobileBottomNav, MobileNavDrawer,
// NotificationsDrawer, GlobalSearchOverlay, Reusable Bottom Sheet & Modal Primitives,
// Global Loading Bar, Offline Banner, Toast Queue, and Router.

import { appState, ROUTES, SCREEN_IDS } from "./state.js";
import { router } from "./router.js";

import { renderDesktopTopNav } from "./components/shell/DesktopTopNav.js";
import { renderMobileTopBar } from "./components/shell/MobileTopBar.js";
import { renderMobileBottomNav } from "./components/shell/MobileBottomNav.js";
import { renderMobileNavDrawer } from "./components/shell/MobileNavDrawer.js";
import { renderNotificationsDrawer } from "./components/shell/NotificationsDrawer.js";
import { renderGlobalSearchOverlay } from "./components/shell/GlobalSearchOverlay.js";
import { renderRoutePlaceholder } from "./components/shell/RoutePlaceholder.js";

import { renderDestinationModal } from "./components/shell/DestinationModal.js";
import { renderStayModal } from "./components/shell/StayModal.js";

import { renderAuricProgressBar } from "./components/primitives/AuricProgressBar.js";
import { renderAuricOfflineBanner } from "./components/primitives/AuricOfflineBanner.js";
import { renderAuricModal } from "./components/primitives/AuricModal.js";
import { renderAuricBottomSheet } from "./components/primitives/AuricBottomSheet.js";
import { renderAuricToastStack } from "./components/primitives/AuricToast.js";
import { renderAuricErrorBoundary } from "./components/primitives/AuricErrorBoundary.js";

// Phase 1 Screens
import { renderExploreHomeScreen } from "./components/screens/ExploreHomeScreen.js";
import { renderTripsHomeScreen } from "./components/screens/TripsHomeScreen.js";
import { renderConnectHomeScreen } from "./components/screens/ConnectHomeScreen.js";
import { renderInboxScreen } from "./components/screens/InboxScreen.js";
import { renderProfileScreen } from "./components/screens/ProfileScreen.js";

class AuricVistaShell {
  constructor() {
    this.appRoot = document.getElementById("app-root");
    this.currentRenderedRoute = null;
    this.init();
  }

  init() {
    this.renderApplicationShell();
    this.bindState();
    // Start router after shell mounts
    router.start();
  }

  renderApplicationShell() {
    this.appRoot.innerHTML = `
      <!-- Top Slim Progress Bar Indicator -->
      <div id="top-progress-mount"></div>

      <!-- Offline & Degraded Connectivity Banner -->
      <div id="offline-banner-mount"></div>

      <!-- Desktop & Tablet Navigation Bar (hidden on <= 768px via CSS) -->
      <div id="desktop-nav-mount"></div>

      <!-- Mobile Top Bar (hidden on >= 769px via CSS) -->
      <div id="mobile-topbar-mount"></div>

      <!-- Main Application Content Viewport -->
      <main class="app-main-content" id="main-content-mount" role="main" tabindex="-1"></main>

      <!-- Canonical Mobile 5-Tab Bottom Dock (hidden on >= 769px via CSS) -->
      <div id="mobile-dock-mount"></div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-drawer-mount"></div>

      <!-- Notifications Panel Drawer -->
      <div id="notifications-drawer-mount"></div>

      <!-- Global Search Shell Overlay -->
      <div id="search-overlay-mount"></div>

      <!-- Reusable Accessible Modal Primitive Mount -->
      <div id="reusable-modal-mount"></div>

      <!-- Reusable Touch Bottom Sheet Primitive Mount -->
      <div id="reusable-sheet-mount"></div>

      <!-- Legacy Card Detail Modals (from Phase 1) -->
      <div id="legacy-modals-mount"></div>

      <!-- Toast Feedback Stack -->
      <div id="toast-stack-mount"></div>
    `;

    // 1. Mount Progress & Offline Banner
    document.getElementById("top-progress-mount").appendChild(renderAuricProgressBar());
    document.getElementById("offline-banner-mount").appendChild(renderAuricOfflineBanner());

    // 2. Mount Desktop TopNav
    const desktopNavMount = document.getElementById("desktop-nav-mount");
    desktopNavMount.appendChild(renderDesktopTopNav());

    // 3. Mount Mobile Header & Dock
    document.getElementById("mobile-topbar-mount").appendChild(renderMobileTopBar());
    document.getElementById("mobile-dock-mount").appendChild(renderMobileBottomNav());

    // 4. Mount Drawers & Search Overlay
    document.getElementById("mobile-drawer-mount").appendChild(renderMobileNavDrawer());
    document.getElementById("notifications-drawer-mount").appendChild(renderNotificationsDrawer());
    document.getElementById("search-overlay-mount").appendChild(renderGlobalSearchOverlay());

    // 5. Mount Reusable Primitives
    document.getElementById("reusable-modal-mount").appendChild(renderAuricModal());
    document.getElementById("reusable-sheet-mount").appendChild(renderAuricBottomSheet());

    // 6. Mount Legacy Card Modals
    const legacyMount = document.getElementById("legacy-modals-mount");
    legacyMount.appendChild(renderDestinationModal());
    legacyMount.appendChild(renderStayModal());

    // 7. Mount Toast System
    document.getElementById("toast-stack-mount").appendChild(renderAuricToastStack());
  }

  bindState() {
    appState.subscribe((state) => {
      // Re-render route view if route changed or error state toggled
      const routeKey = `${state.currentRoute}|${JSON.stringify(state.routeParams)}|${state.globalError ? "error" : "ok"}`;
      if (this.currentRenderedRoute !== routeKey) {
        this.currentRenderedRoute = routeKey;
        this.renderRouteView(state.currentRoute, state.routeParams, state.globalError);
      }
    });

    // Initial View Render
    const { currentRoute, routeParams, globalError } = appState.getState();
    this.renderRouteView(currentRoute, routeParams, globalError);
  }

  renderRouteView(route, params = {}, error = null) {
    const mount = document.getElementById("main-content-mount");
    if (!mount) return;

    mount.innerHTML = "";

    // If an application error is active, display Error Boundary
    if (error) {
      mount.appendChild(renderAuricErrorBoundary(error));
      return;
    }

    // Dynamic Route Dispatcher
    try {
      if (route === ROUTES.EXPLORE || route === "/") {
        mount.appendChild(renderExploreHomeScreen());
      } else if (route === ROUTES.TRIPS) {
        mount.appendChild(renderTripsHomeScreen());
      } else if (route === ROUTES.CONNECT) {
        mount.appendChild(renderConnectHomeScreen());
      } else if (route === ROUTES.INBOX) {
        mount.appendChild(renderInboxScreen());
      } else if (route === ROUTES.PROFILE) {
        mount.appendChild(renderProfileScreen());
      } else {
        // All other registered PRD routes render standardized architectural placeholder
        mount.appendChild(renderRoutePlaceholder(route, params));
      }
    } catch (err) {
      console.error("Route rendering error:", err);
      mount.appendChild(renderAuricErrorBoundary({
        title: "Screen Rendering Failed",
        message: err.message || "An unexpected error occurred while loading this view.",
        details: err.stack
      }));
    }
  }
}

// Auto-boot on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  new AuricVistaShell();
});
