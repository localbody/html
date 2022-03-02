let range = document.querySelector(".range");
let slider = document.querySelector(".slider");
let gradientStop = document.querySelector("#gradient-stop");
let gradientGrey = document.querySelector("#gradient-grey");

let colorBad = "#ff5722";
let colorOk = "#ff9800";
let colorGood = "#36d896";
let colorGreat = "#3f51b5";

slider.addEventListener("input", function () {
  checkSliderValue(this);
});

function checkSliderValue(slider) {
  gradientGrey.setAttribute("offset", 100 - slider.value + "%");

  if (slider.value > 0 && slider.value <= 25) {
    range.closest(".row").classList.add("bad");
    range.closest(".row").classList.remove("ok", "great", "good");
    gradientStop.setAttribute("stop-color", colorBad);
  }
  if (slider.value > 25 && slider.value <= 50) {
    range.closest(".row").classList.add("ok");
    range.closest(".row").classList.remove("bad", "great", "good");
    gradientStop.setAttribute("stop-color", colorOk);
  }
  if (slider.value > 50 && slider.value <= 75) {
    range.closest(".row").classList.add("good");
    range.closest(".row").classList.remove("ok", "great", "bad");
    gradientStop.setAttribute("stop-color", colorGood);
  }
  if (slider.value > 75 && slider.value <= 100) {
    range.closest(".row").classList.add("great");
    range.closest(".row").classList.remove("ok", "bad", "good");
    gradientStop.setAttribute("stop-color", colorGreat);
  }
}

checkSliderValue(slider);
