// AURICVISTA User Authentication Modal Component
import { appState } from "../state.js";

export function renderAuthModal() {
  const backdrop = document.createElement("div");
  backdrop.className = "auric-modal-backdrop";
  backdrop.id = "auth-modal-backdrop";

  let mode = "login"; // 'login', 'signup', 'forgot'

  const renderContent = () => {
    const { activeModal } = appState.getState();
    if (activeModal !== "authModal") {
      backdrop.classList.remove("active");
      backdrop.innerHTML = "";
      return;
    }

    backdrop.innerHTML = `
      <div class="modal-window-container" style="max-width: 480px; padding: 36px;" id="auth-window">
        <button class="modal-close-btn" id="auth-modal-close-x">✕</button>

        <div style="text-align: center; margin-bottom: 24px;">
          <div class="brand-logo-mark" style="margin: 0 auto 12px; width: 50px; height: 50px; font-size: 1.4rem;">
            <span>AV</span>
          </div>
          <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--text-white); margin-bottom: 4px;">
            ${mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join Auric Society' : 'Reset Password'}
          </h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">
            ${mode === 'login' ? 'Access your saved journeys, bookings, and diamond points' : mode === 'signup' ? 'Unlock member-only private estates & bespoke itineraries' : 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        <!-- Mode Switcher Tabs -->
        ${mode !== 'forgot' ? `
          <div style="display: flex; background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); border-radius: var(--radius-full); padding: 4px; margin-bottom: 24px;">
            <button class="auth-mode-tab-btn ${mode === 'login' ? 'active' : ''}" data-mode="login" style="flex: 1; padding: 8px; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 700; color: ${mode === 'login' ? '#07090e' : 'var(--text-secondary)'}; background: ${mode === 'login' ? 'var(--gold-primary)' : 'transparent'};">
              Sign In
            </button>
            <button class="auth-mode-tab-btn ${mode === 'signup' ? 'active' : ''}" data-mode="signup" style="flex: 1; padding: 8px; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 700; color: ${mode === 'signup' ? '#07090e' : 'var(--text-secondary)'}; background: ${mode === 'signup' ? 'var(--gold-primary)' : 'transparent'};">
              Create Account
            </button>
          </div>
        ` : ''}

        <!-- Form -->
        <form id="auth-form" style="display: flex; flex-direction: column; gap: 14px;">
          ${mode === 'signup' ? `
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Full Name</label>
              <input type="text" id="auth-name-input" placeholder="Vikhyath Gowda" required style="width: 100%; padding: 12px 14px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" />
            </div>
          ` : ''}

          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Email Address</label>
            <input type="email" id="auth-email-input" placeholder="vikhyath@auricvista.com" value="vikhyath@auricvista.com" required style="width: 100%; padding: 12px 14px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" />
          </div>

          ${mode !== 'forgot' ? `
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">Password</label>
                ${mode === 'login' ? `<button type="button" id="auth-forgot-link" style="font-size: 0.72rem; color: var(--gold-light);">Forgot?</button>` : ''}
              </div>
              <input type="password" id="auth-pass-input" placeholder="••••••••" value="password123" required style="width: 100%; padding: 12px 14px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" />
            </div>
          ` : ''}

          <button type="submit" class="btn-primary-gold" style="width: 100%; justify-content: center; padding: 12px; font-size: 0.95rem; margin-top: 8px;">
            ${mode === 'login' ? 'Sign In to AuricVista' : mode === 'signup' ? 'Create Free Account' : 'Send Recovery Link'}
          </button>
        </form>

        ${mode === 'forgot' ? `
          <div style="text-align: center; margin-top: 18px;">
            <button id="auth-back-login" style="font-size: 0.82rem; color: var(--gold-light);">‹ Back to Sign In</button>
          </div>
        ` : ''}
      </div>
    `;

    backdrop.classList.add("active");

    backdrop.querySelector("#auth-modal-close-x")?.addEventListener("click", () => {
      appState.closeModal();
    });

    backdrop.querySelectorAll(".auth-mode-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        mode = btn.dataset.mode;
        renderContent();
      });
    });

    backdrop.querySelector("#auth-forgot-link")?.addEventListener("click", () => {
      mode = "forgot";
      renderContent();
    });

    backdrop.querySelector("#auth-back-login")?.addEventListener("click", () => {
      mode = "login";
      renderContent();
    });

    backdrop.querySelector("#auth-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (mode === "login") {
        const email = backdrop.querySelector("#auth-email-input").value;
        appState.login(email, "pass");
      } else if (mode === "signup") {
        const name = backdrop.querySelector("#auth-name-input").value;
        const email = backdrop.querySelector("#auth-email-input").value;
        appState.signup(name, email, "pass");
      } else {
        alert("Password reset instructions have been sent to your email.");
        mode = "login";
        renderContent();
      }
    });
  };

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) appState.closeModal();
  });

  appState.subscribe(() => {
    renderContent();
  });

  return backdrop;
}
