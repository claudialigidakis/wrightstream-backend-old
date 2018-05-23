const express = require('express')
const router = express.Router()
const controller = require('../controllers/shops')


router.get('/:shopId', controller.getOne)
router.post('/', controller.create)
router.put('/:shopId', controller.update)
router.delete('/:shopId', controller.remove)


module.exports = router
