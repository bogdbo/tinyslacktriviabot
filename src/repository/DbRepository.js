const path = require('path')
const db = require('sqlite')

const RepositoryBase = require('./repositoryBase.js')

class DbRepository extends RepositoryBase {
  constructor (repositorySettings, settings) {
    super()
    this.repositorySettings = repositorySettings
    this.defaultQuery = 'SELECT q as question, a as answer FROM QUESTIONS ORDER BY random() LIMIT 1'
  }

  async getQuestion () {
    if (!db.driver) {
      console.log('DbRepository: connecting to db')
      await db.open(this.repositorySettings.dbPath || path.resolve(__dirname, './../../data/trivia.db'))
    }

    const rawQuestion = await db.get(this.repositorySettings.query || this.defaultQuery)
    return this.mapQuestion(rawQuestion)
  }

  mapQuestion (question) {
    question.category = question.category || 'N/A'
    question.points = Math.min(3, Math.ceil(question.answer.length / 7))
    return question
  }
}

module.exports = DbRepository
