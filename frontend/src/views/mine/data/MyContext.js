import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

const MyContext = createContext()

export const MyProvider = ({ children }) => {
  const [company, setCompany] = useState([])
  const [staff, setStaff] = useState([])
  const [department, setDepartment] = useState([])
  const [division, setDivision] = useState([])
  const [position, setPosition] = useState([])
  const [competency, setCompetency] = useState([])
  const [indicator, setIndicator] = useState([])
  const [training, setTraining] = useState([])
  const [cluster, setCluster] = useState([])
  const [assessment, setAssessment] = useState([])
  const [assessmentResult, setAssessmentResult] = useState([])
  const [positionCompetency, setPositionCompetency] = useState([])
  const [competencyTraining, setCompetencyTraining] = useState([])
  const [staffAssessor, setStaffAssessor] = useState([])
  const [loading, setLoading] = useState({
    company: true,
    staff: true,
    department: true,
    division: true,
    position: true,
    competency: true,
    indicator: true,
    cluster: true,
    training: true,
    assessment: true,
    assessmentResult: true,
    positionCompetency: true,
    competencyTraining: true,
    staffAssessor: true,
  })

  // .........COMPANY.......
  const fetchCompany = async () => {
    try {
      const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/company/getallcompany`)
      setCompany(response.data)
    } catch (error) {
      console.log('Error: '.error)
    } finally {
      setLoading((prev) => ({ ...prev, company: false }))
    }
  }

  // .........STAFF.........
  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/employee/getallemployee`)
      setStaff(response.data)
    } catch (error) {
      console.log('Error: '.error)
    } finally {
      setLoading((prev) => ({ ...prev, staff: false }))
    }
  }

  // CREATE STAFF (employeename, employeeemail, departmentid, positionid, managerid, employeerole, employeepassword, employeejoindate, employeeid, employeeimage)
  const createStaff = async (employeedata) => {
    try {
      await axios.post(`${config.REACT_APP_API_ENDPOINT}/employee/createemployee`, {
        employeedata: employeedata,
      })
    } catch (error) {
      console.log('Error: '.error)
    } finally {
      setLoading((prev) => ({ ...prev, staff: false }))
    }
  }

  // UPDATE STAFF (employeeid, employeename, employeeemail, employeeimage, departmentid, positionid, managerid, employeerole, employeeidnumber, employeejoindate)
  const updateStaff = async (employeedata) => {
    try {
      await axios.put(
        `${config.REACT_APP_API_ENDPOINT}/employee/updateemployee/${employeedata.employeeid}`,
        {
          employeedata: employeedata,
        },
      )
    } catch (err) {
      console.log(err)
    } finally {
      setLoading((prev) => ({ ...prev, staff: false }))
    }
  }

  const fetchStaffAssessor = async () => {
    try {
      const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/assessor/getallassessor`)
      setStaffAssessor(response.data)
    } catch (error) {
      console.log('Error: '.error)
    } finally {
      setLoading((prev) => ({ ...prev, staffAssessor: false }))
    }
  }

  // ........POSITION..........
  const fetchPosition = async () => {
    try {
      const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/job/getalljob`)
      setPosition(response.data)
    } catch (error) {
      console.log('Error: '.error)
    } finally {
      setLoading((prev) => ({ ...prev, position: false }))
    }
  }

  // .......DEPARTMENT..........
  const fetchDepartment = async () => {
    try {
      const response = await axios.get(
        `${config.REACT_APP_API_ENDPOINT}/department/getalldepartment`,
      )
      setDepartment(response.data)
    } catch (error) {
      console.log('Error: '.error)
    } finally {
      setLoading((prev) => ({ ...prev, department: false }))
    }
  }

  // ........DIVISION.............
  const fetchDivision = async () => {
    try {
      const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/division/getalldivision`)
      setDivision(response.data)
    } catch (error) {
      console.log('Error: '.error)
    } finally {
      setLoading((prev) => ({ ...prev, division: false }))
    }
  }

  // ........COMPETENCY...........
  const fetchCompetency = async () => {
    try {
      const response = await axios.get(
        `${config.REACT_APP_API_ENDPOINT}/competency/getallcompetency`,
      )
      setCompetency(response.data)
    } catch (error) {
      console.log('Error: '.error)
    } finally {
      setLoading((prev) => ({ ...prev, competency: false }))
    }
  }

  const fetchIndicator = async () => {
    try {
      const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/indicator/getallindicator`)
      setIndicator(response.data)
    } catch (error) {
      console.log('Error:'.error)
    } finally {
      setLoading((prev) => ({ ...prev, competency: false }))
    }
  }

  // ...........TRAINING.........
  const fetchTraining = async () => {
    try {
      const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/training/getalltraining`)
      setTraining(response.data)
    } catch (error) {
      console.log('Error:'.error)
    } finally {
      setLoading((prev) => ({ ...prev, training: false }))
    }
  }

  // .....CLUSTER.......
  const fetchCluster = async () => {
    try {
      const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/cluster/getallcluster`)
      setCluster(response.data)
    } catch (error) {
      console.log('Error: '.error)
    } finally {
      setLoading((prev) => ({ ...prev, cluster: false }))
    }
  }

  // ........ASSESSMENT..........
  const fetchAssessment = async () => {
    try {
      const response = await axios.get(
        `${config.REACT_APP_API_ENDPOINT}/assessment/getallassessment`,
      )
      setAssessment(response.data)
    } catch (error) {
      console.log('Error: '.error)
    } finally {
      setLoading((prev) => ({ ...prev, assessment: false }))
    }
  }

  const fetchAssessmentResult = async () => {
    try {
      const response = await axios.get(
        `${config.REACT_APP_API_ENDPOINT}/assessmentresult/getallassessmentresult`,
      )
      setAssessmentResult(response.data)
    } catch (error) {
      console.log('Error: '.error)
    } finally {
      setLoading((prev) => ({ ...prev, assessmentResult: false }))
    }
  }

  // ........MAPPING......
  const fetchPositionCompetency = async () => {
    try {
      const response = await axios.get(
        `${config.REACT_APP_API_ENDPOINT}/jobcompetency/getalljobcompetency`,
      )
      setPositionCompetency(response.data)
    } catch (error) {
      console.log('Error: '.error)
    } finally {
      setLoading((prev) => ({ ...prev, positionCompetency: false }))
    }
  }

  const fetchCompetencyTraining = async () => {
    try {
      const response = await axios.get(
        `${config.REACT_APP_API_ENDPOINT}/trainingcompetency/getalltrainingcompetency`,
      )
      setCompetencyTraining(response.data)
    } catch (error) {
      console.log('Error: '.error)
    } finally {
      setLoading((prev) => ({ ...prev, competencyTraining: false }))
    }
  }

  useEffect(() => {
    fetchCompany()
    fetchStaff()
    fetchStaffAssessor()
    fetchPosition()
    fetchDepartment()
    fetchDivision()
    fetchCompetency()
    fetchIndicator()
    fetchCluster()
    fetchAssessment()
    fetchAssessmentResult()
    fetchPositionCompetency()
    fetchCompetencyTraining()
    fetchTraining()
  }, [])

  return (
    <MyContext.Provider
      value={{
        company,
        staff,
        staffAssessor,
        updateStaff,
        department,
        division,
        position,
        competency,
        indicator,
        cluster,
        assessment,
        training,
        assessmentResult,
        positionCompetency,
        competencyTraining,
        loading,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MyContext
