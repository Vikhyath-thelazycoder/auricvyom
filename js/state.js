// AURICVISTA Production Reactive State Manager & Screen Registry
// Authoritative Screen IDs as mandated by prd/design.md & Frontend PRD

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

class StateManager {
  constructor() {
    this.state = {
      activeScreen: SCREEN_IDS.EXPLORE_HOME,
      activeModal: null, // 'search' | 'destination' | 'stay' | 'aiPrompt'
      modalData: null,
      searchQuery: "",
      stayCategoryFilter: "all",
      currentSocialMode: "buddy", // 'buddy' | 'dating' | 'flatmate'
      wishlist: ["stay-hosteller-coorg"],
      unreadNotifications: 2,
      unreadMessages: 1,
      toastMessage: null,
      currentUser: {
        id: "usr-ketan-sharma",
        name: "Ketan Sharma",
        username: "@ketan_sharma",
        location: "Bengaluru, India",
        title: "Explorer | Photographer | Trekker",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        isVerified: true,
        tripsCount: 12,
        followersCount: 230,
        followingCount: 180
      }
    };
    this.listeners = new Set();
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

  setScreen(screenId) {
    if (Object.values(SCREEN_IDS).includes(screenId) || screenId) {
      this.setState({ activeScreen: screenId, activeModal: null });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  openModal(modalType, data = null) {
    this.setState({ activeModal: modalType, modalData: data });
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.setState({ activeModal: null, modalData: null });
    document.body.style.overflow = "";
  }

  toggleWishlist(stayId) {
    const list = new Set(this.state.wishlist);
    if (list.has(stayId)) {
      list.delete(stayId);
      this.showToast("Removed from Wishlist");
    } else {
      list.add(stayId);
      this.showToast("Saved to Wishlist ✨");
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

  showToast(msg) {
    this.setState({ toastMessage: msg });
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      this.setState({ toastMessage: null });
    }, 2800);
  }
}

export const appState = new StateManager();
