const employeeModel = require('../model/employeeModel')

//function to convert blob data from database to an image URL
const createImageUrl = (bufferData) => {
    // Convert the Buffer data to a Base64 string
    const base64String = Buffer.from(bufferData).toString('base64')
    // Create a data URL
    const imageUrl = `data:image/png;base64,${base64String}`
    return imageUrl
}

//SEND GENERATE PASSWORD MAIL TO EMPLOYEE
async function mailPasswordEmployee (req,res) {
    const employeeid = req.params.employeeid
    const { employeedata } = req.body
    try {
        const employee = await employeeModel.mailPasswordEmployee(employeeid,employeedata)
        res.json(employee)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//READ ALL EMPLOYEE
async function getAllEmployee (req,res) {
    try {
        const employee = await employeeModel.getAllEmployee()
        
        employee.forEach((employee) => {
            employee.staff_image = createImageUrl(employee.staff_image)
        })
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

module.exports = {getAllEmployee,createEmployee,deleteEmployee,updateEmployee,mailPasswordEmployee}