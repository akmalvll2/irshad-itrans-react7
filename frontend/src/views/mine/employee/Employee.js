import React, { Suspense, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import axios from 'axios'

// FETCH USER ROLE
import { userType } from 'src/userType'

//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

//import department component
const EmployeeTable = React.lazy(() => import('./EmployeeTable'))
const EmployeeCreate = React.lazy(() => import('./EmployeeCreate'))
const EmployeeDetail = React.lazy(() => import('./EmployeeDetail'))
const EmployeeEdit = React.lazy(() => import('./EmployeeEdit'))

const Employee = () => {
  const [employeelist, setEmployeelist] = useState([])
  const [departmentlist, setDepartmentlist] = useState([])
  const [positionlist, setPositionlist] = useState([])
  const [postcompetency, setpostcompetency] = useState([])
  const [assessors, setassessors] = useState([])
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

  //CREATE ASSESSOR API
  const createNewAssessor = async (assessordata) => {
    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/assessor/createassessor`, {
          assessordata: assessordata,
        })
        .then((response) => {
          if (response) {
            alert('Assessor data saved.')
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

  //MAIL GENERATED PASSWORD
  const mailPassword = async (employeeid, employeedata) => {
    try {
      await axios
        .put(`${config.REACT_APP_API_ENDPOINT}/employee/mailpasswordemployee/${employeeid}`, {
          employeedata: employeedata,
        })
        .then((response) => {
          if (response) {
            alert('Password Generated and Sent')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
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
        console.log('Error: Cannot execute')
        console.log('Test')
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
    const fetchAllJob = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/job/getalljob`)
        setPositionlist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllJob()
  }, [isChange])

  useEffect(() => {
    //READ JOB COMPETENCY
    const fetchAllJobCompetency = async () => {
      try {
        const response = await axios.get(
          `${config.REACT_APP_API_ENDPOINT}/jobcompetency/getalljobcompetency`,
        )
        setpostcompetency(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllJobCompetency()
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
        <EmployeeTable
          employeelist={
            userType.role === 'admin'
              ? employeelist
              : employeelist.filter(
                  (i) =>
                    i.manager_id.toString() === userType.id ||
                    i.staff_id.toString() === userType.id,
                )
          }
          setToggleCreateEmployee={setToggleCreateEmployee}
          setToggleDetailEmployee={setToggleDetailEmployee}
          deleteEmployee={deleteEmployee}
          viewEmployee={setViewEmployee}
          setToggleEditEmployee={setToggleEditEmployee}
          editEmployee={setEditEmployee}
          assessors={assessors}
          departmentlist={departmentlist}
          positionlist={positionlist}
          role={userType.role}
        />
        <EmployeeCreate
          visible={toggleCreateEmployee}
          setVisible={setToggleCreateEmployee}
          createEmployee={createNewEmployee}
          departmentlist={departmentlist}
          positionlist={positionlist}
          employeelist={employeelist}
          createNewAssessor={createNewAssessor}
        />
        <EmployeeDetail
          visible={toggleDetailEmployee}
          setVisible={setToggleDetailEmployee}
          employeedata={employeelist}
          viewEmployee={viewEmployee}
          deleteEmployee={deleteEmployee}
          setToggleEditEmployee={setToggleEditEmployee}
          editEmployee={setEditEmployee}
          departmentdata={departmentlist}
          positiondata={positionlist}
          mailpassword={mailPassword}
          positioncompetency={postcompetency}
          assessors={assessors}
          role={userType.role}
        />
        <EmployeeEdit
          visible={toggleEditEmployee}
          setVisible={setToggleEditEmployee}
          employeedata={employeelist}
          employeeid={editEmployee}
          updatedemployee={updateEmployee}
          departmentdata={departmentlist}
          positiondata={positionlist}
        />
      </Suspense>
    </>
  )
}

export default Employee
