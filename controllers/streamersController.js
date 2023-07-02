const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid');
const Streamer = require('../models/streamerModel')

// @desc Get streamers
// @route GET /streamers
const getStreamers = asyncHandler(async (req, res) => {
    const streamers = await Streamer.find()
    res.status(200).json(streamers)
}) 
// @desc Get specific streamer
// @route GET /streamer/:id
const getSpecificStreamer = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Get specific streamer -${req.params.id}`})
})
// @desc Post new streamer
// @route POST /streamers
const postNewStreamer = asyncHandler(async (req, res) => {
    if (!req.body.newStreamer) {
        res.status(400)
        throw new Error("Please add new streamer's data")
    }
    console.log(req.body.newStreamer);
    const newStreamer =await Streamer.create({
        name: req.body.newStreamer.name,
        desc: req.body.newStreamer.desc,
        platform: req.body.newStreamer.platform,
        upvotes: req.body.newStreamer.upvotes,
        downvotes: req.body.newStreamer.downvotes,
    })

    res.status(200).json(newStreamer)
    console.log(newStreamer.name);
})
// @desc Update specific streamers votes
// @route PUT /streamer/:id
const updateStreamersVotes = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update streamer's - ${req.params.id} - votes`})
})

module.exports = {
    getStreamers, 
    getSpecificStreamer,
    postNewStreamer,
    updateStreamersVotes
}