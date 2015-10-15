var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');
var types   = ['race', 'skill', 'item', 'condition'];
var url     = 'http://heimr.nl/book/export/html/1838';

// Create a dir to store the json files in later
var dir = './data/';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

console.log('loading ' + url);
// Load the page
request(url, function (error, response, html) {
    if (error || response.statusCode != 200) {
        return;
    }
    var $ = cheerio.load(html);

    function tableToObject($table, obj) {
        obj = obj || {};

        $table.find('tr').each(function (i, elm) {
            var key = $('th', this).first().text().toLowerCase();
            var val = $('td', this).first().text();
            if (typeof obj[key] === 'undefined') {
                obj[key] = val;
            } else {
                if (typeof obj[key] === 'string') {
                    obj[key] = [obj[key]];
                }
                obj[key].push(val);
            }
        });
        return obj;
    }

    $('.section-3').each(function () {
        var $domain    = $(this);
        var domainName = $domain.find('h1').first().text();
        var results    = {};

        $domain.find('table').each(function () {
            var $table = $(this);
            var type = $table.find('th').first().text().toLowerCase();
            var name = $table.find('td').first().text();

            if (types.indexOf(type) === -1) {
                return;
            }

            if (!results[type]) {
                results[type] = [];
            }
            var obj = tableToObject($table, {name: name});
            if (obj.points) {
                obj.points = obj.points-0;
            }
            delete obj[type];
            results[type].push(obj);
        });

        // Check if there is something in the results
        if (Object.keys(results).length !== 0) {
            var stringified = JSON.stringify(results, null, '\t');
            var fileName = domainName.toLowerCase()
                            .replace(/\s+/g, '_')
                            .replace(/[^a-z_]/g, '') + '.json';
            // write to file
            fs.writeFile(dir + fileName, stringified,    function (err) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log('created ' + fileName);
                }
            });
        }
    });
});