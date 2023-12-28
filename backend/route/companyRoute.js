const express = require('express')
const router = express.Router()
const companyController = require('../controller/companyController')

router.get('/getallcompany', companyController.getAllCompany) //router to READ ALL COMPANY data

module.exports = router