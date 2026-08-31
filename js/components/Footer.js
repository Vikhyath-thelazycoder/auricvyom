// AURICVISTA Luxury Editorial Footer Component
import { appState } from "../state.js";

export function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "auric-footer";
  footer.id = "app-footer";

  footer.innerHTML = `
    <div class="content-container">
      <div class="footer-top-grid">
        <!-- Brand Column -->
        <div>
          <div class="brand-container" style="margin-bottom: 8px;">
            <div class="brand-logo-mark">
              <span>AV</span>
            </div>
            <div class="brand-text-wrap">
              <div class="brand-title">AURIC<span>VISTA</span></div>
              <div class="brand-tagline">Discover • Explore • Plan • Travel</div>
            </div>
          </div>
          <p class="footer-brand-desc">
            India’s premier bespoke travel platform and editorial sanctuary. Curating authentic heritage, coffee highlands, wilderness safaris, and luxury escapes.
          </p>

          <!-- Newsletter Signup -->
          <div style="margin-top: 24px;">
            <span style="font-size: 0.78rem; color: var(--gold-light); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 8px;">
              Join The Auric Society Gazette
            </span>
            <form id="footer-newsletter-form" style="display: flex; gap: 8px; max-width: 380px;">
              <input 
                type="email" 
                placeholder="Enter your email address..." 
                required 
                style="flex: 1; padding: 10px 16px; background: rgba(255,255,255,0.06); border: 1px solid var(--border-subtle); border-radius: var(--radius-full); color: var(--text-white); font-size: 0.85rem; outline: none;"
              />
              <button type="submit" class="btn-primary-gold" style="padding: 10px 20px; font-size: 0.82rem;">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <!-- Karnataka Escapes Column -->
        <div>
          <h4 class="footer-col-title">Karnataka Jewels</h4>
          <ul class="footer-links-list">
            <li><a href="#destinations" class="footer-link-item" data-dest-id="coorg">Coorg (Kodagu)</a></li>
            <li><a href="#destinations" class="footer-link-item" data-dest-id="chikmagalur">Chikmagalur Highlands</a></li>
            <li><a href="#destinations" class="footer-link-item" data-dest-id="hampi">Hampi & Vijayanagara</a></li>
            <li><a href="#destinations" class="footer-link-item" data-dest-id="gokarna">Gokarna & Om Beach</a></li>
            <li><a href="#destinations" class="footer-link-item" data-dest-id="kabini">Kabini Wildlife Reserve</a></li>
            <li><a href="#destinations" class="footer-link-item" data-dest-id="mysore">Mysuru Royal Palace</a></li>
            <li><a href="#destinations" class="footer-link-item" data-dest-id="dandeli">Dandeli Kali Rapids</a></li>
            <li><a href="#destinations" class="footer-link-item" data-dest-id="udupi">Udupi & St. Mary's</a></li>
          </ul>
        </div>

        <!-- Travel Platform Column -->
        <div>
          <h4 class="footer-col-title">Platform Services</h4>
          <ul class="footer-links-list">
            <li><a href="#stays" class="footer-link-item" data-nav="stays">Luxury Stays & Villas</a></li>
            <li><a href="#experiences" class="footer-link-item" data-nav="experiences">Bespoke Experiences</a></li>
            <li><a href="#flights" class="footer-link-item" data-nav="flights">Flight Connections</a></li>
            <li><a href="#packages" class="footer-link-item" data-nav="packages">Curated Tour Circuits</a></li>
            <li><a href="#planner" class="footer-link-item" data-nav="planner">Interactive Trip Planner</a></li>
            <li><a href="#ai_planner" class="footer-link-item" data-nav="ai_planner">✨ AuricVista AI Concierge</a></li>
            <li><a href="#saved" class="footer-link-item" data-nav="saved">Wishlist & Saved Trips</a></li>
            <li><a href="#bookings" class="footer-link-item" data-nav="bookings">My Bookings & Vouchers</a></li>
          </ul>
        </div>

        <!-- Society & Contact -->
        <div>
          <h4 class="footer-col-title">Concierge & Society</h4>
          <ul class="footer-links-list">
            <li style="color: var(--text-secondary); font-size: 0.88rem;">📍 Indiranagar, Bengaluru, Karnataka, India</li>
            <li style="color: var(--text-secondary); font-size: 0.88rem;">📞 +91 80 4910 8800</li>
            <li style="color: var(--text-secondary); font-size: 0.88rem;">✉️ concierge@auricvista.com</li>
            <li style="color: var(--gold-light); font-size: 0.85rem; font-weight: 700; margin-top: 10px;">👑 24/7 VIP Concierge Desk</li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom-bar">
        <div>
          © 2026 AURICVISTA Travel Technologies Private Limited. All rights reserved.
        </div>
        <div style="display: flex; gap: 24px;">
          <span>Pricing in Indian Rupees (₹)</span>
          <span>•</span>
          <span>Distances in Kilometres (km)</span>
          <span>•</span>
          <span>Privacy & Terms</span>
        </div>
      </div>
    </div>
  `;

  // Attach nav handlers
  footer.querySelectorAll("[data-nav]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      appState.setActiveTab(link.dataset.nav);
    });
  });

  footer.querySelector("#footer-newsletter-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("🎉 Welcome to the Auric Society Gazette! You will receive our weekly curated escapes and private estate invitations.");
    e.target.reset();
  });

  return footer;
}
