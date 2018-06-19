const express = require('express')
const router = express.Router()
const categoryController = require('../../controllers/Products/categories')


router.get('/:categoryId', categoryController.getOneCategory)
router.get('/:shopId/allCategories', categoryController.getAllCategories)
router.post('/:shopId', categoryController.createCategories)
router.put('/:categoryId', categoryController.updateCategories)
router.delete('/:categoryId', categoryController.removeCategories)


module.exports = router
