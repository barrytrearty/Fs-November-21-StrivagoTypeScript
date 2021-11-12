"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_errors_1 = __importDefault(require("http-errors"));
var model_1 = require("./model");
var tools_1 = require("../auth/tools");
var schema_1 = __importDefault(require("../accomodation/schema"));
var token_1 = require("../auth/token");
var hostOnly_1 = require("../auth/hostOnly");
var usersRouter = express_1.default.Router();
usersRouter.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, model_1.UserModel.find()];
            case 1:
                users = _a.sent();
                res.send(users);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
usersRouter.post("/register", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, _id, accessToken, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                newUser = new model_1.UserModel(req.body);
                return [4 /*yield*/, newUser.save()];
            case 1:
                _id = (_a.sent())._id;
                return [4 /*yield*/, (0, tools_1.JWTAuthenticate)(newUser)];
            case 2:
                accessToken = _a.sent();
                res.send(__assign(__assign({}, newUser.toObject()), { accessToken: accessToken }));
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
usersRouter.post("/login", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, accessToken, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, model_1.UserModel.checkCredentials(email, password)];
            case 1:
                user = _b.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, tools_1.JWTAuthenticate)(user)];
            case 2:
                accessToken = _b.sent();
                res.send({ accessToken: accessToken });
                return [3 /*break*/, 4];
            case 3:
                next((0, http_errors_1.default)(401, "Credentials are not ok!"));
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                next(error_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
usersRouter.get("/me/accomodation", token_1.JWTAuthMiddleware, hostOnly_1.hostOnlyMiddleware, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var accomodations, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                console.log(req.user._id.toString());
                return [4 /*yield*/, schema_1.default.find({
                        host: req.user._id.toString(),
                    })];
            case 1:
                accomodations = _a.sent();
                res.status(200).send(accomodations);
                return [3 /*break*/, 3];
            case 2:
                next((0, http_errors_1.default)(401, "Req.user not found!"));
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
usersRouter.get("/me", token_1.JWTAuthMiddleware, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            console.log(req.user);
            res.send(req.user);
        }
        catch (error) {
            next(error);
        }
        return [2 /*return*/];
    });
}); });
exports.default = usersRouter;
