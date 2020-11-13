import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('Request', Request);