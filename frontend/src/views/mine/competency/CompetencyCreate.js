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
  CAlert,
  CFormSelect,
  CFormLabel,
} from '@coreui/react'

const CompetencyCreate = ({ visible, setVisible, createCompetency, clusterlist }) => {
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
            {clusterlist.length > 0 ? (
              <>
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
                <CFormLabel>Group</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  size="sm"
                  name="clusterid"
                  onChange={handleInputChange}
                >
                  <option>..Choose Group</option>
                  {clusterlist?.map((val, key) => {
                    return (
                      <option key={key} value={val.cluster_id}>
                        {val.cluster_name}
                      </option>
                    )
                  })}
                </CFormSelect>
                <CFormInput
                  type="text"
                  name="competencyindicator1"
                  className="mb-3"
                  label="Competency Indicator 1"
                  placeholder="eg. Aware of organizational knowledge"
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  type="text"
                  name="competencyindicator2"
                  className="mb-3"
                  label="Competency Indicator 2"
                  placeholder="eg. Aware of organizational knowledge"
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  type="text"
                  name="competencyindicator3"
                  className="mb-3"
                  label="Competency Indicator 3"
                  placeholder="eg. Aware of organizational knowledge"
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  type="text"
                  name="competencyindicator4"
                  className="mb-3"
                  label="Competency Indicator 4"
                  placeholder="eg. Aware of organizational knowledge"
                  onChange={handleInputChange}
                  required
                />
              </>
            ) : (
              <>
                <CAlert color="danger">
                  No cluster data available. Insert cluster data in the settings.
                </CAlert>
              </>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton
              size="sm"
              color="primary"
              type="submit"
              disabled={clusterlist.length > 0 ? false : true}
            >
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
  clusterlist: PropTypes.array.isRequired,
}

export default CompetencyCreate
