const express = require('express')
const router = express.Router()
const itemsController = require('../../controllers/Products/items')


router.get('/:itemId', itemsController.getOneItem)
router.get('/:shopId/allItems', itemsController.getAllItems)
router.get('/:shopId/allArchivedItems', itemsController.getAllArchivedItems)
router.post('/:shopId', itemsController.createItems)
router.put('/:itemId', itemsController.updateItems)
router.delete('/:itemId', itemsController.removeItems)


module.exports = router
