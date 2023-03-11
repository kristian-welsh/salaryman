const express = require('express')
const fs = require('fs')

const TRAIN_ACTION = require('./endpoints/train.js')

const PORT = 8080
// relative to project root
const SERVER_PATH = './src/server/';
const PUBLIC_PATH = './src/public/';
const PUBLIC_HTML_PATH = PUBLIC_PATH + 'html/';
const PUBLIC_JS_PATH = PUBLIC_PATH + 'js/';

const API_RPC = '/api/rpc/v1/';


let app = express()

/* fs library wrapper */
var transformReq = (input) => input
var transformResp = (output) => output

// never use fetchResource on user input, it opens us to an injection attack
var fetchResource = (path) => {
	return fs.readFileSync(path, {encoding: 'utf8'})
};
var fetchPublicResource = (name) => fetchResource(PUBLIC_PATH, name);
var fetchServerResource = (name) => fetchResource(SERVER_PATH, name);

/* express library wrapper */
var processEndpointRoute = (endpointAction, webRequest) => 
		transformResp(
			endpointAction.run(
				transformReq(webRequest)));

var routeServerEndpoint = (api, uri, endpointAction) => {
	app.post(api + uri, (webRequest, webResponse) => {
		let responseBody = processEndpointRoute(endpointAction, webRequest)
		webResponse.set({'Content-Type': 'application/json'});
		webResponse.send(responseBody);
		webResponse.end();
	});
}

var routePath = (uri, resourcePath, contentType) => {
	app.get(uri, (webRequest, webResponse) => {
		let resource = fetchResource(resourcePath);
		webResponse.set({'Content-Type': contentType});
		webResponse.send(resource);
		webResponse.end();
	});
}


var startServer = (PORT) => {
	app.listen(PORT, function(err) {
		if(err) console.log(err);
		console.log('Server listening on port ' + PORT);
	});
}
var routePage = (uri, pageName) => routePath(uri, PUBLIC_HTML_PATH + pageName, 'text/html');
var routeJs = (uri, pageName) => routePath(uri, PUBLIC_JS_PATH + pageName, 'text/javascript');

/* webserver application code */

routePage('/', 'index.html');
routeJs('/js/index.js', 'index.js');
routeServerEndpoint(API_RPC, 'train', TRAIN_ACTION);

startServer(PORT);
