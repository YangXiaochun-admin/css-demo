$(document).ready(function() {
	
	//Initialize variable
	item 			= $('.item img');
	itemReverse	= item.get().reverse();
	
	//Arrow up clicked
	$('#arrow-up').on('click', function() {
		
		$('.dock').addClass('dock-show');
		$('#arrow').hide();
		
		$.each(item, function() {
			
			var i 	 = $(this).index();
			var delay = i * 100;

			window.setTimeout(function (index) {
				return function () {
					item.eq(index).stop().animate({ 'top' : '-7.8em' });
				};
			} (i), delay);
		});
	});
	
	//Arrow down clicked
	$('#arrow-down').on('click', function() {
		
		$('.dock').removeClass('dock-show');
		$('#arrow').show();
		
		$.each(itemReverse, function() {
			
			var i 	 = $(this).index();
			var delay = i * 100;

			window.setTimeout(function (index) {
				return function () {
					$(itemReverse).eq(index).stop().animate({ 'top' : '0' });
				};
			} (i), delay);
		});
	});
	
	//Item hovered
	$('.item img').hover(function() {
		$(this).stop().animate({ 'top' : '-8.4em' }, 'fast');
	}, function() {
		$(this).stop().animate({ 'top' : '-7.8em' }, 'fast');
	});
	
});