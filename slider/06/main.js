$('.actions .dots li').click(function () {
    $('.slider li:nth(' + $(this).index() + ') , .float p i:nth(' + $(this).index() + ')').addClass('active').siblings().removeClass('active');
    $(this).addClass('active').siblings().removeClass('active');
});

$('.actions .prev').click(function () {
    $(this).siblings('button').removeClass('disabled');
    var indx = $('.actions .dots li.active').index();
    if (indx == 0) {
        $('.actions .dots li:last-child, .slider li:last-child , .float p i:last-child').addClass('active').siblings().removeClass('active');
    }
    else{
        $('.actions .dots li:nth('+(indx - 1)+'), .slider li:nth('+(indx - 1)+') , .float p i:nth('+(indx - 1)+')').addClass('active').siblings().removeClass('active');
    };
    if (indx == 1) {
        $(this).addClass('disabled');
    }
    var deg = (360/$('.actions .dots li').length) * (indx-1);
    $('.float').css('transform','rotate('+deg+'deg)');
    $('.float .spans').css('transform','rotate('+-deg/3+'deg)');
    $('.p-icon').css('transform','rotate('+-deg+'deg)');
});

$('.actions .next').click(function () {
    $(this).siblings('button').removeClass('disabled');
    var indx = $('.actions .dots li.active').index();
    if (indx == $('.actions .dots li').length - 1) {
        $('.actions .dots li:first-child, .slider li:first-child , .float p i:first-child').addClass('active').siblings().removeClass('active');
    }
    else{
        $('.actions .dots li:nth('+(indx + 1)+'), .slider li:nth('+(indx + 1)+') , .float p i:nth('+(indx + 1)+')').addClass('active').siblings().removeClass('active');
    };
    if (indx == $('.actions .dots li').length - 2) {
        $(this).addClass('disabled');
    }
    var deg = (360/$('.actions .dots li').length) * (indx+1);
    $('.float').css('transform','rotate('+deg+'deg)');
    $('.float .spans').css('transform','rotate('+-deg/3+'deg)');
    $('.p-icon').css('transform','rotate('+-deg+'deg)');
});
