const express = require('express')
const router = express.Router()
const purchasesController = require('../controllers/purchases')

//selecting one order
router.get('/:purchases', purchasesController.getOnepurchase)
//getting all of the orders
router.get('/:shopId/allPurchases', purchasesController.getAllPurchases)
//creating a new order
router.post('/:shopId', purchasesController.createPurchases)
//updating an existing order
router.put('/:purchaseId', purchasesController.updatePurchases)
//removing an order
router.delete('/:purchaseId', purchasesController.removePurchases)


module.exports = router
