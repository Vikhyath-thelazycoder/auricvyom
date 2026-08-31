// AURICVISTA Verified Reviews & Rating Submission Component
import { appState } from "../state.js";

export function renderReviewsSection() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "reviews-section";

  let isReviewModalOpen = false;

  const renderContent = () => {
    const { reviews } = appState.getState();

    section.innerHTML = `
      <div class="content-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div>
            <span class="section-tag-gold">⭐ VERIFIED EXPERIENCES • 4.96/5 AVERAGE</span>
            <h2 class="section-main-title">Traveler Reflections & Reviews</h2>
            <p class="section-desc-muted">
              Authentic reviews and reflections from discerning travelers exploring Karnataka's sanctuaries and Pan-India circuits.
            </p>
          </div>

          <button class="btn-outline-glass" id="open-review-form-btn" style="padding: 10px 22px; font-size: 0.88rem;">
            ✍️ Leave a Review
          </button>
        </div>

        <!-- Reviews Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 28px;">
          ${reviews.map(rev => `
            <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); padding: 28px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-md);">
              <div>
                <!-- Stars & Badge -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <div style="color: var(--gold-primary); font-size: 1.1rem; letter-spacing: 2px;">
                    ${'★'.repeat(rev.rating)}
                  </div>
                  ${rev.verifiedBooking ? `
                    <span class="badge-state-pill" style="font-size: 0.65rem; background: rgba(16, 185, 129, 0.15); border-color: var(--emerald-accent); color: var(--emerald-light);">
                      ✓ Verified Booking
                    </span>
                  ` : ''}
                </div>

                <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-white); margin-bottom: 8px;">
                  "${rev.title}"
                </h4>
                <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
                  ${rev.comment}
                </p>

                ${rev.photos && rev.photos.length > 0 ? `
                  <div style="display: flex; gap: 8px; margin-bottom: 16px;">
                    ${rev.photos.map(p => `<img src="${p}" alt="Review photo" style="width: 60px; height: 50px; border-radius: var(--radius-sm); object-fit: cover;" />`).join("")}
                  </div>
                ` : ''}
              </div>

              <!-- Author Meta -->
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 14px;">
                <div style="display: flex; gap: 10px; align-items: center;">
                  <img src="${rev.avatar}" alt="${rev.author}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
                  <div>
                    <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-white);">${rev.author}</div>
                    <span style="font-size: 0.72rem; color: var(--gold-light);">📍 ${rev.destination}</span>
                  </div>
                </div>
                <span style="font-size: 0.72rem; color: var(--text-muted);">${rev.date}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Write Review Modal -->
      <div class="auric-modal-backdrop ${isReviewModalOpen ? 'active' : ''}" id="review-modal-backdrop">
        <div class="modal-window-container" style="max-width: 550px; padding: 32px;" id="review-window">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white);">Write a Verified Review</h3>
            <button id="close-review-modal-x" style="color: var(--text-white); font-size: 1.3rem;">✕</button>
          </div>

          <form id="review-create-form" style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Destination or Stay Name</label>
              <input type="text" id="review-item-input" placeholder="e.g. The Tamara Coorg, Hampi" required style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" />
            </div>

            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Rating (1 to 5 Stars)</label>
              <select id="review-rating-select" style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;">
                <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                <option value="3">★★★☆☆ (3 Stars - Average)</option>
              </select>
            </div>

            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Review Headline</label>
              <input type="text" id="review-head-input" placeholder="e.g. Sublime rainforest tranquility" required style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" />
            </div>

            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Your Review</label>
              <textarea id="review-text-input" rows="4" placeholder="Share your experience..." required style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem; line-height: 1.6;"></textarea>
            </div>

            <button type="submit" class="btn-primary-gold" style="width: 100%; justify-content: center; padding: 12px; font-size: 0.95rem; margin-top: 6px;">
              Submit Verified Review
            </button>
          </form>
        </div>
      </div>
    `;

    // Modal triggers
    section.querySelector("#open-review-form-btn")?.addEventListener("click", () => {
      isReviewModalOpen = true;
      renderContent();
    });

    section.querySelector("#close-review-modal-x")?.addEventListener("click", () => {
      isReviewModalOpen = false;
      renderContent();
    });

    section.querySelector("#review-create-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const itemTitle = section.querySelector("#review-item-input").value;
      const rating = parseInt(section.querySelector("#review-rating-select").value);
      const title = section.querySelector("#review-head-input").value;
      const comment = section.querySelector("#review-text-input").value;

      appState.addReview({
        itemTitle,
        destination: itemTitle,
        rating,
        title,
        comment,
        photos: []
      });

      isReviewModalOpen = false;
    });
  };

  appState.subscribe(() => {
    renderContent();
  });

  renderContent();
  return section;
}
