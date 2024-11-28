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

const TrainingCreate = ({ visible, setVisible, createTraining, clusterlist }) => {
  const [trainingData, setTrainingData] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTrainingData({ ...trainingData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createTraining(trainingData)
    setVisible(!visible)
  }
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CForm onSubmit={handleSubmit}>
          <CModalHeader className=" bg-light">
            <CModalTitle id="StaticBackdropExampleLabel">New Training</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {clusterlist.length > 0 ? (
              <>
                <CFormInput
                  size="sm"
                  type="text"
                  name="trainingname"
                  className="mb-3"
                  label="Training Title"
                  placeholder="eg. Organizational Training"
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  size="sm"
                  type="text"
                  name="trainingdescription"
                  className="mb-3"
                  label="Training Description"
                  placeholder="eg. Learn the fundamentals of managing task and work in an organization"
                  onChange={handleInputChange}
                  required
                />
                <CFormLabel>Group</CFormLabel>
                <CFormSelect size="sm" name="clusterid" onChange={handleInputChange}>
                  <option>..Choose Group</option>
                  {clusterlist?.map((val, key) => {
                    return (
                      <option key={key} value={val.cluster_id}>
                        {val.cluster_name}
                      </option>
                    )
                  })}
                </CFormSelect>
              </>
            ) : (
              <>
                <CAlert color="danger">
                  No cluster data available. Insert cluster data in the settings.
                </CAlert>
              </>
            )}
          </CModalBody>
          <CModalFooter className=" bg-light">
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

TrainingCreate.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  createTraining: PropTypes.func.isRequired,
  clusterlist: PropTypes.array.isRequired,
}

export default TrainingCreate
