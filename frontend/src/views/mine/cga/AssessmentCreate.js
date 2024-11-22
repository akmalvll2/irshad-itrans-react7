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
  CFormCheck,
  CFormLabel,
  CFormSelect,
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
                <CFormSelect
                  size="sm"
                  name="assessmenttype"
                  label="Assessment Type"
                  onChange={handleInputChange}
                >
                  <option>..assessment type..</option>
                  <option value="leadership">Leadership</option>
                  <option value="gap">Competency Gap</option>
                  <option value="cbi">Competency Based Interview</option>
                  <option value="rating">Rating Based Assessment</option>
                </CFormSelect>
                {/*
                  <CFormLabel>Assessment Type</CFormLabel>
                  <br />
                  <CFormCheck
                    inline
                    type="radio"
                    size="sm"
                    name="assessmenttype"
                    label="Leadership"
                    value={'leadership'}
                    onChange={handleInputChange}
                    checked={assessmentData.assessmenttype === 'leadership'}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    size="sm"
                    name="assessmenttype"
                    label="Functional"
                    value={'functional'}
                    onChange={handleInputChange}
                    checked={assessmentData.assessmenttype === 'functional'}
                  />
                */}
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
