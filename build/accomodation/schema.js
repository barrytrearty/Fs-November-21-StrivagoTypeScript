"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model;
var AccomodationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    maxGuests: { type: Number, required: true },
    city: { type: String, required: true },
    host: [{ type: Schema.Types.ObjectId, ref: "users" }],
});
// AccomodationSchema.pre("save", async function (next) {
//   const newAccomodation = this;
//   const plainPW = newAccomodation.password;
//   if (newAccomodation.isModified("password")) {
//     newAccomodation.password = await bcrypt.hash(plainPW, 10);
//   }
//   next();
// });
exports.default = model("accomodation", AccomodationSchema);
