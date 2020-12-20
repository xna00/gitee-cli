const fs = require('fs')
const homePath = process.env.HOME || fs.homedir()
const configPath = require('path').join(homePath, '.gitee')

let config = fs.readFileSync(configPath, { flag: 'a+' }).toString()
try {
    config = JSON.parse(config)
} catch (e) {
    config = {}
}
configProxy = new Proxy(config, {
    get(target, key, receiver) {
        const ret = Reflect.get(target, key, receiver)
        if (ret === undefined) {
            console.log(`未设置${key}，退出`);
            process.exit(2)
        } else {
            return ret
        }
    }
})
module.exports.getConfig = () => {
    return configProxy
}
module.exports.setConfig = (config) => {
    console.log(config);
    fs.writeFileSync(configPath, JSON.stringify(config))
}