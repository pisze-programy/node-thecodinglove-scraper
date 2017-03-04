import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {
        type: String,
        required: false
    },
    img: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    id: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

//////////////////////////////////////////////////////////

PostSchema.methods.findPost = function (key, next) {
    return this.model('Posts').findOne(key, (err, user) => next(err, user));
};

export default mongoose.model('Posts', PostSchema);
