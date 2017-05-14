var SlackBot = require('slackbots');
var EventNames = require('./src/constants.js').EventNames;
var ChannelBot = require('./src/channelBot.js');
var Utils = require('./src/utils.js');
var db = require('sqlite');

db.open('./data/trivia.db');
var settings = Utils.loadSettings();
var bot = new SlackBot({ token: settings.token , name: 'trivia' });

bot.on(EventNames.Open, async () => {
  settings.channels.forEach(ch => new ChannelBot(db, bot, ch, settings).run());
});
