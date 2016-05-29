if (window.heimr === undefined) {
	window.heimr = {};
}
window.heimr.domains = {};

(function ($) {
	var heimr = window.heimr;
	var data = {
		alchemy: 'assets/json/alchemy.json',
		armed_combat: 'assets/json/armed_combat.json',
		battlefield_surgery: 'assets/json/battlefield_surgery.json',
		defence: 'assets/json/defence.json',
		divine_magic: 'assets/json/divine_magic.json',
		primordial_magic: 'assets/json/primordial_magic.json',
		races: 'assets/json/races.json',
		marketplace: 'assets/json/the_marketplace.json'
	};
	var ready = 0;

	Object.keys(data).forEach(function (key) {
		$.ajax(data[key])
		.done(function (result) {
			heimr.domains[key] = result;

			// Count until all domains are downloaded
			ready += 1;
			if (ready === Object.keys(data).length) {
				heimr.dataReady = true;

				// When template is ready, start
				if (heimr.templatesReady) {
					heimr.start();
				}
			}
		});
	});
}(jQuery));