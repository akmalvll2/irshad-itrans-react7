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
} from '@coreui/react'

const DepartmentCreate = ({ visible, setVisible, createDepartment }) => {
  const [departmentData, setDepartmentData] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDepartmentData({ ...departmentData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createDepartment(departmentData.departmentname, departmentData.departmentdescription)
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
            <CModalTitle id="StaticBackdropExampleLabel">New Department</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              name="departmentname"
              className="mb-3"
              label="Department Name"
              placeholder="eg. Human Resource"
              onChange={handleInputChange}
              required
            />
            <CFormInput
              type="text"
              name="departmentdescription"
              className="mb-3"
              label="Department Description"
              placeholder="eg. Manage staff related administration"
              onChange={handleInputChange}
              required
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              Save
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

DepartmentCreate.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  createDepartment: PropTypes.func.isRequired,
}

export default DepartmentCreate
