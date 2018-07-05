const express = require('express')
const router = express.Router()
const suppliesController = require('../../controllers/Admin/supplies')


router.get('/mostUsed/:shopId', suppliesController.mostUsed)
router.get('/mostOrdered/:shopId', suppliesController.mostOrdered)

module.exports = router
