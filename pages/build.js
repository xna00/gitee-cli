const https = require('https')
const querystring = require('querystring')
const zlib = require('zlib')
const config = require('../config/config.js').getConfig()
// let cookie = config.cookie
const postData = querystring.stringify({
    branch: 'master',
    build_directory: '',
    force_https: true,
    auto_update: false
})
let repo = ''
let firstTime = false
const createOption = () => {
    let path = `/${config.username}/${repo}/pages/rebuild`
    if (firstTime === true) {
        path = path.substring(0, path.lastIndexOf('/'))
    }
    return {
        hostname: "gitee.com",
        port: 443,
        method: 'POST',
        path,
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': postData.length,
            'Cookie': config.cookie,
            'Host': 'gitee.com',
            'Origin': 'https://gitee.com',
            'Referer': `https://gitee.com/${config.username}/${repo}/pages`,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.60',
            'X-CSRF-Token': 'kkSCx2pjSRwcuFF8u73m+GsSUmJ6F3Zf6ZZJbJ19f5c=',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
}
module.exports = buildPages = (targetRepo) => {
    repo = targetRepo
    const option = createOption()
    const req = https.request(option, res => {
        console.log('statusCode:', res.statusCode);
        let chunks = []
        let data
        res.on('data', (chunk) => {
            chunk = zlib.gunzipSync(chunk)
            chunks.push(chunk)
        });
        res.on('end', () => {
            data = Buffer.concat(chunks).toString()
            if (res.statusCode === 404 &&
                data === '{"status":404,"data":null,"message":"404 Not Found"}') {
                firstTime = true
                console.log('第一次启动 Pages');
                buildPages(repo)
            } else if (data.includes('频繁')) {
                console.log('请勿频繁更新部署，稍等1分钟再试试看');
            } else if (res.statusCode === 200 && data.includes('服务仅供博客')) {
                console.log('成功');
            } else {
                console.log('未知错误')
            }
        })
    })
    req.write(postData)
    req.end()
}
