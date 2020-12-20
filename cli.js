#!/usr/bin/env node
const { program } = require('commander')
const api = require('./index.js')
const pkg = require('./package.json')

program.version(pkg.version)

const config = program.command('config');
const set = config.command('set')
set.option('-u --username <username>', 'set username')
    .option('-t --token <token>', 'set token')
    .option('-c --cookie <cookie>', 'set cookie')
    .option('-x --X-CSRF-Token <XCSRFToken>')
    .description('set username, token, cookie')
    .action(({ username, token, cookie, XCSRFToken }) => {
        if (username || token || cookie || XCSRFToken) {
            api.setConfig({ username, token, cookie, XCSRFToken })
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
repo.command('list')
    .description('列出所有仓库')
    .action(api.listRepo)
const pages = program.command('pages')
pages.command('build <repo>')
    .description('启动/更新 pages')
    .action(api.buildPages)
program.parse(process.argv);