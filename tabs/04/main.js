$(".tab").on("click", (e) => {
    $(".tab").removeClass("-active");
    $(e.target).addClass("-active");
})
