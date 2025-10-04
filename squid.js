// Mock Data (Simulating a Database of Squid Game content)
const ALL_CONTENT = [
  {
    id: 1,
    title: "The Doll: Red Light, Green Light",
    genre: "Survival",
    rating: 9.5,
    synopsis: "The terrifying first game. Focus on code optimization!",
    status: "Survivor",
  },
  {
    id: 2,
    title: "The Bridge: Glass Stepping",
    genre: "Thriller",
    rating: 8.8,
    synopsis:
      "A high-stakes choice between execution and a major win. Logical branching required.",
    status: "Eliminated",
  },
  {
    id: 3,
    title: "The Marbles: Ultimate Betrayal",
    genre: "Drama",
    rating: 9.8,
    synopsis:
      "A lesson in resource management and unexpected partnerships. Focus on data structures.",
    status: "Survivor",
  },
  {
    id: 4,
    title: "The Riot: Chaos Theory",
    genre: "Thriller",
    rating: 7.2,
    synopsis:
      "When the rules fail, the true nature of the system is revealed. Error handling is key.",
    status: "Eliminated",
  },
  {
    id: 5,
    title: "The Tug of War: Team Power",
    genre: "Survival",
    rating: 8.5,
    synopsis:
      "Teamwork makes the dream work (or fail). Lesson on collaborative coding.",
    status: "Survivor",
  },
 
];

const CONTENT_PER_PAGE = 3; 

let currentPage = 1;
let currentContent = [...ALL_CONTENT]; 


const grid = document.getElementById("content-grid");
const genreFilter = document.getElementById("genre-filter");
const sortFilter = document.getElementById("sort-filter");
const modal = document.getElementById("info-modal");
const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");
const addWatchlistBtn = document.getElementById("add-watchlist-btn");


let watchlist = JSON.parse(localStorage.getItem("squid-watchlist")) || [];

const updateWatchlist = (contentId, isAdding) => {
  if (isAdding) {
    if (!watchlist.includes(contentId)) watchlist.push(contentId);
  } else {
    watchlist = watchlist.filter((id) => id !== contentId);
  }
  localStorage.setItem("squid-watchlist", JSON.stringify(watchlist));
 
  const btnText = watchlist.includes(contentId)
    ? "Remove from List"
    : "Add to Survival List";
  addWatchlistBtn.textContent = btnText;
};


const renderContent = (contentArray) => {
  grid.innerHTML = ""; 
  const start = (currentPage - 1) * CONTENT_PER_PAGE;
  const end = start + CONTENT_PER_PAGE;
  const paginatedContent = contentArray.slice(start, end);

  if (paginatedContent.length === 0) {
    grid.innerHTML =
      '<p style="text-align: center; width: 100%;">No content found for these filters. **Game Over!**</p>';
  }

  paginatedContent.forEach((content) => {
    const card = document.createElement("div");
    card.className = "content-card";
    card.setAttribute("data-id", content.id);
    card.innerHTML = `
            <div class="card-info">
                <h3>${content.title}</h3>
                <p>Genre: ${content.genre}</p>
                <p>Rating: ${content.rating} / 10</p>
            </div>
        `;
   
    card.addEventListener("click", () => showModal(content.id));
    grid.appendChild(card);
  });

  
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = end >= contentArray.length;
  pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(
    contentArray.length / CONTENT_PER_PAGE
  )}`;
};


const showModal = (contentId) => {
  const content = ALL_CONTENT.find((c) => c.id === contentId);
  if (!content) return;

  document.getElementById("modal-title").textContent = content.title;
  document.getElementById("modal-synopsis").textContent = content.synopsis;
  document.getElementById("modal-rating").textContent = content.rating;
  document.getElementById("modal-status").textContent = content.status;

  addWatchlistBtn.onclick = () => {
    const isAdding = !watchlist.includes(contentId);
    updateWatchlist(contentId, isAdding);
  };
  const btnText = watchlist.includes(contentId)
    ? "Remove from List"
    : "Add to Survival List";
  addWatchlistBtn.textContent = btnText;

  modal.style.display = "flex"; 
};

const populateGenreFilter = () => {
  const genres = [...new Set(ALL_CONTENT.map((c) => c.genre))];
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
};

const applyFiltersAndSort = () => {
  const selectedGenre = genreFilter.value;
  let filtered = ALL_CONTENT;

  if (selectedGenre !== "all") {
    filtered = ALL_CONTENT.filter((c) => c.genre === selectedGenre);
  }

  const sortOrder = sortFilter.value;
  if (sortOrder === "high") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortOrder === "low") {
    filtered.sort((a, b) => a.rating - b.rating);
  }

  currentContent = filtered;
  currentPage = 1; 
  renderContent(currentContent);
};

genreFilter.addEventListener("change", applyFiltersAndSort);
sortFilter.addEventListener("change", applyFiltersAndSort);

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderContent(currentContent);
  }
});
nextBtn.addEventListener("click", () => {
  if (currentPage * CONTENT_PER_PAGE < currentContent.length) {
    currentPage++;
    renderContent(currentContent);
  }
});

populateGenreFilter();
renderContent(ALL_CONTENT);

closeBtn.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
