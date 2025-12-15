//add number to terms and condition
const numSpan = document.querySelectorAll(".term-num");
const conditions = document.querySelectorAll(".condition");
let conditionNum = 0;

if (conditions) {
    conditions.forEach((condition) => {
        let numSpan = condition.querySelectorAll(".term-num");
        conditionNum += 1;
        numSpan.forEach((numSpan) => {
            numSpan.textContent = conditionNum;
        });
    });
}

//open popup menu
const popupContainer = document.querySelector(".about-popup");
const innerPopupContainer = document.querySelector(".about-popup-container");
const iframe = document.querySelector(".about-popup-container iframe");
const closeBtn = document.querySelector(".about-popup-close");
const sosImg = document.querySelector(".sos-card");

if (sosImg) {
    const src = iframe.getAttribute("src") || null;
    sosImg.addEventListener("click", () => {
        openPopup(src);
    });
}

function openPopup(link) {
    iframe.src = link;
    innerPopupContainer.classList.remove("ani-popup-remove");
    popupContainer.classList.remove("ani-overlay-remove");
    popupContainer.classList.add("popup-display");
    popupContainer.classList.add("ani-overlay-show");
    innerPopupContainer.classList.add("ani-popup-show");
    closeBtn.addEventListener("click", closePopup);
}

function closePopup() {
    if (!popupContainer) return;
    innerPopupContainer.classList.remove("ani-popup-show");
    innerPopupContainer.classList.add("ani-popup-remove");
    iframe.src = "";
    popupContainer.classList.remove("ani-overlay-show");
    popupContainer.classList.add("ani-overlay-remove");
    popupContainer.addEventListener("animationend", (e) => {
        if (e.animationName === "overlay-remove") {
            popupContainer.classList.remove("popup-display");
        }
    });
}