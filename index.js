const configFile = require('./config/config')
const config = configFile.getConfig()
const https = require('https')
const querystring = require('querystring')

module.exports.setConfig = (tmpConfig) => {
    Object.keys(config).forEach((key) => {
        if (tmpConfig[key] === undefined) {
            delete tmpConfig[key]
        }
    })
    configFile.setConfig({
        ...config,
        ...tmpConfig
    })
}
module.exports.getConfig = () => {
    console.log(config);
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
            console.log(d.toString());
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
module.exports.listRepo = ()=>{
    const formData = {
        access_token: '5579d082f80f96be814a986f85f1e044',
        sort: 'updated',
        page: 1,
        per_page: 100
    }
    const request = https.request({
        hostname: 'gitee.com',
        path:`/api/v5/user/repos?${querystring.stringify(formData)}`,
        method:'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }, 
    }, (response)=>{
        console.log(response.statusCode);
        const chunks = []
        let data = ''
        response.on('data',(chunk)=>{
            chunks.push(chunk)
        })
        response.on('end',()=>{
            data = Buffer.concat(chunks).toString()
            data = JSON.parse(data)
            data.forEach((repo)=>{
                console.log(repo.path);
            })
        })
    })
    request.end()
}
module.exports.buildPages = require('./pages/build.js')