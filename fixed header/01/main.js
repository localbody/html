$(window).scroll(function (e) {
  var scrollTop = window.scrollY
  if (scrollTop > 0) {
    $('header:not(.fixed)').addClass('fixed')
  } else {
    $('header.fixed').removeClass('fixed')
  }
})

$(document).ready(function () {
  $('.logo').on('click', function () {
    scrollToTop()
  })

  $('[data-style]').on('click', function () {
    scrollToTop(
      (function (style) {
        return function () {
          setHeaderStyle(style)
        }
      })($(this).attr('data-style'))
    )
  })
})

function scrollToTop(callback) {
  $('html, body').animate({scrollTop: '0'}, 200, callback)
}

function setHeaderStyle(style) {
  $('html')
    .removeClass('style1 style2 style3 style4')
    .addClass('style' + style)
}
