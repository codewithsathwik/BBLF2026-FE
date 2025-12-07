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

    // the below is used to close mobile nav after animation
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
    });
}


// counter up section logic
// const counters = document.querySelectorAll(".counter .target");
// const speed = 500;

// counters.forEach((counter) => {
//     counter.textContent = "0";

//     function updateCounter(){
//         const targetValue = counter.getAttribute("data-target");
//         const target = Number(targetValue);
//         const c = Math.ceil(Number(counter.textContent));
//         const increment = Math.ceil(target/speed);
//         if(c < target){
//             counter.textContent = `${c + increment}`;
//             setTimeout(updateCounter, 1);
//         }else{
//             counter.textContent = target.toLocaleString();
//         }
//     }
//     updateCounter();
// });

const counters = document.querySelectorAll(".counter .target");
const counterContainer = document.querySelector(".counter-up")
const duration = 2000; // ms

function animate(counter) {
    const targetValue = Number(counter.getAttribute("data-target"));
    let startTime = null;

    function updateCounter(timestamp) {
        if (!startTime)
            startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * targetValue);
        counter.textContent = current.toLocaleString();
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    requestAnimationFrame(updateCounter);
}


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            counters.forEach(animate);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

observer.observe(counterContainer);


//================speaker section navbar swaping================
const buttons = document.querySelectorAll(".speaker-btn");
const allSection = document.querySelectorAll(".speaker-acc");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        swapingSections(button);
    });
});

function swapingSections(button) {
    if (button.classList.contains("active")) {
        const targetId = button.getAttribute("data-target");
        allSection.forEach(section => {
            let sectionId = section.id;
            if (sectionId === targetId) {
                allSection.forEach((sec) => {
                    sec.classList.remove("speakers-show");
                    sec.classList.remove("slide-speaker");
                });
                section.classList.add("speakers-show");
                section.classList.add("slide-speaker");
            }
        });
    }
}

// ================to arrangthe the icons in the performance Grid================
const performanceCard = document.querySelectorAll(".performance");
let i = 1, n = performanceCard.length;

performanceCard.forEach(card => {
    if (n % i == 0)
        card.classList.add("performance-st");
    else
        card.classList.add("performance-rev");
    i++;
});


// ================schedule section buttons state change================
const scBtn = document.querySelectorAll(".event-btn");
const pdfFrame = document.querySelector("#schedule-pdf iframe");
const pdfContainer = document.getElementById("schedule-pdf");

scBtn.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        scBtn.forEach(btn => btn.classList.remove("active-btn"));
        button.classList.add("active-btn");
        const path = button.getAttribute("data-target");
        openPDF(path);
    });
});

// function openPDF(path) {
//     const config = "#toolbar=0&navpanes=0&scrollbar=0";
//     pdfFrame.setAttribute("src", "");
//     const link = `${path + config}`;
//     pdfFrame.setAttribute("src", link);
// }

function openPDF(path) {
    const config = "#toolbar=0&navpanes=0&scrollbar=0";
    pdfContainer.classList.add("loading");
    pdfFrame.setAttribute("src", `${path}${config}`);
    pdfFrame.onload = () => {
        setTimeout(removeLoader, 1500);
    };

    function removeLoader() {
        pdfContainer.classList.remove("loading");
    }
}


// ================sliders================

const playCards = document.querySelectorAll(".play-card");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const playlistFrame = document.querySelector(".video-iframe iframe");
const allCards = document.querySelector(".sliders")


const firstCard = playCards[0];
const totalWidth = firstCard.parentElement.scrollWidth;
const visibleWidth = firstCard.parentElement.clientWidth;
const maxOffset = totalWidth - visibleWidth;

let offset = 0;

const defaultSize = 250; // in px 

playCards.forEach(card => {
    card.addEventListener("click", () => {
        playCards.forEach(crd => crd.classList.remove("active-slide"));
        card.classList.add("active-slide");
        let link = card.getAttribute("data-target");
        changePlaylistSrc(link);
    })
});

function changePlaylistSrc(link) {
    playlistFrame.setAttribute("src", link);
}

function applyTransform() {
    playCards.forEach(card => {
        card.style.transform = `translateX(-${offset}px)`;
    });
}

nextBtn.addEventListener("click", () => {
    offset = Math.min(offset + defaultSize, maxOffset);
    applyTransform();
});

prevBtn.addEventListener("click", () => {
    offset = Math.max(offset - defaultSize, 0);
    applyTransform();
});


// function getYouTubeTitle(videoUrl) {
//     const videoId = videoUrl.split('/embed/')[1].split('?')[0];
//     const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

//     fetch(oembedUrl)
//         .then(response => response.json())
//         .then(data => {
//             return data.title;
//         })
//         .catch(error => console.error('Error:', error));
// }

// console.log(getYouTubeTitle("https://www.youtube.com/embed/GenHXHOSUqc"));


const cards = document.querySelectorAll('.test-card');
const cardsContainer = document.querySelector('.test-cards');
const slideButtonContainer = document.querySelector('.test-slide-btn');
let currentIndex = 0;
let autoSlideInterval;
let button = [];

// Generate buttons dynamically based on number of cards
function generateButtons() {
    slideButtonContainer.innerHTML = ''; // Clear existing buttons
    cards.forEach((card, index) => {
        const btn = document.createElement('div');
        btn.classList.add('test-btn');
        btn.setAttribute('data-index', index);
        if (index === 0) {
            btn.classList.add('active-test');
        }
        slideButtonContainer.appendChild(btn);
    });
    button = document.querySelectorAll('.test-btn');
    attachButtonEvents();
}

function slideToIndex(index) {
    // Calculate the translation considering both card width and gap
    const cardWidth = cards[index].offsetWidth;
    const gap = 55; // Match the CSS gap value
    const translateAmount = index * (cardWidth + gap);

    // Update card positions
    cards.forEach((card) => {
        card.style.transform = `translateX(-${translateAmount}px)`;
    });

    // Update active button
    button.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active-test');
        } else {
            btn.classList.remove('active-test');
        }
    });
    currentIndex = index;
}

// Button click events
function attachButtonEvents() {
    button.forEach((btn) => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            slideToIndex(index);
            resetAutoSlide();
        });
    });
}

// Auto-slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % cards.length;
        slideToIndex(nextIndex);
    }, 6000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Swipe functionality for mobile
let touchStartX = 0;
let touchEndX = 0;

cardsContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

cardsContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentIndex < cards.length - 1) {
            // Swipe left - next slide
            slideToIndex(currentIndex + 1);
        } else if (diff < 0 && currentIndex > 0) {
            // Swipe right - previous slide
            slideToIndex(currentIndex - 1);
        }
        resetAutoSlide();
    }
}

// Initialize
generateButtons();
startAutoSlide();

// Pause auto-slide on hover
cardsContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

cardsContainer.addEventListener('mouseleave', () => {
    startAutoSlide();
});