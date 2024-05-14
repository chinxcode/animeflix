export function adjustNavLayout(menuButton) {
    const navItems = document.querySelectorAll(".nav-item");

    let isMenuOpen = false;
    let head = document.querySelector("header .buttons");
    adjustNav();
    function adjustNav() {
        if (window.innerWidth <= 960) {
            // Add menu button if not already present
            if (!head.contains(menuButton)) {
                head.append(menuButton);
                menuButton.addEventListener("click", function () {
                    isMenuOpen = !isMenuOpen;
                    adjustNav(menuButton);
                });
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
}

export function adjustContentGrid() {
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

export function adjustHeaderLayout() {
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
