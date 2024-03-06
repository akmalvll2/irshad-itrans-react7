const express = require('express')
const router = express.Router()
const assessorController = require('../controller/assessorController')

router.get('/getallassessor', assessorController.getAllAssessor) //READ ALL ASSESSOR
router.post('/createassessor', assessorController.createAssessor) //CREATE ASSESSOR
router.delete('/deleteassessor/:staffassessorid', assessorController.deleteAssessor) //DELETE ASSESSOR
router.put('/updateassessor/:staffassessorid', assessorController.updateAssessor) //UPDATE ASSESSOR

module.exports = router