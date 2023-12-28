import {
  CModal,
  CModalHeader,
  CModalBody,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CModalFooter,
  CButton,
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PropTypes } from 'prop-types'

import packageJson from '../../../../package.json'
const { config } = packageJson

const AddTraining = ({ setVisible, visible }) => {
  const [trainingName, setTrainingName] = useState()
  const [trainingObjective, setTrainingObjective] = useState()
  const [trainingGroup, setTrainingGroup] = useState('Core')
  const [trainingDuration, setTrainingDuration] = useState()

  const handleSubmit = async () => {
    try {
      await axios.post(`${config.REACT_APP_API_ENDPOINT}/addtraining`, {
        trainingName: trainingName,
        trainingGroup: trainingGroup,
        trainingObjective: trainingObjective,
        trainingDuration: trainingDuration,
      })
      setVisible(false)
      alert('Successfully inserted this data')
      window.location.reload()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div>
      <CModal visible={visible} onClose={() => setVisible(false)} backdrop="static">
        <CModalHeader>Add New Training</CModalHeader>
        <CModalBody>
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Training Name"
            onChange={(e) => {
              setTrainingName(e.target.value)
            }}
          />
          <CFormSelect
            size="sm"
            id="floatingInput"
            className="mb-3"
            options={[
              { label: 'Core', value: 'Core' },
              { label: 'Generic', value: 'Generic' },
              { label: 'Functional', value: 'Functional' },
            ]}
            onChange={(e) => {
              setTrainingGroup(e.target.value)
            }}
          />
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Training Objective"
            onChange={(e) => {
              setTrainingObjective(e.target.value)
            }}
          />
          <CFormInput
            size="sm"
            type="number"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Training Duration"
            min={1}
            max={10}
            onChange={(e) => {
              setTrainingDuration(e.target.value)
            }}
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

AddTraining.propTypes = {
  setVisible: PropTypes.bool,
  visible: PropTypes.bool,
}

export default AddTraining
