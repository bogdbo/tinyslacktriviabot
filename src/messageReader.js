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
    this.queue = []

    slackBot.on(EventNames.Message, data => {
      if (data.type === MessageTypes.Message && data.channel === channelId && data.user != null) {
        data.text = this.entities.decode(data.text)

        if (this.promiseResolveFn) {
          this.promiseResolveFn(data)
        } else {
          this.queue.push(data)
        }
      }
    })
  }

  async get () {
    return new Promise((resolve, reject) => {
      if (this.queue.length) {
        resolve(this.queue.shift())
      } else {
        this.promiseResolveFn = resolve
      }
    })
  }
}

module.exports = MessageReader
