import React, { Suspense, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import axios from 'axios'

//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

//import competency component
const CompetencyTable = React.lazy(() => import('./CompetencyTable'))
const CompetencyCreate = React.lazy(() => import('./CompetencyCreate'))
//const CompetencyDetail = React.lazy(() => import('./CompetencyDetail'))
//const CompetencyEdit = React.lazy(() => import('./CompetencyEdit'))

const Competency = () => {
  const [competencylist, setCompetencylist] = useState([])
  const [isChange, setIsChange] = useState(false)
  const [toggleCreateCompetency, setToggleCreateCompetency] = useState(false)
  const [toggleDetailCompetency, setToggleDetailCompetency] = useState(false)
  const [toggleEditCompetency, setToggleEditCompetency] = useState(false)
  const [viewCompetency, setViewCompetency] = useState()
  const [editCompetency, setEditCompetency] = useState()

  //CREATE COMPETENCY API
  const createNewCompetency = async (competencydata) => {
    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/competency/createcompetency`, {
          competencydata: competencydata,
        })
        .then((response) => {
          if (response) {
            alert('Competency data saved.')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  //DELETE COMPETENCY API
  const deleteCompetency = async (competencyid) => {
    const deleteconfirm = window.confirm('Delete competency?')
    if (deleteconfirm) {
      try {
        await axios
          .delete(`${config.REACT_APP_API_ENDPOINT}/competency/deletecompetency/${competencyid}`)
          .then((response) => {
            if (response) {
              alert('Competency deleted')
              setIsChange(!isChange)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  //UPDATE COMPETENCY API
  const updateCompetency = async (competencydata) => {
    try {
      await axios
        .put(
          `${config.REACT_APP_API_ENDPOINT}/competency/updatecompetency/${competencydata.competencyid}`,
          {
            competencydata: competencydata,
          },
        )
        .then((response) => {
          if (response) {
            alert('Competency updated')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
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
    //READ CLUSTER API
  }, [])
  return (
    <>
      <Suspense fallback={<CSpinner />}>
        <CompetencyTable
          competencylist={competencylist}
          setToggleCreateCompetency={setToggleCreateCompetency}
          setToggleDetailCompetency={setToggleDetailCompetency}
          deleteCompetency={deleteCompetency}
          viewCompetency={setViewCompetency}
          setToggleEditCompetency={setToggleEditCompetency}
          editCompetency={setEditCompetency}
        />
        <CompetencyCreate
          visible={toggleCreateCompetency}
          setVisible={setToggleCreateCompetency}
          createCompetency={createNewCompetency}
        />
        {/*
        <DepartmentDetail
          visible={toggleDetailDepartment}
          setVisible={setToggleDetailDepartment}
          departmentdata={departmentlist}
          viewDepartment={viewDepartment}
          deleteDepartment={deleteDepartment}
          setToggleEditDepartment={setToggleEditDepartment}
          editDepartment={setEditDepartment}
        />
        <DepartmentEdit
          visible={toggleEditDepartment}
          setVisible={setToggleEditDepartment}
          departmentdata={departmentlist}
          departmentid={editDepartment}
          updateddepartment={updateDepartment}
  />*/}
      </Suspense>
    </>
  )
}

export default Competency
