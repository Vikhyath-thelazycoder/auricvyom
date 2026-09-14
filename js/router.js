// AURICVISTA Client-Side Router & Deep Linking Engine
// Master Authority: Phase 2 Step 6, Step 15 & Step 29
// Zero-dependency URL Hash router supporting all 26+ PRD routes, parameter extraction & overlay-aware back navigation

import { appState, ROUTES } from "./state.js";

class Router {
  constructor() {
    this.routes = [];
    this.isNavigating = false;
    this._initRouteTable();
    this._bindEvents();
  }

  _initRouteTable() {
    // Register all PRD routes
    Object.values(ROUTES).forEach(pattern => {
      this.register(pattern);
    });
  }

  register(pattern) {
    // Convert pattern like '/stays/:id' to RegExp
    const paramNames = [];
    const regexPattern = pattern
      .replace(/:([a-zA-Z0-9_]+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return "([^\\/]+)";
      })
      .replace(/\//g, "\\/");

    const regex = new RegExp(`^${regexPattern}$`);
    this.routes.push({ pattern, regex, paramNames });
  }

  _bindEvents() {
    if (typeof window === "undefined") return;

    window.addEventListener("hashchange", () => {
      this._handleLocationChange();
    });

    // Intercept clicks on links with data-route or href starting with #/
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-route], a[href^='#/']");
      if (!link) return;

      const href = link.getAttribute("data-route") || link.getAttribute("href");
      if (href && href.startsWith("#/")) {
        e.preventDefault();
        const routePath = href.replace(/^#/, "");
        this.navigate(routePath);
      }
    });

    // Keyboard shortcuts: Cmd+K / Ctrl+K for search, Escape for closing overlays/back
    window.addEventListener("keydown", (e) => {
      // Cmd+K or Ctrl+K -> Global Search Overlay
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        appState.openSearchOverlay();
        return;
      }

      // Escape key -> Close active overlay or dismiss dropdown
      if (e.key === "Escape") {
        if (appState.hasActiveOverlay() || appState.getState().activeDropdown) {
          e.preventDefault();
          appState.closeAllOverlays();
        }
      }
    });
  }

  start() {
    this._handleLocationChange();
  }

  _getHashPath() {
    const hash = window.location.hash || "";
    if (!hash || hash === "#" || hash === "#/") {
      return ROUTES.EXPLORE;
    }
    return hash.replace(/^#/, "");
  }

  _handleLocationChange() {
    const rawPath = this._getHashPath();
    const [pathOnly, queryString] = rawPath.split("?");
    const match = this._matchRoute(pathOnly);

    // Simulate luxury slim progress transition
    appState.setLoading(true);
    
    setTimeout(() => {
      if (match) {
        appState.setRoute(match.route, match.params, {
          queryString
        });
      } else {
        // Fallback for unrecognized routes: navigate to Explore with toast
        console.warn(`Unrecognized route: ${pathOnly}. Fallback to /explore`);
        appState.setRoute(ROUTES.EXPLORE, {}, { replace: true });
        appState.showToast({
          type: "warning",
          message: `Route "${pathOnly}" not found. Showing Explore Home.`
        });
      }
      appState.setLoading(false);
    }, 120);
  }

  _matchRoute(path) {
    for (const route of this.routes) {
      const match = path.match(route.regex);
      if (match) {
        const params = {};
        route.paramNames.forEach((name, index) => {
          params[name] = decodeURIComponent(match[index + 1]);
        });
        return { route: route.pattern, rawPath: path, params };
      }
    }
    return null;
  }

  navigate(path, options = {}) {
    const formattedHash = `#${path.startsWith("/") ? path : "/" + path}`;
    if (window.location.hash === formattedHash) {
      // Re-trigger location change if same hash
      this._handleLocationChange();
      return;
    }

    if (options.replace) {
      const url = window.location.pathname + window.location.search + formattedHash;
      window.location.replace(url);
    } else {
      window.location.hash = formattedHash;
    }
  }

  back() {
    // If an overlay (modal, sheet, drawer, search) is open, close it first!
    if (appState.hasActiveOverlay()) {
      appState.closeAllOverlays();
      return;
    }

    // Otherwise navigate back in browser history
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.navigate(ROUTES.EXPLORE);
    }
  }
}

export const router = new Router();
