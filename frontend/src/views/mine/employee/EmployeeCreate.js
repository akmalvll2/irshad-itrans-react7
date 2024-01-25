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
  CFormCheck,
  CAlert,
} from '@coreui/react'

const EmployeeCreate = ({
  visible,
  setVisible,
  createEmployee,
  departmentlist,
  positionlist,
  employeelist,
}) => {
  const [employeeData, setEmployeeData] = useState({
    employeerole: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEmployeeData({ ...employeeData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createEmployee(employeeData)
    setVisible(!visible)
    console.log(employeeData)
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
            {departmentlist.length > 0 && positionlist.length > 0 ? (
              <>
                <CFormInput
                  type="text"
                  size="sm"
                  name="employeeid"
                  className="mb-3"
                  label="Employee ID"
                  placeholder="eg. A123"
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  type="text"
                  size="sm"
                  name="employeename"
                  className="mb-3"
                  label="Employee Name"
                  placeholder="eg. Amirhamzah"
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  type="email"
                  size="sm"
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
                <CFormLabel>Supervisor</CFormLabel>
                <CFormSelect
                  aria-label="Supervisor"
                  size="sm"
                  name="managerid"
                  onChange={handleInputChange}
                >
                  <option>..Supervisor..</option>
                  {employeelist.length > 0 ? (
                    employeelist?.map((val, key) => {
                      return (
                        <option key={key} value={val.staff_id}>
                          {val.staff_name}
                        </option>
                      )
                    })
                  ) : (
                    <option value="">No Reporting</option>
                  )}
                </CFormSelect>
                <CFormLabel>Role</CFormLabel>
                <CFormCheck
                  type="radio"
                  size="sm"
                  name="employeerole"
                  label="User"
                  value="user"
                  onChange={handleInputChange}
                  checked={employeeData.employeerole === 'user'}
                />
                <CFormCheck
                  type="radio"
                  size="sm"
                  name="employeerole"
                  label="Admin"
                  value="admin"
                  onChange={handleInputChange}
                  checked={employeeData.employeerole === 'admin'}
                />
                <CFormInput
                  type="date"
                  size="sm"
                  name="employeejoindate"
                  className="mb-3"
                  label="Date of Report Duty"
                  onChange={handleInputChange}
                  required
                />
              </>
            ) : (
              <CAlert color="danger">No Department/Position Data Available</CAlert>
            )}
          </CModalBody>
          <CModalFooter>
            {departmentlist.length > 0 && positionlist.length > 0 ? (
              <CButton size="sm" color="primary" type="submit">
                Save
              </CButton>
            ) : (
              ''
            )}
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
  employeelist: PropTypes.array.isRequired,
}

export default EmployeeCreate
