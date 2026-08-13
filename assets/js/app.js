/* =========================================
   EZEE VISION CHAMPUA
   APP.JS
   Phase 1C — Part 1
========================================= */

"use strict";


/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPageLoader();
    initMobileMenu();
    initSmoothNavigation();
    initActiveNavigation();

});


/* =========================================
   PAGE LOADER
========================================= */

function initPageLoader() {

    const loader = document.querySelector(".page-loader");

    if (!loader) return;

    // Small delay for a smooth loading experience
    window.setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";

        // Remove from layout after transition
        window.setTimeout(() => {
            loader.remove();
        }, 350);

    }, 500);
}


/* =========================================
   MOBILE MENU
========================================= */

function initMobileMenu() {

    const menuButton = document.querySelector(".mobile-menu-btn");
    const navigation = document.querySelector(".main-nav");

    if (!menuButton || !navigation) return;


    menuButton.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("mobile-open");

        menuButton.classList.toggle("active", isOpen);

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    // Close menu after clicking a navigation link

    const navLinks =
        navigation.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("mobile-open");
            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================
   SMOOTH NAVIGATION
========================================= */

function initSmoothNavigation() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            '.nav-link[href^="#"]'
        );

    if (
        !sections.length ||
        !navLinks.length
    ) {
        return;
    }


    const updateActiveLink = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 140;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );

    updateActiveLink();

}


/* =========================================
   WINDOW LOAD FALLBACK
========================================= */

window.addEventListener("load", () => {

    const loader =
        document.querySelector(".page-loader");

    if (!loader) return;

    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    loader.style.pointerEvents = "none";

    window.setTimeout(() => {

        if (loader.parentNode) {
            loader.remove();
        }

    }, 400);

});
