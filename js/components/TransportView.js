// AURICVISTA Unified Transport Marketplace Component
import { FLIGHT_ROUTES, AIRPORTS } from "../data/flights.js";
import { TRAIN_ROUTES } from "../data/trains.js";
import { BUS_ROUTES } from "../data/buses.js";
import { TRANSPORT_SERVICES } from "../data/transport.js";
import { appState } from "../state.js";

export function renderTransportView() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "transport-section";

  let activeTransportTab = "flights"; // flights, trains, buses, cabs, rentals, transfers

  const renderContent = () => {
    section.innerHTML = `
      <div class="content-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div>
            <span class="section-tag-gold">🚗 UNIFIED TRANSPORT & AVIATION</span>
            <h2 class="section-main-title">Multi-Modal Travel & Connectivity</h2>
            <p class="section-desc-muted">
              Seamlessly search domestic flights, semi-high speed Vande Bharat trains, luxury KSRTC Volvos, and chauffeured 4x4 expedition fleets.
            </p>
          </div>

          <div style="background: rgba(212, 175, 55, 0.12); border: 1px solid var(--border-gold); border-radius: var(--radius-full); padding: 8px 18px; font-size: 0.82rem; color: var(--gold-light); font-weight: 700;">
            ⚡ Instant Seat & Route Verification
          </div>
        </div>

        <!-- Unified Mode Switcher Tabs -->
        <div class="filter-tabs-pills" style="margin-bottom: 28px;">
          <button class="filter-pill-btn ${activeTransportTab === 'flights' ? 'active' : ''}" data-tmode="flights">
            ✈️ Domestic Flights
          </button>
          <button class="filter-pill-btn ${activeTransportTab === 'trains' ? 'active' : ''}" data-tmode="trains">
            🚆 Vande Bharat & Trains
          </button>
          <button class="filter-pill-btn ${activeTransportTab === 'buses' ? 'active' : ''}" data-tmode="buses">
            🚌 KSRTC Luxury Buses
          </button>
          <button class="filter-pill-btn ${activeTransportTab === 'cabs' ? 'active' : ''}" data-tmode="cabs">
            🚕 Chauffeured SUVs
          </button>
          <button class="filter-pill-btn ${activeTransportTab === 'transfers' ? 'active' : ''}" data-tmode="transfers">
            🛬 Airport Transfers
          </button>
        </div>

        <!-- Dynamic Transport Content -->
        <div id="transport-mode-content-mount">
          ${renderModeContent(activeTransportTab)}
        </div>
      </div>
    `;

    // Tab Listeners
    section.querySelectorAll("[data-tmode]").forEach(btn => {
      btn.addEventListener("click", () => {
        activeTransportTab = btn.dataset.tmode;
        renderContent();
      });
    });

    // Book Flight Listener
    section.querySelectorAll(".book-flight-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const flightId = btn.dataset.flightId;
        const flight = FLIGHT_ROUTES.find(f => f.id === flightId);
        if (flight) {
          appState.setState({
            selectedFlightForBooking: flight,
            selectedStayForBooking: null,
            selectedExperienceForBooking: null,
            selectedPackageForBooking: null,
            activeModal: "booking"
          });
        }
      });
    });

    // Book Train/Bus/Transport Listener
    section.querySelectorAll(".book-generic-t-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const title = btn.dataset.title;
        const price = parseInt(btn.dataset.price);
        appState.setState({
          selectedExperienceForBooking: {
            id: "trans-" + Date.now(),
            title,
            priceDisplay: `₹${price.toLocaleString('en-IN')}`,
            price,
            duration: "Confirmed Passage",
            destinationName: "Karnataka Transport Network",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
          },
          selectedStayForBooking: null,
          selectedPackageForBooking: null,
          selectedFlightForBooking: null,
          activeModal: "booking"
        });
      });
    });
  };

  appState.subscribe(() => {
    if (appState.getState().activeTab === "flights" || appState.getState().activeTab === "transport") {
      renderContent();
    }
  });

  renderContent();
  return section;
}

