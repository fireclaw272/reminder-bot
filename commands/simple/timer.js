const commando = require('discord.js-commando');
const config = require('../../config.json');
const prefix = config.prefix;

class SetTimerCommand extends commando.Command{
    constructor(client){
        super(client,{
            name: 'interval',
            group: 'simple',
            memberName: 'interval',
            description: 'Keeps displaying a message after a specified amount of minutes have passed'
        });
    }

    async run(message){
        var args = message.content.slice(prefix.length).trim().split(/ +/g);
        var command = args.shift().toLowerCase();
        
        
        // intervals.push(setInterval(function(){message.channel.send('TEST');},1000));
        // console.log(intervals[0]);
        // setTimeout(function(){clearInterval(intervals[0]);console.log("DSADVRE");},5000 );

        //check for time argument
        if( !isNaN(args[0]) && typeof(args[1])=="string" ){
            var time = args[0];
            var reminder="";
            var user = message.author.id;
            console.log(user);
            for(var i=1;i<args.length;i++){
                console.log(args[i]);
                reminder += args[i] + " ";
            }
            message.channel.send('Time: Every ' + time +" mins \n Message: " +reminder);
            function repeat(){
                console.log(message.author.presence.status);
                if(message.author.presence.status !="dnd"){
                    if(message.author.presence.status =="offline"){
                        // message.channel.send('Interval ('+reminder+') has been stopped for ' + message.author.username);
                        // clearInterval(repeatInterval);
                        return;
                    }
                    else{
                        message.reply(reminder,{tts: true});
                    }
                }
                
            }
            //check if user exist in intervals
            if(!intervals[user]){
                intervals[user] = [];
            }
            intervals[user].push({
                msg : reminder,
                timer : time,
                channel : message.channel.id,
                interval : setInterval(repeat,time*60*1000)
            });

            console.log(intervals);
            
            
            
        }
        else{
            message.reply('format should be\n !interval <time in minutes> <Message>');
        }
    }
}

module.exports = SetTimerCommand;
