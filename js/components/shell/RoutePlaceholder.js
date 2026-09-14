// AURICVISTA Architectural Route Placeholder Component
// Master Authority: Phase 2 Step 6 & Step 22
// Standardized quiet-luxury route boundary for future product phases (Phases 3–10)
// Preserves architectural reality: never fakes backend-dependent functionality

import { appState, ROUTES } from "../../state.js";
import { router } from "../../router.js";

export function renderRoutePlaceholder(routePath, params = {}) {
  const container = document.createElement("section");
  container.className = "route-placeholder-container";
  container.setAttribute("role", "region");
  container.setAttribute("aria-label", "Route Placeholder");

  const meta = getPhaseMetadata(routePath);

  container.innerHTML = `
    <div class="placeholder-card">
      <div class="placeholder-top-badge">
        <span class="phase-number-badge">${meta.phase}</span>
        <span class="phase-status-pill">Architectural Shell Ready</span>
      </div>

      <div class="placeholder-icon-wrap">
        ${meta.icon}
      </div>

      <h2 class="placeholder-title">${meta.title}</h2>
      <p class="placeholder-desc">${meta.description}</p>

      <div class="placeholder-tech-strip">
        <div class="tech-item">
          <span class="tech-label">Route Binding</span>
          <code class="tech-val">${routePath}</code>
        </div>
        ${Object.keys(params).length > 0 ? `
          <div class="tech-item">
            <span class="tech-label">Extracted Params</span>
            <code class="tech-val">${JSON.stringify(params)}</code>
          </div>
        ` : ""}
        <div class="tech-item">
          <span class="tech-label">Security Boundary</span>
          <span class="tech-val security-lock">Backend Authoritative (ADR-013)</span>
        </div>
      </div>

      <div class="placeholder-actions">
        <button class="placeholder-btn-primary" id="placeholder-explore-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Return to Explore
        </button>

        <button class="placeholder-btn-secondary" id="placeholder-menu-btn">
          Open Menu Drawer
        </button>
      </div>
    </div>
  `;

  container.querySelector("#placeholder-explore-btn")?.addEventListener("click", () => {
    router.navigate(ROUTES.EXPLORE);
  });

  container.querySelector("#placeholder-menu-btn")?.addEventListener("click", () => {
    appState.openDrawer("mainNav");
  });

  return container;
}

function getPhaseMetadata(route) {
  if (route.startsWith("/stays")) {
    return {
      phase: "PHASE 4: STAYS & BOOKING",
      title: "Bespoke Stays & Inventory",
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      description: "Dedicated stay search, property tiers, 15-minute temporary holds, room selections, and transactional checkout scheduled for Phase 4."
    };
  }

  if (route.startsWith("/trips/create") || route.startsWith("/trips/")) {
    return {
      phase: "PHASE 5: TRIPS & ITINERARY",
      title: "Interactive Journey Planner",
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="1.8"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,
      description: "Multi-day itinerary timelines, drag-and-drop route reorganization, offline maps, and squad voting scheduled for Phase 5."
    };
  }

  if (route.startsWith("/connect/")) {
    return {
      phase: "PHASE 6: CONNECT & SOCIAL",
      title: "Social Discovery & Matching",
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--social-pink)" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
      description: "Travel buddy discovery, verified dating mode, flatmate co-living searches, and match celebration flows scheduled for Phase 6."
    };
  }

  if (route.startsWith("/groups")) {
    return {
      phase: "PHASE 7: CHAT, INBOX & COMMUNITY",
      title: "Community Squads & Chat",
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      description: "Group message channels, interactive itinerary polls, and member directories scheduled for Phase 7."
    };
  }

  if (route.startsWith("/chat")) {
    return {
      phase: "PHASE 7: CHAT, INBOX & COMMUNITY",
      title: "Direct Messaging Channel",
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      description: "Real-time 1-on-1 travel buddy messaging, media attachments, and trip invites scheduled for Phase 7."
    };
  }

  if (route.startsWith("/ai")) {
    return {
      phase: "PHASE 8: AI, WALLET & SAFETY",
      title: "Auric AI Concierge",
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
      description: "Contextual conversational trip planner, real-time weather & wildlife alerts, and itinerary generator scheduled for Phase 8."
    };
  }

  if (route.startsWith("/wallet")) {
    return {
      phase: "PHASE 8: AI, WALLET & SAFETY",
      title: "Auric Virtual Wallet & Split Ledger",
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
      description: "Shared trip expense tracking, group split-bill calculator, and payment ledger scheduled for Phase 8."
    };
  }

  if (route.startsWith("/safety")) {
    return {
      phase: "PHASE 8: AI, WALLET & SAFETY",
      title: "Safety Center & Emergency SOS",
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      description: "Rule-first deterministic emergency SOS dispatch, local emergency contacts, and live location sharing scheduled for Phase 8."
    };
  }

  if (route.startsWith("/verification")) {
    return {
      phase: "PHASE 9: PROFILE, KYC & SETTINGS",
      title: "Government KYC Verification",
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="13" y2="12"/></svg>`,
      description: "DigiLocker / Aadhaar identity verification pipeline for verified travel badges scheduled for Phase 9."
    };
  }

  if (route.startsWith("/settings") || route.startsWith("/support")) {
    return {
      phase: "PHASE 9: PROFILE, KYC & SETTINGS",
      title: "Preferences & 24/7 Concierge Support",
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      description: "Privacy preferences, currency localization, security settings, and support ticket desk scheduled for Phase 9."
    };
  }

  // Generic fallback
  return {
    phase: "FUTURE ROADMAP MODULE",
    title: "Curated Travel Module",
    icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    description: "This route is registered in the application shell and will be implemented in subsequent roadmap phases."
  };
}
