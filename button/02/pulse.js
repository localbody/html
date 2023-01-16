// slight change from the video, where I've set the eventListener
// for the animationend to remove itself after the click

const pulseButtons = document.querySelectorAll('.button--pulse')

function mousePositionToCustomProp(event, element) {
  let posX = event.offsetX
  let posY = event.offsetY

  element.style.setProperty('--pulseX', posX + 'px')
  element.style.setProperty('--pulseY', posY + 'px')
}

pulseButtons.forEach((pulseButton) => {
  pulseButton.addEventListener('click', (e) => {
    mousePositionToCustomProp(e, pulseButton)
    pulseButton.classList.add('pulse')
    pulseButton.addEventListener(
      'animationend',
      () => {
        pulseButton.classList.remove('pulse')
      },
      {once: true}
    )
  })
})
