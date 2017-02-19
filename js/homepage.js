$('.cell').click(function () {
    if ($(this).is(".open")) {
        $(this).removeClass('open').addClass('close')
            .children('.content').removeClass('show')

    } else if ($(this).is('.close')) {
        $(this).removeClass('close').addClass('open')
            .children('.content').addClass('show')
            .parent().siblings('.open').removeClass('open').addClass('close');
    }


})

//主题切换
$('#theme').on('click','li',function(){
    if(!$(this).is('active')){
        $(this).addClass('active').siblings().removeClass('active');

    }
})

$('#container').on('mousedown','#container>div',function(e){
    var left = $(this).position().left;
    console.log(left)
   // $(this).css('position','absolute')
})

//imageWall 跳转
$('#img-wall').click(function(){
    location.href='imagewall.html';
})

// $('.cell').mousedown(function(){
//     $_this = $(this);
//     var t = null;
//     setTimeout(function(){
//         console.log($_this)
//         var deg = 0;
//         var flag = 1;
//         var step = 4;

//       var t =  setInterval(function(){
            
//            console.log($_this)
//             $_this.css('transform','rotate('+(deg+flag*step)+'deg)');
//             console.log(deg+flag*step)
//             deg+=flag*step;
//             if(deg>10&&flag==1){
//                 flag=-1;
//             }else if(deg<-10&flag==-1){
//                 flag=1;
//             }
            
//         },16)
//     },1000)
//     $_this.mouseup(function(){})
// })






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




