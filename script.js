document.addEventListener("DOMContentLoaded", function () {
    let timeoutId;
    let mainContent = document.getElementById("mainContent");
    fetchTopAnime();

    document.getElementById("topAnime").addEventListener("click", function () {
        fetchTopAnime();
    });
    document.getElementById("topManga").addEventListener("click", function () {
        fetchTopManga();
    });

    document.getElementById("searchInput").addEventListener("input", function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(fetchSearchResults, 500);
    });

    //Fetch Top Anime
    async function fetchTopAnime() {
        let apiUrl = `https://api.jikan.moe/v4/top/anime`;

        try {
            let response = await fetch(apiUrl);
            let data = await response.json();
            displayResults(data.data, mainContent);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    //Fetch Top Manga
    async function fetchTopManga() {
        let apiUrl = `https://api.jikan.moe/v4/top/manga`;

        try {
            let response = await fetch(apiUrl);
            let data = await response.json();
            displayResults(data.data, mainContent);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    //Fetch Search Results
    async function fetchSearchResults() {
        let searchTerm = document.getElementById("searchInput").value.trim();

        if (searchTerm === "") {
            fetchTopAnime();
            return;
        }

        let apiUrl = `https://api.jikan.moe/v4/anime?q=${searchTerm}`;

        try {
            let response = await fetch(apiUrl);
            let data = await response.json();
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

    //Responsive
    const navItems = document.querySelectorAll(".nav-item");
    const menuButton = document.createElement("button");
    menuButton.classList.add("menu-button");
    menuButton.textContent = "Menu";

    let isMenuOpen = false;
    menuButton.addEventListener("click", function () {
        isMenuOpen = !isMenuOpen;
        adjustNavLayout();
    });

    // Check screen size on load and adjust nav accordingly
    adjustNavLayout();

    window.addEventListener("resize", function () {
        adjustContentGrid();
        adjustHeaderLayout();
        adjustNavLayout();
    });

    function adjustContentGrid() {
        const mainContent = document.getElementById("mainContent");
        const contentItems = mainContent.getElementsByClassName("content-item");

        if (window.innerWidth <= 960) {
            for (let i = 0; i < contentItems.length; i++) {
                contentItems[i].style.maxWidth = "100%";
            }
        } else {
            for (let i = 0; i < contentItems.length; i++) {
                contentItems[i].style.maxWidth = "none";
            }
        }
    }

    function adjustHeaderLayout() {
        const searchContainer = document.querySelector(".search-container");
        const buttons = document.querySelector(".buttons");

        if (window.innerWidth <= 960) {
            searchContainer.style.width = "100%";
            buttons.style.width = "100%";
            buttons.style.justifyContent = "center";
            buttons.style.marginBottom = "1rem";
        } else {
            searchContainer.style.width = "50%";
            buttons.style.width = "20%";
            buttons.style.justifyContent = "space-around";
            buttons.style.marginBottom = "0";
        }
    }

    function adjustNavLayout() {
        let head = document.querySelector("header .buttons");

        if (window.innerWidth <= 960) {
            // Add menu button if not already present
            if (!head.contains(menuButton)) {
                head.append(menuButton);
            }

            // Toggle nav items visibility based on menu state
            navItems.forEach((item) => {
                item.style.display = isMenuOpen ? "block" : "none";
            });
        } else {
            // Remove menu button if present
            if (head.contains(menuButton)) {
                head.removeChild(menuButton);
            }

            // Show all nav items
            navItems.forEach((item) => {
                item.style.display = "block";
            });
        }
    }
});
