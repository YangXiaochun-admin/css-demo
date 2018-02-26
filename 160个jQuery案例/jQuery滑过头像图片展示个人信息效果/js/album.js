// JavaScript Document
var Album = (function($){
	function album(o){
		this.int(o)
	};
	album.prototype = {
		int: function(o){
			var that = this;
			this.aImg = $(o).find('img');
			this._css = null;
			this.iLoad = 0;
			this.zoom = 1.5;
			this.i=0;
			this.ok = false;
			this.aEm = $('em',$(o));
			this.tLayer = null;
			this.aImg.each(function(){
				$(this).load(function(){
					that.iLoad++;
					if(that.iLoad==that.aImg.length&&!that.ok){
						that.pos(o);
					}
				})
			});
			setTimeout(function(){
				if(!that.ok){that.pos(o);}
			},2000);
		},
		pos:function(o){
			var that = this;
			that.ok = true;
			$('a',$(o)).each(function(){
				var oP = $(this).parent();
				var oS = $(this).siblings('.Album_info');
				oP.css({'width':$('img',this).width(),'height':$('img',this).height()})
				$(this).css({'top':oP.position().top,'left':oP.position().left});
				$('em',this).css({'height':oP.height(),'filter': 'alpha(opacity=50)'});
				if($(o).width()-oP.position().left>=$(this).width()*6){
					oS.css({'height':Math.round($(this).height()*that.zoom)+4,'left':oP.position().left-2,'right':'auto','padding-left':Math.round($(this).width()*that.zoom)})
				}else{
					oS.css({'height':$(this).height()*that.zoom+4,'right':$(o).width()-oP.position().left-$(this).width()-2,'left':'auto','padding-right':Math.round($(this).width()*that.zoom),'text-align':'right'})
				}
				if(oP.position().top>=Math.round($(this).height()*(that.zoom-1)/2)&&$(o).height()-oP.position().top-$(this).height()>=Math.round($(this).height()*(that.zoom-1)/2)){
					oS.css('top',oP.position().top-Math.round($(this).height()*(that.zoom-1)/2)-2)
				}else if(oP.position().top<Math.round($(this).height()*(that.zoom-1)/2)){
					oS.css('top',$(this).parent().position().top-2)
				}else{
					oS.css('top',$(this).parent().position().top-Math.round($(this).height()*(that.zoom-1)+2))
				}
			});
			this.showImg(o)
		},
		showImg: function(o){
			var that = this;
			$('li',$(o)).each(function(){
				$('a',this).css({'visibility':'visible','display':'none'}).fadeIn(1000);
			})
			setTimeout(function(){
				$(o).css({'background':'none'});
				that.hover(o);
			},1000)			
		},
		hover: function(o){
			var that = this;
			$('a',$(o)).hover(function(){
				var oP = $(this).parent();
				var oS = $(this).siblings('.Album_info');
				$('em',this).hide();
				if(that.tLayer){clearTimeout(that.tLayer);that.tLayer = null}
				that.aEm.not($('em',this)).each(function(){
					if(!$(this).is(':visible')){
						$(this).fadeIn(200)
					}
				});
				oS.show().animate({width:$(this).width()*6-Math.round($(this).width()*that.zoom)+7},300);
				that._css = {'top':oP.position().top,'z-index':$(this).css('z-index'),'width':$(this).width(),'height':$(this).height(),'left':$(this).css('left'),'right':$(this).css('right')};
				if($(o).width()-oP.position().left>=$(this).width()*6){
					$(this).css({'right':'auto','left':parseInt(oS.css('left'))+2})		
				}else{
					$(this).css({'right':parseInt(oS.css('right'))+2,'left':'auto'})	
				}
				$(this).css({'top':parseInt(oS.css('top'))+2,'width':$(this).width()*that.zoom,'height':$(this).height()*that.zoom,'z-index':$(this).css('z-index')+100})	
				$(this).children('img').css({'width':$(this).width(),'height':$(this).height()})
				
			},function(){
				$('.Album_info').hide().css({'width':'auto'}).stop();
				$(this).css(that._css);
				$(this).children('img').css({'width':that._css.width,'height':that._css.height})
				that.tLayer = setTimeout(function(){
					that.aEm.fadeOut(200)	
				},200)
			})
		}	
	}
	return {
		set: function(o){
			new album(o)
		}
	}
})(jQuery)