function renderModeContent(mode) {
  if (mode === "flights") {
    return `
      <div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${FLIGHT_ROUTES.map(fl => `
            <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); padding: 24px 32px; display: grid; grid-template-columns: 2fr 3fr 1.5fr auto; gap: 24px; align-items: center; box-shadow: var(--shadow-md);" id="flight-${fl.id}">
              <div style="display: flex; align-items: center; gap: 16px;">
                <div style="font-size: 2rem; width: 50px; height: 50px; border-radius: 50%; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center;">
                  ${fl.logo}
                </div>
                <div>
                  <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-white);">${fl.airline}</h4>
                  <span style="font-size: 0.8rem; color: var(--text-secondary);">Flight ${fl.flightNumber} • Non-stop</span>
                </div>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
                <div style="text-align: left;">
                  <div style="font-size: 1.3rem; font-weight: 800; color: var(--text-white);">${fl.departureTime}</div>
                  <div style="font-size: 0.85rem; color: var(--gold-light); font-weight: 700;">${fl.from} (${fl.fromCity})</div>
                </div>
                <div style="text-align: center; flex: 1;">
                  <span style="font-size: 0.75rem; color: var(--text-muted);">⏱️ ${fl.duration}</span>
                  <div style="height: 2px; background: linear-gradient(90deg, transparent, var(--gold-primary), transparent); margin: 6px 0;"></div>
                  <span style="font-size: 0.72rem; color: var(--emerald-light);">Direct Flight</span>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 1.3rem; font-weight: 800; color: var(--text-white);">${fl.arrivalTime}</div>
                  <div style="font-size: 0.85rem; color: var(--gold-light); font-weight: 700;">${fl.to} (${fl.toCity})</div>
                </div>
              </div>

              <div style="text-align: right;">
                <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Economy Starting</span>
                <div style="font-size: 1.4rem; font-weight: 900; color: var(--gold-primary);">₹${fl.priceEconomy.toLocaleString('en-IN')}</div>
              </div>

              <button class="btn-primary-gold book-flight-btn" data-flight-id="${fl.id}" style="padding: 10px 22px; font-size: 0.88rem;">
                Select Flight
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (mode === "trains") {
    return `
      <div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${TRAIN_ROUTES.map(tr => `
            <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); padding: 24px 32px; display: grid; grid-template-columns: 2.5fr 3fr 1.5fr auto; gap: 24px; align-items: center; box-shadow: var(--shadow-md);">
              <div>
                <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                  <span class="badge-state-pill" style="font-size: 0.7rem;">Train ${tr.trainNumber}</span>
                  <span style="font-size: 0.75rem; color: var(--emerald-light); font-weight: 700;">⭐ ${tr.rating}</span>
                </div>
                <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-white);">${tr.name}</h4>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">${tr.speed}</span>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
                <div>
                  <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-white);">${tr.departureTime}</div>
                  <div style="font-size: 0.8rem; color: var(--gold-light);">${tr.from}</div>
                </div>
                <div style="text-align: center; flex: 1;">
                  <span style="font-size: 0.75rem; color: var(--text-muted);">⏱️ ${tr.duration}</span>
                  <div style="height: 2px; background: linear-gradient(90deg, transparent, var(--gold-primary), transparent); margin: 6px 0;"></div>
                </div>
                <div>
                  <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-white);">${tr.arrivalTime}</div>
                  <div style="font-size: 0.8rem; color: var(--gold-light);">${tr.to}</div>
                </div>
              </div>

              <div style="text-align: right;">
                <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Classes from</span>
                <div style="font-size: 1.35rem; font-weight: 900; color: var(--gold-primary);">₹${tr.classes[0].price.toLocaleString('en-IN')}</div>
              </div>

              <button class="btn-primary-gold book-generic-t-btn" data-title="${tr.name}" data-price="${tr.classes[0].price}" style="padding: 10px 22px; font-size: 0.88rem;">
                Book Rail Pass
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (mode === "buses") {
    return `
      <div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${BUS_ROUTES.map(bus => `
            <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); padding: 24px 32px; display: grid; grid-template-columns: 2.5fr 3fr 1.5fr auto; gap: 24px; align-items: center; box-shadow: var(--shadow-md);">
              <div>
                <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                  <span class="badge-state-pill" style="font-size: 0.7rem;">KSRTC Verified</span>
                  <span style="font-size: 0.75rem; color: var(--emerald-light); font-weight: 700;">⭐ ${bus.rating}</span>
                </div>
                <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-white);">${bus.operator}</h4>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">${bus.busType}</span>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
                <div>
                  <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-white);">${bus.departureTime}</div>
                  <div style="font-size: 0.8rem; color: var(--gold-light);">${bus.fromCity}</div>
                </div>
                <div style="text-align: center; flex: 1;">
                  <span style="font-size: 0.75rem; color: var(--text-muted);">⏱️ ${bus.duration}</span>
                  <div style="height: 2px; background: linear-gradient(90deg, transparent, var(--gold-primary), transparent); margin: 6px 0;"></div>
                </div>
                <div>
                  <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-white);">${bus.arrivalTime}</div>
                  <div style="font-size: 0.8rem; color: var(--gold-light);">${bus.toCity}</div>
                </div>
              </div>

              <div style="text-align: right;">
                <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Seat Ticket</span>
                <div style="font-size: 1.35rem; font-weight: 900; color: var(--gold-primary);">₹${bus.price.toLocaleString('en-IN')}</div>
              </div>

              <button class="btn-primary-gold book-generic-t-btn" data-title="${bus.operator} (${bus.fromCity} to ${bus.toCity})" data-price="${bus.price}" style="padding: 10px 22px; font-size: 0.88rem;">
                Select Seat
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (mode === "cabs" || mode === "transfers") {
    return `
      <div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
          ${TRANSPORT_SERVICES.map(t => `
            <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); overflow: hidden; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <img src="${t.image}" alt="${t.name}" style="width: 100%; height: 170px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 16px;" />
                <span class="badge-state-pill" style="font-size: 0.7rem; margin-bottom: 8px; display: inline-block;">${t.type}</span>
                <h4 style="font-size: 1.2rem; font-weight: 700; color: var(--text-white); margin-bottom: 4px;">${t.name}</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 14px;">${t.description}</p>
                <div style="display: flex; gap: 12px; font-size: 0.82rem; color: var(--gold-light); margin-bottom: 16px;">
                  <span>👥 ${t.capacity}</span>
                  <span>•</span>
                  <span>🧳 ${t.luggage}</span>
                </div>
              </div>

              <div style="border-top: 1px solid var(--border-subtle); padding-top: 14px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Per Day / Route</span>
                  <div style="color: var(--gold-primary); font-weight: 800; font-size: 1.25rem;">${t.priceDisplay}</div>
                </div>
                <button class="btn-primary-gold book-generic-t-btn" data-title="${t.name}" data-price="${t.pricePerDay || 4500}" style="padding: 8px 18px; font-size: 0.85rem;">
                  Reserve Chauffeur
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  return "";
}
