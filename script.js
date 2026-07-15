/* ==========================================
   GROSCALE SCRIPT.JS
   PART 1
========================================== */

/* ==========================
   SMOOTH SCROLL
========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth",
block:"start"

});

}

});

});


/* ==========================
   HEADER SHADOW
========================== */

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY > 40){

header.style.boxShadow="0 15px 35px rgba(0,0,0,.35)";

}else{

header.style.boxShadow="none";

}

});


/* ==========================
   ACTIVE NAV LINK
========================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let currentSection="";

sections.forEach(section=>{

const sectionTop = section.offsetTop - 180;
const sectionHeight = section.offsetHeight;

if(window.scrollY >= sectionTop){

currentSection = section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#" + currentSection){

link.classList.add("active");

}

});

});


/* ==========================
   FADE-IN ANIMATION
========================== */

const fadeElements = document.querySelectorAll(

".service-card, .case-card, .testimonial-card, .contact-card, .numbers div, .trust-bar div"

);

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}

});

},{
threshold:0.15
});

fadeElements.forEach(el=>{

el.style.opacity="0";
el.style.transform="translateY(50px)";
el.style.transition="all .7s ease";

observer.observe(el);

});
/* ==========================================
   GROSCALE SCRIPT.JS
   PART 2
========================================== */

/* ==========================
   MOBILE MENU
========================== */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuOverlay = document.querySelector(".menu-overlay");
const mobileClose = document.querySelector(".mobile-close");

if(menuToggle){

menuToggle.addEventListener("click",()=>{

mobileMenu.classList.add("active");
menuOverlay.classList.add("active");
document.body.style.overflow="hidden";

});

}

if(mobileClose){

mobileClose.addEventListener("click",closeMenu);

}

if(menuOverlay){

menuOverlay.addEventListener("click",closeMenu);

}

document.querySelectorAll(".mobile-menu a").forEach(link=>{

link.addEventListener("click",closeMenu);

});

function closeMenu(){

mobileMenu.classList.remove("active");
menuOverlay.classList.remove("active");
document.body.style.overflow="";

}

/* ==========================
   ESC KEY CLOSE
========================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

closeMenu();

}

});

/* ==========================
   HERO COUNTER ANIMATION
========================== */

const counters = document.querySelectorAll(".stats h2");

const counterObserver = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

animateCounter(entry.target);

counterObserver.unobserve(entry.target);

}

});

},{threshold:0.5});

counters.forEach(counter=>{

counterObserver.observe(counter);

});

function animateCounter(counter){

const original = counter.innerText;

const number = parseInt(original.replace(/\D/g,""));

const suffix = original.replace(/[0-9]/g,"");

let current = 0;

const increment = Math.max(1,Math.ceil(number/80));

const timer = setInterval(()=>{

current += increment;

if(current >= number){

counter.innerText = original;
clearInterval(timer);

}else{

counter.innerText = current + suffix;

}

},20);

}

/* ==========================
   WHATSAPP BUTTON
========================== */

const whatsapp = document.querySelector(".whatsapp-float");

if(whatsapp){

window.addEventListener("scroll",()=>{

if(window.scrollY > 300){

whatsapp.style.opacity="1";
whatsapp.style.transform="translateY(0)";

}else{

whatsapp.style.opacity=".75";
whatsapp.style.transform="translateY(8px)";

}

});

}

/* ==========================
   IMAGE HOVER EFFECT
========================== */

document.querySelectorAll(".case-card img").forEach(img=>{

img.addEventListener("mouseenter",()=>{

img.style.transform="scale(1.06)";

});

img.addEventListener("mouseleave",()=>{

img.style.transform="scale(1)";

});

});
