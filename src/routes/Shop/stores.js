const express = require('express')
const router = express.Router()
const storeController = require('../../controllers/Shop/stores')


//shop params
router.get('/:shopId/allStores', storeController.getAllStore)
router.post('/:shopId', storeController.createStore)

//store params
router.get('/:storeId', storeController.getOneStore)
router.put('/:storeId', storeController.updateStore)
router.delete('/:storeId', storeController.removeStore)


module.exports = router
