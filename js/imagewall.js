/**
 * Created by Administrator on 2017/1/13 0013.
 */

window.onload = function(){
    
    
    var wall = document.getElementById('img-wall');
    // 模拟数据加载
    var total = 11;
    //图片url数组
    var data = [] ;
    for(var n =1; n<50; n++){
        data.push({'src':'pic/waterfall%20('+n+').jpg'})
    }

    paint();
    
    console.log(checkPosition())

    window.onscroll = function(){
        
        if(checkPosition()){
            loadImg(4);
        }

    }
    /**加载sum个图片**/
    function loadImg(sum){
        if(total<50){
            for(var i=0; i<sum; i++){
                var newRoom = document.createElement('div');
                newRoom.className= 'img-room';
                // var wall = document.getElementById('img-wall');
                var newPic = document.createElement('img');
                newPic.src = data[total].src;
                newRoom.appendChild(newPic);
                wall.appendChild(newRoom);
                total ++;
            }
        paint();  
        }else{
            total = 1;
        }
        
    }
    /**判断滚动条位置是否加载**/
    function checkPosition(){
        var bottomCord = document.documentElement.scrollTop || document.body.scrollTop;
        console.log(bottomCord);
        
        var lastImg = parseInt(getComputedStyle(getLast()).top);

        var clientH = window.innerHeight;
        console.log("")
        console.log(bottomCord+'=>'+lastImg+'=>'+clientH)
        if(lastImg+50<bottomCord+clientH){
            return true;
        }else{
            return false;
        }
          
    }
    /**获取最后一个添加的IMG元素**/
    function getLast(){         
         return  document.getElementById("img-wall").lastElementChild;
    }


    /**定位所有图片**/
    function paint(){

        var room = document.getElementsByClassName('img-room');
        //容器宽度
        var cWidth = wall.offsetWidth;
        //定宽图片
        var iWidth = 220;
         //  total = room.length;
        var colNum = Math.floor(cWidth/iWidth);
        // 初始化列高度
        var col = [];
        for(var i = 0; i<colNum; i++){
            col.push(0);
        }
        var cMargin = Math.floor((cWidth-colNum*iWidth)/2/colNum);
        //各列x坐标
        var colLeft = [];
        for(var c=0; c<colNum; c++){            
            colLeft.push(cMargin+c*(iWidth+2*cMargin));
        }
     
        console.log(colLeft)
        console.log(col)
        for(var j=0; j<room.length; j++){
            var index = getIndex();
            room[j].style.position = 'absolute';
            room[j].style.left = colLeft[index]+'px';
            room[j].style.top = (col[index] +2*cMargin) +'px';
            col[index] += room[j].offsetHeight + 2*cMargin;
            
        }
        //获取最短列的下标
        function getIndex(){
            var colMin=Math.min.apply(Math,col);
            for(var i=0; i<colNum; i++){
                if(col[i] == colMin)
                return i;
            }
        }
        console.log(col)
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
    // drag(document.getElementById('show-wall').document.querySelector('#show-wall>img'))

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

