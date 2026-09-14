// AURICVISTA Offline & Degraded Connectivity Banner
// Master Authority: Phase 2 Step 12 & Step 22
// Non-blocking connectivity status bar with retry action

import { appState } from "../../state.js";

export function renderAuricOfflineBanner() {
  const banner = document.createElement("div");
  banner.className = "auric-offline-banner-wrap";
  banner.id = "auric-offline-banner";
  banner.setAttribute("role", "status");
  banner.setAttribute("aria-live", "assertive");

  const updateBannerDOM = () => {
    const { isOnline, isDegraded } = appState.getState();

    if (isOnline && !isDegraded) {
      banner.innerHTML = "";
      banner.classList.remove("visible");
      return;
    }

    banner.classList.add("visible");
    banner.innerHTML = `
      <div class="offline-banner-content">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <line x1="1" y1="1" x2="23" y2="23"/>
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
          <path d="M10.71 5.05A16 16 0 0 1 22.58 9"/>
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
          <line x1="12" y1="20" x2="12.01" y2="20"/>
        </svg>
        <span>
          ${!isOnline ? "You are currently offline. Viewing cached travel intelligence." : "Degraded network connection detected."}
        </span>
        <button class="offline-retry-btn" id="offline-retry-action">
          Check Connection
        </button>
      </div>
    `;

    banner.querySelector("#offline-retry-action")?.addEventListener("click", () => {
      const onlineNow = typeof navigator !== "undefined" ? navigator.onLine : true;
      appState.setState({ isOnline: onlineNow });
      if (onlineNow) {
        appState.showToast({
          type: "success",
          message: "Connection restored! Real-time updates active."
        });
      } else {
        appState.showToast({
          type: "warning",
          message: "Still offline. Please check your internet connection."
        });
      }
    });
  };

  appState.subscribe(() => {
    updateBannerDOM();
  });

  updateBannerDOM();
  return banner;
}
