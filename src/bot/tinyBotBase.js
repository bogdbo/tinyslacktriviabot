var MessageReader = require('./../messageReader.js')
var Utils = require('./../utils.js')
var MessageHelper = require('./../messageHelper.js')

class TinyBotBase {
  constructor (db, slackBot, channelId, settings) {
    this.db = db
    this.slackBot = slackBot
    this.channelId = channelId
    this.reader = new MessageReader(slackBot, channelId)
    this.question = null
    this.scores = Utils.loadScores(this.channelId)
    this.skips = {}
    this.settings = {
      showScoreInterval: 10,
      nextQuestionGap: 5000
    }
    Object.assign(this.settings, settings)
    this.showScoreCounter = this.settings.showScoreInterval
  }

  async postMessage (params) {
    await this.slackBot.postMessage(this.channelId, null, params)
  }

  isQuestionActive () {
    return this.question !== null
  }

  getUser (message) {
    return this.slackBot.getUserById(message.user)
  }

  markSkipped (user) {
    this.skips[user.name] = true
  }

  getSkipCount () {
    return Object.keys(this.skips).length
  }

  checkAnswer (message) {
    return this.question.a.toLowerCase().trim() === message.text.toLowerCase().trim()
  }

  addPoint (user) {
    this.scores[user.name] = (this.scores[user.name] || 0) + 1
  }

  async nextQuestion (delay) {
    this.question = null
    this.skips = {}
    setTimeout(async() => {
      this.question = await this.db.get('SELECT id, q, a FROM QUESTIONS ORDER BY random() LIMIT 1')
      await this.postMessage(MessageHelper.makeQuestionMessage(this.question))
    }, isNaN(delay) ? this.settings.nextQuestionGap : delay)
  }

  async handleScores () {
    this.showScoreCounte = this.settings.showScoreInterval
    this.postMessage(MessageHelper.makeScoresMessage(this.scores))
  }

  async handleHint () {
    await this.postMessage(MessageHelper.makeHintMessage(this.question))
  }

  async tryShowScores () {
    if (--this.showScoreCounter === 0) {
      this.showScoreCounter = this.settings.showScoreInterval
      await this.postMessage(MessageHelper.makeScoresMessage(this.scores))
    }
  }

  async handleSkip (user) {
    this.markSkipped(user)
    if (this.getSkipCount() >= this.settings.skipCount) {
      await this.postMessage(MessageHelper.makeAfterSkipMessage(this.question))
      await this.nextQuestion()
    } else {
      await this.postMessage(MessageHelper.makeSkipMessage(user, this.settings.skipCount - this.getSkipCount()))
    }
  }

  async handleAnswer (user, message) {
    if (this.checkAnswer(message)) {
      this.addPoint(user)
      Utils.saveScores(this.channelId, this.scores)
      await this.postMessage(MessageHelper.makeCorrectAnswerMessage(this.question, user, this.scores[user.name]))
      this.tryShowScores()
      await this.nextQuestion()
    }
  }
}

module.exports = TinyBotBase
