const express = require('express')
const router = express.Router()
const itemsController = require('../controllers/items')


router.get('/:itemId', ordersController.getOneItem)
router.get('/:shopId/allItems', ordersController.getAllItems)
router.post('/:shopId', ordersController.createItems)
router.put('/:itemId', ordersController.updateItems)
router.delete('/:itemId', ordersController.removeItems)


module.exports = router
