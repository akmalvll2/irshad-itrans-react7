const companyModel = require('../model/companyModel')
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
            res.json({status: 'invalid', token: 'No token available'})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {adminAuthentication}