$(function() {
  brainbow();
});

var brainbow = function init () {
  /* function stuff */
  var indicate = function indicate ($e, current) {
    var o = $e.offset(),
        h = $e.innerHeight(),
        w = $e.innerWidth(),
        t = (o.top + h - 3).toFixed(2),
        l = o.left.toFixed(2),
        c = $e.data("color") || "rgba(0,0,0,0)";
    $(".indicator").css({
      "top": current ? t  + "px" : t + 6 + "px",
      "left": l + "px",
      "width": w + "px",
      "height": current ? "1px" : "0.3em",
      "background-color": c
    });
  };
  /* event stuff */
  $("nav ul").on("click", "li", function(e) {
    $("nav ul li").each(function(){
      $(this).removeClass("current");
    });
    $(this).addClass("current");
  });
  $("nav ul").on("mouseenter", "li", function(e) {
    indicate( $(this), false);
  });
  $("nav ul").on("mouseleave", "li", function(e) {
    indicate( $("li.current"), true);
  });
  $(window).on("resize", function() {
    indicate( $("li.current"), true);
  });
  /* init stuff */
  var indicator = $("<div>").addClass("indicator");
  $("nav").prepend(indicator);
  $("nav ul li").each(function(){
    $(this).data({"color": $(this).css("color")});
  }).first().addClass("current");
  indicate($("nav ul li.current"), true);
};
