export async function fetchAnimeDetails(id) {
    try {
        let url = `https://api.jikan.moe/v4/anime/${id}/full`;
        let response = await fetch(url);
        let data = await response.json();

        return data.data;
    } catch (error) {
        console.error("Error fetching anime details:", error);
    }
}

export function displayAnimeDetails(animeData) {
    const animeDetailsContainer = document.querySelector(".anime-details-container");
    animeDetailsContainer.innerHTML = ""; // Clear previous details

    // Create the main anime details section
    const animeDetailsSection = document.createElement("div");
    animeDetailsSection.classList.add("anime-details");

    const animePosterContainer = document.createElement("div");
    animePosterContainer.classList.add("anime-poster");

    const animePoster = document.createElement("img");
    animePoster.src = animeData.images.webp.image_url;
    animePoster.alt = animeData.title;

    animePosterContainer.appendChild(animePoster);

    const animeInfoContainer = document.createElement("div");
    animeInfoContainer.classList.add("anime-info");

    const animeTitle = document.createElement("h1");
    animeTitle.textContent = animeData.title;

    const animeSynopsis = document.createElement("p");
    animeSynopsis.textContent = animeData.synopsis;

    const animeDetailsInfo = document.createElement("div");
    animeDetailsInfo.classList.add("anime-details-info");

    animeDetailsInfo.innerHTML = `
        <p><strong>Also known as:</strong> ${animeData.title_japanese}</p>
        <p><strong>Type:</strong> ${animeData.type}</p>
        <p><strong>Episodes:</strong> ${animeData.episodes}</p>
        <p><strong>Status:</strong> ${animeData.status}</p>
        <p><strong>Aired:</strong> ${animeData.aired.from} to ${animeData.aired.to}</p>
        <p><strong>Premiered:</strong> ${animeData.season} ${animeData.year}</p>
        <p><strong>Broadcast:</strong> ${animeData.broadcast.day} at ${animeData.broadcast.time} (${animeData.broadcast.timezone})</p>
        <p><strong>Producers:</strong> ${animeData.producers.map((producer) => producer.name).join(", ")}</p>
        <p><strong>Studios:</strong> ${animeData.studios.map((studio) => studio.name).join(", ")}</p>
        <p><strong>Source:</strong> ${animeData.source}</p>
        <p><strong>Genres:</strong> ${animeData.genres.map((genre) => genre.name).join(", ")}</p>
        <p><strong>Themes:</strong> ${animeData.themes.map((theme) => theme.name).join(", ")}</p>
        <p><strong>Duration:</strong> ${animeData.duration}</p>
        <p><strong>Rating:</strong> ${animeData.rating}</p>
        `;
    animeInfoContainer.appendChild(animeTitle);
    animeInfoContainer.appendChild(animeSynopsis);
    animeInfoContainer.appendChild(animeDetailsInfo);

    animeDetailsSection.appendChild(animePosterContainer);
    animeDetailsSection.appendChild(animeInfoContainer);

    animeDetailsContainer.appendChild(animeDetailsSection);
}
