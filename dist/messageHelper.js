"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var MessageHelper = (function () {
    function MessageHelper() {
    }
    MessageHelper.makeHintMessage = function (question) {
        return {
            icon_emoji: ':bulb:',
            attachments: [{
                    "fallback": "hint",
                    "color": "#ffdd00",
                    "title": utils_1.Utils.makeHint(question.a),
                    "footer": question.a.length + " letters"
                }]
        };
    };
    MessageHelper.makeQuestionMessage = function (question) {
        return {
            icon_emoji: ':question:',
            attachments: [{
                    "fallback": "question",
                    "color": "#ff4828",
                    "author_name": "Next question",
                    "title": "" + question.q,
                    "footer": question.a.length + " letters",
                    "fields": [
                        {
                            "title": '',
                            "value": "Hint: " + utils_1.Utils.makeHint(question.a),
                            "short": false
                        }
                    ],
                }]
        };
    };
    MessageHelper.makeCorrectAnswerMessage = function (question, user, points) {
        return {
            icon_emoji: ':tada:',
            attachments: [{
                    "fallback": "correct",
                    "color": "#00bf3c",
                    "author_name": "Congratulations",
                    "title": "@" + user.name + " answered correctly: " + question.a,
                    "footer": points + " points"
                }]
        };
    };
    MessageHelper.makeSkipMessage = function (user, skipsLeft) {
        return {
            icon_emoji: ':fast_forward:',
            attachments: [{
                    "fallback": "skip",
                    "color": "#ededed",
                    "footer": skipsLeft + " more skip needed"
                }]
        };
    };
    MessageHelper.makeAfterSkipMessage = function (question) {
        return {
            icon_emoji: ':fast_forward:',
            attachments: [{
                    "fallback": "skipped",
                    "color": "#ededed",
                    "author_name": "Question skipped",
                    "title": "A: " + question.a,
                }]
        };
    };
    MessageHelper.makeScoresMessage = function (scores) {
        var scoresString = Object.keys(scores)
            .slice(0, 10)
            .sort(function (a, b) { return scores[b] - scores[a]; })
            .map(function (user, i) { return i + 1 + ". @" + user + " - " + scores[user]; })
            .join('\n');
        return {
            icon_emoji: ':trophy:',
            attachments: [{
                    "fallback": "scores",
                    "color": "#3dffa4",
                    "author_name": "Top 10 leaderboard",
                    "text": scoresString
                }]
        };
    };
    return MessageHelper;
}());
exports.MessageHelper = MessageHelper;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQyxJQUFJLENBQUcsRUFBdEMsQ0FBc0MsQ0FBQzthQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFZCxNQUFNLENBQUM7WUFDTCxVQUFVLEVBQUUsVUFBVTtZQUN0QixXQUFXLEVBQUUsQ0FBQztvQkFDWixVQUFVLEVBQUUsUUFBUTtvQkFDcEIsT0FBTyxFQUFFLFNBQVM7b0JBQ2xCLGFBQWEsRUFBRSxvQkFBb0I7b0JBQ25DLE1BQU0sRUFBRSxZQUFZO2lCQUNyQixDQUFDO1NBQ0gsQ0FBQTtJQUNILENBQUM7SUFDSCxvQkFBQztBQUFELENBdEZBLEFBc0ZDLElBQUE7QUF0Rlksc0NBQWEiLCJmaWxlIjoibWVzc2FnZUhlbHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VXRpbHN9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUhlbHBlciB7XG4gIHN0YXRpYyBtYWtlSGludE1lc3NhZ2UocXVlc3Rpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWNvbl9lbW9qaTogJzpidWxiOicsXG4gICAgICBhdHRhY2htZW50czogW3tcbiAgICAgICAgXCJmYWxsYmFja1wiOiBcImhpbnRcIixcbiAgICAgICAgXCJjb2xvclwiOiBcIiNmZmRkMDBcIixcbiAgICAgICAgXCJ0aXRsZVwiOiBVdGlscy5tYWtlSGludChxdWVzdGlvbi5hKSxcbiAgICAgICAgXCJmb290ZXJcIjogYCR7cXVlc3Rpb24uYS5sZW5ndGh9IGxldHRlcnNgXG4gICAgICB9XVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgbWFrZVF1ZXN0aW9uTWVzc2FnZShxdWVzdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICBpY29uX2Vtb2ppOiAnOnF1ZXN0aW9uOicsXG4gICAgICBhdHRhY2htZW50czogW3tcbiAgICAgICAgXCJmYWxsYmFja1wiOiBcInF1ZXN0aW9uXCIsXG4gICAgICAgIFwiY29sb3JcIjogXCIjZmY0ODI4XCIsXG4gICAgICAgIFwiYXV0aG9yX25hbWVcIjogXCJOZXh0IHF1ZXN0aW9uXCIsXG4gICAgICAgIFwidGl0bGVcIjogYCR7cXVlc3Rpb24ucX1gLFxuICAgICAgICBcImZvb3RlclwiOiBgJHtxdWVzdGlvbi5hLmxlbmd0aH0gbGV0dGVyc2AsXG4gICAgICAgIFwiZmllbGRzXCI6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcInRpdGxlXCI6ICcnLFxuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBgSGludDogJHtVdGlscy5tYWtlSGludChxdWVzdGlvbi5hKX1gLFxuICAgICAgICAgICAgXCJzaG9ydFwiOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgIH1dXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBtYWtlQ29ycmVjdEFuc3dlck1lc3NhZ2UocXVlc3Rpb24sIHVzZXIsIHBvaW50cykge1xuICAgIHJldHVybiB7XG4gICAgICBpY29uX2Vtb2ppOiAnOnRhZGE6JyxcbiAgICAgIGF0dGFjaG1lbnRzOiBbe1xuICAgICAgICBcImZhbGxiYWNrXCI6IFwiY29ycmVjdFwiLFxuICAgICAgICBcImNvbG9yXCI6IFwiIzAwYmYzY1wiLFxuICAgICAgICBcImF1dGhvcl9uYW1lXCI6IFwiQ29uZ3JhdHVsYXRpb25zXCIsXG4gICAgICAgIFwidGl0bGVcIjogYEAke3VzZXIubmFtZX0gYW5zd2VyZWQgY29ycmVjdGx5OiAke3F1ZXN0aW9uLmF9YCxcbiAgICAgICAgXCJmb290ZXJcIjogYCR7cG9pbnRzfSBwb2ludHNgXG4gICAgICB9XVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBtYWtlU2tpcE1lc3NhZ2UodXNlciwgc2tpcHNMZWZ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGljb25fZW1vamk6ICc6ZmFzdF9mb3J3YXJkOicsXG4gICAgICBhdHRhY2htZW50czogW3tcbiAgICAgICAgXCJmYWxsYmFja1wiOiBcInNraXBcIixcbiAgICAgICAgXCJjb2xvclwiOiBcIiNlZGVkZWRcIixcbiAgICAgICAgXCJmb290ZXJcIjogYCR7c2tpcHNMZWZ0fSBtb3JlIHNraXAgbmVlZGVkYFxuICAgICAgfV1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbWFrZUFmdGVyU2tpcE1lc3NhZ2UocXVlc3Rpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWNvbl9lbW9qaTogJzpmYXN0X2ZvcndhcmQ6JyxcbiAgICAgIGF0dGFjaG1lbnRzOiBbe1xuICAgICAgICBcImZhbGxiYWNrXCI6IFwic2tpcHBlZFwiLFxuICAgICAgICBcImNvbG9yXCI6IFwiI2VkZWRlZFwiLFxuICAgICAgICBcImF1dGhvcl9uYW1lXCI6IFwiUXVlc3Rpb24gc2tpcHBlZFwiLFxuICAgICAgICBcInRpdGxlXCI6IGBBOiAke3F1ZXN0aW9uLmF9YCxcbiAgICAgIH1dXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG1ha2VTY29yZXNNZXNzYWdlKHNjb3Jlcykge1xuICAgIHZhciBzY29yZXNTdHJpbmcgPSBPYmplY3Qua2V5cyhzY29yZXMpXG4gICAgICAuc2xpY2UoMCwgMTApXG4gICAgICAuc29ydCgoYSwgYikgPT4gc2NvcmVzW2JdIC0gc2NvcmVzW2FdKVxuICAgICAgLm1hcCgodXNlciwgaSkgPT4gYCR7aSArIDF9LiBAJHt1c2VyfSAtICR7c2NvcmVzW3VzZXJdfWApXG4gICAgICAuam9pbignXFxuJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWNvbl9lbW9qaTogJzp0cm9waHk6JyxcbiAgICAgIGF0dGFjaG1lbnRzOiBbe1xuICAgICAgICBcImZhbGxiYWNrXCI6IFwic2NvcmVzXCIsXG4gICAgICAgIFwiY29sb3JcIjogXCIjM2RmZmE0XCIsXG4gICAgICAgIFwiYXV0aG9yX25hbWVcIjogXCJUb3AgMTAgbGVhZGVyYm9hcmRcIixcbiAgICAgICAgXCJ0ZXh0XCI6IHNjb3Jlc1N0cmluZ1xuICAgICAgfV1cbiAgICB9XG4gIH1cbn1cbiJdfQ==
