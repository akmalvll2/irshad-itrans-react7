const express = require('express')
const router = express.Router()
const assessmentController = require('../controller/assessmentController')

router.get('/getallassessment', assessmentController.getAllAssessment) //READ ALL ASSESSMENT
router.post('/createassessment', assessmentController.createAssessment) //CREATE ASSESSMENT
router.delete('/deleteassessment/:assessmentid', assessmentController.deleteAssessment) //DELETE ASSESSMENT
router.put('/updateassessment/:assessmentid', assessmentController.updateAssessment) //UPDATE ASSESSMENT

module.exports = router