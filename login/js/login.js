var geolocation = new BMap.Geolocation();  
            geolocation.getCurrentPosition(function(p) {  
                console.log(p)
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {  
                var mk = new BMap.Marker(p.point);  
                  
                var myGeo = new BMap.Geocoder();
                var map = new BMap.Map('map')
                var point = new BMap.Point(p.point.lng, p.point.lat);
                map.centerAndZoom(point, 15); 
                  //使用鼠标滚轮缩放地图
			    map.enableScrollWheelZoom(true);

			    //添加地图控件——导航控件
		        map.addControl(new BMap.NavigationControl());
			    //添加地图控件——缩略图控件
			    map.addControl(new BMap.OverviewMapControl());
			    //添加地图控件——比例尺控件
			    map.addControl(new BMap.ScaleControl());
			    //添加地图控件——地图类型控件
			    //map.addControl(new BMap.MapTypeControl());
			     // var icon = new BMap.Icon();
  				var marker = new BMap.Marker(point);
  				map.addOverlay(marker);
  				marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                 
                myGeo.getLocation(new BMap.Point(p.point.lng, p.point.lat),           
                        function(rs) {  
                            var addComp = rs.addressComponents;  
                            console.log(addComp.province + addComp.city  
                                    + addComp.district + addComp.street  
                                    + addComp.streetNumber);  
                });  
  
            } else {  
                alert('failed' + this.getStatus());  
            }  
        }); 

// 提示工具
$('[data-toggle="tooltip"]').tooltip();

$(function(){
    var current=1;
    setInterval(function(){
                
        $(".item").eq(current).addClass('active').siblings().removeClass('active')
        current++;
        if(current>2){
            current=0;
        }
    },3000)
})

/**
 * 输入框字体控制
 * @param  {[type]} )
 * @return {[type]}     [description]
 */
$(function(){
    
    var placeholder;
    $('input')
    .addClass('italic')
    .focus(function(){
        placeholder = $(this).attr('placeholder');
        console.log(placeholder)
        console.log($(this)[0].tagName)
        $(this).removeClass('italic')
    })
    .blur(function(){
        if($(this).val()===''){
           $(this).addClass('italic')  
        }else{
            return;
        }                
    })
})

