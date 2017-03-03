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
