const db = require('../config/db')

//READ ALL ASSESSMENT RESULT
async function getAllAssessmentResult () {
    try {
        const [rows] = await db.query('SELECT * FROM assessment_result JOIN assessment ON assessment.assessment_id = assessment_result.assessment_id JOIN competency ON competency.competency_id = assessment_result.competency_id JOIN staff_assessor ON staff_assessor.staff_assessor_id = assessment_result.staff_assessor_id JOIN cluster ON cluster.cluster_id = competency.cluster_id')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE ASSESSMENT RESULT
async function createAssessmentResult (assessmentresultdata) {
    console.log(assessmentresultdata)
    try {
        const [result] = await db.query('INSERT INTO assessment_result(staff_assessor_id, competency_id, indicator_id, assessment_result_score, assessment_result_gap, assessment_result_message, assessment_id) VALUES (?,?,?,?,?,?,?)', [
            assessmentresultdata.staffassessorid,
            assessmentresultdata.competencyid,
            assessmentresultdata.indicatorid,
            assessmentresultdata.assessmentresultscore,
            assessmentresultdata.assessmentresultgap,
            assessmentresultdata.assessmentresultmessage,
            assessmentresultdata.assessmentid,
        ])
        return result.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

//DELETE ASSESSMENT RESULT
async function deleteAssessmentResult (assessmentresultid) {
    try {
        const [result] = await db.query('DELETE FROM assessment_result WHERE assessment_result.assessment_result_id = ?', [assessmentresultid])
        return "Assessment Result Deleted"
    } catch (error) {
        throw new Error(error.message)
    }
}

//UPDATE ASSESSMENT RESULT
async function updateAssessmentResult (assessmentresultid,assessmentresultdata) {
    try {
        const [result] = await db.query('UPDATE assessment_result SET staff_assessor_id = ? , competency_id = ?, assessment_result_score = ?, assessment_result_gap = ?, assessment_result_message = ?, assessment_result_date = ?, assessment_id = ? WHERE assessment_result_id = ?', [
            assessmentresultdata.staffassessorid,
            assessmentresultdata.competencyid,
            assessmentresultdata.assessmentresultscore,
            assessmentresultdata.assessmentresultgap,
            assessmentresultdata.assessmentresultmessage,
            assessmentresultdata.assessmentresultdate,
            assessmentresultdata.assessmentid,
            assessmentresultid,
        ])
        return "Assessment Result Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllAssessmentResult,createAssessmentResult,deleteAssessmentResult,updateAssessmentResult}