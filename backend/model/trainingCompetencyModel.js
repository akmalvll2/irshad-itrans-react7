const db = require('../config/db')

//READ ALL TRAINING COMPETENCY
async function getAllTrainingCompetency () {
    try {
        const [rows] = await db.query('SELECT * FROM `training_competency` JOIN training ON training.training_id = training_competency.training_id JOIN competency ON competency.competency_id = training_competency.competency_id')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE TRAINING COMPETENCY
async function createTrainingCompetency (trainingcompetencydata) {
    try {
        console.log(trainingcompetencydata)
        const [result] = await db.query('INSERT INTO `training_competency` (competency_id, training_id, training_competency_level) VALUES (?,?,?)', [
            trainingcompetencydata[0].competencyid,
            trainingcompetencydata[0].trainingid,
            trainingcompetencydata[0].relevantlevel,
        ])
        return result.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

//DELETE TRAINING COMPETENCY
async function deleteTrainingCompetency (trainingcompetencyid) {
    try {
        const [result] = await db.query('DELETE FROM `training_competency` WHERE training_competency.training_competency_id = ?', [trainingcompetencyid])
        return "Mapping Deleted"
    } catch (error) {
        throw new Error(error.message)
    }
}

//UPDATE TRAINING COMPETENCY
async function updateTrainingCompetency (trainingcompetencyid,trainingcompetencydata) {
    try {
        const [result] = await db.query('UPDATE `training_competency` SET training_competency.competency_id = ?, training_competency.training_id = ?  WHERE training_competency.training_competency_id = ?', [
            trainingcompetencydata.competencyid,
            trainingcompetencydata.trainingid,
            trainingcompetencyid,
        ])
        return "Mapping Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllTrainingCompetency,createTrainingCompetency,deleteTrainingCompetency,updateTrainingCompetency}