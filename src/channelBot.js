var MessageReader = require('./messageReader.js');
var Utils = require('./utils.js');
var MessageHelper = require('./messageHelper.js');

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
      await this._postMessage(MessageHelper.makeQuestionMessage(this.question));
    }, isNaN(delay) ? this.settings.nextQuestionGap : delay);
  };

  async run() {
    await this._nextQuestion(0);
    while (true) {
      var message = await this.reader.get();
      var haveQuestion = this.question != null;
      var user = await this.slackBot.getUserById(message.user);
      switch (true) {
        case /^scores$/ig.test(message.text):
          this.showScores = this.settings.showScoreInterval;
          this._postMessage(MessageHelper.makeScoresMessage(this.scores));
          break;
        case /^hint$/ig.test(message.text) && haveQuestion:
          await this._postMessage(MessageHelper.makeHintMessage(this.question));
          break;
        case /^skip$/ig.test(message.text) && haveQuestion:
          this.skips[user.name] = true;
          var skips = Object.keys(this.skips).length;
          if (skips >= this.settings.skipCount) {
            await this._postMessage(MessageHelper.makeAfterSkipMessage(this.question));
            await this._nextQuestion();
          } else {
            await this._postMessage(MessageHelper.makeSkipMessage(user, this.settings.skipCount - skips));
          }
          break;
        case haveQuestion:
          if (this.question.a.toLowerCase().trim() === message.text.toLowerCase().trim()) {
            this.scores[user.name] = (this.scores[user.name] || 0) + 1;
            Utils.saveScores(this.channelId, this.scores);
            await this._postMessage(MessageHelper.makeCorrectAnswerMessage(this.question, user, this.scores[user.name]));
            if (--this.showScores == 0) {
              this.showScores = this.settings.showScoreInterval;
              this._postMessage(MessageHelper.makeScoresMessage(this.scores));
            }
            await this._nextQuestion();
          }
          break;
      }
    }
  }
}

module.exports = ChannelBot;
