const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shops')

//shop routes
router.get('/:shopId', shopController.getOneShop)
router.post('/', shopController.createShop)
router.put('/:shopId', shopController.updateShop)
router.delete('/:shopId', shopController.removeShop)

//staff routes
router.get('/:shopId/staff/:staffId', shopController.getOneStaff)
router.get('/:shopId/staff', shopController.getAllStaff)
router.post('/:shopId/staff', shopController.createStaff)
router.put('/:shopId/staff/:staffId', shopController.updateStaff)
router.delete('/:shopId/staff/:staffId', shopController.removeStaff)

module.exports = router
