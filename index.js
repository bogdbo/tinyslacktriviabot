const SlackBot = require('slackbots')
const EventNames = require('./src/constants.js').EventNames
const TinyChannelBot = require('./src/bot/tinyChannelBot.js')
const Utils = require('./src/utils.js')
const RepositoryBase = require('./src/repository/repositoryBase.js')
const DbRepository = require('./src/repository/DbRepository.js')
const JsRepository = require('./src/repository/JsRepository.js')
const JsonRepository = require('./src/repository/JsonRepository.js')
const TriviaDbRepository = require('./src/repository/TriviaDbRepository.js')
const HsRepository = require('./src/repository/HsRepository.js')

class TinySlackTriviaBot {
  static async run () {
    const settings = Utils.loadSettings('./config.json')
    const bot = new SlackBot({ token: settings.token, name: 'trivia' })

    bot.on(EventNames.Open, async () => {
      settings.channels.forEach(ch => new TinyChannelBot(bot, ch, settings).run())
    })
  }
}

module.exports = {
  TinySlackTriviaBot,
  RepositoryBase,
  Utils,

  DbRepository,
  JsRepository,
  JsonRepository,
  TriviaDbRepository,
  HsRepository
}
