function setLeftValue() {
    let min = parseInt($("#input-left").attr('min')), // Минимально допустимое число
        max = parseInt($("#input-left").attr('max')), // Максимально допустимое число
        text = Math.min(parseInt($("#input-left").val()), parseInt($("#input-right").val()) - 1), // Минимальное значение ползунка
        percent = ((text - min) / (max - min)) * 100; // % Левого значения

    $("#input-left").val(text);
    $(".price_value_min").text(text.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' P');
    $(".slider > .thumb.left").css('left', percent + "%");
    $(".slider > .range").css('left', percent + "%");
}
setLeftValue();

function setRightValue() {
    let min = parseInt($("#input-right").attr('min')),
        max = parseInt($("#input-right").attr('max')),
        text = Math.max(parseInt($("#input-right").val()), parseInt($("#input-left").val()) + 1),
        percent = ((text - min) / (max - min)) * 100;

    $("#input-right").val(text);
    $(".price_value_max").text(text.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' P');
    $(".slider > .thumb.right").css('right', (100 - percent) + "%");
    $(".slider > .range").css('right', (100 - percent) + "%");
}
setRightValue();

$("#input-left").bind("input", setLeftValue);
$("#input-right").bind("input", setRightValue);
