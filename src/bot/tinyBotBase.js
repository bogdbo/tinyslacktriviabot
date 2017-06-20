const MessageReader = require('./../messageReader.js')
const RepositoryProxy = require('./../repository/repositoryProxy.js')
const Utils = require('./../utils.js')

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

    this.questionRepository = new RepositoryProxy(this.settings)
    this.lastHintDate = null
    this.skipHandle = null
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

  addPoint (user, points = 1) {
    this.scores[user.name] = (this.scores[user.name] || 0) + points
  }

  async nextQuestion (delay) {
    clearTimeout(this.skipHandle)
    this.question = null
    this.skips = {}
    setTimeout(async() => {
      do {
        this.question = await this.questionRepository.getQuestion()
        this.questionChangedDate = Date.now()
      } while (!this.validateQuestion(this.question))
      await this.postMessage(this.questionRepository.makeQuestionMessage(this.question))
      this.skipHandle = setTimeout(this.skipQuestion.bind(this), Math.max(3000, this.settings.autoSkipAfter))
    }, Number.isSafeInteger(delay) ? delay : this.settings.nextQuestionGap)
  }

  async handleScores () {
    this.showScoreCounte = this.settings.showScoreInterval
    this.postMessage(this.questionRepository.makeScoresMessage(this.scores))
  }

  async handleHint () {
    if (Date.now() - this.lastHintDate >= this.settings.hintDelay) {
      await this.postMessage(this.questionRepository.makeHintMessage(this.question))
      this.lastHintDate = Date.now()
    }
  }

  async tryShowScores () {
    if (--this.showScoreCounter === 0) {
      this.showScoreCounter = this.settings.showScoreInterval
      await this.postMessage(this.questionRepository.makeScoresMessage(this.scores))
    }
  }

  async handleSkip (user) {
    this.markSkipped(user)
    if (this.getSkipCount() >= this.settings.skipCount) {
      this.skipQuestion()
    } else {
      await this.postMessage(this.questionRepository.makeSkipMessage(user, this.settings.skipCount - this.getSkipCount()))
    }
  }

  async skipQuestion () {
    await this.postMessage(this.questionRepository.makeAfterSkipMessage(this.question))
    await this.nextQuestion()
  }

  async handleAnswer (user, message) {
    const response = this.questionRepository.checkAnswer(this.question, message)
    if (response == null) {
      return
    }

    if (response.ok) {
      this.addPoint(user, this.question.points)
      Utils.saveScores(this.channelId, this.scores)
      await this.postMessage(this.questionRepository.makeCorrectAnswerMessage(this.question, user, this.scores[user.name]))
      this.tryShowScores()
      await this.nextQuestion()
    } else {
      if (response.message) {
        await this.postMessage(this.questionRepository.makeInvalidAnswerMessage(user, response))
      }
    }
  }

  validateQuestion (question) {
    return /(japanese|anime)/gi.test(question.category) === false
  }
}

module.exports = TinyBotBase
