const parser = require('../utils/rss-parser');

module.exports = async (ctx) => {
    const data = ctx.request.body;
    const url = data.url;
    const rss = await parser.parseURL(url);
    rss.items.map((item) => {
        item.description = item.content;
        return item;
    });

    ctx.state.data = {
        title: rss.title,
        link: rss.link,
        description: rss.description,
        item: rss.items,
    };
};
