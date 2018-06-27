const express = require('express')
const router = express.Router()
const measurementController = require('../../controllers/Helper/measurement')


router.get('/volume', measurementController.volume)
router.get('/length', measurementController.length)
router.get('/mass', measurementController.mass)
router.get('/wrightStream/:shopId', measurementController.wrightStream)
router.post('/suppliesList', measurementController.predictor)
router.post('/orderPredictor', measurementController.orderPredictor)


module.exports = router
