// AURICVISTA CONNECT_HOME — Mobile Travel & Social Discovery Screen Component
// Matches prd/design.md §37-41 & templet/app view.png (Screen 2: Travel Dating / Swipe)

import { appState, SCREEN_IDS } from "../../state.js";
import { people } from "../../data/people.js";

export function renderConnectHomeScreen() {
  const container = document.createElement("div");
  container.className = "screen-connect-home";
  container.id = "screen-connect-home";
  container.style.padding = "var(--space-4)";

  let currentIndex = 0;

  const renderContent = () => {
    const { currentSocialMode } = appState.getState();
    const person = people[currentIndex % people.length];

    container.innerHTML = `
      <!-- Header Mode Tabs -->
      <div class="social-mode-tabs" style="margin-bottom: var(--space-4);">
        <button class="social-tab-btn ${currentSocialMode === 'buddy' ? 'active' : ''}" data-mode="buddy">
          Travel Buddy
        </button>
        <button class="social-tab-btn ${currentSocialMode === 'dating' ? 'active-dating' : ''}" data-mode="dating">
          Dating
        </button>
        <button class="social-tab-btn ${currentSocialMode === 'flatmate' ? 'active' : ''}" data-mode="flatmate">
          Flatmates
        </button>
      </div>

      <!-- Main Swipe Card Container -->
      <div style="position: relative; border-radius: var(--radius-xl); overflow: hidden; background: var(--bg-surface); border: 1.5px solid ${currentSocialMode === 'dating' ? 'var(--border-pink)' : 'var(--border-card)'}; box-shadow: var(--shadow-lg); aspect-ratio: 4 / 5;">
        <img src="${person.avatar}" alt="${person.name}" style="width: 100%; height: 100%; object-fit: cover;" />
        
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(8,11,16,0.92) 100%);"></div>

        <!-- Tag Top Right -->
        <div style="position: absolute; top: 12px; right: 12px; background: rgba(8,11,16,0.7); backdrop-filter: var(--glass-blur-sm); padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.72rem; color: var(--gold-light); border: 1px solid var(--border-gold);">
          📍 ${person.distance}
        </div>

        <!-- Info Bottom Left -->
        <div style="position: absolute; bottom: 16px; left: 16px; right: 16px; z-index: 2;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <h2 style="font-size: 1.45rem; font-weight: 700; color: var(--text-primary);">${person.name}, ${person.age}</h2>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 2px;">
            ${person.location} • ${person.occupation}
          </div>
          <p style="font-size: 0.84rem; color: var(--text-muted); margin-top: 6px; line-height: 1.4;">
            ${person.bio}
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
            ${person.tags.map(t => `<span class="traveler-tag" style="background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2);">${t}</span>`).join("")}
          </div>
        </div>
      </div>

      <!-- 5 Swipe Action Buttons matching app view.png Screen 2 -->
      <div style="display: flex; justify-content: space-around; align-items: center; margin-top: var(--space-4); padding: 0 var(--space-2);">
        <!-- Rewind -->
        <button id="swipe-rewind-btn" style="width: 44px; height: 44px; border-radius: 50%; background: var(--bg-surface); border: 1px solid var(--border-card); color: #F59E0B; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm);" aria-label="Rewind">
          ↺
        </button>

        <!-- Pass (✕) -->
        <button id="swipe-pass-btn" style="width: 54px; height: 54px; border-radius: 50%; background: var(--bg-surface); border: 1.5px solid rgba(239,68,68,0.4); color: #EF4444; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-md);" aria-label="Pass">
          ✕
        </button>

        <!-- Super Star -->
        <button id="swipe-super-btn" style="width: 44px; height: 44px; border-radius: 50%; background: var(--bg-surface); border: 1px solid rgba(168,85,247,0.4); color: #A855F7; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm);" aria-label="Super Like">
          ★
        </button>

        <!-- Like (♥) -->
        <button id="swipe-like-btn" style="width: 54px; height: 54px; border-radius: 50%; background: ${currentSocialMode === 'dating' ? 'var(--social-pink-gradient)' : 'var(--bg-surface)'}; border: 1.5px solid ${currentSocialMode === 'dating' ? 'var(--social-pink)' : 'rgba(34,197,94,0.4)'}; color: ${currentSocialMode === 'dating' ? '#FFFFFF' : '#22C55E'}; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-md);" aria-label="Like">
          ♥
        </button>

        <!-- Boost -->
        <button id="swipe-boost-btn" style="width: 44px; height: 44px; border-radius: 50%; background: var(--bg-surface); border: 1px solid rgba(59,130,246,0.4); color: #3B82F6; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm);" aria-label="Boost Profile">
          ⚡
        </button>
      </div>
    `;

    container.querySelectorAll(".social-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        appState.setSocialMode(btn.dataset.mode);
        renderContent();
      });
    });

    container.querySelector("#swipe-like-btn")?.addEventListener("click", () => {
      appState.showToast(`It's a Match! You and ${person.name} liked each other! ✨`);
      currentIndex++;
      renderContent();
    });

    container.querySelector("#swipe-pass-btn")?.addEventListener("click", () => {
      currentIndex++;
      renderContent();
    });

    container.querySelector("#swipe-super-btn")?.addEventListener("click", () => {
      appState.showToast(`Super Liked ${person.name}! ✨`);
      currentIndex++;
      renderContent();
    });

    container.querySelector("#swipe-boost-btn")?.addEventListener("click", () => {
      appState.showToast("Profile Boosted for 30 minutes in Karnataka area! ⚡");
    });

    container.querySelector("#swipe-rewind-btn")?.addEventListener("click", () => {
      if (currentIndex > 0) currentIndex--;
      renderContent();
    });
  };

  renderContent();
  return container;
}
