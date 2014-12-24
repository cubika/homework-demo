function getPosition(wrapper, img) {
	var finalW, finalH,
		imgW = img.width, 
		imgH = img.height,
		ratio = imgW / imgH;
		wrapperW = wrapper.width,
		wrapperH = wrapper.height;

	if( imgW > imgH ) {
				finalW = wrapperW;
				var ratio = imgW / wrapperW;
				finalH = imgH / ratio;
				if( finalH > wrapperH ) {
					ratio = finalH / wrapperH;
					finalW /= ratio;
					finalH = wrapperH;
				}
			}
			else {
				finalH = wrapperH;
				var ratio = imgH / wrapperH;
				finalW = imgW / ratio;
				if( finalW > wrapperW ) {
					ratio = finalW / wrapperW;
					finalW = wrapperW;
					finalH /= ratio;
				}
			}

	return {
		width: finalW,
		height: finalH,
		left: wrapper.width/2 - finalW/2,
		top: wrapper.height/2 - finalH/2
	}
}

function resizeHandler(img, margins) {
	var pos = getPosition({
		width: $(window).width() - margins.horizontal,
		height: $(window).height() - margins.vertical 
	}, {
		width: img.width(),
		height: img.height()
	});

	img.css({
		width: pos.width,
		height: pos.height,
		left: pos.left + margins.horizontal/2,
		top: pos.top + margins.vertical/2
	});
}

$(window).on('load', function() {

	var margins = {
		vertical : 140,
		horizontal : 220
	};
	var overlay = $(".overlay");
	var img = overlay.find("img");
	var title = overlay.find(".title");

	$("#part2").find("img").on('click', function(e) {
		overlay.fadeIn();
		var target = $(e.target).closest("img");
		img.attr('src', target.attr('src'));
		title.text(target.closest('.product').find('.productTitle').text());
		resizeHandler(img, margins);
	});
	overlay.on('click', function() {
		if(overlay.css('display') != 'none') {
			overlay.fadeOut();
		}
	});

	$(window).on('resize', function(){
		resizeHandler(img, margins);
	});

	$("a").on('click', function(e) {
		e.preventDefault();
	});
	$(".slider").slide({
		autoplay: true
	});
});