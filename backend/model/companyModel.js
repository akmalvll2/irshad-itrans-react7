const db = require('../config/db')
const bcrypt = require('bcrypt')

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
        const [rows] = await db.query('SELECT * FROM company WHERE company.company_admin_username = ?', [id])
        
        if (rows.length > 0) {
            const match = await new Promise((resolve, reject) => {
                bcrypt.compare(password, rows[0].company_admin_password, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            })
            
            if (match) {
                console.log('Passwords match!')
                return rows
            } else {
                console.log('Passwords do not match!')
                return rows.length === 0
            }
        } else {
            console.log('User not found!')
            return rows.length === 0
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllCompany,adminAuthentication}