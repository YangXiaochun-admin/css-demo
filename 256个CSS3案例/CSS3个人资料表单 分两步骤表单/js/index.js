jQuery(document).ready(function(){
  function doStep(){
    // Next Button
    $('a.next-step').click(function(event){
      event.preventDefault();
      // Part 1
      if($('.alpha').hasClass("in")) {
        $('.alpha').removeClass("in");
      }
      $('.alpha').addClass("out");
      // Part 2
      if($('.beta').hasClass("out")) {
        $('.beta').removeClass("out");
      }
      $('.beta').addClass("in");
    });
    
    // Previous Button
    $('a.prev-step').click(function(event){
      event.preventDefault(); 
      $('.alpha').removeClass("out").addClass("in");
      $('.beta').removeClass("in").addClass("out");
    });
    
    // Submit & Complete
    $('.submit').click(function(event){
      event.preventDefault();
      // Part 1
      if($('.beta').hasClass("in")) {
        $('.beta').removeClass("in");
      }
      $('.beta').addClass("out");
      // Part 2
      if($('.charlie').hasClass("out")) {
        $('.charlie').removeClass("out");
      }
      $('.charlie').addClass("in");
    });
  }
  // Active Functions
  doStep();
});