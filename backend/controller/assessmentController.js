const assessmentModel = require('../model/assessmentModel')

//READ ALL ASSESSMENT
async function getAllAssessment (req,res) {
    try {
        const assessment = await assessmentModel.getAllAssessment()
        res.json(assessment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//CREATE ASSESSMENT
async function createAssessment (req,res) {
    const { assessmentdata } = req.body
    try {
        const assessment = await assessmentModel.createAssessment(assessmentdata)
        res.json(assessment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//DELETE ASSESSMENT
async function deleteAssessment (req,res) {
    const assessmentid = req.params.assessmentid
    try {
        const assessment = await assessmentModel.deleteAssessment(assessmentid)
        res.json(assessment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//UPDATE ASSESSMENT
async function updateAssessment (req,res) {
    const assessmentid = req.params.assessmentid
    const { assessmentdata } = req.body
    try {
        const assessment = await assessmentModel.updateAssessment(assessmentid,assessmentdata)
        res.json(assessment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllAssessment,createAssessment,deleteAssessment,updateAssessment}