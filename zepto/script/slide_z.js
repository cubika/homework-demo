(function ($) {
	
	function Slider(container, options) {
		this.defaults = {
			autoplay: true,
			control: false,
			duration: 500, // 效果过渡时间
			interval: 2000, // 翻页间隔
			hoverOnPause: true,
			orientation: 0
		};

		var settings = $.extend({}, this.defaults, options);
		var stops = [];
		var current = 0;
		var totalwidth = 0;
		var height = 0;
		var timer = null;
		var that = this;

		container.addClass('slider');
		var background;
		if(container.find('img').parent().is('a')) {
			background = $('<div class="background"></div>');
			$("a").wrapAll(background);
		}else {
			background = container.find("ul").addClass('background');
		}
		background.children().each(function(index, el) {
			var $this = $(this).addClass('slide');
			if(!$this.is('a') && !$this.is('li')) return;
			var img = $this.find('img');
			img.width(img.width());
			stops.push({
				width: img.width(),
				height: img.height()
			});
			totalwidth += img.width();
		});
		
		container.css({
			width: stops[current].width,
			height: stops[current].height
		});
		background.css({
			width: totalwidth
		});
		background.wrap('<div class="window"></div>');

		var nav = $("<ul class='nav'></ul>");
		for(var i=0; i<stops.length; i++) {
			nav.append('<li><a href="">' + (i+1) + '</a></li>');
		}
		nav.find("li").eq(current).addClass('selected');
		nav.on('click', function(e){
			current = $(e.target).closest('li').index();
			that.slideOnce();
			e.stopPropagation();
			return false;
		});
		container.append(nav);

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
			}, settings.duration, 'ease-in');

			container.css({
				width: stops[current].width,
				height: stops[current].height
			});
			nav.find("li").removeClass('selected').eq(current).addClass('selected');
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
				container.on('mouseover', function() {
					clearInterval(timer);
					timer = null;
				}).on('mouseleave', function() {
					if(timer == null) {
						timer = setInterval(function(){
							that.moveRight();
							that.slideOnce();
						}, settings.interval);
					}
				});
			}
		}

		if(settings.control) {
			var arrow = $('<span class="arrow prev"></span><span class="arrow next"></span>').appendTo(container);
			var prev = arrow.parent().find('.prev');
			var next = arrow.parent().find('.next');
			prev.on('click', this.prevHandler);
			next.on('click', this.nextHandler);
		}

		container.swipeRight(this.prevHandler);
		container.swipeLeft(this.nextHandler);
	}

	$.fn.slide = function(options) {

		return this.each(function() {
			if(!$(this).data('slider-instance')) {
				$(this).data('slider-instance', new Slider($(this), options));
			}
		});
	};

})(Zepto);