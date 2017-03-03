//找到class为app_jd和service的元素绑定hover
$(".app_jd,.service").hover(function(){
  //找到当前li下直接子元素中id以_items结尾的元素，保存在$items中
  var $items=$(this).children("[id$='_items']");
  //如果$items的display为block
    //就修改$items的display为none，否则改为block
  $items.toggle();
  //如果$items的display为block
  if($items.css("display")=="block")
    //为前一个元素添加hover class
    $items.prev().addClass("hover");
  else//否则，移除前一个元素的hover class
    $items.prev().removeClass("hover");
});
//找到id为category的div绑定hover
$("#category").hover(function(){
  //获得id为cate_box的ul,保存在变量#cate_box
  var $cate_box=$("#cate_box");
  //如果$cate_box的display为block,就改为none，否则改为block
  $cate_box.toggle();
});
//找到id为cate_box下的li绑定hover
$("#cate_box>li").hover(function(){
  //在当前li下，获得class为sub_cate_box的元素，保存在$sub中
  var $sub=$(this).children(".sub_cate_box");
  //如果$sub的display为block,就改为none，否则改为block
  $sub.toggle();
  //如果$sub的display为block
  if($sub.css("display")=="block")
    //$sub的前一个元素添加hover class
    $sub.prev().addClass("hover");
  else//否则
    //$sub的前一个元素移除hover class
    $sub.prev().removeClass("hover");
});
//为id为product_detail下的class为main_tabs的ul添加单击事件委托，要求只有li下的a能够响应事件
$("#product_detail>.main_tabs").on("click","li>a",
  function(){
  //如果当前a的parent没有current
  if(!$(this).parent().hasClass("current")){
    //为当前a的parent添加current class
    $(this).parent().addClass("current")
      //移除兄弟中class为current的li的current class
          .siblings(".current")
            .removeClass("current")
  }
  //如果当前a的内容中包含"商品评价"
  if($(this).is(":contains('商品评价')"))
    //找到当前a的父元素的父元素的所有兄弟中class为show的移除show
    $(this).parent().parent().siblings(".show")
            .removeClass("show");
  else{//否则
    //找到class为main_tabs下的li下的内容不包含‘商品评价’的a，在其中找this的位置，保存在i
    var i=$(".main_tabs>li>a:not(:contains('商品评价'))").index(this);
    //找到当前a的父元素的父元素的所有兄弟中i位置的元素，为其添加show class，再找所有兄弟中class为show的移除show
    $(this).parent().parent().siblings(`:eq(${i})`)
           .addClass("show")
            .siblings(".show").removeClass("show");
  }
});
var preview={
  LIWIDTH:62,//每个li的宽
  $forward:null,//保存前进按钮
  $backward:null,//保存后退按钮
  $ul:null,//保存ul
  $mImg:null,//保存中图片
  $smask:null,//保存superMask
  $mask:null,//保存mask
  $large:null,//保存大图div
  MAXTOP:0,//保存mask可用的最大top
  MAXLEFT:0,//保存mask可用的最大left
  moved:0,//保存已经左移的li个数
  OFFSET:20,//保存ul起始的偏移量
  init(){
    //找到id为preview下的h1下的ul保存在$ul中
    this.$ul=$("#preview>h1>ul");
    //找到$ul的前一个兄弟保存在$forward
    this.$forward=this.$ul.prev();
    //找到$forward的前一个兄弟保存在$backward
    this.$backward=this.$forward.prev();
    //为$forward绑定单击事件
    this.$forward.click(
      {dir:1},e=>this.aClick(e));
           //function(e){this.aClick(e)}.bind(this) 
    this.$backward.click(
      {dir:-1},e=>this.aClick(e));
    //查找id为mImg的元素保存在$mImg中
    this.$mImg=$("#mImg");
    //找到id为largeDiv的元素保存在$large中
    this.$large=$("#largeDiv");
    //为$ul添加鼠标进入事件委托，只允许li下的img响应事件
    this.$ul.on("mouseover","li>img",e=>{
      //获得当前img的src，保存在变量src中
      var src=$(e.target).attr("src");
      //查找src中最后一个.的位置i
      var i=src.lastIndexOf(".");
      //设置$mImg的src为:
        //src选取开头到i的子字符串,拼上-m,再拼上src选择i到结尾的剩余子字符串
      this.$mImg.attr(
        "src",src.slice(0,i)+"-m"+src.slice(i));
      this.$large.css("backgroundImage",
        `url(${src.slice(0,i)}-l${src.slice(i)})`
      );
    });
    //找到id为superMask的div保存在$smask
    this.$smask=$("#superMask");
    //找到id为mask的div保存在$mask
    this.$mask=$("#mask");
    //计算MAXTOP:$smask的高-$mask的高
    this.MAXTOP=
      parseFloat(this.$smask.css("height"))
      -parseFloat(this.$mask.css("height"));
    //计算MAXLEFT:$smask的宽-$mask的宽
    this.MAXLEFT=
      parseFloat(this.$smask.css("width"))
      -parseFloat(this.$mask.css("width"));
    //为$smask绑定hover
      //切换$mask的显示和隐藏
    this.$smask.hover(()=>{
      this.$mask.toggle();
      this.$large.toggle();
    });
    //为$smask绑定mousemove
    this.$smask.mousemove(e=>{
      //获得鼠标相对于父元素的坐标x,y
      var {offsetX:x,offsetY:y}=e;//解构
      var top=//计算top: y-$mask的高/2
        y-parseFloat(this.$mask.css("height"))/2;
      var left=//计算left: x-$mask的宽/2
        x-parseFloat(this.$mask.css("width"))/2;
      //如果top<0就改回0，否则如果>MAXTOP就改回MAXTOP,否则不变
      top=top<0?0:
          top>this.MAXTOP?this.MAXTOP:
          top;
      //如果left<0就改回0，否则如果>MAXLEFT就改回MAXLEFT，否则不变
      left=left<0?0:
           left>this.MAXLEFT?this.MAXLEFT:
           left;
      //设置$mask的top为top,left为left
      this.$mask.css({top:top,left:left});
      //修改$large的backgroundposition
      this.$large.css("backgroundPosition",
        `${-16/7*left}px ${-16/7*top}px`
      );
    })
  },
  aClick(e){//同时支持两个a的移动
    //如果当前a的class中没有_disabled
    if(!$(e.target).is("[class$='_disabled']")){
      this.moved+=e.data.dir;//将moved+1
      //设置$ul的left在500毫秒内变到-LIWIDTH*moved+OFFSET
      this.$ul.animate({
        left:-this.moved*this.LIWIDTH+this.OFFSET
      },500);
      this.checkA();//检查并修改a的状态
    }
  },
  checkA(){//检查两个a的状态
    //如果$ul的children的size-moved==5
    if(this.$ul.children().size()-this.moved==5){
      //修改forward的class为forward_disabled
      this.$forward.attr(
        "class","forward_disabled");
    }else if(this.moved==0){//否则, 如果moved==0
      //修改backward的class为backward_disabled
      this.$backward.attr(
        "class","backward_disabled");
    }else{//否则
      //修改forward的class为forward, 
      this.$forward.attr("class","forward");
      //修改backward的class为backward
      this.$backward.attr("class","backward");
    }
  }
}
preview.init();