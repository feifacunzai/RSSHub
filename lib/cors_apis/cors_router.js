const Router = require('@koa/router');
const cors_router = new Router();

// API RSS
cors_router.post('/rss/:url', require('./cors_api_rss'));
cors_router.options('/rss/:url');

module.exports = cors_router;
