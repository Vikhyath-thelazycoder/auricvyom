// AURICVISTA Notifications Drawer & Panel Component
// Master Authority: Phase 2 Step 13 & Step 15
// Accessible notification center with unread counters, mark-as-read, and deep links

import { appState, ROUTES } from "../../state.js";
import { router } from "../../router.js";

export function renderNotificationsDrawer() {
  const container = document.createElement("div");
  container.className = "notifications-drawer-root";
  container.id = "notifications-drawer-root";

  let focusTrapHandler = null;

  const updateNotifDOM = () => {
    const { activeDrawer, notifications, unreadNotifications } = appState.getState();

    if (focusTrapHandler) {
      document.removeEventListener("keydown", focusTrapHandler);
      focusTrapHandler = null;
    }

    if (activeDrawer !== "notifications") {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = `
      <div class="drawer-backdrop" id="notif-backdrop-layer">
        <aside 
          class="notifications-panel" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="notif-panel-heading"
          tabindex="-1"
        >
          <!-- Header -->
          <div class="notif-panel-header">
            <div class="notif-header-title-row">
              <h2 id="notif-panel-heading" class="notif-panel-title">Notifications</h2>
              ${unreadNotifications > 0 ? `
                <span class="notif-unread-count-pill">${unreadNotifications} unread</span>
              ` : ""}
            </div>

            <div class="notif-header-actions">
              ${unreadNotifications > 0 ? `
                <button class="notif-mark-read-btn" id="mark-all-read-btn">
                  Mark all read
                </button>
              ` : ""}
              <button class="notif-close-btn" id="notif-close-icon-btn" aria-label="Close notifications panel">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Notification Items List -->
          <div class="notif-panel-body" id="notif-scrollable-body">
            ${notifications && notifications.length > 0 ? `
              <div class="notif-list-group">
                ${notifications.map(n => `
                  <div class="notif-card ${n.read ? "read" : "unread"}" data-notif-link="${n.link || ""}" role="button" tabindex="0">
                    <div class="notif-card-icon ${n.type}">
                      ${getNotifIcon(n.type)}
                    </div>
                    <div class="notif-card-body">
                      <div class="notif-card-title-row">
                        <span class="notif-card-title">${n.title}</span>
                        <span class="notif-card-time">${n.time}</span>
                      </div>
                      <p class="notif-card-msg">${n.message}</p>
                    </div>
                    ${!n.read ? `<span class="notif-unread-dot"></span>` : ""}
                  </div>
                `).join("")}
              </div>
            ` : `
              <div class="notif-empty-state">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.8">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <p class="notif-empty-title">All Caught Up</p>
                <p class="notif-empty-desc">You have no new trip updates or community alerts right now.</p>
              </div>
            `}
          </div>
        </aside>
      </div>
    `;

    const panel = container.querySelector(".notifications-panel");
    const backdrop = container.querySelector("#notif-backdrop-layer");
    const closeBtn = container.querySelector("#notif-close-icon-btn");
    const markAllReadBtn = container.querySelector("#mark-all-read-btn");

    const closeNotif = () => {
      appState.closeDrawer();
    };

    closeBtn?.addEventListener("click", closeNotif);
    backdrop?.addEventListener("click", (e) => {
      if (e.target === backdrop) closeNotif();
    });

    markAllReadBtn?.addEventListener("click", () => {
      appState.markAllNotificationsRead();
    });

    // Card link click
    container.querySelectorAll("[data-notif-link]").forEach(card => {
      card.addEventListener("click", () => {
        const link = card.dataset.notifLink;
        closeNotif();
        if (link) {
          router.navigate(link);
        }
      });
    });

    // Focus Trap
    const focusable = panel?.querySelectorAll('button, [tabindex="0"]');
    if (focusable && focusable.length > 0) {
      focusTrapHandler = (e) => {
        if (e.key === "Tab") {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener("keydown", focusTrapHandler);
    }
  };

  appState.subscribe(() => {
    updateNotifDOM();
  });

  updateNotifDOM();
  return container;
}

function getNotifIcon(type) {
  switch (type) {
    case "trip":
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
        </svg>
      `;
    case "social":
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--social-pink)" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      `;
    case "safety":
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      `;
    default:
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
        </svg>
      `;
  }
}
