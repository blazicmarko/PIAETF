import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('Events', Events);