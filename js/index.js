// navgation bar toggle for mobile
let toggleBtn = document.querySelector(".menu-btn");
let navMenu = document.querySelector(".nav");
let aTag = document.querySelectorAll(".nav a");


if (toggleBtn) {
    // menu button click
    let arExp;
    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent window click
        arExp = toggleBtn.getAttribute("aria-expanded");
        console.log(arExp);
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

    aTag.forEach((a) => {
        a.addEventListener("click", () => {
            navCloss();
        })
    })

}