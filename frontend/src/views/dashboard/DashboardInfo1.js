import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

// IMPORT COREUI COMPONENT
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CAlert,
} from '@coreui/react'

const DashboardInfo1 = ({ assessmentlist }) => {
  return (
    <div>
      <CCard>
        <CCardHeader>
          <h6>Active Assessment</h6>
        </CCardHeader>
        <CCardBody>
          {assessmentlist.filter((i) =>
            moment().isBetween(moment(i.assessment_start_date), moment(i.assessment_end_date)),
          )?.length > 0 ? (
            <CTable small responsive borderless>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Assessment</CTableHeaderCell>
                  <CTableHeaderCell>Start Date</CTableHeaderCell>
                  <CTableHeaderCell>End Date</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {assessmentlist
                  .filter((i) =>
                    moment().isBetween(
                      moment(i.assessment_start_date),
                      moment(i.assessment_end_date),
                    ),
                  )
                  .map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{val.assessment_name}</CTableDataCell>
                        <CTableDataCell>
                          {moment(val.assessment_start_date).format('Do MMMM YYYY')}
                        </CTableDataCell>
                        <CTableDataCell>
                          {moment(val.assessment_end_date).format('Do MMMM YYYY')}
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
              </CTableBody>
            </CTable>
          ) : (
            <CAlert color="info">No Active Assessment</CAlert>
          )}
        </CCardBody>
      </CCard>
    </div>
  )
}

DashboardInfo1.propTypes = {
  assessmentlist: PropTypes.array.isRequired,
}

export default DashboardInfo1
