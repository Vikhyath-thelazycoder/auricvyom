// AURICVISTA Curated Tour Packages Component (Expanded Marketplace Edition)
import { PACKAGES } from "../data/packages.js";
import { appState } from "../state.js";

export function renderPackagesView() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "packages-section";

  const renderContent = () => {
    section.innerHTML = `
      <div class="content-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div>
            <span class="section-tag-gold">🧭 ALL-INCLUSIVE BESPOKE CIRCUITS</span>
            <h2 class="section-main-title">Curated Journeys & Packages</h2>
            <p class="section-desc-muted">
              Turnkey holiday packages with handpicked heritage hotels, dedicated private chauffeur fleets, curated activities, and gourmet regional dining.
            </p>
          </div>

          <div style="color: var(--gold-light); font-size: 0.95rem; font-weight: 600;">
            <span>${PACKAGES.length} Complete Circuits</span>
          </div>
        </div>

        <!-- Packages Grid -->
        <div style="display: flex; flex-direction: column; gap: 36px;">
          ${PACKAGES.map(pkg => `
            <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-lg);" id="package-${pkg.id}">
              <div style="display: grid; grid-template-columns: 1fr 1.6fr; gap: 0;">
                <!-- Package Media Cover -->
                <div style="position: relative; min-height: 320px;">
                  <img src="${pkg.image}" alt="${pkg.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                  <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(7,9,14,0.95) 100%);"></div>
                  
                  <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
                    <span class="badge-state-pill" style="font-size: 0.72rem; margin-bottom: 6px; display: inline-block;">
                      ⏱️ ${pkg.duration}
                    </span>
                    <div style="font-size: 0.85rem; color: var(--gold-light); font-weight: 700;">
                      Starts from: ${pkg.startingCity}
                    </div>
                  </div>
                </div>

                <!-- Package Details Body -->
                <div style="padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 12px;">
                      <div>
                        <h3 style="font-family: var(--font-serif); font-size: 1.65rem; color: var(--text-white); margin-bottom: 6px;">
                          ${pkg.title}
                        </h3>
                        <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6;">
                          ${pkg.overview}
                        </p>
                      </div>

                      <div style="text-align: right; min-width: 160px;">
                        <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">All-Inclusive From</span>
                        <div style="font-size: 1.6rem; font-weight: 900; color: var(--gold-primary);">
                          ${pkg.priceDisplay}
                        </div>
                        <span style="font-size: 0.75rem; color: var(--text-secondary);">per person</span>
                      </div>
                    </div>

                    <!-- Inclusions Badges -->
                    <div style="margin-bottom: 20px;">
                      <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 6px;">Inclusions Breakdown:</span>
                      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                        <span class="vibe-tag" style="background: rgba(16, 185, 129, 0.15); border-color: var(--emerald-accent); color: var(--emerald-light);">🏨 Luxury Stays</span>
                        <span class="vibe-tag" style="background: rgba(16, 185, 129, 0.15); border-color: var(--emerald-accent); color: var(--emerald-light);">🚗 Private Chauffeur SUV</span>
                        <span class="vibe-tag" style="background: rgba(16, 185, 129, 0.15); border-color: var(--emerald-accent); color: var(--emerald-light);">📍 Guided Sightseeing</span>
                        <span class="vibe-tag" style="background: rgba(16, 185, 129, 0.15); border-color: var(--emerald-accent); color: var(--emerald-light);">🎟️ Safari & Coracle Activities</span>
                        <span class="vibe-tag" style="background: rgba(16, 185, 129, 0.15); border-color: var(--emerald-accent); color: var(--emerald-light);">🍴 Gourmet Breakfasts</span>
                      </div>
                    </div>

                    <!-- Collapsible Itinerary Preview -->
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px 18px; margin-bottom: 20px;">
                      <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;" class="itinerary-toggle" data-pkg-id="${pkg.id}">
                        <span style="font-size: 0.85rem; font-weight: 700; color: var(--gold-light);">
                          📅 View Day-by-Day Milestone Itinerary (${pkg.itinerary.length} Days)
                        </span>
                        <span style="color: var(--gold-light);">▼</span>
                      </div>
                      <div class="itinerary-details-panel" id="itin-panel-${pkg.id}" style="display: none; margin-top: 14px; border-top: 1px solid var(--border-subtle); padding-top: 12px;">
                        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem; color: var(--text-secondary);">
                          ${pkg.itinerary.map(item => `
                            <li>
                              <strong style="color: var(--text-white);">Day ${item.day}:</strong> ${item.title} — <em>${item.highlights}</em>
                            </li>
                          `).join("")}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Actions Bar -->
                  <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap;">
                    <button class="btn-outline-glass customize-pkg-btn" data-pkg-id="${pkg.id}" style="padding: 10px 18px; font-size: 0.85rem;">
                      🛠️ Customize in Planner
                    </button>
                    <button class="btn-outline-glass ai-sync-pkg-btn" data-pkg-title="${pkg.title}" style="padding: 10px 18px; font-size: 0.85rem; border-color: var(--border-gold); color: var(--gold-light);">
                      ✨ Plan Similar in AI
                    </button>
                    <button class="btn-primary-gold book-pkg-btn" data-pkg-id="${pkg.id}" style="padding: 10px 24px; font-size: 0.88rem;">
                      Book Full Package
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    // Collapsible itinerary toggle
    section.querySelectorAll(".itinerary-toggle").forEach(toggle => {
      toggle.addEventListener("click", () => {
        const pkgId = toggle.dataset.pkgId;
        const panel = section.querySelector(`#itin-panel-${pkgId}`);
        if (panel) {
          panel.style.display = panel.style.display === "none" ? "block" : "none";
        }
      });
    });

    // Customize in Trip Planner
    section.querySelectorAll(".customize-pkg-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const pkgId = btn.dataset.pkgId;
        const pkg = PACKAGES.find(p => p.id === pkgId);
        if (pkg) {
          const days = pkg.itinerary.map(it => ({
            day: it.day,
            title: `Day ${it.day}: ${it.title}`,
            activities: [
              { id: `pkg-act-${it.day}-1`, title: it.highlights, cost: Math.round(pkg.startingPrice / pkg.itinerary.length), type: "sightseeing", time: "10:00 AM" }
            ]
          }));

          appState.setState({
            customTrip: {
              title: `Customized ${pkg.title}`,
              destination: pkg.startingCity + " Circuit",
              daysCount: days.length,
              startDate: new Date().toISOString().split("T")[0],
              days
            },
            activeTab: "planner"
          });
          appState.showToast(`✨ Preloaded ${pkg.title} into your interactive Trip Planner!`);
        }
      });
    });

    // Plan Similar in AI Concierge
    section.querySelectorAll(".ai-sync-pkg-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const title = btn.dataset.pkgTitle;
        appState.setActiveTab("ai_planner");
        appState.addAiMessage("user", `Please customize a variation of the ${title} package with offbeat boutique stays.`);
        appState.addAiMessage("ai", `I would be delighted to customize a variation of **${title}**! Here is an exclusive luxury adaptation with private pool bungalows and secluded coffee trails.`);
      });
    });

    // Book Package
    section.querySelectorAll(".book-pkg-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const pkgId = btn.dataset.pkgId;
        const pkg = PACKAGES.find(p => p.id === pkgId);
        if (pkg) {
          appState.setState({
            selectedPackageForBooking: pkg,
            selectedStayForBooking: null,
            selectedExperienceForBooking: null,
            selectedFlightForBooking: null,
            activeModal: "booking"
          });
        }
      });
    });
  };

  appState.subscribe(() => {
    if (appState.getState().activeTab === "packages") {
      renderContent();
    }
  });

  renderContent();
  return section;
}
