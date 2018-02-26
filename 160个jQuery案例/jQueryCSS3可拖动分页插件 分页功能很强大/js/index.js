$(document).ready( function() {
  
  

  var pagesMax = 30;
  var pagesMin = 1;
  var startPage = 7;
  var url = "http://yoursite.com/results?page={{1}}";
  
  $('.pagination .pageSlider').slider({

    value: startPage, max: pagesMax, min: pagesMin,
    animate: true,
    
    create: function( event, ui ) {
      
      $('.pagination .pageSlider .ui-slider-handle').attr({
        "aria-valuenow": startPage,
        "aria-valuetext": "Page " + startPage,
        "role": "slider",
        "aria-valuemin": pagesMin,
        "aria-valuemax": pagesMax,
        "aria-describedby": "pageSliderDescription" 
      });
       
      $('.pagination .pageInput').val( startPage );

    }
  
  }).on( 'slide', function(event,ui) {
      
      // let user skip 10 pages with keyboard ;)
      if( event.metaKey || event.ctrlKey ) {
        
        if( ui.value > $(this).slider('value') ) {
          
          if( ui.value+9 < pagesMax ) { ui.value+=9; } 
          else { ui.value=pagesMax }
          $(this).slider('value',ui.value);
        
        } else {
          
          if( ui.value-9 > pagesMin ) { ui.value-=9; } 
          else { ui.value=pagesMin }
          $(this).slider('value',ui.value);
          
        }
        
        event.preventDefault();
        
      }
      
      $('.pagination .pageNumber span').text( ui.value );
      $('.pagination .pageInput').val( ui.value );
      
  }).on('slidechange', function(event, ui) {
    
      $('.pagination .pageNumber')
        .attr('role','alert')
        .find('span')
        .text( ui.value );
    
      $('.pagination .pageInput').val( ui.value );
      
      $('.pagination .pageSlider .ui-slider-handle').attr({
        "aria-valuenow": ui.value,
        "aria-valuetext": "Page " + ui.value 
      });
    
  });




$('.pagination .pageSlider .ui-slider-handle').on( 'keyup' , function(e) {
  
  if( e.which == 13 ) {
    var curPage = $('.pagination .pageSlider').slider('value');
    alert( 'we would now send you to: ' + url.replace( /{{.}}/ , curPage ));
  }
  
});


$('.pagination .pageInput').on( 'change' , function(e) {
  $('.pagination .pageSlider').slider( 'value', $(this).val() );
});


  
  
  
  var tmr;
  $('.pageSkip').on('click', function(e) {
    
    e.preventDefault();
    
    var $this = $(this);
    
    if( $this.hasClass('pageNext') ) {
      var curPage = $('.pagination .pageSlider').slider('value')+1;
    } else if( $this.hasClass('pagePrev') ) {
      var curPage = $('.pagination .pageSlider').slider('value')-1;
    }
    
    $('.pagination .pageSlider').slider('value',curPage);
    
    clearTimeout(tmr);
    tmr = setTimeout( function() {
      alert( 'we would now send you to: ' + url.replace( /{{.}}/ , curPage ));
    },1000);
    
  });
  
  
  
  

function sliderPips( min, max ) {
  
  var pips = max-min;
  var $pagination = $('.pagination .pageSlider');
 
  for( i=0; i<=pips; i++ ) {

    var s = $('<span class="pagePip"/>').css({ 
      left: '' + (100/pips)*i + '%' 
    });
    
    $pagination.append( s );

  }
  
  var minPip = $('<span class="pageMinPip">'+min+'</span>');
  var maxPip = $('<span class="pageMaxPip">'+max+'</span>');
  $pagination.prepend( minPip, maxPip );
  
};sliderPips( pagesMin, pagesMax );
 

function sliderLabel() {
  $('.pagination .ui-slider-handle').append(
    '<span class="pageNumber">Page <span>' + 
    $('.pagination .pageSlider').slider('value') + 
    '</span></span>');
};sliderLabel();

  
  
  
  
  $('.pagination .pageButton').on('click', function(e) {

    e.preventDefault();
    var curPage = $('.pagination .pageSlider').slider('value');
    alert( 'we would now send you to: ' + 
          url.replace( /{{.}}/ , curPage ));
  
  });
  
  
  
  
  
  
});



  