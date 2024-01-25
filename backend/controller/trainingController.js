const trainingModel = require('../model/trainingModel')

//READ ALL TRAINING
async function getAllTraining (req,res) {
    try {
        const training = await trainingModel.getAllTraining()
        res.json(training)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//CREATE TRAINING
async function createTraining (req,res) {
    const { trainingdata } = req.body
    try {
        const training = await trainingModel.createTraining(trainingdata)
        res.json(training)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//DELETE TRAINING
async function deleteTraining (req,res) {
    const trainingid = req.params.trainingid
    try {
        const training = await trainingModel.deleteTraining(trainingid)
        res.json(training)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//UPDATE TRAINING
async function updatedTraining (req,res) {
    const trainingid = req.params.trainingid
    const { trainingdata } = req.body
    try {
        const training = await trainingModel.updateTraining(trainingid,trainingdata)
        res.json(training)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllTraining,createTraining,deleteTraining,updatedTraining}