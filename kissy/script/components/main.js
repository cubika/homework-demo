KISSY.add(function(S, Slider, mockdata, Event, Overlay) {
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