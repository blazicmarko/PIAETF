"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Books = new Schema({
    picture: {
        type: String
    },
    name: {
        type: String
    },
    authors: {
        type: Array()
    },
    date: {
        type: Date
    },
    genres: {
        type: Array()
    },
    description: {
        type: String
    },
    grade: {
        type: Number
    },
    numOfComm: {
        type: Number
    },
    approved: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Books', Books);
//# sourceMappingURL=books.js.map