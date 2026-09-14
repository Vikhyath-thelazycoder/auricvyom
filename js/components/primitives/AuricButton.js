// AURICVISTA Reusable Mobile Button Primitive
// Guarantees min 44px touch targets and full accessible semantics

export function createAuricButton({
  text = "",
  variant = "primary-gold", // 'primary-gold' | 'outline-glass' | 'social-pink' | 'destructive-red' | 'ghost'
  icon = null,
  onClick = null,
  fullWidth = false,
  disabled = false,
  className = "",
  ariaLabel = null
} = {}) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.disabled = disabled;
  if (ariaLabel) btn.setAttribute("aria-label", ariaLabel);

  let variantClass = "btn-gold";
  if (variant === "outline-glass") variantClass = "btn-outline";
  else if (variant === "social-pink") variantClass = "btn-pink";
  else if (variant === "destructive-red") variantClass = "btn-destructive";
  else if (variant === "ghost") variantClass = "btn-ghost";

  btn.className = `${variantClass} ${fullWidth ? "btn-full-width" : ""} ${className}`.trim();

  if (icon) {
    const iconSpan = document.createElement("span");
    iconSpan.className = "btn-icon-wrap";
    iconSpan.innerHTML = icon;
    btn.appendChild(iconSpan);
  }

  if (text) {
    const textSpan = document.createElement("span");
    textSpan.className = "btn-text-wrap";
    textSpan.textContent = text;
    btn.appendChild(textSpan);
  }

  if (onClick && typeof onClick === "function") {
    btn.addEventListener("click", onClick);
  }

  return btn;
}
