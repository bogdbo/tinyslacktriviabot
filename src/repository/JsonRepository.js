var RepositoryBase = require('./repositoryBase.js')
var fs = require('fs')
var Entities = require('html-entities').AllHtmlEntities

class JsonRepository extends RepositoryBase {
  constructor (settings) {
    super()
    this.questions = []
    this.entities = new Entities()
    this.loadQuestions(settings.filename)
  }

  loadQuestions (filename) {
    console.log('JsonRepository: loading questions')
    if (filename && fs.existsSync(filename)) {
      this.questions = JSON.parse(fs.readFileSync(filename, 'utf8').trim())
      this.questions = this.questions.map(q => this.mapQuestion(q))
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

  mapQuestion (question) {
    question.category = this.entities.encode(question.category)
    question.question = this.entities.decode(question.question)
    question.answer = this.entities.decode(question.answer)
    question.points = Math.min(3, Math.ceil(question.answer.length/5))
    return question
  }
}

module.exports = JsonRepository
