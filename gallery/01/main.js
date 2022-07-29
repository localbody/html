let index = 0;
const gallery = document.querySelector(".gallery");
const follow = document.querySelector(".follow");
const pages = document.querySelectorAll(".pages span:not(.follow)");
const slides = document.querySelectorAll("figure");
const numSlides = slides.length;
const offset = 360;
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const mode = document.querySelector(".mode");
const home = document.querySelector(".home");

function init() {
    home.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        index = 0;
        mode.checked = true;
        jumpToPage(index);
    });

    arrowLeft.addEventListener("click", (e) => {
        prevPage();
    });

    arrowRight.addEventListener("click", (e) => {
        nextPage();
    });

    pages.forEach((node, i) => {
        node.addEventListener("click", (e) => {
            jumpToPage(i);
        });
    });

    slides.forEach((node, i) => {
        node.querySelector("img").addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!mode.checked) {
                return;
            }
            mode.checked = false;
            jumpToPage(i);
        });
    });

    renderButtons();
}

function jumpToPage(ii) {
    index = ii;
    gallery.style.left = `${offset * (ii * -1)}px`;
    restartAnimation(follow);
    pages.forEach((node) => node.classList.remove("active"));
    pages[ii].classList.add("active");
    renderButtons();
}

function nextPage() {
    if (index >= numSlides - 1) {
        index = numSlides - 1;
        return;
    }

    index++;
    gallery.style.left = `${offset * (index * -1)}px`;
    restartAnimation(follow);
    pages.forEach((node) => node.classList.remove("active"));
    pages[index].classList.add("active");
    renderButtons();
}

function prevPage() {
    if (index <= 0) {
        index = 0;
        return;
    }

    index--;
    restartAnimation(follow);
    gallery.style.left = `${offset * (index * -1)}px`;
    pages.forEach((node) => node.classList.remove("active"));
    pages[index].classList.add("active");

    renderButtons();
}

function restartAnimation(el) {
    el.style.animation = "none";
    el.offsetHeight; /* trigger reflow */
    el.style.animation = null;
}

function renderButtons() {
    if (index <= 0) {
        arrowLeft.classList.add("disabled");
    } else {
        arrowLeft.classList.remove("disabled");
    }

    if (index >= numSlides - 1) {
        arrowRight.classList.add("disabled");
    } else {
        arrowRight.classList.remove("disabled");
    }
}

init();
