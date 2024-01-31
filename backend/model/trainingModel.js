const db = require('../config/db')

//READ ALL TRAINING
async function getAllTraining () {
    try {
        const [rows] = await db.query('SELECT * FROM training ORDER BY training.training_name')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE TRAINING
async function createTraining (trainingdata) {
    try {
        const [result] = await db.query('INSERT INTO training(training_name,training_description,cluster_id) VALUES (?,?,?)', [
            trainingdata.trainingname,
            trainingdata.trainingdescription,
            trainingdata.clusterid,
        ])
        return result.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

//DELETE TRAINING
async function deleteTraining (trainingid) {
    try {
        const [result] = await db.query('DELETE FROM training WHERE training.training_id = ?', [trainingid])
        return "Training Deleted"
    } catch (error) {
        throw new Error(error.message)
    }
}

//UPDATE TRAINING
async function updateTraining (trainingid,trainingdata) {
    try {
        const [result] = await db.query('UPDATE training SET training.training_name = ? , training.training_description = ? , training.cluster_id = ? WHERE training.training_id = ?', [
            trainingdata.trainingname,
            trainingdata.trainingdescription,
            trainingdata.clusterid,
            trainingid,
        ])
        return "Training Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllTraining,createTraining,deleteTraining,updateTraining}