const commando = require('discord.js-commando');
const config = require('../../config.json');
const prefix = config.prefix;

class DeleteTimerCommand extends commando.Command{
    constructor(client){
        super(client,{
            name: 'unset_interval',
            group: 'simple',
            memberName: 'unset_interval',
            description: 'Deletes the specified interval (use !display_interval to view your intervals)'
        });
    }

    async run(message){
        var args = message.content.slice(prefix.length).trim().split(/ +/g);
        var command = args.shift().toLowerCase();
        //check if argument is a number
        if( !isNaN(args[0]) && args[0]>0 ){
            var user = message.author.id;
            var index = args[0];
            //check if user has any interval
            if(intervals[user]){
                //check if index is within length of array
                if(index <= intervals[user].length){
                    clearInterval(intervals[user][index-1].interval);
                    message.reply(intervals[user][index-1].msg + " successfully unset.");
                    intervals[user].splice(index-1,1);
                    console.log(intervals);
                }
                else{
                    message.reply('The number you entered is outside of how many intervals you actually have.');
                }
            }
            else{
                message.reply('You do not have any intervals to unset');
            }
            
            
        }
        else{
            message.reply('format should be\n !unset_interval <positive interval number to unset>');
        }
        

        
    }
}

module.exports = DeleteTimerCommand;