import React, { Suspense, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import axios from 'axios'

//path to userType component
import { userType } from 'src/userType'

//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

//import department component
const AssessmentTable = React.lazy(() => import('./AssessmentTable'))
const AssessmentCreate = React.lazy(() => import('./AssessmentCreate'))
const AssessmentDetail = React.lazy(() => import('./AssessmentDetail'))
const AssessmentEdit = React.lazy(() => import('./AssessmentEdit'))
const AssessmentFormAdmin = React.lazy(() => import('./AssessmentFormAdmin'))
const AssessmentFormUser = React.lazy(() => import('./AssessmentFormUser'))
const AssessmentForm1 = React.lazy(() => import('./AssessmentForm1'))
const AssessmentFormCBI = React.lazy(() => import('./AssessmentFormCBI'))
const AssessmentStatusTable = React.lazy(() => import('./AssessmentStatusTable'))
const AssessmentFormLeadership = React.lazy(() => import('./AssessmentFormLeadership'))
const AssessmentResultDetail = React.lazy(() => import('./AssessmentResultDetail'))

const Assessment = () => {
  const [assessmentlist, setAssessmentlist] = useState([])
  const [employeelist, setEmployeelist] = useState([])
  const [jobcompetency, setjobcompetency] = useState([])
  const [assessors, setassessors] = useState([])
  const [indicators, setindicators] = useState([])
  const [assessmentresult, setassessmentresult] = useState([])
  const [isChange, setIsChange] = useState(false)
  const [toggleCreateAssessment, setToggleCreateAssessment] = useState(false)
  const [toggleDetailAssessment, setToggleDetailAssessment] = useState(false)
  const [toggleEditAssessment, setToggleEditAssessment] = useState(false)
  const [toggleFormAdmin, setToggleFormAdmin] = useState(false)
  const [toggleFormUser, setToggleFormUser] = useState(false)
  const [toggleFormLeadership, setToggleFormLeadership] = useState(false)
  const [toggleSubmissionTable, setToggleSubmissionTable] = useState(false)
  const [viewAssessment, setViewAssessment] = useState()
  const [editAssessment, setEditAssessment] = useState()
  const [toggleResultDetail, setToggleResultDetail] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState()

  //CREATE ASSESSMENT API
  const createNewAssessment = async (assessmentdata) => {
    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/assessment/createassessment`, {
          assessmentdata: assessmentdata,
        })
        .then((response) => {
          if (response) {
            alert('Assessment data saved.')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  //DELETE ASSESSMENT API
  const deleteAssessment = async (assessmentid) => {
    const deleteconfirm = window.confirm('Delete assessment?')
    if (deleteconfirm) {
      try {
        await axios
          .delete(`${config.REACT_APP_API_ENDPOINT}/assessment/deleteassessment/${assessmentid}`)
          .then((response) => {
            if (response) {
              alert('Assessment deleted')
              setIsChange(!isChange)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  //UPDATE ASSESSMENT API
  const updateAssessment = async (assessmentdata) => {
    try {
      await axios
        .put(
          `${config.REACT_APP_API_ENDPOINT}/assessment/updateassessment/${assessmentdata.assessmentid}`,
          {
            assessmentdata: assessmentdata,
          },
        )
        .then((response) => {
          if (response) {
            alert('Assessment updated')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  //CREATE ASSESSMENT RESULT API
  const createAssessmentResult = async (assessmentresultdata) => {
    try {
      for (var x = 0; x < assessmentresultdata.length; x++) {
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/assessmentresult/createassessmentresult`, {
            assessmentresultdata: assessmentresultdata[x],
          })
          .then((response) => {
            if (response) {
              console.log('Assessment result data saved.')
            }
          })
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsChange(!isChange)
      alert('Assessment Result Data Saved.')
    }
  }
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

  useEffect(() => {
    //READ INDICATOR API
    const fetchAllIndicator = async () => {
      try {
        const response = await axios.get(
          `${config.REACT_APP_API_ENDPOINT}/indicator/getallindicator`,
        )
        setindicators(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllIndicator()
  }, [isChange])

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
    //READ ASSESSOR
    const fetchAllAssessor = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/assessor/getallassessor`)
        setassessors(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllAssessor()
  }, [isChange])
  return (
    <>
      <Suspense fallback={<CSpinner />}>
        <AssessmentTable
          assessmentlist={assessmentlist}
          setToggleCreateAssessment={setToggleCreateAssessment}
          setToggleDetailAssessment={setToggleDetailAssessment}
          deleteAssessment={deleteAssessment}
          viewAssessment={setViewAssessment}
          setToggleEditAssessment={setToggleEditAssessment}
          editAssessment={setEditAssessment}
          setToggleFormAdmin={setToggleFormAdmin}
          setToggleFormUser={setToggleFormUser}
          setToggleSubmissionTable={setToggleSubmissionTable}
          role={userType.role}
        />
        <AssessmentCreate
          visible={toggleCreateAssessment}
          setVisible={setToggleCreateAssessment}
          createAssessment={createNewAssessment}
        />
        <AssessmentEdit
          visible={toggleEditAssessment}
          setVisible={setToggleEditAssessment}
          assessmentdata={assessmentlist}
          assessmentid={editAssessment}
          updatedassessment={updateAssessment}
        />
        <AssessmentDetail
          visible={toggleDetailAssessment}
          setVisible={setToggleDetailAssessment}
          assessmentdata={assessmentlist}
          viewAssessment={viewAssessment}
          deleteAssessment={deleteAssessment}
          setToggleEditAssessment={setToggleEditAssessment}
          editAssessment={setEditAssessment}
        />
        <AssessmentFormAdmin
          visible={toggleFormAdmin}
          setVisible={setToggleFormAdmin}
          stafflist={employeelist}
          jobcompetency={jobcompetency}
          assessmentresultlist={assessmentresult}
          assessmentid={viewAssessment}
          assessors={assessors}
        />
        {/*assessmentlist?.find((i) => i.assessment_id === viewAssessment)?.assessment_type ===
        'functional' ? (
          <AssessmentFormUser
            visible={toggleFormUser}
            setVisible={setToggleFormUser}
            stafflist={employeelist}
            jobcompetency={jobcompetency}
            user={userType}
            assessmentid={viewAssessment}
            createAssessmentResult={createAssessmentResult}
            assessors={assessors}
            assessmentresult={assessmentresult}
            assessmentdata={assessmentlist}
            indicators={indicators}
          />
        ) : null*/}
        <AssessmentForm1
          visible={toggleFormUser}
          setVisible={setToggleFormUser}
          assessmentid={viewAssessment}
          createAssessmentResult={createAssessmentResult}
        />
        <AssessmentStatusTable
          visible={toggleSubmissionTable}
          setVisible={setToggleSubmissionTable}
          stafflist={employeelist}
          assessmentdata={assessmentlist.find((i) => i.assessment_id === viewAssessment)}
          assessmentresultlist={assessmentresult.filter((i) => i.assessment_id === viewAssessment)}
          assessors={assessors}
          setToggleResultDetail={setToggleResultDetail}
          setSelectedStaff={setSelectedStaff}
        />
        <AssessmentResultDetail
          visible={toggleResultDetail}
          setVisible={setToggleResultDetail}
          stafflist={employeelist}
          jobcompetency={jobcompetency}
          assessmentresultlist={assessmentresult.filter((i) => i.assessment_id === viewAssessment)}
          assessors={assessors}
          selectedStaff={selectedStaff}
        />
        {assessmentlist?.find((i) => i.assessment_id === viewAssessment)?.assessment_type ===
        'leadership' ? (
          <AssessmentFormLeadership
            visible={toggleFormLeadership}
            setVisible={setToggleFormLeadership}
          />
        ) : null}
        {assessmentlist?.find((i) => i.assessment_id === viewAssessment)?.assessment_type ===
        'cbi' ? (
          <AssessmentFormCBI
            visible={toggleFormUser}
            setVisible={setToggleFormUser}
            stafflist={employeelist}
            jobcompetency={jobcompetency}
            user={userType}
            assessmentid={viewAssessment}
            createAssessmentResult={createAssessmentResult}
            assessors={assessors}
            assessmentresult={assessmentresult}
            assessmentdata={assessmentlist}
            indicators={indicators}
          />
        ) : null}
      </Suspense>
    </>
  )
}

export default Assessment
