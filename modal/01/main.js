$(".button").on('click', function () {
    $(".popup-modal").fadeIn(400);
  });
  $(".popup-close").on('click', function () {
    $(".popup-modal").fadeOut(400);
  });

  $(document).on('click', function (event) {
    if (!$(event.target).closest(".button, .popup-content").length) {
      $("body").find(".popup").fadeOut(400);
      $("body").removeClass("overhidden");
    }
  });
