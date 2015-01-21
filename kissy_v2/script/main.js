KISSY.add(function(S, XSlide, mockdata, Event, Overlay) {
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
	Overlay(S.all("img", "#part2"));
}, {
	requires: ["gallery/xslide/1.0/index", "./data", "event", "./overlay", "node"]
});