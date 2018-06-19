const express = require('express')
const router = express.Router()
const kindsController = require('../../controllers/Products/kinds')



router.get('/:shopId/allKinds', kindsController.getAllKinds)
router.post('/:shopId', kindsController.createKinds)
router.get('/:kindId', kindsController.getOneKind)
router.put('/:kindId', kindsController.updateKinds)
router.delete('/:kindId', kindsController.removeKinds)


module.exports = router
