let cxInput = document.querySelector("#cx");
cxInput.value = -50;

cxInput.addEventListener("input", function () {
  console.log(cxInput.value);
  document.querySelector(".wrapper").style.setProperty("--cx", cxInput.value);
});
