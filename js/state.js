// AURICVISTA Production Reactive State Manager & Screen/Route Registry
// Master Authority: prd/design.md, Frontend PRD & Phase 2 Architecture Specification

export const SCREEN_IDS = {
  EXPLORE_HOME: "EXPLORE_HOME",
  TRIPS_HOME: "TRIPS_HOME",
  CONNECT_HOME: "CONNECT_HOME",
  INBOX: "INBOX",
  PROFILE: "PROFILE",
  DESTINATION_DETAIL: "DESTINATION_DETAIL",
  STAY_DETAIL: "STAY_DETAIL",
  AI_ASSISTANT: "AI_ASSISTANT",
  SOS: "SOS"
};

// All 26+ canonical route paths mandated by Phase 2 Step 6
export const ROUTES = {
  EXPLORE: "/explore",
  SEARCH: "/search",
  DESTINATIONS: "/destinations",
  STAYS: "/stays",
  STAY_DETAIL: "/stays/:id",
  TRIPS: "/trips",
  TRIPS_CREATE: "/trips/create",
  TRIP_DETAIL: "/trips/:id",
  CONNECT: "/connect",
  CONNECT_BUDDIES: "/connect/travel-buddies",
  CONNECT_DATING: "/connect/dating",
  CONNECT_FLATMATES: "/connect/flatmates",
  GROUPS: "/groups",
  GROUP_DETAIL: "/groups/:id",
  CHAT: "/chat",
  INBOX: "/inbox",
  AI: "/ai",
  WALLET: "/wallet",
  SAFETY: "/safety",
  PROFILE: "/profile",
  VERIFICATION: "/verification",
  NOTIFICATIONS: "/notifications",
  SETTINGS: "/settings",
  SUPPORT: "/support",
  AUTH: "/auth",
  ONBOARDING: "/onboarding",
  PARTNER: "/partner",
  ADMIN: "/admin"
};

class StateManager {
  constructor() {
    this.state = {
      // Routing & History
      currentRoute: ROUTES.EXPLORE,
      routeParams: {},
      historyStack: [ROUTES.EXPLORE],
      activeScreen: SCREEN_IDS.EXPLORE_HOME,

      // Header System State
      headerVariant: "standard", // 'standard' | 'back_title' | 'transparent' | 'contextual'
      headerTitle: "AURICVISTA",
      headerSubtitle: null,
      headerBackRoute: null,
      headerActions: [],

      // Overlays Stack
      activeDrawer: null, // 'mainNav' | 'notifications' | null
      activeSheet: null,  // { id, title, subtitle, renderContent, actions } | null
      activeModal: null,  // { id, title, message, variant: 'info'|'confirm'|'destructive'|'auth', onConfirm, onCancel } | null
      activeDropdown: null, // 'profile' | 'currency' | null
      searchOverlayOpen: false,
      lastFocusedElement: null,

      // Feedback & System Health
      toastQueue: [],
      isLoadingRoute: false,
      isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
      isDegraded: false,
      globalError: null, // { title, message, retryHandler }

      // Domain Search & Discovery Filter States
      searchQuery: "",
      recentSearches: ["Coorg coffee estates", "Kabini jungle safari", "Hampi heritage villas", "Gokarna beach cottages"],
      stayCategoryFilter: "all",
      currentSocialMode: "buddy", // 'buddy' | 'dating' | 'flatmate'
      wishlist: ["stay-hosteller-coorg", "stay-kabini-river-lodge"],

      // Authentication State (Consuming backend-authoritative session boundary)
      authStatus: "authenticated", // 'authenticated' | 'guest'
      currentUser: {
        id: "usr-ketan-sharma",
        name: "Ketan Sharma",
        username: "@ketan_sharma",
        email: "ketan.sharma@auricvista.com",
        location: "Bengaluru, India",
        title: "Explorer | Wildlife Photographer | Heritage Trekker",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        isVerified: true,
        kycLevel: "Tier 2 — Govt ID Verified",
        membershipTier: "Auric Vista Gold",
        tripsCount: 12,
        followersCount: 230,
        followingCount: 180,
        walletBalanceINR: 24500
      },

      // Notifications System
      unreadNotifications: 2,
      unreadMessages: 1,
      notifications: [
        {
          id: "notif-1",
          type: "trip",
          title: "Kabini Safari Permit Confirmed",
          message: "Your Zone B morning safari permit for Oct 24 has been issued by Karnataka Forest Dept.",
          time: "10m ago",
          read: false,
          link: "/trips"
        },
        {
          id: "notif-2",
          type: "social",
          title: "New Travel Buddy Match!",
          message: "Ananya Rao also wants to explore Coorg coffee plantations next weekend.",
          time: "1h ago",
          read: false,
          link: "/connect"
        },
        {
          id: "notif-3",
          type: "safety",
          title: "Safety Check-in Verified",
          message: "Your emergency contacts list was synced with Auric Vista 24/7 Concierge.",
          time: "Yesterday",
          read: true,
          link: "/safety"
        }
      ]
    };

    this.listeners = new Set();
    this._initNetworkListeners();
  }

