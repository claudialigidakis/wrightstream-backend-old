const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/orders')

//selecting one order
router.get('/:orderId', ordersController.getOneOrder)
//getting all of the orders
router.get('/:shopId/allOrders', ordersController.getAllOrders)
//creating a new order
router.post('/:shopId', ordersController.createOrders)
//updating an existing order
router.put('/:orderId', ordersController.updateOrders)
//removing an order 
router.delete('/:orderId', ordersController.removeOrders)


module.exports = router
