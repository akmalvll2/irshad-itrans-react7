//import dependencies
const express = require("express") 
const cors = require("cors") 
const session = require("express-session") 
const bcrypt = require("bcrypt") 
const nodemailer = require("nodemailer")

//import routes from route folder
const authRoute = require('./route/authRoute')
const companyRoute = require('./route/companyRoute')
const departmentRoute = require('./route/departmentRoute')
const jobRoute =  require('./route/jobRoute')
const competencyRoute = require('./route/competencyRoute')
const employeeRoute = require('./route/employeeRoute')
const clusterRoute = require('./route/clusterRoute')

//initialize to use .env ( process.env.YOUR_ENVIRONMENT_VARIABLE)
require('dotenv').config()

//initialization of application
const app = express()
const port = process.env.MYSQL_PORT || 3000
app.use(express.json())
app.use(cors())

//main application declaration
app.use('/authentication', authRoute)
app.use('/company', companyRoute)
app.use('/department', departmentRoute)
app.use('/job', jobRoute)
app.use('/competency', competencyRoute)
app.use('/employee', employeeRoute)
app.use('/cluster', clusterRoute)

//connecting port
app.listen(port, () => {
    console.log('Connected to backend')
})