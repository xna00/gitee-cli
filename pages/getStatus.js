const config = require('../config/config.js').getConfig()
const https = require('https')
const zlib = require('zlib')
const check = (repo) => {
    return new Promise((resolve, reject) => {
        https.request({
            hostname: 'gitee.com',
            method: 'GET',
            path: `/${config.username}/${repo}/pages`,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'Cookie': config.cookie,
                'Host': 'gitee.com',
                'Referer': `https://gitee.com/${config.username}/${repo}/pages`,
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.60'
            }
        }, (response) => {
            let chunks = []
            let data
            response.on('data', chunk => chunks.push(chunk))
            response.on('error', (err) => console.log(err))
            response.on('end', () => {
                data = zlib.gunzipSync(Buffer.concat(chunks)).toString()
                if (data.includes('部署失败')) {
                    const re = /错误信息.*(?=<\/p>)/g
                    const errors = data.match(re)
                    errors.length && reject(errors.join())
                }
                else {
                    resolve(response.statusCode)
                }
            })
        }).end()
    })
}
module.exports = check