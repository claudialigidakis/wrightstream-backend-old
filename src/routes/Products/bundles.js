const express = require('express')
const router = express.Router()
const bundlesController = require('../../controllers/Products/bundles')


router.get('/:bundleId', bundlesController.getOneBundle)
router.get('/:shopId/allBundles', bundlesController.getAllBundles)
router.get('/:shopId/allArchivedBundles', bundlesController.getAllArchivedBundles)
router.post('/:shopId', bundlesController.createBundles)
router.put('/:bundleId', bundlesController.updateBundles)
router.delete('/:bundleId', bundlesController.removeBundles)


module.exports = router
