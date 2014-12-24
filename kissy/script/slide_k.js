KISSY.add('slider', function(S, DOM, Event){

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

		DOM.addClass(container, 'slider');
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
		Event.on('click', function(e) {
			var li = DOM.parent(e.target, 'li');
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