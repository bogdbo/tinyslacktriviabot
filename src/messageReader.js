var EventNames = require('./constants.js').EventNames
var MessageTypes = require('./constants.js').MessageTypes
var Entities = require('html-entities').AllHtmlEntities

// Simple wrapper to convert Emit messages to Promises so we can use async/await for cleaner code
class MessageReader {
  constructor (slackBot, channelId) {
    this.slackBot = slackBot
    this.channelId = channelId
    this.promiseResolveFn = null
    this.entities = new Entities()

    slackBot.on(EventNames.Message, data => {
      if (data.type === MessageTypes.Message && data.channel === channelId && data.user != null) {
        if (this.promiseResolveFn) {
          data.text = this.entities.decode(data.text)
          this.promiseResolveFn(data)
          this.promiseResolveFn = null
        } else {
          console.warn('promiseResolveFn is null')
        }
      }
    })
  }

  async get () {
    return new Promise((resolve, reject) => {
      this.promiseResolveFn = resolve
    })
  }
}

module.exports = MessageReader
