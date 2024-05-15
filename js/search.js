export async function fetchTopAnime() {
    let apiUrl = `https://api.jikan.moe/v4/top/anime`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        displayResults(data.data, document.getElementById("mainContent"));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function fetchTopManga() {
    let apiUrl = `https://api.jikan.moe/v4/top/manga`;

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

export function displayResults(results, container) {
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
