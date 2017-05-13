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

  static makeHintMessage(question) {
    return {
      icon_emoji: ':bulb:',
      attachments: [{
        "fallback": "hint",
        "color": "#ffdd00",
        "author_name": `Hint`,
        "title": this.makeHint(question.a),
        "footer": `${question.a.length} letters`
      }]
    };
  }

  static makeQuestionMessage(question) {
    return {
      icon_emoji: ':question:',
      attachments: [{
        "fallback": "question",
        "color": "#ff4828",
        "author_name": "Next question",
        "title": `${question.q}\n\nHint: ${this.makeHint(question.a)}`,
        "footer": `${question.a.length} letters`
      }]
    };
  }

  static makeCorrectAnswerMessage(question, user, points) {
    return {
      icon_emoji: ':tada:',
      attachments: [{
        "fallback": "correct",
        "color": "#00bf3c",
        "author_name": "Congratulations",
        "title": `@${user.name} answered correctly: ${question.a}`,
        "footer": `${points} points`
      }]
    }
  }

  static makeSkipMessage(user) {
    return {
      icon_emoji: ':fast_forward:',
      attachments: [{
        "fallback": "skip",
        "color": "#ededed",
        "author_name": "Skip",
        "title": `@${user.name} wishes to skip this question`,
        "footer": "1 more skip needed to change questions"
      }
      ]
    }
  }

  static makeAfterSkipMessage(question) {
    return {
      icon_emoji: ':fast_forward:',
      attachments: [{
        "fallback": "skipped",
        "color": "#ededed",
        "author_name": "Question skipped",
        "title": `A: ${question.a}`,
      }]
    }
  }

  static makeScoresMessage(scores) {
    var scoresString = Object.keys(scores)
      .slice(0, 10)
      .sort((a, b) => scores[b] - scores[a])
      .map((user, i) => `${i + 1}. @${user} - ${scores[user]}`)
      .join('\n');

    return {
      icon_emoji: ':trophy:',
      attachments: [{
        "fallback": "scores",
        "color": "#3dffa4",
        "author_name": "Top 10 leaderboard",
        "text": scoresString
      }]
    }
  }

  static loadScores(channelId) {
    var path = `data/scores/${channelId}.json`;
    if (fs.existsSync(path)) {
      var data = fs.readFileSync(path, 'utf8').trim('"')
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
