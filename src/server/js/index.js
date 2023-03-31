const routing_lib = require('./lib/routing.js')
const training_feature = require('./endpoints/train.js')

const router = new routing_lib.Router();
const TRAIN_ACTION = training_feature;

const PORT = 8080
const router = new routing_lib.Router();

router.routePage('/', 'index.html');
router.routeScript('/index.js', 'index.js');
router.routeEndpoint('train', './endpoints/train.js');

router.startServer(PORT);
