const express = require('express')
const router = express.Router()
const purchaseController = require('../../controllers/Admin/purchases')


router.get('/purchasesStatus/:shopId', purchaseController.purchaseStatuses)
// router.get('/pastStaff/:shopId', purchaseController.getPastStaff)


module.exports = router
