// AURICVISTA 6-Step Multi-Step Checkout & Booking Engine Component
import { appState } from "../state.js";

export function renderBookingModal() {
  const backdrop = document.createElement("div");
  backdrop.className = "auric-modal-backdrop";
  backdrop.id = "booking-modal-backdrop";

  let step = 1; // 1: Select, 2: Traveller Details, 3: Add-ons, 4: Price Breakdown, 5: Payment, 6: Confirmation
  let guestName = "Vikhyath Gowda";
  let guestEmail = "vikhyath@auricvista.com";
  let guestPhone = "+91 98801 23456";
  let idType = "Aadhaar Card";
  let specialRequests = "High floor with valley view if available.";
  let promoCode = "";
  let promoDiscount = 0;
  let promoApplied = false;
  let paymentMethod = "upi"; // upi, card, netbanking, points
  let confirmedBookingResult = null;

  // Selected Add-ons state
  const selectedAddons = new Set();

  const renderModalContent = () => {
    const { 
      selectedStayForBooking, 
      selectedExperienceForBooking, 
      selectedPackageForBooking, 
      selectedFlightForBooking, 
      activeModal,
      user
    } = appState.getState();

    if (activeModal !== "booking") {
      backdrop.classList.remove("active");
      backdrop.innerHTML = "";
      step = 1;
      return;
    }

    // Determine what is being booked
    const item = selectedStayForBooking || selectedExperienceForBooking || selectedPackageForBooking || selectedFlightForBooking || {
      title: "Bespoke Karnataka Sanctuary Passage",
      name: "Bespoke Karnataka Sanctuary Passage",
      destinationName: "Coorg, Karnataka",
      pricePerNight: 24500,
      priceDisplay: "₹24,500",
      image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80"
    };

    const isStay = !!selectedStayForBooking;
    const isExp = !!selectedExperienceForBooking;
    const isPkg = !!selectedPackageForBooking;
    const isFlight = !!selectedFlightForBooking;

    const title = item.name || item.title || (isFlight ? `${item.airline} (${item.from} ➔ ${item.to})` : "Travel Booking");
    const baseRate = item.pricePerNight || item.price || item.startingPrice || (isFlight ? item.priceEconomy : 15000);
    const nightsOrPersons = item.nights || 2;
    const baseTotal = baseRate * (isStay ? nightsOrPersons : 1);

    // Calculate add-on costs
    const availableAddons = [
      { id: "addon-trans", name: "Chauffeured Airport / Station SUV Transfer", price: 2499, icon: "🚗" },
      { id: "addon-exp", name: "Artisanal Coffee Cupping & Plantation Trail", price: 1200, icon: "☕" },
      { id: "addon-ins", name: "Comprehensive Travel & Delay Insurance", price: 499, icon: "🛡️" },
      { id: "addon-late", name: "Guaranteed Late 3:00 PM Check-out Pass", price: 1500, icon: "🕒" }
    ];

    let addonsTotal = 0;
    selectedAddons.forEach(aId => {
      const aObj = availableAddons.find(x => x.id === aId);
      if (aObj) addonsTotal += aObj.price;
    });

    const subTotal = baseTotal + addonsTotal;
    const discountAmount = promoApplied ? Math.round(subTotal * 0.10) : 0;
    const gstTotal = Math.round((subTotal - discountAmount) * 0.18);
    const serviceFee = Math.round((subTotal - discountAmount) * 0.05);
    const grandTotal = subTotal - discountAmount + gstTotal + serviceFee;

    backdrop.innerHTML = `
      <div class="modal-window-container" style="max-width: 820px;" id="booking-modal-window">
        <!-- Close Button -->
        <button class="modal-close-btn" id="booking-close-x">✕</button>

        <!-- Progress Steps Indicator Bar -->
        <div style="padding: 24px 36px 14px; border-bottom: 1px solid var(--border-subtle); background: var(--bg-surface);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; color: var(--gold-light); text-transform: uppercase; font-weight: 700;">
              Step ${step} of 6: ${getStepTitle(step)}
            </span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${Math.round((step / 6) * 100)}% Completed</span>
          </div>

          <div style="display: flex; gap: 6px; height: 4px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden;">
            ${[1, 2, 3, 4, 5, 6].map(s => `
              <div style="flex: 1; background: ${s <= step ? 'var(--gold-primary)' : 'transparent'}; transition: all 0.3s;"></div>
            `).join("")}
          </div>
        </div>

        <!-- Step Dynamic Body -->
        <div style="padding: 32px 36px; max-height: 65vh; overflow-y: auto;">
          ${renderStepContent(step, item, title, baseRate, baseTotal, grandTotal, gstTotal, serviceFee, addonsTotal, discountAmount, availableAddons, selectedAddons, guestName, guestEmail, guestPhone, idType, specialRequests, promoCode, promoApplied, paymentMethod, user, confirmedBookingResult)}
        </div>

        <!-- Step Footer Navigation Bar -->
        <div style="padding: 20px 36px; border-top: 1px solid var(--border-subtle); background: var(--bg-secondary); display: flex; justify-content: space-between; align-items: center;">
          ${step > 1 && step < 6 ? `
            <button class="btn-outline-glass" id="booking-prev-step-btn" style="padding: 10px 22px; font-size: 0.88rem;">
              ‹ Previous Step
            </button>
          ` : `<div></div>`}

          ${step < 5 ? `
            <button class="btn-primary-gold" id="booking-next-step-btn" style="padding: 10px 28px; font-size: 0.92rem;">
              Continue to Step ${step + 1} ›
            </button>
          ` : step === 5 ? `
            <button class="btn-primary-gold" id="booking-pay-confirm-btn" style="padding: 12px 32px; font-size: 1rem;">
              Pay ₹${grandTotal.toLocaleString('en-IN')} & Confirm Booking
            </button>
          ` : `
            <button class="btn-primary-gold" id="booking-done-btn" style="padding: 10px 28px; font-size: 0.92rem;">
              View My Bookings Pass
            </button>
          `}
        </div>
      </div>
    `;

    backdrop.classList.add("active");

    // Listeners
    backdrop.querySelector("#booking-close-x")?.addEventListener("click", () => {
      appState.closeModal();
    });

    backdrop.querySelector("#booking-prev-step-btn")?.addEventListener("click", () => {
      if (step > 1) {
        step--;
        renderModalContent();
      }
    });

    backdrop.querySelector("#booking-next-step-btn")?.addEventListener("click", () => {
      if (step < 5) {
        step++;
        renderModalContent();
      }
    });

    // Addon toggles
    backdrop.querySelectorAll(".addon-toggle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const addonId = btn.dataset.addonId;
        if (selectedAddons.has(addonId)) {
          selectedAddons.delete(addonId);
        } else {
          selectedAddons.add(addonId);
        }
        renderModalContent();
      });
    });

    // Promo code apply
    backdrop.querySelector("#apply-promo-btn")?.addEventListener("click", () => {
      const codeInput = backdrop.querySelector("#booking-promo-input");
      if (codeInput && codeInput.value.trim().toUpperCase() === "AURIC10") {
        promoApplied = true;
        promoCode = "AURIC10";
        appState.showToast("🎉 Promo AURIC10 applied: 10% Bespoke Discount!");
        renderModalContent();
      } else {
        alert("Invalid promo code. Try using 'AURIC10' for 10% off.");
      }
    });

    // Payment radio
    backdrop.querySelectorAll("[name='payment-method']").forEach(radio => {
      radio.addEventListener("change", (e) => {
        paymentMethod = e.target.value;
      });
    });

    // Finalize Payment & Create Voucher
    backdrop.querySelector("#booking-pay-confirm-btn")?.addEventListener("click", () => {
      const result = appState.addBooking({
        type: isStay ? "stay" : isExp ? "experience" : isPkg ? "package" : "flight",
        title,
        destination: item.destinationName || item.destination || "Karnataka",
        checkIn: item.checkIn || new Date().toISOString().split("T")[0],
        checkOut: item.checkOut || new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
        guests: item.guests || 2,
        totalPrice: grandTotal,
        image: item.image || "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80"
      });

      confirmedBookingResult = result;
      step = 6;
      renderModalContent();
    });

    backdrop.querySelector("#booking-done-btn")?.addEventListener("click", () => {
      appState.closeModal();
      appState.setActiveTab("bookings");
    });
  };

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      appState.closeModal();
    }
  });

  appState.subscribe(() => {
    renderModalContent();
  });

  return backdrop;
}

