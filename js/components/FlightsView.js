// AURICVISTA Flights & Transportation Engine Component
import { AIRPORTS, FLIGHT_ROUTES } from "../data/flights.js";
import { TRANSPORT_SERVICES } from "../data/transport.js";
import { appState } from "../state.js";

export function renderFlightsView() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "flights-section";

  let origin = "BLR";
  let destination = "IXE";
  let cabinClass = "Economy";
  let activeTab = "flights"; // 'flights' or 'transport'

  const renderContent = () => {
    let matchingFlights = FLIGHT_ROUTES.filter(fl => {
      return (fl.from === origin && fl.to === destination) || (origin === "ALL" && destination === "ALL") || true;
    });

    section.innerHTML = `
      <div class="content-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div>
            <span class="section-tag-gold">✈️ AIR & GROUND TRANSPORTATION</span>
            <h2 class="section-main-title">Flights & Chauffeured Fleets</h2>
            <p class="section-desc-muted">
              Connect effortlessly to Karnataka's airport gateways (Bengaluru, Mangaluru, Mysuru, Hubballi) and explore Western Ghats mountain corridors in chauffeured 4x4 SUVs.
            </p>
          </div>

          <div class="filter-tabs-pills" style="margin-bottom: 0;">
            <button class="filter-pill-btn ${activeTab === 'flights' ? 'active' : ''}" id="tab-toggle-flights">
              ✈️ Flight Routes (${FLIGHT_ROUTES.length})
            </button>
            <button class="filter-pill-btn ${activeTab === 'transport' ? 'active' : ''}" id="tab-toggle-transport">
              🚗 Chauffeured SUVs & Fleets
            </button>
          </div>
        </div>

        ${activeTab === 'flights' ? `
          <!-- Flight Search Bar -->
          <div style="background: var(--bg-card); border: 1.5px dashed var(--border-gold); border-radius: var(--radius-lg); padding: 28px; margin-bottom: 36px; box-shadow: var(--shadow-md);">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 18px; align-items: flex-end;">
              <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 6px;">From (Departure)</label>
                <select id="flight-origin-select" style="width: 100%; padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.95rem;">
                  ${AIRPORTS.map(a => `<option value="${a.code}" ${a.code === origin ? 'selected' : ''}>${a.city} (${a.code})</option>`).join("")}
                </select>
              </div>

              <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 6px;">To (Arrival)</label>
                <select id="flight-dest-select" style="width: 100%; padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.95rem;">
                  ${AIRPORTS.map(a => `<option value="${a.code}" ${a.code === destination ? 'selected' : ''}>${a.city} (${a.code})</option>`).join("")}
                </select>
              </div>

              <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 6px;">Cabin Class</label>
                <select id="flight-cabin-select" style="width: 100%; padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.95rem;">
                  <option value="Economy" ${cabinClass === 'Economy' ? 'selected' : ''}>Economy</option>
                  <option value="Premium" ${cabinClass === 'Premium' ? 'selected' : ''}>Premium Economy</option>
                  <option value="Business" ${cabinClass === 'Business' ? 'selected' : ''}>Business Class</option>
                </select>
              </div>

              <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 6px;">Departure Date</label>
                <input type="date" value="2026-09-10" style="width: 100%; padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.95rem;" />
              </div>

              <button class="btn-primary-gold" id="search-flights-btn" style="padding: 14px 20px; justify-content: center; height: 48px;">
                Search Fares
              </button>
            </div>
          </div>

          <!-- Flights Grid -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${matchingFlights.map(fl => `
              <div style="background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 22px 28px; display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 18px; min-width: 200px;">
                  <div style="font-size: 1.8rem; background: rgba(255,255,255,0.06); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    ${fl.logo}
                  </div>
                  <div>
                    <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-white);">${fl.airline}</h4>
                    <span style="font-size: 0.8rem; color: var(--text-secondary);">${fl.flightNumber} • ${fl.aircraft}</span>
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 24px;">
                  <div style="text-align: right;">
                    <div style="font-size: 1.3rem; font-weight: 800; color: var(--text-white);">${fl.departTime}</div>
                    <div style="font-size: 0.82rem; color: var(--gold-light); font-weight: 600;">${fl.from} (${fl.fromCity})</div>
                  </div>

                  <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${fl.duration}</span>
                    <div style="width: 90px; height: 2px; background: dashed var(--border-gold); position: relative;">
                      <div style="position: absolute; right: 0; top: -4px; width: 8px; height: 8px; border-radius: 50%; background: var(--gold-primary);"></div>
                    </div>
                    <span style="font-size: 0.72rem; color: var(--emerald-accent); font-weight: 600;">${fl.stops}</span>
                  </div>

                  <div>
                    <div style="font-size: 1.3rem; font-weight: 800; color: var(--text-white);">${fl.arriveTime}</div>
                    <div style="font-size: 0.82rem; color: var(--gold-light); font-weight: 600;">${fl.to} (${fl.toCity})</div>
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 24px;">
                  <div style="text-align: right;">
                    <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Fare (${cabinClass})</span>
                    <div style="font-size: 1.35rem; font-weight: 800; color: var(--gold-primary);">
                      ₹${cabinClass === 'Business' ? fl.priceBusiness.toLocaleString('en-IN') : cabinClass === 'Premium' ? fl.pricePremium.toLocaleString('en-IN') : fl.priceEconomy.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button class="btn-primary-gold book-flight-btn" data-flight-id="${fl.id}" style="padding: 10px 22px; font-size: 0.88rem;">
                    Select
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        ` : `
          <!-- Transport & Chauffeur Fleet Grid -->
          <div class="destinations-grid">
            ${TRANSPORT_SERVICES.map(tr => `
              <div class="destination-card">
                <div class="card-media-wrap" style="height: 220px;">
                  <img src="${tr.image}" alt="${tr.name}" class="card-cover-img" loading="lazy" />
                  <div class="card-overlay-gradient"></div>
                  <div class="card-top-badges">
                    <span class="badge-state-pill">${tr.category}</span>
                    <span class="badge-state-pill" style="border-color: var(--emerald-accent); color: var(--emerald-light);">👥 ${tr.capacity}</span>
                  </div>
                </div>

                <div class="card-content-body">
                  <div>
                    <h3 class="card-destination-name" style="font-size: 1.2rem; margin-bottom: 8px;">${tr.name}</h3>
                    <div style="font-size: 0.85rem; color: var(--gold-light); font-weight: 600; margin-bottom: 12px;">
                      Rate: ${tr.ratePerKm} (Base: ${tr.priceDisplay})
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px;">
                      ${tr.features.map(f => `<span style="font-size: 0.82rem; color: var(--text-secondary);">✓ ${f}</span>`).join("")}
                    </div>

                    <div style="background: rgba(255,255,255,0.04); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 16px;">
                      <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Popular Routes:</span>
                      <div style="margin-top: 6px; display: flex; flex-direction: column; gap: 4px;">
                        ${tr.popularRoutes.slice(0, 2).map(r => `
                          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-primary);">
                            <span>${r.from} ➔ ${r.to}</span>
                            <span style="color: var(--gold-light); font-weight: 700;">${r.estFare}</span>
                          </div>
                        `).join("")}
                      </div>
                    </div>
                  </div>

                  <div class="card-footer-meta">
                    <div>
                      <div class="price-label-small">Starting At</div>
                      <div class="price-value-bold">${tr.priceDisplay}</div>
                    </div>

                    <button class="btn-primary-gold book-transport-btn" data-transport-id="${tr.id}" style="padding: 8px 18px; font-size: 0.85rem;">
                      Book Chauffeur
                    </button>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      </div>
    `;

    // Tab switching listeners
    section.querySelector("#tab-toggle-flights")?.addEventListener("click", () => {
      activeTab = "flights";
      renderContent();
    });

    section.querySelector("#tab-toggle-transport")?.addEventListener("click", () => {
      activeTab = "transport";
      renderContent();
    });

    section.querySelector("#flight-origin-select")?.addEventListener("change", (e) => {
      origin = e.target.value;
    });

    section.querySelector("#flight-dest-select")?.addEventListener("change", (e) => {
      destination = e.target.value;
    });

    section.querySelector("#flight-cabin-select")?.addEventListener("change", (e) => {
      cabinClass = e.target.value;
      renderContent();
    });

    section.querySelector("#search-flights-btn")?.addEventListener("click", () => {
      renderContent();
    });

    section.querySelectorAll(".book-flight-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const flId = btn.dataset.flightId;
        const fl = FLIGHT_ROUTES.find(f => f.id === flId);
        if (fl) {
          appState.setState({
            selectedFlightForBooking: fl,
            selectedStayForBooking: null,
            selectedExperienceForBooking: null,
            selectedPackageForBooking: null,
            activeModal: "booking"
          });
        }
      });
    });

    section.querySelectorAll(".book-transport-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const trId = btn.dataset.transportId;
        const tr = TRANSPORT_SERVICES.find(t => t.id === trId);
        if (tr) {
          alert(`🚗 Chauffeur booking requested for ${tr.name}! Our private transport desk will contact you with driver details.`);
        }
      });
    });
  };

  renderContent();
  return section;
}
