/**
 * Created by Administrator on 2017/1/15 0015.
 */


 /*
function hack(id) {

    //Javascript代码片段
   var c = document.getElementById(id);
    var ctx = c.getContext("2d");

//文字
    var txts = "01";
//转为数组
    txts = txts.split("");

    var font_size = 16;
    var columns = c.width / font_size;
//用于计算输出文字时坐标，所以长度即为列数
    var drops = [];
//初始值
    for (var x = 0; x < columns; x++)
        drops[x] = 1;

//输出文字
    function draw() {
        //让背景逐渐由透明到不透明
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, c.width, c.height);

        //文字颜色
        ctx.font = font_size + "px arial";
        //逐行输出文字
        for (var i = 0; i < drops.length; i++) {
            ctx.fillStyle = getColor();
            //随机取要输出的文字
            var text = txts[Math.floor(Math.random() * txts.length)];
            //输出文字，注意坐标的计算
            ctx.fillText(text, i * font_size, drops[i] * font_size);

            //如果绘满一屏或随机数大于0.95（此数可自行调整，效果会不同）
            if (drops[i] * font_size > c.height || Math.random() > 0.85)
                drops[i] = 0;

            //用于Y轴坐标增加
            drops[i]++;
        }
    }

    function getNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function getColor() {
        return `rgb(${getNum(0, 255)},${getNum(0, 255)},${getNum(0, 255)})`;
    }

    var canvas = null;
    document.getElementById('canvas-hack').onclick=function(){
        if(this.className.indexOf("open")!=-1){
            console.log("111")
             canvas = setInterval(draw, 33);
        }else{
            clearInterval(canvas);
            canvas = null;
        }

        console.log(this.className)
    }

}

hack('c1');

*/