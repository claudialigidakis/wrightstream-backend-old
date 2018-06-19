const express = require('express')
const router = express.Router()
const productsController = require('../../controllers/Products/products')

router.get('/:productId', productsController.getOneProduct)
router.get('/:shopId/allProducts', productsController.getAllProducts)
router.put('/:productId', productsController.updateProducts)


module.exports = router
