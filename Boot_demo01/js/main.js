$('.img-cell').next().click(function(){
	console.log($(this).offset().top)
})

$(window).scroll(function(){

	$('.show-cell').each(function(){
		var h = $(this).offset().top;
		var inner = $(window).innerHeight();
		var cellh = $(this).innerHeight();
		if($(window).scrollTop()+inner >h+cellh){
			$(this).addClass('active')}
		
	})

})