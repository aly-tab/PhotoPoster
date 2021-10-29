const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    photo: {
      type: String,
      required: [true, "Photo is required"]
    },
    text: {
        type: String,
        required: [true, "Text is required"],
        maxlength: [1000, "Cannot exceed 1000 characters"]
    },
    hearts: {
        type: Number,
        default: 0 
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

module.exports.Photo = mongoose.model('Photo', PhotoSchema);