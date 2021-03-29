$('.tab_btn li').click(function(){
	var ind = $(this).index();
	$('.tab_btn li').removeClass('on');
	$(this).addClass('on');
	
	$('.tab_contents .list').stop().hide();
	$('.tab_contents .list').eq(ind).stop().show();
});

$('.tab_contents .list .question').click(function(){
	if($(this).hasClass('active')){
		$(this).removeClass('active');
		$(this).children('dd').removeClass('up');
		$(this).children('dd').addClass('down');
		$(this).siblings('.answer').stop().slideUp(500);
	}else {
		$(this).addClass('active');
		$(this).children('dd').removeClass('down');
		$(this).children('dd').addClass('up');
		$(this).siblings('.answer').stop().slideDown(500);
	}
});