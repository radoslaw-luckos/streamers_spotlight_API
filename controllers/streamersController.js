const asyncHandler = require('express-async-handler')
const Streamer = require('../models/streamerModel')

// @desc Get streamers
// @route GET /streamers
const getStreamers = asyncHandler(async (req, res) => {

    try {
        const streamers = await Streamer.find()
        res.status(200).json(streamers)
    } catch (error) {
        res.json(error.message)
    }

}) 
// @desc Get specific streamer
// @route GET /streamer/:id
const getSpecificStreamer = asyncHandler(async (req, res) => {
    try {
        const streamer = await Streamer.findById(req.params.id)
        if (!streamer) {
            res.status(400)
            throw new Error('Streamer not found. Wrong id')
        }
        res.status(200).json(streamer)
    } catch (error) {
        res.json(error.message)
    }




})
// @desc Post new streamer
// @route POST /streamers
const postNewStreamer = asyncHandler(async (req, res) => {

    if (!req.body.newStreamer) {
        res.status(400)
        throw new Error("Please add new streamer's data")
    }

    try {
        const newStreamer = await Streamer.create({
            name: req.body.newStreamer.name,
            desc: req.body.newStreamer.desc,
            platform: req.body.newStreamer.platform,
            upvotes: req.body.newStreamer.upvotes,
            downvotes: req.body.newStreamer.downvotes,
        })

        res.status(200).json(newStreamer)
    } catch (error) {
        res.json(error.message)
    }


})
// @desc Update specific streamers votes
// @route PUT /streamer/:id/vote
const updateStreamersVotes = asyncHandler(async (req, res) => {

    if (!req.body.updatedStreamer) {
        res.status(400)
        throw new Error("Please add updated streamer's data")
    }
    if (typeof req.body.updatedStreamer.upvotes != Number || typeof req.body.updatedStreamer.downvotes != Number) {
        res.status(400)
        throw new Error("Wrong data format! Upvotes/downvotes should be of type Number!")
    }

    try {
        const updatedStreamer = await Streamer.findByIdAndUpdate(req.params.id, {
            upvotes: req.body.updatedStreamer.upvotes,
            downvotes: req.body.updatedStreamer.downvotes,
        })
        res.status(200).json(updatedStreamer)
    } catch (error) {
        res.json(error.message)
    }

})

module.exports = {
    getStreamers, 
    getSpecificStreamer,
    postNewStreamer,
    updateStreamersVotes
}