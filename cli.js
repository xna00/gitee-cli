const { program, arguments } = require('commander')
const commander = require('commander')
// const config = require()
const fs = require('fs')
const api = require('./index.js')

const pkg = require('./package.json')

program.version(pkg.version)



// Add nested commands using `.addCommand().
// The command could be created separately in another module.
function makeHeatCommand() {
    const heat = new commander.Command('heat');
    heat
        .command('jug')
        .action(() => {
            console.log('heat jug');
        });
    heat
        .command('pot')
        .action(() => {
            console.log('heat pot');
        });
    return heat;
}
program.addCommand(makeHeatCommand());

const buy = program.command('buy')
// console.log(buy);
const start = program.command('start <service>');
start.command('stop [service]', 'stop named service, or all if no name supplied')
    .action(() => {
        console.log('stop!!!!!!!!!!!!!!!!');
    })
const brew = program.command('brew');
brew
    .command('tea')
    .action(() => {
        console.log('brew tea');
    });
brew
    .command('coffee')
    .action(() => {
        console.log('brew coffee');
    });
const set = program.command('set');
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
const repo = program.command('repo')
repo.command('create <name> ')
program.parse(process.argv);
console.log(000000);