// JavaScript Document

/*
	Design by: Wabdesigner - themeforest.net/user/WabDesigner
	Code by: Umit Karaosmanoglu - www.umitkaraosmanoglu.com
*/


$(window).load(function(){

	var $container = $('.portfolio');
	
	$container.isotope({
		filter: '*',
		animationOptions: {
			duration: 750,
			easing: 'linear',
			queue: false,
			layoutMode : 'masonry',
			masonry: {
				columnWidth: 284,
				gutterWidth: 284
			  }
		}
	});
	//$('.recentWorks .work:nth-child(3n)').css({marginRight:0});

	$('ul.portfolioCategories li a').click(function(){
		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});
	  return false;
	});
	
	$('.allWorks').click(function(){
		$container.isotope({ filter: '*' });
	});
});

$(document).ready(function() {
	// jquery scripts
	
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools:""
	});
	
	/* warning */
	$('.warning').slideDown(700);
	$('.warningClose').click(function(){
		$('.warning').slideUp(700);
	});
	
	// margin fixes
	$('.topMenuLeft li:last, .topMenuRight li:last,.mainNav .mainNavCenter ul li:last').css({marginRight:0,borderRight:0,paddingRight:0});
	$('.imgSliderPagination li:last, .recentWorks .work:nth-child(3n), .areas:last, .col3 p:nth-child(3n), .pagination ul li:last, .portfolioCategories li:last').css({marginRight:0});
	$('.portfolio .work').css({marginRight:50});
	$('.workInfo li:last, .accordion .item:last').css({marginBottom:0});
	
	$('.areas').each(function(){
		$(this).find('ul li:last').css({marginBottom:0});
	});
	
	$('.recentWorks .work:last .moreLink').css({marginTop:-14});
	
	/* IE fixes */
	if($.browser.version >= '9.0') { 
		var sTitle = $('.sFlickr').text();
		$('.sFlickr').html('<span style="margin-top:2px;float:left;">'+sTitle+'</span>');
	}

	
	/* homepage image slider */
	$(".imgSlider").slides({
		preload: true,
		preloadImage: 'images/loader.gif',
		container: 'imgSliderC',
		next: 'imgSliderNext',
		prev: 'imgSliderPrev',
		paginationClass: 'imgSliderPagination',
		currentClass: 'imgSliderCurrent',
		generateNextPrev: false,
		generatePagination: false,
		slideSpeed: 700,
		play: 10000
	});
	
	/* blog sidebar work slider */
	$(".workSlider").slides({
		preload: true,
		preloadImage: 'images/loader.gif',
		container: 'workSliderC',
		generateNextPrev: false,
		generatePagination: false,
		slideSpeed: 2000,
		effect: 'fade',
		play: 5000
	});
	
	/* accordion */
	$(".accordion .item span").click(function(){
		if($(this).hasClass("current")){
			$(".accordion .item span").removeClass('current');
			$(this).next('.accordion .item .pane').slideUp('slow');
		}
		else{
			$(".accordion .item span").removeClass('current');
			$(".accordion .item .pane").slideUp('slow');
			$('.testUser em').hide();
			
			$(this).next('.accordion .item .pane').slideDown('slow');
			$(this).addClass('current');
			$(this).parent().find('.testUser em').show();
		}
	});
	
	$(".accordion .item").each(function(){
		if($(this).find('span').hasClass('current')){
			$(this).find('.testUser em').show();
		} else {
			$(this).find('.testUser em').hide();
		}
	});
	
	/* blog p margin */
	$('.post .postMain').each(function(){
		pCount = $(this).children('p').length;
		if(pCount == 2){
			$(this).find('p:first').not('.forms p, .comment p').css({marginBottom:30});
		} else {
			$(this).find('p').not('.forms p, .comment p').css({marginBottom:30});
		}
	});
	
	/* blog archive post bg */
	$('.postBar').each(function(){
		postNumber = 0;
		postNumber = $(this).find('p span').html();
		postNumber = postNumber * 10;
		$(this).find('.postNumberBar').css({width:postNumber});
	});
	
	/* postfolio category links active */
	$('.portfolioCategories li a').click(function(){
		if($(this).hasClass('activeWork') == false){
			$('.portfolioCategories li a').removeClass('activeWork');
			$(this).addClass('activeWork');
		} else {
			$(this).removeClass('activeWork');
		}
	});
	
	blogImage();
	portfolio();
	
	// recent works zoom icon hover
	$('.recentWorks .work .zoomIcon').css({opacity:0});
	$('.recentWorks .work').hover(function(){
		$(this).find('.zoomIcon').css({top:0});
		$(this).find('.zoomIcon').animate({top:55,opacity:1},250);
	},function(){
		$(this).find('.zoomIcon').animate({top:140,opacity:0},250);
	});
	
	/* form validation */
	$('#contactForm').validate({
		rules:{
			required: true,
			email: {
				required: true,
				email: true
			}
		}
	});
	
	$('#quickContact').validate({
		rules:{
			required: true,
			email: {
				required: true,
				email: true
			}
		}
	});
	
	$('#commentForm').validate({
		rules:{
			required: true,
			email: {
				required: true,
				email: true
			}
		}
	});
	
});

function blogImage(){	
	var projectDetails = $('.postHeader');
	projectDetails.each(function(){
		$(this).find('.zoomIcon').css({'opacity':'0','top':'156','left':'250'});
		$(this).find('.blogIcon').css({'opacity':'0','top':'156','left':'250'});
	});		
	projectDetails.each(function(){
		$(this).hover(function(){
			$(this).find('.zoomIcon').stop().animate({'opacity':1,'top':98,'left':210}, 200, 'swing');
			$(this).find('.blogIcon').stop().animate({'opacity': 1,'top':98,'left':280}, 200, 'swing');
		}, function(){
			$(this).find('.zoomIcon').stop().animate({'opacity': 0,'top':156,'left':250}, 400, 'swing');
			$(this).find('.blogIcon').stop().animate({'opacity': 0,'top':156,'left':250}, 400, 'swing');
		});	
	});							 
}

function portfolio(){	
	var projectDetails = $('.portAlt .work');
	projectDetails.each(function(){
		$(this).find('.zoomIcon').css({'opacity':'0','top':'156','left':'120'});
		$(this).find('.blogIcon').css({'opacity':'0','top':'156','left':'120'});
	});		
	projectDetails.each(function(){
		$(this).hover(function(){
			$(this).find('.zoomIcon').stop().animate({'opacity':1,'top':98,'left':80}, 200, 'swing');
			$(this).find('.blogIcon').stop().animate({'opacity': 1,'top':98,'left':150}, 200, 'swing');
		}, function(){
			$(this).find('.zoomIcon').stop().animate({'opacity': 0,'top':156,'left':120}, 400, 'swing');
			$(this).find('.blogIcon').stop().animate({'opacity': 0,'top':156,'left':120}, 400, 'swing');
		});	
	});							 
}
