const RepositoryBase = require('./repositoryBase.js')
const fs = require('fs')
const Entities = require('html-entities').AllHtmlEntities
const objectPath = require('object-path')
const path = require('path')
const Utils = require('./../utils.js')

class JsonRepository extends RepositoryBase {
  constructor (repositorySettings, settings) {
    super()
    this.questions = []
    this.entities = new Entities()
    this.repositorySettings = repositorySettings
    this.loadQuestions(repositorySettings.dbPath || path.resolve(__dirname, './../../data/questions.json'))
  }

  loadQuestions (filename) {
    console.log('JsonRepository: loading questions')
    filename = Utils.resolveDbPath(filename)
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
    this.assignPathValues(question, 'category', 'answer', 'question')
    question.points = Math.min(3, Math.ceil(question.answer.length / 7))
    return question
  }

  /*
    Extracts value from object by Path specified in repository setting, if it exists, otherwise
    the value at defaultPath is used, then html decoded and assigned back to the object[defaultPath]
  */
  assignPathValues (object) {
    [...arguments].splice(1).map(defaultPath => {
      const value = objectPath.coalesce(object, [...(this.repositorySettings[`${defaultPath}Path`] || []), defaultPath], 'N/A')
      object[defaultPath] = this.entities.decode(value)
    })
  }
}

module.exports = JsonRepository
