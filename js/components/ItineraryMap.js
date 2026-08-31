// AURICVISTA Interactive Route Map & Waypoint Canvas Component
export function renderItineraryMap(activeTripPlan) {
  const mapContainer = document.createElement("div");
  mapContainer.className = "itinerary-map-card";
  mapContainer.id = "itinerary-map-section";

  let activeDayFilter = "all";

  const renderContent = () => {
    if (!activeTripPlan || !activeTripPlan.days) {
      mapContainer.innerHTML = "";
      return;
    }

    const days = activeTripPlan.days;
    const allActivities = [];

    days.forEach(d => {
      if (activeDayFilter === "all" || activeDayFilter === `day-${d.day}`) {
        d.activities.forEach((act, idx) => {
          allActivities.push({
            ...act,
            day: d.day,
            sequenceNumber: allActivities.length + 1
          });
        });
      }
    });

    // Sample coordinates offsets for visual map simulation
    const waypointPositions = [
      { x: 18, y: 72, label: "Day 1 Origin: Transit Put-in" },
      { x: 38, y: 45, label: "Stay Sanctuary & Check-in" },
      { x: 62, y: 28, label: "Highland Sunset Point" },
      { x: 78, y: 52, label: "Valley Waterfall & Heritage" },
      { x: 55, y: 80, label: "Artisanal Coffee Immersion" },
      { x: 32, y: 85, label: "Traditional Dining Hall" },
      { x: 82, y: 20, label: "Panoramic Summit Ridge" },
      { x: 22, y: 30, label: "Central Heritage Bazaar" }
    ];

    mapContainer.innerHTML = `
      <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-lg);">
        <!-- Map Header & Filter Controls -->
        <div style="padding: 20px 28px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; background: var(--bg-surface);">
          <div>
            <span class="section-tag-gold" style="font-size: 0.72rem;">🗺️ VISUAL ROUTE & WAYPOINTS</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-white);">
              ${activeTripPlan.destination} Journey Circuit
            </h3>
          </div>

          <!-- Day Filter Pills -->
          <div style="display: flex; gap: 8px;">
            <button class="filter-pill-btn map-day-filter ${activeDayFilter === 'all' ? 'active' : ''}" data-day="all" style="padding: 6px 14px; font-size: 0.8rem;">
              All Days (${days.length})
            </button>
            ${days.map(d => `
              <button class="filter-pill-btn map-day-filter ${activeDayFilter === `day-${d.day}` ? 'active' : ''}" data-day="day-${d.day}" style="padding: 6px 14px; font-size: 0.8rem;">
                Day ${d.day}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Interactive Map Graphic Canvas -->
        <div style="position: relative; height: 380px; width: 100%; background: #070b12; overflow: hidden;">
          <!-- Stylized Dark Map Grid & Terrain Backdrop -->
          <div style="position: absolute; inset: 0; opacity: 0.25; background-image: radial-gradient(var(--border-gold) 1px, transparent 1px); background-size: 28px 28px;"></div>
          
          <!-- Decorative Topo Contour Curves -->
          <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;" viewBox="0 0 1000 400" preserveAspectRatio="none">
            <!-- Background terrain contours -->
            <path d="M 0,100 Q 250,50 500,120 T 1000,80" fill="none" stroke="rgba(212, 175, 55, 0.15)" stroke-width="1.5" />
            <path d="M 0,220 Q 300,300 650,180 T 1000,240" fill="none" stroke="rgba(212, 175, 55, 0.12)" stroke-width="1.5" />
            <path d="M 0,340 Q 400,260 750,350 T 1000,310" fill="none" stroke="rgba(212, 175, 55, 0.1)" stroke-width="1.5" />
            
            <!-- Dynamic Animated Route Path Connecting Waypoints -->
            <path 
              d="M 180,288 C 380,180 620,112 780,208 C 550,320 320,340 220,120" 
              fill="none" 
              stroke="var(--gold-primary)" 
              stroke-width="2.5" 
              stroke-dasharray="6 8" 
              style="animation: dashTravel 20s linear infinite;"
            />
          </svg>

          <!-- Numbered Waypoint Marker Pins -->
          ${allActivities.map((act, index) => {
            const pos = waypointPositions[index % waypointPositions.length];
            return `
              <div 
                class="map-waypoint-marker" 
                data-act-id="${act.id}" 
                style="position: absolute; left: ${pos.x}%; top: ${pos.y}%; transform: translate(-50%, -50%); cursor: pointer; z-index: 10; transition: transform 0.2s;"
                title="${act.title} (${act.timeSlot})"
              >
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <div style="width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, var(--gold-primary), #8c6d1f); color: #07090e; font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px var(--gold-glow); border: 2px solid #ffffff;">
                    ${act.sequenceNumber}
                  </div>
                  <div style="margin-top: 4px; padding: 2px 8px; background: rgba(7,9,14,0.9); backdrop-filter: blur(6px); border: 1px solid var(--border-gold); border-radius: var(--radius-sm); font-size: 0.68rem; font-weight: 700; color: var(--gold-light); white-space: nowrap; max-width: 130px; text-overflow: ellipsis; overflow: hidden;">
                    ${act.icon || '📍'} ${act.title.split(':')[0]}
                  </div>
                </div>
              </div>
            `;
          }).join("")}

          <!-- Floating Map Legend -->
          <div style="position: absolute; bottom: 16px; left: 16px; background: rgba(7, 9, 14, 0.85); backdrop-filter: blur(12px); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 8px 16px; display: flex; gap: 14px; font-size: 0.75rem; color: var(--text-secondary); z-index: 20;">
            <span style="display: flex; align-items: center; gap: 6px;"><span style="color: var(--gold-primary);">●</span> Waypoint Sequence</span>
            <span style="display: flex; align-items: center; gap: 6px;">🚗 Scenic Transit Route</span>
            <span style="display: flex; align-items: center; gap: 6px;">⏱️ ${activeTripPlan.daysCount} Days Total</span>
          </div>
        </div>
      </div>
    `;

    // Filter Listeners
    mapContainer.querySelectorAll(".map-day-filter").forEach(btn => {
      btn.addEventListener("click", () => {
        activeDayFilter = btn.dataset.day;
        renderContent();
      });
    });

    // Waypoint click listener scrolls to and highlights corresponding timeline card
    mapContainer.querySelectorAll(".map-waypoint-marker").forEach(marker => {
      marker.addEventListener("click", () => {
        const actId = marker.dataset.actId;
        const targetCard = document.getElementById(`card-${actId}`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
          targetCard.style.boxShadow = "0 0 30px var(--gold-primary)";
          targetCard.style.borderColor = "var(--gold-primary)";
          setTimeout(() => {
            targetCard.style.boxShadow = "";
            targetCard.style.borderColor = "";
          }, 2000);
        }
      });
    });
  };

  renderContent();
  return mapContainer;
}
