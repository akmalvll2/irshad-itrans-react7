import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import img2 from '../../assets/images/4.png'

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
  CBadge,
} from '@coreui/react'
import { userType } from 'src/userType'
import CIcon from '@coreui/icons-react'
import { cilClipboard } from '@coreui/icons'

const DashboardInfo1 = ({ assessmentlist }) => {
  const {
    staff,
    staffAssessor,
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
    loading.staffAssessor ||
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
      <CCard className=" my-2">
        <CCardHeader
          /*style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'navy',
            textAlign: 'center',
          }}*/
          style={{ backgroundColor: '#3b5998', color: 'ghostwhite' }}
        >
          <CIcon icon={cilClipboard} /> ACTIVE ASSESSMENT
        </CCardHeader>
        {assessmentlist.filter((i) =>
          moment().isBetween(moment(i.assessment_start_date), moment(i.assessment_end_date)),
        )?.length > 0 ? (
          <div>
            <CRow>
              <CCol>
                <CCardBody>
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
                </CCardBody>
              </CCol>
              <CCol>
                {userType?.role !== 'admin' ? (
                  <CCardBody>
                    <center>
                      <h6>Your Assessment Task</h6>
                    </center>
                    <CTable small responsive bordered className="m-0">
                      <CTableHead color="dark">
                        <CTableRow>
                          <CTableHeaderCell>Assessment For</CTableHeaderCell>
                          <CTableHeaderCell>Status</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {staff
                          ?.filter((i) =>
                            staffAssessor.some(
                              (u) =>
                                u.staff_id === i.staff_id &&
                                u.assessor_id.toString() === userType?.id,
                            ),
                          )
                          .map((val, key) => (
                            <CTableRow key={key}>
                              <CTableDataCell>{val.staff_name}</CTableDataCell>
                              <CTableDataCell>
                                {assessmentResult?.filter(
                                  (i) =>
                                    moment().isBetween(
                                      moment(i.assessment_start_date),
                                      moment(i.assessment_end_date),
                                    ) &&
                                    i.assessor_id.toString() === userType?.id &&
                                    i.staff_id === val.staff_id,
                                ).length > 0 ? (
                                  <CBadge color="info">Complete</CBadge>
                                ) : (
                                  <CBadge color="danger">Incomplete</CBadge>
                                )}
                              </CTableDataCell>
                            </CTableRow>
                          ))}
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                ) : null}
              </CCol>
            </CRow>
          </div>
        ) : (
          <CAlert color="info">No Active Assessment</CAlert>
        )}
      </CCard>
    </div>
  )
}

DashboardInfo1.propTypes = {
  assessmentlist: PropTypes.array.isRequired,
}

export default DashboardInfo1
