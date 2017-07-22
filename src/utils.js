const fs = require('fs')
const path = require('path')

class Utils {
  static getRootFolderPath () {
    return path.resolve(__dirname, './..')
  }

  static resolveDbPath (dbPath) {
    if (path.isAbsolute(dbPath)) {
      return dbPath
    } else {
      return path.resolve(this.getRootFolderPath(), `data/${dbPath}`)
    }
  }

  static getRepositoriesFolderPath () {
    return path.resolve(this.getRootFolderPath(), 'src/repository')
  }

  static getDefaultSettings () {
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
        {
          'path': path.resolve(repositoriesFolder, 'DbRepository.js')
        },
        {
          'path': path.resolve(repositoriesFolder, 'TriviaDbRepository.js')
        },
        {
          'path': path.resolve(repositoriesFolder, 'JsonRepository.js')
        },
        {
          'path': path.resolve(repositoriesFolder, 'HsRepository.js')
        },
        {
          'path': path.resolve(repositoriesFolder, 'JsRepository.js')
        },
        {
          'path': path.resolve(repositoriesFolder, 'JsonRepository.js'),
          'dbPath': 'jeopardy.json'
        },
        {
          'path': path.resolve(repositoriesFolder, 'JsonRepository.js'),
          'dbPath': 'capitals.json',
          'questionPath': ['text'],
          'answerPath': [['answers', 0, 'text', 0]]
        },
        {
          'path': path.resolve(repositoriesFolder, 'JsonRepository.js'),
          'dbPath': 'flags.json',
          'questionPath': ['text'],
          'answerPath': [['answers', 0, 'text', 0]]
        }
      ]
    }
  }

  static loadSettings (p) {
    if (p && fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf8').trim())
    }

    throw String('cannot load settings')
  }

  static loadScores (channelId) {
    const p = `./${channelId}.json`
    if (fs.existsSync(p)) {
      const data = fs.readFileSync(p, 'utf8').trim()
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
