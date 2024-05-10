const trainingCompetencyModel = require('../model/trainingCompetencyModel')

//READ ALL TRAINING COMPETENCY
async function getAllTrainingCompetency (req,res) {
    try {
        const trainingCompetency = await trainingCompetencyModel.getAllTrainingCompetency()
        res.json(trainingCompetency)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//CREATE TRAINING COMPETENCY
async function createTrainingCompetency(req,res) {
    const { trainingcompetencydata } = req.body
    try {
        const trainingCompetency = await trainingCompetencyModel.createTrainingCompetency(trainingcompetencydata)
        res.json(trainingCompetency)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//DELETE TRAINING COMPETENCY
async function deleteTrainingCompetency (req,res) {
    const trainingcompetencyid = req.params.trainingcompetencyid
    try {
        const trainingCompetency = await trainingCompetencyModel.deleteTrainingCompetency(trainingcompetencyid)
        res.json(trainingCompetency)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//UPDATE TRAINING COMPETENCY
async function updateTrainingCompetency (req,res) {
    const trainingcompetencyid = req.params.trainingcompetencyid
    const { trainingcompetencydata } = req.body
    try {
        const trainingCompetency = await trainingCompetencyModel.updateTrainingCompetency(trainingcompetencyid,trainingcompetencydata)
        res.json(trainingCompetency)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllTrainingCompetency,createTrainingCompetency,deleteTrainingCompetency,updateTrainingCompetency}