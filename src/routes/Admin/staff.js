const express = require('express')
const router = express.Router()
const staffController = require('../../controllers/Admin/staff')


router.get('/currentStaff/:shopId', staffController.getCurrentStaff)
router.get('/pastStaff/:shopId', staffController.getPastStaff)
router.get('/totalStaff/:shopId', staffController.totalStaff)
router.get('/currentWorkingStaff/:shopId', staffController.currentWorkingStaff)

module.exports = router
