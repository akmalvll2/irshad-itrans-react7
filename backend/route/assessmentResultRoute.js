const express = require('express')
const router = express.Router()
const assessmentResultController = require('../controller/assessmentResultController')

router.get('/getallassessmentresult', assessmentResultController.getAllAssessmentResult) //READ ALL ASSESSMENT RESULT
router.post('/createassessmentresult', assessmentResultController.createAssessmentResult) //CREATE ASSESSMENT RESULT
router.delete('/deleteassessmentresult/:assessmentresultid', assessmentResultController.deleteAssessmentResult) //DELETE ASSESSMENT RESULT
router.put('/updateassessmentresult/:assessmentresultid', assessmentResultController.updateAssessmentResult) //UPDATE ASSESSMENT RESULT

module.exports = router