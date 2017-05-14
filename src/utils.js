var fs = require('fs');

class Utils {
  static makeHint(answer) {
    if (answer.length <= 2) {
      return 'answer is too short';
    }

    var answerWithoutSpaces = answer.replace(/\s/g, '');
    var readableCharsLength = answerWithoutSpaces.length;
    var hintCharsLenght = Math.ceil(readableCharsLength * 40 / 100); // move 40% to settings as hintCharactersPercen
    var visibleIndexes = [];
    while (visibleIndexes.length < hintCharsLenght) {
      var randomIndex = Math.floor(Math.random() * answer.length);
      if (visibleIndexes.indexOf(randomIndex) != -1) {
        continue;
      }
      visibleIndexes.push(randomIndex);
    }

    var answerArray = [...answer];
    for (var i = 0; i < answerArray.length; i++) {
      // Replace hidden indexes with '⁎' and keep whitespace
      if (visibleIndexes.indexOf(i) === -1 && /\s/.test(answerArray[i]) === false) {
        answerArray[i] = '*';
      }
    }

    var hint = answerArray.join('');
    return hint;
  }

  static loadSettings(path) {
    if (path && fs.existsSync(path)) {
      return JSON.parse(fs.readFileSync(path, 'utf8').trim());
    }

    throw 'cannot load settings';
  }

  static loadScores(channelId) {
    var path = `data/scores/${channelId}.json`;
    if (fs.existsSync(path)) {
      var data = fs.readFileSync(path, 'utf8').trim()
      return JSON.parse(data);
    }

    return {};
  }

  static saveScores(channelId, scores) {
    console.log(`Saving scores: ${channelId}`);
    fs.writeFileSync(`data/scores/${channelId}.json`, JSON.stringify(scores));
  }
}

module.exports = Utils;