  _initNetworkListeners() {
    if (typeof window !== "undefined") {
      window.addEventListener("online", () => {
        this.setState({ isOnline: true });
        this.showToast({
          type: "success",
          message: "Back online. Real-time sync restored."
        });
      });

      window.addEventListener("offline", () => {
        this.setState({ isOnline: false });
        this.showToast({
          type: "warning",
          message: "You are offline. Showing cached preview."
        });
      });
    }
  }

  getState() {
    return this.state;
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error("State listener error:", err);
      }
    }
  }

  // --- ROUTING ACTIONS ---
  setRoute(routePath, params = {}, options = {}) {
    const isDifferent = this.state.currentRoute !== routePath;
    const historyStack = options.replace
      ? [...this.state.historyStack.slice(0, -1), routePath]
      : [...this.state.historyStack, routePath];

    // Determine legacy activeScreen mapping for backward compatibility with Phase 1 components
    let screen = SCREEN_IDS.EXPLORE_HOME;
    if (routePath.startsWith(ROUTES.TRIPS)) screen = SCREEN_IDS.TRIPS_HOME;
    else if (routePath.startsWith(ROUTES.CONNECT)) screen = SCREEN_IDS.CONNECT_HOME;
    else if (routePath.startsWith(ROUTES.INBOX) || routePath.startsWith(ROUTES.CHAT)) screen = SCREEN_IDS.INBOX;
    else if (routePath.startsWith(ROUTES.PROFILE)) screen = SCREEN_IDS.PROFILE;

    this.setState({
      currentRoute: routePath,
      routeParams: params,
      historyStack,
      activeScreen: screen,
      activeDrawer: null,
      activeDropdown: null,
      searchOverlayOpen: false
    });

    if (options.scrollToTop !== false && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Backward compatibility alias for setScreen
  setScreen(screenId) {
    let targetRoute = ROUTES.EXPLORE;
    if (screenId === SCREEN_IDS.TRIPS_HOME) targetRoute = ROUTES.TRIPS;
    else if (screenId === SCREEN_IDS.CONNECT_HOME) targetRoute = ROUTES.CONNECT;
    else if (screenId === SCREEN_IDS.INBOX) targetRoute = ROUTES.INBOX;
    else if (screenId === SCREEN_IDS.PROFILE) targetRoute = ROUTES.PROFILE;

    this.setRoute(targetRoute);
  }

  // --- HEADER CONFIGURATION ---
  setHeaderConfig(config = {}) {
    this.setState({
      headerVariant: config.variant || "standard",
      headerTitle: config.title || "AURICVISTA",
      headerSubtitle: config.subtitle || null,
      headerBackRoute: config.backRoute || null,
      headerActions: config.actions || []
    });
  }

  // --- OVERLAY ACTIONS ---
  openDrawer(drawerType = "mainNav") {
    this._saveFocus();
    this.setState({ activeDrawer: drawerType, activeDropdown: null });
    this._lockScroll();
  }

  closeDrawer() {
    this.setState({ activeDrawer: null });
    this._unlockScrollIfClean();
    this._restoreFocus();
  }

  openBottomSheet(sheetConfig) {
    this._saveFocus();
    this.setState({ activeSheet: sheetConfig, activeDropdown: null });
    this._lockScroll();
  }

  closeBottomSheet() {
    this.setState({ activeSheet: null });
    this._unlockScrollIfClean();
    this._restoreFocus();
  }

  openModal(modalConfig) {
    this._saveFocus();
    // Support string or object for backward compatibility
    if (typeof modalConfig === "string") {
      modalConfig = { type: modalConfig };
    }
    this.setState({ activeModal: modalConfig, activeDropdown: null });
    this._lockScroll();
  }

  closeModal() {
    this.setState({ activeModal: null });
    this._unlockScrollIfClean();
    this._restoreFocus();
  }

  toggleDropdown(dropdownId) {
    const next = this.state.activeDropdown === dropdownId ? null : dropdownId;
    this.setState({ activeDropdown: next });
  }

  closeDropdown() {
    if (this.state.activeDropdown) {
      this.setState({ activeDropdown: null });
    }
  }

  openSearchOverlay() {
    this._saveFocus();
    this.setState({ searchOverlayOpen: true, activeDropdown: null });
    this._lockScroll();
  }

  closeSearchOverlay() {
    this.setState({ searchOverlayOpen: false });
    this._unlockScrollIfClean();
    this._restoreFocus();
  }

  closeAllOverlays() {
    const hadOverlay = this.hasActiveOverlay();
    this.setState({
      activeDrawer: null,
      activeSheet: null,
      activeModal: null,
      activeDropdown: null,
      searchOverlayOpen: false
    });
    this._unlockScrollIfClean();
    if (hadOverlay) {
      this._restoreFocus();
    }
    return hadOverlay;
  }

  hasActiveOverlay() {
    return !!(
      this.state.activeDrawer ||
      this.state.activeSheet ||
      this.state.activeModal ||
      this.state.searchOverlayOpen
    );
  }

  _saveFocus() {
    if (typeof document !== "undefined" && document.activeElement) {
      this.state.lastFocusedElement = document.activeElement;
    }
  }

  _restoreFocus() {
    if (this.state.lastFocusedElement && typeof this.state.lastFocusedElement.focus === "function") {
      try {
        this.state.lastFocusedElement.focus();
      } catch {
        // Ignored
      }
      this.state.lastFocusedElement = null;
    }
  }

  _lockScroll() {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }

  _unlockScrollIfClean() {
    if (typeof document !== "undefined" && !this.hasActiveOverlay()) {
      document.body.style.overflow = "";
    }
  }

  // --- TOAST FEEDBACK ---
  showToast(toastInput) {
    const toast = typeof toastInput === "string"
      ? { id: "toast-" + Date.now(), type: "info", message: toastInput, duration: 3200 }
      : { id: "toast-" + Date.now(), type: "info", duration: 3200, ...toastInput };

    const newQueue = [...this.state.toastQueue, toast];
    this.setState({ toastQueue: newQueue });

    setTimeout(() => {
      this.dismissToast(toast.id);
    }, toast.duration);
  }

  dismissToast(toastId) {
    const newQueue = this.state.toastQueue.filter(t => t.id !== toastId);
    this.setState({ toastQueue: newQueue });
  }

  // --- LOADING & ERROR STATE ---
  setLoading(isLoading, msg = null) {
    this.setState({ isLoadingRoute: isLoading, loadingMessage: msg });
  }

  setError(errorObj) {
    this.setState({ globalError: errorObj });
  }

  clearError() {
    this.setState({ globalError: null });
  }

  // --- AUTHENTICATION STATE TOGGLE ---
  toggleAuth() {
    if (this.state.authStatus === "authenticated") {
      this.setState({
        authStatus: "guest",
        currentUser: null,
        unreadNotifications: 0,
        unreadMessages: 0
      });
      this.showToast({
        type: "info",
        message: "Switched to Guest Explorer mode"
      });
    } else {
      this.setState({
        authStatus: "authenticated",
        currentUser: {
          id: "usr-ketan-sharma",
          name: "Ketan Sharma",
          username: "@ketan_sharma",
          email: "ketan.sharma@auricvista.com",
          location: "Bengaluru, India",
          title: "Explorer | Wildlife Photographer | Heritage Trekker",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          isVerified: true,
          kycLevel: "Tier 2 — Govt ID Verified",
          membershipTier: "Auric Vista Gold",
          tripsCount: 12,
          followersCount: 230,
          followingCount: 180,
          walletBalanceINR: 24500
        },
        unreadNotifications: 2,
        unreadMessages: 1
      });
      this.showToast({
        type: "success",
        message: "Signed in as Ketan Sharma (Verified Member)"
      });
    }
  }

  // --- NOTIFICATIONS MANAGEMENT ---
  markAllNotificationsRead() {
    const updated = this.state.notifications.map(n => ({ ...n, read: true }));
    this.setState({
      notifications: updated,
      unreadNotifications: 0
    });
    this.showToast("All notifications marked as read");
  }

  // --- SEARCH HELPERS ---
  addRecentSearch(query) {
    if (!query || !query.trim()) return;
    const clean = query.trim();
    const list = [clean, ...this.state.recentSearches.filter(q => q.toLowerCase() !== clean.toLowerCase())].slice(0, 6);
    this.setState({ recentSearches: list, searchQuery: clean });
  }

  clearRecentSearches() {
    this.setState({ recentSearches: [] });
    this.showToast("Search history cleared");
  }

  // --- DOMAIN HELPERS (From Phase 1) ---
  toggleWishlist(stayId) {
    const list = new Set(this.state.wishlist);
    if (list.has(stayId)) {
      list.delete(stayId);
      this.showToast({ type: "info", message: "Removed from Wishlist" });
    } else {
      list.add(stayId);
      this.showToast({ type: "success", message: "Saved to Wishlist ✨" });
    }
    this.setState({ wishlist: Array.from(list) });
  }

  isWishlisted(stayId) {
    return this.state.wishlist.includes(stayId);
  }

  setStayCategoryFilter(cat) {
    this.setState({ stayCategoryFilter: cat });
  }

  setSocialMode(mode) {
    this.setState({ currentSocialMode: mode });
  }

  setSearchQuery(q) {
    this.setState({ searchQuery: q });
  }
}

export const appState = new StateManager();
