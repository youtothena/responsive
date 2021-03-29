$(function () {
	$('.bxslider').bxSlider({
		mode: 'fade',
		speed: 500,
		pause: 3000,
		auto: true,
		autoHover: true,
		pager: true,
		pageCustom: '.slide_pager',
		slideWidth: 1000
	});
	$('.menu_toggle_btn').click(function(){
		$('.gnb').stop().fadeToggle('slow');
	});
});

