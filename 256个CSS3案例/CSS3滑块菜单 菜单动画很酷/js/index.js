$(document).ready(function() { 
  // Perform animations on menu containers and items
  $('.menu-container').hover(function() { // Tile animations on hover, for desktop browsers
    category = '#' + this.id; 
    $(category + ' .label').stop().animate({width:'100px'}, {queue: false, duration: 300}).fadeIn();
    $(category + ' .tile').stop().animate({width:'100px'}, {queue: false, duration: 300});
    $(category + ' .bar').stop().animate({width:'300px'}, {queue: false, duration: 300});
    $(this).stop().animate({width:'400px'}, {queue: false, duration: 300}); 
  }, function() { // Tile reset on unhover, for desktop browsers
    $(category + ' .label').stop().animate({width:'64px'}).fadeOut({queue: false});
    $(category + ' .tile').stop().animate({width:'64px'});
    $(category + ' .bar').stop().animate({width:'0px'});
    $(this).stop().animate({width:'64px'});
  }).focus(function() { // Tile animation on focus (click), for mobile browsers
    category = '#' + this.id;
    $(category + ' .label').stop().animate({width:'100px'}, {queue: false, duration: 300}).fadeIn();
    $(category + ' .tile').stop().animate({width:'100px'}, {queue: false, duration: 300});
    $(category + ' .bar').stop().animate({width:'300px'}, {queue: false, duration: 300});
    $(this).stop().animate({width:'400px'}, {queue: false, duration: 300});
  }).blur(function() { // Tile reset on blur (unclick), for mobile browsers
    $('.label').stop().animate({width:'64px'}, {queue: false, duration: 300}).fadeOut({queue: false});
    $('.tile, .menu-container').stop().animate({width:'64px'}, {queue: false, duration: 300});
    $('.bar').stop().animate({width:'0px'}, {queue: false, duration: 300}); 
  });
        
  // If possible, use event listener for secret menu access
  if (window.addEventListener) {
    // Define holder for pressed keys, marker for secret status, and code sequence.
    var pressed = [];
    var status = 'hidden';
    var konamiCode = '38,38,40,40,37,39,37,39,66,65';
    // Listen for key presses and record their codes in "pressed" array
    window.addEventListener('keydown', function(k) {
      pressed.push(k.keyCode);
      // The first time the user enters the correct sequence...
      if (pressed.toString().indexOf(konamiCode) >= 0 && status == 'hidden') {
        // Reveal secret, then clear array and change status
        surprise();
        pressed = [];
        status = 'found';
      }
    }, true);
  }
  
  // Reveal secret menu and play sound
  var surprise = function() {
    $('#link').fadeIn();
    $('#secret-found')[0].play();
  };
}); 