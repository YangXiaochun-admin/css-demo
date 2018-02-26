var menuItems = $('.main-navigation li');

menuItems.on("click", function(event) {
    
  menuItems.removeClass("active");
  
  $(this).addClass("active");
  
  $(".main-content").css({
    "background": $(this).data("bg-color")
  });
  
  event.preventDefault();
});