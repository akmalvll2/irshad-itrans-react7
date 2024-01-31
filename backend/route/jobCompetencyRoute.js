const express = require('express')
const router = express.Router()
const jobCompetencyController = require('../controller/jobCompetencyController')

router.get('/getalljobcompetency', jobCompetencyController.getAllJobCompetency) //READ ALL JOB COMPETENCY
router.post('/createjobcompetency', jobCompetencyController.createJobCompetency) //CREATE JOB COMPETENCY
router.delete('/deletejobcompetency/:jobcompetencyid', jobCompetencyController.deleteJobCompetency) //DELETE JOB COMPETENCY
router.put('/updatejobcompetency/:jobcompetencyid', jobCompetencyController.updateJobCompetency) //UPDATE JOB COMPETENCY

module.exports = router