import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'

const EmployeeCreate = ({ visible, setVisible, createEmployee, departmentlist, positionlist }) => {
  const [employeeData, setEmployeeData] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEmployeeData({ ...employeeData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createEmployee(employeeData)
    setVisible(!visible)
  }
  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CForm onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle id="StaticBackdropExampleLabel">New Employee</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              name="employeename"
              className="mb-3"
              label="Employee Name"
              placeholder="eg. Amirhamzah"
              onChange={handleInputChange}
              required
            />
            <CFormInput
              type="email"
              name="employeeemail"
              className="mb-3"
              label="Employee Email"
              placeholder="eg. user@testmail.com"
              onChange={handleInputChange}
              required
            />
            <CFormLabel>Department</CFormLabel>
            <CFormSelect
              aria-label="Department"
              size="sm"
              name="departmentid"
              onChange={handleInputChange}
            >
              <option>..Department..</option>
              {departmentlist?.map((val, key) => {
                return (
                  <option key={key} value={val.department_id}>
                    {val.department_name}
                  </option>
                )
              })}
            </CFormSelect>
            <CFormLabel>Designation</CFormLabel>
            <CFormSelect
              aria-label="Position"
              size="sm"
              name="positionid"
              onChange={handleInputChange}
            >
              <option>..Designation..</option>
              {positionlist?.map((val, key) => {
                return (
                  <option key={key} value={val.position_id}>
                    {val.position_name}
                  </option>
                )
              })}
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton size="sm" color="primary" type="submit">
              Save
            </CButton>
            <CButton size="sm" color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

EmployeeCreate.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  createEmployee: PropTypes.func.isRequired,
  departmentlist: PropTypes.array.isRequired,
  positionlist: PropTypes.array.isRequired,
}

export default EmployeeCreate
