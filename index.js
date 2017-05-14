var SlackBot = require('slackbots')
var EventNames = require('./src/constants.js').EventNames
var TinyChannelBot = require('./src/bot/tinyChannelBot.js')
var Utils = require('./src/utils.js')
var path = require('path')
var db = require('sqlite')

class TinySlackTriviaBot {
  static async run () {
    await db.open(path.resolve(__dirname, './data/trivia.db'))
    const settings = Utils.loadSettings('./config.json')
    const bot = new SlackBot({ token: settings.token, name: 'trivia' })

    bot.on(EventNames.Open, async () => {
      settings.channels.forEach(ch => new TinyChannelBot(db, bot, ch, settings).run())
    })
  }
}

module.exports = TinySlackTriviaBot
