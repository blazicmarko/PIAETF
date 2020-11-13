import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('Comments', Comments);