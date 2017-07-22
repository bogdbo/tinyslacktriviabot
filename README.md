# tinyslacktriviabot

A tiny, extensible slack trivia bot

![version](https://badge.fury.io/js/tinyslacktriviabot.png)
![dependencies](https://david-dm.org/troggzor/tinyslacktriviabot/status.svg)

<img src="http://i.imgur.com/p3nz1Pn.png" height="450px">

## Requirements

node v8


## Installation

```npm i tinyslacktriviabot```

## Usage

#### Create a file `trivia.js` and run it with `node trivia.js`

##### Minimum configuration 
```js
const { TinySlackTriviaBot } = require('tinyslacktriviabot');
const config = {
  name: 'trivia',
  token: 'SLACK_BOT_TOKEN',
  channels: ['SLACK_CHANNEL_ID']
}
TinySlackTriviaBot.run(config)
```
> Get a `<SLACK_BOT_TOKEN>` here https://my.slack.com/services/new/bot

> Note: configuration can also be stored in a file `config.json` in the same folder as `trivia.js`
 
##### All databases included configuration
```js
const { TinySlackTriviaBot } = require('tinyslacktriviabot');
const config = {
  name: 'trivia',
  token: 'SLACK_BOT_TOKEN',
  channels: ['SLACK_CHANNEL_ID'],
  repository: [
    { 
      'ignore': false,
      'path': 'DbRepository.js' 
    },
    { 
      'ignore': false,
      'path': 'TriviaDbRepository.js' 
    },
    { 
      'ignore': false,
      'path': 'JsonRepository.js'
    },
    { 
      'ignore': false,
      'path': 'HsRepository.js' 
    },
    { 
      'ignore': false,
      'path': 'JsRepository.js' 
    },
    {
      'ignore': false,
      'path': 'JsonRepository.js',
      'dbPath': 'wow.json'
    },
    {
      'ignore': false,
      'path': 'JsonRepository.js',
      'dbPath': 'jeopardy.json'
    },
    {
      'ignore': false,
      'path': 'JsonRepository.js',
      'dbPath': 'capitals.json',
      'questionPath': ['text'],
      'answerPath': [['answers', 0, 'text', 0]]
    },
    {
      'ignore': false,
      'path': 'JsonRepository.js',
      'dbPath': 'flags.json',
      'questionPath': ['text'],
      'answerPath': [['answers', 0, 'text', 0]]
    }]
}
TinySlackTriviaBot.run(config)
```


## Advanced configuration

### Configuration details
<table>
<thead>
  <th>Name</th>
  <th>Type</th>
  <th>Description</th>
  <th>Default</th>
</thead>
<tbody>
  <tr>
    <td>name</td>
    <td>string</td>
    <td>Bot name (will appear in channels, overrides the name set when the SLACK_BOT_TOKEN was created)</td>
    <td>trivia</td>
  </tr>
  <tr>
    <td>showScoreInterval</td>
    <td>number</td>
    <td>Number of correct questions after which the scores will be automatically shown, scores command resets this counter</td>
    <td>10</td>
  </tr>
  <tr>
    <td>nextQuestionGap</td>
    <td>number</td>
    <td>Delay(ms) until next question is shown <em>(eg. after correct answer or skip)</em></td>
    <td>5000</td>
  </tr>
  <tr>
    <td>skipCount</td>
    <td>number</td>
    <td>Required skips to change question</td>
    <td>2</td>
  </tr>
  <tr>
    <td>hintDelay</td>
    <td>number</td>
    <td>How often the hint command can be called</td>
    <td>10000</td>
  </tr>
  <tr>
    <td>autoSkipAfter</td>
    <td>number</td>
    <td>Delay until question is automatically skipped</td>
    <td>30000</td>
  </tr>
  <tr>
    <td>filters</td>
    <td>array of string</td>
    <td>each string is parsed as a regex with default flags 'ig'</td>
    <td>[ ]</td>
  </tr>
  <tr>
    <td>repository</td>
    <td>array of RepositorySettings</td>
    <td>Configure preferred repositories</td>
    <td><pre>[{'path':'DbRepository.js'},
{'path':'TriviaDbRepository.js'},
{'path':'JsonRepository.js'},
{'path':'HsRepository.js'},
{'path':'JsRepository.js'}]
    </pre>
    </td>
  </tr>
</tbody>
</table>

### RepositorySettings
#### Base settings
<table>
<thead>
  <th>Name</th>
  <th>Type</th>
  <th>Description</th>
  <th>Example</th>
</thead>
<tbody>
  <tr>
    <td>path</td>
    <td>string</td>
    <td>Absolute or relative path to repository (.js)</td>
    <td>
    	<code>'path': 'JsonRepository.js'</code> (relative to tinyslacktriviabot repository folder) <br/>
     	<code>'path': 'C:\\CustomRepository.js'</code> <br/>
        <b>When using absolute paths the '\' character needs to be escaped</b><br/><br/>
        OOTB repositories<br/>
		<pre>
        'path': 'JsonRepository.js'
        'path': 'DbRepository.js'
        'path': 'HsRepository.js'
        'path': 'JsRepository.js'
        'path': 'TriviaDbRepository.js'
        </pre>
    </td>
  </tr>
  <tr>
    <td>dbPath</td>
    <td>string</td>
    <td>Absolute or relative path to a database</td>
    <td>
    	OOTB databases<br/>
        <table>
        <tr>
          <td>JsonRepository.js</td>
          <td>
          	<code>dbPath: 'jeopardy.json'</code> <br/>
            <code>dbPath: 'questions.json'</code> <br/>
            <code>dbPath: 'wow.json'</code> <br/>
            <code>dbPath: 'capitals.json'</code> <br/>
            <code>dbPath: 'flags.json'</code>
          </td>
        </tr>
        <tr>
          <td>DbRepository.js</td>
          <td>
          	<code>dbPath: 'trivia.db'</code> <br/>
          </td>
        </tr>
        <tr>
          <td>HsRepository.js</td>
          <td>
          	<code>dbPath: 'hs.json'</code> <br/>
         </td>
        </tr>
         <tr>
          <td>JsRepository.js</td>
          <td>
          	<code>dbPath: 'jsQuestions.json'</code> <br/>
         </td>
        </tr>
         <tr>
          <td>TriviaDbRepository.js</td>
          <td>
          	<code>dbPath: 'https://opentdb.com/api.php?amount=50&type=multiple&encode=url3986'</code> <br/> <br/>
         </td>
        </tr>
        </table>
    </td>
  </tr>
   <tr>
    <td>ignore</td>
    <td>boolean?</td>
    <td>If set to true the repository is not loaded<br/>
    </td>
    <td>
    <code>'ignore': true </code> <br/>
    </td>
  </tr>
</tbody>
</table>

<b>Note: The settings bellow allow you to use the OOTB repositories with alternative databses. Internally the question object needs to have this structure <code>{ question, answer, category, ... }</code> and these settings allow you to map a custom databse to the correct fields</b>

#### JsonRepositorySettings
Assume the question object from JSON has the following format
```json
question = {
              "text":"question text",
              "answers":["first answer", "second answer"],
              "parent": { "group":"category name" }
            }
```

Note: Property paths are evaluated using [object-path](https://github.com/mariocasciaro/object-path#usage). Internally, tinyslacktriviabot uses the `coalesce` function.
<table>
<thead>
  <th>Name</th>
  <th>Type</th>
  <th>Description</th>
  <th>Example</th>
  <th>Result</th>
</thead>
<tbody>
  <tr>
    <td>questionPath</td>
    <td>array? of string</td>
    <td>Read a top-level property</td>
    <td>
    <code>questionPath: ['text']</code>
    </td>
    <td>question.text</td>
  </tr>
   <tr>
    <td>answerPath</td>
    <td>array? of string</td>
    <td>Select first array item</td>
    <td>
    <code>answerPath: ['answers', 0]</code>
    </td>
    <td>question.answers[0]</td>
  </tr>
   <tr>
    <td>categoryPath</td>
    <td>array? of string</td>
    <td>Selected nested properties.</td>
    <td>
    <code>categoryPath: ['parent', 'group']</code>
    </td>
    <td>question.parent.group</td>
  </tr>
</tbody>
</table>

#### DbRepositorySettings
<table>
<thead>
  <th>Name</th>
  <th>Type</th>
  <th>Description</th>
  <th>Example</th>
</thead>
<tbody>
  <tr>
    <td>query</td>
    <td>string</td>
    <td>SQLite query to read 1 random question</td>
    <td>
    The default query for <code>trivia.db</code> is <br/>
    <code>query: 'SELECT q as question, a as answer FROM QUESTIONS ORDER BY random() LIMIT 1'</code>
    </td>
</tbody>
</table>

## History

### v4.0.0

* Each repository has it's own settings now
* Hearthstone respository

<img src="https://i.imgur.com/r9YmnM5.png" height="350px">

* World of warcraft, Jeopardy, country flags and country capitals json databases
* Export base models for easier extensibility


### v3.0.0
* configure multiple repositories
* JsRepository (js questions with evaluator)
* JsonRepository (questions from json file)

### v2.0.0
* opentdb support

### v1.0.0
* Initial version

## License

© 2017 MIT
