const db = require('../config/db')

//READ ALL JOB
async function getAllJob () {
    try {
        const [rows] = await db.query('SELECT * FROM `position` ORDER BY position.position_name')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE JOB
async function createJob (jobdata) {
    try {
        const [result] = await db.query('INSERT INTO `position` (position_name,position_grade,position_description) VALUES (?,?,?)', [jobdata.jobname,jobdata.jobgrade,jobdata.jobdescription])
        return result.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

//DELETE JOB
async function deleteJob (jobid) {
    try {
        const [result] = await db.query('DELETE FROM `position` WHERE position.position_id = ?', [jobid])
        return "Position Deleted"
    } catch (error) {
        throw new Error(error.message)
    }
}

//UPDATE JOB
async function updateJob (jobid,jobdata) {
    try {
        const [result] = await db.query('UPDATE `position` SET position.position_name = ? , position.position_grade = ?, position.position_description = ? WHERE position.position_id = ?', [jobdata.jobname,jobdata.jobgrade,jobdata.jobdescription,jobid])
        return "Position Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllJob,createJob,deleteJob,updateJob}