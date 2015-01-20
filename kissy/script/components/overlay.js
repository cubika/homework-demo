KISSY.add(function(S, DOM, Event) {

	var margins = {
		vertical : 140,
		horizontal : 220
	};

	var src = 
		'<div class="overlay">\
			<img src="" alt="">\
			<div class="description">\
				<h3 class="title"></h3>\
			</div>\
		</div>';

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
			width: S.all(window).width() - margins.horizontal,
			height: S.all(window).height() - margins.vertical 
		}, {
			width: img.width(),
			height: img.height()
		});

		DOM.css(img, {
			width: pos.width,
			height: pos.height,
			left: pos.left + margins.horizontal/2,
			top: pos.top + margins.vertical/2
		});
	}

	return function(imgs) {
		var overlay = S.all(src);
		DOM.append(overlay, document.body);
		var img = S.all("img", overlay);
		var title = S.all(".title", overlay);
		Event.on(imgs, 'click', function(e) {
			overlay.fadeIn(0.3);
			var target = S.all(e.target);
			DOM.attr(img, 'src', DOM.attr(target, 'src'));
			DOM.text(title, DOM.text(S.all('.productTitle', DOM.parent(target, '.product'))));
			resizeHandler(img, margins);
		});

		Event.on(overlay, 'click', function() {
			if(DOM.css(overlay, 'display') != 'none') {
				overlay.fadeOut(0.3);
			}
		});

		Event.on(window, 'resize', function() {
			resizeHandler(img, margins);
		})
	}

}, {
	requires: ['dom', 'event', 'node']
})