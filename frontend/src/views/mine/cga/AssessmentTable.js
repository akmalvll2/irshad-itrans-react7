import React, { useContext } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import img2 from '../../../assets/images/4.png'
import MyContext from '../data/MyContext'
import {
  CSpinner,
  CCard,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCardBody,
  CRow,
  CCol,
  CAlert,
  CButtonGroup,
  CButton,
  CWidgetStatsF,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilSave,
  cilTrash,
  cilMagnifyingGlass,
  cilPencil,
  cilClipboard,
  cilCalendarCheck,
  cilLibrary,
} from '@coreui/icons'

const AssessmentTable = ({
  assessmentlist,
  setToggleCreateAssessment,
  deleteAssessment,
  setToggleDetailAssessment,
  viewAssessment,
  setToggleEditAssessment,
  setToggleFormUser,
  setToggleSubmissionTable,
  role,
}) => {
  const { loading, company } = useContext(MyContext)
  const selectedCompany = company[0]

  // Render loading spinner
  if (loading.company) {
    return <CSpinner />
  }

  // Helper function to render the status badge
  const renderBadge = (startDate, endDate) => {
    if (moment().isBefore(moment(startDate))) {
      return <CBadge color="info">Upcoming</CBadge>
    }
    if (moment().isBetween(moment(startDate), moment(endDate))) {
      return <CBadge color="success">Active</CBadge>
    }
    return <CBadge color="danger">Closed</CBadge>
  }

  // Helper function to render admin buttons
  const renderAdminButtons = (val) => (
    <>
      {moment().isBetween(moment(val.assessment_start_date), moment(val.assessment_end_date)) && (
        <CButton
          size="sm"
          color="success"
          onClick={() => {
            setToggleFormUser(true)
            viewAssessment(val.assessment_id)
          }}
        >
          <CIcon icon={cilClipboard} /> Start Assessment
        </CButton>
      )}
      <CButton
        size="sm"
        color="secondary"
        variant="outline"
        onClick={() => {
          setToggleSubmissionTable(true)
          viewAssessment(val.assessment_id)
        }}
      >
        <CIcon icon={cilCalendarCheck} />
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
          viewAssessment(val.assessment_id)
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
    </>
  )

  return (
    <div>
      <CCard>
        <CCardHeader
          style={{
            backgroundColor: selectedCompany?.company_system_primary_color || '#000',
            color: 'ghostwhite',
          }}
        >
          <CIcon icon={cilLibrary} /> ASSESSMENT
          {role === 'admin' && (
            <CButtonGroup className="float-end">
              <CButton size="sm" color="secondary" onClick={() => setToggleCreateAssessment(true)}>
                <CIcon icon={cilPlus} />
              </CButton>
              <CButton size="sm" color="secondary">
                <CIcon icon={cilSave} />
              </CButton>
            </CButtonGroup>
          )}
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol lg={4}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                title="TOTAL ASSESSMENT"
                value={assessmentlist.length}
              />
            </CCol>
          </CRow>
          {Array.isArray(assessmentlist) && assessmentlist.length > 0 ? (
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
                {assessmentlist.map((val, key) => (
                  <CTableRow key={key}>
                    <CTableDataCell>{key + 1}</CTableDataCell>
                    <CTableDataCell>{val.assessment_name}</CTableDataCell>
                    <CTableDataCell>
                      Start: <b>{moment(val.assessment_start_date).format('Do MMMM YYYY')}</b>
                      <br />
                      End: <b>{moment(val.assessment_end_date).format('Do MMMM YYYY')}</b>
                    </CTableDataCell>
                    <CTableDataCell>
                      {renderBadge(val.assessment_start_date, val.assessment_end_date)}
                    </CTableDataCell>
                    <CTableDataCell>
                      {role === 'admin' ? (
                        <CButtonGroup className="d-flex justify-content-center">
                          {renderAdminButtons(val)}
                        </CButtonGroup>
                      ) : (
                        <CButtonGroup>
                          {moment().isBetween(
                            moment(val.assessment_start_date),
                            moment(val.assessment_end_date),
                          ) && (
                            <CButton
                              size="sm"
                              color="success"
                              onClick={() => {
                                setToggleFormUser(true)
                                viewAssessment(val.assessment_id)
                              }}
                            >
                              <CIcon icon={cilClipboard} /> Start Assessment
                            </CButton>
                          )}
                          <CButton
                            size="sm"
                            color="secondary"
                            variant="outline"
                            onClick={() => {
                              setToggleSubmissionTable(true)
                              viewAssessment(val.assessment_id)
                            }}
                          >
                            <CIcon icon={cilCalendarCheck} />
                          </CButton>
                        </CButtonGroup>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          ) : (
            <CAlert color="danger">
              No assessment data available.
              {role === 'admin' && (
                <CButton color="link" onClick={() => setToggleCreateAssessment(true)}>
                  Add assessment
                </CButton>
              )}
            </CAlert>
          )}
        </CCardBody>
      </CCard>
    </div>
  )
}

AssessmentTable.propTypes = {
  assessmentlist: PropTypes.array.isRequired,
  setToggleCreateAssessment: PropTypes.func.isRequired,
  deleteAssessment: PropTypes.func.isRequired,
  setToggleDetailAssessment: PropTypes.func.isRequired,
  viewAssessment: PropTypes.func.isRequired,
  setToggleEditAssessment: PropTypes.func.isRequired,
  setToggleFormUser: PropTypes.func.isRequired,
  setToggleSubmissionTable: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
}

export default AssessmentTable
