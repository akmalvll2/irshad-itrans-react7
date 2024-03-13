const assessmentResultModel = require('../model/assessmentResultModel')

//READ ALL ASSESSMENT RESULT
async function getAllAssessmentResult (req,res) {
    try {
        const assessmentresult = await assessmentResultModel.getAllAssessmentResult()
        res.json(assessmentresult)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//CREATE ASSESSMENT RESULT
async function createAssessmentResult (req,res) {
    const { assessmentresultdata } = req.body
    try {
        const assessmentresult = await assessmentResultModel.createAssessmentResult(assessmentresultdata)
        res.json(assessmentresult)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//DELETE ASSESSMENT RESULT
async function deleteAssessmentResult (req,res) {
    const assessmentresultid = req.params.assessmentresultid
    try {
        const assessmentresult = await assessmentResultModel.deleteAssessmentResult(assessmentresultid)
        res.json(assessmentresult)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//UPDATE ASSESSMENT RESULT
async function updateAssessmentResult (req,res) {
    const assessmentresultid = req.params.assessmentresultid
    const { assessmentresultdata } = req.body
    try {
        const assessmentresult = await assessmentResultModel.updateAssessmentResult(assessmentresultid,assessmentresultdata)
        res.json(assessmentresult)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllAssessmentResult,createAssessmentResult,deleteAssessmentResult,updateAssessmentResult}