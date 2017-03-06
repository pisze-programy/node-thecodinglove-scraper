import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {
        default: null,
        type: String,
        required: false
    },
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    post_id: {
        unique: true,
        required: true,
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Posts', PostSchema);
