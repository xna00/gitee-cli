const configFile = require('./config/config')
const config = configFile.getConfig()
const https = require('https')
const querystring = require('querystring')

module.exports.setConfig = (username, token, cookie) => {
    username && (config.username = username)
    token && (config.token = token)
    cookie && (config.cookie = cookie)
    configFile.setConfig({
        ...config,
        username,
        token,
        cookie
    })
}
module.exports.createRepo = (name, path) => {
    const formData = {
        "access_token": config.token,
        "name": name,
        "has_issues": "true",
        "has_wiki": "true",
        "can_comment": "true"
    }
    const req = https.request({
        hostname: 'gitee.com',
        port: 443,
        path: '/api/v5/user/repos',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }, res => {
        console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);

        res.on('data', (d) => {
            // console.log(d.toString());
        });
    })
    req.write(JSON.stringify(formData))
    req.end()
}
module.exports.deleteRepo = (repo) => {
    const formData = {
        "access_token": config.token,
    }
    const req = https.request({
        hostname: 'gitee.com',
        port: 443,
        path: `/api/v5/repos/${config.username}/${repo}?${querystring.stringify(formData)}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    }, res => {
        console.log('statusCode:', res.statusCode);
        res.on('data', (d) => {
            console.log(JSON.parse(d.toString()));
        });
    })
    req.end()
}
module.exports.buildPages = require('./pages/build.js')