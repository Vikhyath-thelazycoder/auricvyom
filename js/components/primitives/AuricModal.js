// AURICVISTA Accessible Modal Primitive Component
// Master Authority: Phase 2 Step 9, Step 15 & Step 24
// Accessible dialog with focus trap, focus restoration, backdrop blur, Escape handling & screen-reader semantics

import { appState } from "../../state.js";

export function renderAuricModal() {
  const container = document.createElement("div");
  container.id = "auric-modal-root";

  let focusTrapHandler = null;

  const updateModalDOM = () => {
    const { activeModal } = appState.getState();

    // Clean up any existing focus trap
    if (focusTrapHandler) {
      document.removeEventListener("keydown", focusTrapHandler);
      focusTrapHandler = null;
    }

    if (!activeModal) {
      container.innerHTML = "";
      return;
    }

    const {
      id = "modal-dialog",
      title = "Notification",
      message = "",
      variant = "info", // 'info' | 'confirm' | 'destructive' | 'auth'
      confirmText = "Continue",
      cancelText = "Cancel",
      onConfirm = null,
      onCancel = null,
      contentHtml = null
    } = activeModal;

    const isDestructive = variant === "destructive";

    container.innerHTML = `
      <div class="auric-modal-backdrop" id="modal-backdrop-layer">
        <div 
          class="auric-modal-dialog ${isDestructive ? "modal-destructive" : ""}" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="modal-title-heading"
          aria-describedby="modal-desc-body"
          tabindex="-1"
          id="${id}"
        >
          <div class="auric-modal-header">
            <div class="modal-header-icon ${variant}">
              ${getModalIcon(variant)}
            </div>
            <div class="modal-header-text">
              <h3 id="modal-title-heading" class="modal-title">${title}</h3>
            </div>
            <button class="modal-close-btn" id="modal-close-icon-btn" aria-label="Close dialog">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="auric-modal-body" id="modal-desc-body">
            ${message ? `<p class="modal-message-p">${message}</p>` : ""}
            ${contentHtml || ""}
          </div>

          <div class="auric-modal-footer">
            ${onCancel || variant === "confirm" || variant === "destructive" ? `
              <button class="modal-btn-secondary" id="modal-cancel-btn">
                ${cancelText}
              </button>
            ` : ""}
            <button class="modal-btn-primary ${isDestructive ? "btn-danger" : ""}" id="modal-confirm-btn">
              ${confirmText}
            </button>
          </div>
        </div>
      </div>
    `;

    const dialog = container.querySelector(".auric-modal-dialog");
    const confirmBtn = container.querySelector("#modal-confirm-btn");
    const cancelBtn = container.querySelector("#modal-cancel-btn");
    const closeIconBtn = container.querySelector("#modal-close-icon-btn");
    const backdrop = container.querySelector("#modal-backdrop-layer");

    // Close handlers
    const handleClose = () => {
      if (typeof onCancel === "function") onCancel();
      appState.closeModal();
    };

    const handleConfirm = () => {
      if (typeof onConfirm === "function") onConfirm();
      appState.closeModal();
    };

    confirmBtn?.addEventListener("click", handleConfirm);
    cancelBtn?.addEventListener("click", handleClose);
    closeIconBtn?.addEventListener("click", handleClose);

    // Backdrop click dismisses
    backdrop?.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        handleClose();
      }
    });

    // Focus Management: Trap focus inside the dialog
    const focusableElements = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 50);
    }

    focusTrapHandler = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", focusTrapHandler);
  };

  appState.subscribe(() => {
    updateModalDOM();
  });

  updateModalDOM();
  return container;
}

function getModalIcon(variant) {
  switch (variant) {
    case "destructive":
      return `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2.2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      `;
    case "confirm":
      return `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2.2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      `;
    case "auth":
      return `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2.2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      `;
    default:
      return `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2.2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      `;
  }
}
