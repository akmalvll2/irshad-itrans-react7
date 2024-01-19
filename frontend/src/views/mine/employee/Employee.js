import React, { Suspense, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import axios from 'axios'

//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

//import department component
const EmployeeTable = React.lazy(() => import('./EmployeeTable'))
const EmployeeCreate = React.lazy(() => import('./EmployeeCreate'))
//const DepartmentDetail = React.lazy(() => import('./DepartmentDetail'))
//const DepartmentEdit = React.lazy(() => import('./DepartmentEdit'))

const Employee = () => {
  const [employeelist, setEmployeelist] = useState([])
  const [isChange, setIsChange] = useState(false)
  const [toggleCreateEmployee, setToggleCreateEmployee] = useState(false)
  const [toggleDetailEmployee, setToggleDetailEmployee] = useState(false)
  const [toggleEditEmployee, setToggleEditEmployee] = useState(false)
  const [viewEmployee, setViewEmployee] = useState()
  const [editEmployee, setEditEmployee] = useState()

  //CREATE EMPLOYEE API
  const createNewEmployee = async (employeedata) => {
    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/employee/createemployee`, {
          employeedata: employeedata,
        })
        .then((response) => {
          if (response) {
            alert('Employee data saved.')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  //DELETE EMPLOYEE API
  const deleteEmployee = async (employeeid) => {
    const deleteconfirm = window.confirm('Delete employee?')
    if (deleteconfirm) {
      try {
        await axios
          .delete(`${config.REACT_APP_API_ENDPOINT}/employee/deleteemployee/${employeeid}`)
          .then((response) => {
            if (response) {
              alert('Employee deleted')
              setIsChange(!isChange)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  //UPDATE EMPLOYEE API
  const updateEmployee = async (employeedata) => {
    try {
      await axios
        .put(
          `${config.REACT_APP_API_ENDPOINT}/employee/updateemployee/${employeedata.employeeid}`,
          {
            employeedata: employeedata,
          },
        )
        .then((response) => {
          if (response) {
            alert('Employee updated')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
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
  return (
    <>
      <Suspense fallback={<CSpinner />}>
        <EmployeeTable
          employeelist={employeelist}
          setToggleCreateEmployee={setToggleCreateEmployee}
          setToggleDetailEmployee={setToggleDetailEmployee}
          deleteEmployee={deleteEmployee}
          viewEmployee={setViewEmployee}
          setToggleEditEmployee={setToggleEditEmployee}
          editEmployee={setEditEmployee}
        />
        <EmployeeCreate
          visible={toggleCreateEmployee}
          setVisible={setToggleCreateEmployee}
          createEmployee={createNewEmployee}
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

export default Employee
