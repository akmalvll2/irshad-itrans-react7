import React, { Suspense, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import axios from 'axios'

//path to userType component
import { userType } from 'src/userType'

// IMPORT COREUI COMPONENT
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CCardText,
  CNav,
  CNavItem,
  CNavLink,
  CButton,
  CTabContent,
  CTabPane,
} from '@coreui/react'

//path to API call IMPORTANT!
import packageJson from '../../../package.json'
import DBTrainingRec from './DbTrainingRec'
const { config } = packageJson

//IMPORT COMPONENT
const DashboardInfo1 = React.lazy(() => import('./DashboardInfo1'))
const DashboardInfo2 = React.lazy(() => import('./DashboardInfo2'))
const DbDepartmentInfo = React.lazy(() => import('./DbDepartmentInfo'))
const DbStaffInfo = React.lazy(() => import('./DbStaffInfo'))
const DbTrainingRec = React.lazy(() => import('./DbTrainingRec'))
const DbIdp = React.lazy(() => import('./DbIdp'))

const Dashboard = () => {
  const [isChange, setIsChange] = useState(false)
  const [assessmentlist, setAssessmentlist] = useState([])
  const [employeelist, setEmployeelist] = useState([])
  const [departmentlist, setDepartmentlist] = useState([])
  const [competencylist, setCompetencylist] = useState([])
  const [traininglist, setTraininglist] = useState([])
  const [joblist, setJoblist] = useState([])
  const [activeKey, setActiveKey] = useState(1)

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
      <CCard>
        <CCardHeader>
          <CNav variant="tabs" className="card-header-tabs">
            <CNavItem>
              <CNavLink
                style={{ cursor: 'pointer' }}
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                Profile
              </CNavLink>
            </CNavItem>
            {employeelist?.find((i) => i.staff_id.toString() === userType?.id)
              ?.position_department_report === 1 ? (
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  Department
                </CNavLink>
              </CNavItem>
            ) : null}
          </CNav>
        </CCardHeader>
        <CCardBody>
          <CTabContent>
            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
              <CRow>
                <CCol>
                  {userType.role === 'admin' ? (
                    <DashboardInfo2
                      employeelist={employeelist}
                      departmentlist={departmentlist}
                      competencylist={competencylist}
                      traininglist={traininglist}
                      joblist={joblist}
                    />
                  ) : (
                    ''
                  )}
                </CCol>
              </CRow>
              <CRow>
                <CCol md={12}>{userType.role === 'admin' ? null : <DbStaffInfo />}</CCol>
                <CCol md={12}>
                  <DashboardInfo1 assessmentlist={assessmentlist} />
                </CCol>
                {userType?.role !== 'admin' ? (
                  <CCol md={12}>
                    <DbTrainingRec />
                  </CCol>
                ) : null}
                {userType?.role !== 'admin' ? (
                  <CCol md={12}>
                    <DbIdp />
                  </CCol>
                ) : null}
                {/*<CCol md={12}>{userType.role !== 'admin' ? <DbDepartmentInfo /> : ''}</CCol>*/}
              </CRow>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
              <DbDepartmentInfo />
            </CTabPane>
          </CTabContent>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
