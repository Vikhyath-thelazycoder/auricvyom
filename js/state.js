// AURICVISTA State Management & Reactive Store (Production Master Edition)
import { generateIntelligentItinerary } from "./services/itineraryGenerator.js";
import { TRAVEL_STORIES } from "./data/stories.js";
import { REVIEWS } from "./data/reviews.js";

class StateManager {
  constructor() {
    this.subscribers = new Map();

    const defaultTrip = generateIntelligentItinerary({
      from: "Bangalore",
      destinationId: "coorg",
      daysCount: 3,
      travellersCount: 2,
      budget: 15000,
      travelStyle: "Couple",
      interests: ["Nature", "Food"],
      pace: "Balanced"
    });

    const savedWishlist = this.loadFromStorage("auricvista_wishlist", [
      {
        id: "coorg",
        name: "Coorg (Kodagu)",
        type: "destination",
        image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
        country: "India",
        state: "Karnataka",
        rating: 4.96,
        startingPrice: "₹4,999"
      },
      {
        id: "stay-tamara-coorg",
        name: "The Tamara Coorg — Luxury Rainforest Villa",
        type: "stay",
        image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
        country: "India",
        state: "Karnataka",
        rating: 4.96,
        startingPrice: "₹24,500"
      },
      {
        id: "exp-coorg-coffee",
        name: "Artisanal Coffee Cupping & Bean-to-Cup Safari",
        type: "experience",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
        country: "India",
        state: "Karnataka",
        rating: 4.98,
        startingPrice: "₹3,499"
      }
    ]);

    const savedSearchHistory = this.loadFromStorage("auricvista_search_history", [
      "Coorg Coffee Estates",
      "Hampi Boulder Ruins",
      "Kabini Wildlife Safari",
      "Gokarna Om Beach"
    ]);

    const savedBookings = this.loadFromStorage("auricvista_bookings", [
      {
        id: "BK-82910",
        type: "stay",
        title: "The Tamara Coorg — Luxury Rainforest Villa",
        destination: "Coorg (Kodagu)",
        checkIn: "2026-09-15",
        checkOut: "2026-09-18",
        guests: 2,
        totalPrice: 73500,
        currency: "INR",
        status: "Confirmed",
        bookingDate: "2026-08-30",
        voucherCode: "AV-CRG-82910",
        image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80"
      }
    ]);

    const savedActiveTripPlan = this.loadFromStorage("auricvista_active_trip_plan", defaultTrip);
    const savedTripList = this.loadFromStorage("auricvista_saved_trips_list", [defaultTrip]);
    const savedStories = this.loadFromStorage("auricvista_user_stories", TRAVEL_STORIES);
    const savedReviews = this.loadFromStorage("auricvista_user_reviews", REVIEWS);
    const savedUser = this.loadFromStorage("auricvista_user_profile", {
      name: "Vikhyath Gowda",
      email: "vikhyath@auricvista.com",
      phone: "+91 98801 23456",
      tier: "Auric Diamond Member",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      loyaltyPoints: 14850,
      tripsCompleted: 6,
      preferences: {
        currency: "INR",
        travelStyle: "Luxury & Nature",
        dietary: "Vegetarian / Gourmet",
        homeAirport: "BLR Kempegowda Bengaluru"
      }
    });

    const savedPaymentMethods = this.loadFromStorage("auricvista_saved_payments", {
      upi: ["vikhyath@okhdfcbank", "aurictravel@paytm"],
      cards: [{ last4: "4829", brand: "Visa Signature", expiry: "08/29" }]
    });

    const savedRecentlyViewed = this.loadFromStorage("auricvista_recently_viewed", [
      { id: "coorg", name: "Coorg (Kodagu)", type: "destination", image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80" },
      { id: "hampi", name: "Hampi & Vijayanagara", type: "destination", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80" }
    ]);

    this.state = {
      activeTab: "home", // home, explore, destinations, stays, experiences, transport, flights, packages, planner, ai_planner, saved, bookings, dashboard, journal
      searchQuery: "",
      searchHistory: savedSearchHistory,
      selectedDestination: null,
      selectedStayDetail: null,
      selectedExperienceDetail: null,
      selectedStayForBooking: null,
      selectedExperienceForBooking: null,
      selectedPackageForBooking: null,
      selectedFlightForBooking: null,
      activeModal: null, // 'destination', 'stayDetail', 'experienceDetail', 'booking', 'search', 'filterDrawer', 'authModal', 'storyModal', 'reviewModal'
      
      // Auth State
      isAuthenticated: true,
      currentUser: savedUser,
      savedPaymentMethods,
      recentlyViewed: savedRecentlyViewed,

      // Stories & Reviews
      travelStories: savedStories,
      reviews: savedReviews,

      // Discovery Filters
      filterRegion: "all",
      exploreCategory: "trending",
      budgetRange: "all",
      durationFilter: "all",
      travelTypeFilter: "all",
      selectedInterests: [],
      minRating: 0,
      maxDistance: 0,
      sortBy: "recommended",

      // Trip Planning State
      activeTripPlan: savedActiveTripPlan,
      savedTripPlans: savedTripList,

      wishlist: savedWishlist,
      bookings: savedBookings,
      currency: "INR",
      currencySymbol: "₹",
      currencyRate: 1,
      toastMessage: null,
      aiMessages: [
        {
          sender: "ai",
          text: "Namaskara! I am **AuricVista AI**, your personal luxury travel companion for Karnataka and India. I am synced with your active trip plan: **" + (savedActiveTripPlan ? savedActiveTripPlan.title : "Custom Escape") + "**. How can I refine your journey?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: [
            "Plan a 4-day Karnataka trip under ₹20,000",
            "Make this trip cheaper by 20%",
            "Add more adrenaline adventure activities",
            "Recommend hidden scenic spots near Bangalore"
          ]
        }
      ]
    };
  }

  loadFromStorage(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }

  getState() {
    return this.state;
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };

    if (updates.wishlist !== undefined) this.saveToStorage("auricvista_wishlist", this.state.wishlist);
    if (updates.bookings !== undefined) this.saveToStorage("auricvista_bookings", this.state.bookings);
    if (updates.activeTripPlan !== undefined) this.saveToStorage("auricvista_active_trip_plan", this.state.activeTripPlan);
    if (updates.savedTripPlans !== undefined) this.saveToStorage("auricvista_saved_trips_list", this.state.savedTripPlans);
    if (updates.travelStories !== undefined) this.saveToStorage("auricvista_user_stories", this.state.travelStories);
    if (updates.reviews !== undefined) this.saveToStorage("auricvista_user_reviews", this.state.reviews);
    if (updates.currentUser !== undefined) this.saveToStorage("auricvista_user_profile", this.state.currentUser);
    if (updates.savedPaymentMethods !== undefined) this.saveToStorage("auricvista_saved_payments", this.state.savedPaymentMethods);
    if (updates.recentlyViewed !== undefined) this.saveToStorage("auricvista_recently_viewed", this.state.recentlyViewed);
    if (updates.searchHistory !== undefined) this.saveToStorage("auricvista_search_history", this.state.searchHistory);

    this.notify();
  }

