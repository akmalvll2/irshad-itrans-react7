import React, { useState, useContext } from 'react'
import MyContext from '../data/MyContext'
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
  CSpinner,
  CFormSelect,
} from '@coreui/react'

const DepartmentCreate = ({ visible, setVisible, createDepartment }) => {
  const { loading, division } = useContext(MyContext)
  const [departmentData, setDepartmentData] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDepartmentData({ ...departmentData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createDepartment(departmentData)
    setVisible(!visible)
  }

  if (loading.division) <CSpinner />
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
            <CFormSelect
              label="Division"
              name="divisionid"
              onChange={(e) => handleInputChange(e)}
              required
            >
              <option value={''}>...Division...</option>
              {division?.map((val, key) => (
                <option key={key} value={val.division_id}>
                  {val.division_name}
                </option>
              ))}
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

DepartmentCreate.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  createDepartment: PropTypes.func.isRequired,
}

export default DepartmentCreate
