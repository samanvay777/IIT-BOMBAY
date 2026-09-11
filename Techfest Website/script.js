/* =========================================================
   TECHFEST IIT BOMBAY
   Interactive Landing Page
   ========================================================= */


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");


menuButton.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle("open");

    }
);


/* Close mobile navigation after clicking */

const navItems =
    document.querySelectorAll(".nav-item");


navItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            () => {

                navMenu.classList.remove("open");

            }
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const pageSections =
    document.querySelectorAll("section[id]");


window.addEventListener(
    "scroll",
    () => {

        let currentSection =
            "home";


        pageSections.forEach(
            (section) => {

                const sectionTop =
                    section.offsetTop - 180;

                const sectionHeight =
                    section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY <
                    sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.id;

                }

            }
        );


        navItems.forEach(
            (item) => {

                item.classList.remove(
                    "active"
                );


                if (
                    item.getAttribute(
                        "href"
                    ) ===
                    `#${currentSection}`
                ) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   CUSTOM CURSOR
   ========================================================= */

const cursorDot =
    document.querySelector(
        ".cursor-dot"
    );

const cursorOutline =
    document.querySelector(
        ".cursor-outline"
    );


let mouseX = 0;
let mouseY = 0;

let outlineX = 0;
let outlineY = 0;


document.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;


        cursorDot.style.left =
            `${mouseX}px`;

        cursorDot.style.top =
            `${mouseY}px`;

    }
);


function animateCursor() {

    outlineX +=
        (mouseX - outlineX) *
        0.15;

    outlineY +=
        (mouseY - outlineY) *
        0.15;


    cursorOutline.style.left =
        `${outlineX}px`;

    cursorOutline.style.top =
        `${outlineY}px`;


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


/* Cursor hover state */

const interactiveElements =
    document.querySelectorAll(
        "a, button, .event-card"
    );


interactiveElements.forEach(
    (element) => {

        element.addEventListener(
            "mouseenter",
            () => {

                document.body.classList.add(
                    "cursor-hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                document.body.classList.remove(
                    "cursor-hover"
                );

            }
        );

    }
);


/* =========================================================
   EVENT FILTER
   ========================================================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );

const eventCards =
    document.querySelectorAll(
        ".event-card"
    );


filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const selectedFilter =
                    button.dataset.filter;


                filterButtons.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                eventCards.forEach(
                    (card) => {

                        const cardCategory =
                            card.dataset.category;


                        if (
                            selectedFilter ===
                            "all" ||
                            cardCategory ===
                            selectedFilter
                        ) {

                            card.classList.remove(
                                "hidden"
                            );

                        } else {

                            card.classList.add(
                                "hidden"
                            );

                        }

                    }
                );

            }
        );

    }
);


/* =========================================================
   COUNTDOWN
   ========================================================= */


/*
   Target:
   22 December 2026, 00:00 IST

   This can be changed easily later.
*/

const targetDate =
    new Date(
        "December 22, 2026 00:00:00 GMT+0530"
    ).getTime();


const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


function updateCountdown() {

    const now =
        new Date().getTime();


    const distance =
        targetDate - now;


    if (distance <= 0) {

        daysElement.textContent =
            "00";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60)) /
            1000
        );


    daysElement.textContent =
        String(days).padStart(
            2,
            "0"
        );


    hoursElement.textContent =
        String(hours).padStart(
            2,
            "0"
        );


    minutesElement.textContent =
        String(minutes).padStart(
            2,
            "0"
        );


    secondsElement.textContent =
        String(seconds).padStart(
            2,
            "0"
        );

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   HERO VISUAL PARALLAX
   ========================================================= */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


document.addEventListener(
    "mousemove",
    (event) => {

        if (
            window.innerWidth <
            900
        ) {

            return;

        }


        const x =
            (
                window.innerWidth / 2 -
                event.clientX
            ) / 80;


        const y =
            (
                window.innerHeight / 2 -
                event.clientY
            ) / 80;


        heroVisual.style.transform =
            `
            translate(
                ${x}px,
                ${y}px
            )
            `;

    }
);


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section, .event-card, .stat-box, .timeline-item"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );

                    }

                }
            );

        },
        {
            threshold:
                0.12
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   CARD TILT
   ========================================================= */

eventCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth <
                    900
                ) {

                    return;

                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) /
                    80;


                const rotateY =
                    (centerX - x) /
                    80;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(
                        ${rotateX}deg
                    )
                    rotateY(
                        ${rotateY}deg
                    )
                    translateY(-8px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
            "Escape"
        ) {

            navMenu.classList.remove(
                "open"
            );

        }

    }
);