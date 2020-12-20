#!/usr/bin/env node
const { program, arguments } = require('commander')
const commander = require('commander')
const api = require('./index.js')

const pkg = require('./package.json')

program.version(pkg.version)

const config = program.command('config');
const set = config.command('set')
set.option('-u --username <username>', 'set username')
    .option('-t --token <token>', 'set token')
    .option('-c --cookie <cookie>', 'set cookie')
    .description('set username, token, cookie')
    .action(({ username, token, cookie }) => {
        if (username || token || cookie) {
            api.setConfig(username, token, cookie)
        } else {
            set.help()
        }
    })
config.command('get')
    .action(api.getConfig)

const repo = program.command('repo')
repo.command('create <name>')
    .description('创建仓库')
    .action(api.createRepo)
repo.command('delete <repo>')
    .description('删除仓库')
    .action(api.deleteRepo)
const pages = program.command('pages')
pages.command('build <repo>')
    .description('启动/更新 pages')
    .action(api.buildPages)
program.parse(process.argv);