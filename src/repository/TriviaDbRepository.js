const RepositoryBase = require('./repositoryBase.js')
const rp = require('request-promise')

class TriviaDbRepository extends RepositoryBase {
  constructor (repositorySettings, settings) {
    super()
    this.settings = settings
    this.dbPath = repositorySettings.dbPath || 'https://opentdb.com/api.php?amount=50&type=multiple&encode=url3986'
    this.questions = []
  }

  async getQuestion () {
    if (!this.questions.length) {
      await this.loadQuestions()
    }

    return this.questions.pop()
  }

  async loadQuestions () {
    try {
      console.log('TriviaDbRepository: loading new batch of questions')
      const response = await rp(this.dbPath)
      const data = JSON.parse(response)
      this.questions = data.results.map((q) => this.mapQuestion(q))
    } catch (exception) {
      console.error(`cannot get questions from ${this.dbPath}. Exception: ${exception}. Retrying...`)
      this.loadQuestions()
    }
  }

  mapQuestion (triviaDbQuestion) {
    triviaDbQuestion.answer = decodeURIComponent(triviaDbQuestion.correct_answer)
    triviaDbQuestion.question = decodeURIComponent(triviaDbQuestion.question)
    triviaDbQuestion.points = triviaDbQuestion.difficulty === 'hard' ? 3 : triviaDbQuestion.difficulty === 'medium' ? 2 : 1
    triviaDbQuestion.category = decodeURIComponent(triviaDbQuestion.category)
    return triviaDbQuestion
  }
}

module.exports = TriviaDbRepository
