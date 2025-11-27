// navgation bar toggle for mobile
let toggleBtn = document.querySelector(".menu-btn");
let navMenu = document.querySelector(".nav");


if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        let arExp = toggleBtn.getAttribute("aria-expanded");
        console.log(arExp);
        if (arExp === "false") {
            toggleBtn.setAttribute('aria-expanded', String("true"));
            navMenu.style.display = "inline-flex";
            navMenu.classList.remove("ani-close");
            navMenu.classList.add("ani-open");
            toggleBtn.textContent = "✖";
        } else {
            toggleBtn.setAttribute('aria-expanded', String("false"));
            navMenu.classList.remove("ani-open");
            navMenu.classList.add("ani-close");
            toggleBtn.textContent = "☰";
            navMenu.addEventListener("animationend", (e) => {
                if (e.animationName === "slide-right-normal") {
                    navMenu.style.display = "none";
                    
                }
            });
        }
    });
}