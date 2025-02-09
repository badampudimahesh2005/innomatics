





  

// Image Slider
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        dots[i].classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

function moveSlide(step) {
    currentIndex = (currentIndex + step + slides.length) % slides.length;
    showSlide(currentIndex);
}

function currentSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

// Auto Slide
setInterval(() => moveSlide(1), 5000);


// Tab Content Switcher
function showContent(tabId) {
    let contents = document.querySelectorAll('.content2');
    let tabs = document.querySelectorAll('.tab');

    contents.forEach(content => content.style.display = 'none');
    tabs.forEach(tab => tab.classList.remove('active'));

    document.getElementById(tabId).style.display = 'flex';
    event.currentTarget.classList.add('active');
}

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});

