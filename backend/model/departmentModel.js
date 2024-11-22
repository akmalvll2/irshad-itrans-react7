const db = require('../config/db')

//READ ALL DEPARTMENT
async function getAllDepartment () {
    try {
        const [rows] = await db.query('SELECT * FROM department JOIN division ON division.division_id = department.division_id ORDER BY department.department_name')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE DEPARTMENT
async function createDepartment (departmentdata) {
    try {
        const [result] = await db.query('INSERT INTO department(department_name, department_description, division_id) VALUES (?,?,?)', [departmentdata.departmentname,departmentdata.departmentdescription,departmentdata.divisionid])
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

//UPDATE DEPARTMENT
async function updateDepartment (departmentid,departmentdata) {
    try {
        const [result] = await db.query('UPDATE department SET department.department_name = ? , department.department_description = ? WHERE department.department_id = ?', [departmentdata.departmentname,departmentdata.departmentdescription,departmentid])
        return "Department Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllDepartment,createDepartment,deleteDepartment,updateDepartment}