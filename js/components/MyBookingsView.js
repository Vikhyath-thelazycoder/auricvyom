// AURICVISTA My Bookings & Travel Vouchers Component
import { appState } from "../state.js";

export function renderMyBookingsView() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "my-bookings-section";

  const renderContent = () => {
    const { bookings, user } = appState.getState();

    section.innerHTML = `
      <div class="content-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div>
            <span class="section-tag-gold">🎟️ BESPOKE RESERVATIONS & VOUCHERS</span>
            <h2 class="section-main-title">My Bookings & Travel Passes</h2>
            <p class="section-desc-muted">
              Access confirmed reservations, instant check-in travel vouchers, and itinerary details for all your upcoming and past journeys.
            </p>
          </div>

          <!-- User Tier Badge -->
          <div style="background: rgba(212, 175, 55, 0.12); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 12px 20px; text-align: right;">
            <span style="font-size: 0.72rem; color: var(--gold-light); text-transform: uppercase; font-weight: 700;">Membership Status</span>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--text-white);">${user.tier}</div>
            <div style="font-size: 0.8rem; color: var(--emerald-light);">⭐ ${user.loyaltyPoints.toLocaleString()} Auric Points</div>
          </div>
        </div>

        <!-- Bookings List -->
        <div style="display: flex; flex-direction: column; gap: 24px;">
          ${bookings.map(b => `
            <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-md);" id="booking-item-${b.id}">
              <div style="display: grid; grid-template-columns: auto 1fr auto; gap: 24px; align-items: center; flex-wrap: wrap;">
                <!-- Thumbnail -->
                <img src="${b.image}" alt="${b.title}" style="width: 120px; height: 95px; border-radius: var(--radius-md); object-fit: cover;" />

                <!-- Details -->
                <div>
                  <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 6px;">
                    <span class="badge-state-pill" style="font-size: 0.7rem; background: rgba(16, 185, 129, 0.2); border-color: var(--emerald-accent); color: var(--emerald-light);">
                      ● ${b.status}
                    </span>
                    <span style="font-size: 0.82rem; color: var(--gold-light); font-weight: 700;">Voucher: ${b.voucherCode}</span>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">Booked: ${b.bookingDate}</span>
                  </div>

                  <h3 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--text-white); margin-bottom: 4px;">${b.title}</h3>
                  <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 8px;">📍 ${b.destination}</p>

                  <div style="display: flex; gap: 18px; font-size: 0.85rem; color: var(--text-primary);">
                    ${b.checkIn ? `<span>📅 Check-in: <strong>${b.checkIn}</strong></span>` : ''}
                    ${b.checkOut ? `<span>📅 Check-out: <strong>${b.checkOut}</strong></span>` : ''}
                    ${b.guests ? `<span>👥 Guests: <strong>${b.guests}</strong></span>` : ''}
                  </div>
                </div>

                <!-- Price & Voucher Actions -->
                <div style="text-align: right; min-width: 180px;">
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Total Paid</span>
                  <div style="font-size: 1.4rem; font-weight: 900; color: var(--gold-primary); margin-bottom: 12px;">
                    ₹${b.totalPrice.toLocaleString('en-IN')}
                  </div>

                  <div style="display: flex; gap: 8px; justify-content: flex-end;">
                    <button class="btn-outline-glass print-voucher-btn" data-booking-id="${b.id}" style="padding: 8px 16px; font-size: 0.82rem;">
                      🖨️ Print Voucher
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    section.querySelectorAll(".print-voucher-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        window.print();
      });
    });
  };

  appState.subscribe(() => {
    if (appState.getState().activeTab === "bookings") {
      renderContent();
    }
  });

  renderContent();
  return section;
}
