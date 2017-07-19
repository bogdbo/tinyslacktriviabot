var RepositoryBase = require('./repositoryBase.js')
var fs = require('fs')

class HearthstoneRepository extends RepositoryBase {
  constructor (settings) {
    super()
    this.questions = []
    this.loadQuestions(settings.hsDbPath)
    this.currentQuestion = null
    this.imgUrlRoot = 'https://art.hearthstonejson.com/v1/render/latest/enUS/256x/'
    this.availableProperties = {
      'cardClass': '',
      'cost': ':small_blue_diamond:',
      'type': '',
      'attack': ':crossed_swords:',
      'faction': '',
      'health': ':heart:',
      'mechanics': ':gear:',
      'rarity': ':gem:',
      'durability': ':shield:',
      'overload': ':comet:',
      'classes': '',
      'spellDamage': ':sparkles:'
    }
    this.numberOfHintFields = 3
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
    var hint = super.makeHintMessage(question)
    hint.attachments[0].fields = this.makeHintFields(question)
    return hint
  }

  makeQuestionMessage (question) {
    var questionMessage = super.makeQuestionMessage(question)
    questionMessage.attachments[0].fields = questionMessage.attachments[0].fields.concat(this.makeHintFields(question))
    return questionMessage
  }

  makeCorrectAnswerMessage (question, user, points) {
    var correctMessage = super.makeCorrectAnswerMessage(question, user, points)
    correctMessage.attachments[0].image_url = this.imgUrlRoot + question.id + '.png'
    return correctMessage
  }

  makeHintFields (question) {
    let result = []
    let count = this.numberOfHintFields
    let props = Object.keys(this.availableProperties) // clone availableProperties
    while (count > 0 && props.length) {
      const randomPropIndex = Math.floor(Math.random() * props.length)
      const randomProp = props.splice(randomPropIndex, 1)[0]
      if (question[randomProp]) {
        count--
        result.push({
          'title': randomProp + ' ' + this.availableProperties[randomProp],
          'value': Array.isArray(question[randomProp]) ? question[randomProp].join(', ') : question[randomProp],
          'short': true
        })
      }
    }
    result.sort((a, b) => a.title < b.title)
    return result
  }
}

module.exports = HearthstoneRepository