  subscribe(callback) {
    const id = Symbol();
    this.subscribers.set(id, callback);
    return () => this.subscribers.delete(id);
  }

  notify() {
    for (const callback of this.subscribers.values()) {
      try {
        callback(this.state);
      } catch (err) {
        console.error("Subscriber error", err);
      }
    }
  }

  setActiveTab(tabId) {
    this.setState({ activeTab: tabId, activeModal: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  openDestinationModal(destination) {
    this.recordRecentlyViewed(destination);
    this.setState({ selectedDestination: destination, activeModal: "destination" });
  }

  closeModal() {
    this.setState({ activeModal: null });
  }

  showToast(msg) {
    this.setState({ toastMessage: msg });
    setTimeout(() => {
      if (this.state.toastMessage === msg) {
        this.setState({ toastMessage: null });
      }
    }, 3000);
  }

  recordRecentlyViewed(item) {
    if (!item || !item.id) return;
    const current = this.state.recentlyViewed.filter(x => x.id !== item.id);
    const updated = [{ id: item.id, name: item.name || item.title, type: item.pricePerNight ? "stay" : item.duration ? "experience" : "destination", image: item.image }, ...current].slice(0, 6);
    this.setState({ recentlyViewed: updated });
  }

  // --- AUTH METHODS ---
  login(email, password) {
    this.setState({
      isAuthenticated: true,
      currentUser: {
        ...this.state.currentUser,
        email: email || "vikhyath@auricvista.com"
      },
      activeModal: null
    });
    this.showToast(`✨ Welcome back, ${this.state.currentUser.name}!`);
  }

  signup(name, email, password) {
    this.setState({
      isAuthenticated: true,
      currentUser: {
        ...this.state.currentUser,
        name: name || "Traveler",
        email: email || "traveler@auricvista.com"
      },
      activeModal: null
    });
    this.showToast(`🎉 Welcome to AuricVista, ${name}!`);
  }

  logout() {
    this.setState({
      isAuthenticated: false,
      activeModal: null
    });
    this.showToast("Logged out successfully.");
  }

  updateProfile(profileData) {
    const updated = { ...this.state.currentUser, ...profileData };
    this.setState({ currentUser: updated });
    this.showToast("Profile & preferences updated!");
  }

  addTravelStory(story) {
    const newStory = {
      id: "story-" + Date.now(),
      author: this.state.currentUser.name,
      authorAvatar: this.state.currentUser.avatar,
      authorTier: this.state.currentUser.tier,
      readingTime: "3 min read",
      tripDates: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      ...story
    };
    const updated = [newStory, ...this.state.travelStories];
    this.setState({ travelStories: updated, activeModal: null });
    this.showToast("📖 Travel Story published to journal!");
  }

  addReview(reviewData) {
    const newReview = {
      id: "rev-" + Date.now(),
      author: this.state.currentUser.name,
      avatar: this.state.currentUser.avatar,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      verifiedBooking: true,
      ...reviewData
    };
    const updated = [newReview, ...this.state.reviews];
    this.setState({ reviews: updated, activeModal: null });
    this.showToast("⭐ Verified Review published!");
  }

  // --- TRIP PLANNER MUTATIONS ---
  generateNewTrip(params) {
    const newPlan = generateIntelligentItinerary(params);
    this.setState({
      activeTripPlan: newPlan,
      activeTab: "planner",
      activeModal: null
    });
    this.showToast(`✨ Generated ${newPlan.title}!`);
  }

  recalculateBudget(trip) {
    let transportTotal = 0;
    let foodTotal = 0;
    let activitiesTotal = 0;
    let ticketsTotal = 0;
    let shoppingTotal = 0;
    const accommodationTotal = (trip.chosenStay?.pricePerNight || 6000) * Math.max(1, trip.days.length - 1);
    const otherTotal = Math.round(trip.budgetSummary.targetBudget * 0.05);

    trip.days.forEach(d => {
      d.activities.forEach(act => {
        if (act.budgetCategory === "Transport") transportTotal += act.cost;
        else if (act.budgetCategory === "Food") foodTotal += act.cost;
        else if (act.budgetCategory === "Activities") activitiesTotal += act.cost;
        else if (act.budgetCategory === "Tickets") ticketsTotal += act.cost;
        else if (act.budgetCategory === "Shopping") shoppingTotal += act.cost;
      });
    });

    const estimatedTotal = accommodationTotal + transportTotal + foodTotal + activitiesTotal + ticketsTotal + shoppingTotal + otherTotal;
    const remainingBudget = trip.budgetSummary.targetBudget - estimatedTotal;

    trip.budgetSummary = {
      targetBudget: trip.budgetSummary.targetBudget,
      estimatedTotal,
      remainingBudget,
      isUnderBudget: remainingBudget >= 0,
      breakdown: {
        accommodation: accommodationTotal,
        transport: transportTotal,
        food: foodTotal,
        activities: activitiesTotal,
        tickets: ticketsTotal,
        shopping: shoppingTotal,
        other: otherTotal
      }
    };
    return trip;
  }

  addActivityToDay(dayNumber, activityData) {
    const trip = JSON.parse(JSON.stringify(this.state.activeTripPlan));
    const dayObj = trip.days.find(d => d.day === dayNumber);
    if (dayObj) {
      dayObj.activities.push({
        id: `act-${Date.now()}`,
        timeSlot: activityData.timeSlot || "Afternoon",
        time: activityData.time || "03:00 PM",
        title: activityData.title || "Custom Sanctuary Exploration",
        location: activityData.location || trip.destination,
        travelTime: "15 min",
        duration: "2 Hours",
        category: activityData.category || "Experience",
        cost: activityData.cost || 1500,
        budgetCategory: activityData.budgetCategory || "Activities",
        openingInfo: "Open",
        recommendedTime: "Flexible",
        notes: activityData.notes || "Added custom activity.",
        icon: activityData.icon || "📍"
      });
      const updated = this.recalculateBudget(trip);
      this.setState({ activeTripPlan: updated });
      this.showToast(`✓ Added "${activityData.title}" to Day ${dayNumber}`);
    }
  }

  removeActivity(activityId) {
    const trip = JSON.parse(JSON.stringify(this.state.activeTripPlan));
    trip.days.forEach(d => {
      d.activities = d.activities.filter(a => a.id !== activityId);
    });
    const updated = this.recalculateBudget(trip);
    this.setState({ activeTripPlan: updated });
    this.showToast(`Removed activity from itinerary`);
  }

  moveActivity(activityId, direction) {
    const trip = JSON.parse(JSON.stringify(this.state.activeTripPlan));
    trip.days.forEach(d => {
      const idx = d.activities.findIndex(a => a.id === activityId);
      if (idx !== -1) {
        if (direction === "up" && idx > 0) {
          const temp = d.activities[idx];
          d.activities[idx] = d.activities[idx - 1];
          d.activities[idx - 1] = temp;
        } else if (direction === "down" && idx < d.activities.length - 1) {
          const temp = d.activities[idx];
          d.activities[idx] = d.activities[idx + 1];
          d.activities[idx + 1] = temp;
        }
      }
    });
    this.setState({ activeTripPlan: trip });
  }

  updateTripHotel(newHotelName, pricePerNight) {
    const trip = JSON.parse(JSON.stringify(this.state.activeTripPlan));
    trip.chosenStay = {
      name: newHotelName,
      pricePerNight
    };
    const updated = this.recalculateBudget(trip);
    this.setState({ activeTripPlan: updated });
    this.showToast(`🏨 Stay updated to ${newHotelName}`);
  }

  saveActiveTrip() {
    const current = this.state.activeTripPlan;
    const list = [...this.state.savedTripPlans.filter(t => t.id !== current.id), current];
    this.setState({ savedTripPlans: list });
    this.showToast(`💾 "${current.title}" saved to your trips!`);
  }

  duplicateActiveTrip() {
    const current = JSON.parse(JSON.stringify(this.state.activeTripPlan));
    current.id = "trip-" + Date.now();
    current.title = "Copy of " + current.title;
    const list = [...this.state.savedTripPlans, current];
    this.setState({ activeTripPlan: current, savedTripPlans: list });
    this.showToast(`✨ Duplicated itinerary as "${current.title}"`);
  }

  addSearchHistory(term) {
    if (!term || !term.trim()) return;
    const clean = term.trim();
    const updated = [clean, ...this.state.searchHistory.filter(s => s.toLowerCase() !== clean.toLowerCase())].slice(0, 8);
    this.setState({ searchHistory: updated });
  }

  clearSearchHistory() {
    this.setState({ searchHistory: [] });
  }

  toggleInterest(interest) {
    const current = [...this.state.selectedInterests];
    const idx = current.indexOf(interest);
    if (idx !== -1) current.splice(idx, 1);
    else current.push(interest);
    this.setState({ selectedInterests: current });
  }

  resetFilters() {
    this.setState({
      filterRegion: "all",
      budgetRange: "all",
      durationFilter: "all",
      travelTypeFilter: "all",
      selectedInterests: [],
      minRating: 0,
      maxDistance: 0,
      sortBy: "recommended",
      searchQuery: ""
    });
  }

  toggleWishlist(item) {
    const exists = this.state.wishlist.some(w => w.id === item.id);
    let updated;
    if (exists) {
      updated = this.state.wishlist.filter(w => w.id !== item.id);
      this.showToast(`Removed from Wishlist`);
    } else {
      updated = [
        ...this.state.wishlist,
        {
          id: item.id,
          name: item.name || item.title,
          type: item.type || (item.pricePerNight ? "stay" : item.duration ? "experience" : "destination"),
          image: item.image,
          country: item.country || "India",
          state: item.state || "",
          rating: item.rating,
          startingPrice: item.startingPrice || item.priceDisplay || "₹" + (item.pricePerNight || item.price || 0)
        }
      ];
      this.showToast(`Saved ❤️ to Wishlist`);
    }
    this.setState({ wishlist: updated });
    return !exists;
  }

  isWishlisted(id) {
    return this.state.wishlist.some(w => w.id === id);
  }

  addBooking(bookingData) {
    const newBooking = {
      id: "BK-" + Math.floor(10000 + Math.random() * 90000),
      bookingDate: new Date().toISOString().split("T")[0],
      voucherCode: "AV-" + (bookingData.destinationId || "IND").toUpperCase().slice(0, 3) + "-" + Math.floor(10000 + Math.random() * 90000),
      status: "Confirmed",
      ...bookingData
    };
    const updated = [newBooking, ...this.state.bookings];
    this.setState({ bookings: updated, activeModal: null, activeTab: "bookings" });
    return newBooking;
  }

  addAiMessage(sender, text, suggestions = null) {
    const newMessage = {
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions
    };
    this.setState({ aiMessages: [...this.state.aiMessages, newMessage] });
  }
}

export const appState = new StateManager();
