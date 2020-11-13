import mongoose from 'mongoose';
import Comments from './comments';

const Schema = mongoose.Schema;

let Books = new Schema({
    picture: {
        type: String
    },
    name: {
        type: String
    },
    authors: {
        type: Array<String>()
    },
    date: {
        type: Date
    },
    genres: {
        type: Array<String>()
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

export default mongoose.model('Books', Books);