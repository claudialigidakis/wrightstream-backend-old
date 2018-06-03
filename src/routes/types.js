const express = require('express')
const router = express.Router()
const typeController = require('../controllers/types')



router.get('/:shopId/allTypes', typeController.getAllTypes)
router.post('/:shopId', typeController.createTypes)
router.get('/:typeId', typeController.getOneType)
router.put('/:typeId', typeController.updateTypes)
router.delete('/:typeId', typeController.removeTypes)


module.exports = router
