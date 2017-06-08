'use strict';

/**
 * Created by Timor on 6/8/2017.
 *
 */
var http = require('http');
var url = require('url');
var serevrUtils = require('./serverUtils');

var server = http.createServer(function (req, res) {
    var browser_url = url.parse(req.url, true);
    //Validate request contains query and url parameter
    if (!browser_url.query || !browser_url.query.url) return serevrUtils.serverUtilsFunctions.pageNotFound(res);
    //Validate request contains proxy path
    if (!browser_url.query.proxy) return serevrUtils.serverUtilsFunctions.notProxyPage(res);

    var parsedUrl = url.parse(browser_url.query.url);
    var parsed_client = http.createClient(parsedUrl.port || 80, parsedUrl.hostname);
    var parsed_request = parsed_client.request('GET', parsedUrl.pathname || "/", {
        host: parsedUrl.hostname
    });
    parsed_request.end();
    parsed_request.addListener('response', function (parsed_response) {
        res.writeHead(parsed_response.statusCode, parsed_response.headers);
        parsed_response.addListener('data', function (chunk) {
            res.write(chunk);
        });
        parsed_response.addListener('end', function () {
            res.end();
        });
    });
});

server.listen(3000);