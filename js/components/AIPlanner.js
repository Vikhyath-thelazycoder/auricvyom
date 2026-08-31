// AURICVISTA Context-Aware AI Travel Assistant Component
import { appState } from "../state.js";

export function renderAIPlanner() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "ai-concierge-section";

  const renderContent = () => {
    const { aiMessages, activeTripPlan } = appState.getState();
    const trip = activeTripPlan;

    section.innerHTML = `
      <div class="content-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div>
            <span class="section-tag-gold">✨ CONTEXT-AWARE AI TRAVEL COMPANION</span>
            <h2 class="section-main-title">AuricVista AI Travel Assistant</h2>
            <p class="section-desc-muted">
              Your 24/7 intelligent Karnataka & Pan-India travel companion. Synced directly with your active itinerary to personalize recommendations and budget estimations.
            </p>
          </div>

          <div style="background: rgba(212, 175, 55, 0.12); border: 1px solid var(--border-gold); border-radius: var(--radius-full); padding: 8px 18px; font-size: 0.82rem; color: var(--gold-light); font-weight: 700;">
            ● Synced with: ${trip.title.split(' ')[0]} ${trip.destination}
          </div>
        </div>

        <!-- AI Assistant Studio Layout -->
        <div class="ai-planner-layout">
          <!-- Left Sidebar: Active Trip Context & Instant Prompt Chips -->
          <div class="ai-sidebar-presets">
            <!-- Active Trip Sync Card -->
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 18px; margin-bottom: 8px;">
              <span style="font-size: 0.7rem; color: var(--gold-light); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 6px;">Active Itinerary Context</span>
              <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-white); margin-bottom: 4px;">${trip.title}</h4>
              <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.8rem; color: var(--text-secondary); margin-top: 8px;">
                <div>📍 <strong>Destination:</strong> ${trip.destination}</div>
                <div>⏱️ <strong>Duration:</strong> ${trip.daysCount} Days (${trip.travelStyle})</div>
                <div>💰 <strong>Target Budget:</strong> ₹${trip.budgetSummary?.targetBudget.toLocaleString('en-IN') || '15,000'}</div>
                <div>✨ <strong>Est. Total:</strong> ₹${trip.budgetSummary?.estimatedTotal.toLocaleString('en-IN') || '12,450'}</div>
              </div>
            </div>

            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-top: 8px;">
              Quick Smart Actions
            </span>

            <button class="ai-prompt-chip" data-prompt="Make this trip cheaper by 20%">
              💸 <strong>Make this trip cheaper</strong>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Optimizes stays & dining to maximize savings</div>
            </button>

            <button class="ai-prompt-chip" data-prompt="Add more adventure activities to this itinerary">
              🧗 <strong>Add more adventure activities</strong>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Injects river rafting, cliff hikes & safaris</div>
            </button>

            <button class="ai-prompt-chip" data-prompt="Plan a 4-day Karnataka trip under ₹20,000">
              🧭 <strong>Plan a 4-day trip under ₹20,000</strong>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Generates complete high-value circuit</div>
            </button>

            <button class="ai-prompt-chip" data-prompt="Where should I stay in Coorg for coffee estate privacy?">
              🏨 <strong>Where should I stay in Coorg?</strong>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Compares top plantation villas & cottages</div>
            </button>
          </div>

          <!-- Right Column: Interactive Chat Thread -->
          <div class="ai-chat-thread">
            <!-- Messages Scroll Area -->
            <div class="ai-messages-scroll" id="ai-messages-container">
              ${aiMessages.map(msg => `
                <div class="chat-bubble ${msg.sender}">
                  <div class="chat-bubble-avatar">
                    ${msg.sender === 'ai' ? '✨' : '👤'}
                  </div>
                  <div>
                    <div class="chat-bubble-content">
                      ${formatMarkdownToHTML(msg.text)}
                    </div>
                    <span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-top: 4px; padding: 0 4px;">
                      ${msg.timestamp}
                    </span>
                  </div>
                </div>
              `).join("")}
            </div>

            <!-- Input Bar -->
            <form id="ai-chat-form" class="ai-input-bar-wrap">
              <input 
                type="text" 
                id="ai-user-text-input" 
                class="ai-text-input" 
                placeholder="Ask AuricVista AI: 'Make this trip cheaper', 'Add waterfall trek', 'Plan 4 days in Hampi'..." 
                autocomplete="off"
                required
              />
              <button type="submit" class="btn-primary-gold" style="padding: 0 28px; border-radius: var(--radius-full);">
                <span>Send</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    // Auto-scroll chat to bottom
    const msgContainer = section.querySelector("#ai-messages-container");
    if (msgContainer) {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    // Prompt chip listeners
    section.querySelectorAll(".ai-prompt-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const promptText = chip.dataset.prompt;
        handleUserAiPrompt(promptText);
      });
    });

    // Form submit listener
    section.querySelector("#ai-chat-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = section.querySelector("#ai-user-text-input");
      const text = input.value.trim();
      if (text) {
        handleUserAiPrompt(text);
        input.value = "";
      }
    });

    // Action button listeners embedded in AI responses
    section.querySelectorAll(".ai-itinerary-apply-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const actionType = btn.dataset.action;
        if (actionType === "cheaper") {
          appState.updateTripHotel("Charming Kodava Heritage Homestay", 3500);
          appState.showToast("✓ Swapped stay to Heritage Homestay (Saved ₹3,000/night!)");
        } else if (actionType === "adventure") {
          appState.addActivityToDay(2, {
            title: "Kali Whitewater Rafting & Rapids Expedition",
            cost: 2499,
            timeSlot: "Morning",
            time: "08:30 AM",
            category: "Adventure",
            budgetCategory: "Activities",
            icon: "🧗"
          });
          appState.showToast("✓ Added Whitewater Rafting to Day 2");
        } else if (actionType === "hampi4day") {
          appState.generateNewTrip({
            from: "Bangalore",
            destinationId: "hampi",
            daysCount: 4,
            travellersCount: 2,
            budget: 20000,
            travelStyle: "Heritage",
            interests: ["Heritage", "Food"],
            pace: "Balanced"
          });
        }
      });
    });
  };

  const handleUserAiPrompt = (userText) => {
    appState.addAiMessage("user", userText);

    // Contextual AI intelligence matching
    const q = userText.toLowerCase();
    let aiReply = "";

    if (q.includes("cheaper") || q.includes("budget") || q.includes("discount") || q.includes("save")) {
      aiReply = `I have analyzed your **${appState.getState().activeTripPlan.destination}** itinerary. Here is an optimized budget adjustment:

1. **Accommodation**: Switch from luxury resort to a highly rated boutique coffee estate homestay (**Saves ₹4,500/night**).
2. **Dining**: Enjoy authentic local thalis at town canteens (**Saves ₹1,200/day**).
3. **Total Savings**: ~**₹8,400**.

<button class="btn-primary-gold ai-itinerary-apply-btn" data-action="cheaper" style="margin-top:10px; padding: 8px 18px; font-size: 0.82rem;">
  ✨ Apply Budget Optimization to Itinerary
</button>`;
    } else if (q.includes("adventure") || q.includes("trek") || q.includes("rafting") || q.includes("action")) {
      aiReply = `Here are the top high-adrenaline adventures ready to inject into your trip:

- **Kali River Whitewater Rafting** (Grade III+ rapids) • ₹2,499
- **Mullayanagiri Cloud Ridge Peak Trek** (1,930 m summit) • ₹1,800
- **Bioluminescent Twilight Sea Kayaking** • ₹1,999

<button class="btn-primary-gold ai-itinerary-apply-btn" data-action="adventure" style="margin-top:10px; padding: 8px 18px; font-size: 0.82rem;">
  🧗 Add Whitewater Rafting to Day 2
</button>`;
    } else if (q.includes("4-day") || q.includes("20,000") || q.includes("4 day") || q.includes("karnataka trip")) {
      aiReply = `I have crafted a complete **4-Day Grand Heritage & Coffee Escape** under ₹20,000:

- **Day 1**: Bangalore ➔ Coorg Estate Sanctuary & Sunset Viewpoint
- **Day 2**: Abbey Falls & Bean-to-Cup Coffee Roasting Workshop
- **Day 3**: Scenic Transit to Mysore Palace & Devaraja Market Walk
- **Day 4**: Chamundi Hills & Return Transit to Bangalore

**Estimated Total**: ₹16,800 (**₹3,200 under your ₹20,000 budget!**).

<button class="btn-primary-gold ai-itinerary-apply-btn" data-action="hampi4day" style="margin-top:10px; padding: 8px 18px; font-size: 0.82rem;">
  ✨ Load This 4-Day Itinerary into Planner
</button>`;
    } else if (q.includes("where should i stay") || q.includes("hotel") || q.includes("stay in coorg")) {
      aiReply = `For pure coffee estate serenity in **Coorg**, I recommend:

1. **The Tamara Coorg** — Ultra-luxury wooden cottages suspended on stilts over 180 acres of cardamom & coffee (**₹24,500/night**).
2. **The Serai Chikmagalur** — Private pool villas in lush arabica groves (**₹19,500/night**).
3. **Charming Kodava Planter Homestay** — Authentic ancestral estate living (**₹4,500/night**).

You can book any of these directly from the **Stays Marketplace** or apply them to your active itinerary!`;
    } else {
      aiReply = `That sounds like a wonderful plan for **${appState.getState().activeTripPlan.destination}**! I have updated your travel companion notes. Would you like me to refine your daily timing, add local culinary spots, or search connecting flights and private chauffeur transport?`;
    }

    setTimeout(() => {
      appState.addAiMessage("ai", aiReply);
    }, 400);
  };

  appState.subscribe(() => {
    if (appState.getState().activeTab === "ai_planner" || appState.getState().activeTab === "planner" || appState.getState().activeTab === "home") {
      renderContent();
    }
  });

  renderContent();
  return section;
}

function formatMarkdownToHTML(text) {
  if (!text) return "";
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
  return formatted;
}
