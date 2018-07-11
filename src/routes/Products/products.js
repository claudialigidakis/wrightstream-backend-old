const express = require('express')
const router = express.Router()
const productsController = require('../../controllers/Products/products')

router.get('/:shopId/allUnlinked', productsController.getAllUnlinked)
router.get('/:shopId/allProducts', productsController.getAllProducts)


module.exports = router
