const parser = require('../utils/rss-parser');

module.exports = async (ctx) => {
    const data = ctx.request.body;
    const url = data.url;
    const rss = await parser.parseURL(url);
    ctx.state.data = {
        title: rss.title,
        link: rss.link,
        item: rss.items,
        description: rss.description,
    };
};
