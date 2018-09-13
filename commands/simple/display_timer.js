const commando = require('discord.js-commando');
const config = require('../../config.json');
const prefix = config.prefix;

class DisplayTimerCommand extends commando.Command{
    constructor(client){
        super(client,{
            name: 'display_interval',
            group: 'simple',
            memberName: 'display_interval',
            description: 'Shows all the intervals you have on'
        });
    }

    async run(message){
        var args = message.content.slice(prefix.length).trim().split(/ +/g);
        var command = args.shift().toLowerCase();
        
        var user = message.author.id;
        if(intervals[user] && intervals[user].length !=0){
            var returnMessage ="Your intervals: \n";
            for(var i=0;i<intervals[user].length;i++){
                returnMessage += (i+1)+") " + intervals[user][i].msg + "\n";
            }
            message.reply(returnMessage);
        }
        else{
            message.reply('You do not have any intervals to display. Use !interval to set one');
        }

        
    }
}

module.exports = DisplayTimerCommand;