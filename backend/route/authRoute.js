const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')

router.post('/adminauthentication', authController.adminAuthentication) //router to fetch TOKEN AUTHENTICATION data [id,password] admin
router.post('/userauthentication', authController.userAuthentication) //router to fetch TOKEN AUTHENTICATION data [id,password] user

module.exports = router