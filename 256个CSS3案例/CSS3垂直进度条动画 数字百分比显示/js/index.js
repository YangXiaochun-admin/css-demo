// Demostration JS
(function ($) {
  var
    $cont = $('#prog'),
    $bar  = $cont.find('.progress'),
    value = 0,
    time  = 35;
    
  function reset() {
    value = 0;
    $cont.removeClass('done');
    $bar.css('height', '0%').text('0');
    setTimeout(increment, 500);
  }
  
  function increment() {
    value += 1;
    
    $bar.css('height', value + '%')
        .text(value);
    
    if (value === 100) {
      $cont.addClass('done');
      setTimeout(reset, 3000);
      return;
    }
   
    setTimeout(increment, time);
  }
  
  reset();
  
  
}(this.jQuery));