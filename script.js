/*=========================================
GROSCALE V2
Main JavaScript
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    HEADER SCROLL
    =========================================*/

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

    /*=========================================
    SMOOTH SCROLL
    =========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

    /*=========================================
    ACTIVE NAVIGATION
    =========================================*/

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    function activeMenu() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", activeMenu);

    /*=========================================
    FADE IN ANIMATION
    =========================================*/

    const revealElements = document.querySelectorAll(

        ".industry-card, .service-card, .capability-item, .process-card, .info-card"

    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(item => {

        item.classList.add("hidden");

        observer.observe(item);

    });

});
/*=========================================
MOBILE MENU
=========================================*/

const menuBtn = document.querySelector(".menu-btn");

const mobileMenu = document.querySelector(".mobile-menu");

const closeMenu = document.querySelector(".close-menu");

const overlay = document.querySelector(".menu-overlay");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

mobileMenu.classList.add("active");

overlay.classList.add("active");

document.body.style.overflow="hidden";

});

}

if(closeMenu){

closeMenu.addEventListener("click",closeMobile);

}

if(overlay){

overlay.addEventListener("click",closeMobile);

}

function closeMobile(){

mobileMenu.classList.remove("active");

overlay.classList.remove("active");

document.body.style.overflow="";

}
