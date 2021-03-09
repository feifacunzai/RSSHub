const Router = require('@koa/router');
const cors_router = new Router();

// API RSS
cors_router.post('/rss/:url', require('./cors_api_rss'));
cors_router.options('/rss/:url');

cors_router.post('/doc/:url', require('./cors_api_doc'));
cors_router.options('/doc/:url');

module.exports = cors_router;
