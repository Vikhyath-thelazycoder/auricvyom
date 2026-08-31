// AURICVISTA Travel Journal & Editorial Stories Component
import { appState } from "../state.js";

export function renderTravelJournalView() {
  const section = document.createElement("section");
  section.className = "section-spacing";
  section.id = "travel-journal-section";

  let isStoryModalOpen = false;

  const renderContent = () => {
    const { travelStories } = appState.getState();

    section.innerHTML = `
      <div class="content-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div>
            <span class="section-tag-gold">📖 EDITORIAL CHRONICLES & JOURNAL</span>
            <h2 class="section-main-title">The Auric Travel Gazette</h2>
            <p class="section-desc-muted">
              Immersive, personal reflections from explorers traversing the coffee hills, sacred coastlines, and ancient ruins of Karnataka and India.
            </p>
          </div>

          <button class="btn-primary-gold" id="open-write-story-btn" style="padding: 10px 22px; font-size: 0.88rem;">
            ✍️ Write a Travel Story
          </button>
        </div>

        <!-- Featured Story Big Banner -->
        ${travelStories.length > 0 ? `
          <div style="background: var(--bg-card); border: 1.5px solid var(--border-gold); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 48px; box-shadow: var(--shadow-lg); display: grid; grid-template-columns: 1.2fr 1fr; gap: 0;">
            <img src="${travelStories[0].coverImage}" alt="${travelStories[0].title}" style="width: 100%; height: 100%; min-height: 360px; object-fit: cover;" />
            <div style="padding: 36px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
                  <span class="badge-state-pill" style="font-size: 0.7rem;">Featured Story</span>
                  <span style="font-size: 0.8rem; color: var(--gold-light); font-weight: 700;">📍 ${travelStories[0].destination}</span>
                </div>
                <h3 style="font-family: var(--font-serif); font-size: 1.85rem; color: var(--text-white); margin-bottom: 12px; line-height: 1.25;">
                  ${travelStories[0].title}
                </h3>
                <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px;">
                  ${travelStories[0].excerpt}
                </p>
                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 20px;">
                  ${(travelStories[0].placesVisited || []).map(p => `<span class="vibe-tag">📍 ${p}</span>`).join("")}
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
                <div style="display: flex; gap: 12px; align-items: center;">
                  <img src="${travelStories[0].authorAvatar}" alt="${travelStories[0].author}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;" />
                  <div>
                    <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-white);">${travelStories[0].author}</div>
                    <span style="font-size: 0.72rem; color: var(--gold-light);">${travelStories[0].authorTier}</span>
                  </div>
                </div>
                <span style="font-size: 0.75rem; color: var(--text-muted);">⏱️ ${travelStories[0].readingTime}</span>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Stories Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 32px;">
          ${travelStories.slice(1).map(story => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.3s;">
              <div>
                <img src="${story.coverImage}" alt="${story.title}" style="width: 100%; height: 220px; object-fit: cover;" />
                <div style="padding: 24px;">
                  <span class="badge-state-pill" style="font-size: 0.7rem; margin-bottom: 8px; display: inline-block;">📍 ${story.destination}</span>
                  <h4 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-white); margin-bottom: 8px;">${story.title}</h4>
                  <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">${story.excerpt}</p>
                </div>
              </div>

              <div style="padding: 16px 24px; border-top: 1px solid var(--border-subtle); background: var(--bg-surface); display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; gap: 10px; align-items: center;">
                  <img src="${story.authorAvatar}" alt="${story.author}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
                  <span style="font-size: 0.82rem; color: var(--text-white); font-weight: 600;">${story.author}</span>
                </div>
                <span style="font-size: 0.75rem; color: var(--text-muted);">${story.tripDates}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Write a Travel Story Modal -->
      <div class="auric-modal-backdrop ${isStoryModalOpen ? 'active' : ''}" id="story-modal-backdrop">
        <div class="modal-window-container" style="max-width: 650px; padding: 32px;" id="story-window">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-white);">Publish a Travel Story</h3>
            <button id="close-story-modal-x" style="color: var(--text-white); font-size: 1.3rem;">✕</button>
          </div>

          <form id="story-create-form" style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Story Title</label>
              <input type="text" id="story-title-input" placeholder="e.g. Dawn Mist on Brahmagiri Peak" required style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Destination</label>
                <input type="text" id="story-dest-input" placeholder="Coorg, Karnataka" required style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" />
              </div>
              <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Cover Photo URL</label>
                <input type="url" id="story-cover-input" value="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80" style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" />
              </div>
            </div>

            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Short Excerpt</label>
              <input type="text" id="story-excerpt-input" placeholder="A one-sentence reflection..." required style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem;" />
            </div>

            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Your Narrative</label>
              <textarea id="story-content-input" rows="5" placeholder="Describe the sounds, sights, and fragrances of your journey..." required style="width: 100%; padding: 10px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-white); font-size: 0.9rem; line-height: 1.6;"></textarea>
            </div>

            <button type="submit" class="btn-primary-gold" style="width: 100%; justify-content: center; padding: 12px; font-size: 0.95rem; margin-top: 6px;">
              Publish to Auric Gazette
            </button>
          </form>
        </div>
      </div>
    `;

    // Modal triggers
    section.querySelector("#open-write-story-btn")?.addEventListener("click", () => {
      isStoryModalOpen = true;
      renderContent();
    });

    section.querySelector("#close-story-modal-x")?.addEventListener("click", () => {
      isStoryModalOpen = false;
      renderContent();
    });

    section.querySelector("#story-create-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = section.querySelector("#story-title-input").value;
      const destination = section.querySelector("#story-dest-input").value;
      const coverImage = section.querySelector("#story-cover-input").value;
      const excerpt = section.querySelector("#story-excerpt-input").value;
      const content = section.querySelector("#story-content-input").value;

      appState.addTravelStory({
        title,
        destination,
        coverImage,
        excerpt,
        content,
        placesVisited: [destination]
      });

      isStoryModalOpen = false;
    });
  };

  appState.subscribe(() => {
    if (appState.getState().activeTab === "journal") {
      renderContent();
    }
  });

  renderContent();
  return section;
}
