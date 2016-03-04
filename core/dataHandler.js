Data = {
	music: {},
	recordings: {},
	vinylRips: {},
	getStats: function(arr, isRecordings) {
		if(isRecordings)
			return Data.getArtistStats(arr, "C4Proto")
		
		var stats = {
			'artists': Object.keys(arr).length,
			'albums': {
				'count': 0,
				'newest': []
			},
			'tracks': {
				'count': 0,
				'newest': []
			}
		};
		
		for(var ar in arr) {
			var as = Data.getArtistStats(arr[ar]['contents'], ar)
			stats['albums']['count'] += as['albums']['count'];
			stats['tracks']['count'] += as['tracks']['count'];
			
			stats['tracks']['newest'] = stats['tracks']['newest'].concat(as['tracks']['newest']);
			stats['tracks']['newest'].sort(Data.sortTracks)
			stats['tracks']['newest'] = stats['tracks']['newest'].slice(0, 15);	
			
			stats['albums']['newest'] = stats['albums']['newest'].concat(as['albums']['newest']);
			stats['albums']['newest'].sort(Data.sortTracks)
			stats['albums']['newest'] = stats['albums']['newest'].slice(0, 15);			
		}
		return stats;
	},
	sortTracks: function(x, y) {
		return x['created'] > y['created'] ? -1 : x['created'] != y['created'] ? 1 : 0;
	},
	getArtistStats: function(arr, artist){
		var stats = {
			'albums': {
				'count': Object.keys(arr).length,
				'newest': []
			},
			'tracks': {
				'count': 0,
				'newest': []
			}
		};
		for(var al in arr) {
			stats['albums']['newest'].push({
					'title': al,
					'created': arr[al]['metadata']['birthtime'],
					'artist': artist
				});
			for(var tr in arr[al]['contents']) {
				var track = arr[al]['contents'][tr];
				stats['tracks']['count'] += 1;
				stats['tracks']['newest'].push({
					'title': track['contents'],
					'created': track['metadata']['birthtime'],
					'artist': artist
				});
			}
		}
		stats['tracks']['newest'].sort(Data.sortTracks)
		stats['tracks']['newest'] = stats['tracks']['newest'].slice(0, 15);
		stats['albums']['newest'].sort(Data.sortTracks)
		stats['albums']['newest'] = stats['albums']['newest'].slice(0, 15);
		return stats;
	},
	init: function() {	
		Data.music = FileSystem.scan("M:\\Music");				
		Data.recordings = FileSystem.scan("M:\\Audio\\Recordings");				
		Data.vinylRips = FileSystem.scan("M:\\Audio\\Vinyl Rips");
	}
}