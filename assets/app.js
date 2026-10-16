const EPISODES_URL = "data/episodes.json";
const OFFICIAL_PROVIDERS = [
  { name: "Watch on Netflix", url: "https://www.netflix.com/gy/title/83164037", className: "official-button" },
  { name: "Check JioHotstar", url: "https://www.jiohotstar.com/", className: "official-button secondary" }
];
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function episodeCard(ep) {
  const date = ep.releaseDate ? new Date(`${ep.releaseDate}T12:00:00`).toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"}) : "Date to be confirmed";
  return `<article class="episode-card">
    <a href="watch.html?id=${encodeURIComponent(ep.id)}" aria-label="View ${escapeHtml(ep.title)}">
      <div class="episode-art" role="img" aria-label="Roadies episode artwork placeholder">
        <span class="episode-number">EP ${escapeHtml(String(ep.number).padStart(2,"0"))}</span>
        <span class="art-mark">ROAD<span>IES</span></span><span class="art-play" aria-hidden="true">▶</span>
      </div>
      <div class="episode-info"><h3>${escapeHtml(ep.title)}</h3><p>${escapeHtml(date)} · ${escapeHtml(ep.duration || "Duration TBA")}</p>
        <div class="card-bottom"><span>${ep.verified ? "EPISODE GUIDE" : "DETAILS TO VERIFY"}</span><span>VIEW DETAILS <span>↗</span></span></div>
      </div>
    </a>
  </article>`;
}
async function initEpisodes() {
  const grid = document.querySelector("#episode-grid");
  const count = document.querySelector("#episode-count");
  const search = document.querySelector("#episode-search");
  const empty = document.querySelector("#empty-state");
  try {
    const response = await fetch(EPISODES_URL, {cache:"no-store"});
    if (!response.ok) throw new Error("Episode data could not be loaded");
    const data = await response.json();
    const episodes = (data.episodes || []).slice().sort((a,b) => (b.releaseDate || "").localeCompare(a.releaseDate || "") || b.number-a.number);
    const render = () => {
      const term = search.value.trim().toLowerCase();
      const filtered = episodes.filter(ep => `${ep.title} ${ep.description || ""} ${ep.number}`.toLowerCase().includes(term));
      grid.innerHTML = filtered.length ? filtered.map(episodeCard).join("") : "";
      count.textContent = `${filtered.length} ${filtered.length === 1 ? "episode" : "episodes"}`;
      empty.hidden = filtered.length !== 0;
    };
    render(); search.addEventListener("input", render);
  } catch (error) {
    grid.innerHTML = `<div class="loading-card">Episode data couldn't be loaded. Please check that <code>data/episodes.json</code> exists and the site is served over HTTP.</div>`;
    count.textContent = "Unavailable";
  }
}
document.addEventListener("DOMContentLoaded", initEpisodes);
