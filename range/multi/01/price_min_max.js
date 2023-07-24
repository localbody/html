// inputLeft
const inputLeft = document.querySelector('#input__price-min')
// inputRight
const inputRight = document.querySelector('#input__price-max')
// priceValueMin
const priceValueMin = document.querySelector('.price_value_min')
// $('.slider > .thumb.left')
const sliderThumbLeft = document.querySelector('.slider > .thumb.left')
// $('.slider > .range')
const sliderRange = document.querySelector('.slider > .range')
// $('.price_value_max')
const priceValueMax = document.querySelector('.price_value_max')
// $('.slider > .thumb.right')
const sliderThumbRight = document.querySelector('.slider > .thumb.right')
const priceMinValue = document.querySelector('#price_min_value')
const priceMaxValue = document.querySelector('#price_max_value')

function setLeftValue() {
    let min = parseInt(inputLeft.getAttribute('min')), // Минимально допустимое число
        max = parseInt(inputLeft.getAttribute('max')), // Максимально допустимое число
        text = Math.min(
            parseInt(inputLeft.value),
            parseInt(inputRight.value) - 1
        ), // Минимальное значение ползунка
        percent = ((text - min) / (max - min)) * 100 // % Левого значения

    inputLeft.value = text
    // priceValueMin.textContent =
    // text.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' P'
    priceMinValue.value = text.toString()
    // .replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
    sliderThumbLeft.style.left = percent + '%'
    sliderRange.style.left = percent + '%'
}
setLeftValue()

function setRightValue() {
    let min = parseInt(inputRight.getAttribute('min')),
        max = parseInt(inputRight.getAttribute('max')),
        text = Math.max(
            parseInt(inputRight.value),
            parseInt(inputLeft.value) + 1
        ),
        percent = ((text - min) / (max - min)) * 100

    inputRight.value = text
    // priceValueMax.textContent =
    // text.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' P'
    priceMaxValue.value = text.toString()
    // .replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
    sliderThumbRight.style.right = 100 - percent + '%'
    sliderRange.style.right = 100 - percent + '%'
}
setRightValue()

// inputLeft.bind('input', setLeftValue)
inputLeft.addEventListener('input', setLeftValue)
// inputRight.bind('input', setRightValue)
inputRight.addEventListener('input', setRightValue)
