const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const authEtsyController = require('../controllers/authEtsy')
const etsyController = require('../controllers/etsy')


router.get('/self', authController.isAuthenticated, authEtsyController.withEtsyTokens, etsyController.getSelf)
router.get('/findAllListingActive', authController.isAuthenticated, authEtsyController.withEtsyTokens, etsyController.AllListingActive)
router.get('/findAllPurchases', authController.isAuthenticated, authEtsyController.withEtsyTokens, etsyController.findAllPurchases)
module.exports = router
