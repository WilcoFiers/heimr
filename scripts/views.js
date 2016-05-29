if (window.heimr === undefined) {
	window.heimr = {};
}

function convertName(name) {
	return name.replace(/_/g, ' ');
}

(function ($, heimr) {
	var templates = heimr.templates;
	var views = {};
	heimr.views = views;

	// Show the domains view
	views.domains = function () {
		var domains = {}
		Object.keys(heimr.domains)
		.forEach(function (domain) {
			domains[domain] = convertName(domain);
		});
		var data = {
			domains: domains
		};

		var html = templates.main(data);
		$('#main').html(html);

		// Open the domain
		$('.domain-select').bind('click', function (e) {
			var domainName = $(this).data('name');
			views.domain(domainName, 'skill');
		});
	};


	// Show
	views.domain = function (name, type) {
		var domain = heimr.domains[name];
		var list = domain[type];
		console.log(list);
		var data = {
			name: convertName(name),
			list: list
		};

		var html = templates.domain(data);
		$('#main').html(html);
	};

	views.detail = function (domain, type, name) {

	};

})(jQuery, window.heimr);

