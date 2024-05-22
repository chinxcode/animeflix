export async function fetchAnimeDetails(id) {
    try {
        let url = `https://api.jikan.moe/v4/manga/${id}/full`;
        let response = await fetch(url);
        let data = await response.json();

        return data.data;
    } catch (error) {
        console.error("Error fetching anime details:", error);
    }
}

export function displayAnimeDetails(animeData) {
    const animeDetailsContainer = document.querySelector(".anime-details-container");
    animeDetailsContainer.innerHTML = "";

    const animeDetailsSection = document.createElement("div");
    animeDetailsSection.classList.add("anime-details");

    const animePosterContainer = document.createElement("div");
    animePosterContainer.classList.add("anime-poster");

    const animePoster = document.createElement("img");
    animePoster.src = animeData.images.webp.image_url;
    animePoster.alt = animeData.title;

    animePosterContainer.appendChild(animePoster);

    const animePosterData = document.createElement("div");
    animePosterData.classList.add("anime-poster-data");
    animePosterData.innerHTML = `
        <h1>${animeData.title}</h1>
        <p><strong>Rating:</strong> ${animeData.score}</p>
        <p><strong>Rated By:</strong> ${animeData.scored_by}</p>
        <p><strong>Rank:</strong> ${animeData.rank}</p>
        <p><strong>Popularity:</strong> ${animeData.popularity}</p>
        <p><strong>Current Status:</strong> ${animeData.status}</p>
        <p><strong>Members:</strong> ${animeData.members}</p>
        <p><strong>View On <a href="${animeData.url}" target="_blank">MyAnimeList</a></strong></p>
        `;

    animePosterContainer.appendChild(animePosterData);

    const animeInfoContainer = document.createElement("div");
    animeInfoContainer.classList.add("anime-info");

    const animeSynopsis = document.createElement("p");
    animeSynopsis.textContent = animeData.synopsis;

    const animeDetailsInfo = document.createElement("div");
    animeDetailsInfo.classList.add("anime-details-info");

    const airedFrom = new Date(animeData.published.from).toLocaleDateString("en-IN");
    const airedTo = new Date(animeData.published.to).toLocaleDateString("en-IN");

    animeDetailsInfo.innerHTML = `
        <p><strong>Also known as:</strong> ${animeData.title_japanese}</p>
        <p><strong>Type:</strong> ${animeData.type}</p>
        <p><strong>Volumes:</strong> ${animeData.volumes}</p>
        <p><strong>Episodes:</strong> ${animeData.chapters}</p>
        <p><strong>Status:</strong> ${animeData.status}</p>
        <p><strong>Aired:</strong> ${airedFrom} to ${airedTo}</p>
        <p><strong>Producers:</strong> ${animeData.authors
            .map((author) => `<a href="${author.url}" target="_blank">${author.name}</a>`)
            .join(", ")}</p>
        <p><strong>Genres:</strong> ${animeData.genres
            .map((genre) => `<a href="${genre.url}" target="_blank">${genre.name}</a>`)
            .join(", ")}</p>
        <p><strong>Themes:</strong> ${animeData.themes
            .map((theme) => `<a href="${theme.url}" target="_blank">${theme.name}</a>`)
            .join(", ")}</p
        `;

    const animeRelationsContainer = document.createElement("div");
    animeRelationsContainer.classList.add("anime-relations");
    animeRelationsContainer.innerHTML = `
        <h2>Relations:</h2>
        ${animeData.relations
            .map(
                (relation) => `
            <p><strong>${relation.relation}:</strong>
            ${relation.entry.map((entry) => `<a href="#" data-mal-id="${entry.mal_id}" class="relation-link">${entry.name}</a>`).join(", ")}
            </p>
        `
            )
            .join("")}
    `;

    animeInfoContainer.appendChild(animeSynopsis);
    animeInfoContainer.appendChild(animeDetailsInfo);
    animeInfoContainer.appendChild(animeRelationsContainer);

    animeDetailsSection.appendChild(animePosterContainer);
    animeDetailsSection.appendChild(animeInfoContainer);

    animeDetailsContainer.appendChild(animeDetailsSection);

    const relationLinks = document.querySelectorAll(".relation-link");
    relationLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const malId = event.target.dataset.malId;
            fetchAnimeDetails(malId).then((data) => {
                displayAnimeDetails(data);
            });
        });
    });
}
