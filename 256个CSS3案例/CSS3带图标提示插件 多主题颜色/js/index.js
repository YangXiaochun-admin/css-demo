$(".note__close").click(function() {
  $(this).parent().fadeOut(500, function() {
    $(this).remove();
  });
});