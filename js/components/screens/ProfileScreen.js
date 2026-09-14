// AURICVISTA PROFILE — Mobile Profile & Safety Screen Component
// Matches prd/design.md & templet/app view.png (Screen 11: Profile & Safety)

import { appState } from "../../state.js";

export function renderProfileScreen() {
  const container = document.createElement("div");
  container.className = "screen-profile";
  container.id = "screen-profile";
  container.style.padding = "var(--space-4)";

  const { currentUser } = appState.getState();

  container.innerHTML = `
    <!-- User Bio Card -->
    <div style="background: var(--bg-surface); padding: var(--space-4); border-radius: var(--radius-lg); border: 1px solid var(--border-card); display: flex; align-items: center; gap: var(--space-3-5); margin-bottom: var(--space-4);">
      <div style="position: relative; width: 68px; height: 68px; border-radius: 50%; overflow: hidden; border: 2px solid var(--gold-primary); flex-shrink: 0;">
        <img src="${currentUser.avatar}" alt="${currentUser.name}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">${currentUser.name}</h2>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#10B981"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">${currentUser.location}</div>
        <div style="font-size: 0.8rem; color: var(--gold-light); margin-top: 2px;">${currentUser.title}</div>
      </div>
    </div>

    <!-- Stats Bar -->
    <div style="background: var(--bg-surface); padding: var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; justify-content: space-around; text-align: center; margin-bottom: var(--space-4);">
      <div>
        <div style="font-size: 0.72rem; color: var(--text-muted);">Trips</div>
        <div style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary);">${currentUser.tripsCount}</div>
      </div>
      <div style="width: 1px; background: var(--border-subtle);"></div>
      <div>
        <div style="font-size: 0.72rem; color: var(--text-muted);">Followers</div>
        <div style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary);">${currentUser.followersCount}</div>
      </div>
      <div style="width: 1px; background: var(--border-subtle);"></div>
      <div>
        <div style="font-size: 0.72rem; color: var(--text-muted);">Following</div>
        <div style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary);">${currentUser.followingCount}</div>
      </div>
    </div>

    <!-- Menu Actions List -->
    <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-6);">
      <button class="profile-menu-row" id="menu-edit-profile" style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 14px var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); color: var(--text-primary); font-size: 0.92rem;">
        <span style="display: flex; align-items: center; gap: 10px;">
          <span>✏️</span>
          <span>Edit Profile</span>
        </span>
        <span style="color: var(--text-muted);">›</span>
      </button>

      <button class="profile-menu-row" id="menu-verification" style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 14px var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); color: var(--text-primary); font-size: 0.92rem;">
        <span style="display: flex; align-items: center; gap: 10px;">
          <span>🛡️</span>
          <span>Identity Verification</span>
        </span>
        <span style="color: var(--success); font-weight: 700; font-size: 0.8rem;">Verified ✓</span>
      </button>

      <button class="profile-menu-row" id="menu-safety" style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 14px var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); color: var(--text-primary); font-size: 0.92rem;">
        <span style="display: flex; align-items: center; gap: 10px;">
          <span>🔔</span>
          <span>Safety & Emergency Contacts</span>
        </span>
        <span style="color: var(--text-muted);">3 Added ›</span>
      </button>

      <button class="profile-menu-row" id="menu-wallet" style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 14px var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); color: var(--text-primary); font-size: 0.92rem;">
        <span style="display: flex; align-items: center; gap: 10px;">
          <span>💳</span>
          <span>Trip Expense Wallet & Ledger</span>
        </span>
        <span style="color: var(--gold-light); font-weight: 700; font-size: 0.82rem;">₹28,450 ›</span>
      </button>

      <button class="profile-menu-row" id="menu-settings" style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 14px var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); color: var(--text-primary); font-size: 0.92rem;">
        <span style="display: flex; align-items: center; gap: 10px;">
          <span>⚙️</span>
          <span>App Settings & Privacy</span>
        </span>
        <span style="color: var(--text-muted);">›</span>
      </button>
    </div>

    <!-- Emergency SOS Button (Calm, authoritative, deliberate as required by PRD and ADR-019) -->
    <div style="margin-bottom: var(--space-6);">
      <button id="emergency-sos-btn" style="width: 100%; min-height: 52px; background: rgba(239, 68, 68, 0.15); border: 1.5px solid var(--danger); border-radius: var(--radius-full); color: #EF4444; font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 16px rgba(239,68,68,0.2);">
        <span>🚨</span>
        <span>Emergency SOS (Hold to Alert Contacts)</span>
      </button>
      <div style="text-align: center; font-size: 0.72rem; color: var(--text-muted); margin-top: 6px;">
        Rule-first emergency dispatch with single on-demand GPS pin. Zero AI dependency.
      </div>
    </div>
  `;

  container.querySelectorAll(".profile-menu-row").forEach(btn => {
    btn.addEventListener("click", () => {
      appState.showToast("Opening profile settings... ✨");
    });
  });

  container.querySelector("#emergency-sos-btn")?.addEventListener("click", () => {
    appState.showToast("Emergency Safety Protocol Ready: Verified contacts on standby.");
  });

  return container;
}
