"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var mongoose_1 = __importDefault(require("mongoose"));
process.env.TS_NODE_DEV && require("dotenv").config();
if (!process.env.MONGO_CONNECTION) {
    throw new Error("No MongoDB uri defined");
}
var port = process.env.PORT || 3001;
mongoose_1.default.connect(process.env.MONGO_CONNECTION);
mongoose_1.default.connection.on("connected", function () {
    console.log("Mongo connected!");
    server_1.server.listen(port, function () {
        console.log("Server running on port " + port);
    });
});
