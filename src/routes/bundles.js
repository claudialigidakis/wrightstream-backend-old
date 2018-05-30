const express = require('express')
const router = express.Router()
const bundlesController = require('../controllers/bundles')


router.get('/:bundleId', bundlesController.getOneBundle)
router.get('/:shopId/allBundles', bundlesController.getAllBundles)
router.post('/:shopId', bundlesController.createBundles)
router.put('/:bundleId', bundlesController.updateBundles)
router.delete('/:bundleId', bundlesController.removeBundles)


module.exports = router
