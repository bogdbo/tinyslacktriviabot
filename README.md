# tinyslacktriviabot

A tiny, extensible slack trivia bot

## Installation

npm install tinyslacktriviabot

## Usage

1. Create a file `config.json` (example below)
  ```
  {
    "name": "trivia",
    "token": "<Slack_Bot_Token>",
    "channels": [ "G0JHBFCJD" ],
    "showScoreInterval": 5,
    "nextQuestionGap": 8000,
    "skipCount": 2
  }
 ```
 > Create a new `<Slack_Bot_Token>` here https://my.slack.com/services/new/bot
 
 2. Import module & run
 
 ```
var bot = require('tinyslacktriviabot')
bot.run()
```

## History

v1.0.0 - Initial version

## License

© 2017 WTFPL – Do What the Fuck You Want to Public License
