$(function () {
    var canvas=$("#watch").get(0);
    var ctx=canvas.getContext("2d");
    // 角度转弧度
    function radian(deg) {
        return deg*Math.PI/180;
    }
    //表盘
    function plate() {
        for(var i=0; i<60; i++){
            ctx.save();
            ctx.lineCap="round";
            ctx.strokeStyle="#fff";
            ctx.beginPath();
            if(i%5==0){
                ctx.lineWidth="5";
                ctx.moveTo(0,-200);
            }else{
                ctx.moveTo(0,-210);
            }
            ctx.lineTo(0,-220);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            ctx.rotate(radian(6));
        }
    }
    // 秒针
    function secondHand(deg) {
        ctx.save();
        ctx.rotate(radian(deg));
        ctx.fillStyle="red";
        ctx.strokeStyle="#fff";
        ctx.lineCap="round";
        ctx.lineWidth="3";

        ctx.beginPath();
        ctx.moveTo(1,10);
        ctx.bezierCurveTo(0.5, 12, -0.5, 12, -1, 10);
        ctx.lineTo(0,-180);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(0,0,6,0,360);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    // 分针
    function minuteHand(deg) {
        ctx.save();
        ctx.rotate(radian(deg));
        ctx.fillStyle="rgba(255,255,255,1)";
        ctx.strokeStyle="#fff";
        ctx.lineCap="round";
        ctx.lineWidth="3";

        ctx.beginPath();
        ctx.moveTo(2,10);
        ctx.bezierCurveTo(1, 12, -1, 12, -2, 10);
        ctx.lineTo(0,-150);
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }
    // 时针
    function hourHand(deg) {
        ctx.save();
        ctx.rotate(radian(deg));
        ctx.fillStyle="rgba(255,255,255,1)";
        ctx.strokeStyle="#fff";
        ctx.lineCap="round";
        ctx.lineWidth="3";

        ctx.beginPath();
        ctx.moveTo(3,10);
        ctx.bezierCurveTo(1.5, 12, -1.5, 12, -3, 10);
        ctx.lineTo(0,-120);
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }
    function clear() {
        ctx.clearRect(0,0,500,500);
    }
    setInterval(function () {
        clear();
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var ms = date.getMilliseconds();
        var deg_s = 360 * ( s * 1000 + ms )/60000;
        var deg_m = 360 * ( m * 60 + s )/3600;
        var deg_h = 360 * ( h * 3600 + m * 60 + s )/(12 * 3600);
        ctx.save();
        ctx.translate(250,250);//改变坐标基准点
        plate();
        hourHand(deg_h);
        minuteHand(deg_m);
        secondHand(deg_s);
        ctx.restore();
    },1)
})