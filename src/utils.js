var fs = require('fs')
var path = require('path')

class Utils {
  static getRootFolderPath () {
    return path.resolve(__dirname, './..')
  }

  static getRepositoriesFolderPath () {
    return path.resolve(this.getRootFolderPath(), 'src/repository')
  }

  static getDefaultSettings () {
    const rootFolder = this.getRootFolderPath()
    const repositoriesFolder = this.getRepositoriesFolderPath()
    return {
      name: 'trivia',
      showScoreInterval: 10,
      nextQuestionGap: 5000,
      skipCount: 2,
      hintDelay: 10000,
      autoSkipAfter: 30000,
      filters: [],
      repository: [
        path.resolve(repositoriesFolder, 'DbRepository.js'),
        path.resolve(repositoriesFolder, 'TriviaDbRepository.js'),
        path.resolve(repositoriesFolder, 'JsonRepository.js')
      ],
      triviaDbUrl: 'https://opentdb.com/api.php?amount=50&type=multiple&encode=url3986',
      jsonDbPath: path.resolve(rootFolder, 'data/questions.json'),
      jsDbPath: path.resolve(rootFolder, 'data/jsQuestions.json'),
      sqlDbPath: path.resolve(rootFolder, 'data/trivia.db')
    }
  }

  static loadSettings (p) {
    if (p && fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf8').trim())
    }

    throw String('cannot load settings')
  }

  static loadScores (channelId) {
    var p = `./${channelId}.json`
    if (fs.existsSync(p)) {
      var data = fs.readFileSync(p, 'utf8').trim()
      console.log('Scores loaded')
      return JSON.parse(data)
    }

    console.log('Cannot load scores')
    return {}
  }

  static saveScores (channelId, scores) {
    console.log(`Saving scores: ${channelId}`)
    fs.writeFileSync(`./${channelId}.json`, JSON.stringify(scores))
  }
}

module.exports = Utils
