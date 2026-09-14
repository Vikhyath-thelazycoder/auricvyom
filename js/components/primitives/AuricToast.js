// AURICVISTA Reusable Toast Feedback System
// Master Authority: Phase 2 Step 12 & Step 23
// Multi-variant toast stack with auto-dismiss, action callbacks, and responsive positioning

import { appState } from "../../state.js";

export function renderAuricToastStack() {
  const container = document.createElement("div");
  container.className = "auric-toast-stack";
  container.id = "auric-toast-stack";
  container.setAttribute("role", "region");
  container.setAttribute("aria-live", "polite");
  container.setAttribute("aria-label", "Notifications & System Feedback");

  const updateToastDOM = () => {
    const { toastQueue } = appState.getState();

    if (!toastQueue || toastQueue.length === 0) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = toastQueue.map((toast) => `
      <div 
        class="auric-toast-item toast-${toast.type || "info"}" 
        id="${toast.id}"
        role="alert"
      >
        <div class="toast-icon-wrap">
          ${getToastIcon(toast.type)}
        </div>

        <div class="toast-content-wrap">
          <span class="toast-message">${toast.message}</span>
        </div>

        ${toast.actionText ? `
          <button class="toast-action-btn" data-toast-id="${toast.id}">
            ${toast.actionText}
          </button>
        ` : ""}

        <button class="toast-dismiss-btn" data-dismiss-id="${toast.id}" aria-label="Dismiss notification">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    `).join("");

    // Bind dismiss handlers
    container.querySelectorAll("[data-dismiss-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        appState.dismissToast(btn.dataset.dismissId);
      });
    });

    // Bind action handlers
    container.querySelectorAll("[data-toast-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const toast = toastQueue.find(t => t.id === btn.dataset.toastId);
        if (toast && typeof toast.onAction === "function") {
          toast.onAction();
        }
        appState.dismissToast(btn.dataset.toastId);
      });
    });
  };

  appState.subscribe(() => {
    updateToastDOM();
  });

  updateToastDOM();
  return container;
}

function getToastIcon(type) {
  switch (type) {
    case "success":
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
    case "warning":
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2.2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      `;
    case "error":
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2.2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      `;
    default:
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2.2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      `;
  }
}
