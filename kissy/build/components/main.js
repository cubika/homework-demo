/*
combined files : 

components/slide_k
components/data
components/overlay
components/main

*/
KISSY.add('components/slide_k',function(S, DOM, Event){

	function Slider(container, options) {
		this.defaults = {
			autoplay: true,
			control: false,
			duration: 500, // 效果过渡时间
			interval: 2000, // 翻页间隔
			hoverOnPause: true,
			orientation: 0
		};

		var settings = S.merge(this.defaults, options);
		var stops = [];
		var current = 0;
		var totalwidth = 0;
		var height = 0;
		var timer = null;
		var that = this;

		if(!DOM.hasClass(container, 'slider')) {
			DOM.addClass(container, 'slider');
		}
		var backgroud;
		if(DOM.parent(DOM.get('img'), 'a')) {
			backgroud = S.all('<div class="background"></div>');
			DOM.wrapAll("a", DOM.create('<div class="background" />'));
		}else {
			background = S.all("ul", container);
			DOM.addClass(background, 'background');
		}

		var children = DOM.children(background);
		S.each(children, function(child) {
			DOM.addClass(child, 'slide');
			var img = S.all('img', child);
			DOM.width(img, DOM.width(img));
			stops.push({
				width: img.width(),
				height: img.height()
			});
			totalwidth += img.width();
		});

		DOM.css(container, {
			width: stops[current].width,
			height: stops[current].height
		});
		DOM.css(background, {
			width: totalwidth
		});

		DOM.wrap(background, DOM.create('<div class="window"></div>'));
		var nav = S.all("<ul class='nav'></ul>");
		for(var i=0; i<stops.length; i++) {
			DOM.append(S.all('<li><a href="">' + (i+1) + '</a></li>'), nav);
		}
		DOM.addClass(S.all("li", nav).item(current), 'selected');
		Event.delegate(nav, 'click', 'li', function(e) {
			var li = e.target.tagName.toLowerCase() == 'li' ? e.target : DOM.parent(e.target, 'li');
			current = S.indexOf(li, DOM.children(DOM.parent(li)));
			that.slideOnce();
			e.halt();
		});
		DOM.append(nav, container);

		this.moveRight = function() {
			current = (current + 1) % stops.length;
		}
		this.moveLeft = function() {
			current = (stops.length + current - 1) % stops.length;
		}
		this.slideOnce = function() {
			var left = 0;
			for(var i=0; i<current; i++) {
				left += stops[i].width;
			}
			background.animate({
				'left': -left + 'px'
			}, {
				duration: settings.duration / 1000
			}, 'easeIn');

			DOM.css(container, {
				width: stops[current].width,
				height: stops[current].height
			});

			var dots = S.all('li', nav);
			DOM.removeClass(dots, 'selected');
			DOM.addClass(dots.item(current), 'selected');
		}

		this.prevHandler = function() {
			clearInterval(timer);
			timer = null;
			that.moveLeft();
			that.slideOnce();
		};
		this.nextHandler = function() {
			clearInterval(timer);
			timer = null;
			that.moveRight()
			that.slideOnce();
		};

		if(settings.autoplay) {
			timer = setInterval(function(){
				that.moveRight();
				that.slideOnce();
			}, settings.interval);

			if(settings.hoverOnPause) {
				Event.on(container, 'mouseover', function() {
					clearInterval(timer);
					timer = null;
				});
				Event.on(container, 'mouseleave', function() {
					if(timer == null) {
						timer = setInterval(function(){
							that.moveRight();
							that.slideOnce();
						}, settings.interval);
					}
				});
			}

		if(settings.control) {
			var arrow = S.all('<span class="arrow prev"></span><span class="arrow next"></span>');
			DOM.append(arrow, container);
			var prev = S.all('.prev', DOM.parent(arrow));
			var next = S.all('.next', DOM.parent(arrow));
			Event.on(prev, 'click', this.prevHandler);
			Event.on(next, 'click', this.nextHandler);
		}

		Event.on(container, "swipe", function(e) {
			if(e.direction == 'right') {
				that.prevHandler();
			}else if(e.direction == 'left') {
				that.nextHandler();
			}
		});

		}
	}

	return Slider;
}, {
	requires: ['dom', 'event']
});
KISSY.add('components/data',function(S, Mock, XTemplate){
	var dtd = {
		'price|100-500': 128,
		'shop|1': ['特步', '安踏', '匹克', '鸿星尔克', '乔丹'],
		'deals|100-9000': 200,
		'assess': function() {
	      return Mock.Random.integer(100, this.deals);
	    }
	};

	var source = 
		'<div class="product">\
			<div class="product-wrap">\
				<div class="productImg-wrap">\
					<a href="" class="productImg">\
						<img src="img/{{shop}}.jpg">\
					</a>\
				</div>\
				<div class="productPrice">\
					<em><b>¥</b>{{price}}.00</em>\
				</div>\
				<div class="productTitle">\
					<a href="">{{shop}}男鞋正品秋冬新款潮流休闲运动鞋男防滑加绒保暖棉鞋雪地鞋</a>\
				</div>\
				<div class="productShop">\
					<a href="">\
						{{shop}}官方旗舰店\
					</a>\
				</div>\
				<div class="productStatus">\
					<span>月成交 <em>{{deals}}笔</em></span>\
					<span>评价 <a href="">{{assess}}</a></span>\
				</div>\
			</div>\
		</div>';

	var html = '';
	var count = Mock.Random.integer(3, 10);

	// 渲染模板
	for(var i=0; i<count; i++){
		html += new XTemplate(source).render(Mock.mock(dtd));
	}	

	return html;
}, {
	requires: ['mock', 'xtemplate']
});
KISSY.add('components/overlay',function(S, DOM, Event) {

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
KISSY.add('components/main',function(S, Slider, mockdata, Event, Overlay) {
	// 轮播
	S.ready(function() {
		new Slider(S.all(".slider"), {
			autoplay: true
		});
	});

	// 填充商品列表
	S.all("#part2").append(mockdata);

	Event.on('a', 'click', function(e) {
		e.preventDefault();
	});

	// 弹出浮层
	Overlay(S.all("img", "#part2"));
}, {
	requires: ["./slide_k", "./data", "event", "./overlay", "node"]
});
