const routing_lib = require('./lib/routing.js')
const training_feature = require('./endpoints/train.js')

const PORT = 8080
const TRAIN_ACTION = training_feature;

let router = new routing_lib.Router();

router.routePath('/', '/html/index.html', 'text/html');
router.routePath('/js/index.js', '/js/index.js', 'text/javascript');
router.routeEndpoint('train', TRAIN_ACTION);

router.startServer(PORT);
