// AURICVISTA Stay Detail Modal Component
import { appState } from "../../state.js";

export function renderStayModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.id = "stay-modal";

  const updateModalDOM = (stay) => {
    if (!stay) return;

    const isFav = appState.isWishlisted(stay.id);

    modal.innerHTML = `
      <div class="bottom-sheet-panel" style="padding-top: 0; max-height: 90vh;">
        <div style="position: relative; margin: 0 calc(-1 * var(--space-4)); height: 240px; overflow: hidden;">
          <img src="${stay.image}" style="width: 100%; height: 100%; object-fit: cover;" alt="${stay.name}" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(8,11,16,0.2) 0%, rgba(8,11,16,0.85) 100%);"></div>
          
          <button id="close-stay-modal-btn" style="position: absolute; top: var(--space-3); right: var(--space-3); width: 36px; height: 36px; border-radius: 50%; background: rgba(8,11,16,0.7); backdrop-filter: var(--glass-blur-sm); color: var(--text-primary); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; z-index: 5;">
            ✕
          </button>

          <button id="modal-fav-btn" style="position: absolute; top: var(--space-3); left: var(--space-3); width: 36px; height: 36px; border-radius: 50%; background: rgba(8,11,16,0.7); backdrop-filter: var(--glass-blur-sm); color: ${isFav ? "var(--social-pink)" : "var(--text-primary)"}; border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; z-index: 5;">
            ${isFav ? "♥" : "♡"}
          </button>

          <div style="position: absolute; bottom: var(--space-3); left: var(--space-4); right: var(--space-4); z-index: 4;">
            <span class="stay-type-badge">${stay.type}</span>
            <h2 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700; color: var(--text-primary); margin-top: 6px;">${stay.name}</h2>
            <div style="font-size: 0.82rem; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; margin-top: 2px;">
              <span>📍 ${stay.location}</span>
              <span>•</span>
              <span style="color: var(--gold-primary); font-weight: 700;">★ ${stay.rating} (${stay.reviewsCount} reviews)</span>
            </div>
          </div>
        </div>

        <div style="padding-top: var(--space-4);">
          <div style="background: var(--bg-surface); padding: var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
            <div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Pricing Rate</div>
              <div style="display: flex; align-items: baseline; gap: 4px;">
                <span style="font-size: 1.4rem; font-weight: 800; color: var(--gold-primary);">${stay.currency}${stay.price.toLocaleString()}</span>
                <span style="font-size: 0.8rem; color: var(--text-muted);">/ ${stay.pricePeriod}</span>
              </div>
            </div>
            <div style="text-align: right;">
              <span style="background: var(--success-subtle); border: 1px solid rgba(34,197,94,0.3); border-radius: var(--radius-full); padding: 4px 10px; font-size: 0.72rem; font-weight: 700; color: var(--success);">
                ✓ Verified Partner
              </span>
            </div>
          </div>

          <div class="label-caps" style="margin-bottom: var(--space-1);">Description</div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: var(--space-4);">
            ${stay.description}
          </p>

          <div class="label-caps" style="margin-bottom: var(--space-2);">Included Amenities</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: var(--space-6);">
            ${stay.amenities.map(a => `<span class="auric-chip" style="font-size: 0.74rem; padding: 4px 10px; pointer-events: none;">✓ ${a}</span>`).join("")}
          </div>

          <div style="display: flex; gap: var(--space-2);">
            <button class="btn-gold" id="reserve-hold-btn" style="flex: 1;">
              <span>Request Booking Hold</span>
            </button>
          </div>
        </div>
      </div>
    `;

    modal.querySelector("#close-stay-modal-btn")?.addEventListener("click", () => {
      appState.closeModal();
    });

    modal.querySelector("#modal-fav-btn")?.addEventListener("click", () => {
      appState.toggleWishlist(stay.id);
      updateModalDOM(stay);
    });

    modal.querySelector("#reserve-hold-btn")?.addEventListener("click", () => {
      appState.closeModal();
      appState.showToast(`Booking hold requested for ${stay.name}. Awaiting partner confirmation.`);
    });
  };

  modal.addEventListener("click", (e) => {
    if (e.target === modal) appState.closeModal();
  });

  appState.subscribe((state) => {
    if (state.activeModal === "stay" && state.modalData) {
      updateModalDOM(state.modalData);
      modal.classList.add("active");
    } else if (state.activeModal !== "stay") {
      modal.classList.remove("active");
    }
  });

  return modal;
}
