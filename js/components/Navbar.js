// AURICVISTA Navbar Component (Production Master Edition)
import { appState } from "../state.js";

export function renderNavbar() {
  const nav = document.createElement("nav");
  nav.className = "auric-navbar";
  nav.id = "main-navbar";

  const updateNavDOM = () => {
    const { activeTab, wishlist, bookings, currentUser, isAuthenticated } = appState.getState();

    nav.innerHTML = `
      <!-- Brand Logo & Identity -->
      <div class="brand-container" id="nav-brand-logo">
        <div class="brand-logo-mark">
          <span>AV</span>
        </div>
        <div class="brand-text-wrap">
          <div class="brand-title">AURIC<span>VISTA</span></div>
          <div class="brand-tagline">Discover • Explore • Plan • Travel</div>
        </div>
      </div>

      <!-- Desktop Nav Links -->
      <ul class="nav-links-menu">
        <li>
          <button class="nav-link-btn ${activeTab === 'home' ? 'active' : ''}" data-tab="home">
            Home
          </button>
        </li>
        <li>
          <button class="nav-link-btn ${activeTab === 'explore' ? 'active' : ''}" data-tab="explore">
            Explore India
          </button>
        </li>
        <li>
          <button class="nav-link-btn ${activeTab === 'destinations' ? 'active' : ''}" data-tab="destinations">
            Destinations
          </button>
        </li>
        <li>
          <button class="nav-link-btn ${activeTab === 'stays' ? 'active' : ''}" data-tab="stays">
            Stays
          </button>
        </li>
        <li>
          <button class="nav-link-btn ${activeTab === 'experiences' ? 'active' : ''}" data-tab="experiences">
            Experiences
          </button>
        </li>
        <li>
          <button class="nav-link-btn ${activeTab === 'transport' || activeTab === 'flights' ? 'active' : ''}" data-tab="transport">
            Transport
          </button>
        </li>
        <li>
          <button class="nav-link-btn ${activeTab === 'packages' ? 'active' : ''}" data-tab="packages">
            Packages
          </button>
        </li>
        <li>
          <button class="nav-link-btn ${activeTab === 'planner' ? 'active' : ''}" data-tab="planner">
            Plan a Trip
          </button>
        </li>
        <li>
          <button class="nav-link-btn ${activeTab === 'journal' ? 'active' : ''}" data-tab="journal">
            Journal
          </button>
        </li>
        <li>
          <button class="nav-link-btn ai-chip ${activeTab === 'ai_planner' ? 'active' : ''}" data-tab="ai_planner">
            <span>✨ AI Companion</span>
          </button>
        </li>
      </ul>

      <!-- Right Action Utilities -->
      <div class="nav-actions">
        <!-- Search Trigger -->
        <button class="action-icon-btn" id="nav-search-btn" title="Global Search (Ctrl+K)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>

        <!-- Wishlist -->
        <button class="action-icon-btn" id="nav-wishlist-btn" title="Wishlist & Saved Escapes">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          ${wishlist.length > 0 ? `<span class="badge-counter">${wishlist.length}</span>` : ''}
        </button>

        <!-- Currency -->
        <div class="currency-badge" title="Currency: Indian Rupee (₹)">
          <span>₹ INR</span>
        </div>

        <!-- User Profile & Dashboard -->
        ${isAuthenticated ? `
          <button class="user-profile-btn" id="nav-profile-btn" title="User Dashboard">
            <img src="${currentUser.avatar}" alt="${currentUser.name}" class="user-avatar-img" />
            <span class="user-name-label">${currentUser.name.split(' ')[0]} (${bookings.length})</span>
          </button>
        ` : `
          <button class="btn-primary-gold" id="nav-login-btn" style="padding: 8px 18px; font-size: 0.82rem;">
            Sign In
          </button>
        `}

        <!-- Mobile Menu Hamburger -->
        <button class="mobile-menu-toggle" id="mobile-menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    `;

    // Attach listeners
    nav.querySelector("#nav-brand-logo").addEventListener("click", () => {
      appState.setActiveTab("home");
    });

    nav.querySelectorAll(".nav-link-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        appState.setActiveTab(btn.dataset.tab);
      });
    });

    nav.querySelector("#nav-search-btn").addEventListener("click", () => {
      appState.setState({ activeModal: "search" });
    });

    nav.querySelector("#nav-wishlist-btn").addEventListener("click", () => {
      appState.setActiveTab("saved");
    });

    nav.querySelector("#nav-profile-btn")?.addEventListener("click", () => {
      appState.setActiveTab("dashboard");
    });

    nav.querySelector("#nav-login-btn")?.addEventListener("click", () => {
      appState.setState({ activeModal: "authModal" });
    });

    nav.querySelector("#mobile-menu-btn")?.addEventListener("click", () => {
      const drawer = document.getElementById("mobile-drawer");
      if (drawer) drawer.classList.toggle("active");
    });
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  appState.subscribe(() => {
    updateNavDOM();
  });

  updateNavDOM();
  return nav;
}
