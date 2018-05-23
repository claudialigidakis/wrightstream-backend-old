const express = require('express')
const router = express.Router()
const controller = require('../controllers/staff')


router.get('/:staffId', controller.getOne)
router.get('/', controller.getAll)
router.post('/', controller.create)
router.put('/:staffId', controller.update)
router.delete('/:staffId', controller.remove)

module.exports = router
