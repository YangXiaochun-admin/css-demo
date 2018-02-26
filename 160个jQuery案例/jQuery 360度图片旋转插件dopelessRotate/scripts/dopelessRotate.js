/*!
 * Dopeless Rotate - jQuery Plugin
 * version: 0.9beta (23/07/2012)
 *
 * Documentation and license http://www.dopeless-design.de/dopeless-rotate-jquery-plugin-for-360-degree-product-view.html
 *
 * (c) 2012 Dopeless Design (Rostyslav Chernyakhovskyy) - mail@dopeless-design.de
 */

(function( $ ){
	
var is_touch_device = 'ontouchstart' in document.documentElement;
	
$.fn.tsRotate = function( options ) {  
    var settings = $.extend( {
    	'zoom' : true,
    	'reverse' : false,
    	'disablelogo' : false,
    	'startfrom' : 0,
        'zoomfolder' : 'zoomimages',
        'pathtophp' : 'dopelessRotate/scripts/'
    }, options);
    
    var zoomDiv = (settings.zoom) ? '<div class="zoom"></div>' : '';
    var direction = (settings.reverse) ? -1 : 1;
	var addLogo = (settings.disablelogo) ? '' : '<a id="dopeless_rotate_logo" title="Dopeless Rotate Plugin Home" target="_blank" href="http://www.dopeless-design.de/dopeless-rotate-jquery-plugin-360-degrees-product-viewer.html">Dopeless Rotate</a>';
	var currentFrame = settings.startfrom;
	var startFrame = settings.startfrom;
	var zoomfolder = settings.zoomfolder;
	var pathtophp = settings.pathtophp;
	
	var fullpath = $(this)[0].src;
	var a = document.createElement('a');
	a.href = fullpath;
	var imgpath = a.pathname + a.search;
	
	var thisName = $(this).attr('id');
	var contWidth = $(this).attr('width');
	var contHeight = $(this).attr('height');
	
	$(this).wrap('<div class="ts_holder" id="holder_'+thisName+'"/>');
	
	var doc = $(document);
	var holder = $('#holder_'+thisName+'');
	holder.html("<img class='ts_img_view' src='' /><img class='ts_imgzoom_view' src='' /><div class='round'><div class='pointer_object'></div><div class='pointer'></div></div>"+zoomDiv+"<div class='loading_bg'><div class='loading'><p>loading</p><div class='loading_bar'><div class='loading_bar_inside'></div></div></div></div><div class='zoomload_bg'><div class='zoomload_gif'></div></div></div>"+addLogo);
	var image = $(holder).find('.ts_img_view');
	var imagezoom = $(holder).find('.ts_imgzoom_view');
	var round = $(holder).find('.round');
	var contOffset = holder.offset();
	var setRoundWidth = Math.ceil(contWidth/5);
	var setPointerWidth = Math.ceil(setRoundWidth/10);
	var rotCenter = setRoundWidth/2 - setPointerWidth/2 -1;
	var rotRadius = setRoundWidth/2 - setPointerWidth;
	var setPointerObjectWidth = setRoundWidth/2-setPointerWidth*2;
	var setPointerObjectOffset = (setRoundWidth - setPointerObjectWidth)/2;
	var zoomLoadLeft = Math.round((contWidth-220)/2);
	var zoomLoadTop = Math.round((contHeight-20)/2);
	var loadingWidth = Math.round(contWidth/100*40);
	var loadingHeight = 72;
	var loadingLeft = Math.round((contWidth-loadingWidth)/2)
	var loadingTop = Math.round((contHeight-loadingHeight)/2);
	var loadingBarWidth = Math.round(loadingWidth/100*80);
	var loadingBarLeft = Math.round((loadingWidth-loadingBarWidth)/2);
	var loadingBarBottom = Math.round(loadingHeight/100*15);
	var loadingBarInsideFWidth = loadingBarWidth - 4;
	var loadingBarInsideWidth;
	
	holder.bind('dragstart', function(event) { event.preventDefault() });
	holder.children().bind('dragstart', function(event) { event.preventDefault() });
	holder.css({'width':contWidth, 'height':contHeight});
	_css('.loading_bg, .zoomload_bg',{'width':contWidth, 'height':contHeight});
	_css('.zoomload_gif',{'left':zoomLoadLeft, 'top':zoomLoadTop});
	_css('.loading',{'width':loadingWidth, 'height':loadingHeight, 'left':loadingLeft, 'top':loadingTop});
	_css('.loading_bar',{'width':loadingBarWidth, 'left':loadingBarLeft, 'bottom':loadingBarBottom});
	_css('.round',{'width':setRoundWidth, 'height':setRoundWidth});
	_css('.pointer',{'width':setPointerWidth, 'height':setPointerWidth, 'left':rotCenter, 'top':rotCenter*2});
	_css('.zoom',{'top':setRoundWidth+setRoundWidth/10+10, 'right':(setRoundWidth-30)/2-3});
	_css('.pointer_object',{'width':setPointerObjectWidth, 'height':setPointerObjectWidth, 'left':setPointerObjectOffset, 'top':setPointerObjectOffset});
	holder.find('.loading_bg').fadeIn();	
	
	function _css(elem,rules){
		holder.find(elem).css(rules);
	}
	
	var imagelist;
	var zoomlist;
	var countFrames;
	var zoomon;
	$.getJSON(pathtophp+"/loadimages.php", {fname:imgpath, zoomdir:zoomfolder}, function(output) {
		imagelist = jQuery.makeArray(output.imagelist);
		zoomlist = jQuery.makeArray(output.zoomlist);
		countFrames = imagelist.length;
		preload(imagelist,countFrames);
	});	
	
	function preload(arrayOfImages,countFrames) {
		
		var perc = 0;
		var thisFrame = 0;
		var cache = [];
		
		$(arrayOfImages).each(function(){
			
			var im = $("<img>").attr("src",this).load(function() {
				perc = perc + 100/countFrames;
				loadingBarInsideWidth = Math.round(loadingBarInsideFWidth/100*perc);
				$(holder).find('.loading_bar_inside').css('width',loadingBarInsideWidth);
				if(Math.round(perc) == 100){
					$(holder).find('.loading_bg').fadeOut();
					$(holder).find('.round, .zoom').fadeIn();
				}
			});
			
			thisFrame++;
			image.attr('src', this);
			cache.push(im);
			
		});
		image.attr('src', arrayOfImages[currentFrame]);
		setPointer();
	}

	function setPointer(){
		var corner = Math.floor(360/countFrames)*direction;						
		var degrees = corner*currentFrame;								
		var radians=degrees*Math.PI/180;
		var sine=Math.sin(radians);
		var cose=Math.cos(radians);
		var poinx = rotCenter+rotRadius*sine*-1;
		var poiny = rotCenter+rotRadius*cose;
		_css('.pointer',{'left':poinx, 'top':poiny});
	}
	
	function rotateImg(enterPosition){	
		doc.on('mousemove.dragrotate', function(e){
			var cursorPosition = e.pageX - contOffset.left;
			var xOffset = cursorPosition - enterPosition;
			var step = Math.round(contWidth/countFrames)*direction;
			var frameOffset = Math.round(xOffset/step);
			var cycles = Math.abs(Math.floor((frameOffset+startFrame)/countFrames));
			currentFrame = startFrame + frameOffset;
			if(currentFrame >= countFrames){
				currentFrame = currentFrame - countFrames*cycles;
			}		
			if(currentFrame < 0){
				currentFrame = countFrames*cycles + currentFrame;
			}
			image.attr('src', imagelist[currentFrame]);
			setPointer();
		});
		doc.on('mouseup.dragrotate', function(){
			startFrame = currentFrame;
			doc.off('.dragrotate');
		});
	}
	
	function rotateImgMobile(enterPosition){	
		holder.on('touchmove.dragrotatemob', function(mobileEvent) {
			var event = window.event;
			var cursorPosition = event.touches[0].pageX - contOffset.left;
			var xOffset = cursorPosition - enterPosition;
			var step = Math.round(contWidth/countFrames)*direction;
			var frameOffset = Math.round(xOffset/step);
			var cycles = Math.abs(Math.floor((frameOffset+startFrame)/countFrames));
			currentFrame = startFrame + frameOffset;
			if(currentFrame >= countFrames){
				currentFrame = currentFrame - countFrames*cycles;
			}		
			if(currentFrame < 0){
				currentFrame = countFrames*cycles + currentFrame;
			}
			image.attr('src', imagelist[currentFrame]);
			setPointer();
  		});
  		holder.on('touchend.dragrotatemob', function(mobileEvent) {
  			startFrame = currentFrame;
			holder.off('.dragrotatemob');
  		});
  		
	}
	
	function zoomImg(startXpos,startYpos,offset){
		zoomon = true;
		var zoomloading = true;
		holder.find('.round').fadeOut();
		holder.find('.zoom').fadeOut();  
		var zoomImg = new Image();
		zoomImg.src = zoomlist[currentFrame];
		if (zoomImg.complete || zoomImg.readystate === 4) {
		}
		else {
			holder.find('.zoomload_bg').fadeIn();
		}
		zoomImg.onload = function() {
			zoomHeight = zoomImg.height;
			zoomWidth = zoomImg.width;
			var leftOverflow = (zoomWidth - contWidth)/-2;
			var topOverflow = (zoomHeight - contHeight)/-2;
			imagezoom.attr('src', zoomlist[currentFrame]);
			imagezoom.css({'left':leftOverflow, 'top':topOverflow});
	
			image.animate({
				width: zoomWidth,
				height: zoomHeight,
				left:leftOverflow,
				top:topOverflow
				}, 100, 'linear', function() {
					imagezoom.animate({
					width: zoomWidth,
					height: zoomHeight,
						left:leftOverflow,
						top:topOverflow
						}, 100, 'linear', function() {
							imagezoom.fadeIn(100);
						});
					});

			holder.find('.zoomload_bg').fadeOut();
			holder.addClass('zoomout');
			var zoomloading = false;

			holder.on('mousemove.dragpan', (function(e){
				var currentXpos = e.pageX - offset.left;
				var currentYpos = e.pageY - offset.top;
				var xlimit = (zoomWidth-contWidth)*-1;
				var ylimit = (zoomHeight-contHeight)*-1;

				var xSpeedCoeff = Math.floor(zoomWidth/contWidth);
				var ySpeedCoeff = Math.floor(zoomHeight/contHeight);
				var moveLeft = startXpos - currentXpos;
				var moveTop = startYpos - currentYpos;
				var leftOffset = leftOverflow + moveLeft*xSpeedCoeff;
				var topOffset = topOverflow + moveTop*ySpeedCoeff;
				var hMoveLock = false;
				var vMoveLock = false;
					
				if(leftOffset >= 0){
					hMoveLock = true;
					startXpos = startXpos - leftOffset;
				} 
				if(leftOffset <= xlimit){
					hMoveLock = true;
					startXpos = startXpos - leftOffset + xlimit;	
				}
				if(topOffset >= 0){
					vMoveLock = true;
					startYpos = startYpos - topOffset;
				} 
				if(topOffset <= ylimit){
					vMoveLock = true;
					startYpos = startYpos - topOffset + ylimit;	
				}
				if(!hMoveLock) {
					imagezoom.css('left', leftOffset);
				}
				if(!vMoveLock) {
					imagezoom.css('top', topOffset);
				}
			}));
			doc.on('mousedown.zoomof', (function(){
				if(!zoomloading){
					holder.off('.dragpan');
					holder.off('mousedown.zoomof');
					image.attr('src', imagelist[currentFrame]);
					image.css({
						'left':0,
						'top':0,
						'width':contWidth,
						'height':contHeight
					});
					imagezoom.animate({
						width: contWidth,
						height: contHeight,
						left:0,
						top:0
						}, 100, 'linear', function() {
							imagezoom.fadeOut(100);
							});
					holder.find('.round').fadeIn();
					holder.find('.zoom').fadeIn();			
					holder.removeClass('zoomout');
					zoomon = false;
				}
			}));
		};	
	}
	
	
	function zoomMoveMobile(startXpos,startYpos,offset,leftOverflow,topOverflow){
		var sieventm = window.event;
		var currentXpos = sieventm.touches[0].pageX - offset.left;
		var currentYpos = sieventm.touches[0].pageY - offset.top;	
		var xlimit = (zoomWidth-contWidth)*-1;
		var ylimit = (zoomHeight-contHeight)*-1;
		var xSpeedCoeff = Math.floor(zoomWidth/contWidth);
		var ySpeedCoeff = Math.floor(zoomHeight/contHeight);
		var moveLeft = startXpos - currentXpos;
		var moveTop = startYpos - currentYpos;
		var leftOffset = leftOverflow + moveLeft*xSpeedCoeff*-1;
		var topOffset = topOverflow + moveTop*ySpeedCoeff*-1;
			if(leftOffset >= 0){
				leftOffset = 0;
			}
			if(leftOffset <= xlimit){
				leftOffset = xlimit;
			}
			if(topOffset >= 0){
				topOffset = 0;
			}
			if(topOffset <= ylimit){
				topOffset = ylimit;
			}
			imagezoom.css('left', leftOffset);
			imagezoom.css('top', topOffset);
		holder.on('touchend.zoomendmob',(function(){
					holder.off('.mobdragpan');
					newleftOverflow = leftOffset;
					newtopOverflow = topOffset;
				}));
	}
	
	var newleftOverflow;
	var newtopOverflow;
	
	function zoomImgMobile(offset){
		zoomon = true;
		var zoomloading = true;
		holder.find('.round').fadeOut();
		$('.zoom').fadeOut();  
		var zoomImg = new Image();
		zoomImg.src = zoomlist[currentFrame];
		if (zoomImg.complete || zoomImg.readystate === 4) {
		}
		else {
			$(holder).find('.zoomload_bg').fadeIn();
		}
		
		zoomImg.onload = function() {
			zoomHeight = zoomImg.height;
			zoomWidth = zoomImg.width;
			
			var leftOverflow = (zoomWidth - contWidth)/-2;
			var topOverflow = (zoomHeight - contHeight)/-2;
			
			
				
			imagezoom.attr('src', zoomlist[currentFrame]);
			imagezoom.css({'left':leftOverflow,'top':topOverflow});
			
			image.animate({
				width: zoomWidth,
				height: zoomHeight,
				left:leftOverflow,
				top:topOverflow
				}, 100, 'linear', function() {
					imagezoom.animate({
					width: zoomWidth,
					height: zoomHeight,
						left:leftOverflow,
						top:topOverflow
						}, 100, 'linear', function() {
							imagezoom.fadeIn(100);
						});
					});
			
			
			holder.find('.zoomload_bg').fadeOut();
			holder.addClass('zoomout');
			var zoomloading = false; 
			holder.on('touchstart.dragstartmob',(function(){
				if(typeof newleftOverflow !== 'undefined'){
					leftOverflow = newleftOverflow;
				}
				if(typeof newtopOverflow !== 'undefined'){
					topOverflow = newtopOverflow;
				}
				var seventm = window.event;
		        var startXpos = seventm.touches[0].pageX - offset.left;
				var startYpos = seventm.touches[0].pageY - offset.top;
					holder.on('touchmove.mobdragpan', (function(e){
						e.preventDefault();
						zoomMoveMobile(startXpos,startYpos,offset,leftOverflow,topOverflow);
					}));
				
			}));
			
			holder.on('click.zoomofmob', (function(){
				if(!zoomloading){
					holder.off('.zoomendmob');
					holder.off('.dragstartmob');
					image.attr('src', imagelist[currentFrame]);
					image.css({'left':0,'top':0,'width':contWidth,'height':contHeight});
					imagezoom.animate({
						width: contWidth,
						height: contHeight,
						left:0,
						top:0
						}, 100, 'linear', function() {
							imagezoom.fadeOut(100);
							});
					$(holder).find('.round').fadeIn();
					$('.zoom').fadeIn();			
					holder.removeClass('zoomout');
					zoomon = false;
				}
			}));
		};	
	}
	
	if(!is_touch_device){
		holder.on('mousedown.initrotate', function(e){
			if(!zoomon){
				var enterPosition = e.pageX - contOffset.left;
				rotateImg(enterPosition);
			}
		});
		
		holder.find('.zoom').on('click.initzoom', function(e){
			var offset = holder.offset();
			var startXpos = e.pageX - offset.left;
			var startYpos = e.pageY - offset.top;
			zoomImg(startXpos,startYpos,offset);
		});
	}
	
	if(is_touch_device){
	
		holder.on('touchstart.initrotatemob', function(mobileEvent){
			if(!zoomon){
				mobileEvent.preventDefault();
				var sevent = window.event;
				var enterPosition = sevent.touches[0].pageX - contOffset.left;
				rotateImgMobile(enterPosition);
			}
		});
	
		holder.find('.zoom').on('touchstart.initzoommob', function(mobileEvent){
			mobileEvent.preventDefault();
			var offset = holder.offset();
			zoomImgMobile(offset);	
		});	
	}
};
})( jQuery );