document.addEventListener("DOMContentLoaded", function () {
    let timeoutId;

    document.getElementById("searchInput").addEventListener("input", function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(fetchResults, 500);
    });

    async function fetchResults() {
        const searchTerm = document.getElementById("searchInput").value.trim();
        const mainContent = document.getElementById("mainContent");

        if (searchTerm === "") {
            mainContent.innerHTML = ""; // Clear main content
            return;
        }

        const apiUrl = `https://api.jikan.moe/v4/anime?q=${searchTerm}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data.data);
            displayResults(data.data, mainContent);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function displayResults(results, container) {
        container.innerHTML = ""; // Clear previous results

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

            const resultButtons = document.createElement("div");
            resultButtons.classList.add("result-buttons");

            const detailsButton = document.createElement("button");
            detailsButton.classList.add("details-button");
            detailsButton.textContent = "View Details";
            detailsButton.addEventListener("click", function () {
                window.open(`https://myanimelist.net/anime/${malId}`, "_blank");
            });
            resultButtons.appendChild(detailsButton);

            // const watchButton = document.createElement("button");
            // watchButton.classList.add("details-button");
            // watchButton.textContent = "Watch Now";
            // watchButton.addEventListener("click", function () {
            //     // Open the page where users can watch the anime
            //     // Replace 'https://example.com/watch/' with the actual URL
            //     window.open(`https://example.com/watch/${malId}`, "_blank");
            // });
            // resultButtons.appendChild(watchButton);

            resultInfo.appendChild(resultButtons);
            resultContainer.appendChild(resultInfo);
            container.appendChild(resultContainer);
        });
    }
});
