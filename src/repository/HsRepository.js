const RepositoryBase = require('./repositoryBase.js')
const fs = require('fs')
const path = require('path')

class HearthstoneRepository extends RepositoryBase {
  constructor (repositorySettings, settings) {
    super()
    this.questions = []
    this.loadQuestions(repositorySettings.dbPath || path.resolve(__dirname, './../../data/hs.json'))
    this.currentQuestion = null
    this.imgUrlRoot = 'https://art.hearthstonejson.com/v1/render/latest/enUS/256x/'
    this.availableProperties = {
      'attack': ':crossed_swords:',
      'health': ':heart:',
      'cost': ':small_blue_diamond:',
      'mechanics': ':gear:',
      'durability': ':shield:',
      'spellDamage': ':sparkles:',
      'rarity': ':gem:',
      'overload': ':comet:',
      'cardClass': '',
      'type': '',
      'faction': '',
      'classes': ''
    }
    this.numberOfHintFields = 4
  }

  loadQuestions (filename) {
    console.log('HearthstoneRepository: loading questions')
    if (filename && fs.existsSync(filename)) {
      this.questions = JSON.parse(fs.readFileSync(filename, 'utf8').trim())
      this.questions = this.questions.map(q => this.mapQuestion(q)).filter(q => q != null)
    } else {
      throw String('Could not find path')
    }

    if (this.questions.length === 0) {
      throw String('Could not load questions')
    }
  }

  async getQuestion () {
    const randomPosition = Math.floor(Math.random() * this.questions.length)
    this.currentQuestion = this.questions[randomPosition]
    return this.currentQuestion
  }

  mapQuestion (question) {
    if (!question.name) {
      return null
    }

    question.category = 'Hearthstone'
    if (question.text && question.text.indexOf(question.name) >= 0) {
      question.text = null
    }
    question.question = question.text || 'Identify the following Hearthstone entity'
    question.question = question.question.replace(/(<([^>]+)>)/ig, '')
    question.answer = question.name
    question.points = Math.min(3, Math.ceil(question.answer.length / 7))
    return question
  }

  makeHintMessage (question) {
    const hint = super.makeHintMessage(question)
    hint.attachments[0].fields = this.makeHintFields(question)
    return hint
  }

  makeQuestionMessage (question) {
    const questionMessage = super.makeQuestionMessage(question)
    questionMessage.attachments[0].fields = questionMessage.attachments[0].fields.concat(this.makeHintFields(question, true))
    return questionMessage
  }

  makeCorrectAnswerMessage (question, user, points) {
    const correctMessage = super.makeCorrectAnswerMessage(question, user, points)
    correctMessage.attachments[0].image_url = this.imgUrlRoot + question.id + '.png'
    return correctMessage
  }

  makeHintFields (question, ordered = false) {
    let result = []
    let count = this.numberOfHintFields
    let props = Object.keys(this.availableProperties) // clone availableProperties
    while (count > 0 && props.length) {
      const propIndex = ordered ? 0 : Math.floor(Math.random() * props.length)
      const randomProp = props.splice(propIndex, 1)[0]
      if (question[randomProp]) {
        count--
        result.push({
          'title': randomProp.toLowerCase() + ' ' + this.availableProperties[randomProp],
          'value': Array.isArray(question[randomProp]) ? question[randomProp].join(', ') : question[randomProp],
          'short': true
        })
      }
    }
    return result
  }
}

module.exports = HearthstoneRepository
