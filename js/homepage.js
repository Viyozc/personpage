/**
 * 主题开关
 */
$(function(){
    var className = window.localStorage.getItem['bgClass'];
    console.log(className)
    if(className)
    $('body').removeClass().addClass(className);
})
$('.stay').click(function () {
    if ($(this).is('.close')) {
        $(this).removeClass('close').addClass('open')
            .children('.content').addClass('show')
            .parent().siblings('.open:not(#hello)').removeClass('open').addClass('close');
    }
})

//主题切换
$('#theme').on('click','li',function(){
    if(!$(this).is('active')){
        $(this).addClass('active').siblings('.active').removeClass('active');
        var className = $(this).children('a').attr('data-src');
        console.log(className)
        $('body').removeClass().addClass(className)
        window.localStorage.setItem('bgClass',className)
    }
})
$()

$('#container').on('mousedown','#container>div',function(e){
    var left = $(this).position().left;
    console.log(left)
   // $(this).css('position','absolute')
})

//imageWall 跳转
$('#img-wall').click(function(){
    location.href='imagewall.html';
})




/**
 * 播放器控制
 * jQuery
 */

// 推拉门
$('#disc').on('click','.disc-key',function(){
    // alert();
    var $disc = $('#disc');
    if($disc.hasClass('hide')){
         $disc.removeClass("hide");
    }else{
        $disc.addClass('hide');
        $('.music-list').removeClass('open')
    }
   
})

// 静音控制
$('.player-volume').click(function(e){
    var $tar =$(e.target);
    if($tar.is('p')){
        return;
    }else if($tar.hasClass('mute')){
        var volume = $('#bg-music')[0].volume;
        console.log($('#bg-music')[0].volume)
        $tar.removeClass('mute');
        $("#bg-music").get(0).muted=false;
        $('.v-sum').css('width',Math.floor(volume*60))
    
    }else if(!$tar.hasClass('mute')){
        $tar.addClass('mute');
        $('#bg-music').get(0).muted=true;
        $('.v-sum').css('width',0)
        console.log($('#bg-music')[0].volume)
    }
   
})

// 音量大小
$('.v-bar').click(function(e){
    console.log(e.offsetX);
    var volume = (e.offsetX/60).toFixed(2);
    console.log(volume)
    $('.v-sum').css('width',Math.floor(e.offsetX)+3);
    $('#bg-music')[0].volume = volume;

})
$('.v-sum').click(function(e){
    console.log(e.offsetX);
    var volume = (e.offsetX/60).toFixed(2);
    console.log(volume)
    $('.v-sum').css('width',Math.floor(e.offsetX));
    $('#bg-music')[0].volume = volume;
})
// 播放按钮
$('.player-play').hover(function(){
    $(this).addClass('active')
},function(){
    $(this).removeClass('active');
})
var timer;
$('.player-play').click(function(){
    
    var current,width,left;
    setPlayTime();
    var long = $('#bg-music')[0].duration;
    
    console.log("long"+long)
    if($(this).hasClass('play')){
        $(this).removeClass('play').addClass('stop');
        $('#bg-music')[0].play();
        timer = setInterval(function(){
            setPlayTime();
            current = $('#bg-music')[0].currentTime;
            width = Math.floor(current/long*350);
            
            $('.player-now').css('width',width)
            $('.play-rate').css('left',width-8)
            console.log(width)
        },300)
    }else{
        $(this).removeClass('stop').addClass('play');
        $('#bg-music')[0].pause();
        clearInterval(timer);
        timer = null;
    }
})
//进度条控制
$('.player-time').click(function(e){
    var long = $('#bg-music')[0].duration;
    var p = e.offsetX;
    var current = parseFloat(e.offsetX/350*long);
    $('#bg-music')[0].currentTime = current;
    $('.player-now').css('width',p)
    $('.play-rate').css('left',p-8)
})
// 更新进度时间
function setPlayTime(){
    var long = $('#bg-music')[0].duration;
    var mtime = Math.floor(long/60);
    var stime = Math.floor(long%60);
    mtime = mtime>=10? mtime: '0'+mtime;
    stime = stime>=0?  stime: '0'+stime;
    $('.whole-time').html(mtime+':'+stime);

    var nowTime = $('#bg-music')[0].currentTime;
    var nmtime = Math.floor(nowTime/60);
    var nstime = Math.floor(nowTime%60);
    nmtime = nmtime>=10? nmtime: '0'+nmtime;
    nstime = nstime>=10?  nstime: '0'+nstime;
    $('.now-time').html(nmtime+':'+nstime);
}

