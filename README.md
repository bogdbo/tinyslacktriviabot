# tinyslacktriviabot

A tiny, extensible slack trivia bot

## Requirements

node v7.8.0+

## Installation

```npm i tinyslacktriviabot```

## Usage

1. Create a file `config.json` (example below)
  ```
{
  "name": "trivia",
  "token": "<Slack_Bot_Token>",
  "channels": [
    "G0JHBFCJD"
  ],
  "showScoreInterval": 5,
  "nextQuestionGap": 8000,
  "skipCount": 1,
  "triviaDbUrl": "https://opentdb.com/api.php?amount=50&type=multiple&encode=url3986",
  "hintDelay": 10000
}
 ```
 > Create a new `<Slack_Bot_Token>` here https://my.slack.com/services/new/bot

 > Create a new `triviaDbUrl` here https://opentdb.com/api_config.php (*use url encoding*)
 
 2. Import module & run
 
 ```
var bot = require('tinyslacktriviabot')
bot.run()
```

## History

v2.0.0 - opentdb support

v1.0.0 - Initial version

## License

© 2017 WTFPL – Do What the Fuck You Want to Public License
