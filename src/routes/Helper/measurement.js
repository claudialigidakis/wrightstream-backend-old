const express = require('express')
const router = express.Router()
const measurementController = require('../../controllers/Helper/measurement')


router.get('/volume', measurementController.volume)
router.get('/length', measurementController.length)
router.get('/mass', measurementController.mass)
router.post('/suppliesList', measurementController.predictor)


module.exports = router
