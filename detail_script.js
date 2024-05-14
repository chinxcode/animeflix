document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const animeDetailsContainer = document.querySelector(".anime-details-container");

    fetchAnimeDetails();

    async function fetchAnimeDetails() {
        try {
            let url = `https://api.jikan.moe/v4/anime/${id}/full`;
            let response = await fetch(url);
            let data = await response.json();

            displayAnimeDetails(data.data);
            displayRelatedAnime(data.data.relations);
            displayStreamingLinks(data.data.streaming);
        } catch (error) {
            console.error("Error fetching anime details:", error);
        }
    }

    function displayAnimeDetails(animeData) {
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

    function displayRelatedAnime(relatedAnime) {
        const relatedAnimeContainer = document.createElement("div");
        relatedAnimeContainer.classList.add("related-anime");

        const relatedAnimeTitle = document.createElement("h2");
        relatedAnimeTitle.textContent = "Relations";

        relatedAnimeContainer.appendChild(relatedAnimeTitle);

        const relatedAnimeGrid = document.createElement("div");
        relatedAnimeGrid.classList.add("content-grid");

        relatedAnime.forEach((relation) => {
            relation.entry.forEach((entry) => {
                const relatedAnimeItem = document.createElement("div");
                relatedAnimeItem.classList.add("content-item");

                const relatedAnimeImg = document.createElement("img");
                relatedAnimeImg.src = entry.images.webp.image_url;
                relatedAnimeImg.alt = entry.title;

                const relatedAnimeInfo = document.createElement("div");
                relatedAnimeInfo.classList.add("content-item-info");

                const relatedAnimeTitle = document.createElement("h3");
                relatedAnimeTitle.textContent = entry.title;

                relatedAnimeInfo.appendChild(relatedAnimeTitle);
                relatedAnimeItem.appendChild(relatedAnimeImg);
                relatedAnimeItem.appendChild(relatedAnimeInfo);
                relatedAnimeGrid.appendChild(relatedAnimeItem);
            });
        });

        relatedAnimeContainer.appendChild(relatedAnimeGrid);
        animeDetailsContainer.appendChild(relatedAnimeContainer);
    }

    function displayStreamingLinks(streamingLinks) {
        const streamingContainer = document.createElement("div");
        streamingContainer.classList.add("streaming-links");

        const streamingTitle = document.createElement("h2");
        streamingTitle.textContent = "Watch Now";

        streamingContainer.appendChild(streamingTitle);

        streamingLinks.forEach((link) => {
            const streamingItem = document.createElement("a");
            streamingItem.href = link.url;
            streamingItem.target = "_blank";
            streamingItem.textContent = `Watch on ${link.name}`;
            streamingItem.classList.add("streaming-link");
            streamingContainer.appendChild(streamingItem);
        });

        animeDetailsContainer.appendChild(streamingContainer);
    }
});
