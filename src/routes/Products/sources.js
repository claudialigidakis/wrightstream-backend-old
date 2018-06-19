const express = require('express')
const router = express.Router()
const sourcesController = require('../../controllers/Products/sources')



router.get('/:shopId/allSources', sourcesController.getAllSources)
router.post('/:shopId', sourcesController.createSource)
router.get('/:sourceId', sourcesController.getOneSource)
router.put('/:sourceId', sourcesController.updateSource)
router.delete('/:sourceId', sourcesController.removeSource)


module.exports = router
