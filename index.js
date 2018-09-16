const Commando = require('discord.js-commando');
const bot = new Commando.Client();
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
global.intervals={};
var start = "";

bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.on('message',function(message){
    if(message.content == "Hello"){
        message.reply('Hello person, how are you?');
    }
    if(message.content == "Start"){
    }
    if(message.content == "Stop"){
        clearInterval(start);
        message.channel.send("STOPPED",{tts: true});
    }
});

bot.on('ready',function(message){
    console.log('ready');
    var myChannel = bot.channels.find("id","489951319830954005");
    myChannel.send("I have been reset!");
});

bot.on("presenceUpdate", (oldMember, newMember) => {
    if(oldMember.presence.status !== newMember.presence.status){
        if(oldMember.presence.status == 'offline'){
            var user = newMember.id;
            if(intervals[user] && intervals[user].length >0){
                for(var i=0; i<intervals[user].length;i++){
                    console.log("reset");
                    console.log(intervals);
                    var msg = intervals[user][i].msg;
                    console.log(msg);
                    var timer = intervals[user][i].timer;
                    var channel = bot.channels.find("id",intervals[user][i].channel);

                    function repeat(mess){
                        if(newMember.presence.status !='dnd'){
                            if(newMember.presence.status !="offline"){
                                channel.send("<@"+user+"> "+ mess ,{tts: true});
                            }
                            else{
                                return
                            }
                        }
                    }
                    clearInterval(intervals[user][i].interval);
                    intervals[user][i].interval = setInterval(repeat,timer*60*1000,msg);

                }
                console.log(intervals);
            }
        }
        //guild.channels[0].send(newMember.user.username + "is now "+ newMember.user.presence.status);
    }
});


bot.login(process.env.BOT_TOKEN);


