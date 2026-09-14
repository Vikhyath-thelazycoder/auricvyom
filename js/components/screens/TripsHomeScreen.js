// AURICVISTA TRIPS_HOME — Mobile Trips & Itinerary Screen Component
import { appState, SCREEN_IDS } from "../../state.js";
import { userTrips } from "../../data/trips.js";

export function renderTripsHomeScreen() {
  const container = document.createElement("div");
  container.className = "screen-trips-home";
  container.id = "screen-trips-home";
  container.style.padding = "var(--space-4)";

  const trip = userTrips[0];

  container.innerHTML = `
    <div style="margin-bottom: var(--space-4);">
      <h1 class="section-title" style="font-size: 1.7rem;">Your Trips</h1>
      <p class="section-subtitle">Collaborative itineraries & expense tracking</p>
    </div>

    <!-- Active Trip Showcase -->
    <div class="upcoming-trip-card" style="margin: 0 0 var(--space-4) 0; border: 1.5px solid var(--border-gold);">
      <div style="height: 140px; margin: -16px -16px 12px -16px; position: relative; overflow: hidden; border-radius: var(--radius-md) var(--radius-md) 0 0;">
        <img src="${trip.coverImage}" alt="${trip.title}" style="width: 100%; height: 100%; object-fit: cover;" />
        <div class="dest-card-overlay"></div>
        <span class="stay-type-badge" style="position: absolute; bottom: 8px; left: 8px;">
          ● ${trip.status} Trip
        </span>
      </div>

      <div class="upcoming-trip-header">
        <div>
          <div class="trip-title" style="font-size: 1.25rem;">${trip.title}</div>
          <div class="trip-meta">${trip.dates} • ${trip.membersCount} Members</div>
        </div>
        <span class="trip-status-pill">${trip.progressPercentage}% Ready</span>
      </div>

      <div class="trip-progress-bar-bg">
        <div class="trip-progress-fill" style="width: ${trip.progressPercentage}%;"></div>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-secondary);">
        <span>📅 ${trip.itineraryStats}</span>
        <span>💰 Spent ${trip.currency}${trip.budgetSpent.toLocaleString()}</span>
      </div>
    </div>

    <!-- Multi-Day Itinerary Preview -->
    <div class="label-caps" style="margin-bottom: var(--space-2);">Itinerary Timeline</div>
    <div style="display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-6);">
      <div style="background: var(--bg-surface); padding: var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--gold-light); font-size: 0.85rem;">
          <span>DAY 1 • 12 DEC</span>
          <span>Madikeri</span>
        </div>
        <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-top: 4px;">Bangalore Arrival & Coffee Estate Check-in</div>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">Stay: The Hosteller Coorg • Sunset Coffee Walk</div>
      </div>

      <div style="background: var(--bg-surface); padding: var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--gold-light); font-size: 0.85rem;">
          <span>DAY 2 • 13 DEC</span>
          <span>Tadiandamol</span>
        </div>
        <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-top: 4px;">Peak Trek & Abbey Falls Excursion</div>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">Jeep transport booked • Kodava traditional feast</div>
      </div>

      <div style="background: var(--bg-surface); padding: var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--gold-light); font-size: 0.85rem;">
          <span>DAY 3 • 14 DEC</span>
          <span>Dubare</span>
        </div>
        <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-top: 4px;">Elephant Camp & River Rafting</div>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">Bylakuppe Golden Temple monastery visit</div>
      </div>
    </div>

    <button class="btn-gold" id="create-new-trip-btn" style="width: 100%;">
      <span>+ Create New Trip</span>
    </button>
  `;

  container.querySelector("#create-new-trip-btn")?.addEventListener("click", () => {
    appState.showToast("Trip Planner Studio: Initializing new journey... ✨");
  });

  return container;
}
