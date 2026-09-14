// AURICVISTA Slim Progress Bar Component
// Master Authority: Phase 2 Step 12 & Step 19
// Top slim gold progress bar indicating route loading & network transitions

import { appState } from "../../state.js";

export function renderAuricProgressBar() {
  const bar = document.createElement("div");
  bar.className = "auric-progress-bar-wrap";
  bar.id = "auric-top-progress-bar";
  bar.setAttribute("role", "progressbar");
  bar.setAttribute("aria-hidden", "true");

  bar.innerHTML = `<div class="auric-progress-bar-indicator"></div>`;

  const updateProgressDOM = () => {
    const { isLoadingRoute } = appState.getState();
    if (isLoadingRoute) {
      bar.classList.add("loading");
      bar.setAttribute("aria-hidden", "false");
    } else {
      bar.classList.remove("loading");
      bar.setAttribute("aria-hidden", "true");
    }
  };

  appState.subscribe(() => {
    updateProgressDOM();
  });

  updateProgressDOM();
  return bar;
}
