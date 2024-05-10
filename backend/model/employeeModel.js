const db = require('../config/db')
const bcrypt = require('bcrypt')
const mail = require('../config/mailConfig')

//FUNCTION TO CREATE RANDOM PASSWORD
const createPassword = async () => {
    var length = 8,
    charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz",
    password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password
}

//FUNCTION TO CHANGE PASSWORD TO HASHED 
const hashPassword = async (password) => {
    const salt = 10
    password = await bcrypt.hash(password,salt)
    return password
}

//FUNCTION TO CHANGE HASHED TO PASSWORD

//FUNCTION TO CONVERT DATA URL BACK TO IMAGE DATA
const splitBase64 = async (imageUrl) => {
    // Split the Data URL
    const base64Data = imageUrl.split(",")[1];
    // Convert the Base64 string back to a Buffer
    const bufferData = Buffer.from(base64Data, 'base64');
    return bufferData;
}

//SEND GENERATE PASSWORD MAIL TO EMPLOYEE
async function mailPasswordEmployee(employeeid,employeedata) {
    try {
        const password = await createPassword()
        const hashedpassword = await hashPassword(password)
        const [result] = await db.query('UPDATE staff SET staff.staff_password = ? WHERE staff.staff_id = ?', [
            hashedpassword,
            employeeid,
        ])
        mail.sendEmail(
            employeedata.staff_email,
            '',
            'Dev: ITRANS GENERATED PASSWORD NOTIFICATION',
            `
                <h4>Integrated Training Need Analysis System</h4>
                <p style="color: red">This email are generated only for testing purposes. If you receive this email, please remove or ignore.</p>
                <h4>This is your login information</h4>
                <div>
                    Name : ${employeedata.staff_name} <br />
                    ID : ${employeedata.staff_id_number} <br />
                    Password : ${password} <br />
                    Link : http://localhost:3000
                </div>
            `)
        return "Employee Password Generated and Sent"
    } catch (error) {
        console.log('Error sending email')
        throw new Error(error.message)
    }
}

//READ ALL EMPLOYEE
async function getAllEmployee() {
    try {
        const [rows] = await db.query('SELECT * FROM staff JOIN department ON department.department_id = staff.department_id JOIN position ON position.position_id = staff.position_id ORDER BY staff.staff_name')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE EMPLOYEE
async function createEmployee(employeedata) {
    console.log(employeedata)
    try {
        const password = await createPassword()
        employeedata.employeepassword = await hashPassword(password)
        employeedata.employeeimage = await splitBase64(employeedata.employeeimage)
        const [result] = await db.query('INSERT INTO staff(staff_name,staff_email,department_id,position_id,manager_id,staff_role,staff_password,staff_organization_register,staff_id_number,staff_image) VALUES (?,?,?,?,?,?,?,?,?,?)', [
            employeedata.employeename,
            employeedata.employeeemail,
            employeedata.departmentid,
            employeedata.positionid,
            employeedata.managerid,
            employeedata.employeerole,
            employeedata.employeepassword,
            employeedata.employeejoindate,
            employeedata.employeeid,
            employeedata.employeeimage,
        ])
        if (employeedata.employeesendmail === 'true') {
            mail.sendEmail(
                employeedata.employeeemail,
                '',
                'ITrans Generated Password',
                `
                    <h4>Integrated Training Need Analysis System</h4>
                    <h5>This is your login information</h5>
                    <div>
                        ID : ${employeedata.employeeid} <br />
                        Password : ${password} <br />
                        Link : http://localhost:3000
                    </div>
                `)
        }
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
        employeedata.employeeimage = await splitBase64(employeedata.employeeimage)
        const [result] = await db.query('UPDATE staff SET staff.staff_name = ?, staff.staff_email = ?, staff.department_id = ?, staff.position_id = ?, staff.manager_id = ?, staff.staff_role = ?, staff.staff_organization_register = ?, staff.staff_id_number = ?, staff.staff_image = ? WHERE staff.staff_id = ?', [
            employeedata.employeename,
            employeedata.employeeemail,
            employeedata.departmentid,
            employeedata.positionid,
            employeedata.managerid,
            employeedata.employeerole,
            employeedata.employeejoindate,
            employeedata.employeeidnumber,
            employeedata.employeeimage,
            employeeid,
        ])
        return "Employee Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

//function to run user AUTHENTICATION query
async function userAuthentication(id, password) {
    try {
        const [rows] = await db.query('SELECT * FROM staff WHERE staff.staff_id_number = ?', [id]);

        if (rows.length > 0) {
            const match = await new Promise((resolve, reject) => {
                bcrypt.compare(password, rows[0].staff_password, (err, result) => {
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

module.exports = {getAllEmployee,createEmployee,deleteEmployee,updateEmployee,userAuthentication,mailPasswordEmployee}