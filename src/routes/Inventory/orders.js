const express = require('express')
const router = express.Router()
const inventoryController = require('../../controllers/Inventory/orders')


router.get('/:orderId', inventoryController.getOneOrder)
router.get('/:shopId/allOrders', inventoryController.getAllOrders)
router.post('/:shopId', inventoryController.createOrder)
router.put('/order/:orderId', inventoryController.updateOrder)
router.put('/orderSupply/:orderId', inventoryController.updateOrderSupply)


module.exports = router
