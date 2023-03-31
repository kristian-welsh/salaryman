const filesystem = require('./filesystem.js')
const express = require('express')

const API_RPC = '/api/rpc/v1/';


const PUBLIC_PATH = filesystem.PUBLIC_PATH;
const PUBLIC_HTML_PATH = PUBLIC_PATH + 'html/';
const PUBLIC_JS_PATH = PUBLIC_PATH + 'js/';

let app = express();

// todo
var transformReq = (input) => input
var transformResp = (output) => output

class Router {
    routeServerEndpoint(api, uri, endpointAction) {
        return app.post(api + uri, (webRequest, webResponse) => {
            let responseBody = transformResp(endpointAction.run(transformReq(webRequest)));
            webResponse.set({'Content-Type': 'application/json'});
            webResponse.send(responseBody);
            webResponse.end();
        });
    }

    routePath(uri, resourcePath, contentType) {
        return app.get(uri, (webRequest, webResponse) => {
            let resource = filesystem.fetchResource(resourcePath);
            webResponse.set({'Content-Type': contentType});
            webResponse.send(resource);
            webResponse.end();
        });
    }


    startServer(port) {
        return app.listen(port, function(err) {
            if(err) console.log(err);
            console.log('Server listening on port ' + port);
        });
    }

    routePage(uri, pageName) {
        this.routePath(uri, PUBLIC_HTML_PATH + pageName, 'text/html');
    }

    routeScript(uri, pageName) {
        this.routePath(uri, PUBLIC_JS_PATH + pageName, 'text/javascript');
    }

    routeEndpoint(path, action) {
        this.routeServerEndpoint(API_RPC, SERVER_PATH + 'endpoints/' + path, action);
    }

    constructor() {
        this.x = 1;
    }
}

module.exports = { "Router": Router }
