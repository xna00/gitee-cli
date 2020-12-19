const configFile = require('./config/config-file')
const config = configFile.getConfig()
const https = require('https')

module.exports.setConfig = (
    username = config.username,
    token = config.token,
    cookie = config.cookie) => {
    configFile.setConfig({
        ...config,
        username,
        token,
        cookie
    })
    console.log(username);
}
module.exports.createRepo = (name, path) => {
    const formData = {
        "access_token": config.token,
        "name": name,
        "has_issues": "true",
        "has_wiki": "true",
        "can_comment": "true"
    }
    https.request({
        hostname:'gitee.com',
        
    })
}