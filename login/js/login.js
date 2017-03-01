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
 *   
 * 默认斜体,获取焦点normal.
 */
$(function(){    
    var placeholder;
    $('input')
    .addClass('italic')
    .focus(function(){
        placeholder = $(this).attr('placeholder');
        console.log(placeholder)
        console.log($(this)[0].tagName)
        $(this).removeClass('italic');
        if($(this).parent().parent().hasClass('form-err')){
            $(this).parent().parent().removeClass('form-err');
        }
    })
    .blur(function(){
        if($(this).val()===''){
           $(this).addClass('italic')  
        }else{
            return;
        }                
    })
})

/**
 *
 * 输入校验..
 */

$(function(){
    $('.login-zone').on('blur','input',function(){
        var uname = /^[a-zA-Z0-9][a-zA-Z0-9_]{5,9}$/;
        var upwd = /^(?![a-zA-Z]+$)(?![0-9]+$)[0-9A-Za-z]{6,20}$/;
        var phone = /1[3578]\d{9}$/;
        var email = /^[a-zA-z0-9][\d\w]+\@([\w\d\-]+)\.([\d\w]{2,4})$/
        var result;
        var $parent = $(this).parent().parent()
        switch($(this).attr('name')){
            case 'uname':
            console.log('uname')
            result = uname.test($(this).val());
            console.log(result)
            break;
            case 'upwd' :
            result = upwd.test($(this).val());
            break;
            case 'cpwd' :

            result = $(this).val()===$('input[name="upwd"]').val()?true:false;
            break;
            case 'phone' :
            result = phone.test($(this).val());
            break;
            case 'email' :
            result = email.test($(this).val());
            break;
            default :
            result = true;
        }
        if(!result && $(this).val()){
            $parent.addClass('form-err');
            $(this).css('')
            // $('input[type="checkbox"]').prop('disabled',true);
        }else {
            $parent.removeClass('form-err');
            
        }
  
    })
})


