/**
 * Created by Timor on 6/8/2017.
 */
const serverUtils = {
    pageNotFound: (response) => {
        response.writeHead(404,"text/plain");
        response.end("404: file not found.");
        return response;
    },
    notProxyPage: (response) => {
        response.writeHead(404,"text/plain");
        response.end("404: The request should be sent to proxy 'localhost:3000/proxy/?url=example.com'.");
        return response;
    }
}

module.exports.serverUtilsFunctions = serverUtils;