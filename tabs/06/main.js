var slides = document.getElementsByClassName("slide");
var tabs = document.getElementsByTagName("button");

function setScreen(num) {
    // Set button colors
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = "";
    }
    tabs[num-1].className = "selected";

    // Move slides
    let change = (num-1) * -100;

    for (var i = 0; i < slides.length; i++) {
        slides[i].style.transform = "translateX(" + change + "%)";
    }
}
