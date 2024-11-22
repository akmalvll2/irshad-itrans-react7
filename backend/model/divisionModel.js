const db = require('../config/db')

//READ ALL DIVISION
async function getAllDivision () {
    try {
        const [rows] = await db.query('SELECT * FROM division ORDER BY division.division_name')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE DIVISION
async function createDivision (divisiondata) {
    try {
        const [result] = await db.query('INSERT INTO division(division_name, division_description) VALUES (?,?)', [divisiondata.divisionname,divisiondata.divisiondescription])
        return result.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

//DELETE DIVISION
async function deleteDivision (divisionid) {
    try {
        const [result] = await db.query('DELETE FROM division WHERE division.division_id = ?', [divisionid])
        return "Division Deleted"
    } catch (error) {
        throw new Error(error.message)
    }
}

//UPDATE DIVISION
async function updateDivision (divisionid,divisiondata) {
    try {
        const [result] = await db.query('UPDATE division SET division.division_name = ? , division.division_description = ? WHERE division.division_id = ?', [divisiondata.divisionname,divisiondata.divisiondescription,divisionid])
        return "Division Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllDivision,createDivision,deleteDivision,updateDivision}