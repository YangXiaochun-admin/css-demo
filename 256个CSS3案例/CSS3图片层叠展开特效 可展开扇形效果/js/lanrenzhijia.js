/* 代码整理：懒人之家 www.lanrenzhijia.com */
$(document).ready(function() { 
$(".image_stack").delegate('img', 'mouseenter', function() {//when user hover mouse on image with div id=stackphotos 
		if ($(this).hasClass('stackphotos')) {//
		// the class stackphotos is not really defined in css , it is only assigned to each images in the photo stack to trigger the mouseover effect on  these photos only 
			
			var $parent = $(this).parent();
$parent.find('img#photo1').addClass('rotate1');//add class rotate1,rotate2,rotate3 to each image so that it rotates to the correct degree in the correct direction ( 15 degrees one to the left , one to the right ! )
$parent.find('img#photo2').addClass('rotate2');
$parent.find('img#photo3').addClass('rotate3');
$parent.find('img#photo1').css("left","150px"); // reposition the first and last image 
$parent.find('img#photo3').css("left","50px");

/* 代码整理：懒人之家 www.lanrenzhijia.com */

		}
	})
	.delegate('img', 'mouseleave', function() {// when user removes cursor from the image stack
		$('img#photo1').removeClass('rotate1');// remove the css class that was previously added to make it to its original position
			$('img#photo2').removeClass('rotate2');
			$('img#photo3').removeClass('rotate3');
			$('img#photo1').css("left","");// remove the css property 'left' value from the dom
$('img#photo3').css("left","");
		
	});;
});

/* 代码整理：懒人之家 www.lanrenzhijia.com */
