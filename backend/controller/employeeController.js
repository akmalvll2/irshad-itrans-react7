const employeeModel = require('../model/employeeModel')

//READ ALL EMPLOYEE
async function getAllEmployee (req,res) {
    try {
        const employee = await employeeModel.getAllEmployee()
        res.json(employee)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//CREATE EMPLOYEE
async function createEmployee (req,res) {
    const { employeedata } = req.body
    try {
        const employee = await employeeModel.createEmployee(employeedata)
        res.json(employee)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//DELETE EMPLOYEE
async function deleteEmployee (req,res) {
    const employeeid = req.params.employeeid
    try {
        const employee = await employeeModel.deleteEmployee(employeeid)
        res.json(employee)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//UPDATE EMPLOYEE
async function updateEmployee (req,res) {
    const employeeid = req.params.employeeid
    const { employeedata } = req.body
    try {
        const employee = await employeeModel.updateEmployee(employeeid,employeedata)
        res.json(employee)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllEmployee,createEmployee,deleteEmployee,updateEmployee}