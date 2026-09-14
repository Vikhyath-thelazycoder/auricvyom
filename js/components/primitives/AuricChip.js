// AURICVISTA Filter Chip Primitive
// Accessible interactive category filter

export function createAuricChip({
  id,
  label,
  isActive = false,
  onClick = null
}) {
  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = `auric-chip ${isActive ? "active" : ""}`;
  chip.dataset.chipId = id;
  chip.setAttribute("aria-pressed", isActive ? "true" : "false");
  chip.textContent = label;

  if (onClick) {
    chip.addEventListener("click", () => onClick(id));
  }

  return chip;
}
