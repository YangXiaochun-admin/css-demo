$('#site-nav--toggle').click(function(){
  // toggle a class on body to affect nav and workarea behaviour
  $('body').toggleClass('body__expanded');
});

$(window).resize(function() {
  $('body').removeClass('body__expanded');
});