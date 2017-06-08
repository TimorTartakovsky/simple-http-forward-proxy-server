/**
 * Created by Timor on 6/8/2017.
 *
 */
const http = require('http');
const url = require('url');
const serevrUtils = require('./serverUtils');

const server = http.createServer(function(req, res) {
    let browser_url = url.parse(req.url, true);
    //Validate request contains query and url parameter
    if(!browser_url.query || !browser_url.query.url) return serevrUtils.serverUtilsFunctions.pageNotFound(res);
    //Validate request contains proxy path
    if(!browser_url.query.proxy) return serevrUtils.serverUtilsFunctions.notProxyPage(res);

    let parsedUrl = url.parse(browser_url.query.url);
    let parsed_client = http.createClient(parsedUrl.port || 80, parsedUrl.hostname);
    let parsed_request = parsed_client.request('GET', parsedUrl.pathname || "/", {
        host: parsedUrl.hostname
    });
    parsed_request.end();
    parsed_request.addListener('response', (parsed_response)=> {
        res.writeHead(parsed_response.statusCode, parsed_response.headers);
            parsed_response.addListener('data', (chunk)=>{
                res.write(chunk);
            });
            parsed_response.addListener('end', ()=>{
                res.end();
            });
        });
});

server.listen(3000);