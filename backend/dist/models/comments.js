"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Comments = new Schema({
    author: {
        type: String
    },
    book: {
        type: String
    },
    description: {
        type: String
    },
    grade: {
        type: Number
    },
});
exports.default = mongoose_1.default.model('Comments', Comments);
//# sourceMappingURL=comments.js.map