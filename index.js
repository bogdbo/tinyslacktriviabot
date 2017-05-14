var SlackBot = require('slackbots')
var EventNames = require('./src/constants.js').EventNames
var TinyChannelBot = require('./src/bot/tinyChannelBot.js')
var Utils = require('./src/utils.js')
var db = require('sqlite');

(async () => {
  await db.open('./data/trivia.db')
  const settings = Utils.loadSettings('./config.json')
  const bot = new SlackBot({ token: settings.token, name: 'trivia' })

  bot.on(EventNames.Open, async () => {
    settings.channels.forEach(ch => new TinyChannelBot(db, bot, ch, settings).run())
  })
})()
