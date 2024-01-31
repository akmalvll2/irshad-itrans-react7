const jobCompetencyModel = require('../model/jobCompetencyModel')

//READ ALL JOB COMPETENCY
async function getAllJobCompetency (req,res) {
    try {
        const jobcompetency = await jobCompetencyModel.getAllJobCompetency()
        res.json(jobcompetency)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//CREATE JOB COMPETENCY
async function createJobCompetency (req,res) {
    const { jobcompetencydata } = req.body
    try {
        const jobcompetency = await jobCompetencyModel.createJobCompetency(jobcompetencydata)
        res.json(jobcompetency)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//DELETE JOB COMPETENCY
async function deleteJobCompetency (req,res) {
    const jobcompetencyid = req.params.jobcompetencyid
    try {
        const jobcompetency = await jobCompetencyModel.deleteJobCompetency(jobcompetencyid)
        res.json(jobcompetency)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//UPDATE JOB COMPETENCY
async function updateJobCompetency (req,res) {
    const jobcompetencyid = req.params.jobcompetencyid
    const { jobcompetencydata } = req.body
    try {
        const jobcompetency = await jobCompetencyModel.updateJobCompetency(jobcompetencyid,jobcompetencydata)
        res.json(jobcompetency)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllJobCompetency,createJobCompetency,deleteJobCompetency,updateJobCompetency}