const express = require('express')
const router = express.Router()
const authController = require('../../controllers/Shop/auth')
const authEtsyController = require('../../controllers/Shop/authEtsy')

router.get('/loginUrl', authController.isAuthenticated, authEtsyController.getLogin)
router.post('/token', authController.isAuthenticated, authEtsyController.etsyRequestToken)

module.exports = router
