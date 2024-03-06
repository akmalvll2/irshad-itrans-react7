const express = require('express')
const router = express.Router()
const employeeController = require('../controller/employeeController')

router.put('/mailpasswordemployee/:employeeid', employeeController.mailPasswordEmployee) //SEND GENERATE PASSWORD MAIL TO EMPLOYEE
router.get('/getallemployee', employeeController.getAllEmployee) //READ ALL EMPLOYEE
router.post('/createemployee', employeeController.createEmployee) //CREATE EMPLOYEE
router.delete('/deleteemployee/:employeeid', employeeController.deleteEmployee) //DELETE EMPLOYEE
router.put('/updateemployee/:employeeid', employeeController.updateEmployee) //UPDATE EMPLOYEE

module.exports = router