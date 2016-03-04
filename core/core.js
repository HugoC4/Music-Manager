Core = {
	musicList: $(),
	recordingsList: $(),
	vinylRipsList: $(),
	loader: $(),
	content: $(),
	init: function() {
		Core.loader = $("#loader");	
		
		Core.musicList = $("#musicList");			
		Core.recordingsList = $("#recordingsList");			
		Core.vinylRipsList = $("#vinylRipsList");	
		Core.content = $("#content");
		
		Templates.queue.add(Templates.MUSIC_LIST, Core.musicList, {'list': Data.music});
		Templates.queue.add(Templates.RECORDINGS_LIST, Core.recordingsList, {'list': Data.recordings});
		Templates.queue.add(Templates.VINYL_RIPS_LIST, Core.vinylRipsList, {'list': Data.vinylRips});
		
		Pages.Dashboard();
	}
}

Templates.init();
Data.init();
Core.init();
Pages.init();