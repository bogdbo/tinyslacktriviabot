var Utils = require('./utils.js');

class MessageHelper {
  static makeHintMessage(question) {
    return {
      icon_emoji: ':bulb:',
      attachments: [{
        "fallback": "hint",
        "color": "#ffdd00",
        "title": Utils.makeHint(question.a),
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
        "title": `${question.q}`,
        "footer": `${question.a.length} letters`,
        "fields": [
          {
            "title": '',
            "value": `Hint: ${Utils.makeHint(question.a)}`,
            "short": false
          }
        ],
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

  static makeSkipMessage(user, skipsLeft) {
    return {
      icon_emoji: ':fast_forward:',
      attachments: [{
        "fallback": "skip",
        "color": "#ededed",
        "footer": `${skipsLeft} more skip needed`
      }]
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
}

module.exports = MessageHelper;
