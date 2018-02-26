(function( $ ){

	// star rating plugin that uses HTML5's new .data()
	$.fn.starRating = function() {    
		var i, html, max, value, evaluated, $this;

		this.each(function() {

			$this = $(this);
			value = $this.data('value');
			max = $this.data('stars');
			evaluated = $this.data('evaluated');
			html = "";


		   	for (i = max; i > 0; i--)
					html += '<input id="'+evaluated+'_'+i+'" name="' + evaluated +'" type="radio" value="' + i + '" /><label for="'+evaluated+'_'+i+'">'+i+' out of '+max+' stars</label>';
				this.innerHTML += html;

				if (value)
					this.getElementsByTagName('input')[max-value].setAttribute('checked', 'checked');
		});

	};

	$('.star-rating').starRating();
	
	$('.star-rating').on("click", "input", function(){
		var $this = $(this), 
			$parent = $this.parent(),
			$clicked = $this,
			$children = $parent.children('input');
		
		$children.each(function(index, item){
			//itereate through input elements and remove the currently/previously "checked" attribute
			$(item).removeAttr('checked');
		});
	
		//add checked attribute to the clicked element
		$clicked.attr('checked','checked');
	});

})( jQuery );