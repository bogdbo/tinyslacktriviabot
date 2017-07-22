const RepositoryBase = require('./repositoryBase.js')
const fs = require('fs')
const vm = require('vm')
const _ = require('lodash')
const smb = require('slack-message-builder')
const path = require('path')
const Utils = require('./../utils.js')

class JsRepository extends RepositoryBase {
  constructor (repositorySettings, settings) {
    super()
    this.codeBlock = '```'
    this.vmSettings = { timeout: 1000 }
    this.questions = []
    this.loadQuestions(repositorySettings.dbPath || path.resolve(__dirname, './../../data/jsQuestions.json'))
  }

  loadQuestions (filename) {
    console.log('JsRepository: loading questions')
    filename = Utils.resolveDbPath(filename)
    if (filename && fs.existsSync(filename)) {
      this.questions = JSON.parse(fs.readFileSync(filename, 'utf8').trim())
      this.questions = this.questions
    } else {
      throw String('Could not find path')
    }

    if (this.questions.length === 0) {
      throw String('Could not load questions')
    }
  }

  async getQuestion () {
    const randomPosition = Math.floor(Math.random() * this.questions.length)
    return this.questions[randomPosition]
  }

  checkAnswer (question, message) {
    let snippet = message.text
    const start = snippet.indexOf(this.codeBlock)
    const end = snippet.lastIndexOf(this.codeBlock)
    // remove markup characters
    if (start !== 0 || end === start) {
      return false
    }

    snippet = snippet.slice(this.codeBlock.length)
    snippet = snippet.slice(0, snippet.lastIndexOf(this.codeBlock))

    let validatorIndex = 0
    const response = { ok: question.validators.length > 0, message: 'No validators' }
    while (response.ok && validatorIndex < question.validators.length) {
      Object.assign(response, this.validateQuestion(snippet, question.validators[validatorIndex++]))
    }

    return response
  }

  validateQuestion (snippet, validator) {
    let context = vm.createContext()
    const response = { ok: false, message: 'N/A' }
    try {
      vm.runInContext(snippet, context, this.vmSettings)
      context._ = _
      response.message = `Failed: ${validator}`
      response.ok = !!vm.runInContext(validator, context, this.vmSettings)
    } catch (ex) {
      response.message = ex.message || ex
      response.ok = false
    }

    return response
  }

  /* Start Message Helpers */
  makeQuestionMessage (question) {
    return smb()
      .iconEmoji(':question:')
      .text(`${question.question} *\`${question.points} points\`*  `)
      .json()
  }

  makeCorrectAnswerMessage (question, user, points) {
    return {
      icon_emoji: ':tada:',
      attachments: [{
        'fallback': 'correct',
        'color': '#00bf3c',
        'author_name': 'Congratulations',
        'title': `@${user.name} answered correctly`,
        'footer': `${points} points (+${question.points} point${question.points > 1 ? 's' : ''})`
      }]
    }
  }

  makeInvalidAnswerMessage (user, response) {
    return smb()
      .iconEmoji(':bug:')
      .attachment()
        .color('#ff00fa')
        .footer(response.message)
        .end()
      .json()
  }

  makeAfterSkipMessage (question) {
    return {
      icon_emoji: ':fast_forward:',
      attachments: [{
        'fallback': 'skipped',
        'color': '#ededed',
        'author_name': 'Question skipped'
      }]
    }
  }

  makeHint (answer) {
    return 'No hints for programming questions, google is your buddy'
  }

  makeHintMessage (question) {
    return {
      icon_emoji: ':bulb:',
      attachments: [{
        'fallback': 'hint',
        'color': '#ffdd00',
        'title': this.makeHint(question.answer)
      }]
    }
  }
  /* End Message Helpers */
}

module.exports = JsRepository
