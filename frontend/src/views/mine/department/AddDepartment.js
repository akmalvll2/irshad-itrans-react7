import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { CModal, CModalBody, CModalHeader, CModalFooter, CButton, CFormInput } from '@coreui/react'

import packageJson from '../../../../package.json'
const { config } = packageJson

const AddDepartment = ({ visible, setVisible }) => {
  const [departmentName, setDepartmentName] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/adddepartment`, { departmentName })
        .then((response) => {
          if (response.data) {
            alert(response.data)
            setVisible(!visible)
          } else {
            alert('Error inserting data')
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <CModal visible={visible} onClose={() => setVisible(false)} backdrop="static">
        <CModalHeader>Add New Department</CModalHeader>
        <CModalBody>
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Department Name"
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={handleSubmit}>
            Submit
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

AddDepartment.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.bool,
}

export default AddDepartment
