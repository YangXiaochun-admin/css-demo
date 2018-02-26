$('.track').click( function() {
    $indicator = $('.indicator');
    if( $indicator.hasClass('switch-on') ) {
        $indicator.removeClass('switch-on').addClass('switch-off');
        }
    else {
        $indicator.removeClass('switch-off').addClass('switch-on');
    }
});