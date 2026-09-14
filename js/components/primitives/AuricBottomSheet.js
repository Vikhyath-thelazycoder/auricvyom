// AURICVISTA Reusable Bottom Sheet Primitive Component
// Master Authority: Phase 2 Step 8, Step 14 & Step 28
// Touch-responsive bottom sheet with drag handle, swipe gesture dismissal, focus trap & safe-area insets

import { appState } from "../../state.js";

export function renderAuricBottomSheet() {
  const container = document.createElement("div");
  container.id = "auric-bottom-sheet-root";

  let focusTrapHandler = null;

  const updateSheetDOM = () => {
    const { activeSheet } = appState.getState();

    // Remove any previous focus trap
    if (focusTrapHandler) {
      document.removeEventListener("keydown", focusTrapHandler);
      focusTrapHandler = null;
    }

    if (!activeSheet) {
      container.innerHTML = "";
      return;
    }

    const {
      id = "bottom-sheet",
      title = "",
      subtitle = "",
      contentHtml = "",
      actionsHtml = "",
      onClose = null
    } = activeSheet;

    container.innerHTML = `
      <div class="auric-sheet-backdrop" id="sheet-backdrop-layer">
        <div 
          class="auric-bottom-sheet" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="sheet-title-heading"
          tabindex="-1"
          id="${id}"
        >
          <!-- Drag Handle Bar for Touch Gestures -->
          <div class="sheet-handle-wrap" id="sheet-drag-handle" role="button" aria-label="Drag down to close sheet" tabindex="0">
            <div class="sheet-handle-bar"></div>
          </div>

          <!-- Sheet Header -->
          <div class="auric-sheet-header">
            <div class="sheet-header-text">
              ${title ? `<h3 id="sheet-title-heading" class="sheet-title">${title}</h3>` : ""}
              ${subtitle ? `<p class="sheet-subtitle">${subtitle}</p>` : ""}
            </div>
            <button class="sheet-close-btn" id="sheet-close-btn" aria-label="Close bottom sheet">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- Scrollable Body Slot -->
          <div class="auric-sheet-body" id="sheet-body-scrollable">
            ${contentHtml}
          </div>

          <!-- Action Footer Slot -->
          ${actionsHtml ? `
            <div class="auric-sheet-footer">
              ${actionsHtml}
            </div>
          ` : ""}
        </div>
      </div>
    `;

    const sheet = container.querySelector(".auric-bottom-sheet");
    const backdrop = container.querySelector("#sheet-backdrop-layer");
    const closeBtn = container.querySelector("#sheet-close-btn");
    const handleWrap = container.querySelector("#sheet-drag-handle");

    const closeSheet = () => {
      if (typeof onClose === "function") onClose();
      appState.closeBottomSheet();
    };

    closeBtn?.addEventListener("click", closeSheet);

    backdrop?.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeSheet();
      }
    });

    // Touch swipe-down dismissal logic on drag handle
    let touchStartY = 0;
    let touchCurrentY = 0;

    handleWrap?.addEventListener("touchstart", (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    handleWrap?.addEventListener("touchmove", (e) => {
      touchCurrentY = e.touches[0].clientY;
      const deltaY = touchCurrentY - touchStartY;
      if (deltaY > 0 && sheet) {
        sheet.style.transform = `translateY(${deltaY}px)`;
      }
    }, { passive: true });

    handleWrap?.addEventListener("touchend", () => {
      const deltaY = touchCurrentY - touchStartY;
      if (deltaY > 100) {
        closeSheet();
      } else if (sheet) {
        sheet.style.transform = "";
      }
      touchStartY = 0;
      touchCurrentY = 0;
    });

    // Focus Management: Trap focus inside the bottom sheet
    const focusableElements = sheet.querySelectorAll(
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
    updateSheetDOM();
  });

  updateSheetDOM();
  return container;
}
