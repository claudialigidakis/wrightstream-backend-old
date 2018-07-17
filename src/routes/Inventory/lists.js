const express = require('express')
const router = express.Router()
const listController = require('../../controllers/Inventory/lists')


router.get('/:listId', listController.getOneList)
router.get('/:shopId/allLists', listController.getAllLists)
router.delete('/:listId', listController.removeList)
router.post('/:shopId', listController.createList)


module.exports = router
