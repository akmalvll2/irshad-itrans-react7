const db = require('../config/db')

//READ ALL ASSESSMENT
async function getAllAssessment () {
    try {
        const [rows] = await db.query('SELECT * FROM assessment ORDER BY assessment.assessment_name')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE ASSESSMENT
async function createAssessment(assessmentdata) {
    try {
        const [result] = await db.query('INSERT INTO assessment(assessment_name, assessment_start_date, assessment_end_date, assessment_type) VALUES (?,?,?,?)', [assessmentdata.assessmentname,assessmentdata.assessmentstartdate,assessmentdata.assessmentenddate, assessmentdata.assessmenttype])
        return result.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

//DELETE ASSESSMENT
async function deleteAssessment (assessmentid) {
    try {
        const [result] = await db.query('DELETE FROM assessment WHERE assessment.assessment_id = ?', [assessmentid])
        return "Assessment Deleted"
    } catch (error) {
        throw new Error(error.message)
    }
}

//UPDATE ASSESSMENT
async function updateAssessment (assessmentid,assessmentdata) {
    try {
        const [result] = await db.query('UPDATE assessment SET assessment.assessment_name = ? , assessment.assessment_start_date = ? , assessment.assessment_end_date = ? WHERE assessment.assessment_id = ?', [assessmentdata.assessmentname,assessmentdata.assessmentstartdate,assessmentdata.assessmentenddate,assessmentid])
        return "Assessment Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllAssessment,createAssessment,deleteAssessment,updateAssessment}