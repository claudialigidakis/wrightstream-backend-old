const express = require('express')
const router = express.Router()
const suppliesController = require('../../controllers/Products/supplies')



router.get('/:shopId/allSupplies', suppliesController.getAllSupplies)
router.post('/:shopId', suppliesController.createSupplies)
router.get('/:suppliesId', suppliesController.getOneSupply)
router.put('/:suppliesId', suppliesController.updateSupplies)
router.delete('/:suppliesId', suppliesController.removeSupplies)


module.exports = router
