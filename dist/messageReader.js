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
var constants_1 = require("./constants");
// Simple wrapper to convert Emit messages to Promises so we can use async/await for cleaner code
var MessageReader = (function () {
    function MessageReader(slackBot, channelId) {
        var _this = this;
        this.slackBot = slackBot;
        this.channelId = channelId;
        this.promiseResolveFn;
        slackBot.on(constants_1.EventNames.Message, function (data) {
            if (data.type === constants_1.MessageTypes.Message && data.channel === channelId && data.user != null) {
                if (_this.promiseResolveFn) {
                    _this.promiseResolveFn(data);
                }
                else {
                    console.warn('promiseResolveFn is null');
                }
            }
        });
    }
    MessageReader.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.promiseResolveFn = resolve;
                    })];
            });
        });
    };
    ;
    return MessageReader;
}());
exports.MessageReader = MessageReader;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlUmVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBcUQ7QUFFckQsaUdBQWlHO0FBQ2pHO0lBS0UsdUJBQVksUUFBUSxFQUFFLFNBQVM7UUFBL0IsaUJBZUM7UUFkQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFFdEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxzQkFBVSxDQUFDLE9BQU8sRUFBRSxVQUFBLElBQUk7WUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyx3QkFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzFGLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUIsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDSixPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQzNDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUssMkJBQUcsR0FBVDs7OztnQkFDRSxzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO3dCQUNqQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO29CQUNsQyxDQUFDLENBQUMsRUFBQzs7O0tBQ0o7SUFBQSxDQUFDO0lBQ0osb0JBQUM7QUFBRCxDQTNCQSxBQTJCQyxJQUFBO0FBM0JZLHNDQUFhIiwiZmlsZSI6Im1lc3NhZ2VSZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50TmFtZXMsIE1lc3NhZ2VUeXBlc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vLyBTaW1wbGUgd3JhcHBlciB0byBjb252ZXJ0IEVtaXQgbWVzc2FnZXMgdG8gUHJvbWlzZXMgc28gd2UgY2FuIHVzZSBhc3luYy9hd2FpdCBmb3IgY2xlYW5lciBjb2RlXG5leHBvcnQgY2xhc3MgTWVzc2FnZVJlYWRlciB7XG4gIHNsYWNrQm90OmFueTtcbiAgY2hhbm5lbElkOnN0cmluZztcbiAgcHJvbWlzZVJlc29sdmVGbjphbnk7XG5cbiAgY29uc3RydWN0b3Ioc2xhY2tCb3QsIGNoYW5uZWxJZCkge1xuICAgIHRoaXMuc2xhY2tCb3QgPSBzbGFja0JvdDtcbiAgICB0aGlzLmNoYW5uZWxJZCA9IGNoYW5uZWxJZDtcbiAgICB0aGlzLnByb21pc2VSZXNvbHZlRm47XG5cbiAgICBzbGFja0JvdC5vbihFdmVudE5hbWVzLk1lc3NhZ2UsIGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGVzLk1lc3NhZ2UgJiYgZGF0YS5jaGFubmVsID09PSBjaGFubmVsSWQgJiYgZGF0YS51c2VyICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvbWlzZVJlc29sdmVGbikge1xuICAgICAgICAgIHRoaXMucHJvbWlzZVJlc29sdmVGbihkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ3Byb21pc2VSZXNvbHZlRm4gaXMgbnVsbCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBnZXQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucHJvbWlzZVJlc29sdmVGbiA9IHJlc29sdmU7XG4gICAgfSk7XG4gIH07XG59XG4iXX0=
