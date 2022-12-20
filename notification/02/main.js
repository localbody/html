const button = document.getElementById("button");
const container = document.getElementById("container");

function push() {
  const notification = document.createElement("aside");
  notification.classList.add("hs-notify");
  notification.innerHTML = "Hello World!";

  container.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("will-exit");
    notification.addEventListener("animationend", function() {
      container.removeChild(notification);
    });
  }, 2000);
}

button.addEventListener('click', () => {
  push();
});

push();
