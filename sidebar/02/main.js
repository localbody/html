const navigation = document.querySelector('.sidebar')
const navToggle = document.querySelector('.nav-toggle')

navToggle.addEventListener('click', () => {
  navigation.classList.toggle('expand')
})
