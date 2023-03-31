const filesystem = require('./filesystem.js')
const express = require('express')

const API_RPC = '/api/rpc/v1/';

let app = express();

// todo
var transformReq = (input) => input
var transformResp = (output) => output

class Router {
    routeServerEndpoint(api, uri, endpointAction) {
        return app.post(api + uri, (webRequest, webResponse) => {
            let responseBody = transformResp(endpointAction.run(transformReq(webRequest)));
            webResponse.header('Content-Type', 'application/json');
            webResponse.send(responseBody);
            webResponse.end();
        });
    }

    routePath(uri, resourcePath, contentType) {
        return app.get(uri, (webRequest, webResponse) => {
            let resource = filesystem.fetchResource(resourcePath);
            webResponse.header('Content-Type', contentType);
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

    routeEndpoint(path, action) {
        this.routeServerEndpoint(API_RPC, path, action);
    }

    constructor() {
        this.x = 1;
    }
}

module.exports = { "Router": Router }
