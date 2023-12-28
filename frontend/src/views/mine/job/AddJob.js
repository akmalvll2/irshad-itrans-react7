import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormInput,
  CButton,
  CFormTextarea,
} from '@coreui/react'

import packageJson from '../../../../package.json'
const { config } = packageJson

const AddJob = ({ visible, setVisible }) => {
  const [jobTitle, setJobTitle] = useState()
  const [jobGrade, setJobGrade] = useState()
  const [jobDesc, setJobDesc] = useState()
  const handleSubmit = async (e) => {
    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/addposition`, {
          jobTitle: jobTitle,
          jobGrade: jobGrade,
          jobDesc: jobDesc,
        })
        .then((response) => {
          alert(response.data)
        })
      setVisible(false)
      window.location.reload()
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div>
      <CModal visible={visible} onClose={() => setVisible(false)} backdrop="static">
        <CModalHeader>Add New Job Profile</CModalHeader>
        <CModalBody>
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Job Title"
            placeholder="Executive"
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Job Grade"
            placeholder="S4"
            onChange={(e) => setJobGrade(e.target.value)}
            required
          />
          <CFormTextarea
            rows={3}
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Job Description"
            onChange={(e) => setJobDesc(e.target.value)}
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

AddJob.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.bool,
}

export default AddJob