function getStepTitle(step) {
  switch (step) {
    case 1: return "Review Selection & Dates";
    case 2: return "Traveller Identification";
    case 3: return "Enhance Your Journey (Add-ons)";
    case 4: return "Transparent Price Breakdown";
    case 5: return "Secure Payment Gateway";
    case 6: return "Confirmed Travel Voucher";
    default: return "Booking";
  }
}

function renderStepContent(step, item, title, baseRate, baseTotal, grandTotal, gstTotal, serviceFee, addonsTotal, discountAmount, availableAddons, selectedAddons, guestName, guestEmail, guestPhone, idType, specialRequests, promoCode, promoApplied, paymentMethod, user, confirmedBookingResult) {
  if (step === 1) {
    return `
      <div>
        <div style="display: flex; gap: 20px; background: var(--bg-card); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 20px; margin-bottom: 24px;">
          <img src="${item.image}" alt="${title}" style="width: 120px; height: 100px; border-radius: var(--radius-sm); object-fit: cover;" />
          <div style="flex: 1;">
            <span class="badge-state-pill" style="font-size: 0.7rem; margin-bottom: 6px; display: inline-block;">Selected Passage</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-white); margin-bottom: 4px;">${title}</h3>
            <p style="font-size: 0.85rem; color: var(--gold-light);">📍 ${item.destinationName || item.destination || 'Karnataka'}</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px;">
            <label style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 6px;">Travel Dates</label>
            <div style="font-size: 1rem; color: var(--text-white); font-weight: 700;">${item.checkIn || '2026-09-15'} ➔ ${item.checkOut || '2026-09-17'}</div>
            <span style="font-size: 0.78rem; color: var(--gold-light);">${item.nights || 2} Nights Stay</span>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px;">
            <label style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 6px;">Party Size</label>
            <div style="font-size: 1rem; color: var(--text-white); font-weight: 700;">${item.guests || 2} Adults</div>
            <span style="font-size: 0.78rem; color: var(--emerald-light);">✓ Premium Room Reserved</span>
          </div>
        </div>
      </div>
    `;
  }

  if (step === 2) {
    return `
      <div>
        <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--text-white); margin-bottom: 16px;">Primary Guest Information</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Full Name (As on ID)</label>
            <input type="text" value="${guestName}" style="width: 100%; padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" />
          </div>
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Email for Confirmation & Passes</label>
            <input type="email" value="${guestEmail}" style="width: 100%; padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Mobile Number</label>
            <input type="tel" value="${guestPhone}" style="width: 100%; padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" />
          </div>
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Government ID Type</label>
            <select style="width: 100%; padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;">
              <option>Aadhaar Card</option>
              <option>Passport</option>
              <option>Driving License</option>
            </select>
          </div>
        </div>

        <div>
          <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Special Requests / Dietary Preferences</label>
          <textarea style="width: 100%; height: 70px; padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.85rem;">${specialRequests}</textarea>
        </div>
      </div>
    `;
  }

  if (step === 3) {
    return `
      <div>
        <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--text-white); margin-bottom: 6px;">Enhance Your Journey</h4>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px;">Add curated sanctuary services for a seamless escape.</p>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${availableAddons.map(addon => `
            <div style="background: var(--bg-card); border: 1px solid ${selectedAddons.has(addon.id) ? 'var(--gold-primary)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 14px;">
                <span style="font-size: 1.5rem;">${addon.icon}</span>
                <div>
                  <h5 style="font-size: 0.98rem; font-weight: 700; color: var(--text-white); margin-bottom: 2px;">${addon.name}</h5>
                  <span style="font-size: 0.82rem; color: var(--gold-light); font-weight: 700;">+ ₹${addon.price.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button class="addon-toggle-btn ${selectedAddons.has(addon.id) ? 'active' : ''}" data-addon-id="${addon.id}" style="padding: 8px 18px; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 700; border: 1px solid var(--border-gold); background: ${selectedAddons.has(addon.id) ? 'var(--gold-primary)' : 'transparent'}; color: ${selectedAddons.has(addon.id) ? '#07090e' : 'var(--gold-light)'};">
                ${selectedAddons.has(addon.id) ? '✓ Added' : '+ Add'}
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (step === 4) {
    return `
      <div>
        <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--text-white); margin-bottom: 16px;">Transparent Price Breakdown</h4>

        <!-- Promo Code Input -->
        <div style="display: flex; gap: 10px; margin-bottom: 24px;">
          <input type="text" id="booking-promo-input" placeholder="Promo code (e.g. AURIC10)" value="${promoCode}" style="flex: 1; padding: 12px 16px; background: var(--bg-surface); border: 1px solid var(--border-gold); border-radius: var(--radius-md); color: var(--text-white); font-size: 0.9rem;" />
          <button class="btn-outline-glass" id="apply-promo-btn" style="padding: 12px 20px; font-size: 0.85rem;">
            Apply
          </button>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 24px; display: flex; flex-direction: column; gap: 12px; font-size: 0.92rem; color: var(--text-secondary);">
          <div style="display: flex; justify-content: space-between;">
            <span>Base Passage Rate</span>
            <span style="color: var(--text-white); font-weight: 600;">₹${baseTotal.toLocaleString('en-IN')}</span>
          </div>

          ${addonsTotal > 0 ? `
            <div style="display: flex; justify-content: space-between;">
              <span>Curated Add-ons (${selectedAddons.size})</span>
              <span style="color: var(--gold-light); font-weight: 600;">+ ₹${addonsTotal.toLocaleString('en-IN')}</span>
            </div>
          ` : ''}

          ${discountAmount > 0 ? `
            <div style="display: flex; justify-content: space-between; color: var(--emerald-light);">
              <span>Bespoke Promo Discount (10%)</span>
              <span style="font-weight: 700;">- ₹${discountAmount.toLocaleString('en-IN')}</span>
            </div>
          ` : ''}

          <div style="display: flex; justify-content: space-between;">
            <span>Goods & Services Tax (18% GST)</span>
            <span style="color: var(--text-white); font-weight: 600;">₹${gstTotal.toLocaleString('en-IN')}</span>
          </div>

          <div style="display: flex; justify-content: space-between;">
            <span>Auric Concierge & Eco Fee (5%)</span>
            <span style="color: var(--text-white); font-weight: 600;">₹${serviceFee.toLocaleString('en-IN')}</span>
          </div>

          <div style="border-top: 1px solid var(--border-subtle); padding-top: 14px; margin-top: 6px; display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-size: 1.15rem; font-weight: 700; color: var(--text-white);">Total Payable</span>
            <span style="font-size: 1.6rem; font-weight: 900; color: var(--gold-primary);">₹${grandTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    `;
  }

  if (step === 5) {
    return `
      <div>
        <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--text-white); margin-bottom: 6px;">Select Payment Method</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 20px;">256-Bit Encrypted Simulated Checkout</p>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          <label style="background: var(--bg-card); border: 1.5px solid ${paymentMethod === 'upi' ? 'var(--gold-primary)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); padding: 18px; display: flex; align-items: center; gap: 16px; cursor: pointer;">
            <input type="radio" name="payment-method" value="upi" ${paymentMethod === 'upi' ? 'checked' : ''} />
            <div style="flex: 1;">
              <div style="font-weight: 700; color: var(--text-white); font-size: 1rem;">📱 Instant UPI (Google Pay / PhonePe / Paytm / BHIM)</div>
              <span style="font-size: 0.8rem; color: var(--emerald-light);">Zero surcharge • Instant confirmation QR</span>
            </div>
          </label>

          <label style="background: var(--bg-card); border: 1.5px solid ${paymentMethod === 'card' ? 'var(--gold-primary)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); padding: 18px; display: flex; align-items: center; gap: 16px; cursor: pointer;">
            <input type="radio" name="payment-method" value="card" ${paymentMethod === 'card' ? 'checked' : ''} />
            <div style="flex: 1;">
              <div style="font-weight: 700; color: var(--text-white); font-size: 1rem;">💳 Credit / Debit Card (Visa, Mastercard, Amex, RuPay)</div>
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Supports International and Domestic Cards</span>
            </div>
          </label>

          <label style="background: var(--bg-card); border: 1.5px solid ${paymentMethod === 'points' ? 'var(--gold-primary)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); padding: 18px; display: flex; align-items: center; gap: 16px; cursor: pointer;">
            <input type="radio" name="payment-method" value="points" ${paymentMethod === 'points' ? 'checked' : ''} />
            <div style="flex: 1;">
              <div style="font-weight: 700; color: var(--text-white); font-size: 1rem;">⭐ Auric Society Diamond Points (${user.loyaltyPoints.toLocaleString()} Available)</div>
              <span style="font-size: 0.8rem; color: var(--gold-light);">Redeem points directly for your reservation</span>
            </div>
          </label>
        </div>
      </div>
    `;
  }

  if (step === 6) {
    return `
      <div style="text-align: center; padding: 20px 0;">
        <div style="font-size: 3.5rem; margin-bottom: 12px;">🎉</div>
        <span class="badge-state-pill" style="font-size: 0.8rem; margin-bottom: 10px; display: inline-block; background: rgba(16, 185, 129, 0.2); border-color: var(--emerald-accent); color: var(--emerald-light);">
          ● RESERVATION CONFIRMED
        </span>
        <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--text-white); margin-bottom: 6px;">
          You're Escaping with AuricVista!
        </h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 24px;">
          Your booking confirmation voucher has been registered and synced with our VIP concierge desk.
        </p>

        <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); padding: 24px; text-align: left; max-width: 550px; margin: 0 auto 24px;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 14px;">
            <div>
              <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Booking ID</span>
              <div style="font-size: 1.1rem; font-weight: 800; color: var(--gold-light);">${confirmedBookingResult?.id || 'AV-82910'}</div>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Voucher Code</span>
              <div style="font-size: 1.1rem; font-weight: 800; color: var(--emerald-light);">${confirmedBookingResult?.voucherCode || 'AV-CRG-82910'}</div>
            </div>
          </div>

          <div style="font-size: 0.92rem; color: var(--text-white); margin-bottom: 8px;"><strong>Passage:</strong> ${title}</div>
          <div style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 8px;"><strong>Lead Guest:</strong> ${guestName} (${guestEmail})</div>
          <div style="font-size: 0.88rem; color: var(--text-secondary);"><strong>Total Paid:</strong> ₹${grandTotal.toLocaleString('en-IN')} (Includes 18% GST)</div>
        </div>

        <div style="display: flex; justify-content: center; gap: 14px;">
          <button class="btn-outline-glass" onclick="window.print()" style="padding: 10px 20px; font-size: 0.85rem;">
            🖨️ Print Voucher
          </button>
        </div>
      </div>
    `;
  }

  return "";
}
