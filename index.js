var SlackBot = require('slackbots');
var EventNames = require('./src/constants.js').EventNames;
var ChannelBot = require('./src/channelBot.js');
var db = require('sqlite');

var settings = {
  channels: ['G0JHBFCJD'],
  showScoreInterval: 2,
  nextQuestionGap: 5000,
};

db.open('./trivia.db');
var slackBot = new SlackBot({
  token: 'TOKEN',
  name: 'trivia'
});

slackBot.on(EventNames.Open, async () => {
  console.log('[SlackBot is now connected]');
  for (var channel of settings.channels) {
    new ChannelBot(db, slackBot, channel, settings).run();
    console.log(`Started bot for channel ${channel}`);
  }
});
