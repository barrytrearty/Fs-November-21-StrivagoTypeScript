"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var schema_1 = require("./schema");
exports.UserModel = (0, mongoose_1.model)("users", schema_1.UserSchema);
