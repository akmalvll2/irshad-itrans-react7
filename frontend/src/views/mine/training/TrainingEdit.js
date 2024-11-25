import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalTitle,
  CButton,
  CButtonGroup,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const TrainingEdit = ({
  visible,
  setVisible,
  trainingdata,
  trainingid,
  updatedtraining,
  clusterlist,
}) => {
  const [updateddata, setupdateddata] = useState({
    trainingid: '',
    trainingname: '',
    trainingdescription: '',
    cluster: '',
  })

  const onChangeHandle = (e) => {
    const { name, value } = e.target
    const newObject = { ...updateddata, [name]: value }
    setupdateddata(newObject)
  }

  const onSubmitHandle = (e) => {
    e.preventDefault()
    updatedtraining(updateddata)
    setVisible(!visible)
  }

  useEffect(() => {
    const selectedTraining = trainingdata.find((fil) => fil.training_id === trainingid)
    if (selectedTraining) {
      setupdateddata({
        trainingid: selectedTraining?.training_id,
        trainingname: selectedTraining?.training_name,
        trainingdescription: selectedTraining?.training_description,
        clusterid: selectedTraining?.cluster_id,
      })
    }
  }, [trainingid])
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CForm onSubmit={onSubmitHandle}>
          <CModalHeader>
            <CModalTitle>Training Edit</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {trainingdata
              ?.filter((fil) => fil.training_id === trainingid)
              .map((val, key) => {
                return (
                  <div key={key}>
                    <CFormInput
                      type="text"
                      name="trainingname"
                      className="mb-3"
                      label="Training Title"
                      defaultValue={val.training_name}
                      onChange={onChangeHandle}
                      required
                    />
                    <CFormLabel>Group</CFormLabel>
                    <CFormSelect
                      size="sm"
                      name="clusterid"
                      onChange={onChangeHandle}
                      defaultValue={val.cluster_id}
                    >
                      <option>..Choose Group</option>
                      {clusterlist?.map((val2, key2) => {
                        return (
                          <option key={key2} value={val2.cluster_id}>
                            {val2.cluster_name}
                          </option>
                        )
                      })}
                    </CFormSelect>
                    <CFormInput
                      type="text"
                      name="trainingdescription"
                      className="mb-3"
                      label="Training Description"
                      defaultValue={val.training_description}
                      onChange={onChangeHandle}
                      required
                    />
                  </div>
                )
              })}
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

TrainingEdit.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  trainingdata: PropTypes.array.isRequired,
  trainingid: PropTypes.number,
  updatedtraining: PropTypes.func.isRequired,
  clusterlist: PropTypes.array.isRequired,
}

export default TrainingEdit
