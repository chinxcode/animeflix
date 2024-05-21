import {
    fetchTopAnime,
    fetchTopManga,
    fetchSearchResults,
    displayResults,
    fetchOngoingAnime,
    fetchMovieResults,
    fetchUpComingAnime,
} from "./search.js";
import { adjustNavLayout, adjustContentGrid, adjustHeaderLayout } from "./responsive.js";
import { openModal, closeModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", function () {
    let timeoutId;
    let mainContent = document.getElementById("mainContent");

    var currentPage = window.location.pathname;

    if (currentPage.endsWith("anime.html")) {
        fetchTopAnime();
    } else if (currentPage.endsWith("manga.html")) {
        fetchTopManga();
    } else if (currentPage.endsWith("ongoing.html")) {
        fetchOngoingAnime();
    } else if (currentPage.endsWith("movie.html")) {
        fetchMovieResults();
    } else if (currentPage.endsWith("upcoming.html")) {
        fetchUpComingAnime();
    } else {
        mainContent.innerHTML = "PAGE NOT FOUND";
    }

    // document.getElementById("topAnime").addEventListener("click", fetchTopAnime);
    // document.getElementById("topManga").addEventListener("click", fetchTopManga);

    document.getElementById("searchInput").addEventListener("input", function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(fetchSearchResults, 500);
    });

    const menuButton = document.createElement("button");
    menuButton.classList.add("menu-button");
    menuButton.textContent = "Menu";
    adjustNavLayout(menuButton);
    window.addEventListener("resize", function () {
        adjustContentGrid();
        adjustHeaderLayout();
        adjustNavLayout(menuButton);
    });

    // Add event listener for opening the modal
    mainContent.addEventListener("click", function (event) {
        if (event.target.closest(".content-item")) {
            const resultId = event.target.closest(".content-item").getAttribute("data-id");
            openModal(resultId);
        }
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("modal")) {
            closeModal();
        }
    });
});