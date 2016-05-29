if (window.heimr === undefined) {
	window.heimr = {};
}
(function ($, heimr) {
	var templates, domains, $root;

	// Everything is loaded, let's get started
	heimr.start = function () {
		templates = heimr.templates;
		domains = heimr.domains;
		$root = $('#main');

		// Show the domains view
		heimr.views.domains();
	};

}(jQuery, window.heimr))
