class Draw{
	constructor(ctx,option){
		//option定义图形颜色、粗细、描边or填充
		this.ctx=ctx;
		this.color=option.color;
		this.width=option.width;
		this.style=option.style;
	}
	// 初始化函数(设置颜色、线宽、样式)，每次绘制都要初始化
	init(){
		// 描边颜色
		this.ctx.strokeStyle=this.color;
		// 填充颜色
		this.ctx.fillStyle=this.color;
		// 线宽
		this.ctx.lineWidth = this.width;
	}
	// 直线
	line(ox,oy,mx,my){
		this.init();
		this.ctx.beginPath();
		this.ctx.moveTo(ox, oy);
		this.ctx.lineTo(mx, my);
		this.ctx[this.style]();
	}
	// 矩形
	rect(ox,oy,mx,my){
		this.init();
		/*this.ctx.strokeRect(ox, oy, mx-ox, my-oy);*/
		this.ctx.beginPath();
		this.ctx.rect(ox, oy,mx-ox,my-oy);
		this.ctx[this.style]();
	}
	// 中心圆
	circleCenter(ox,oy,mx,my){
		let r=Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
		this.init();
		this.ctx.save();
		this.ctx.translate(ox, oy);
		this.ctx.beginPath();
		this.ctx.arc(0, 0, r, 0, 2*Math.PI);
		this.ctx[this.style]();
		this.ctx.restore();
	}
	// 内切圆
	circleIn(ox,oy,mx,my){
		// 一大一小取较小值
		let r=Math.abs(mx-ox)<Math.abs(my-oy)?Math.abs(mx-ox)/2:Math.abs(my-oy)/2;
		this.init();
		// 改变画笔原点到落笔点
		this.ctx.save();
		this.ctx.translate(ox, oy);
		this.ctx.beginPath();
		this.ctx.arc(mx-ox>0?r:-r,my-oy>0?r:-r, r, 0, 2*Math.PI);
		this.ctx[this.style]();
		// 画笔原点回归
		this.ctx.restore();
		
	}
	//外接圆
	circleOut(ox,oy,mx,my){
		// 两点距离为直径
		let r= Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2))/2;
		this.init();
		this.ctx.save();
		this.ctx.translate(ox, oy);
		this.ctx.beginPath();
		this.ctx.arc((mx-ox)/2, (my-oy)/2, r, 0, 2*Math.PI);
		this.ctx[this.style]();
		this.ctx.restore();
	}
	// 正多边形
	polygon(ox,oy,mx,my,num){
		// 半径算法同中心圆
		let r= Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
		this.init();
		this.ctx.save();
		this.ctx.translate(ox, oy);
		// 旋转90度,保证图形是正的
		this.ctx.rotate(Math.PI/2);
		var angle=Math.PI/num;
		var x=Math.cos(angle)*r;
		var y=Math.sin(angle)*r;
		this.ctx.beginPath();
		this.ctx.moveTo(x,y);
		for(let i=0;i<num;i++){
			this.ctx.lineTo(x, -y);
			this.ctx.rotate(-angle*2);
		}
		this.ctx[this.style]();
		this.ctx.restore();
	}
	// 铅笔
	pen(ox,oy,mx,my){
		this.init();
		this.ctx.lineTo(mx, my);
		this.ctx.stroke();
	}
	//橡皮擦
	eraser(ox,oy,mx,my){
		this.ctx.clearRect(mx,my,10,10);
	}
}
/*相当于*/
/*function Draw(){

}
Draw.prototype.rect=function(){

}*/