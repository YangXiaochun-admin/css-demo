/* 

jQuery FormBox - Copyright AddyOsmani.com, 2010.
Released under the GPL for open-source use

*/

$(window).load(function(){

var tabs = $("#tabs");
var tabPanesContainer = $("ul#tabPanes");
var tabPanesAll = tabPanesContainer.find("li").css("position", "absolute");
var tabMenuLinks = $("ul#tabMenu .dropdown");
var regularLinks = $("ul#tabMenu .regular");
var dropDownSpeed = 200;
var dropUpSpeed   = 200;
var menuHeight = '240px';


/*Close the currently open menu*/
function closeMenu()
{

tabMenuLinks.removeClass('activeTab');

    tabPanesContainer.stop().animate({
        height: '0px'
    }, dropUpSpeed);

	
}

/*Handle non tab-menu links*/
regularLinks.hover(function() 
{
    tabPanesContainer.stop().animate({
        height: '0px'
    });
    
    tabMenuLinks.removeClass('activeTab');
    $(this).addClass('activeTab');

}, function() {
    $(this).removeClass('activeTab');

});

/*Handle tab-menu links*/
tabMenuLinks.hover(function() 
{

    var thisMenuItem = $(this);

    /*get the offset of this item in respect to the page*/
    var thisMargin   = thisMenuItem.offset().left;
    
    /*get the offset of the navigation bar in respect to the page*/
    var tabsOffset   = tabs.offset().left;
    var thisIndex = thisMenuItem.index();
    
    thisMargin = Math.floor(thisMargin - tabsOffset);
    
       
    var thisOffset = thisMargin - 52;
    
    /* handle IE margin difference*/
    if($.browser.msie)
    {
      thisOffset = thisMargin - 15;
    }
    

    tabPanesContainer.css('margin-left', thisOffset);

    tabPanesContainer.stop().animate({
        height: menuHeight
    }, dropDownSpeed);
	
	
    
    tabMenuLinks.removeClass('activeTab');
    thisMenuItem.addClass('activeTab');


    var thisHash = thisMenuItem.find("a").attr('href');
    var tabClicked = tabPanesAll.filter(thisHash);

    
    tabClicked.appendTo(tabPanesContainer).show();
	
	
    
    return false;


}, function() {

   $(this).stop();
   
});


/*
Display Tooltips on hovering over the input fields if an
alt tag is present
*/
$('input').hover(function()
{
var thisItem = $(this);
var msgTip = thisItem.attr('alt');

if(msgTip.length)
{

  $('body').append('<div id="menuTooltip">\
			<p>'+  msgTip +'</p>\</div>');
 
		var pos = thisItem.offset();  
		var width = thisItem.width();
 
		$("#menuTooltip").css( { "left": (pos.left + 115) + "px", "top":pos.top - 90 + "px" } );
		$("#menuTooltip").fadeIn('slow');
}
 
}, function()
{
  
  $('div#menuTooltip').remove();

});




/*Handle a user hovering over the tab container*/
tabPanesContainer.hover(function() 
{
 
}, function() 
{  
    closeMenu();
});


$('.edges').hover(function()
{
   closeMenu();
   
}, function()
{
});

	});
	
	