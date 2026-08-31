// AURICVISTA Stay Deep Detail & Room Showcase Modal Component
import { appState } from "../state.js";

export function renderStayDetailModal() {
  const backdrop = document.createElement("div");
  backdrop.className = "auric-modal-backdrop";
  backdrop.id = "stay-detail-modal-backdrop";

  let selectedRoomId = null;
  let checkInDate = new Date().toISOString().split("T")[0];
  const nextDate = new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0];
  let checkOutDate = nextDate;
  let guestsCount = 2;

  const renderContent = () => {
    const { selectedStayDetail, activeModal } = appState.getState();
    if (activeModal !== "stayDetail" || !selectedStayDetail) {
      backdrop.classList.remove("active");
      backdrop.innerHTML = "";
      return;
    }

    const stay = selectedStayDetail;
    const gallery = stay.gallery || [stay.image];
    const roomTypes = stay.roomTypes || [
      {
        id: "default-room",
        name: "Standard Estate Suite",
        price: stay.pricePerNight,
        bedType: "1 King Bed",
        maxGuests: 2,
        image: stay.image,
        features: ["Garden View", "Air Conditioning", "Ensuite Marble Bath"]
      }
    ];

    if (!selectedRoomId) {
      selectedRoomId = roomTypes[0].id;
    }

    const activeRoom = roomTypes.find(r => r.id === selectedRoomId) || roomTypes[0];
    const nights = Math.max(1, Math.round((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)));
    const baseTotal = activeRoom.price * nights;
    const gstTotal = Math.round(baseTotal * 0.18);
    const serviceFee = Math.round(baseTotal * 0.05);
    const grandTotal = baseTotal + gstTotal + serviceFee;

    backdrop.innerHTML = `
      <div class="modal-window-container" style="max-width: 1050px;" id="stay-modal-window">
        <!-- Close Button -->
        <button class="modal-close-btn" id="stay-detail-close-x">✕</button>

        <!-- Header -->
        <div style="padding: 28px 36px 16px; border-bottom: 1px solid var(--border-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
            <div>
              <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
                <span class="badge-state-pill" style="font-size: 0.72rem;">${stay.propertyType || 'Luxury'}</span>
                <span style="color: var(--gold-light); font-size: 0.85rem; font-weight: 700;">📍 ${stay.destinationName}</span>
              </div>
              <h2 style="font-family: var(--font-serif); font-size: 1.85rem; color: var(--text-white); margin-bottom: 4px;">${stay.name}</h2>
              <div style="display: flex; gap: 16px; font-size: 0.85rem; color: var(--text-secondary);">
                <span>⭐ <strong>${stay.rating}</strong> (${stay.reviewsCount || 300} verified reviews)</span>
                <span>•</span>
                <span>✨ Cleanliness: <strong>${stay.cleanlinessRating || 4.9}</strong></span>
                <span>•</span>
                <span>📍 Location: <strong>${stay.locationRating || 5.0}</strong></span>
              </div>
            </div>

            <div style="text-align: right;">
              <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">From</span>
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--gold-primary);">${stay.priceDisplay}</div>
              <span style="font-size: 0.75rem; color: var(--text-secondary);">+ ₹${stay.taxesAndFees || Math.round(stay.pricePerNight * 0.18)} taxes & fees</span>
            </div>
          </div>
        </div>

        <div style="padding: 28px 36px; display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 36px;">
          <!-- Left Column: Gallery, Overview, Rooms, Amenities -->
          <div>
            <!-- Gallery Grid -->
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px; margin-bottom: 28px; border-radius: var(--radius-md); overflow: hidden;">
              <img src="${gallery[0]}" alt="${stay.name}" style="width: 100%; height: 260px; object-fit: cover;" />
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <img src="${gallery[1] || gallery[0]}" alt="${stay.name}" style="width: 100%; height: 125px; object-fit: cover;" />
                <img src="${gallery[2] || gallery[0]}" alt="${stay.name}" style="width: 100%; height: 125px; object-fit: cover;" />
              </div>
            </div>

            <!-- Property Narrative -->
            <div style="margin-bottom: 28px;">
              <h3 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--gold-light); margin-bottom: 8px;">About this Sanctuary</h3>
              <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">${stay.description}</p>
            </div>

            <!-- Room Types -->
            <div style="margin-bottom: 28px;">
              <h3 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--gold-light); margin-bottom: 14px;">Select Suite or Villa</h3>
              <div style="display: flex; flex-direction: column; gap: 14px;">
                ${roomTypes.map(room => `
                  <div class="room-choice-card ${room.id === selectedRoomId ? 'active' : ''}" data-room-id="${room.id}" style="padding: 16px; background: var(--bg-card); border: 1.5px solid ${room.id === selectedRoomId ? 'var(--gold-primary)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); cursor: pointer; display: flex; gap: 16px; align-items: center; transition: all 0.2s;">
                    <img src="${room.image}" alt="${room.name}" style="width: 80px; height: 70px; border-radius: var(--radius-sm); object-fit: cover;" />
                    <div style="flex: 1;">
                      <h4 style="font-size: 0.98rem; font-weight: 700; color: var(--text-white); margin-bottom: 4px;">${room.name}</h4>
                      <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px;">🛏️ ${room.bedType} • 👥 Max ${room.maxGuests} Guests</div>
                      <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                        ${(room.features || []).slice(0, 2).map(f => `<span style="font-size: 0.72rem; padding: 2px 8px; background: rgba(255,255,255,0.06); border-radius: 4px; color: var(--gold-light);">${f}</span>`).join("")}
                      </div>
                    </div>
                    <div style="text-align: right;">
                      <div style="font-size: 1.15rem; font-weight: 800; color: var(--gold-primary);">₹${room.price.toLocaleString('en-IN')}</div>
                      <span style="font-size: 0.7rem; color: var(--text-muted);">/ night</span>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Amenities Grid -->
            <div style="margin-bottom: 28px;">
              <h3 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--gold-light); margin-bottom: 12px;">Included Amenities</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${stay.amenities.map(am => `
                  <div style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem; color: var(--text-primary);">
                    <span style="color: var(--gold-primary);">✓</span>
                    <span>${am}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- House Rules & Policies -->
            <div>
              <h3 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--gold-light); margin-bottom: 10px;">House Rules & Cancellation</h3>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 12px;">
                ${(stay.houseRules || []).map(hr => `<li>• ${hr}</li>`).join("")}
              </ul>
              <div style="padding: 10px 14px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid var(--emerald-accent); border-radius: 4px; font-size: 0.82rem; color: var(--emerald-light);">
                🛡️ ${stay.cancellationPolicy}
              </div>
            </div>
          </div>

          <!-- Right Column: Live Booking Card & Price Calculator -->
          <div>
            <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-lg); position: sticky; top: 20px;">
              <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-white); margin-bottom: 16px;">Reserve Your Stay</h3>

              <!-- Dates & Guests Box -->
              <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; margin-bottom: 20px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--border-subtle);">
                  <div style="padding: 10px 14px; border-right: 1px solid var(--border-subtle);">
                    <label style="font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block;">Check-in</label>
                    <input type="date" id="stay-calc-checkin" value="${checkInDate}" style="background: transparent; border: none; color: var(--text-white); font-size: 0.85rem; outline: none; width: 100%;" />
                  </div>
                  <div style="padding: 10px 14px;">
                    <label style="font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block;">Check-out</label>
                    <input type="date" id="stay-calc-checkout" value="${checkOutDate}" style="background: transparent; border: none; color: var(--text-white); font-size: 0.85rem; outline: none; width: 100%;" />
                  </div>
                </div>
                <div style="padding: 10px 14px;">
                  <label style="font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block;">Guests</label>
                  <select id="stay-calc-guests" style="background: transparent; border: none; color: var(--text-white); font-size: 0.85rem; outline: none; width: 100%; cursor: pointer;">
                    <option value="1" ${guestsCount === 1 ? 'selected' : ''}>1 Adult</option>
                    <option value="2" ${guestsCount === 2 ? 'selected' : ''}>2 Adults</option>
                    <option value="3" ${guestsCount === 3 ? 'selected' : ''}>3 Guests (Family)</option>
                    <option value="4" ${guestsCount === 4 ? 'selected' : ''}>4 Guests (Suite)</option>
                  </select>
                </div>
              </div>

              <!-- Price Breakdown -->
              <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
                <div style="display: flex; justify-content: space-between;">
                  <span>₹${activeRoom.price.toLocaleString('en-IN')} × ${nights} night${nights > 1 ? 's' : ''}</span>
                  <span style="color: var(--text-white);">₹${baseTotal.toLocaleString('en-IN')}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Goods & Services Tax (18% GST)</span>
                  <span style="color: var(--text-white);">₹${gstTotal.toLocaleString('en-IN')}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Auric Concierge & Eco Fee (5%)</span>
                  <span style="color: var(--text-white);">₹${serviceFee.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <!-- Grand Total -->
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 24px;">
                <span style="font-size: 1.05rem; font-weight: 700; color: var(--text-white);">Total (INR)</span>
                <span style="font-size: 1.5rem; font-weight: 900; color: var(--gold-primary);">₹${grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <!-- Reserve Action Button -->
              <button class="btn-primary-gold" id="stay-proceed-booking-btn" style="width: 100%; justify-content: center; padding: 14px; font-size: 1rem;">
                Proceed to Reservation
              </button>
              <span style="font-size: 0.72rem; color: var(--text-muted); text-align: center; display: block; margin-top: 10px;">
                Instant Confirmation • Best Rate Guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    `;

    backdrop.classList.add("active");

    // Listeners
    backdrop.querySelector("#stay-detail-close-x")?.addEventListener("click", () => {
      appState.closeModal();
    });

    backdrop.querySelectorAll(".room-choice-card").forEach(card => {
      card.addEventListener("click", () => {
        selectedRoomId = card.dataset.roomId;
        renderContent();
      });
    });

    backdrop.querySelector("#stay-calc-checkin")?.addEventListener("change", (e) => {
      checkInDate = e.target.value;
      renderContent();
    });

    backdrop.querySelector("#stay-calc-checkout")?.addEventListener("change", (e) => {
      checkOutDate = e.target.value;
      renderContent();
    });

    backdrop.querySelector("#stay-calc-guests")?.addEventListener("change", (e) => {
      guestsCount = parseInt(e.target.value);
      renderContent();
    });

    backdrop.querySelector("#stay-proceed-booking-btn")?.addEventListener("click", () => {
      appState.closeModal();
      appState.setState({
        selectedStayForBooking: {
          ...stay,
          selectedRoom: activeRoom,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          guests: guestsCount,
          nights,
          totalPrice: grandTotal
        },
        selectedExperienceForBooking: null,
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
