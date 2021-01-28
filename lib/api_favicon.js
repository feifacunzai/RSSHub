const Router = require('@koa/router');
const router = new Router();
const logger = require('./utils/logger');
const getFavicons = require('get-website-favicon')

router.get('/favicon/:url?', async (ctx) => {
    let result = await getFavicons(ctx.params.url);
    let counter = result.icons.length;

    ctx.body = { counter, result };
});

module.exports = router;
