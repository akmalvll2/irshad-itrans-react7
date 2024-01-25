import React from 'react'
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
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const TrainingDetail = ({
  visible,
  setVisible,
  trainingdata,
  viewTraining,
  deleteTraining,
  setToggleEditTraining,
  editTraining,
}) => {
  console.log(viewTraining)
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Training Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {trainingdata
            ?.filter((fil) => fil.training_id === viewTraining)
            .map((val, key) => {
              return (
                <>
                  <CTable key={key} small bordered stripedColumns>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>Name:</CTableDataCell>
                        <CTableDataCell>{val.training_name}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Description:</CTableDataCell>
                        <CTableDataCell>{val.training_description}</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                  <span className="text-black-50">
                    Registered in the system on {Date(val.training_system_register)}
                  </span>
                </>
              )
            })}
        </CModalBody>
        <CModalFooter>
          <CButtonGroup>
            <CButton
              size="sm"
              color="secondary"
              onClick={() => {
                editTraining(viewTraining)
                setToggleEditTraining(true)
              }}
            >
              <CIcon icon={cilPencil} /> Edit
            </CButton>
            <CButton
              size="sm"
              color="danger"
              onClick={() => {
                deleteTraining(viewTraining)
                setVisible(!visible)
              }}
            >
              <CIcon icon={cilTrash} /> Delete
            </CButton>
          </CButtonGroup>
          <CButton size="sm" color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

TrainingDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  trainingdata: PropTypes.array.isRequired,
  viewTraining: PropTypes.number,
  deleteTraining: PropTypes.func.isRequired,
  setToggleEditTraining: PropTypes.func.isRequired,
  editTraining: PropTypes.func,
}

export default TrainingDetail
