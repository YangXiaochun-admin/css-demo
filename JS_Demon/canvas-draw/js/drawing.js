window.onload=function(){
	var shapeEle=document.querySelector("#shape");
	var colorEle=document.querySelector("#color");
	var widthEle=document.querySelector("#width");
	var styleEle=document.querySelector("#style");
	var sideEle=document.querySelector("#polygon");
	var revocationBtn=document.querySelector("#revocation");
	var saveBtn=document.querySelector("#save");
	var clearBtn=document.querySelector("#clear");
	/* 定义绘图形状（默认直线）*/
	var shape="line";
	var color="#000";
	var width="2";
	var style="stroke";
	var side="3";
	shapeEle.onchange=function(){
		shape=this.value;
	}
	colorEle.onchange=function(){
		color=this.value;
	}
	widthEle.onchange=function(){
		width=this.value;
	}
	styleEle.onchange=function(){
		style=this.value;
	}
	sideEle.onchange=function(){
		side=this.value;
	}
	/*画布渲染上下文，得到画笔*/
	var canvas=document.querySelector("#myCanvas");
	var ctx=canvas.getContext("2d");
	ctx.beginPath();
	ctx.lineTo(200, 500);
	// 画布数据
	var data=[];
	canvas.onmousedown=function(e){
		// 获取起始坐标
		var ox=e.offsetX;
		var oy=e.offsetY;
		// 实例化绘图对象
		var draw=new Draw(ctx,{color:color,width:width,style:style});
		if(shape=="pen"){
			// 铅笔功能鼠标一按下就开始绘制
			ctx.beginPath();
			ctx.moveTo(ox, oy);
		}
		canvas.onmousemove=function(e){
			// 获取结束坐标
			var mx=e.offsetX;
			var my=e.offsetY;
			// 画之前清空画布
			if(shape!=="eraser"){
				ctx.clearRect(0, 0, 500, 500);
				// 将数据重新绘制到画布中
				if(data.length>0){
					// 获取最新一条数据绘制
					ctx.putImageData(data[data.length-1], 0, 0 , 0, 0 ,500 ,500);
				}
			}
			// ctx.strokeRect(ox, oy, mx-ox, my-oy);
			/*ctx.beginPath();
			ctx.moveTo(ox, oy);
			ctx.lineTo(mx, my);
			ctx.stroke();*/
			// draw.rect(ox,oy,mx,my);
			// shape是一个变量，所以要用[]
			draw[shape](ox,oy,mx,my,side);
		}
		document.onmouseup=function(){
			// 鼠标抬起保存画布数据，追加到数组中
			data.push(ctx.getImageData(0, 0, 500, 500));
			canvas.onmousemove=null;
			document.onmouseup=null;
		}	
	}
	//撤销
	revocationBtn.onclick=function(){
		ctx.clearRect(0,0,500,500);
		data.pop();		
		if(data.length==0){
			return;
		}
		ctx.putImageData(data[data.length-1], 0, 0 , 0, 0 ,500 ,500);
	}
	//保存
	saveBtn.onclick=function(){
		var url=canvas.toDataURL();
		location.assign(url);
	}
	//清空
	clearBtn.onclick=function(){
		ctx.clearRect(0,0,500,500);
		data=[];
	}
}