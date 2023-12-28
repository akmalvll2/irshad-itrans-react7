const db = require('../config/db')

//function to run company table READ ALL query
async function getAllCompany () {
    try {
        const [rows] = await db.query('SELECT * FROM company')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//function to run admin AUTHENTICATION query
async function adminAuthentication (id,password) {
    try {
        const [rows] = await db.query('SELECT * FROM company WHERE company.company_admin_username = ? AND company.company_admin_password = ?', [id,password])
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllCompany,adminAuthentication}