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
			e.preventDefault();
		});
	};

	// Show
	views.domain = function (name, type) {
		var domain = heimr.domains[name];
		var list = domain[type] || [];

		var data = {
			name: convertName(name),
			list: list,
			current: type,
			types: Object.keys(domain)
		};

		var html = templates.domain(data);
		$('#main').html(html);

		// Change tabs
		$('a.detail-type').on('click', function (e) {
			var type = $(this).data('type');
			views.domain(name, type);
			e.preventDefault();
		});

		// Show detail
		$('a.select-detail').on('click', function (e) {
			var index = $(this).data('index');
			var detail = domain[type][index];
			views.detail(name, type, detail);
			e.preventDefault();
		});
	};

	views.detail = function (domain, type, detail) {
		var data = {
			domain: convertName(domain),
			type: type
		};

		Object.keys(detail)
		.forEach(function (key) {
			var newKey = key.replace(/\s+/g, '_').toLowerCase();
			console.log(newKey);
			data[newKey] = detail[key];
		});

		var html = templates.detail(data);
		$('#main').html(html);

		// Change tabs
		$('a.back').on('click', function (e) {
			views.domain(domain, type);
			e.preventDefault();
		});

		// Show detail
		$('a.select-detail').on('click', function (e) {
			var index = $(this).data('index');
			var detail = domain[type][index];
			views.detail(name, type, detail);
		});
	};

})(jQuery, window.heimr);

