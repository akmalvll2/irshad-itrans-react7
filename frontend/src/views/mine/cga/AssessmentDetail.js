import React from 'react'
import moment from 'moment'
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

const AssessmentDetail = ({
  visible,
  setVisible,
  assessmentdata,
  viewAssessment,
  deleteAssessment,
  setToggleEditAssessment,
  editAssessment,
}) => {
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Assessment Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {assessmentdata
            ?.filter((fil) => fil.assessment_id === viewAssessment)
            .map((val, key) => {
              return (
                <div key={key}>
                  <CTable small bordered stripedColumns>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>Assessment Name:</CTableDataCell>
                        <CTableDataCell>{val.assessment_name}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Start Date:</CTableDataCell>
                        <CTableDataCell>
                          {moment(val.assessment_start_date).format('Do MMMM YYYY')}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>End Date:</CTableDataCell>
                        <CTableDataCell>
                          {moment(val.assessment_end_date).format('Do MMMM YYYY')}
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                  <span className="text-black-50">
                    Registered in the system on {Date(val.assessment_system_register)}
                  </span>
                </div>
              )
            })}
        </CModalBody>
        <CModalFooter>
          <CButtonGroup>
            <CButton
              size="sm"
              color="secondary"
              onClick={() => {
                editAssessment(viewAssessment)
                setToggleEditAssessment(true)
              }}
            >
              <CIcon icon={cilPencil} /> Edit
            </CButton>
            <CButton
              size="sm"
              color="danger"
              onClick={() => {
                deleteAssessment(viewAssessment)
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

AssessmentDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  assessmentdata: PropTypes.array.isRequired,
  viewAssessment: PropTypes.number,
  deleteAssessment: PropTypes.func.isRequired,
  setToggleEditAssessment: PropTypes.func.isRequired,
  editAssessment: PropTypes.func,
}

export default AssessmentDetail
