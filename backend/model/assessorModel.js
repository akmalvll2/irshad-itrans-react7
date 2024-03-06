const db = require('../config/db')

//READ ALL ASSESSOR
async function getAllAssessor () {
    try {
        const [rows] = await db.query('SELECT * FROM staff_assessor ORDER BY staff_assessor.staff_id')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE ASSESSOR
async function createAssessor (assessordata) {
    try {
        const [result] = await db.query('INSERT INTO staff_assessor(staff_id, assessor_id, staff_assessor_type) VALUES (?,?,?)', [assessordata.staffid, assessordata.assessorid, assessordata.assessortype])
        return result.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

//DELETE ASSESSOR
async function deleteAssessor (staffassessorid) {
    try {
        const [result] = await db.query('DELETE FROM staff_assessor WHERE staff_assessor.staff_assessor_id = ?', [staffassessorid])
        return "Assessor Deleted"
    } catch (error) {
        throw new Error(error.message)
    }
}

//UPDATE ASSESSOR
async function updateAssessor (staffassessorid,assessordata) {
    try {
        const [result] = await db.query('UPDATE staff_assessor SET staff_assessor.staff_id = ? , staff_assessor.assessor_id = ? , staff_assessor.staff_assessor_type = ? WHERE staff_assessor.staff_assessor_id = ?', [assessordata.staffid, assessordata.assessorid, assessordata.assessortype, staffassessorid])
        return "Assessor Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllAssessor,createAssessor,deleteAssessor,updateAssessor}