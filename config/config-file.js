const fs = require('fs')
const homePath = process.env.HOME || fs.homedir()
const configPath = require('path').join(homePath, '.gitee')

module.exports.getConfig = () => {
    let config = fs.readFileSync(configPath, { flag: 'a+' }).toString()
    try {
        config = JSON.parse(config)
    } catch (e) {
        config = {}
    }
    return config
}
module.exports.setConfig = (config) => {
    console.log(config);
    fs.writeFileSync(configPath, JSON.stringify(config))
}