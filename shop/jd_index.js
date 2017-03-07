/*广告图片数组*/
var imgs=[
	{"i":0,"img":"images/index/banner_01.jpg"},
  {"i":1,"img":"images/index/banner_02.jpg"},
  {"i":2,"img":"images/index/banner_03.jpg"},
  {"i":3,"img":"images/index/banner_04.jpg"},
  {"i":4,"img":"images/index/banner_05.jpg"},
];
var slider={
  LIWIDTH:0,//一张广告的宽度
  $imgs:null, $idxs:null,//保存ul imgs和ul indexs
  init(){//初始化:
    //获得id为slider的div的宽保存在LIWIDTH中
    this.LIWIDTH=parseFloat(
      $("#slider").css("width"));
    //获得id为imgs的ul保存在$imgs中
    this.$imgs=$("#imgs");
    //获得id为indexs的ul保存在$idxs中
    this.$idxs=$("#indexs");
    this.updateView();//更新页面
  },
  updateView(){//根据数组更新页面
    //遍历imgs中每个对象,同时定义空字符串imgsHTML和idxsHTML
    for(var i=0,imgsHTML="",idxsHTML="";
        i<imgs.length;
        i++){
      imgsHTML+=//向imgsHTML中拼接:
        `<li><img src="${imgs[i].img}"/></li>`
      //向idxsHTML中拼接: 
      idxsHTML+=`<li>${i+1}</li>`;
    }//(遍历结束)
    //设置$imgs的内容为imgsHTML    
    //设置$imgs的宽为imgs数组的元素个数*LIWIDTH
    this.$imgs
          .html(imgsHTML)
          .css("width",imgs.length*this.LIWIDTH);
    //设置$idxs的内容为idxsHTML
    this.$idxs.html(idxsHTML);
    //获得数字imgs中第0个元素的i属性保存在i中
    //为$idxs下第i个子元素添加hover class
    this.$idxs.children(`:eq(${imgs[0].i})`)
              .addClass("hover");
  }
}
slider.init();


var elevator={
  FHEIGHT:0,//保存楼层高度
  UPLEVEL:0,//保存亮灯区域的上限
  DOWNLEVEL:0,//保存亮灯区域的下限
  $spans:null,//保存每个楼层的灯span
  $elevator:null,//保存电梯按钮的div
  DURATION:1000,
  init(){
    var me=this;//留住this
    //获得class为floor的元素的高保存在height
    var height=
      parseFloat($(".floor").css("height"));
    //获得class为floor的元素的marginBottom保存在bottom
    var bottom=
      parseFloat($(".floor").css("marginBottom"));
    //计算FHEIGHT: height+bottom
    me.FHEIGHT=height+bottom;
    //计算UPLEVEL: (innerHeight-FHEIGHT)/2
    me.UPLEVEL=(innerHeight-me.FHEIGHT)/2
    //计算DOWNLEVEL: UPLEVEL+FHEIGHT;
    me.DOWNLEVEL=(me.UPLEVEL+me.FHEIGHT);
    //获得class为floor下的header下的span保存在$spans
    me.$spans=$(".floor>header>span");
    //获得id为elevator的div保存在$elevator中
    me.$elevator=$("#elevator");
    //为当前页面绑定滚动事件
    $(document).scroll(e=>{
      //获得页面滚动过的高度
      var scrollTop=$(e.target).scrollTop();
      //对$spans中每个span执行相同操作
      me.$spans.each(i=>{
        //获得$spans下i位置的span
        var $span=me.$spans.eq(i);
        //获得当前span距body顶部的offsetTop
        var offsetTop=$span.offset().top
        //计算innerTop: offsetTop-scrollTop
        var innerTop=offsetTop-scrollTop;
        //如果innerTop<=DOWNLEVEN&&>UPLEVEL
        if(innerTop<=me.DOWNLEVEL
            &&innerTop>me.UPLEVEL){
          //为当前span添加hover class
          $span.addClass("hover");
        }else{//否则
          //为当前span移除hover class
          $span.removeClass("hover");
        }
      });
      //如果有hover的span，
        //为$elevator添加in class
      //否则
        //为$elevator移除in class
      if(me.$spans.hasClass("hover")){
        me.$elevator.addClass("in");
        //将$elevator下第一个a显示，第二个a隐藏
        me.$elevator
            .find("a:first-child")
            .css("display","block");
        me.$elevator        
            .find("a:last-child")
            .css("display","none");
        //获得当前被选中的span
        var $span=me.$spans.filter(".hover");
        if($span.size()>0){//如果找到
          //获得$span在$spans中的位置
          var i=me.$spans.index($span);
          //获得elevator下i位置的li
          var $li=
            me.$elevator.find(`li:eq(${i})`);
          //将$li下第一个a隐藏，第二个a显示
          $li.children(":first")
              .css("display","none")
             .next().css("display","block");
        }
      }else
        me.$elevator.removeClass("in");
    });
    
    //为$elevator下的每个li绑定hover
      //移出: 如果对应的span没有亮灯
              //才第一个a显示，第二个a隐藏
    me.$elevator.find("li").hover(
      function(){//进入: 第一个a隐藏，第二个a显示
        $(this).children(":first")
                .css("display","none")
               .next().css("display","block");
      },
      function(){
        //获得当前li在$elevator下的位置i
        var i=me.$elevator
                  .find("li").index(this);
        //如果$spans中i位置的span没有hover
        if(!me.$spans.eq(i).hasClass("hover"))
          $(this).children(":first")
                      .css("display","block")
                    .next().css("display","none");
      }
    );
    //为$elevator添加单击事件代替,只允许ul下的li下的最后一个a响应
    me.$elevator.on("click","ul>li>a:last-child",
      function(){
        //获得当前a在$elevator所有第二个a中的位置i
        var i=
          $(this).index("#elevator a:last-child");
        //获得spans中i位置的span的offsetTop
        var offsetTop=me.$spans.eq(i).offset().top;
        //计算scrollTop: offsetTop-UPLEVEL
        var scrollTop=offsetTop-me.UPLEVEL;
        $("body").stop(true);
        $("body").animate({
          scrollTop:scrollTop
        },me.DURATION);
    });
  }
}
elevator.init();
$('#settle_up').click(function(){
  window.location.href='../shopdetail/jd_detail.html'
})