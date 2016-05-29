if (window.heimr === undefined) {
	window.heimr = {};
}

(function ($) {
	var heimr = window.heimr;
	heimr.templates = {};

	var templates = {
		main: 'templates/main.html'
	};
	var ready = 0;
	Object.keys(templates).forEach(function (name) {
		$.ajax(templates[name])
		.done(function (template) {
			// Create the template
			heimr.templates[name] = Handlebars.compile(template);

			// Count until all templates are downloaded
			ready += 1;
			if (ready === Object.keys(templates).length) {
				heimr.templatesReady = true;

				// If data is also ready, start
				if (heimr.dataReady) {
					heimr.start();
				}
			}
		});
	});
}(jQuery));