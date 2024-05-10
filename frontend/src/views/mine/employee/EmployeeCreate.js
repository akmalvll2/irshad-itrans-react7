import React, { useEffect, useState } from 'react'
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

import defaultImage from '../../../assets/images/avatars/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'

const EmployeeCreate = ({
  visible,
  setVisible,
  createEmployee,
  departmentlist,
  positionlist,
  employeelist,
  createNewAssessor,
}) => {
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const [employeeData, setEmployeeData] = useState({
    employeerole: '',
    employeeimage: null,
    employeesendmail: 'false',
  })

  const handleInputChange = async (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'file') {
      var file = e.target.files[0]
      file = await convertFileToBase64(file)
      setEmployeeData({ ...employeeData, [name]: file })
      return
    }
    if (name === 'employeesendmail') {
      checked
        ? setEmployeeData({ ...employeeData, [name]: 'true' })
        : setEmployeeData({ ...employeeData, [name]: 'false' })
      return
    }
    setEmployeeData({ ...employeeData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (employeeData.employeeimage === null) {
      const defaultImageResponse = await fetch(defaultImage) // Fetch the default image file
      if (defaultImageResponse.ok) {
        const defaultImageBlob = await defaultImageResponse.blob() // Get the response body as a Blob object
        employeeData.employeeimage = await convertFileToBase64(defaultImageBlob) // Convert Blob to base64
      } else {
        console.error('Failed to fetch default image')
        return
      }
    }
    createEmployee(employeeData)
    setVisible(!visible)
    setEmployeeData({
      employeerole: '',
      employeeimage: null,
      employeesendmail: 'false',
    })
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
                <CFormCheck
                  //type="checkbox"
                  size="sm"
                  name="employeesendmail"
                  label="Send Email Notification"
                  value={'true'}
                  onChange={handleInputChange}
                  defaultChecked={employeeData.employeesendmail === 'true'}
                />
                <CFormInput
                  type="file"
                  size="sm"
                  accept="image/jpg"
                  name="employeeimage"
                  className="mb-3"
                  label="Employee Image"
                  onChange={handleInputChange}
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
                    <option value="0">No Reporting</option>
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
  createNewAssessor: PropTypes.func,
}

export default EmployeeCreate
