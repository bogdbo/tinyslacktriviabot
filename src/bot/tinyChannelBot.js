const TinyBotBase = require('./tinyBotBase.js')

class TinyChannelBot extends TinyBotBase {
  async run () {
    await this.nextQuestion(0)
    while (true) {
      const message = await this.reader.get()
      const user = await this.getUser(message)

      if (/^scores$/ig.test(message.text)) {
        await this.handleScores()
      } else if (this.isQuestionActive()) {
        if (/^hint$/ig.test(message.text)) {
          await this.handleHint()
        } else if (/^skip$/ig.test(message.text)) {
          await this.handleSkip(user)
        } else {
          await this.handleAnswer(user, message)
        }
      }
    }
  }
}

module.exports = TinyChannelBot
