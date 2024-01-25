const express = require('express')
const router = express.Router()
const trainingController = require('../controller/trainingController')

router.get('/getalltraining', trainingController.getAllTraining) //READ ALL TRAINING
router.post('/createtraining', trainingController.createTraining) //CREATE TRAINING
router.delete('/deletetraining/:trainingid', trainingController.deleteTraining) //DELETE TRAINING
router.put('/updatetraining/:trainingid', trainingController.updatedTraining) //UPDATE TRAINING

module.exports = router