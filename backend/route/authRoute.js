const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')

router.post('/userauthentication', authController.adminAuthentication) //router to fetch TOKEN AUTHENTICATION data [id,password]

module.exports = router