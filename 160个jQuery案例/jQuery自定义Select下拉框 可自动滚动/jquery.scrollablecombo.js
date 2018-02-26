(function($) {
	$.fn.scrollablecombo = function(options) {
		var opts = $.extend({}, $.fn.scrollablecombo.defaults, options);
		return this.each(function() {
			$this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			
			function findHighestZIndex(){
				var divs = document.getElementsByTagName('div');
				var highest = 0;
				for (var i = 0; i < divs .length; i++)
				{
					var zindex = divs[i].style.zIndex;
					if (zindex > highest) {
						highest = zindex;
					}
				}
				return highest;
			}

			/** 
			* hide the select element
			* graceful degradation
			*/
			$this.hide();
			
			function makeScrollable($wrapper, $container){
				var extra 			= 50;
				var wrapperHeight 	= $wrapper.height() ;
				$wrapper.css({overflow: 'hidden'});
				$wrapper.scrollTop(0);
				$wrapper.unbind('mousemove').bind('mousemove',function(e){
					var ulHeight 	= $container.outerHeight() + 2*extra ;
					var top 		= (e.pageY - $wrapper.offset().top) * (ulHeight-wrapperHeight ) / wrapperHeight - extra;
					$wrapper.scrollTop(top);
				});
			}
			
			/**
			* let's build our element structure
			*/
			var $ul_e 	= $('<ul />');
			
			$this.find('option').each(function(){
				var $option = $(this);
				var liclass = '';
				if($option.attr('selected'))
					liclass = 'selected';
				var $li_e 	= $('<li />',{
					className	:	liclass,
					html		:	'<a href="'+$option.val()+'">'+$option.html()+'</a>'
				});
				$ul_e.append($li_e);
			});
			
			var $wrapper_e 	= $('<div />',{
				className	:	'cb_selectWrapper'
			});
			
			$wrapper_e.append($ul_e);
			
			var $control_e 	= $('<div />',{
				//id			:	'ui_element',
				className	:	'cb_selectMain cb_down'
			});
			
			var $select_e 	= $('<div />',{
				className	:	'cb_select'
			});
			
			$select_e.append($wrapper_e).append($control_e);
			
			var $selected	= $ul_e.find('.selected');
			
			
			function openCombo(){
				var maxzidx = Math.max(findHighestZIndex(),99999);
				$wrapper_e.css('z-index',parseInt(maxzidx+1000)).show();
				$control_e.addClass('cb_up').removeClass('cb_down');
				makeScrollable($wrapper_e,$ul_e);
			}
			function closeCombo(){
				$wrapper_e.css('z-index',1000).hide();
				$control_e.addClass('cb_down').removeClass('cb_up');
			}
			$control_e.html($selected.find('a').html())
					  .bind('click',function(){
						  (!$wrapper_e.is(':visible'))? openCombo() : closeCombo();
					  }
			);
			$selected.hide();
			
			$this.parent().append($select_e);
			$this.remove();
			
			$ul_e.find('a').bind('click',function(e){
				var $this 		= $(this);
				$control_e.html($this.html());
				var $selected	= $ul_e.find('.selected');
				$selected.show().removeClass('selected');
				$this.parent().addClass('selected').hide();
				closeCombo();
				e.preventDefault();
			});
			
			
			
		});
	};
	$.fn.scrollablecombo.defaults = {
		
	};
})(jQuery);