$(window).on('load', function() {

	$("a").on('click', function(e) {
		e.preventDefault();
	});

	// 轮播
	$(".slider").slide({
		autoplay: true
	});

	// 弹浮层
	$("#part2 img").Overlay();
});