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

const CompetencyCreate = ({ visible, setVisible, createCompetency }) => {
  const [competencyData, setCompetencyData] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCompetencyData({ ...competencyData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createCompetency(competencyData)
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
            <CModalTitle id="StaticBackdropExampleLabel">New Competency</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              name="competencyname"
              className="mb-3"
              label="Competency Name"
              placeholder="eg. Organizational Awareness"
              onChange={handleInputChange}
              required
            />
            <CFormInput
              type="text"
              name="competencydescription"
              className="mb-3"
              label="Competency Description"
              placeholder="eg. Level of awareness on organization vision, mission and objective"
              onChange={handleInputChange}
              required
            />
            <CFormInput
              type="text"
              name="clusterid"
              className="mb-3"
              label="Competency Group"
              onChange={handleInputChange}
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

CompetencyCreate.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  createCompetency: PropTypes.func.isRequired,
}

export default CompetencyCreate
