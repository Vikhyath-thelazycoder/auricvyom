// AURICVISTA Editorial Empty and Error States

export function createAuricEmptyState({
  title = "Nothing Here Yet",
  description = "Start exploring stays, destinations, or trips to see them here.",
  actionText = "Explore Now",
  onAction = null,
  icon = "🧭"
} = {}) {
  const container = document.createElement("div");
  container.className = "auric-empty-state-wrap";
  container.style.padding = "var(--space-8) var(--space-4)";
  container.style.textAlign = "center";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  container.style.gap = "var(--space-2)";

  container.innerHTML = `
    <div style="font-size: 2.2rem; margin-bottom: var(--space-1);">${icon}</div>
    <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); font-weight: 600;">${title}</h3>
    <p style="font-size: 0.88rem; color: var(--text-secondary); max-width: 320px; margin: 0 auto var(--space-4); line-height: 1.5;">${description}</p>
  `;

  if (actionText && onAction) {
    const btn = document.createElement("button");
    btn.className = "btn-gold";
    btn.textContent = actionText;
    btn.addEventListener("click", onAction);
    container.appendChild(btn);
  }

  return container;
}
