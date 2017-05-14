import * as SlackBot from 'slackbots';
import * as db from 'sqlite';
import {Utils} from './utils.js';
import {EventNames} from './constants.js';
import {ChannelBot} from './channelBot.js';

db.open('./data/trivia.db');
const settings = Utils.loadSettings('./config.json', false);
const bot = new SlackBot({ token: settings.token , name: settings.name });

bot.on(EventNames.Open, async () => {
  settings.channels.forEach(ch => new ChannelBot(db, bot, ch, settings).run());
});
