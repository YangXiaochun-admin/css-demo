// 当页面加载之后
window.onload=function  () {
	// 常量 const
	const designWidh=375;
	const fontSize= 100;
	function resizeFont(){
		// 变量 var
		var CW = document.documentElement.clientWidth;
		
		var ratio = CW/designWidh;

		var newFontSize=ratio<1?fontSize*ratio:100;

		document.querySelector("html").style.fontSize= newFontSize + "px";
		
	}
	// 执行resizeFont
	resizeFont();
	// 窗口大小改变时执行resizeFont
	window.onresize= resizeFont;
	window.addEventListener("orientation",resizeFont,false);
            // 屏幕自动旋转得时候
}