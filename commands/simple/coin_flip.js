const commando = require('discord.js-commando');
const prefix = "!";

class CoinFlipCommand extends commando.Command{
    constructor(client){
        super(client,{
            name: 'flip',
            group: 'simple',
            memberName: 'flip',
            description: 'Flips a specified number of coins (no arguments means 1 coin)'
        });
    }

    async run(message){
        var args = message.content.slice(prefix.length).trim().split(/ +/g);
        var command = args.shift().toLowerCase();
        
        
        if( ( !isNaN(args[0]) && args[0] >0) || args[0]==null){
            var heads = 0;
            var tails = 0;
            var times = (args[0] == null) ? 1:args[0];
            for(var i=0;i<times;i++){
                var chance = Math.random();
                if(chance >= 0.5){
                    heads++;
                }
                else{
                    tails++;
                }
            }
            message.reply("You flipped "+times+" coin(s) and got: \n Heads: "+heads+"\n Tails: "+tails);
            
            
        }
        else{
            message.reply('Please input a number greater than 0 as the first argument');
        }
        
    }
}

module.exports = CoinFlipCommand;