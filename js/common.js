// ================navgation bar toggle for mobile================
let toggleBtn = document.querySelector(".menu-btn");
let navMenu = document.querySelector(".nav");
let aTag = document.querySelectorAll(".nav a");
let blackOverlay = document.querySelector(".black-overlay");

if (toggleBtn) {
    // menu button click
    let arExp;
    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent window click

        arExp = toggleBtn.getAttribute("aria-expanded");
        if (arExp === "false") {
            toggleBtn.setAttribute('aria-expanded', String("true"));
            arExp = "true";

            navMenu.classList.add("display");
            navMenu.classList.remove("ani-close");
            navMenu.classList.add("ani-open");

            blackOverlay.classList.remove("opacity-remove");
            blackOverlay.classList.add("display-block");
            blackOverlay.classList.add("opacity-add");

        } else {
            navCloss();
        }
    });

    // the below is used to close mobile nav after animation
    navMenu.addEventListener("animationend", (e) => {
        if (e.animationName === "slide-right-normal") {
            navMenu.classList.remove("display");
        }
    });

    blackOverlay.addEventListener("animationend", (e) => {
        if (e.animationName === "opacity-overlay-remove") {
            blackOverlay.classList.remove("display-block");
        }
    });

    //function to close navbar smoothly wiht animation
    function navCloss() {
        toggleBtn.setAttribute('aria-expanded', String("false"));
        arExp = "false";

        navMenu.classList.remove("ani-open");
        navMenu.classList.add("ani-close");

        blackOverlay.classList.remove("opacity-add");
        blackOverlay.classList.add("opacity-remove");
    }

    // hide mobile navbar when resized
    window.addEventListener("resize", () => {
        if (arExp == "true" && window.innerWidth > 1050) {
            navCloss();
        }
    });

    //used to close nav bar when clicked on outside of navbar
    window.addEventListener("click", (e) => {
        if (e.target.tagName != "NAV" && navMenu.classList.contains('display')) {
            navCloss();
        }
    });

    //to close the navbar when a link is clicked (mobile or tablet)
    aTag.forEach((a) => {
        a.addEventListener("click", () => {
            navCloss();
        })
    });
}