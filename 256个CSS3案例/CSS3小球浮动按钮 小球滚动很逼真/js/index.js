// DOM Elements
var orb   = $("#orb");
var track = $("#track");
var rail = $("#platform");

var trackWidth  = track.width();
var cartWidth   = orb.width();

$(".button").on("click", function() {
  var position = $(this).position();
  var width    = $(this).width();
  var left     = position.left;
  var platform = left + width - 20; // TODO: Remove magic #
  
  $(".button").removeClass("active");
  $(this).addClass("active");
  
  rail.addClass("active");
  
  orb.addClass("hover");
  
  orb.animate({
    "left" : platform - cartWidth
  }, 2000, function() {
    orb.removeClass("hover");
    rail.removeClass("active");
  });
});