const express = require('express')
const router = express.Router()
const divisionController = require('../controller/divisionController')

router.get('/getalldivision', divisionController.getAllDivision) //READ ALL DIVISION
router.post('/createdivision', divisionController.createDivision) //CREATE DIVISION
router.delete('/deletedivision/:divisionid', divisionController.deleteDivision) //DELETE DIVISION
router.put('/updatedivision/:divisionid', divisionController.updateDivision) //UPDATE DIVISION

module.exports = router