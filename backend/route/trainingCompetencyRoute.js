const express = require('express')
const router = express.Router()
const trainingCompetencyController = require('../controller/trainingCompetencyController')

router.get('/getalltrainingcompetency', trainingCompetencyController.getAllTrainingCompetency) //READ ALL TRAINING COMPETENCY
router.post('/createtrainingcompetency', trainingCompetencyController.createTrainingCompetency) //CREATE TRAINING COMPETENCY
router.delete('/deletetrainingcompetency/:trainingcompetencyid', trainingCompetencyController.deleteTrainingCompetency) //DELETE TRAINING COMPETENCY
router.put('/updatetrainingcompetency/:trainingcompetencyid', trainingCompetencyController.updateTrainingCompetency) //UPDATE TRAINING COMPETENCY

module.exports = router