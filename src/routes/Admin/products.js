const express = require('express')
const router = express.Router()
const staffController = require('../../controllers/Admin/products')


router.get('/itemQTY/:shopId', staffController.getItemQTY)
router.get('/bundleQTY/:shopId', staffController.getBundleQTY)
router.get('/totalProductSold/:shopId', staffController.getTotalProductSold)
router.get('/totalBundleSold/:shopId', staffController.getTotalBundleSold)
router.get('/totalItemSold/:shopId', staffController.getTotalItemSold)



module.exports = router
