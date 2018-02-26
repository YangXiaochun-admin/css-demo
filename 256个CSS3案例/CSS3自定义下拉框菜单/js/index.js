$('nav').click(function(){
    $('.menu').css('background-color','#ff5e1a');
    $('.dropDown').slideDown("slow");    
});

$('nav').mouseleave(function(){
    $('.menu').css('background-color','#ff782e');
    $('.dropDown').slideUp("slow", function(){
        $(this).fadeOut(2000);
    });
});