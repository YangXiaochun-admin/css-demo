"use strict";

$( function()
{
    window.prettyPrint && prettyPrint();
    
    var $nav = $( '#inav' ).inav( {
        autoCenterMenu     : true,
        itemWidth          : 170,
        carouselAutoScroll : true
    } );
    
    $( '.inav-theme-demo' ).each( function()
    {
        var width  = $( this ).data( 'item-width' )
          , height = $( this ).data( 'item-height' );
        
        $( this ).inav( {
            itemWidth  : width,
            itemHeight : height
        } );
    } );
} );