const express = require('express')
const router = express.Router()
const departmentController = require('../controller/departmentController')

router.get('/getalldepartment', departmentController.getAllDepartment) //READ ALL DEPARTMENT
router.post('/createdepartment', departmentController.createDepartment) //CREATE DEPARTMENT
router.delete('/deletedepartment/:departmentid', departmentController.deleteDepartment) //CREATE DEPARTMENT

module.exports = router