# tinyslacktriviabot

A tiny, extensible slack trivia bot

![Preview](http://i.imgur.com/p3nz1Pn.png)

## Requirements

node v8.0.0 (tested)
_(other versions should be compatible but weren't tested)_

## Installation

```npm i tinyslacktriviabot```

## Usage

#### 1. Create a file `config.json` (example below)
  ```
{
  "name": "trivia",
  "token": "<SLACK_BOT_TOKEN>",
  "channels": ["<CHANNEL_ID_FROM_URL>"]
}
 ```
 > Get a `<SLACK_BOT_TOKEN>` here https://my.slack.com/services/new/bot
 
#### 2. Create a file `trivia.js`
 
 ```
var bot = require('tinyslacktriviabot')
bot.run()
```

#### 3. Run
```node trivia.js```


## Advanced settings 
```
{
  name: 'trivia',
  showScoreInterval: 10,
  nextQuestionGap: 5000,
  skipCount: 2,
  hintDelay: 10000,
  repository: [
    'JsRepository',
    'DbRepository.js',
    'TriviaDbRepository.js',
    'JsonRepository.js'
  ],
  triviaDbUrl: 'https://opentdb.com/api.php?amount=50&type=multiple&encode=url3986',
  jsonDbPath: <absolute_path_to_json_file>,
  jsDbPath: <absolute_path_to_json_file>,
  sqlDbPath: <absolute_path_to_db_file>
}
```

| Setting  | Description |
| ------------- | ------------- |
| name  | Bot name (will appear in channels) |
| showScoreInterval  | Number of correct questions after which the scores will be shown, scores command resets the counter  |
| nextQuestionGap | Delay until next question is shown _(eg. after correct answer or skip)_ |
| skipCount | Required skips to change question |
| hintDelay | How often the hint command can be called |
| repository | Specify the preferred repositories (bold ones are the default value): ["**DbRepository.js**", "**TriviaDbRepository.js**", "**JsonRepository.js**", "JsRepository.js"] |
| triviaDbUrl | Url required by TriviaDbRepository. Url needs to contain **&encode=url3986** |
| _*jsonDbPath_ | Local path to a json file; required by JsonRepository |
| _*sqlDbPath_ | Local path to SQLite db; required by DbRepository |

(*) settings for advanced usages only

## History

### v3.0.0 
* configure multiple repositories
* JsRepository (js questions with evaluator)
* JsonRepository (questions from json file)

### v2.0.0 
* opentdb support

### v1.0.0 
* Initial version

## License

© 2017 WTFPL – Do What the Fuck You Want to Public License
