$(document).on('submit','#contact', function (e){
    e.preventDefault();
    $('#contact').addClass('submitted');
    $('#contact #logo').removeClass('bouncing');
});