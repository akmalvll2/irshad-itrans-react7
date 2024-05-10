//import dependencies
const express = require("express") 
const cors = require("cors") 
const session = require("express-session") 
const bcrypt = require("bcrypt") 
const nodemailer = require("nodemailer")
const bodyparser = require("body-parser")

//import routes from route folder
const authRoute = require('./route/authRoute')
const companyRoute = require('./route/companyRoute')
const departmentRoute = require('./route/departmentRoute')
const jobRoute =  require('./route/jobRoute')
const competencyRoute = require('./route/competencyRoute')
const trainingRoute = require('./route/trainingRoute')
const employeeRoute = require('./route/employeeRoute')
const clusterRoute = require('./route/clusterRoute')
const jobCompetencyRoute = require('./route/jobCompetencyRoute')
const assessmentRoute = require('./route/assessmentRoute')
const assessorRoute = require('./route/assessorRoute')
const assessmentResultRoute = require('./route/assessmentResultRoute')
const indicatorRoute = require('./route/indicatorRoute')
const trainingCompetencyRoute = require('./route/trainingCompetencyRoute')

//initialize to use .env ( process.env.YOUR_ENVIRONMENT_VARIABLE)
require('dotenv').config()

//initialization of application
const app = express()
const port = process.env.MYSQL_PORT || 3000
app.use(cors())
app.use(express.json({ limit: '90mb' }))

//main application declaration
app.get('/', (req,res) => {
    res.json('Connected to ITRANS')
})
app.use('/authentication', authRoute)
app.use('/company', companyRoute)
app.use('/department', departmentRoute)
app.use('/job', jobRoute)
app.use('/competency', competencyRoute)
app.use('/training', trainingRoute)
app.use('/employee', employeeRoute)
app.use('/cluster', clusterRoute)
app.use('/jobcompetency', jobCompetencyRoute)
app.use('/assessment', assessmentRoute)
app.use('/assessor', assessorRoute)
app.use('/assessmentresult', assessmentResultRoute)
app.use('/indicator', indicatorRoute)
app.use('/trainingcompetency', trainingCompetencyRoute)

//connecting port
app.listen(port, () => {
    console.log('Connected to backend')
})