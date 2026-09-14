// AURICVISTA Global Error Boundary Component
// Master Authority: Phase 2 Step 12 & Step 20
// Resilient error fallback screen with retry and safe home recovery path

import { appState, ROUTES } from "../../state.js";
import { router } from "../../router.js";

export function renderAuricErrorBoundary(errorDetails = null) {
  const container = document.createElement("section");
  container.className = "auric-error-boundary-view";
  container.id = "auric-error-boundary";
  container.setAttribute("role", "alert");

  const title = errorDetails?.title || "Encountered a Disturbance";
  const message = errorDetails?.message || "We encountered an unexpected issue while preparing your luxury travel view.";
  const details = errorDetails?.details || null;

  container.innerHTML = `
    <div class="error-boundary-card">
      <div class="error-icon-shield">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>

      <h2 class="error-title">${title}</h2>
      <p class="error-desc">${message}</p>

      ${details ? `
        <details class="error-technical-details">
          <summary>Diagnostic Details</summary>
          <pre>${details}</pre>
        </details>
      ` : ""}

      <div class="error-actions-group">
        <button class="error-btn-primary" id="error-retry-action">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Try Again
        </button>

        <button class="error-btn-secondary" id="error-home-action">
          Return to Explore
        </button>
      </div>
    </div>
  `;

  container.querySelector("#error-retry-action")?.addEventListener("click", () => {
    appState.clearError();
    if (typeof errorDetails?.retryHandler === "function") {
      errorDetails.retryHandler();
    } else {
      window.location.reload();
    }
  });

  container.querySelector("#error-home-action")?.addEventListener("click", () => {
    appState.clearError();
    router.navigate(ROUTES.EXPLORE);
  });

  return container;
}
