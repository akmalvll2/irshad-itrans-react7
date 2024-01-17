const express = require('express')
const router = express.Router()
const competencyController = require('../controller/competencyController')

router.get('/getallcompetency', competencyController.getAllCompetency) //READ ALL COMPETENCY
router.post('/createcompetency', competencyController.createCompetency) //CREATE COMPETENCY
router.delete('/deletecompetency/:competencyid', competencyController.deleteCompetency) //DELETE COMPETENCY
router.put('/updatecompetency/:competencyid', competencyController.updateCompetency) //UPDATE COMPETENCY

module.exports = router