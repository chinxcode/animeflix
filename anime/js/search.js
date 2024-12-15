export async function fetchTopAnime() {
    let apiUrl = `https://api.jikan.moe/v4/top/anime?filter=bypopularity`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        displayResults(data.data, document.getElementById("mainContent"));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function fetchOngoingAnime() {
    let apiUrl = `https://api.jikan.moe/v4/anime?status=airing`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        displayResults(data.data, document.getElementById("mainContent"));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function fetchUpComingAnime() {
    let apiUrl = `https://api.jikan.moe/v4/anime?status=upcoming&order_by=score&sort=desc`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        displayResults(data.data, document.getElementById("mainContent"));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function fetchMovieResults() {
    let apiUrl = `https://api.jikan.moe/v4/anime?type=movie&order_by=score&sort=desc`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        displayResults(data.data, document.getElementById("mainContent"));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function fetchSearchResults() {
    let searchTerm = document.getElementById("searchInput").value.trim();

    if (searchTerm === "") {
        fetchTopAnime();
        return;
    }

    let apiUrl = `https://api.jikan.moe/v4/anime?q=${searchTerm}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        displayResults(data.data, document.getElementById("mainContent"));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function fetchGenres() {
    let apiUrl = "https://api.jikan.moe/v4/genres/anime?filter=genres&order_by=score&sort=desc";

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        displayGenres(data.data, document.getElementById("genreContent"));
    } catch (error) {
        console.error("Error fetching genres:", error);
    }
}

function displayGenres(genreData, container) {
    container.innerHTML = ""; // Clear previous genre content

    genreData.forEach((genre) => {
        const genreItem = document.createElement("div");
        genreItem.classList.add("genre-item");
        genreItem.innerHTML = `
            <h2>${genre.name}</h2>
            <p>Anime: ${genre.count}</p>
        `;

        genreItem.addEventListener("click", () => {
            fetchAnimeByGenre(genre.mal_id);
            scrollToTop();
        });

        container.appendChild(genreItem);
    });
}

export async function fetchAnimeByGenre(genreId) {
    let apiUrl = `https://api.jikan.moe/v4/anime?genres=${genreId}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        displayResults(data.data, document.getElementById("mainContent"));
    } catch (error) {
        console.error("Error fetching anime data:", error);
    }
}

function displayResults(results, container) {
    container.innerHTML = "";

    if (results.length === 0) {
        const noResultsMessage = document.createElement("div");
        noResultsMessage.classList.add("no-results");
        noResultsMessage.textContent = "No results found.";
        container.appendChild(noResultsMessage);
        return;
    }

    results.forEach((result) => {
        const title = result.title;
        const synopsis = result.synopsis;
        const imageUrl = result.images.webp.image_url;
        const malId = result.mal_id;

        const resultContainer = document.createElement("div");
        resultContainer.classList.add("content-item");
        resultContainer.setAttribute("data-id", malId);

        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = title;
        resultContainer.appendChild(imgElement);

        const resultInfo = document.createElement("div");
        resultInfo.classList.add("content-item-info");

        const titleElement = document.createElement("h3");
        titleElement.textContent = title;
        resultInfo.appendChild(titleElement);

        const synopsisElement = document.createElement("p");
        synopsisElement.textContent = synopsis;
        resultInfo.appendChild(synopsisElement);

        resultContainer.appendChild(resultInfo);

        container.appendChild(resultContainer);
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}
