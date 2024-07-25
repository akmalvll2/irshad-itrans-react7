import React, { useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import img2 from '../../../assets/images/4.png'
import { userType } from 'src/userType'
import { usePDF } from 'react-to-pdf'
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
  CContainer,
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
  cilCheck,
  cilXCircle,
  cilFile,
} from '@coreui/icons'

const AssessmentStatusTable = ({
  visible,
  setVisible,
  stafflist,
  assessmentdata,
  assessmentresultlist,
  assessors,
  setToggleResultDetail,
  setSelectedStaff,
}) => {
  const { toPDF, targetRef } = usePDF({
    filename: `Submission_Status_${moment().format('DDMMYYYY')}`,
  })
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
            SUBMISSION STATUS ({' '}
            <span style={{ color: 'blue' }}>{assessmentdata?.assessment_name}</span> )
          </h6>
        </CModalHeader>
        <CModalBody>
          {stafflist?.filter((i) =>
            userType.role !== 'admin'
              ? i.staff_id.toString() === userType?.id || i.manager_id.toString() === userType?.id
              : i.staff_id !== null,
          ).length > 0 ? (
            <CAlert color="secondary">
              <CRow>
                <CCol>
                  <CButtonGroup className="float-end">
                    <CButton size="sm" color="secondary" onClick={() => toPDF()}>
                      Save PDF <CIcon icon={cilFile} />
                    </CButton>
                  </CButtonGroup>
                </CCol>
              </CRow>
              <div ref={targetRef}>
                <CRow className="mb-4">
                  <CCol>
                    <h6 className="float-start">Submission Status Summary</h6>
                    <hr />
                    <div>
                      Self Submission :{' '}
                      {
                        stafflist?.filter(
                          (i) =>
                            (userType.role !== 'admin'
                              ? i.staff_id.toString() === userType?.id ||
                                i.manager_id.toString() === userType?.id
                              : i.staff_id !== null) &&
                            assessmentresultlist.some(
                              (u) => u.staff_id === i.staff_id && u.staff_assessor_type === 'self',
                            ),
                        ).length
                      }
                    </div>
                    <div>
                      Superior Submission :{' '}
                      {
                        stafflist?.filter(
                          (i) =>
                            (userType.role !== 'admin'
                              ? i.staff_id.toString() === userType?.id ||
                                i.manager_id.toString() === userType?.id
                              : i.staff_id !== null) &&
                            assessmentresultlist.some(
                              (u) =>
                                u.staff_id === i.staff_id && u.staff_assessor_type === 'superior',
                            ),
                        ).length
                      }
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <h6 className="float-start">Individual Submission Status</h6>
                    <hr />
                    <CTable small bordered striped responsive>
                      <CTableHead color="dark">
                        <CTableRow>
                          <CTableHeaderCell rowSpan={2}>No</CTableHeaderCell>
                          <CTableHeaderCell rowSpan={2}>Name</CTableHeaderCell>
                          <CTableHeaderCell colSpan={2}>Submission</CTableHeaderCell>
                          <CTableHeaderCell rowSpan={2}>Action</CTableHeaderCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableHeaderCell>Self</CTableHeaderCell>
                          <CTableHeaderCell>Superior</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {stafflist
                          ?.filter((i) =>
                            userType.role !== 'admin'
                              ? i.staff_id.toString() === userType?.id ||
                                i.manager_id.toString() === userType?.id
                              : i.staff_id !== null,
                          )
                          .map((val, key) => {
                            return (
                              <CTableRow key={key}>
                                <CTableDataCell>{key + 1}</CTableDataCell>
                                <CTableDataCell>{val.staff_name}</CTableDataCell>
                                <CTableDataCell>
                                  {assessmentresultlist?.some(
                                    (i) =>
                                      i.staff_id === val.staff_id &&
                                      i.staff_assessor_type === 'self',
                                  ) ? (
                                    <CBadge color="success">
                                      <CIcon className="mx-2" icon={cilCheck} />
                                      Submitted
                                    </CBadge>
                                  ) : (
                                    <CBadge color="danger">
                                      <CIcon className="mx-2" icon={cilXCircle} />
                                      No Submission
                                    </CBadge>
                                  )}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {assessmentresultlist?.some(
                                    (i) =>
                                      i.staff_id === val.staff_id &&
                                      i.staff_assessor_type === 'superior',
                                  ) ? (
                                    <CBadge color="success">
                                      <CIcon className="mx-2" icon={cilCheck} />
                                      Submitted
                                    </CBadge>
                                  ) : (
                                    <CBadge color="danger">
                                      <CIcon className="mx-2" icon={cilXCircle} />
                                      No Submission
                                    </CBadge>
                                  )}
                                </CTableDataCell>
                                <CTableDataCell>
                                  <CButton
                                    color="secondary"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setToggleResultDetail(true)
                                      setSelectedStaff(val.staff_id)
                                    }}
                                  >
                                    View Result
                                  </CButton>
                                </CTableDataCell>
                              </CTableRow>
                            )
                          })}
                      </CTableBody>
                    </CTable>
                  </CCol>
                </CRow>
              </div>
            </CAlert>
          ) : (
            <CAlert color="danger">No Staff Data Available</CAlert>
          )}
        </CModalBody>
      </CModal>
    </>
  )
}

AssessmentStatusTable.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  stafflist: PropTypes.array.isRequired,
  assessmentdata: PropTypes.object,
  assessmentresultlist: PropTypes.array,
  assessors: PropTypes.array.isRequired,
  setToggleResultDetail: PropTypes.func,
  setSelectedStaff: PropTypes.func,
}

export default AssessmentStatusTable
