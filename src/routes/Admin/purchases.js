const express = require('express')
const router = express.Router()
const purchaseController = require('../../controllers/Admin/purchases')


router.get('/purchasesStatus/:shopId', purchaseController.purchaseStatuses)
router.get('/newPurchases/:shopId', purchaseController.newPurchases)
router.get('/productionPurchases/:shopId', purchaseController.productionPurchases)
router.get('/totalPurchases/:shopId', purchaseController.totalPurchases)
router.get('/completedPurchases/:shopId', purchaseController.completedPurchases)




module.exports = router
