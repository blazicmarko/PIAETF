import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Genres = new Schema({
    name: {
        type: String
    }
});

export default mongoose.model('Genres', Genres);