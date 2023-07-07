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

    if (!req.body) {
        res.status(400)
        throw new Error("Please add new streamer's data")
    }

    try {
        const newStreamer = await Streamer.create({
            name: req.body.name,
            desc: req.body.desc,
            platform: req.body.platform,
            upvotes: req.body.upvotes,
            downvotes: req.body.downvotes,
        })

        res.status(200).json(newStreamer)
    } catch (error) {
        res.json(error.message)
    }


})
// @desc Update specific streamers votes
// @route PUT /streamer/:id/vote
const updateStreamersVotes = asyncHandler(async (req, res) => {

    if (!req.body.upvotes && !req.body.downvotes) {
        res.status(400)
        throw new Error("Please add updated streamer's data")
    }
    if ((req.body.upvotes && typeof req.body.upvotes != 'number') || (req.body.downvotes && typeof req.body.downvotes != 'number')) {
        res.status(400)
        throw new Error("Wrong data format! Upvotes/downvotes should be of type Number!")
    }

    try {

        if (req.body.upvotes) {            
            const updatedStreamer = await Streamer.findByIdAndUpdate(req.params.id, {
                upvotes: req.body.upvotes,
            });
            res.status(200).json({ message: 'Streamer votes updated correctly' });
        }
        if (req.body.downvotes) {
            const updatedStreamer = await Streamer.findByIdAndUpdate(req.params.id, {
                downvotes: req.body.downvotes,
            });
            res.status(200).json({ message: 'Streamer votes updated correctly' });
        }
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