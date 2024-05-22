import { fetchAnimeDetails, displayAnimeDetails } from "./utils.js";

export function openModal(id) {
    const modal = document.getElementById("modal");
    modal.style.display = "block";

    fetchAnimeDetails(id)
        .then((animeData) => {
            displayAnimeDetails(animeData);
        })
        .catch((error) => {
            console.error("Error fetching anime details:", error);
        });
}

export function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Close modal when the close button is clicked
const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", closeModal);

// Close modal when the user clicks outside the modal content
window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
});