$('.player-img>img').click(function(){
   
    $('.music-list').toggleClass('open');
})

//设置歌名歌手
$(function(){

    function setSong(){
        var url = $('#bg-music').attr('src');
        var arr = url.split('\/');
        var song = arr[arr.length-1].split('\.')[0].split('-')[0];
        var singer = arr[arr.length-1].split('\.')[0].split('-')[1]
        console.log(name);
        $('.song').html(song);
        $('.singer').html(singer);
    }
    setSong(); 
})

//图片列表切换
$('.music-list>ul>li>img').click(function(){
    var src = $(this).attr('src');
    $('.player-img>img').attr('src',src);
    $('.music-list').removeClass('open');
})

// 循环播放控制
$('.player-loop').click(function(){
    if($(this).hasClass('all-loop')){
        $(this).removeClass('all-loop').addClass('rand-loop');
    }else if($(this).hasClass('rand-loop')){
        $(this).removeClass('rand-loop').addClass('single-loop');
    }else if($(this).hasClass('single-loop')){
        $(this).removeClass('single-loop').addClass('all-loop');
    }
})


// 播放logo控制器

$(function(){
    var timerPlayer = null;
    var c = $('#cd-canvas')[0];
    var ctx= c.getContext('2d');
    var img =new Image();
    ctx.translate(112,112);
    $('.player-play').click(function(){     
            if(!$(this).hasClass('play')){            
            img.src = "css/images/bigfat3.png";
            ctx.restore();
            img.onload = function(){               
                timerPlayer = setInterval(function(){
                    ctx.clearRect(-112,-112,400,400);
                    ctx.rotate(5*Math.PI/180);
                    ctx.drawImage(img,-img.width/2,-img.height/2)
                },100)
            }
        }else{
            ctx.save();
            clearInterval(timerPlayer);
            timerPlayer = null;
            
        }
    })
})



/**
 * D3图表设置
 */


$(function(){
    
    var config1 = liquidFillGaugeDefaultSettings();
    config1.circleColor = "#D71C62";
    config1.textColor = "#000";
    config1.waveTextColor = "#000";
    config1.waveColor = "#fff";
    config1.circleThickness = 0.15;
    config1.textVertPosition = 0.5;
    config1.waveAnimateTime = 1000;
    var gauge1= loadLiquidFillGauge("fillgauge1", 95, config1);
    var gauge2= loadLiquidFillGauge("fillgauge2", 90, config1);    
    var gauge3 = loadLiquidFillGauge("fillgauge3", 80, config1);   
    var gauge4 = loadLiquidFillGauge("fillgauge4", 90, config1);   
    var gauge5 = loadLiquidFillGauge("fillgauge5", 85, config1);   
    var gauge6 = loadLiquidFillGauge("fillgauge6", 65, config1);
})
   
/**
 * loading...加载
 */
$(function(){
    var total = 0;
    var load = setInterval(function(){
        console.log(total)
        if(total>=100){
            $('.load').addClass('over')
            clearInterval(load);
            load=null;
        }
    },100)
    var img1=new Image();
    img1.src = 'images/ontheroadthumb.jpg'
    img1.onload = add(25)
    var img2 = new Image();
    img2.src= 'images/simonthumb.jpg'
    img2.onload=add(25)
    var img3 = new Image();
    img3.src= 'images/targetthumb.jpg';
    img3.onload=add(25);
    var img4 = new Image();
    img4.src= 'images/sleepthumb.jpg';
    img4.onload=add(25);

    function add(n){
        total+=n;
    }

})