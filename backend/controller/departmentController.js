const departmentModel = require('../model/departmentModel')

//READ ALL DEPARTMENT
async function getAllDepartment (req,res) {
    try {
        const department = await departmentModel.getAllDepartment()
        res.json(department)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//CREATE DEPARTMENT
async function createDepartment (req,res) {
    const { departmentname, departmentdescription } = req.body
    try {
        const department = await departmentModel.createDepartment(departmentname, departmentdescription)
        res.json(department)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//DELETE DEPARTMENT
async function deleteDepartment (req,res) {
    const departmentid = req.params.departmentid
    try {
        const department = await departmentModel.deleteDepartment(departmentid)
        res.json(department)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllDepartment,createDepartment,deleteDepartment}