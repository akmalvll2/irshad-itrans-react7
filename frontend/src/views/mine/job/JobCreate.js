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
  CFormSelect,
  CFormCheck,
  CFormLabel,
} from '@coreui/react'

const JobCreate = ({ visible, setVisible, createJob }) => {
  const [jobData, setJobData] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setJobData({ ...jobData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createJob(jobData)
    setVisible(!visible)
    setJobData({})
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
            <CModalTitle id="StaticBackdropExampleLabel">New Position</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              name="jobname"
              className="mb-3"
              label="Position Title"
              placeholder="eg. Executive Human Resource"
              onChange={handleInputChange}
              required
            />
            <CFormInput
              type="text"
              name="jobgrade"
              className="mb-3"
              label="Position Grade"
              placeholder="eg. S4"
              onChange={handleInputChange}
              required
            />
            <CFormInput
              type="text"
              name="jobdescription"
              className="mb-3"
              label="Position Description"
              placeholder="eg. Execute task or project based on job scope"
              onChange={handleInputChange}
              required
            />
            <CFormSelect
              label="Position Category"
              name="jobcategory"
              onChange={handleInputChange}
              required
            >
              <option value="">..Category..</option>
              <option value="Top Management">Top Management</option>
              <option value="Senior Management">Senior Management</option>
              <option value="Middle Management">Middle Management</option>
              <option value="Individual Contributor">Individual Contributor</option>
              <option value="Support Staff">Support Staff</option>
            </CFormSelect>
            <CFormLabel className="mt-2">Can View Department Report ?</CFormLabel>
            <CFormCheck
              type="radio"
              name="jobviewdepartment"
              onChange={handleInputChange}
              label="No"
              value={0}
              checked={jobData.jobviewdepartment === '0'}
              required
            />
            <CFormCheck
              type="radio"
              name="jobviewdepartment"
              onChange={handleInputChange}
              label="Yes"
              value={1}
              checked={jobData.jobviewdepartment === '1'}
              required
            />
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

JobCreate.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  createJob: PropTypes.func.isRequired,
}

export default JobCreate
