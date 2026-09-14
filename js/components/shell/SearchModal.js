// AURICVISTA Mobile Search Modal & Discovery Filter
import { appState, SCREEN_IDS } from "../../state.js";
import { destinations } from "../../data/destinations.js";
import { stays } from "../../data/stays.js";

export function renderSearchModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.id = "search-modal";

  const renderDOM = () => {
    modal.innerHTML = `
      <div class="bottom-sheet-panel" style="max-height: 85vh;">
        <div class="sheet-drag-handle"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <h3 style="font-family: var(--font-serif); font-size: 1.3rem; font-weight: 700; color: var(--text-primary);">
            Explore AuricVista
          </h3>
          <button id="close-search-btn" style="color: var(--text-muted); font-size: 1.4rem; padding: 4px var(--space-2);" aria-label="Close search">
            ✕
          </button>
        </div>

        <!-- Search Input Bar -->
        <div style="background: var(--bg-surface); border: 1.5px solid var(--border-gold); border-radius: var(--radius-full); padding: 10px 18px; display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-4);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2.2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="text" 
            id="search-input-field" 
            placeholder="Search Coorg, Hampi, hostels, safaris..." 
            style="flex: 1; font-size: 0.95rem; color: var(--text-primary);"
            autocomplete="off"
          />
          <button id="clear-search-btn" style="color: var(--text-muted); font-size: 1.1rem; display: none;">✕</button>
        </div>

        <!-- Popular Destination Quick Tags -->
        <div style="margin-bottom: var(--space-4);">
          <div class="label-caps" style="margin-bottom: var(--space-2);">Popular Escapes</div>
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);" id="search-quick-tags">
            <button class="auric-chip" data-query="Coorg">☕ Coorg</button>
            <button class="auric-chip" data-query="Hampi">🏛️ Hampi</button>
            <button class="auric-chip" data-query="Kabini">🐅 Kabini</button>
            <button class="auric-chip" data-query="Gokarna">🌊 Gokarna</button>
            <button class="auric-chip" data-query="Manali">🏔️ Manali</button>
            <button class="auric-chip" data-query="Hostel">🎒 Hostels</button>
          </div>
        </div>

        <!-- Results Mount -->
        <div id="search-results-list" style="display: flex; flex-direction: column; gap: var(--space-2-5);"></div>
      </div>
    `;

    const closeBtn = modal.querySelector("#close-search-btn");
    const input = modal.querySelector("#search-input-field");
    const clearBtn = modal.querySelector("#clear-search-btn");
    const resultsMount = modal.querySelector("#search-results-list");
    const quickTags = modal.querySelectorAll("#search-quick-tags button");

    const doClose = () => {
      appState.closeModal();
    };

    closeBtn?.addEventListener("click", doClose);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) doClose();
    });

    const runSearch = (q) => {
      const query = q.toLowerCase().trim();
      resultsMount.innerHTML = "";

      if (!query) {
        clearBtn.style.display = "none";
        return;
      }
      clearBtn.style.display = "block";

      const matchedDestinations = destinations.filter(d => 
        d.name.toLowerCase().includes(query) || 
        d.region.toLowerCase().includes(query) ||
        d.tags.some(t => t.toLowerCase().includes(query))
      );

      const matchedStays = stays.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.location.toLowerCase().includes(query) ||
        s.type.toLowerCase().includes(query)
      );

      if (matchedDestinations.length === 0 && matchedStays.length === 0) {
        resultsMount.innerHTML = `
          <div style="text-align: center; padding: var(--space-6) 0; color: var(--text-muted); font-size: 0.9rem;">
            No escapes found for "${q}". Try Coorg, Hampi, or Kabini.
          </div>
        `;
        return;
      }

      if (matchedDestinations.length > 0) {
        const destHeading = document.createElement("div");
        destHeading.className = "label-caps";
        destHeading.textContent = "Destinations";
        resultsMount.appendChild(destHeading);

        matchedDestinations.forEach(d => {
          const item = document.createElement("div");
          item.style.cssText = "display: flex; align-items: center; gap: var(--space-3); background: var(--bg-surface); padding: var(--space-2-5) var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); cursor: pointer;";
          item.innerHTML = `
            <img src="${d.image}" style="width: 44px; height: 44px; border-radius: var(--radius-sm); object-fit: cover;" alt="${d.name}" />
            <div style="flex: 1;">
              <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-primary);">${d.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${d.region} • ${d.weather}</div>
            </div>
            <span style="color: var(--gold-primary); font-size: 0.82rem; font-weight: 700;">★ ${d.rating}</span>
          `;
          item.addEventListener("click", () => {
            doClose();
            appState.openModal("destination", d);
          });
          resultsMount.appendChild(item);
        });
      }

      if (matchedStays.length > 0) {
        const staysHeading = document.createElement("div");
        staysHeading.className = "label-caps";
        staysHeading.style.marginTop = "var(--space-2)";
        staysHeading.textContent = "Luxury Stays & Accommodations";
        resultsMount.appendChild(staysHeading);

        matchedStays.forEach(s => {
          const item = document.createElement("div");
          item.style.cssText = "display: flex; align-items: center; gap: var(--space-3); background: var(--bg-surface); padding: var(--space-2-5) var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); cursor: pointer;";
          item.innerHTML = `
            <img src="${s.image}" style="width: 44px; height: 44px; border-radius: var(--radius-sm); object-fit: cover;" alt="${s.name}" />
            <div style="flex: 1;">
              <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-primary);">${s.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${s.location}</div>
            </div>
            <div style="text-align: right;">
              <div style="color: var(--text-primary); font-weight: 700; font-size: 0.88rem;">₹${s.price.toLocaleString()}</div>
              <div style="font-size: 0.7rem; color: var(--text-muted);">/${s.pricePeriod}</div>
            </div>
          `;
          item.addEventListener("click", () => {
            doClose();
            appState.openModal("stay", s);
          });
          resultsMount.appendChild(item);
        });
      }
    };

    input?.addEventListener("input", (e) => runSearch(e.target.value));
    clearBtn?.addEventListener("click", () => {
      input.value = "";
      runSearch("");
      input.focus();
    });

    quickTags.forEach(btn => {
      btn.addEventListener("click", () => {
        const query = btn.dataset.query;
        input.value = query;
        runSearch(query);
      });
    });
  };

  appState.subscribe((state) => {
    if (state.activeModal === "search") {
      modal.classList.add("active");
      const input = modal.querySelector("#search-input-field");
      setTimeout(() => input?.focus(), 150);
    } else {
      modal.classList.remove("active");
    }
  });

  renderDOM();
  return modal;
}
