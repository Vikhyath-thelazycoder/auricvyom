// AURICVISTA INBOX — Mobile Messages & Chat Screen Component
// Matches prd/design.md & templet/app view.png (Screen 4: 1:1 Chat, Screen 5: Group Chat)

import { appState } from "../../state.js";

export function renderInboxScreen() {
  const container = document.createElement("div");
  container.className = "screen-inbox";
  container.id = "screen-inbox";
  container.style.padding = "var(--space-4)";

  container.innerHTML = `
    <div style="margin-bottom: var(--space-4);">
      <h1 class="section-title" style="font-size: 1.7rem;">Messages</h1>
      <p class="section-subtitle">Direct connections & travel squads</p>
    </div>

    <!-- Active Chat List -->
    <div style="display: flex; flex-direction: column; gap: var(--space-2-5);">
      <!-- 1. Coorg Trip Squad (Group Chat) -->
      <div class="chat-thread-item" id="chat-coorg-squad" style="display: flex; gap: var(--space-3); align-items: center; background: var(--bg-surface); padding: var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-gold); cursor: pointer;">
        <div style="position: relative; width: 52px; height: 52px; border-radius: var(--radius-md); overflow: hidden; flex-shrink: 0;">
          <img src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=200&q=80" style="width: 100%; height: 100%; object-fit: cover;" alt="Coorg Squad" />
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div style="font-weight: 700; font-size: 0.98rem; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              Coorg Trip Squad 🌲
            </div>
            <span style="font-size: 0.72rem; color: var(--gold-light);">11:32 AM</span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            <span style="color: var(--gold-primary); font-weight: 600;">Sneha:</span> Madikeri homestay sounds good!!
          </div>
        </div>
        <span style="width: 9px; height: 9px; border-radius: 50%; background: var(--gold-primary); flex-shrink: 0;"></span>
      </div>

      <!-- 2. Ananya (1:1 Direct Chat) -->
      <div class="chat-thread-item" id="chat-ananya" style="display: flex; gap: var(--space-3); align-items: center; background: var(--bg-surface); padding: var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); cursor: pointer;">
        <div style="position: relative; width: 52px; height: 52px; border-radius: var(--radius-md); overflow: hidden; flex-shrink: 0;">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" style="width: 100%; height: 100%; object-fit: cover;" alt="Ananya" />
          <span style="position: absolute; bottom: 2px; right: 2px; width: 10px; height: 10px; border-radius: 50%; background: var(--success); border: 2px solid var(--bg-surface);"></span>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div style="font-weight: 700; font-size: 0.98rem; color: var(--text-primary); display: flex; align-items: center; gap: 4px;">
              <span>Ananya</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#10B981"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
            <span style="font-size: 0.72rem; color: var(--text-muted);">10:35 AM</span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            Great! Let's create an epic plan.
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll(".chat-thread-item").forEach(item => {
    item.addEventListener("click", () => {
      appState.showToast("Opening encrypted chat channel... ✨");
    });
  });

  return container;
}
