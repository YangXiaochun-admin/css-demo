jQuery.fn.Focus = function(o){
				o = jQuery.extend({
					nID:"#j_FocusNav",    //左侧标题区ID
					cID:"#j_FocusCon",    //右侧图片区ID
					bID:"#j_FocusBack",	  //左侧带箭头的背景ID
					fH:293    //内容切换的高度
			  }, o);
				return this.each(function(){
					var _scrollHeight = o.fH;
					var _navDom = jQuery(o.nID);
					var _conDom = jQuery(o.cID);
					var _navs = jQuery("li", _navDom);
					var _max = _navs.size()-1;
					var _back = jQuery(o.bID);
					var _timeInterval = false;
					var _curIndex = 0;
					var _cType = "add";
					var _changeType = function(type){
						type == "add" ? _curIndex++ : _curIndex--;
					}
					var _cutover = function(){
						if (_curIndex>=_max){
							_cType = "jian";
						}
						if (_curIndex<=0){
							_cType = "add";
						}
						_changeType(_cType);
						_go(_navs.eq(_curIndex));
					}
					var _timer = function(){
						(_timeInterval)&&(clearInterval(_timeInterval));
						_timeInterval = setInterval(_cutover,6000);
					}
					var _go = function(dom){
						var _position = dom.position();
						_back.stop().animate({
							top: _position.top
						}, 500, "easeOutQuint");
						_conDom.stop().animate({
							"marginTop": -_scrollHeight * _curIndex + "px"
						}, 600, "easeInOutSine");
					}
					jQuery(this)
					.bind("mouseenter", function(){
						clearInterval(_timeInterval);
					})
					.bind("mouseleave",function(){
						_timer();
					});
					_navs
					.bind("mouseenter", function(){
						clearInterval(_timeInterval);
						var _self = jQuery(this);
						var _index = _self.attr("rel");
						_curIndex = _index;
						_go(_self);
					})
					.bind("mouseleave",function(){
						_timer();
					});
					_timer();
				});
			}