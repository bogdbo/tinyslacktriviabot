"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var messageReader_1 = require("./messageReader");
var utils_1 = require("./utils");
var messageHelper_1 = require("./messageHelper");
var ChannelBot = (function () {
    function ChannelBot(db, slackBot, channelId, settings) {
        this.db = db;
        this.slackBot = slackBot;
        this.channelId = channelId;
        this.reader = new messageReader_1.MessageReader(slackBot, channelId);
        this.question = null;
        this.scores = utils_1.Utils.loadScores(this.channelId);
        this.skips = {};
        this.settings = {
            showScoreInterval: 10,
            nextQuestionGap: 5000
        };
        Object.assign(this.settings, settings);
        this.showScores = this.settings.showScoreInterval;
    }
    ChannelBot.prototype._postMessage = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.slackBot.postMessage(this.channelId, null, params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChannelBot.prototype._nextQuestion = function (delay) {
        if (delay === void 0) { delay = this.settings.nextQuestionGap; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.question = null;
                this.skips = {};
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this;
                                return [4 /*yield*/, this.db.get('SELECT id, q, a FROM QUESTIONS ORDER BY random() LIMIT 1')];
                            case 1:
                                _a.question = _b.sent();
                                return [4 /*yield*/, this._postMessage(messageHelper_1.MessageHelper.makeQuestionMessage(this.question))];
                            case 2:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, delay);
                return [2 /*return*/];
            });
        });
    };
    ;
    ChannelBot.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var message, haveQuestion, user, _a, skips;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._nextQuestion(0)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 19];
                        return [4 /*yield*/, this.reader.get()];
                    case 3:
                        message = _b.sent();
                        haveQuestion = this.question != null;
                        return [4 /*yield*/, this.slackBot.getUserById(message.user)];
                    case 4:
                        user = _b.sent();
                        _a = true;
                        switch (_a) {
                            case /^scores$/ig.test(message.text): return [3 /*break*/, 5];
                            case /^hint$/ig.test(message.text) && haveQuestion: return [3 /*break*/, 6];
                            case /^skip$/ig.test(message.text) && haveQuestion: return [3 /*break*/, 8];
                            case haveQuestion: return [3 /*break*/, 14];
                        }
                        return [3 /*break*/, 18];
                    case 5:
                        this.showScores = this.settings.showScoreInterval;
                        this._postMessage(messageHelper_1.MessageHelper.makeScoresMessage(this.scores));
                        return [3 /*break*/, 18];
                    case 6: return [4 /*yield*/, this._postMessage(messageHelper_1.MessageHelper.makeHintMessage(this.question))];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 18];
                    case 8:
                        this.skips[user.name] = true;
                        skips = Object.keys(this.skips).length;
                        if (!(skips >= this.settings.skipCount)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this._postMessage(messageHelper_1.MessageHelper.makeAfterSkipMessage(this.question))];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, this._nextQuestion()];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, this._postMessage(messageHelper_1.MessageHelper.makeSkipMessage(user, this.settings.skipCount - skips))];
                    case 12:
                        _b.sent();
                        _b.label = 13;
                    case 13: return [3 /*break*/, 18];
                    case 14:
                        if (!(this.question.a.toLowerCase().trim() === message.text.toLowerCase().trim())) return [3 /*break*/, 17];
                        this.scores[user.name] = (this.scores[user.name] || 0) + 1;
                        utils_1.Utils.saveScores(this.channelId, this.scores);
                        return [4 /*yield*/, this._postMessage(messageHelper_1.MessageHelper.makeCorrectAnswerMessage(this.question, user, this.scores[user.name]))];
                    case 15:
                        _b.sent();
                        if (--this.showScores == 0) {
                            this.showScores = this.settings.showScoreInterval;
                            this._postMessage(messageHelper_1.MessageHelper.makeScoresMessage(this.scores));
                        }
                        return [4 /*yield*/, this._nextQuestion()];
                    case 16:
                        _b.sent();
                        _b.label = 17;
                    case 17: return [3 /*break*/, 18];
                    case 18: return [3 /*break*/, 2];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    return ChannelBot;
}());
exports.ChannelBot = ChannelBot;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFFLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQSxFQUExRSx5QkFBMEU7d0JBQzVFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUMzRCxhQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUM5QyxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLDZCQUFhLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFBOzt3QkFBNUcsU0FBNEcsQ0FBQzt3QkFDN0csRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQzs0QkFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyw2QkFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNsRSxDQUFDO3dCQUNELHFCQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQTs7d0JBQTFCLFNBQTBCLENBQUM7OzZCQUU3Qix5QkFBTTs7Ozs7O0tBR2I7SUFDSCxpQkFBQztBQUFELENBL0VBLEFBK0VDLElBQUE7QUEvRVksZ0NBQVUiLCJmaWxlIjoiY2hhbm5lbEJvdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWVzc2FnZVJlYWRlcn0gZnJvbSAnLi9tZXNzYWdlUmVhZGVyJztcbmltcG9ydCB7VXRpbHN9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtNZXNzYWdlSGVscGVyfSBmcm9tICcuL21lc3NhZ2VIZWxwZXInO1xuXG5leHBvcnQgY2xhc3MgQ2hhbm5lbEJvdCB7XG4gIGRiOmFueTtcbiAgc2xhY2tCb3Q6IGFueTtcbiAgY2hhbm5lbElkOiBzdHJpbmc7XG4gIHJlYWRlcjogTWVzc2FnZVJlYWRlcjtcbiAgc2NvcmVzOiBhbnk7XG4gIHNldHRpbmdzOiBhbnk7XG4gIHNob3dTY29yZXM6IGFueTtcbiAgc2tpcHM6IGFueTtcbiAgcXVlc3Rpb246IGFueTtcblxuICBjb25zdHJ1Y3RvcihkYiwgc2xhY2tCb3QsIGNoYW5uZWxJZCwgc2V0dGluZ3MpIHtcbiAgICB0aGlzLmRiID0gZGI7XG4gICAgdGhpcy5zbGFja0JvdCA9IHNsYWNrQm90O1xuICAgIHRoaXMuY2hhbm5lbElkID0gY2hhbm5lbElkO1xuICAgIHRoaXMucmVhZGVyID0gbmV3IE1lc3NhZ2VSZWFkZXIoc2xhY2tCb3QsIGNoYW5uZWxJZCk7XG4gICAgdGhpcy5xdWVzdGlvbiA9IG51bGw7XG4gICAgdGhpcy5zY29yZXMgPSBVdGlscy5sb2FkU2NvcmVzKHRoaXMuY2hhbm5lbElkKTtcbiAgICB0aGlzLnNraXBzID0ge307XG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIHNob3dTY29yZUludGVydmFsOiAxMCxcbiAgICAgIG5leHRRdWVzdGlvbkdhcDogNTAwMFxuICAgIH07XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnNldHRpbmdzLCBzZXR0aW5ncyk7XG4gICAgdGhpcy5zaG93U2NvcmVzID0gdGhpcy5zZXR0aW5ncy5zaG93U2NvcmVJbnRlcnZhbDtcbiAgfVxuXG4gIGFzeW5jIF9wb3N0TWVzc2FnZShwYXJhbXMpIHtcbiAgICBhd2FpdCB0aGlzLnNsYWNrQm90LnBvc3RNZXNzYWdlKHRoaXMuY2hhbm5lbElkLCBudWxsLCBwYXJhbXMpO1xuICB9XG5cbiAgYXN5bmMgX25leHRRdWVzdGlvbihkZWxheSA9IHRoaXMuc2V0dGluZ3MubmV4dFF1ZXN0aW9uR2FwKSB7XG4gICAgdGhpcy5xdWVzdGlvbiA9IG51bGw7XG4gICAgdGhpcy5za2lwcyA9IHt9O1xuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgdGhpcy5xdWVzdGlvbiA9IGF3YWl0IHRoaXMuZGIuZ2V0KCdTRUxFQ1QgaWQsIHEsIGEgRlJPTSBRVUVTVElPTlMgT1JERVIgQlkgcmFuZG9tKCkgTElNSVQgMScpO1xuICAgICAgYXdhaXQgdGhpcy5fcG9zdE1lc3NhZ2UoTWVzc2FnZUhlbHBlci5tYWtlUXVlc3Rpb25NZXNzYWdlKHRoaXMucXVlc3Rpb24pKTtcbiAgICB9LCBkZWxheSk7XG4gIH07XG5cbiAgYXN5bmMgcnVuKCkge1xuICAgIGF3YWl0IHRoaXMuX25leHRRdWVzdGlvbigwKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgbWVzc2FnZTphbnkgPSBhd2FpdCB0aGlzLnJlYWRlci5nZXQoKTtcbiAgICAgIGNvbnN0IGhhdmVRdWVzdGlvbiA9IHRoaXMucXVlc3Rpb24gIT0gbnVsbDtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnNsYWNrQm90LmdldFVzZXJCeUlkKG1lc3NhZ2UudXNlcik7XG4gICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgY2FzZSAvXnNjb3JlcyQvaWcudGVzdChtZXNzYWdlLnRleHQpOlxuICAgICAgICAgIHRoaXMuc2hvd1Njb3JlcyA9IHRoaXMuc2V0dGluZ3Muc2hvd1Njb3JlSW50ZXJ2YWw7XG4gICAgICAgICAgdGhpcy5fcG9zdE1lc3NhZ2UoTWVzc2FnZUhlbHBlci5tYWtlU2NvcmVzTWVzc2FnZSh0aGlzLnNjb3JlcykpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIC9eaGludCQvaWcudGVzdChtZXNzYWdlLnRleHQpICYmIGhhdmVRdWVzdGlvbjpcbiAgICAgICAgICBhd2FpdCB0aGlzLl9wb3N0TWVzc2FnZShNZXNzYWdlSGVscGVyLm1ha2VIaW50TWVzc2FnZSh0aGlzLnF1ZXN0aW9uKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgL15za2lwJC9pZy50ZXN0KG1lc3NhZ2UudGV4dCkgJiYgaGF2ZVF1ZXN0aW9uOlxuICAgICAgICAgIHRoaXMuc2tpcHNbdXNlci5uYW1lXSA9IHRydWU7XG4gICAgICAgICAgdmFyIHNraXBzID0gT2JqZWN0LmtleXModGhpcy5za2lwcykubGVuZ3RoO1xuICAgICAgICAgIGlmIChza2lwcyA+PSB0aGlzLnNldHRpbmdzLnNraXBDb3VudCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcG9zdE1lc3NhZ2UoTWVzc2FnZUhlbHBlci5tYWtlQWZ0ZXJTa2lwTWVzc2FnZSh0aGlzLnF1ZXN0aW9uKSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9uZXh0UXVlc3Rpb24oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcG9zdE1lc3NhZ2UoTWVzc2FnZUhlbHBlci5tYWtlU2tpcE1lc3NhZ2UodXNlciwgdGhpcy5zZXR0aW5ncy5za2lwQ291bnQgLSBza2lwcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBoYXZlUXVlc3Rpb246XG4gICAgICAgICAgaWYgKHRoaXMucXVlc3Rpb24uYS50b0xvd2VyQ2FzZSgpLnRyaW0oKSA9PT0gbWVzc2FnZS50ZXh0LnRvTG93ZXJDYXNlKCkudHJpbSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNjb3Jlc1t1c2VyLm5hbWVdID0gKHRoaXMuc2NvcmVzW3VzZXIubmFtZV0gfHwgMCkgKyAxO1xuICAgICAgICAgICAgVXRpbHMuc2F2ZVNjb3Jlcyh0aGlzLmNoYW5uZWxJZCwgdGhpcy5zY29yZXMpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcG9zdE1lc3NhZ2UoTWVzc2FnZUhlbHBlci5tYWtlQ29ycmVjdEFuc3dlck1lc3NhZ2UodGhpcy5xdWVzdGlvbiwgdXNlciwgdGhpcy5zY29yZXNbdXNlci5uYW1lXSkpO1xuICAgICAgICAgICAgaWYgKC0tdGhpcy5zaG93U2NvcmVzID09IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5zaG93U2NvcmVzID0gdGhpcy5zZXR0aW5ncy5zaG93U2NvcmVJbnRlcnZhbDtcbiAgICAgICAgICAgICAgdGhpcy5fcG9zdE1lc3NhZ2UoTWVzc2FnZUhlbHBlci5tYWtlU2NvcmVzTWVzc2FnZSh0aGlzLnNjb3JlcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fbmV4dFF1ZXN0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19
