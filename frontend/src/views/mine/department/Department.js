import React, { Suspense, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import axios from 'axios'

// FETCH USER ROLE
import { userType } from 'src/userType'

//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

//import department component
const DepartmentTable = React.lazy(() => import('./DepartmentTable'))
const DepartmentCreate = React.lazy(() => import('./DepartmentCreate'))
const DepartmentDetail = React.lazy(() => import('./DepartmentDetail'))
const DepartmentEdit = React.lazy(() => import('./DepartmentEdit'))

const Department = () => {
  const [departmentlist, setDepartmentlist] = useState([])
  const [isChange, setIsChange] = useState(false)
  const [toggleCreateDepartment, setToggleCreateDepartment] = useState(false)
  const [toggleDetailDepartment, setToggleDetailDepartment] = useState(false)
  const [toggleEditDepartment, setToggleEditDepartment] = useState(false)
  const [viewDepartment, setViewDepartment] = useState()
  const [editDepartment, setEditDepartment] = useState()

  //CREATE DEPARTMENT API
  const createNewDepartment = async (departmentdata) => {
    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/department/createdepartment`, {
          departmentdata: departmentdata,
        })
        .then((response) => {
          if (response) {
            alert('Department data saved.')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  //DELETE DEPARTMENT API
  const deleteDepartment = async (departmentid) => {
    const deleteconfirm = window.confirm('Delete department?')
    if (deleteconfirm) {
      try {
        await axios
          .delete(`${config.REACT_APP_API_ENDPOINT}/department/deletedepartment/${departmentid}`)
          .then((response) => {
            if (response) {
              alert('Department deleted')
              setIsChange(!isChange)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  //UPDATE DEPARTMENT API
  const updateDepartment = async (departmentdata) => {
    try {
      await axios
        .put(
          `${config.REACT_APP_API_ENDPOINT}/department/updatedepartment/${departmentdata.departmentid}`,
          {
            departmentdata: departmentdata,
          },
        )
        .then((response) => {
          if (response) {
            alert('Department updated')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
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
  return (
    <>
      <Suspense fallback={<CSpinner />}>
        <DepartmentTable
          departmentlist={departmentlist}
          setToggleCreateDepartment={setToggleCreateDepartment}
          setToggleDetailDepartment={setToggleDetailDepartment}
          deleteDepartment={deleteDepartment}
          viewDepartment={setViewDepartment}
          setToggleEditDepartment={setToggleEditDepartment}
          editDepartment={setEditDepartment}
          role={userType.role}
        />
        <DepartmentCreate
          visible={toggleCreateDepartment}
          setVisible={setToggleCreateDepartment}
          createDepartment={createNewDepartment}
        />
        <DepartmentDetail
          visible={toggleDetailDepartment}
          setVisible={setToggleDetailDepartment}
          departmentdata={departmentlist}
          viewDepartment={viewDepartment}
          deleteDepartment={deleteDepartment}
          setToggleEditDepartment={setToggleEditDepartment}
          editDepartment={setEditDepartment}
          role={userType.role}
        />
        <DepartmentEdit
          visible={toggleEditDepartment}
          setVisible={setToggleEditDepartment}
          departmentdata={departmentlist}
          departmentid={editDepartment}
          updateddepartment={updateDepartment}
        />
      </Suspense>
    </>
  )
}

export default Department
