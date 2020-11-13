import mongoose from 'mongoose';
import Books from './books';

const Schema = mongoose.Schema;

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
        type: Array<typeof Books>()
    },
    readingBook: {
        type: Array<typeof Books>()
    },
    wannaReadBook: {
        type: Array<typeof Books>()
    },
    follows : {
        type: Array<String>()
    },
    followers : {
        type: Array<String>()
    },
    picture : {
        type : String
    }




});

export default mongoose.model('User', User);