const express = require('express')
const router = express.Router()
const {getStreamers, getSpecificStreamer, postNewStreamer, updateStreamersVotes} = require('../controllers/streamersController')

router.get('/', (req, res) => {
    res.status(200).json({message: `Welcome to Streamer's Spotlight API`})
})
router.route('/streamers').get(getStreamers).post(postNewStreamer)
router.get('/streamer/:id',getSpecificStreamer)
router.put('/streamer/:id/vote', updateStreamersVotes)


module.exports = router