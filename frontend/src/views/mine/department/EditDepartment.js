import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CButton,
  CFormInput,
  CFormLabel,
  CSpinner,
} from '@coreui/react'

import packageJson from '../../../../package.json'
const { config } = packageJson

const EditDepartment = ({ visiblei, setVisiblei, departmentid, departmentname }) => {
  const [departmentName, setDepartmentName] = useState()
  const [loadDepartment, setLoadDepartment] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoadDepartment(true)
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/editdepartment`, {
          departmentid,
          departmentName,
        })
        .then((response) => {
          if (response.data) {
            alert(response.data)
          } else {
            alert('Error inserting data')
          }
        })
    } catch (err) {
      console.log(err)
    } finally {
      setLoadDepartment(false)
      setVisiblei(!visiblei)
    }
  }
  return (
    <div>
      <CModal visible={visiblei} onClose={() => setVisiblei(false)} backdrop="static">
        <CModalHeader>Edit Department</CModalHeader>
        <CModalBody>
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Department Name"
            defaultValue={departmentname}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={handleSubmit} disabled={loadDepartment ? true : false}>
            {loadDepartment ? <CSpinner color="secondary" size="sm" /> : 'Submit'}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

EditDepartment.propTypes = {
  visiblei: PropTypes.bool,
  setVisiblei: PropTypes.bool,
  departmentid: PropTypes.number,
  departmentname: PropTypes.string,
}

export default EditDepartment
