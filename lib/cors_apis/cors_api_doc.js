const parser = require('../utils/rss-parser');
const got = require('@/utils/got');

module.exports = async (ctx) => {
    const data = ctx.request.body;
    const url = data.url;
    const response = await got(url);
    const doc = response.body;

    ctx.body = doc ;
};
