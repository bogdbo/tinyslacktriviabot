var fs = require('fs')
var path = require('path')

class Utils {
  static getDefaultSettings () {
    var rootFolder = process.cwd()
    return {
      showScoreInterval: 10,
      nextQuestionGap: 5000,
      skipCount: 2,
      hintDelay: 10000,
      repository: path.resolve(rootFolder, 'src/repository/JsonRepository.js'),
      triviaDbUrl: 'https://opentdb.com/api.php?amount=50&type=multiple&encode=url3986',
      jsonDbPath: path.resolve(rootFolder, 'data/questions.json'),
      sqlDbPath: path.resolve(rootFolder, 'data/trivia.db')
    }
  }

  static makeHint (answer) {
    if (answer.length <= 2) {
      return 'answer is too short'
    }

    var answerWithoutSings = answer.replace(/[^a-z\d]/ig, '')
    var hideCharCount = answerWithoutSings.length - Math.ceil(answerWithoutSings.length * 50 / 100)

    var answerArray = [...answer]
    while (hideCharCount > 0) {
      var position = Math.floor(Math.random() * answerArray.length)
      if (/[^a-z\d]/ig.test(answerArray[position])) {
        continue
      }

      answerArray[position] = '*'
      hideCharCount--
    }

    return answerArray.join('')
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
