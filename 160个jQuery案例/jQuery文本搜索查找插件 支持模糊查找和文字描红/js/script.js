$(function() {

	var search = $('#search'),
		content = $('#content'),
		matches = $(), index = 0;

	// Listen for the text input event
	search.on('input', function(e) {

		// Only search for strings 2 characters or more
		if (search.val().length >= 2) {
			
			// Use the highlight plugin
			content.highlight(search.val(), function(found) {

				matches = found;

				if(matches.length && content.is(':not(:animated)')){
					scroll(0);
				}
				
			});
		} else {
			content.highlightRestore();
		}

	});
	
	search.on('keypress', function(e) {
		
		if(e.keyCode == 13){ // The enter key
			scrollNext();
		}
		
	});


	function scroll(i){
		index = i;
		
		// Trigger the scrollTo plugin. Limit it
		// to the y axis (vertical scroll only)
		content.scrollTo(matches.eq(i), 800, { axis:'y' } );
	}
	
	function scrollNext(){
		matches.length && scroll( (index + 1) % matches.length );
	}
});
