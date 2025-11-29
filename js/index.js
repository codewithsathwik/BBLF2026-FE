// ================navgation bar toggle for mobile================
let toggleBtn = document.querySelector(".menu-btn");
let navMenu = document.querySelector(".nav");
let aTag = document.querySelectorAll(".nav a");


if (toggleBtn) {
    // menu button click
    let arExp;
    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent window click
        arExp = toggleBtn.getAttribute("aria-expanded");
        // console.log(arExp);
        if (arExp === "false") {
            toggleBtn.setAttribute('aria-expanded', String("true"));
            navMenu.classList.add("display");
            navMenu.classList.remove("ani-close");
            navMenu.classList.add("ani-open");
        } else {
            navCloss();
        }
    });

    // the below is used to clode mobile nav after animation
    navMenu.addEventListener("animationend", (e) => {
        if (e.animationName === "slide-right-normal") {
            navMenu.classList.remove("display");
        }
    });

    //function to close navbar smoothly wiht animation
    function navCloss() {
        toggleBtn.setAttribute('aria-expanded', String("false"));
        navMenu.classList.remove("ani-open");
        navMenu.classList.add("ani-close");
    }

    // hide mode navbar when resized
    window.addEventListener("resize", () => {
        if (arExp == "true" && window.innerWidth < 1050) {
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


// ================timer for the event================

const eventDate = new Date("2026-08-06 GMT+05:30").getTime(); // IN YYYY-MM-DD and time zone for corrrect date
const d = document.getElementById("d");
const h = document.getElementById("h");
const m = document.getElementById("m");
const s = document.getElementById("s");

countdown();
setInterval(countdown, 1000);

function countdown() {
    if (!d || !h || !m || !s)
        return;
    const now = new Date().getTime();
    const distance = eventDate - now;
    if (distance > 0) {
        d.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
        h.textContent = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        m.textContent = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
        s.textContent = Math.floor(distance % (1000 * 60) / (1000));
    }
    else {
        d.textContent = "0";
        h.textContent = "0";
        m.textContent = "0";
        s.textContent = "0";
    }
}


// ================live-embed popup's================
let popupContainer = document.getElementById("live-embeded-popup");
let innerPopupContainer = document.querySelector(".popup-container");
const iframe = document.querySelector(".popup-container iframe");
const liveGrid = document.querySelectorAll(".live-card");
const closeBtn = document.querySelector(".popup-close");

liveGrid.forEach((card) => {
    card.addEventListener("click", () => {
        let embededURL = card.getAttribute("data-embed-url");
        openPopup(embededURL);
    })
});

closeBtn.addEventListener("click", () => closePopup());

function openPopup(link) {
    iframe.src = link;
    innerPopupContainer.classList.remove("ani-popup-remove");
    popupContainer.classList.remove("ani-overlay-remove");
    
    popupContainer.classList.add("popup-display");
    
    popupContainer.classList.add("ani-overlay-show");
    innerPopupContainer.classList.add("ani-popup-show");
}

function closePopup() {
    if (!popupContainer) return;

    innerPopupContainer.classList.remove("ani-popup-show");
    innerPopupContainer.classList.add("ani-popup-remove");

    iframe.src = "";

    popupContainer.classList.remove("ani-overlay-show");
    popupContainer.classList.add("ani-overlay-remove");

    //to remove the popup
    popupContainer.addEventListener("animationend", (e) => {
        if (e.animationName === "overlay-remove") {
            popupContainer.classList.remove("popup-display");
        }
    })

}
