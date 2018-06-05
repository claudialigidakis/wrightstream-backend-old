const express = require('express')
const router = express.Router()
const purchaseItemsController = require('../controllers/purchases_items')



router.get('/:purchase_id/allPurchaseItems', purchaseItemsController.getAllPurchaseItem)
router.post('/:purchaseId', purchaseItemsController.createPurchaseItem)
router.get('/:purchase_id/:item_id', purchaseItemsController.getOnePurchaseItem)
router.put('/:purchase_id/:item_id', purchaseItemsController.updatePurchaseItem)
router.delete('/:purchase_id/:item_id', purchaseItemsController.removePurchaseItem)


module.exports = router
