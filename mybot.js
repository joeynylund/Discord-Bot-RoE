const Discord = require("discord.js");
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const SteamAPI = require('steamapi');
const steam = new SteamAPI('STEAM API TOKEN')

 
client.on("ready", () => {
  console.log("I am ready!");
});
 
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (message.content === '!test') {
    steam.getUserOwnedGames('76561198076055485').then(stats => {
        for ( var i=0; i<stats.length; i++ ) {
            if (stats[i].appID == 755790) {
              var entry = stats[i];
              console.log(entry.playTime);
            }
          }
    })
  } else if (command === 'verify') {
    if (!args.length) {
        return message.channel.send(`You must provide your steam id, ${message.author}!`);
    }
    steam.getUserOwnedGames(args).then(stats => {
        for ( var i=0; i<stats.length; i++ ) {
            if (stats[i].appID == 755790) {
              var entry = stats[i];
              var hours = entry.playTime;

              if (hours >= 600) {
                  const member = message.member;
                  const role = message.guild.roles.get('528241134225457162');
                  message.reply('You have ' + hours + ' minutes played!')
                  member.addRole(role).catch(console.error);
              } else {
                  message.reply('You must have at least 10 hours played to be verified!')
              }
              
            }
          }
    })
}
});
 
client.login(token);