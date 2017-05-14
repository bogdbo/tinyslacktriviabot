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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var SlackBot = require("slackbots");
var db = require("sqlite");
var utils_js_1 = require("./utils.js");
var constants_js_1 = require("./constants.js");
var channelBot_js_1 = require("./channelBot.js");
db.open('./data/trivia.db');
var settings = utils_js_1.Utils.loadSettings('./myconfig.json', false);
var bot = new SlackBot({ token: settings.token, name: settings.name });
bot.on(constants_js_1.EventNames.Open, function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        settings.channels.forEach(function (ch) { return new channelBot_js_1.ChannelBot(db, bot, ch, settings).run(); });
        return [2 /*return*/];
    });
}); });

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkFhQTs7QUFiQSxvQ0FBc0M7QUFDdEMsMkJBQTZCO0FBQzdCLHVDQUFpQztBQUNqQywrQ0FBMEM7QUFDMUMsaURBQTJDO0FBRTNDLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUM1QixJQUFNLFFBQVEsR0FBRyxnQkFBSyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5RCxJQUFNLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFHLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUUxRSxHQUFHLENBQUMsRUFBRSxDQUFDLHlCQUFVLENBQUMsSUFBSSxFQUFFOztRQUN0QixRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLElBQUksMEJBQVUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBM0MsQ0FBMkMsQ0FBQyxDQUFDOzs7S0FDOUUsQ0FBQyxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2xhY2tCb3QgZnJvbSAnc2xhY2tib3RzJztcbmltcG9ydCAqIGFzIGRiIGZyb20gJ3NxbGl0ZSc7XG5pbXBvcnQge1V0aWxzfSBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCB7RXZlbnROYW1lc30gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHtDaGFubmVsQm90fSBmcm9tICcuL2NoYW5uZWxCb3QuanMnO1xuXG5kYi5vcGVuKCcuL2RhdGEvdHJpdmlhLmRiJyk7XG5jb25zdCBzZXR0aW5ncyA9IFV0aWxzLmxvYWRTZXR0aW5ncygnLi9teWNvbmZpZy5qc29uJywgZmFsc2UpO1xuY29uc3QgYm90ID0gbmV3IFNsYWNrQm90KHsgdG9rZW46IHNldHRpbmdzLnRva2VuICwgbmFtZTogc2V0dGluZ3MubmFtZSB9KTtcblxuYm90Lm9uKEV2ZW50TmFtZXMuT3BlbiwgYXN5bmMgKCkgPT4ge1xuICBzZXR0aW5ncy5jaGFubmVscy5mb3JFYWNoKGNoID0+IG5ldyBDaGFubmVsQm90KGRiLCBib3QsIGNoLCBzZXR0aW5ncykucnVuKCkpO1xufSk7XG4iXX0=
