// AURICVISTA Intelligent Interactive Trip Planner Component
import { appState } from "../state.js";
import { DESTINATIONS } from "../data/destinations.js";
import { renderItineraryMap } from "./ItineraryMap.js";

export function renderTripPlanner() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "trip-planner-section";

  let isGeneratorModalOpen = false;

  // Generator form state
  let genFrom = "Bangalore";
  let genDestId = "coorg";
  let genDays = 3;
  let genTravellers = 2;
  let genBudget = 15000;
  let genStyle = "Couple";
  let genPace = "Balanced";
  let genInterests = ["Nature", "Food"];

  const renderContent = () => {
    const { activeTripPlan } = appState.getState();
    const trip = activeTripPlan;
    const budgetSummary = trip.budgetSummary || {
      targetBudget: 15000,
      estimatedTotal: 12450,
      remainingBudget: 2550,
      isUnderBudget: true,
      breakdown: {
        accommodation: 6000,
        transport: 3000,
        food: 2000,
        activities: 1000,
        tickets: 450,
        shopping: 0,
        other: 0
      }
    };

    const percentageUsed = Math.min(100, Math.round((budgetSummary.estimatedTotal / budgetSummary.targetBudget) * 100));

    section.innerHTML = `
      <div class="content-container">
        <!-- Top Toolbar & Action Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="section-tag-gold">✨ COMPANION • INTELLIGENT PLANNER</span>
            <h2 style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--text-white);">
              ${trip.title}
            </h2>
          </div>

          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn-primary-gold" id="open-planner-generator-btn" style="padding: 10px 20px; font-size: 0.85rem;">
              🪄 Plan My Trip
            </button>
            <button class="btn-outline-glass" id="save-trip-btn" style="padding: 10px 18px; font-size: 0.85rem;">
              💾 Save Trip
            </button>
            <button class="btn-outline-glass" id="duplicate-trip-btn" style="padding: 10px 18px; font-size: 0.85rem;">
              📑 Duplicate
            </button>
            <button class="btn-outline-glass" id="share-trip-btn" style="padding: 10px 18px; font-size: 0.85rem;">
              🔗 Share
            </button>
            <button class="btn-outline-glass" id="print-trip-btn" style="padding: 10px 18px; font-size: 0.85rem;">
              🖨️ PDF / Print
            </button>
          </div>
        </div>

        <!-- 7-Category Real-Time Budget Dashboard -->
        <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); padding: 24px 32px; margin-bottom: 36px; box-shadow: var(--shadow-md);">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 18px;">
            <div>
              <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Target Trip Budget</span>
              <div style="font-size: 1.6rem; font-weight: 800; color: var(--text-white); margin-top: 2px;">
                ₹${budgetSummary.targetBudget.toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Calculated Estimates</span>
              <div style="font-size: 1.6rem; font-weight: 800; color: var(--gold-primary); margin-top: 2px;">
                ₹${budgetSummary.estimatedTotal.toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Remaining Balance</span>
              <div style="font-size: 1.6rem; font-weight: 800; color: ${budgetSummary.isUnderBudget ? 'var(--emerald-light)' : '#f43f5e'}; margin-top: 2px;">
                ${budgetSummary.isUnderBudget ? `₹${budgetSummary.remainingBudget.toLocaleString('en-IN')} Remaining` : `₹${Math.abs(budgetSummary.remainingBudget).toLocaleString('en-IN')} Exceeded`}
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div style="margin-bottom: 18px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 6px;">
              <span>Budget Utilization: ${percentageUsed}%</span>
              <span>${budgetSummary.isUnderBudget ? '✓ Within Budget' : '⚠️ Adjust Activities or Stay'}</span>
            </div>
            <div style="height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: ${percentageUsed}%; background: ${budgetSummary.isUnderBudget ? 'linear-gradient(90deg, var(--gold-primary), var(--emerald-accent))' : '#f43f5e'}; transition: width 0.4s ease;"></div>
            </div>
          </div>

          <!-- 7-Category Pill Breakdown -->
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <span class="vibe-tag" style="background: rgba(212,175,55,0.1); border-color: var(--border-gold); color: var(--gold-light);">🏨 Stay: ₹${budgetSummary.breakdown.accommodation.toLocaleString('en-IN')}</span>
            <span class="vibe-tag" style="background: rgba(212,175,55,0.1); border-color: var(--border-gold); color: var(--gold-light);">🚗 Transport: ₹${budgetSummary.breakdown.transport.toLocaleString('en-IN')}</span>
            <span class="vibe-tag" style="background: rgba(212,175,55,0.1); border-color: var(--border-gold); color: var(--gold-light);">🍴 Food: ₹${budgetSummary.breakdown.food.toLocaleString('en-IN')}</span>
            <span class="vibe-tag" style="background: rgba(212,175,55,0.1); border-color: var(--border-gold); color: var(--gold-light);">🎟️ Activities: ₹${budgetSummary.breakdown.activities.toLocaleString('en-IN')}</span>
            <span class="vibe-tag" style="background: rgba(212,175,55,0.1); border-color: var(--border-gold); color: var(--gold-light);">📍 Tickets: ₹${budgetSummary.breakdown.tickets.toLocaleString('en-IN')}</span>
            <span class="vibe-tag" style="background: rgba(212,175,55,0.1); border-color: var(--border-gold); color: var(--gold-light);">🛍️ Shopping: ₹${budgetSummary.breakdown.shopping.toLocaleString('en-IN')}</span>
            <span class="vibe-tag" style="background: rgba(212,175,55,0.1); border-color: var(--border-gold); color: var(--gold-light);">🛡️ Other/Buffer: ₹${budgetSummary.breakdown.other.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <!-- Main Layout: Day-by-Day Timeline + Interactive Map -->
        <div style="display: grid; grid-template-columns: 1.6fr 1.2fr; gap: 36px; align-items: start;">
          <!-- Left Column: Day-by-Day Time-Slotted Timeline -->
          <div style="display: flex; flex-direction: column; gap: 32px;">
            ${trip.days.map(day => `
              <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm);" id="day-container-${day.day}">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
                  <div>
                    <span class="badge-state-pill" style="font-size: 0.72rem; margin-bottom: 4px; display: inline-block;">Day ${day.day}</span>
                    <h3 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--text-white);">${day.title}</h3>
                  </div>

                  <button class="btn-outline-glass add-act-trigger-btn" data-day="${day.day}" style="padding: 6px 14px; font-size: 0.8rem;">
                    ＋ Add Activity
                  </button>
                </div>

                <!-- Activities in Day (Morning, Afternoon, Evening) -->
                <div style="display: flex; flex-direction: column; gap: 14px;">
                  ${day.activities.map((act, actIdx) => `
                    <div 
                      class="timeline-activity-card" 
                      id="card-${act.id}"
                      style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px; display: flex; gap: 16px; align-items: flex-start; transition: all 0.25s;"
                    >
                      <!-- Time Slot Icon & Sequence -->
                      <div style="font-size: 1.6rem; background: rgba(255,255,255,0.05); width: 48px; height: 48px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid var(--border-subtle);">
                        ${act.icon || '📍'}
                      </div>

                      <!-- Details -->
                      <div style="flex: 1;">
                        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                          <span style="font-size: 0.75rem; color: var(--gold-light); font-weight: 700;">${act.time} (${act.timeSlot})</span>
                          <span style="font-size: 0.72rem; color: var(--text-muted);">• ${act.travelTime || '15 min'}</span>
                          <span class="badge-state-pill" style="font-size: 0.65rem; padding: 2px 6px;">${act.category}</span>
                        </div>

                        <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-white); margin-bottom: 4px;">${act.title}</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px;">${act.notes || ''}</p>
                        
                        <div style="display: flex; gap: 14px; font-size: 0.78rem; color: var(--text-muted);">
                          <span>⏱️ ${act.duration}</span>
                          <span>🕒 ${act.openingInfo || 'Open Daily'}</span>
                        </div>
                      </div>

                      <!-- Price & Activity Management Buttons -->
                      <div style="text-align: right; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; height: 100%;">
                        <div style="font-size: 1rem; font-weight: 800; color: var(--gold-primary); margin-bottom: 12px;">
                          ₹${act.cost.toLocaleString('en-IN')}
                        </div>

                        <div style="display: flex; gap: 6px;">
                          <button class="act-move-btn" data-act-id="${act.id}" data-dir="up" title="Move Up" style="color: var(--text-muted); font-size: 0.85rem; padding: 4px 6px; background: rgba(255,255,255,0.05); border-radius: 4px;">▲</button>
                          <button class="act-move-btn" data-act-id="${act.id}" data-dir="down" title="Move Down" style="color: var(--text-muted); font-size: 0.85rem; padding: 4px 6px; background: rgba(255,255,255,0.05); border-radius: 4px;">▼</button>
                          <button class="act-remove-btn" data-act-id="${act.id}" title="Remove Activity" style="color: #f43f5e; font-size: 0.85rem; padding: 4px 6px; background: rgba(244,63,94,0.1); border-radius: 4px;">✕</button>
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>

          <!-- Right Column: Interactive Itinerary Map -->
          <div style="position: sticky; top: 90px;" id="itinerary-map-mount"></div>
        </div>
      </div>

      <!-- Plan My Trip Generator Modal -->
      <div class="auric-modal-backdrop ${isGeneratorModalOpen ? 'active' : ''}" id="planner-generator-modal-backdrop">
        <div class="modal-window-container" style="max-width: 680px; padding: 32px;" id="gen-modal-window">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px;">
            <div>
              <span class="section-tag-gold" style="font-size: 0.72rem;">🪄 AI ITINERARY GENERATOR</span>
              <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--text-white);">Plan My Custom Escape</h3>
            </div>
            <button id="close-gen-modal-x" style="color: var(--text-white); font-size: 1.4rem;">✕</button>
          </div>

          <form id="trip-gen-form" style="display: flex; flex-direction: column; gap: 18px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Origin City</label>
                <input type="text" id="gen-from-input" value="${genFrom}" style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" required />
              </div>
              <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Destination</label>
                <select id="gen-dest-select" style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem; cursor: pointer;">
                  ${DESTINATIONS.map(d => `<option value="${d.id}" ${d.id === genDestId ? 'selected' : ''}>${d.name} (${d.state || d.country})</option>`).join("")}
                </select>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px;">
              <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Duration</label>
                <select id="gen-days-select" style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;">
                  <option value="2">2 Days (Weekend)</option>
                  <option value="3" selected>3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                  <option value="7">7 Days (Full Circuit)</option>
                </select>
              </div>
              <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Travellers</label>
                <select id="gen-travellers-select" style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;">
                  <option value="1">1 Solo</option>
                  <option value="2" selected>2 Couple</option>
                  <option value="4">4 Family / Friends</option>
                </select>
              </div>
              <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Budget in ₹</label>
                <input type="number" id="gen-budget-input" value="${genBudget}" step="1000" style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" required />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Travel Style</label>
                <select id="gen-style-select" style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;">
                  <option>Couple</option>
                  <option>Solo</option>
                  <option>Family</option>
                  <option>Friends</option>
                  <option>Luxury</option>
                  <option>Budget</option>
                  <option>Adventure</option>
                  <option>Relaxed</option>
                </select>
              </div>
              <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Travel Pace</label>
                <select id="gen-pace-select" style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;">
                  <option>Relaxed</option>
                  <option selected>Balanced</option>
                  <option>Packed (Fast)</option>
                </select>
              </div>
            </div>

            <button type="submit" class="btn-primary-gold" style="width: 100%; justify-content: center; padding: 14px; font-size: 1rem; margin-top: 10px;">
              ✨ Generate Intelligent Itinerary
            </button>
          </form>
        </div>
      </div>
    `;

    // Mount Map into container
    const mapMount = section.querySelector("#itinerary-map-mount");
    if (mapMount) {
      mapMount.appendChild(renderItineraryMap(trip));
    }

    // Generator modal triggers
    section.querySelector("#open-planner-generator-btn")?.addEventListener("click", () => {
      isGeneratorModalOpen = true;
      renderContent();
    });

    section.querySelector("#close-gen-modal-x")?.addEventListener("click", () => {
      isGeneratorModalOpen = false;
      renderContent();
    });

    section.querySelector("#trip-gen-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const from = section.querySelector("#gen-from-input").value;
      const destinationId = section.querySelector("#gen-dest-select").value;
      const daysCount = parseInt(section.querySelector("#gen-days-select").value);
      const travellersCount = parseInt(section.querySelector("#gen-travellers-select").value);
      const budget = parseInt(section.querySelector("#gen-budget-input").value);
      const travelStyle = section.querySelector("#gen-style-select").value;
      const pace = section.querySelector("#gen-pace-select").value;

      appState.generateNewTrip({
        from,
        destinationId,
        daysCount,
        travellersCount,
        budget,
        travelStyle,
        pace,
        interests: ["Nature", "Food"]
      });

      isGeneratorModalOpen = false;
    });

    // Save, Duplicate, Share, Print
    section.querySelector("#save-trip-btn")?.addEventListener("click", () => {
      appState.saveActiveTrip();
    });

    section.querySelector("#duplicate-trip-btn")?.addEventListener("click", () => {
      appState.duplicateActiveTrip();
    });

    section.querySelector("#share-trip-btn")?.addEventListener("click", () => {
      navigator.clipboard?.writeText(window.location.origin + "/#planner");
      appState.showToast(`✨ Shareable link to "${trip.title}" copied to clipboard!`);
    });

    section.querySelector("#print-trip-btn")?.addEventListener("click", () => {
      window.print();
    });

    // Move activities
    section.querySelectorAll(".act-move-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const actId = btn.dataset.actId;
        const dir = btn.dataset.dir;
        appState.moveActivity(actId, dir);
      });
    });

    // Remove activity
    section.querySelectorAll(".act-remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const actId = btn.dataset.actId;
        appState.removeActivity(actId);
      });
    });

    // Add activity modal prompt
    section.querySelectorAll(".add-act-trigger-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const day = parseInt(btn.dataset.day);
        const title = prompt(`Enter custom activity name for Day ${day}:`, "Sunset Coffee Tasting & Estate Walk");
        if (title) {
          appState.addActivityToDay(day, {
            title,
            cost: 1200,
            timeSlot: "Afternoon",
            time: "04:00 PM",
            category: "Experience",
            budgetCategory: "Activities",
            icon: "☕"
          });
        }
      });
    });
  };

  appState.subscribe(() => {
    if (appState.getState().activeTab === "planner") {
      renderContent();
    }
  });

  renderContent();
  return section;
}
