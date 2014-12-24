$(window).on('load', function() {

	$("a").on('click', function(e) {
		e.preventDefault();
	});

	$(".slider").slide({
		autoplay: true
	});

	$("#part2 img").Overlay($(".overlay"));
});