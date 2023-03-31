const fs = require('fs')

const SERVER_PATH = './src/server/';
const PUBLIC_PATH = './src/public/';

let fetchResource = function(path) {
    return fs.readFileSync(path, {encoding: 'utf8'})
}

// never use fetchResource on user input, it opens us to an injection attack
module.exports = {
    "fetchPublicResource": function(name) {
        return fetchResource(PUBLIC_PATH, name);
    },
    "fetchServerResource": function(name) {
        return fetchResource(SERVER_PATH, name);
    },
    "SERVER_PATH": SERVER_PATH,
    "PUBLIC_PATH": PUBLIC_PATH,
}

