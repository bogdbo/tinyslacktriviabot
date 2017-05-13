var MessageReader = require('./messageReader.js');
var Utils = require('./utils.js');

class ChannelBot {
  constructor(db, slackBot, channelId, settings) {
    this.db = db;
    this.slackBot = slackBot;
    this.channelId = channelId;
    this.reader = new MessageReader(slackBot, channelId);
    this.question = null;
    this.scores = Utils.loadScores(this.channelId);
    this.skips = {};
    this.settings = {
      showScoreInterval: 10,
      nextQuestionGap: 5000
    };
    Object.assign(this.settings, settings);
    this.showScores = this.settings.showScoreInterval;
  }

  async _postMessage(params) {
    await this.slackBot.postMessage(this.channelId, null, params);
  }

  async _nextQuestion(delay) {
    this.question = null;
    this.skips = {};
    setTimeout(async () => {
      this.question = await this.db.get('SELECT id, q, a FROM QUESTIONS ORDER BY random() LIMIT 1');
      await this._postMessage(Utils.makeQuestionMessage(this.question));
    }, delay || this.settings.nextQuestionGap);
  };

  async run() {
    await this._nextQuestion(1);
    while (true) {
      var message = await this.reader.get();
      var haveQuestion = this.question != null;
      var user = await this.slackBot.getUserById(message.user);
      switch (true) {
        case /^scores$/ig.test(message.text):
          this.showScores = this.settings.showScoreInterval;
          this._postMessage(Utils.makeScoresMessage(this.scores));
          break;
        case /^hint$/ig.test(message.text) && haveQuestion:
          await this._postMessage(Utils.makeHintMessage(this.question));
          break;
        case /^skip$/ig.test(message.text) && haveQuestion:
          this.skips[user.name] = true;
          if (Object.keys(this.skips).length >= 1) {
            await this._postMessage(Utils.makeAfterSkipMessage(this.question));
            await this._nextQuestion();
          } else {
            await this._postMessage(Utils.makeSkipMessage(user));
          }
          break;
        case haveQuestion:
          if (this.question.a.toLowerCase() === message.text.toLowerCase()) {
            this.scores[user.name] = (this.scores[user.name] || 0) + 1;
            Utils.saveScores(this.channelId, this.scores);
            await this._postMessage(Utils.makeCorrectAnswerMessage(this.question, user, this.scores[user.name]));
            if (--this.showScores == 0) {
              this.showScores = this.settings.showScoreInterval;
              this._postMessage(Utils.makeScoresMessage(this.scores));
            }
            await this._nextQuestion();
          }
          break;
      }
    }
  }
}

module.exports = ChannelBot;
