import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import img2 from '../../../assets/images/4.png'
import {
  CSpinner,
  CCard,
  CCardHeader,
  CCardTitle,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCallout,
  CCardBody,
  CRow,
  CCol,
  CAlert,
  CButtonGroup,
  CButton,
  CTooltip,
  CWidgetStatsF,
  CBadge,
  CModal,
  CModalHeader,
  CModalBody,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilSave,
  cilTrash,
  cilMagnifyingGlass,
  cilPencil,
  cilAddressBook,
  cilClipboard,
} from '@coreui/icons'

const AssessmentStatusTable = ({ visible, setVisible, stafflist, assessmentdata, assessors }) => {
  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        size="xl"
      >
        <CModalHeader>
          <h6>
            Assessment Submission Status: ({' '}
            <span style={{ color: 'blue' }}>{assessmentdata?.assessment_name}</span> )
          </h6>
        </CModalHeader>
        <CModalBody>
          <CTable small bordered striped responsive>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell>No</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Self</CTableHeaderCell>
                <CTableHeaderCell>Superior</CTableHeaderCell>
                <CTableHeaderCell>Subordinate/Peers</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {stafflist?.map((val, key) => {
                return (
                  <CTableRow key={key}>
                    <CTableDataCell>{key + 1}</CTableDataCell>
                    <CTableDataCell>{val.staff_name}</CTableDataCell>
                    <CTableDataCell>
                      <ul>
                        {stafflist
                          ?.filter(
                            (u) =>
                              u.staff_id === val.staff_id &&
                              assessors.some(
                                (x) =>
                                  x.staff_id === u.staff_id && x.staff_assessor_type === 'self',
                              ),
                          )
                          .map((i, key) => (
                            <li key={key}>{i.staff_name}</li>
                          ))}
                      </ul>
                    </CTableDataCell>
                    <CTableDataCell>
                      <ul>
                        {stafflist
                          ?.filter(
                            (u) =>
                              u.staff_id === val.staff_id &&
                              assessors.some(
                                (x) =>
                                  x.staff_id === u.staff_id && x.staff_assessor_type === 'superior',
                              ),
                          )
                          .map((i, key) => (
                            <li key={key}>{i.staff_name}</li>
                          ))}
                      </ul>
                    </CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </CModalBody>
      </CModal>
    </>
  )
}

AssessmentStatusTable.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  stafflist: PropTypes.array.isRequired,
  assessmentdata: PropTypes.object.isRequired,
  assessors: PropTypes.array.isRequired,
}

export default AssessmentStatusTable
