$('body').on('click', '.social-baloon li a', function(event){
  var $el = $(this);
  var id = $el.attr('id');
 console.log("sadfasdf")
 $(this).parent().parent().find("span.selected").removeClass('active');
  $el.find("span.selected").addClass('active')
  
  console.log($el.find(".selected.active"))
  $('.social-selector > i:first').removeClass().addClass('fa fa-fw fa-'+id)
  $('.social-selector').removeClass().addClass('social-selector btn btn-primary fg-' + id)
});
setTimeout(function(){
  $('.social-selector').addClass('opened');
}, 800)
setTimeout(function(){
  $('.social-selector').removeClass('opened');
}, 1800)
