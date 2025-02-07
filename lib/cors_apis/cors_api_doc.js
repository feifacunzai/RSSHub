const parser = require('../utils/rss-parser');
const got = require('@/utils/got');
const { promisify } = require('util');
const { CookieJar } = require('tough-cookie');

module.exports = async (ctx) => {
    const data = ctx.request.body;
    const method = data.method;
    const url = data.url;
    const cookieJar = new CookieJar();
    if (data.cookies && data.cookies.length > 0) {
        const setCookie = promisify(cookieJar.setCookie.bind(cookieJar));
        for (let cookie of data.cookies) {
            await setCookie(`${cookie.key}=${cookie.value}`, url);
        }
    }
    const response = method ? await got.post(url, { headers: data.headers, cookieJar }) : await got(url, { headers: data.headers, cookieJar });
    const doc = response.body;

    ctx.body = doc;
};
