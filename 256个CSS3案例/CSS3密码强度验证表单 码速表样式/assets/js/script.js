$(function(){
	
	var pass1 = $('#password1'),
		pass2 = $('#password2'),
		email = $('#email'),
		form = $('#main form'),
		arrow = $('#main .arrow');

	// Empty the fields on load
	$('#main .row input').val('');

	// Handle form submissions
	form.on('submit',function(e){
		
		// Is everything entered correctly?
		if($('#main .row.success').length == $('#main .row').length){
			
			// Yes!
			alert("Thank you for trying out this demo!");
			e.preventDefault(); // Remove this to allow actual submission
			
		}
		else{
			
			// No. Prevent form submission
			e.preventDefault();
			
		}
	});
	
	// Validate the email field
	email.on('blur',function(){
		
		// Very simple validation
		if (!/^\S+@\S+\.\S+$/.test(email.val())){
			email.parent().addClass('error').removeClass('success');
		}
		else{
			email.parent().removeClass('error').addClass('success');
		}
		
	});

	// Use the complexify plugin on the first password field
	pass1.complexify({minimumChars:6, strengthScaleFactor:0.7}, function(valid, complexity){
		
		if(valid){
			pass2.removeAttr('disabled');
			
			pass1.parent()
					.removeClass('error')
					.addClass('success');
		}
		else{
			pass2.attr('disabled','true');
			
			pass1.parent()
					.removeClass('success')
					.addClass('error');
		}
		
		var calculated = (complexity/100)*268 - 134;
		var prop = 'rotate('+(calculated)+'deg)';
		
		// Rotate the arrow
		arrow.css({
			'-moz-transform':prop,
			'-webkit-transform':prop,
			'-o-transform':prop,
			'-ms-transform':prop,
			'transform':prop
		});
	});
	
	// Validate the second password field
	pass2.on('keydown input',function(){
		
		// Make sure its value equals the first's
		if(pass2.val() == pass1.val()){
			
			pass2.parent()
					.removeClass('error')
					.addClass('success');
		}
		else{
			pass2.parent()
					.removeClass('success')
					.addClass('error');
		} 
	});
	
});
