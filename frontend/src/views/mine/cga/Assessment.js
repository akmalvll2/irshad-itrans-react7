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

const Assessment = () => {
  const [assessmentlist, setAssessmentlist] = useState([])
  const [employeelist, setEmployeelist] = useState([])
  const [jobcompetency, setjobcompetency] = useState([])
  const [isChange, setIsChange] = useState(false)
  const [toggleCreateAssessment, setToggleCreateAssessment] = useState(false)
  const [toggleDetailAssessment, setToggleDetailAssessment] = useState(false)
  const [toggleEditAssessment, setToggleEditAssessment] = useState(false)
  const [toggleFormAdmin, setToggleFormAdmin] = useState(false)
  const [toggleFormUser, setToggleFormUser] = useState(false)
  const [viewAssessment, setViewAssessment] = useState()
  const [editAssessment, setEditAssessment] = useState()

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
        />
        <AssessmentFormUser
          visible={toggleFormUser}
          setVisible={setToggleFormUser}
          stafflist={employeelist}
          jobcompetency={jobcompetency}
          user={userType}
        />
      </Suspense>
    </>
  )
}

export default Assessment
