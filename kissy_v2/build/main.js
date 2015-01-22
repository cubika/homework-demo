/*
combined files : 

components/data
components/main

*/
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
KISSY.add('components/main',function(S, XSlide, mockdata, Event, Overlay, DOM) {
	// 轮播
	var slide = new XSlide({
        renderTo: "#J_Slide",
        autoRender:false,
        autoSlide:true,
        timeOut:3000,
        crousel:true //开启旋转木马
    });
    slide.render();

	// 填充商品列表
	S.all("#part2").append(mockdata);

	Event.on('a', 'click', function(e) {
		e.preventDefault();
	});

	// 弹出浮层
	var overlay;
	var margins = {
		vertical : 140,
		horizontal : 220
	};
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
		console.log("resize...");
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

	Event.on(S.all("img", "#part2"), 'click', function(e){
		var target = S.all(e.target);
		var src = 
		'<div>\
			<img id="overlayImg" src="' + DOM.attr(target, 'src') + '" alt="">\
			<div class="description">\
				<h3 class="title">' + DOM.text(S.all('.productTitle', DOM.parent(target, '.product'))) + '</h3>\
			</div>\
		</div>';

		if(overlay) {
			overlay.destroy();
		}
		overlay = new Overlay( {
		    zIndex: 10000,
		    width: "100%",
		    height: "100%",
		    elCls: "overlayMask",
			mask: true,
		    content: src
		  });
		
  		overlay.show();
  		resizeHandler(S.all("#overlayImg"), margins);
	});

	Event.delegate(document, 'click', '.overlayMask', function() {
		if(overlay) {
			overlay.hide();
		}
	});
	Event.on(window, 'resize', function() {
		if(S.all("#overlayImg")) {
			resizeHandler(S.all("#overlayImg"), margins);
		}
	});

}, {
	requires: ["gallery/xslide/1.0/index", "./data", "event", "overlay", "dom"]
});
