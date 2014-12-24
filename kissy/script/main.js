KISSY.use('slider, mockdata, event, overlay, node', function(S, Slider, mockdata, Event, Overlay) {
	S.ready(function() {
		new Slider(S.all("#foo"), {
			autoplay: true,
			control: true
		});
	});

	S.all("#part2").append(mockdata);

	Event.on('a', 'click', function(e) {
		e.halt();
	});

	Overlay(S.all("img", "#part2"), S.all(".overlay"));
});