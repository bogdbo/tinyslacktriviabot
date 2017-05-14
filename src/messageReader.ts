import {EventNames, MessageTypes} from './constants';

// Simple wrapper to convert Emit messages to Promises so we can use async/await for cleaner code
export class MessageReader {
  slackBot:any;
  channelId:string;
  promiseResolveFn:any;

  constructor(slackBot, channelId) {
    this.slackBot = slackBot;
    this.channelId = channelId;
    this.promiseResolveFn;

    slackBot.on(EventNames.Message, data => {
      if (data.type === MessageTypes.Message && data.channel === channelId && data.user != null) {
        if (this.promiseResolveFn) {
          this.promiseResolveFn(data);
        }
        else {
          console.warn('promiseResolveFn is null');
        }
      }
    });
  }

  async get() {
    return new Promise((resolve, reject) => {
      this.promiseResolveFn = resolve;
    });
  };
}
