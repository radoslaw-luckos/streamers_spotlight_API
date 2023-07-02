const mongoose = require('mongoose')

const streamerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter streamer's name"]
    },
    desc: {
        type: String,
        required: [true, "Please describe the streamer"]
    },
    platform: {
        type: String,
        required: [true, "Please select a platform"]
    },
    upvotes: {
        type: Number,
        required: [true, "Please pass streamers upvotes"]
    },
    downvotes: {
        type: Number,
        required: [true, "Please pass streamers downvotes"]
    }
})

module.exports = mongoose.model('Streamer', streamerSchema)