/**
 * Created by Administrator on 2017/1/13 0013.
 */

/***
 *
 */
window.onload = function(){
    var col = [0,0,0,0];
    var colLeft = [];
    var wall = document.getElementById('img-wall');
    // 仿造数据加载
    var total = 21;
    var data = [] ;
    for(var n =1; n<300; n++){
        data.push({'src':'pic/waterfall%20('+n+').jpg'})
    }
    //loadImg(8)
    paint();
    
    console.log(checkCord())

    // window.onscroll = function(){
        
    //     if(checkCord()){
    //         loadImg(8);
    //     }

    // }
    /**加载sum个图片**/
    function loadImg(sum){
        for(var i=0; i<sum; i++){
                var nRoom = document.createElement('div');
                nRoom.className= 'img-room';
                var wall = document.getElementById('img-wall');
                var nPic = document.createElement('img');
                nPic.src = data[total].src;
                nRoom.appendChild(nPic);
                wall.appendChild(nRoom);
                total ++;
        }
        paint();
    }
    /**判断滚动条位置是否加载**/
    function checkCord(){
        var bottomCord = document.documentElement.scrollTop || document.body.scrollTop;
        console.log(bottomCord);
        
        var lastImg = parseInt(getComputedStyle(getLast()).top);

        var clientH = window.innerHeight;
        console.log(bottomCord+'=>'+lastImg+'=>'+clientH)
        if(lastImg-200>bottomCord+clientH){
            return false;
        }else{
            return true;
        }
          
    }
    /**获取最后一个添加的IMG元素**/
    function getLast(){
         room = document.getElementById("img-wall").lastElementChild;
         return room;
    }


    /**定位所有图片**/
    function paint(){
        var room = document.getElementsByClassName('img-room');
        var cWidth = wall.offsetWidth;
        var iWidth = 220;
         //  total = room.length;
        var colNum = Math.floor(cWidth/iWidth);

        var cMargin = Math.floor((cWidth-colNum*iWidth)/2/colNum);

        
        

        for(var c=0; c<colNum; c++){
            
            colLeft.push(cMargin+c*(iWidth+2*cMargin));
        }
     
        console.log(colLeft)
        for(var j=0; j<room.length; j++){
            var index = getIndex();
            room[j].style.position = 'absolute';
            room[j].style.left = colLeft[index]+'px';
            room[j].style.top = (col[index] +2*cMargin) +'px';
            col[index] += room[j].offsetHeight + 2*cMargin;
            // console.log(index)
        }

        function getIndex(){
            var colMin=Math.min.apply(Math,col);
            for(var i=0; i<colNum; i++){
                if(col[i] == colMin)
                return i;
            }
        }
    }



    

    document.getElementById('img-wall').onclick = function (e) {
        var target = e.target || e.srcElement;
        console.dir(target)
        var src = target.getAttribute('src');
        var container = target.parentNode;
        var wall = document.getElementById('show-wall');
          
        console.log(wall);
        wall.innerHTML=container.innerHTML;
        wall.style.display='block';


    }

    document.getElementById('show-wall').onclick=function(e){
        if(!e.target.getAttribute('src'))
            this.style.display = 'none';
    }
    drag(document.getElementById('show-wall'),document.querySelector('#show-wall>img'))

    function drag(parent,obj){
        parent.onmousedown = function(e){
            obj.style.position = 'absolute';
            var left = obj.offsetLeft+e.offsetLeft;
            // var parseInt(getComputedStyle(obj).width)
            var top = obj.offsetTop + e.offsetTop;
            obj.style.left = left +'px';
            obj.style.top = top +'px';
            console.log(top+'=>'+left)
        }
    }

}



// function test(){
//     var test = [];
//     $('.img-room').each(function(){
//         test.push($(this).children('img').attr('src'))
//     })
//     console.dir(test);
// }
// test();




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