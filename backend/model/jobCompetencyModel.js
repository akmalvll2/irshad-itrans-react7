const db = require('../config/db')

//READ ALL JOB COMPETENCY
async function getAllJobCompetency () {
    try {
        const [rows] = await db.query('SELECT * FROM position_competency JOIN position ON position.position_id = position_competency.position_id JOIN competency ON competency.competency_id = position_competency.competency_id JOIN cluster ON cluster.cluster_id = competency.cluster_id ORDER BY position_competency.position_competency_id')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE JOB COMPETENCY
async function createJobCompetency (jobcompetencydata) {
    try {
        const [result] = await db.query('INSERT INTO position_competency(position_id, competency_id, position_competency_expected_level) VALUES (?,?,?)', [
            jobcompetencydata.positionid,
            jobcompetencydata.competencyid,
            jobcompetencydata.expectedlevel,
        ])
        return result.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

//DELETE JOB COMPETENCY
async function deleteJobCompetency (jobcompetencyid) {
    try {
        const [result] = await db.query('DELETE FROM position_competency WHERE position_competency.position_competency_id = ?', [jobcompetencyid])
        return "Mapping Deleted"
    } catch (error) {
        throw new Error(error.message)
    }
}

//UPDATE JOB COMPETENCY
async function updateJobCompetency (jobcompetencyid,jobcompetencydata) {
    try {
        const [result] = await db.query('UPDATE position_competency SET position_competency.position_id = ? , position_competency.competency_id = ?, position_competency.position_competency_expected_level = ? WHERE position_competency.position_competency_id = ?', [
            jobcompetencydata.positionid,
            jobcompetencydata.competencyid,
            jobcompetencydata.expectedlevel,
            jobcompetencyid,
        ])
        return "Mapping Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllJobCompetency,createJobCompetency,deleteJobCompetency,updateJobCompetency}