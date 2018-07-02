const express = require('express')
const router = express.Router()
const staffController = require('../../controllers/Admin/products')


router.get('/pastProducts/:shopId', staffController.getPastProducts)


module.exports = router
