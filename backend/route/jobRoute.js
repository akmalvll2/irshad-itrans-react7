const express = require('express')
const router = express.Router()
const jobController = require('../controller/jobController')

router.get('/getalljob', jobController.getAllJob) //READ ALL JOB
router.post('/createjob', jobController.createJob) //CREATE JOB
router.delete('/deletejob/:jobid', jobController.deleteJob) //DELETE JOB
router.put('/updatejob/:jobid', jobController.updateJob) //UPDATE JOB

module.exports = router