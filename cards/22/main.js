const toggleables = document.querySelectorAll('.toggleable')

const toggleImage = (e) => {
  const icon = e
    .composedPath()
    .find((el) => el.classList.contains('toggleable'))

  if (icon.classList.contains('toggled')) {
    icon.classList.remove('toggled')
  } else {
    icon.classList.add('toggled')
  }
}

toggleables.forEach((toggleable) => {
  toggleable.addEventListener('click', toggleImage)
})
