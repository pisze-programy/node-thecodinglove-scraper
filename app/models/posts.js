import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {
        type: String
    },
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    id: {
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
