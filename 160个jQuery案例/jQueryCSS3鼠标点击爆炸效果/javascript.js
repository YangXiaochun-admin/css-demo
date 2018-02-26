$(document).ready(function() {
		
	// Generate the clips. In this case I'm using 5 (or 25 pieces)
	(genClips = function() {
		
		// For easy use
		$t = $('.clipped-box');
		
		// Like I said, we're using 5!
		var amount = 5;
		
		// Get the width of each clipped rectangle.
		var width = $t.width() / amount;
		var height = $t.height() / amount;
		
		// The total is the square of the amount
		var totalSquares = Math.pow(amount, 2);
		
		// The HTML of the content
		var html = $t.find('.content').html();
		
		var y = 0;
		
		for(var z = 0; z <= (amount*width); z = z+width) { 
		
			$('<div class="clipped" style="clip: rect('+y+'px, '+(z+width)+'px, '+(y+height)+'px, '+z+'px)">'+html+'</div>').appendTo($t);
			
			if(z === (amount*width)-width) {
			
				y = y + height;
				z = -width;
			
			}
			
			if(y === (amount*height)) {
				z = 9999999;
			}
			
		}
		
	})();
	
	// A quick random function for selecting random numbers
	function rand(min, max) {
		
		return Math.floor(Math.random() * (max - min + 1)) + min;
		
	}
	
	// A variable check for when the animation is mostly over
	var first = false,
		clicked = false;
	
	// On click
	$('.clipped-box div').on('click', function() {
		
		if(clicked === false) {
			
			clicked = true;
			
			$('.clipped-box .content').css({'display' : 'none'});	
	
			// Apply to each clipped-box div.
			$('.clipped-box div:not(.content)').each(function() {
				
				// So the speed is a random speed between 90m/s and 120m/s. I know that seems like a lot
				// But otherwise it seems too slow. That's due to how I handled the timeout.
				var v = rand(120, 90),
					angle = rand(80, 89), // The angle (the angle of projection) is a random number between 80 and 89 degrees.
					theta = (angle * Math.PI) / 180, // Theta is the angle in radians
					g = -9.8; // And gravity is -9.8. If you live on another planet feel free to change
					
				// $(this) as self
				var self = $(this);
				
				// time is initially zero, also set some random variables. It's higher than the total time for the projectile motion
				// because we want the squares to go off screen. 
				var t = 0,
					z, r, nx, ny,
					totalt =  15;
				
				// The direction can either be left (1), right (-1) or center (0). This is the horizontal direction.
				var negate = [1, -1, 0],
					direction = negate[ Math.floor(Math.random() * negate.length) ];
				
				// Some random numbers for altering the shapes position
				var randDeg = rand(-5, 10), 
					randScale = rand(0.9, 1.1),
					randDeg2 = rand(30, 5);
				
				// Because box shadows are a bit laggy (by a bit I mean 'box shadows will not work on individual clipped divs at all') 
				// we're altering the background colour slightly manually, in order to give the divs differentiation when they are
				// hovering around in the air.
				var color = $(this).css('backgroundColor').split('rgb(')[1].split(')')[0].split(', '),
					colorR = rand(-20, 20),  // You might want to alter these manually if you change the color
					colorGB = rand(-20, 20),  // To get the right consistency.
					newColor = 'rgb('+(parseFloat(color[0])+colorR)+', '+(parseFloat(color[1])+colorGB)+', '+(parseFloat(color[2])+colorGB)+')';
				
				
				// And apply those
				$(this).css({
					'transform' : 'scale('+randScale+') skew('+randDeg+'deg) rotateZ('+randDeg2+'deg)', 
					'background' : newColor
				});
				 
				// Set an interval
				z = setInterval(function() { 	
					
					// Horizontal speed is constant (no wind resistance on the internet)
					var ux = ( Math.cos(theta) * v ) * direction;
					
					// Vertical speed decreases as time increases before reaching 0 at its peak
					var uy = ( Math.sin(theta) * v ) - ( (-g) * t);
					
					// The horizontal position
					nx = (ux * t);
							
					// s = ut + 0.5at^2
					ny = (uy * t) + (0.5 * (g) * Math.pow(t, 2));
					
					// Apply the positions	
					$(self).css({'bottom' : (ny)+'px', 'left' : (nx)+'px'});
					
					// Increase the time by 0.10
					t = t + 0.10;
					
					// If the time is greater than the total time clear the interval
					if(t > totalt) {
						
						clicked = false;
						first = true;
						
						
						$('.clipped-box').css({'top' : '-1000px', 'transition' : 'none'});
						$(self).css({'left' : '0', 'bottom' : '0', 'opacity' : '1', 'transition' : 'none', 'transform' : 'none'});
					
								
						// Finally clear the interval
						clearInterval(z);
					
					}
					
				}, 10); // Run this interval every 10ms. Changing this will change the pace of the animation
		
			});
			
		}
	
	});
	
				
				
	r = setInterval(function() {
				
				
		// This is a bit rough but it does the job
		if(first === true) {
				
	
			// I've just put this in so the deleted box will come down again after its been clicked.
			// That way you can keep pressing delete.
							
			$('.clipped-box').css({'top' : '0', 'transition' : ''});
			$('.clipped-box div').css({'opacity' : '1', 'transition' : '', 'background-color' : ''});
						
			$('.content').css({'display' : 'block'});
				
			first = false;
			
		}
				
	}, 300);
});
