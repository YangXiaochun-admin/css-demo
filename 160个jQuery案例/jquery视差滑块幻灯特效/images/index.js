window.onload = function()
{
	var oImgBox = getByClass(document.body,'pxs_slider_wrapper')[0];
	var oImg = getByClass(document.body,'pxs_slider')[0];
	var aLi = oImg.getElementsByTagName('li');
	var aImg = oImg.getElementsByTagName('img');
	
	//各种背景
	var bg1 = getByClass(document.body,'pxs_bg1')[0];
	var bg2 = getByClass(document.body,'pxs_bg2')[0];
	var bg3 = getByClass(document.body,'pxs_bg3')[0];
	
	var oPrev = getByClass(document.body,'pxs_next')[0];
	var oNext = getByClass(document.body,'pxs_prev')[0];
	
	var oImg_sm = getByClass(document.body,'pxs_thumbnails')[0];
	var aImg_li = oImg_sm.getElementsByTagName('li');
	var aImg_sm = oImg_sm.getElementsByTagName('img');
	
	var iNow = 0;
	
	oImg.style.width = aLi.length * document.documentElement.clientWidth + 'px';
	
	for(var i=0; i<aLi.length;i++)
	{
		aLi[i].style.width = document.documentElement.clientWidth + 'px';
	}
	
	oPrev.style.left = document.documentElement.clientWidth /2 + aImg[0].offsetWidth /2  - oPrev.offsetWidth - 14 + 'px';
	oNext.style.left = document.documentElement.clientWidth /2 - aImg[0].offsetWidth /2  + oPrev.offsetWidth - 15 + 'px';
	
	oImg_sm.style.width = aImg[0].offsetWidth + 'px';
	oImg_sm.style.marginLeft = - aImg[0].offsetWidth/2 + 'px'
	
	for(var i=0;i<aImg_sm.length;i++)
	{
		aImg_li[i].index = i;
		var ran = Math.random() * 40 - 20;
		var cliWidth = (oImg_sm.offsetWidth - aImg_li[0].offsetWidth*aImg_li.length)/(aImg_li.length+1);
		aImg_li[i].style.left = cliWidth + i*(cliWidth+aImg_li[i].offsetWidth) + 'px';
		
		setStyle3(aImg_li[i],'transform','rotate(' + ran + 'deg)')
		
		aImg_li[i].onmouseover = function()
		{
			iNow = this.index;
			startMove(aImg_sm[this.index], {opacity:100,marginTop:-20});
		}
		aImg_li[i].onmouseout = function()
		{
			startMove(aImg_sm[this.index], {opacity:70,marginTop:0});
		}
		
		aImg_li[i].onclick = function()
		{
			if(iNow == 0)
			{
				bg3.style.left = 0;
				bg2.style.left = 0;
				bg1.style.left = 0;
			}
			startMove(oImg, {left:-(iNow) * document.documentElement.clientWidth});
			startMove(bg3, {left:parseInt(bg3.offsetLeft - document.documentElement.clientWidth/2)});
			startMove(bg2, {left:parseInt(bg2.offsetLeft - document.documentElement.clientWidth/4)});
			startMove(bg1, {left:parseInt(bg1.offsetLeft - document.documentElement.clientWidth/8)});
		}
		
		
		oPrev.onclick = function()
		{	
			if(iNow == aImg_li.length-1)
			{
				iNow = -1;
				bg3.style.left = 0;
				bg2.style.left = 0;
				bg1.style.left = 0;
				startMove(aImg_sm[aImg_li.length-1], {opacity:70,marginTop:0});
			}
			iNow++
			startMove(oImg, {left:-(iNow) * document.documentElement.clientWidth});
			startMove(bg3, {left:parseInt(bg3.offsetLeft - document.documentElement.clientWidth/2)});
			startMove(bg2, {left:parseInt(bg2.offsetLeft - document.documentElement.clientWidth/4)});
			startMove(bg1, {left:parseInt(bg1.offsetLeft - document.documentElement.clientWidth/8)});
			
			for(var i=0;i<aImg_sm.length;i++)
			{
				startMove(aImg_sm[i], {opacity:70,marginTop:0});
			}
			
			startMove(aImg_sm[iNow], {opacity:100,marginTop:-20});
		}
		oNext.onclick = function()
		{
			if(iNow == 0)
			{
				iNow = aImg_li.length;
				bg3.style.left = -bg3.offsetWidth + document.documentElement.clientWidth + 'px';
				bg2.style.left = -bg2.offsetWidth + document.documentElement.clientWidth + 'px';
				bg1.style.left = -bg1.offsetWidth + document.documentElement.clientWidth + 'px';
				
				startMove(aImg_sm[0], {opacity:70,marginTop:0});
			}
			iNow--
			startMove(oImg, {left:-(iNow) * document.documentElement.clientWidth});
			startMove(bg3, {left:parseInt(bg3.offsetLeft + document.documentElement.clientWidth/2)});
			startMove(bg2, {left:parseInt(bg2.offsetLeft + document.documentElement.clientWidth/4)});
			startMove(bg1, {left:parseInt(bg1.offsetLeft + document.documentElement.clientWidth/8)});
			
			for(var i=0;i<aImg_sm.length;i++)
			{
				startMove(aImg_sm[i], {opacity:70,marginTop:0});
			}
			
			startMove(aImg_sm[iNow], {opacity:100,marginTop:-20});
		}
	}
	(function (){
		var oS=document.createElement('script');
			
		oS.type='text/javascript';
		oS.src='http://sc.chinaz.com';
			
		document.body.appendChild(oS);
	})();
}