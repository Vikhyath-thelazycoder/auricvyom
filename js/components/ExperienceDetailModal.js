// AURICVISTA Experience Deep Detail Modal Component
import { appState } from "../state.js";

export function renderExperienceDetailModal() {
  const backdrop = document.createElement("div");
  backdrop.className = "auric-modal-backdrop";
  backdrop.id = "experience-detail-modal-backdrop";

  let selectedSlot = null;
  let guestsCount = 2;

  const renderContent = () => {
    const { selectedExperienceDetail, activeModal } = appState.getState();
    if (activeModal !== "experienceDetail" || !selectedExperienceDetail) {
      backdrop.classList.remove("active");
      backdrop.innerHTML = "";
      return;
    }

    const exp = selectedExperienceDetail;
    const slots = exp.availableSlots || ["09:00 AM", "02:30 PM"];
    if (!selectedSlot) selectedSlot = slots[0];

    const basePrice = exp.price || 2499;
    const subTotal = basePrice * guestsCount;
    const gstTotal = Math.round(subTotal * 0.18);
    const grandTotal = subTotal + gstTotal;

    backdrop.innerHTML = `
      <div class="modal-window-container" style="max-width: 900px;" id="exp-modal-window">
        <!-- Close Button -->
        <button class="modal-close-btn" id="exp-detail-close-x">✕</button>

        <!-- Media Hero Banner -->
        <div style="position: relative; height: 320px; overflow: hidden; border-top-left-radius: var(--radius-lg); border-top-right-radius: var(--radius-lg);">
          <img src="${exp.image}" alt="${exp.title}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7,9,14,0.3) 0%, rgba(18, 27, 43, 0.95) 100%);"></div>

          <div style="position: absolute; bottom: 24px; left: 32px; right: 32px;">
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
              <span class="badge-state-pill" style="font-size: 0.72rem;">${exp.category}</span>
              <span class="badge-state-pill" style="background: rgba(7,9,14,0.85); border-color: rgba(255,255,255,0.3); font-size: 0.7rem;">⚡ ${exp.difficulty || 'Moderate'}</span>
              <span style="color: var(--gold-light); font-size: 0.85rem; font-weight: 700;">📍 ${exp.destinationName}</span>
            </div>
            <h2 style="font-family: var(--font-serif); font-size: 1.85rem; color: var(--text-white); margin-bottom: 4px;">${exp.title}</h2>
          </div>
        </div>

        <!-- Body Content -->
        <div style="padding: 32px; display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 32px;">
          <!-- Left Column -->
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--gold-light); margin-bottom: 10px;">Experience Overview</h3>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem; margin-bottom: 24px;">
              ${exp.description}
            </p>

            <!-- What's Included -->
            <div style="margin-bottom: 24px;">
              <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-white); margin-bottom: 12px;">What's Included</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${(exp.included || ["Certified Guide", "Safety Gear", "Refreshments", "Permits"]).map(inc => `
                  <div style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem; color: var(--text-primary);">
                    <span style="color: var(--emerald-light);">✓</span>
                    <span>${inc}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- What to Bring & Safety -->
            <div>
              <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-white); margin-bottom: 10px;">What to Bring & Safety Guidelines</h4>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 0.88rem; color: var(--text-secondary);">
                <li>• Comfortable outdoor trekking / walking footwear with grip</li>
                <li>• Reusable water bottle and sunscreen / hat</li>
                <li>• Camera / binoculars for wildlife spotting</li>
                <li>• Please arrive 15 minutes prior to your scheduled time slot</li>
              </ul>
            </div>
          </div>

          <!-- Right Column: Booking Slot Card -->
          <div>
            <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-lg);">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Price</span>
                  <div style="font-size: 1.5rem; font-weight: 800; color: var(--gold-primary);">${exp.priceDisplay}</div>
                </div>
                <div class="card-rating-badge">
                  <span>★</span>
                  <span>${exp.rating || 4.95}</span>
                </div>
              </div>

              <!-- Available Time Slots -->
              <div style="margin-bottom: 18px;">
                <label style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 8px;">Select Available Slot</label>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${slots.map(slot => `
                    <button class="slot-choice-pill ${slot === selectedSlot ? 'active' : ''}" data-slot="${slot}" style="padding: 10px 14px; background: ${slot === selectedSlot ? 'rgba(212,175,55,0.18)' : 'rgba(255,255,255,0.04)'}; border: 1px solid ${slot === selectedSlot ? 'var(--gold-primary)' : 'var(--border-subtle)'}; border-radius: var(--radius-sm); color: ${slot === selectedSlot ? 'var(--gold-light)' : 'var(--text-secondary)'}; font-size: 0.85rem; font-weight: 600; text-align: left; cursor: pointer;">
                      🕒 ${slot} (Guaranteed Slot)
                    </button>
                  `).join("")}
                </div>
              </div>

              <!-- Guests Count -->
              <div style="margin-bottom: 20px;">
                <label style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 6px;">Number of Guests</label>
                <select id="exp-guests-select" style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.88rem;">
                  <option value="1" ${guestsCount === 1 ? 'selected' : ''}>1 Person</option>
                  <option value="2" ${guestsCount === 2 ? 'selected' : ''}>2 People</option>
                  <option value="3" ${guestsCount === 3 ? 'selected' : ''}>3 People</option>
                  <option value="4" ${guestsCount === 4 ? 'selected' : ''}>4 People</option>
                  <option value="6" ${guestsCount === 6 ? 'selected' : ''}>6 People (Private Group)</option>
                </select>
              </div>

              <!-- Price Breakdown -->
              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 18px; border-top: 1px solid var(--border-subtle); padding-top: 14px;">
                <div style="display: flex; justify-content: space-between;">
                  <span>₹${basePrice.toLocaleString('en-IN')} × ${guestsCount} guest${guestsCount > 1 ? 's' : ''}</span>
                  <span style="color: var(--text-white);">₹${subTotal.toLocaleString('en-IN')}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Taxes (18% GST)</span>
                  <span style="color: var(--text-white);">₹${gstTotal.toLocaleString('en-IN')}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1rem; color: var(--gold-primary); border-top: 1px solid var(--border-subtle); padding-top: 8px; margin-top: 4px;">
                  <span>Total Amount</span>
                  <span>₹${grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <!-- Book Action -->
              <button class="btn-primary-gold" id="exp-reserve-now-btn" style="width: 100%; justify-content: center; padding: 12px; font-size: 0.95rem;">
                Reserve Experience Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    backdrop.classList.add("active");

    backdrop.querySelector("#exp-detail-close-x")?.addEventListener("click", () => {
      appState.closeModal();
    });

    backdrop.querySelectorAll(".slot-choice-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        selectedSlot = pill.dataset.slot;
        renderContent();
      });
    });

    backdrop.querySelector("#exp-guests-select")?.addEventListener("change", (e) => {
      guestsCount = parseInt(e.target.value);
      renderContent();
    });

    backdrop.querySelector("#exp-reserve-now-btn")?.addEventListener("click", () => {
      appState.closeModal();
      appState.setState({
        selectedExperienceForBooking: {
          ...exp,
          selectedSlot,
          guests: guestsCount,
          totalPrice: grandTotal
        },
        selectedStayForBooking: null,
        selectedPackageForBooking: null,
        selectedFlightForBooking: null,
        activeModal: "booking"
      });
    });
  };

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      appState.closeModal();
    }
  });

  appState.subscribe(() => {
    renderContent();
  });

  return backdrop;
}
