import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import MyContext from '../mine/data/MyContext'

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
  CSpinner,
} from '@coreui/react'
import { userType } from 'src/userType'

const DashboardInfo1 = ({ assessmentlist }) => {
  const {
    staff,
    position,
    department,
    competency,
    cluster,
    assessment,
    assessmentResult,
    positionCompetency,
    loading,
  } = useContext(MyContext)

  if (
    loading.staff ||
    loading.position ||
    loading.department ||
    loading.competency ||
    loading.cluster ||
    loading.assessment ||
    loading.assessmentResult ||
    loading.positionCompetency
  ) {
    return <CSpinner />
  }
  return (
    <div>
      <CCard className=" m-2">
        <CCardHeader>ACTIVE ASSESSMENT</CCardHeader>
        <CCardBody>
          {assessmentlist.filter((i) =>
            moment().isBetween(moment(i.assessment_start_date), moment(i.assessment_end_date)),
          )?.length > 0 ? (
            <div>
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
              {userType}
              <CTable small responsive bordered>
                <CTableBody>
                  {staff?.filter((i) => i.staff_id === userType.id)}
                  <CTableRow>
                    <CTableDataCell></CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>
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
