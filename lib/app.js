const moduleAlias = require('module-alias');
moduleAlias.addAlias('@', () => __dirname);

require('./utils/request-wrapper');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('./utils/logger');

const onerror = require('./middleware/onerror');
const header = require('./middleware/header');
const cors_header = require('./cors_apis/cors_header');
const utf8 = require('./middleware/utf8');
const cache = require('./middleware/cache');
const parameter = require('./middleware/parameter');
const template = require('./middleware/template');
const favicon = require('koa-favicon');
const debug = require('./middleware/debug');
const accessControl = require('./middleware/access-control');
const antiHotlink = require('./middleware/anti-hotlink');

const router = require('./router');
const protected_router = require('./protected_router');
const cors_router = require('./cors_apis/cors_router');
const mount = require('koa-mount');

// API related
const apiTemplate = require('./middleware/api-template');
const api_router = require('./api_router');
const api_favicon = require('./api_favicon');
const apiResponseHandler = require('./middleware/api-response-handler');

process.on('uncaughtException', (e) => {
    logger.error('uncaughtException: ' + e);
});

const app = new Koa();
app.proxy = true;

// bodyParser
app.use(bodyParser());

// favicon
app.use(favicon(__dirname + '/favicon.png'));

// global error handing
app.use(onerror);

app.use(accessControl);

// 7 debug
app.context.debug = {
    hitCache: 0,
    request: 0,
    etag: 0,
    paths: [],
    routes: [],
    ips: [],
    errorPaths: [],
    errorRoutes: [],
};
app.use(debug);

// 6 set header
app.use(header);
app.use(cors_header);

// 5 fix incorrect `utf-8` characters
app.use(utf8);

app.use(apiTemplate);
app.use(apiResponseHandler());

// 4 generate body
app.use(template);
// anti-hotlink
app.use(antiHotlink);

// 3 filter content
app.use(parameter);

// 2 cache
app.use(cache(app));

// router
app.use(mount('/', router.routes())).use(router.allowedMethods());

// CORS API router
app.use(mount('/cors_apis', cors_router.routes())).use(cors_router.allowedMethods());

// routes the require authentication
app.use(mount('/protected', protected_router.routes())).use(protected_router.allowedMethods());

// API router
app.use(mount('/api', api_router.routes())).use(api_router.allowedMethods());

// API favicon
app.use(mount('/api', api_favicon.routes())).use(api_favicon.allowedMethods());

module.exports = app;
