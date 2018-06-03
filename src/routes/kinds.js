const express = require('express')
const router = express.Router()
const kindsController = require('../controllers/kinds')



router.get('/:shopId/allKinds', kindsController.getAllKinds)
router.post('/:shopId', kindsController.createKinds)
router.get('/:kindsId', kindsController.getOneKind)
router.put('/:kindsId', kindsController.updateKinds)
router.delete('/:kindsId', kindsController.removeKinds)


module.exports = router
