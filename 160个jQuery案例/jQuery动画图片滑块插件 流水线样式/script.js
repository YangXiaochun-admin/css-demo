$(document).ready(function() {
	
	//Initialize
	onMoving			= false;
	item				= $('.list li');
	itemReverse		= item.get().reverse();
	itemSize			= item.size();
	itemDisplayed	= 6;
	itemToSlide		= itemDisplayed * 9;
	currentSlide	= 1;
	page				= Math.round(itemSize/itemDisplayed);

	//Next button clicked
	$('.next').click(function() {

		if(onMoving || currentSlide >= 3) return false;
		onMoving = true, currentSlide++;		
		
		$.each(item, function() {
			
			var i 	 = $(this).index();
			var delay = i * 100;

			window.setTimeout(function (index) {
				return function () {
					item.eq(index).stop().animate({ 'right' : '+='+itemToSlide+'em' }, function() {
               	if(index >= itemSize-1) onMoving = false;
					});
				};
			} (i), delay);
		});
	});
	
	//Previous button clicked
	$('.prev').click(function() {

		if(onMoving || currentSlide == 1) return false;
		onMoving = true, currentSlide--;
		
		$.each(itemReverse, function() {
			
			var i 	 = $(this).index();
			var delay = i * 100;
			
			window.setTimeout(function (index) {
				return function () {
					$(itemReverse).eq(index).stop().animate({ 'right' : '-='+itemToSlide+'em' }, function() {
						if(index >= 0) onMoving = false;
					});
				};
			} (i), delay);      
		});
	});
});