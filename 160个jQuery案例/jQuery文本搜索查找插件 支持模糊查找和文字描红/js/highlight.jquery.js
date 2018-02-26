(function($) {

	var termPattern;

	$.fn.highlight = function(term, callback) {

		return this.each(function() {

			var elem = $(this);

			if (!elem.data('highlight-original')) {
				
				// Save the original element content
				elem.data('highlight-original', elem.html());
				
			} else {
				
				// restore the original content
				elem.highlightRestore();
				
			}

			termPattern = new RegExp('(' + term + ')', 'ig');

			// Search the element's contents
			walk(elem);

			// Trigger the callback
			callback && callback(elem.find('.match'));

		});
	};

	$.fn.highlightRestore = function() {
		
		return this.each(function() {
			var elem = $(this);
			elem.html(elem.data('highlight-original'));
		});
		
	};

	function walk(elem) {

		elem.contents().each(function() {

			if (this.nodeType == 3) { // text node

				if (termPattern.test(this.nodeValue)) {
					$(this).replaceWith(this.nodeValue.replace(termPattern, '<span class="match">$1</span>'));
				}
			} else {
				walk($(this));
			}
		});
	}

})(jQuery); 