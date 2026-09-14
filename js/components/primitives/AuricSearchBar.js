// AURICVISTA Luxury Mobile Search Capsule Primitive

export function createAuricSearchBar({
  placeholder = "Where do you want to go?",
  pillTag = "Dates & Guests",
  onClick = null
} = {}) {
  const capsule = document.createElement("div");
  capsule.className = "hero-search-capsule";
  capsule.setAttribute("role", "button");
  capsule.setAttribute("tabindex", "0");
  capsule.setAttribute("aria-label", "Search destinations, stays, and experiences");

  capsule.innerHTML = `
    <div class="search-capsule-left">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <span class="search-capsule-placeholder">${placeholder}</span>
    </div>
    <div class="search-capsule-pill-tag">
      <span>${pillTag}</span>
    </div>
  `;

  if (onClick) {
    capsule.addEventListener("click", onClick);
    capsule.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    });
  }

  return capsule;
}
