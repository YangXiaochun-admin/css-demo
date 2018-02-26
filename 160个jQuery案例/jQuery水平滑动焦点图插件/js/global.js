// jQueryJoel Global Javascript
// Author: Joel Grannas - Last updated 2/29/2012
$(document).ready(function(){
	//HEADER
	if($("#features-container").length){
		$(".nav-item:eq(0)").addClass("active");
	}
	if($(".portfolio").length || $(".category-projects").length){
		$(".nav-item:eq(1)").addClass("active");
	}
	if($(".category-labs").length){
		$(".nav-item:eq(2)").addClass("active");
	}
	if($(".content-container.about").length){
		$(".nav-item:eq(3)").addClass("active");
	}
	if($(".content-container.contact").length){
		$(".nav-item:eq(4)").addClass("active");
	}
	if(!$.browser.msie){
		//setupAJAX();	
	}
	//FOOTER
	$("a.social").hover(function(){
		$(".hover-overlay", this).stop().css("opacity","0").show().animate({
			"opacity" : 1
		}, 500);
	}, function(){
		$(".hover-overlay", this).stop().animate({
			"opacity" : 0
		}, 500, function(){
			$(this).hide();	
		});
	});
});

//AJAX LINKS / ETC
function setupAJAX(){
	//LOAD AJAX STYLESHEET
	$('head').append('<link rel="stylesheet" href="ajax.css" type="text/css" />');
	//SETUP MAIN NAV LINKS
	$(".nav-item").click(function(e){
		e.preventDefault();
		if(!$(this).hasClass("active")){
			//IF NOT ALREADY ACTIVE
			$(".nav-item").removeClass("active");
			$(this).addClass("active");
			var myPageLoc = $("a",this).attr("href");
			var myPageName = $("a", this).attr("title");
			$(".content-container").animate({
				"height" : 0
			}, 500, function(){
				//CLEAR THE ACTIVE PAGE(S)
				$(".content-container").addClass("closed");
				var activeContainer = ".content-container." + myPageName;
				if($(activeContainer).length){
					$(activeContainer).addClass("active");
					openAnimate();
				} else {
					//AJAX IN PAGE THEN ANIMATE
					$("#content-outer").load(myPageLoc + " .content-container", function(){
						alert($(this).html());
						openAnimate();
					});
				}
			});
		}
	});
}

//OPEN ANIMATION FUNCTION
function openAnimate(){
	$(".content-container.active").animate({
		"height" : 800
	}, 500, function(){
		$(this).removeAttr("style");
	});	
}

//TWITTER
function getTweets() {
	$.getJSON("http://twitter.com/statuses/user_timeline.json?screen_name=jQueryJoel&count=3&callback=?", function (a) {
		$.each(a, function (a, b) {
			ct = b.text;
			ct = ct.replace(/http:\/\/\S+/g, "<a href='$&' target='_blank'>$&</a>");
			ct = ct.replace(/\s(@)(\w+)/g, " @<a onclick='javascript:pageTracker._trackPageview('/outgoing/twitter.com/');' href='http://twitter.com/$2' target='_blank'>$2</a>");
			ct = ct.replace(/\s(#)(\w+)/g, " #<a onclick='javascript:pageTracker._trackPageview('/outgoing/search.twitter.com/search?q=%23');' href='http://search.twitter.com/search?q=%23$2' target='_blank'>$2</a>");
			$("#js-tweets").append("<li class='tweet'>" + ct + "</li>")
		})
	})
}

window.onload = function(){
	//IF ON HP RUN TWITTER
	if($("#features-container").length){
		getTweets();
	}
}
