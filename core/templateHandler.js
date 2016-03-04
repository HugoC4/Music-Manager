Templates = {
	MUSIC_LIST: "music_list",
	RECORDINGS_LIST: "recordings_list",
	VINYL_RIPS_LIST: "music_list",
	pages: {
		DASHBOARD: "pages/dashboard"
	},
	queue: {
		items: [],
		callback: null,
		add: function(mst, $sel, params) {
			Templates.queue.items.push([mst, $sel, params]);
		},
		run: function(callback) {
			if(callback !== undefined && callback !== null)
				Templates.queue.callback = callback;
			
			if(Templates.queue.items.length > 0 && !Templates.compiling) {
				Templates.compiling = true;
				Templates.render(Templates.queue.items.pop());
			}
			
			if(Templates.queue.isFinished()) {
				if(Templates.queue.callback !== null) {
					Templates.queue.callback();
					Templates.queue.callback = null;
				}
			} else {
				setTimeout(Templates.queue.run, 100);
			}
		},
		isFinished: function() {
			return Templates.queue.items.length == 0 && !Templates.compiling;
		}
	},
	compiling: false,
	helpers: {
		getYear: function(str) {
			str = Templates.helpers.trim(str);
			if(str.match("^[0-9]{4}"))
				return str.trim().substr(0,4);
			else
				return "X";
		},
		getNumber: function(str) {
			str = Templates.helpers.trim(str);
			if(str.match("^[0-9]{1,3}"))
				return str.trim().substr(0,str.indexOf(" "));
			else
				return 1;
		},
		getTitle: function(str) {
			str = Templates.helpers.trim(str);
			if(str.match("^[0-9]{1,4}( |)\-"))
				return Templates.helpers.removeExtension(str.trim().substr(str.indexOf("-")+1).trim());
			else
				return Templates.helpers.removeExtension(str.trim());
		},
		getIdYear: function(str) {
			str = Templates.helpers.trim(str);
			if(str.match("^#[0-9]{10}-[0-9]{2}(DX|DI|TM|IM|TV|RC)"))
				return "20" + str.substr(1,2);
			else
				return "X";
		},
		getIdTitle: function(str) {
			str = Templates.helpers.trim(str);
			if(str.match("^#[0-9]{10}-[0-9]{2}(DX|DI|TM|IM|TV|RC)"))
				if(str.match(" - (.*?)$"))
					if(str.match("\\((.*?)\\)$"))
						return Templates.helpers.removeExtension(str.substr(str.indexOf(" - ")+3, str.indexOf("(")-str.indexOf(" - ")-3).trim() + " (" + str.substr(0, str.indexOf(" - ")).trim() + ")");
					else
						return Templates.helpers.removeExtension(str.substr(str.indexOf(" - ")+3).trim() + " (" + str.substr(0, str.indexOf(" - ")).trim() + ")");
				else
					return Templates.helpers.removeExtension(str);
			else
				return "X";
		},
		getShortDate: function(date) {
			return date.toLocaleDateString();
		},
		removeExtension: function(str){
			str = Templates.helpers.trim(str);
			if(str.search(/\.[a-zA-Z0-9]{2,4}$/) !== -1)
				return str.substr(0, str.search(/\.[a-zA-Z0-9]{2,4}$/));
			return str;
		},
		trim: function(str) {
			return str = ("" + str).trim();
		}
	},
	
   /***
	* render([template, target, params])
	***/
	render: function(item) {
		jQuery.ajax({
			url: 'templates/' + item[0] + ".mst",
			success: function (template) {
				var render = Handlebars.compile(template);
				item[1].html(render(item[2]));
			}, 
			complete: function() {
				Templates.compiling = false;
			}
		});
	},
	init: function(){
		Handlebars.registerHelper('getYear', Templates.helpers.getYear);
		Handlebars.registerHelper('getNumber', Templates.helpers.getNumber);
		Handlebars.registerHelper('getTitle', Templates.helpers.getTitle);
		Handlebars.registerHelper('getIdYear', Templates.helpers.getIdYear);
		Handlebars.registerHelper('getIdTitle', Templates.helpers.getIdTitle);
		Handlebars.registerHelper('getShortDate', Templates.helpers.getShortDate);
		Handlebars.registerHelper('removeExtension', Templates.helpers.getIdYear);
		Handlebars.registerHelper('trim', Templates.helpers.getIdTitle);
	}
}