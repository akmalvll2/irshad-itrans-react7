const db = require('../config/db')

//READ ALL EMPLOYEE
async function getAllEmployee() {
    try {
        const [rows] = await db.query('SELECT * FROM staff ORDER BY staff.staff_name')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE EMPLOYEE
async function createEmployee(employeedata) {
    try {
        const [result] = await db.query('INSERT INTO staff(staff_name,staff_email,department_id,position_id,manager_id,staff_role,staff_password,staff_organization_register,staff_id_number) VALUES (?,?,?,?,?,?,?,?,?)', [
            employeedata.employeename,
            employeedata.employeeemail,
            employeedata.departmentid,
            employeedata.positionid,
            employeedata.managerid,
            employeedata.employeerole,
            employeedata.employeepassword,
            employeedata.employeejoindate,
            employeedata.employeeid,
        ])
        return result.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

//DELETE EMPLOYEE
async function deleteEmployee(employeeid) {
    try {
        const [result] = await db.query('DELETE FROM staff WHERE staff.staff_id = ?', [employeeid])
        return "Employee Deleted"
    } catch (error) {
        throw new Error(error.message)
    }
}

//UPDATE EMPLOYEE
async function updateEmployee(employeeid,employeedata) {
    try {
        const [result] = await db.query('UPDATE staff SET staff.staff_name = ?, staff.staff_email = ?, staff.department_id = ?, staff.position_id = ?, staff.manager_id = ?, staff.staff_role = ?, staff.staff_organization_register = ?, staff.staff_id_number = ? WHERE staff.staff_id = ?', [
            employeedata.employeename,
            employeedata.employeeemail,
            employeedata.departmentid,
            employeedata.positionid,
            employeedata.managerid,
            employeedata.employeerole,
            employeedata.employeejoindate,
            employeedata.employeeid,
            employeeid,
        ])
        return "Employee Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllEmployee,createEmployee,deleteEmployee,updateEmployee}