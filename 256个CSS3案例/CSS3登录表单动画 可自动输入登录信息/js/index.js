jQuery(document).ready(function($) {

	// If firefox
	if(navigator.userAgent.toLowerCase().match(/firefox/)) {
		$('.browser-warning').removeClass('hidden');
		setTimeout(function() {
			$('.browser-warning').addClass('hidden');
		}, 6*1000);
	}

	// Display window (and start animation) when document is ready
	// This mininizes the risk of firefox messing up
	$('#window').attr('style', '');

	initAnimation();
	$(document).on('click', '.trigger-anim-replay', resetAnimation);

	function initAnimation() {
		setTimeout(function() {
			fyll.go('fill username then fill password then click submit', function() {
				$('#submit').addClass('loading');
				setTimeout(function() {
					$('#submit').addClass('done').closest('#window').addClass('flip');
				}, 1500);
			});
		}, 3*1000);
	}

	function resetAnimation() {
		var win = $('#window');

		win.stop().fadeOut(500, function() {

			// Reset things
			win.attr('style', '');
			win.find('input[type=text], input[type=password]').val('');
			win.find('.load-btn.loading').removeClass('loading done');

			// Clone and re-create window element to trigger animation restart
			win.removeClass('flip');
			win.before(win.clone(true)).remove();

			// Restart animation
			initAnimation();
		});
	}

});