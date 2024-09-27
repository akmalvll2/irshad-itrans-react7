import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import img2 from '../../../assets/images/4.png'
import MyContext from '../data/MyContext'
import { userType } from 'src/userType'
//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CSpinner,
  CTabContent,
  CTabPane,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilLibrary } from '@coreui/icons'

const { config } = packageJson

//IMPORT COMPONENT
const ReportTable1 = React.lazy(() => import('./ReportTable1'))
const ReportTable2 = React.lazy(() => import('./ReportTable2'))
const ReportTable3 = React.lazy(() => import('./ReportTable3'))
const ReportExample1 = React.lazy(() => import('./ReportExample1'))
const ReportExample2 = React.lazy(() => import('./ReportExample2'))
const ReportDepartment1 = React.lazy(() => import('./ReportDepartment1'))
const DbDepartmentInfo = React.lazy(() => import('../../dashboard/DbDepartmentInfo'))
const ReportDepartment2 = React.lazy(() => import('./ReportDepartment2'))

const Report = () => {
  const { loading, company } = useContext(MyContext)
  // SETTING INITIALIZE
  const [isChange, setIsChange] = useState(false)
  // DATABASE DATA ARRAY
  const [stafflist, setStaffList] = useState([])
  const [departmentlist, setDepartmentlist] = useState([])
  const [positionlist, setPositionlist] = useState([])
  const [competencylist, setCompetencylist] = useState([])
  const [jobcompetency, setjobcompetency] = useState([])
  const [clusterlist, setclusterlist] = useState([])
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
    //READ POSITION API
    const fetchAllPosition = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/job/getalljob`)
        setPositionlist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllPosition()
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
    //READ CLUSTER API
    const fetchAllCluster = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/cluster/getallcluster`)
        setclusterlist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllCluster()
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

  const [activeKey, setActiveKey] = useState(1)

  const selectedCompany = company[0]

  if (loading.company) <CSpinner />
  return (
    <>
      {/*<ReportTable2
        stafflist={stafflist}
        departmentlist={departmentlist}
        positionlist={positionlist}
        jobcompetency={jobcompetency}
        clusterlist={clusterlist}
        assessmentlist={assessmentlist}
        assessmentresult={assessmentresult}
        competencylist={competencylist}
      />
      <ReportTable3
        stafflist={stafflist}
        departmentlist={departmentlist}
        positionlist={positionlist}
        jobcompetency={jobcompetency}
        clusterlist={clusterlist}
        assessmentlist={assessmentlist}
        assessmentresult={assessmentresult}
        competencylist={competencylist}
      />
      <ReportTable1
                stafflist={stafflist}
                departmentlist={departmentlist}
                positionlist={positionlist}
                jobcompetency={jobcompetency}
                clusterlist={clusterlist}
                assessmentlist={assessmentlist}
                assessmentresult={assessmentresult}
                competencylist={competencylist}
              />
      */}
      <CCard>
        <CCardHeader>
          <CIcon icon={cilLibrary} /> REPORT AND ANALYSIS
          <CNav variant="tabs" className="card-header-tabs float-end">
            <CNavItem>
              <CNavLink
                style={{ cursor: 'pointer', color: activeKey === 1 ? 'black' : 'ghostwhite' }}
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                Department
              </CNavLink>
            </CNavItem>
          </CNav>
          {/*userType?.role === 'admin' ? (
            <CNav variant="tabs" className="card-header-tabs float-end">
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer', color: activeKey === 1 ? 'black' : 'ghostwhite' }}
                  active={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                >
                  Overall
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer', color: activeKey === 2 ? 'black' : 'ghostwhite' }}
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  Report 1
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer', color: activeKey === 3 ? 'black' : 'ghostwhite' }}
                  active={activeKey === 3}
                  onClick={() => setActiveKey(3)}
                >
                  Report 2
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer', color: activeKey === 4 ? 'black' : 'ghostwhite' }}
                  active={activeKey === 4}
                  onClick={() => setActiveKey(4)}
                >
                  Report 3
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer', color: activeKey === 5 ? 'black' : 'ghostwhite' }}
                  active={activeKey === 5}
                  onClick={() => setActiveKey(5)}
                >
                  Summary
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer', color: activeKey === 6 ? 'black' : 'ghostwhite' }}
                  active={activeKey === 6}
                  onClick={() => setActiveKey(6)}
                >
                  Department Report
                </CNavLink>
              </CNavItem>
            </CNav>
          ) : null*/}
        </CCardHeader>
        <CTabContent>
          <CTabPane visible={activeKey === 1}>
            <ReportDepartment2 />
          </CTabPane>
        </CTabContent>
        {/*userType?.role === 'admin' ? (
            <CTabContent>
              <CTabPane visible={activeKey === 1}>
                <ReportExample1 />
              </CTabPane>
              <CTabPane visible={activeKey === 2}>
                <ReportTable1
                  stafflist={stafflist}
                  departmentlist={departmentlist}
                  positionlist={positionlist}
                  jobcompetency={jobcompetency}
                  clusterlist={clusterlist}
                  assessmentlist={assessmentlist}
                  assessmentresult={assessmentresult}
                  competencylist={competencylist}
                />
              </CTabPane>
              <CTabPane visible={activeKey === 3}>
                <ReportTable2
                  stafflist={stafflist}
                  departmentlist={departmentlist}
                  positionlist={positionlist}
                  jobcompetency={jobcompetency}
                  clusterlist={clusterlist}
                  assessmentlist={assessmentlist}
                  assessmentresult={assessmentresult}
                  competencylist={competencylist}
                />
              </CTabPane>
              <CTabPane visible={activeKey === 4}>
                <ReportTable3
                  stafflist={stafflist}
                  departmentlist={departmentlist}
                  positionlist={positionlist}
                  jobcompetency={jobcompetency}
                  clusterlist={clusterlist}
                  assessmentlist={assessmentlist}
                  assessmentresult={assessmentresult}
                  competencylist={competencylist}
                />
              </CTabPane>
              <CTabPane visible={activeKey === 5}>
                <ReportExample2 />
              </CTabPane>
              <CTabPane visible={activeKey === 6}>
                <ReportDepartment1 />
              </CTabPane>
            </CTabContent>
          ) : (
            <DbDepartmentInfo />
          )*/}
      </CCard>
    </>
  )
}

export default Report
