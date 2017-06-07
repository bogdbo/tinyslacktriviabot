var MessageReader = require('./../messageReader.js')
var Utils = require('./../utils.js')
var MessageHelper = require('./../messageHelper.js')

class TinyBotBase {
  constructor (slackBot, channelId, settings) {
    this.slackBot = slackBot
    this.channelId = channelId
    this.reader = new MessageReader(slackBot, channelId)
    this.question = null
    this.scores = Utils.loadScores(this.channelId)
    this.skips = {}
    Object.assign((this.settings = {}), Utils.getDefaultSettings(), settings)
    this.showScoreCounter = this.settings.showScoreInterval

    var DynamicRepository = require(this.settings.repository)
    this.questionRepository = new DynamicRepository(this.settings)
    this.lastHintDate = null
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
    return this.question.answer.toLowerCase().trim() === message.text.toLowerCase().trim()
  }

  addPoint (user, points = 1) {
    this.scores[user.name] = (this.scores[user.name] || 0) + points
  }

  async nextQuestion (delay) {
    this.question = null
    this.skips = {}
    setTimeout(async() => {
      do {
        this.question = await this.questionRepository.getQuestion()
      } while (!this.validateQuestion(this.question))
      await this.postMessage(MessageHelper.makeQuestionMessage(this.question))
      this.lastHintDate = Date.now()
    }, isNaN(delay) ? this.settings.nextQuestionGap : delay)
  }

  async handleScores () {
    this.showScoreCounte = this.settings.showScoreInterval
    this.postMessage(MessageHelper.makeScoresMessage(this.scores))
  }

  async handleHint () {
    if (Date.now() - this.lastHintDate >= this.settings.hintDelay) {
      await this.postMessage(MessageHelper.makeHintMessage(this.question))
      this.lastHintDate = Date.now()
    }
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
      this.addPoint(user, this.question.points)
      Utils.saveScores(this.channelId, this.scores)
      await this.postMessage(MessageHelper.makeCorrectAnswerMessage(this.question, user, this.scores[user.name]))
      this.tryShowScores()
      await this.nextQuestion()
    }
  }

  validateQuestion (question) {
    return /(japanese|anime)/gi.test(question.category) === false
  }
}

module.exports = TinyBotBase
