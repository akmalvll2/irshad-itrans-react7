import React, { Suspense, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import axios from 'axios'

//path to userType component
import { userType } from 'src/userType'

// IMPORT COREUI COMPONENT
import { CRow, CCol } from '@coreui/react'

//path to API call IMPORTANT!
import packageJson from '../../../package.json'
const { config } = packageJson

//IMPORT COMPONENT
const DashboardInfo1 = React.lazy(() => import('./DashboardInfo1'))
const DashboardInfo2 = React.lazy(() => import('./DashboardInfo2'))

const Dashboard = () => {
  const [isChange, setIsChange] = useState(false)
  const [assessmentlist, setAssessmentlist] = useState([])
  const [employeelist, setEmployeelist] = useState([])
  const [departmentlist, setDepartmentlist] = useState([])
  const [competencylist, setCompetencylist] = useState([])
  const [traininglist, setTraininglist] = useState([])
  const [joblist, setJoblist] = useState([])

  useEffect(() => {
    //READ EMPLOYEE API
    const fetchAllEmployee = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/employee/getallemployee`)
        setEmployeelist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllEmployee()
  }, [isChange])
  useEffect(() => {
    //READ DEPARTMENT API
    const fetchAllDepartment = async () => {
      try {
        const response = await axios.get(
          `${config.REACT_APP_API_ENDPOINT}/department/getalldepartment`,
        )
        setDepartmentlist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllDepartment()
  }, [isChange])

  useEffect(() => {
    //READ COMPETENCY API
    const fetchAllCompetency = async () => {
      try {
        const response = await axios.get(
          `${config.REACT_APP_API_ENDPOINT}/competency/getallcompetency`,
        )
        setCompetencylist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllCompetency()
  }, [isChange])

  useEffect(() => {
    //READ TRAINING API
    const fetchAllTraining = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/training/getalltraining`)
        setTraininglist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllTraining()
  }, [isChange])

  useEffect(() => {
    //READ JOB API
    const fetchAllJob = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/job/getalljob`)
        setJoblist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllJob()
  }, [isChange])
  useEffect(() => {
    //READ ASSESSMENT API
    const fetchAllAssessment = async () => {
      try {
        const response = await axios.get(
          `${config.REACT_APP_API_ENDPOINT}/assessment/getallassessment`,
        )
        setAssessmentlist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllAssessment()
  }, [isChange])
  return (
    <>
      <CRow>
        <CCol>
          <DashboardInfo2
            employeelist={employeelist}
            departmentlist={departmentlist}
            competencylist={competencylist}
            traininglist={traininglist}
            joblist={joblist}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={6}>
          <DashboardInfo1 assessmentlist={assessmentlist} />
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
