var path = require('path')
var db = require('sqlite')

var RepositoryBase = require('./repositoryBase.js')

class DbRepository extends RepositoryBase {
  constructor (settings) {
    super()
    this.settings = settings
  }

  async getQuestion () {
    if (!db.driver) {
      console.log('DbRepository: connecting to db')
      await db.open(path.resolve(__dirname, './../../data/trivia.db'))
    }

    var rawQuestion = await db.get('SELECT id, q as question, a as answer FROM QUESTIONS ORDER BY random() LIMIT 1')
    return this.mapQuestion(rawQuestion)
  }

  mapQuestion (question) {
    question.category = 'N/A'
    question.points = Math.min(3, Math.ceil(question.answer.length / 7))
    return question
  }
}

module.exports = DbRepository
