"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Request = new Schema({
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
    picture: {
        type: String
    },
});
exports.default = mongoose_1.default.model('Request', Request);
//# sourceMappingURL=request.js.map