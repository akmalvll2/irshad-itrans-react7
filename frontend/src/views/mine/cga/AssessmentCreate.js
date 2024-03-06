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
  CRow,
  CCol,
} from '@coreui/react'

const AssessmentCreate = ({ visible, setVisible, createAssessment }) => {
  const [assessmentData, setAssessmentData] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAssessmentData({ ...assessmentData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createAssessment(assessmentData)
    setVisible(!visible)
  }
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CForm onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>New Assessment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol>
                <CFormInput
                  size="sm"
                  type="text"
                  name="assessmentname"
                  className="mb-3"
                  label="Assessment Name"
                  placeholder="eg. First Quater Assessment"
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormInput
                  type="date"
                  name="assessmentstartdate"
                  className="mb-3"
                  label="Start Date"
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol>
                <CFormInput
                  type="date"
                  name="assessmentenddate"
                  className="mb-3"
                  label="End Date"
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
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

AssessmentCreate.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  createAssessment: PropTypes.func.isRequired,
}

export default AssessmentCreate
