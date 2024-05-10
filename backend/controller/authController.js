const companyModel = require('../model/companyModel')
const employeeModel = require('../model/employeeModel')
const jwt = require('jsonwebtoken')

//function to request admin authentication from company table
async function adminAuthentication (req,res) {
    const { password , id } = req.body
    try {
        const admin = await companyModel.adminAuthentication(id,password)
        if (admin.length > 0) {
            const token = jwt.sign({id: admin[0]?.company_admin_username, name: admin[0]?.company_admin_name, role: admin[0]?.company_admin_role}, 'irshadhrconsultingkey')
            res.json({status: 'valid', token: token})
        } else {
            res.json({status: 'invalid', token: 'No token available', message: 'Wrong username or password'})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function userAuthentication (req,res) {
    const { password , id } = req.body
    try {
        const user = await employeeModel.userAuthentication(id,password)
        if (user.length > 0) {
            const token = jwt.sign({id: user[0]?.staff_id.toString(), name: user[0]?.staff_name, role: user[0]?.staff_role}, 'irshadhrconsultingkey')
            res.json({status: 'valid', token: token})
        } else {
            res.json({status: 'invalid', token: 'No token available', message: 'Wrong username or password'})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {adminAuthentication,userAuthentication}