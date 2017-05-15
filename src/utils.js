var fs = require('fs')
var path = require('path')

class Utils {
  static makeHint (answer) {
    if (answer.length <= 2) {
      return 'answer is too short'
    }

    var answerWithoutSings = answer.replace(/[^a-z0-9]/g, '')
    var readableCharsLength = answerWithoutSings.length
    var hintCharsLenght = Math.ceil(readableCharsLength * 40 / 100) // move 40% to settings as hintCharactersPercen
    var visibleIndexes = []
    while (visibleIndexes.length < hintCharsLenght) {
      var randomIndex = Math.floor(Math.random() * answer.length)
      if (visibleIndexes.indexOf(randomIndex) !== -1) {
        continue
      }
      visibleIndexes.push(randomIndex)
    }

    var answerArray = [...answer]
    for (var i = 0; i < answerArray.length; i++) {
      // Replace hidden indexes with '⁎' and keep whitespace
      if (visibleIndexes.indexOf(i) === -1 && /[^a-z0-9]/.test(answerArray[i]) === false) {
        answerArray[i] = '*'
      }
    }

    var hint = answerArray.join('')
    return hint
  }

  static loadSettings (p) {
    if (p && fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf8').trim())
    }

    throw String('cannot load settings')
  }

  static loadScores (channelId) {
    var p = path.resolve(__dirname, `./../data/scores/${channelId}.json`)
    if (fs.existsSync(p)) {
      var data = fs.readFileSync(p, 'utf8').trim()
      return JSON.parse(data)
    }

    return {}
  }

  static saveScores (channelId, scores) {
    console.log(`Saving scores: ${channelId}`)
    fs.writeFileSync(path.resolve(__dirname, `./../data/scores/${channelId}.json`), JSON.stringify(scores))
  }
}

module.exports = Utils
