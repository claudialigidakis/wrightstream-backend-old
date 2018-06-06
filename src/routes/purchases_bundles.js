const express = require('express')
const router = express.Router()
const purchaseBundlesController = require('../controllers/purchases_bundles')


router.get('/:purchase_id/allPurchaseBundles', purchaseBundlesController.getAllPurchaseBundles)
router.post('/:purchaseId', purchaseBundlesController.createPurchaseBundle)
router.get('/:purchase_id/:bundle_id', purchaseBundlesController.getOnePurchaseBundle)
router.put('/:purchase_id/:bundle_id', purchaseBundlesController.updatePurchaseBundle)
router.delete('/:purchase_id/:bundle_id', purchaseBundlesController.removePurchaseBundle)


module.exports = router
