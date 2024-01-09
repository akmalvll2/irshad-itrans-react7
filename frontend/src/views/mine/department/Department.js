import React, { Suspense, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import axios from 'axios'

//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

//import department component
const DepartmentTable = React.lazy(() => import('./DepartmentTable'))
const DepartmentCreate = React.lazy(() => import('./DepartmentCreate'))

const Department = () => {
  const [departmentlist, setDepartmentlist] = useState([])
  const [toggleCreateDepartment, setToggleCreateDepartment] = useState(false)

  //CREATE DEPARTMENT API
  const createNewDepartment = async (departmentname, departmentdescription) => {
    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/department/createdepartment`, {
          departmentname: departmentname,
          departmentdescription: departmentdescription,
        })
        .then((response) => {
          if (response) {
            alert('Department data saved.')
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  //DELETE DEPARTMENT API
  const deleteDepartment = async (departmentid) => {
    try {
      await axios
        .delete(`${config.REACT_APP_API_ENDPOINT}/department/deletedepartment/${departmentid}`)
        .then((response) => {
          if (response) {
            alert('Department deleted')
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
        await axios
          .get(`${config.REACT_APP_API_ENDPOINT}/department/getalldepartment`)
          .then((response) => {
            if (response) {
              setDepartmentlist(response.data)
            }
          })
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllDepartment()
  }, [departmentlist])
  return (
    <>
      <Suspense fallback={<CSpinner />}>
        <DepartmentTable
          departmentlist={departmentlist}
          setToggleCreateDepartment={setToggleCreateDepartment}
          deleteDepartment={deleteDepartment}
        />
        <DepartmentCreate
          visible={toggleCreateDepartment}
          setVisible={setToggleCreateDepartment}
          createDepartment={createNewDepartment}
        />
      </Suspense>
    </>
  )
}

export default Department
