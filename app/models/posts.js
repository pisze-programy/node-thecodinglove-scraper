const mongoose = require("mongoose");
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

module.exports = mongoose.model('Posts', PostSchema);
