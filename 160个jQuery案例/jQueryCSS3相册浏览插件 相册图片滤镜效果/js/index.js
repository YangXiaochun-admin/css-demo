var carrousel = $( ".carrousel" );

$( ".portrait" ).click( function(e){
  var src = $(this).find(".pic").attr( "data-src-wide" );
  carrousel.find("img").attr( "src", src );
  carrousel.fadeIn( 200 );
});

carrousel.find( ".close" ).click( function(e){
  carrousel.find( "img" ).attr( "src", '' );
  carrousel.fadeOut( 200 );
} );