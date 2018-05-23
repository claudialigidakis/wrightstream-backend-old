const express = require('express')
const router = express.Router()
const controller = require('../controllers/shops')


router.get('/:shopId', controller.getOneShop)
router.post('/', controller.createShop)
router.put('/:shopId', controller.updateShop)
router.delete('/:shopId', controller.removeShop)

//staff routes

router.get('/staff', controller.getAllStaff)
router.get('/:shopId/staff/:staffId', controller.getOneStaff)
router.post('/staff', controller.createStaff)
router.put('/:shopId/staff/:staffId', controller.updateStaff)
router.delete('/:shopId/staff/:staffId', controller.removeStaff)

module.exports = router
