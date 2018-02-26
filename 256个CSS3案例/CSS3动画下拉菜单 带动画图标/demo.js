$(document).ready(function() {
	
	/* Bootstraping variable */
	menu				= $('.menu li');
	submenuWrapper	= $('#submenu-wrapper'); 
	submenu			= submenuWrapper.children('ul');
	firstSubmenu 	= submenu.eq(0);
	
	/* When menu on mouse over and out */
	menu.hover(
		function() {
			
			moveTo = $(this).index() * 11;
			showsubmenu(submenuWrapper);
			firstSubmenu.stop().animate({'marginTop' : '-'+moveTo+'em' });
		},
		
		function() { hidesubmenu(submenuWrapper); });
	
	/* When sub menu wrapper on mouse over and out */
	submenuWrapper.hover(
		function() { showsubmenu($(this)); },
		function() { hidesubmenu($(this));
	});
	
	/* Add focus on selected li */
	submenu
		.children('li')
		.hover(	function() { $(this).siblings().stop().animate({'opacity':'0.5'}); }, 
					function() { $(this).siblings().stop().animate({'opacity':'1'}); });
	
	/* Add focus on selected parent li */
	submenu
		.hover(	function() { menu.eq($(this).index()).addClass('selected')  },
					function() { menu.eq($(this).index()).removeClass('selected') });
	
	/* Function to show sub menu */
	function showsubmenu(item) {
		if(!item.hasClass('show'))
			item.addClass('show').stop().animate({'marginTop' : '0'});
	}
	
	/* Function to hide sub menu */
	function hidesubmenu(item) {
		item.removeClass('show').stop().animate({'marginTop' : '-12em'});
	}
	
});