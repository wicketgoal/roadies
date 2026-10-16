const PROVIDERS = [
  {name:"Watch on Netflix",url:"https://www.netflix.com/gy/title/83164037",className:"official-button"},
  {name:"Check JioHotstar",url:"https://www.jiohotstar.com/",className:"official-button secondary"}
];
const esc = s => String(s ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function formatDate(s){if(!s)return "Date TBA";const d=new Date(`${s}T12:00:00`);return Number.isNaN(d.getTime())?"Date TBA":d.toLocaleDateString(undefined,{day:"numeric",month:"long",year:"numeric"});}
async function initWatch(){
  const params=new URLSearchParams(location.search), id=params.get("id");
  try{
    const response=await fetch("data/episodes.json",{cache:"no-store"});if(!response.ok)throw new Error("data");
    const data=await response.json(), episodes=data.episodes||[];
    const ep=episodes.find(e=>e.id===id)||episodes[0];
    if(!ep)throw new Error("empty");
    document.title=`${ep.title} — ROADIES REBIRTH`;
    document.querySelector("#episode-title").textContent=ep.title;
    document.querySelector("#episode-date").textContent=formatDate(ep.releaseDate);
    document.querySelector("#episode-description").textContent=ep.description||"Episode synopsis has not been added yet. Use the official platform links below to check whether this episode is available in your region.";
    const links=document.querySelector("#official-links");
    const providers=(ep.officialLinks&&ep.officialLinks.length)?ep.officialLinks:PROVIDERS;
    links.innerHTML=providers.map(p=>`<a class="${esc(p.className||"official-button")}" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(p.name)} ↗</a>`).join("");
    const more=document.querySelector("#more-episodes");
    more.innerHTML=episodes.filter(e=>e.id!==ep.id).sort((a,b)=>(b.releaseDate||"").localeCompare(a.releaseDate||"")||b.number-a.number).map(e=>`<a class="more-item" href="watch.html?id=${encodeURIComponent(e.id)}"><span class="mini-art">R<span style="color:#f12b45">.</span></span><span><h4>${esc(e.title)}</h4><p>${esc(formatDate(e.releaseDate))}</p></span></a>`).join("")||'<p class="availability-note">More episode details will appear here when added to the episode data file.</p>';
  }catch(e){
    document.querySelector("#episode-title").textContent="Episode details unavailable";
    document.querySelector("#episode-description").textContent="The episode data could not be loaded. Check that data/episodes.json exists and open the site through a web server.";
    document.querySelector("#official-links").innerHTML=PROVIDERS.map(p=>`<a class="${p.className}" href="${p.url}" target="_blank" rel="noopener noreferrer">${p.name} ↗</a>`).join("");
  }
}
document.addEventListener("DOMContentLoaded",initWatch);
