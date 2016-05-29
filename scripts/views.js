if (window.heimr === undefined) {
	window.heimr = {};
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
			domains[domain] = domain.replace(/_/g, ' ');
		});
		var data = {
			domains: domains
		};

		var html = templates.main(data);
		console.log(html);
		$('#main').html(html);
	};


})(jQuery, window.heimr);