const assessorModel = require('../model/assessorModel')

//READ ALL ASSESSOR
async function getAllAssessor (req,res) {
    try {
        const assessor = await assessorModel.getAllAssessor()
        res.json(assessor)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//CREATE ASSESSOR
async function createAssessor (req,res) {
    const { assessordata } = req.body
    try {
        const assessor = await assessorModel.createAssessor(assessordata)
        res.json(assessor)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//DELETE ASSESSOR
async function deleteAssessor (req,res) {
    const staffassessorid = req.params.staffassessorid
    try {
        const assessor = await assessorModel.deleteAssessor(staffassessorid)
        res.json(assessor)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//UPDATE ASSESSOR
async function updateAssessor (req,res) {
    const staffassessorid = req.params.staffassessorid
    const { assessordata } = req.body
    try {
        const assessor = await assessorModel.updateAssessor(staffassessorid,assessordata)
        res.json(assessor)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllAssessor,createAssessor,deleteAssessor,updateAssessor}