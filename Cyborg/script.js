/* =========================================================
   CYBER//CORE
   Interactive functionality
   ========================================================= */


/* ---------- MOBILE NAVIGATION ---------- */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

});


/* ---------- CLOSE MOBILE MENU ---------- */

const navigationLinks = document.querySelectorAll(".nav-link");

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

    });

});


/* ---------- ACTIVE NAVIGATION ---------- */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

});


/* ---------- INITIALIZE BUTTON ---------- */

const initializeButton =
    document.querySelector(".btn-primary");

initializeButton.addEventListener("click", () => {

    initializeButton.innerHTML =
        "SYSTEM ACTIVE <span>✓</span>";

    initializeButton.style.pointerEvents = "none";

    setTimeout(() => {

        initializeButton.innerHTML =
            'INITIALIZE <span>→</span>';

        initializeButton.style.pointerEvents = "auto";

    }, 2500);

});


/* ---------- MOUSE PARALLAX ---------- */

const cyborg =
    document.querySelector(".cyborg-container");

document.addEventListener("mousemove", (event) => {

    if (window.innerWidth < 900) {
        return;
    }

    const x =
        (window.innerWidth / 2 - event.clientX) / 80;

    const y =
        (window.innerHeight / 2 - event.clientY) / 80;

    cyborg.style.transform =
        `translate(${x}px, ${y}px)`;

});


/* ---------- RESET PARALLAX ---------- */

document.addEventListener("mouseleave", () => {

    cyborg.style.transform =
        "translate(0, 0)";

});


/* ---------- CARD INTERACTION ---------- */

const cards =
    document.querySelectorAll(".cyber-card");

cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 900) {
            return;
        }

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            (y - centerY) / 30;

        const rotateY =
            (centerX - x) / 30;

        card.style.transform =
            `perspective(700px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ---------- SYSTEM STATUS ---------- */

const statusText =
    document.querySelector(".system-status");

setInterval(() => {

    if (!statusText) {
        return;
    }

    statusText.style.opacity = "0.45";

    setTimeout(() => {

        statusText.style.opacity = "1";

    }, 250);

}, 4000);