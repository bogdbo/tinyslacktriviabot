const RepositoryBase = require('./repositoryBase.js')
const fs = require('fs')
const vm = require('vm')
const _ = require('lodash')
const smb = require('slack-message-builder')

class JsRepository extends RepositoryBase {
  constructor (settings) {
    super()
    this.codeBlock = '```'
    this.vmSettings = { timeout: 5 }
    this.questions = []
    this.loadQuestions(settings.jsDbPath)
  }

  loadQuestions (filename) {
    console.log('JsonRepository: loading questions')
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
    let result = true && question.validators.length > 0
    while (result && validatorIndex < question.validators.length) {
      result = result && this.validateQuestion(snippet, question.validators[validatorIndex++])
    }

    return result
  }

  validateQuestion (snippet, validator) {
    let context = vm.createContext()
    try {
      vm.runInContext(snippet, context, this.vmSettings)
      context._ = _
      return vm.runInContext(validator, context, this.vmSettings)
    } catch (ex) {
      // todo: show invalid question message
    }

    return false
  }

  /* Start Message Helpers */
  makeQuestionMessage (question) {
    return smb()
      .iconEmoji(':question:')
      .text(question.question)
      .json()
  }
  /* End Message Helpers */
}

module.exports = JsRepository
