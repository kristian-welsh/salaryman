const fs = require('fs')

const PUBLIC_PATH = './src/public/';

// never use fetchResource on user input, it opens us to an injection attack
module.exports = {
    "fetchResource": function(path) {
        return fs.readFileSync(PUBLIC_PATH + path, { encoding: 'utf8' });
    }
}

