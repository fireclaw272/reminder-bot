const commando = require('discord.js-commando');
const config = require('../../config.json');
const prefix = config.prefix;

class CoinFlipCommand extends commando.Command{
    constructor(client){
        super(client,{
            name: 'info',
            group: 'simple',
            memberName: 'info',
            description: 'Displays all commands'
        });
    }

    async run(message){
        var args = message.content.slice(prefix.length).trim().split(/ +/g);
        var command = args.shift().toLowerCase();
        
        var msg = "";
        msg += "\n1) !interval <time in mins> <message>";
        msg += "\n2) !display_interval";
        msg += "\n3) !unset_interval <interval index>";

        message.channel.send(msg);
        
        
    }
}

module.exports = CoinFlipCommand;