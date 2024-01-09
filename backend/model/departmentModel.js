const db = require('../config/db')

//READ ALL DEPARTMENT
async function getAllDepartment () {
    try {
        const [rows] = await db.query('SELECT * FROM department ORDER BY department.department_name')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE DEPARTMENT
async function createDepartment (departmentname, departmentdescription) {
    try {
        const [result] = await db.query('INSERT INTO department(department_name, department_description) VALUES (?,?)', [departmentname,departmentdescription])
        return result.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

//DELETE DEPARTMENT
async function deleteDepartment (departmentid) {
    try {
        const [result] = await db.query('DELETE FROM department WHERE department.department_id = ?', [departmentid])
        return "Department Deleted"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllDepartment,createDepartment,deleteDepartment}