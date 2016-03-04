Pages = {
	Dashboard: function() {
		Pages.load(Templates.pages.DASHBOARD, {
			"music": Data.getStats(Data.music, false),
			"rips": Data.getStats(Data.vinylRips, false),
			"recordings": Data.getStats(Data.recordings, true)
		});
	},
	load: function(template, params) {	
		Templates.queue.add(template, Core.content, params);
		Templates.queue.run(function() {
			Core.loader.fadeOut();
		});
	},
	init: function() {
		Core.content.on('click', 'a', function (){
			alert($(this).attr("href"));
		});
	}
}
