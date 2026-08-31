// AURICVISTA Explore India Discovery Hub Component
import { DESTINATIONS } from "../data/destinations.js";
import { appState } from "../state.js";
import { renderDestinationCard } from "./DestinationCard.js";

export function renderExploreIndiaView() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "explore-india-section";

  // Category definitions mapping to destination filters
  const exploreCategories = [
    {
      id: "trending",
      tag: "🔥 TRENDING ACROSS INDIA",
      title: "Trending Destinations",
      desc: "The most sought-after bespoke escapes captivating discerning travelers this season.",
      filter: d => ["coorg", "hampi", "kabini", "gokarna", "udaipur", "kerala", "ladakh"].includes(d.id)
    },
    {
      id: "karnataka",
      tag: "👑 INDIA FIRST • 14 JEWELS",
      title: "Popular in Karnataka",
      desc: "From the world capital of coffee to ancient boulder empires and virgin Arabian Sea coastlines.",
      filter: d => d.state && d.state.toLowerCase() === "karnataka"
    },
    {
      id: "weekend",
      tag: "🚗 2-3 DAYS ESCAPES",
      title: "Weekend Getaways from Bengaluru",
      desc: "Perfect quick road trips under 300 km for restorative coffee walks and temple trails.",
      filter: d => d.distanceFromBlr !== undefined && d.distanceFromBlr > 0 && d.distanceFromBlr <= 300
    },
    {
      id: "hidden",
      tag: "💎 UNTOUCHED SANCTUARIES",
      title: "Hidden Gems & Offbeat Escapes",
      desc: "Secluded rainforest valleys, star forts, and quiet basalt volcanic shorelines.",
      filter: d => ["agumbe", "sakleshpur", "dandeli", "jog-falls", "udupi"].includes(d.id)
    },
    {
      id: "nature",
      tag: "🌿 SHOLA & CLOUD FORESTS",
      title: "Nature & Rainforest Escapes",
      desc: "Immerse yourself in UNESCO Western Ghats biodiversity and emerald coffee canopies.",
      filter: d => d.category === "Nature" || (d.interests && d.interests.includes("Nature"))
    },
    {
      id: "adventure",
      tag: "🧗 ADRENALINE & RAPIDS",
      title: "High Adrenaline & Adventure",
      desc: "Grade III+ Kali River whitewater rafting, cave expeditions, and mountain peak treks.",
      filter: d => d.category === "Adventure" || (d.interests && d.interests.includes("Adventure"))
    },
    {
      id: "beaches",
      tag: "🏖️ ARABIAN SEA & KONKAN",
      title: "Pristine Beaches & Coastal Cliffs",
      desc: "Golden sand coves, clifftop sunset yoga pavilions, and bioluminescent night kayaking.",
      filter: d => d.category === "Coastal" || (d.interests && d.interests.includes("Beach"))
    },
    {
      id: "mountains",
      tag: "⛰️ HIGH ALTITUDE SUMMITS",
      title: "Mountains & Western Ghats",
      desc: "Mullayanagiri peak, Baba Budangiri cloud ridges, and panoramic valleys.",
      filter: d => d.category === "Mountains" || d.category === "Nature"
    },
    {
      id: "heritage",
      tag: "🏛️ UNESCO & ROYAL DYNASTIES",
      title: "Heritage & Royal Palaces",
      desc: "Monolithic Vijayanagara stone chariots, Hoysala temples, and Wadiyar royal palaces.",
      filter: d => d.category === "Culture" || d.category === "Heritage" || (d.interests && d.interests.includes("Heritage"))
    },
    {
      id: "wildlife",
      tag: "🐅 PROJECT TIGER RESERVES",
      title: "Wildlife Safaris & Sanctuaries",
      desc: "Track Bengal tigers, Asian elephants, and the elusive Black Panther with senior naturalists.",
      filter: d => d.category === "Wildlife" || (d.interests && d.interests.includes("Wildlife"))
    },
    {
      id: "spiritual",
      tag: "🕉️ SACRED SHRINES",
      title: "Spiritual & Sacred Centers",
      desc: "Dvaita philosophy centers, ancient Shiva cliff shrines, and Tibetan Buddhist golden temples.",
      filter: d => (d.vibe && d.vibe.some(v => v.toLowerCase().includes("temple") || v.toLowerCase().includes("spiritual"))) || (d.interests && d.interests.includes("Spiritual"))
    },
    {
      id: "luxury",
      tag: "⚜️ BESPOKE LUXURY",
      title: "Ultra-Luxury Sanctuaries",
      desc: "Private coffee estate pool villas, reconstructed 16th-century heritage manas, and lake palaces.",
      filter: d => d.rating >= 4.95 || (d.interests && d.interests.includes("Luxury"))
    },
    {
      id: "budget",
      tag: "🎒 ACCESSIBLE ESCAPES",
      title: "Budget-Friendly Trips (< ₹5,000)",
      desc: "Scenic waterfalls, backpacker cliff treks, and authentic heritage homestays.",
      filter: d => d.budgetTierNumeric && d.budgetTierNumeric.min <= 5000
    },
    {
      id: "romantic",
      tag: "💑 HONEYMOON & COUPLES",
      title: "Romantic Getaways",
      desc: "Candlelit coffee plantation dinners, private cliffside sunsets, and houseboat cruises.",
      filter: d => d.travelTypes && d.travelTypes.includes("Couple")
    },
    {
      id: "family",
      tag: "👨‍👩‍👧‍👦 LEISURE & RESORTS",
      title: "Family Holidays",
      desc: "Wildlife boat safaris, interactive coffee picking masterclasses, and expansive heritage resorts.",
      filter: d => d.travelTypes && d.travelTypes.includes("Family")
    },
    {
      id: "solo",
      tag: "🚶 SLOW TRAVEL",
      title: "Solo Travel & Slow Life",
      desc: "Quiet coastal cliff walks, tea estate birdwatching, and mindful temple stays.",
      filter: d => d.travelTypes && d.travelTypes.includes("Solo")
    }
  ];

  section.innerHTML = `
    <div class="content-container">
      <!-- Explore India Main Header -->
      <div style="text-align: center; max-width: 820px; margin: 0 auto 60px;">
        <span class="section-tag-gold" style="font-size: 0.9rem;">✨ DISCOVER • EXPLORE • PLAN • TRAVEL</span>
        <h2 style="font-family: var(--font-serif); font-size: clamp(2.4rem, 4.5vw, 3.6rem); color: var(--text-white); margin-bottom: 16px; line-height: 1.15;">
          Explore India's Masterpiece Escapes
        </h2>
        <p style="color: var(--text-secondary); font-size: 1.15rem; line-height: 1.7;">
          Immerse yourself in curated collections across 16 thematic travel categories — from high-altitude Western Ghats shola mist to sacred Konkan ocean shrines and big cat reserves.
        </p>
      </div>

      <!-- 16 Curated Horizontal Carousels -->
      <div style="display: flex; flex-direction: column; gap: 64px;">
        ${exploreCategories.map(cat => {
          const matchingDestinations = DESTINATIONS.filter(cat.filter);
          if (matchingDestinations.length === 0) return '';

          return `
            <div class="explore-category-block" id="cat-${cat.id}">
              <div class="section-header-block" style="margin-bottom: 24px;">
                <div>
                  <span class="section-tag-gold">${cat.tag}</span>
                  <h3 style="font-family: var(--font-serif); font-size: 1.85rem; color: var(--text-white);">${cat.title}</h3>
                  <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 4px;">${cat.desc}</p>
                </div>

                <div style="display: flex; gap: 8px;">
                  <button class="carousel-nav-btn prev-btn" data-carousel-id="carousel-${cat.id}" title="Scroll Left">
                    ‹
                  </button>
                  <button class="carousel-nav-btn next-btn" data-carousel-id="carousel-${cat.id}" title="Scroll Right">
                    ›
                  </button>
                </div>
              </div>

              <!-- Horizontal Carousel Scroll Container -->
              <div class="horizontal-carousel-track" id="carousel-${cat.id}">
                ${matchingDestinations.map(d => `
                  <div class="carousel-card-wrapper" style="min-width: 320px; max-width: 340px; flex-shrink: 0;">
                    ${renderDestinationCard(d).outerHTML}
                  </div>
                `).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  // Attach carousel scroll navigation
  section.querySelectorAll(".carousel-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const carouselId = btn.dataset.carouselId;
      const track = section.querySelector(`#${carouselId}`);
      if (track) {
        const isNext = btn.classList.contains("next-btn");
        track.scrollBy({ left: isNext ? 360 : -360, behavior: "smooth" });
      }
    });
  });

  // Re-bind destination card clicks inside carousels
  section.querySelectorAll(".destination-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".card-wishlist-btn")) {
        e.stopPropagation();
        const destId = card.id.replace("dest-card-", "");
        const dest = DESTINATIONS.find(d => d.id === destId);
        if (dest) {
          const updatedWish = appState.toggleWishlist(dest);
          const btn = card.querySelector(".card-wishlist-btn");
          if (updatedWish) {
            btn.classList.add("active");
            btn.querySelector("svg").setAttribute("fill", "currentColor");
          } else {
            btn.classList.remove("active");
            btn.querySelector("svg").setAttribute("fill", "none");
          }
        }
        return;
      }

      const destId = card.id.replace("dest-card-", "");
      const dest = DESTINATIONS.find(d => d.id === destId);
      if (dest) {
        appState.openDestinationModal(dest);
      }
    });
  });

  return section;
}
