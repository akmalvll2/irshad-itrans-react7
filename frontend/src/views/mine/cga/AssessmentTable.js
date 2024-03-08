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

const AssessmentTable = ({
  assessmentlist,
  setToggleCreateAssessment,
  deleteAssessment,
  setToggleDetailAssessment,
  viewAssessment,
  setToggleEditAssessment,
  editAssessment,
  setToggleFormAdmin,
  setToggleFormUser,
  role,
}) => {
  return (
    <>
      <div>
        <CCard>
          <CCardHeader
            style={{
              backgroundImage: `url(${img2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'navy',
            }}
          >
            <center>
              <h6>ASSESSMENT</h6>
            </center>
            {role === 'admin' ? (
              <CButtonGroup className="float-end">
                <CButton
                  size="sm"
                  color="secondary"
                  onClick={() => setToggleCreateAssessment(true)}
                >
                  <CIcon icon={cilPlus} />
                </CButton>
                <CButton size="sm" color="secondary">
                  <CIcon icon={cilSave} />
                </CButton>
              </CButtonGroup>
            ) : (
              ''
            )}
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol lg={4}>
                <CWidgetStatsF
                  className="mb-3"
                  color="primary"
                  //icon={<CIcon icon={cilChartPie} height={24} />}
                  title="TOTAL ASSESSMENT"
                  value={assessmentlist.length}
                />
              </CCol>
            </CRow>
            {assessmentlist.length > 0 ? (
              <CTable small bordered striped responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Assessment</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {assessmentlist?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{key + 1}</CTableDataCell>
                        <CTableDataCell>{val.assessment_name}</CTableDataCell>
                        <CTableDataCell>
                          Start: <b>{moment(val.assessment_start_date).format('Do MMMM YYYY')}</b>
                          <br />
                          End: <b>{moment(val.assessment_end_date).format('Do MMMM YYYY')}</b>
                        </CTableDataCell>
                        <CTableDataCell>
                          {moment().isBefore(moment(val.assessment_start_date)) ? (
                            <CBadge color="info">Upcoming</CBadge>
                          ) : moment().isBetween(
                              moment(val.assessment_start_date),
                              moment(val.assessment_end_date),
                            ) ? (
                            <CBadge color="success">Active</CBadge>
                          ) : (
                            <CBadge color="danger">Closed</CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {role === 'admin' ? (
                            <CButtonGroup className=" d-flex justify-content-center">
                              {moment().isBefore(moment(val.assessment_start_date)) ? (
                                ''
                              ) : moment().isBetween(
                                  moment(val.assessment_start_date),
                                  moment(val.assessment_end_date),
                                ) ? (
                                <CButton
                                  size="sm"
                                  color="secondary"
                                  variant="outline"
                                  onClick={() => setToggleFormUser(true)}
                                >
                                  <CIcon icon={cilClipboard} />
                                </CButton>
                              ) : (
                                ''
                              )}
                              <CButton
                                size="sm"
                                color="secondary"
                                variant="outline"
                                onClick={() => {
                                  setToggleFormAdmin(true)
                                }}
                              >
                                <CIcon icon={cilAddressBook} />
                              </CButton>
                              <CButton
                                size="sm"
                                color="secondary"
                                variant="outline"
                                onClick={() => {
                                  setToggleDetailAssessment(true)
                                  viewAssessment(val.assessment_id)
                                }}
                              >
                                <CIcon icon={cilMagnifyingGlass} />
                              </CButton>
                              <CButton
                                size="sm"
                                color="secondary"
                                variant="outline"
                                onClick={() => {
                                  setToggleEditAssessment(true)
                                  editAssessment(val.assessment_id)
                                }}
                              >
                                <CIcon icon={cilPencil} />
                              </CButton>
                              <CButton
                                size="sm"
                                color="danger"
                                variant="outline"
                                onClick={() => deleteAssessment(val.assessment_id)}
                              >
                                <CIcon icon={cilTrash} />
                              </CButton>
                            </CButtonGroup>
                          ) : role === 'user' ? (
                            <CButtonGroup>
                              {moment().isBefore(moment(val.assessment_start_date)) ? (
                                ''
                              ) : moment().isBetween(
                                  moment(val.assessment_start_date),
                                  moment(val.assessment_end_date),
                                ) ? (
                                <CButton
                                  size="sm"
                                  color="secondary"
                                  variant="outline"
                                  onClick={() => setToggleFormUser(true)}
                                >
                                  <CIcon icon={cilClipboard} />
                                </CButton>
                              ) : (
                                ''
                              )}
                            </CButtonGroup>
                          ) : (
                            ''
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            ) : (
              <CAlert color="danger">
                No assessment data available.
                <CButton color="link" onClick={() => setToggleCreateAssessment(true)}>
                  Add assessment
                </CButton>
              </CAlert>
            )}
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

AssessmentTable.propTypes = {
  assessmentlist: PropTypes.array.isRequired,
  setToggleCreateAssessment: PropTypes.func.isRequired,
  setToggleDetailAssessment: PropTypes.func.isRequired,
  deleteAssessment: PropTypes.func.isRequired,
  viewAssessment: PropTypes.func.isRequired,
  setToggleEditAssessment: PropTypes.func.isRequired,
  editAssessment: PropTypes.func,
  setToggleFormAdmin: PropTypes.func.isRequired,
  setToggleFormUser: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
}

export default AssessmentTable
