const express = require('express')
const router = express.Router()
const staffController = require('../../controllers/Admin/products')


router.get('/pastProducts/:shopId', staffController.getPastPurchases)
router.get('/totalProductSold/:shopId', staffController.getTotalProductSold)
router.get('/totalBundleSold/:shopId', staffController.getTotalBundleSold)
router.get('/totalItemSold/:shopId', staffController.getTotalItemSold)



module.exports = router
