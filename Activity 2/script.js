const grid = document.getElementById("albumGrid");
const loading = document.getElementById("loadingState");
const error = document.getElementById("errorState");
const empty = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
let albums = [];
let albumModal;

document.addEventListener("DOMContentLoaded", async () => {
  albumModal = new bootstrap.Modal(document.getElementById("albumModal"));
  try {
    const response = await fetch("data/albums.json");
    if (!response.ok) throw new Error("Could not fetch albums.json");
    const data = await response.json();
    albums = data.albums || [];
    document.getElementById("albumCount").textContent = String(albums.length).padStart(2, "0");
    document.querySelector(".intro-right").textContent = `${albums.length} albums · 5 songs each · endless replay value`;
    renderAlbums(albums);
  } catch (err) {
    console.error(err);
    error.classList.remove("d-none");
  } finally {
    loading.classList.add("d-none");
  }
});

function renderAlbums(items) {
  grid.innerHTML = "";
  empty.classList.toggle("d-none", items.length > 0);
  items.forEach((album) => {
    const originalIndex = albums.findIndex((item) => item.id === album.id);
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";
    col.innerHTML = `
      <article class="album-card" style="--album-color:${safeColor(album.color)}">
        <button type="button" aria-label="Open ${escapeHTML(album.title)} top five">
          <div class="cover-wrap">
            <img src="${safeURL(album.cover)}" alt="Placeholder cover for ${escapeHTML(album.title)}" loading="lazy">
            <span class="cover-number">${String(originalIndex + 1).padStart(2, "0")} / ${String(albums.length).padStart(2, "0")}</span>
            <span class="cover-open"><i class="bi bi-arrow-up-right"></i></span>
          </div>
          <div class="album-meta"><span>${escapeHTML(album.era)}</span><span>${Number(album.year) || ""}</span></div>
          <h3 class="album-title">${escapeHTML(album.title)}</h3>
          <p class="album-description">${escapeHTML(album.description)}</p>
          <div class="card-rule"></div>
        </button>
      </article>`;
    col.querySelector("button").addEventListener("click", () => openAlbum(album));
    grid.appendChild(col);
  });
}

function openAlbum(album) {
  document.getElementById("modalCover").src = safeURL(album.cover);
  document.getElementById("modalCover").alt = `Placeholder cover for ${album.title}`;
  document.getElementById("modalEra").textContent = album.era || "THE ERA";
  document.getElementById("modalYear").textContent = `${album.year || ""} / TRACKLIST`;
  document.getElementById("modalAlbumTitle").textContent = album.title;
  document.getElementById("modalDescription").textContent = album.description || "";
  const list = document.getElementById("songList");
  list.innerHTML = "";
  (album.songs || []).slice(0, 5).forEach((song) => {
    const li = document.createElement("li");
    li.textContent = song;
    list.appendChild(li);
  });
  albumModal.show();
}

function filterAlbums() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = albums.filter((album) =>
    [album.title, album.era, album.description, ...(album.songs || [])]
      .some((value) => String(value).toLowerCase().includes(query))
  );
  renderAlbums(filtered);
}
searchInput.addEventListener("input", filterAlbums);
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  filterAlbums();
  searchInput.focus();
});

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}
function safeURL(value) {
  try {
    const url = new URL(String(value), window.location.href);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
}
function safeColor(value) {
  return /^#[0-9a-f]{3,8}$/i.test(String(value)) ? value : "#d7c7b4";
}
