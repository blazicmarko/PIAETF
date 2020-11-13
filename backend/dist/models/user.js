"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    mail: {
        type: String
    },
    date: {
        type: Date
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    type: {
        type: String
    },
    readBook: {
        type: Array()
    },
    readingBook: {
        type: Array()
    },
    wannaReadBook: {
        type: Array()
    },
    follows: {
        type: Array()
    },
    followers: {
        type: Array()
    },
    picture: {
        type: String
    }
});
exports.default = mongoose_1.default.model('User', User);
//# sourceMappingURL=user.js.map