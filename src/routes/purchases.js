const express = require('express')
const router = express.Router()
const purchasesController = require('../controllers/purchases')



router.get('/:shopId/allPurchases', purchasesController.getAllPurchases)
router.post('/:shopId', purchasesController.createPurchases)
router.get('/:purchases', purchasesController.getOnepurchase)
router.put('/:purchaseId', purchasesController.updatePurchases)
router.delete('/:purchaseId', purchasesController.removePurchases)


module.exports = router
