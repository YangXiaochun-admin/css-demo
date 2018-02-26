$(function() {

	var folder = $("#main .folder"),
		front = folder.find('.front'),
		img = $("#main img"),
		droppedCount = 0;

	img.draggable();

	folder.droppable({
		drop : function(event, ui) {
			
			// Remove the dragged icon
			ui.draggable.remove();
			
			// update the counters
			front.text(++droppedCount);
			
		},
		
		activate : function(){
			// When the user starts draggin an icon
			folder.addClass('open');
		},
		
		deactivate : function(){
			// Close the folder
			folder.removeClass('open');
		}
	});
});