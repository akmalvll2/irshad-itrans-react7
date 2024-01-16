const jobModel = require('../model/jobModel')

//READ ALL JOB
async function getAllJob (req,res) {
    try {
        const position = await jobModel.getAllJob()
        res.json(position)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//CREATE JOB
async function createJob(req,res) {
    const { jobdata } = req.body
    try {
        const position = await jobModel.createJob(jobdata)
        res.json(position)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//DELETE JOB
async function deleteJob (req,res) {
    const jobid = req.params.jobid
    try {
        const position = await jobModel.deleteJob(jobid)
        res.json(position)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//UPDATE JOB
async function updateJob (req,res) {
    const jobid = req.params.jobid
    const { jobdata } = req.body
    try {
        const position = await jobModel.updateJob(jobid,jobdata)
        res.json(position)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllJob,createJob,deleteJob,updateJob}