$(document).ready(function(){

    var total = 0;
    var totalRatingsInputs = $('.star-ratings-input').length

    $('.star-ratings-input input:checked').each(function(){
      total += parseInt($(this).val());
    })

    // set initial percentage
    var percentage = 100 * (total / (totalRatingsInputs * 5));

    $('.star-ratings-average .stars').css('background-size',percentage+'% 100%');

    $('.star-ratings-input input').on('click',function(){
      var total = 0;
      $('.star-ratings-input input:checked').each(function(){
        total += parseInt($(this).val());
      })

      var percentage = 100 * (total / (totalRatingsInputs * 5));

      $('.star-ratings-average .stars').css('background-size',percentage+'% 100%');
    })

  })
