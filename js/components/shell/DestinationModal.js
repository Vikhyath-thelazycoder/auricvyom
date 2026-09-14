// AURICVISTA Destination Detail Modal Component
import { appState } from "../../state.js";

export function renderDestinationModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.id = "destination-modal";

  const updateModalDOM = (dest) => {
    if (!dest) return;

    modal.innerHTML = `
      <div class="bottom-sheet-panel" style="padding-top: 0; max-height: 88vh;">
        <div style="position: relative; margin: 0 calc(-1 * var(--space-4)); height: 220px; overflow: hidden;">
          <img src="${dest.bannerImage || dest.image}" style="width: 100%; height: 100%; object-fit: cover;" alt="${dest.name}" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(8,11,16,0.3) 0%, rgba(8,11,16,0.9) 100%);"></div>
          
          <button id="close-dest-modal-btn" style="position: absolute; top: var(--space-3); right: var(--space-3); width: 36px; height: 36px; border-radius: 50%; background: rgba(8,11,16,0.7); backdrop-filter: var(--glass-blur-sm); color: var(--text-primary); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; z-index: 5;">
            ✕
          </button>

          <div style="position: absolute; bottom: var(--space-3); left: var(--space-4); right: var(--space-4); z-index: 4;">
            <span class="label-caps" style="background: rgba(8,11,16,0.6); padding: 2px 8px; border-radius: var(--radius-full); border: 1px solid var(--border-gold);">${dest.highlight}</span>
            <h2 style="font-family: var(--font-serif); font-size: 1.85rem; font-weight: 700; color: var(--text-primary); margin-top: 4px;">${dest.name}</h2>
            <div style="font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: center; gap: 8px;">
              <span>📍 ${dest.region}</span>
              <span>•</span>
              <span style="color: var(--gold-primary); font-weight: 700;">★ ${dest.rating} (${dest.reviewsCount} reviews)</span>
            </div>
          </div>
        </div>

        <div style="padding-top: var(--space-4);">
          <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-4);">
            <div style="flex: 1; background: var(--bg-surface); padding: var(--space-2-5); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); text-align: center;">
              <div style="font-size: 0.72rem; color: var(--text-muted);">Current Weather</div>
              <div style="font-weight: 700; font-size: 0.88rem; color: var(--gold-light);">${dest.weather}</div>
            </div>
            <div style="flex: 1; background: var(--bg-surface); padding: var(--space-2-5); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); text-align: center;">
              <div style="font-size: 0.72rem; color: var(--text-muted);">Verified Stays</div>
              <div style="font-weight: 700; font-size: 0.88rem; color: var(--text-primary);">${dest.staysCount} Properties</div>
            </div>
            <div style="flex: 1; background: var(--bg-surface); padding: var(--space-2-5); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); text-align: center;">
              <div style="font-size: 0.72rem; color: var(--text-muted);">Travel Groups</div>
              <div style="font-weight: 700; font-size: 0.88rem; color: var(--text-primary);">${dest.groupsCount} Active</div>
            </div>
          </div>

          <div class="label-caps" style="margin-bottom: var(--space-1);">About Experience</div>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-4);">
            ${dest.description}
          </p>

          <div class="label-caps" style="margin-bottom: var(--space-2);">Curated Highlights</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: var(--space-6);">
            ${dest.tags.map(t => `<span class="auric-chip" style="font-size: 0.75rem; padding: 4px 10px; pointer-events: none;">✨ ${t}</span>`).join("")}
          </div>

          <div style="display: flex; gap: var(--space-2);">
            <button class="btn-gold" id="dest-plan-btn" style="flex: 1;">
              <span>✨ Plan Trip to ${dest.name}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    modal.querySelector("#close-dest-modal-btn")?.addEventListener("click", () => {
      appState.closeModal();
    });

    modal.querySelector("#dest-plan-btn")?.addEventListener("click", () => {
      appState.closeModal();
      appState.showToast(`AI Trip Planner initialized for ${dest.name} ✨`);
    });
  };

  modal.addEventListener("click", (e) => {
    if (e.target === modal) appState.closeModal();
  });

  appState.subscribe((state) => {
    if (state.activeModal === "destination" && state.modalData) {
      updateModalDOM(state.modalData);
      modal.classList.add("active");
    } else if (state.activeModal !== "destination") {
      modal.classList.remove("active");
    }
  });

  return modal;
}
