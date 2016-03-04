FileSystem = {
	fs: require('fs'),
	path: require('path'),

	scan: function(dir) {
		var results = {};
		var list = FileSystem.fs.readdirSync(dir);
		for(var k in list) {
			var file = list[k];
			var path = FileSystem.path.resolve(dir, file);
			var stat = FileSystem.fs.statSync(path);
			if (stat && stat.isDirectory() && (file != "_getid3" && file != "Workout" && file != "Nihon Ongaku" && file != "Two Steps from Hell"))
				results[file] = {'metadata': stat, 'contents': FileSystem.scan(path)};
			 else if(file.match("\.(mp3|flac|wma|wav|m4a)$")) {
				if($.isEmptyObject(results))
					results = [];
				results.push({'metadata': stat, 'contents': file});				
			}			
		}
	    return results;
	}
}