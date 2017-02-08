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














//function wordsList(obj){
//
//    var str = obj.html();
//    str = str.split('');
//    obj.html(' ');
//    console.log(str);
//    var newStr = ' ';
//    var i=0;
//    var timer = setInterval(function(){
//        newStr += str[i]+'';
//        obj.html(newStr);
//        console.log(str[i])
//        i++;
//        if(i=str.length){
//            timer = null;
//        }
//    },500);
//
//
//
//
//
//}
//wordsList($('#canvas-hack .cover h1'));
//


