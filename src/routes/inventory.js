const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventory')

router.get('/:shopId/supplies', inventoryController.getAllInventorySupplies)
router.get('/:shopId/products', inventoryController.getAllInventoryProducts)

module.exports = router
