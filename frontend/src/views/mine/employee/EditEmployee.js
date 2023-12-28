import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CFormInput,
  CFormSelect,
  CForm,
  CButton,
  CFormCheck,
  CSpinner,
} from '@coreui/react'
import PropTypes from 'prop-types'

import packageJson from '../../../../package.json'
const { config } = packageJson

const EditEmployee = ({ visible, setVisible, employee, setEmployee }) => {
  const [positionList, setPositionList] = useState([])
  const [departmentList, setDepartmentList] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [loadConfirm, setLoadConfirm] = useState(false)

  const fetchPosition = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/position`).then((response) => {
        if (response) {
          setPositionList(response.data)
        }
      })
    } catch (err) {
      //console.log(err)
    }
  }
  const fetchDepartment = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/department`).then((response) => {
        if (response) {
          setDepartmentList(response.data)
        }
      })
    } catch (err) {
      //console.log(err)
    }
  }
  const fetchStaff = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/user`).then((response) => {
        if (response) {
          setEmployeeList(response.data)
        }
      })
    } catch (err) {
      //console.log(err)
    }
  }
  const fetchDate = (cga) => {
    const date = new Date(cga)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const newDate = `${year}-${month}-${day}`

    return newDate
  }
  const handleChange = async (e) => {
    const { name, value } = e.target
    var newEmployee = { ...employee }
    newEmployee = { ...employee, [name]: value }
    setEmployee(newEmployee)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoadConfirm(true)
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/editemployee`, { employee })
        .then((response) => {
          if (response) {
            console.log(response.data)
            alert(response.data)
          }
        })
    } catch (err) {
      console.log(err)
    } finally {
      setLoadConfirm(false)
      setVisible(!visible)
      setEmployee([])
      window.location.reload()
    }
  }
  useEffect(() => {
    fetchPosition()
    fetchDepartment()
    fetchStaff()
  }, [])
  return (
    <>
      <div>
        <CModal visible={visible} onClose={() => setVisible(false)} backdrop="static">
          <CModalHeader>Edit Employee</CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleSubmit}>
              <CFormInput
                size="sm"
                type="text"
                id="floatingInput"
                floatingClassName="mb-3"
                floatingLabel="ID"
                defaultValue={employee?.staff_id}
                disabled
              />
              <CFormInput
                size="sm"
                type="text"
                id="floatingInput"
                floatingClassName="mb-3"
                floatingLabel="Name"
                name="staff_name"
                defaultValue={employee?.staff_name}
                onChange={handleChange}
              />
              <CFormInput
                size="sm"
                type="email"
                id="floatingInput"
                floatingClassName="mb-3"
                floatingLabel="Email"
                name="staff_email"
                defaultValue={employee?.staff_email}
                onChange={handleChange}
              />
              <CFormSelect
                size="sm"
                id="floatingInput"
                className="mb-3"
                label="Position"
                name="job_id"
                onChange={handleChange}
              >
                <option value="">..choose position...</option>
                {positionList?.map((val, key) => {
                  return (
                    <option
                      key={key}
                      value={val.job_id}
                      selected={val.job_id === employee?.job_id ? true : false}
                    >
                      {val.job_title}
                    </option>
                  )
                })}
              </CFormSelect>
              <CFormSelect
                size="sm"
                id="floatingInput"
                className="mb-3"
                label="Department"
                name="department_id"
                onChange={handleChange}
              >
                <option value="">..choose department..</option>
                {departmentList?.map((val, key) => {
                  return (
                    <option
                      key={key}
                      value={val.department_id}
                      selected={val.department_id === employee?.department_id ? true : false}
                    >
                      {val.department_name}
                    </option>
                  )
                })}
              </CFormSelect>
              <CFormSelect
                size="sm"
                id="floatingInput"
                className="mb-3"
                label="Reporting"
                name="reporting_to"
                onChange={handleChange}
              >
                <option value="">..choose reporting..</option>
                {employeeList?.map((val, key) => {
                  return (
                    <option
                      key={key}
                      value={val.staff_id}
                      selected={val.staff_id === employee?.reporting_to ? true : false}
                    >
                      {val.staff_name}
                    </option>
                  )
                })}
              </CFormSelect>
              <CFormSelect
                size="sm"
                id="floatingInput"
                className="mb-3"
                label="Peers (for third accessor)"
                name="reviewer_one"
                onChange={handleChange}
              >
                <option>..choose peers..</option>
                {employeeList?.map((val, key) => {
                  return (
                    <option
                      key={key}
                      value={val.staff_id}
                      selected={val.staff_id === employee?.reviewer_one ? true : false}
                    >
                      {val.staff_name}
                    </option>
                  )
                })}
              </CFormSelect>
              <CFormSelect
                size="sm"
                id="floatingInput"
                className="mb-3"
                label="Role"
                name="type"
                onChange={handleChange}
              >
                <option>..choose peers..</option>
                <option selected={employee?.type === 'user' ? true : false} value={`user`}>
                  User
                </option>
                <option selected={employee?.type === 'admin' ? true : false} value={`admin`}>
                  Admin
                </option>
              </CFormSelect>
              {/*<CFormSelect
                size="sm"
                id="floatingInput"
                className="mb-3"
                label="Type"
                defaultValue={'user'}
                options={[
                  { label: 'user', value: 'user' },
                  { label: 'admin', value: 'admin' },
                ]}
                required
              />*/}
              <CFormInput
                size="sm"
                type="date"
                id="floatingInput"
                floatingClassName="mb-3"
                floatingLabel="Date Join"
                defaultValue={fetchDate(employee?.date_join)}
                name="date_join"
                onChange={handleChange}
              />
              <CButton color="dark" type="submit" disabled={loadConfirm ? true : false}>
                {loadConfirm ? <CSpinner color="secondary" size="sm" /> : 'Submit'}
              </CButton>
            </CForm>
          </CModalBody>
        </CModal>
      </div>
    </>
  )
}

EditEmployee.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.bool,
  employee: PropTypes.array,
  setEmployee: PropTypes.array,
}

export default EditEmployee
