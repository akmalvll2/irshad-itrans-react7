import React, { useState, useEffect } from 'react'
import axios from 'axios'
//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

//IMPORT COMPONENT
const IdpTable1 = React.lazy(() => import('./IdpTable1'))

const Idp = () => {
  // SETTING INITIALIZE
  const [isChange, setIsChange] = useState(false)
  // DATABASE DATA ARRAY
  const [stafflist, setStaffList] = useState([])
  const [departmentlist, setDepartmentlist] = useState([])
  const [jobcompetency, setjobcompetency] = useState([])
  const [assessmentlist, setassessmentlist] = useState([])
  const [assessmentresult, setassessmentresult] = useState([])
  useEffect(() => {
    //READ EMPLOYEE API
    const fetchAllEmployee = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/employee/getallemployee`)
        setStaffList(response.data)
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
    //READ JOB COMPETENCY API
    const fetchAllJobCompetency = async () => {
      try {
        const response = await axios.get(
          `${config.REACT_APP_API_ENDPOINT}/jobcompetency/getalljobcompetency`,
        )
        setjobcompetency(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllJobCompetency()
  }, [isChange])

  useEffect(() => {
    //READ ASSESSMENT API
    const fetchAllAssessment = async () => {
      try {
        const response = await axios.get(
          `${config.REACT_APP_API_ENDPOINT}/assessment/getallassessment`,
        )
        setassessmentlist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllAssessment()
  }, [isChange])

  useEffect(() => {
    //READ ASSESSMENT RESULT API
    const fetchAllAssessmentResult = async () => {
      try {
        const response = await axios.get(
          `${config.REACT_APP_API_ENDPOINT}/assessmentresult/getallassessmentresult`,
        )
        setassessmentresult(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllAssessmentResult()
  }, [isChange])
  return (
    <>
      <IdpTable1
        stafflist={stafflist}
        departmentlist={departmentlist}
        jobcompetency={jobcompetency}
        assessmentlist={assessmentlist}
        assessmentresult={assessmentresult}
      />
    </>
  )
}

export default Idp
