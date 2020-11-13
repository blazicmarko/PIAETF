"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Events = new Schema({
    name: {
        type: String
    },
    dateFrom: {
        type: Date
    },
    dateTo: {
        type: Date
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
});
exports.default = mongoose_1.default.model('Events', Events);
//# sourceMappingURL=events.js.map