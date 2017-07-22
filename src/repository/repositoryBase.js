const smb = require('slack-message-builder')

class RepositoryBase {
  consturctor () { }
  async getQuestion () {
    throw String('not implemented exception')
  }

  checkAnswer (question, message) {
    return { ok: question.answer.toLowerCase().trim() === message.text.toLowerCase().trim() }
  }

  /* Start Message Helpers */
  makeHint (answer) {
    if (answer.length <= 2) {
      return 'answer is too short'
    }

    const answerWithoutSings = answer.replace(/[^a-z\d]/ig, '')
    let hideCharCount = answerWithoutSings.length - Math.ceil(answerWithoutSings.length * 50 / 100)

    const answerArray = [...answer]
    while (hideCharCount > 0) {
      const position = Math.floor(Math.random() * answerArray.length)
      if (/[^a-z\d]/ig.test(answerArray[position])) {
        continue
      }

      answerArray[position] = '*'
      hideCharCount--
    }

    return answerArray.join('')
  }

  makeHintMessage (question) {
    return {
      icon_emoji: ':bulb:',
      attachments: [{
        'fallback': 'hint',
        'color': '#ffdd00',
        'title': this.makeHint(question.answer),
        'footer': `${question.answer.length} letter${question.answer.length > 1 ? 's' : ''}`
      }]
    }
  }

  makeQuestionMessage (question) {
    return {
      icon_emoji: ':question:',
      attachments: [{
        'fallback': 'question',
        'color': '#ff4828',
        'author_name': `${question.category} - ${question.points} point${question.points > 1 ? 's' : ''}`,
        'title': `${question.question}`,
        'footer': `${question.answer.length} letter${question.answer.length > 1 ? 's' : ''}`,
        'fields': [
          {
            'title': '',
            'value': `Hint: ${this.makeHint(question.answer)}`,
            'short': false
          }
        ]
      }]
    }
  }

  makeCorrectAnswerMessage (question, user, points) {
    return {
      icon_emoji: ':tada:',
      attachments: [{
        'fallback': 'correct',
        'color': '#00bf3c',
        'author_name': 'Congratulations',
        'title': `@${user.name} answered correctly: ${question.answer}`,
        'footer': `${points} points (+${question.points} point${question.points > 1 ? 's' : ''})`
      }]
    }
  }

  makeInvalidAnswerMessage (user, response) {
    return smb()
      .icon_emoji(':warning:')
      .text(response.message)
      .json()
  }

  makeSkipMessage (user, skipsLeft) {
    return {
      icon_emoji: ':fast_forward:',
      attachments: [{
        'fallback': 'skip',
        'color': '#ededed',
        'footer': `${skipsLeft} more skip needed`
      }]
    }
  }

  makeAfterSkipMessage (question) {
    return {
      icon_emoji: ':fast_forward:',
      attachments: [{
        'fallback': 'skipped',
        'color': '#ededed',
        'author_name': 'Question skipped',
        'title': `A: ${question.answer}`
      }]
    }
  }

  makeScoresMessage (scores) {
    const scoresString = Object.keys(scores)
      .slice(0, 10)
      .sort((a, b) => scores[b] - scores[a])
      .map((user, i) => `${i + 1}. @${user} - ${scores[user]}`)
      .join('\n')

    return {
      icon_emoji: ':trophy:',
      attachments: [{
        'fallback': 'scores',
        'color': '#3dffa4',
        'author_name': 'Top 10 leaderboard',
        'text': scoresString
      }]
    }
  }

  /* End Message Helpers */
}

module.exports = RepositoryBase
