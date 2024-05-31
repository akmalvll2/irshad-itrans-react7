import React, { useState } from 'react'
import PropTypes from 'prop-types'
import img2 from '../../../assets/images/4.png'
import {
  CCard,
  CCardHeader,
  CButtonGroup,
  CButton,
  CCardBody,
  CFormSelect,
  CAlert,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CTableBody,
  CTableDataCell,
  CAvatar,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CCol,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilCheckAlt } from '@coreui/icons'

const IndividualDevelopmentPlan1 = ({
  stafflist,
  departmentlist,
  positionlist,
  jobcompetency,
  clusterlist,
  assessmentlist,
  assessmentresult,
  competencylist,
}) => {
  return (
    <>
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
            <h6>REPORT & ANALYSIS</h6>
          </center>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={4}>
              {/* SUBMISSION SUMMARY */}
              <CCard>
                <CCardHeader>Submission Summary</CCardHeader>
                <CTable small responsive bordered>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell rowSpan={2}>Department</CTableHeaderCell>
                      <CTableHeaderCell className="text-center" colSpan={3}>
                        Submission
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Self</CTableHeaderCell>
                      <CTableHeaderCell>Superior</CTableHeaderCell>
                      <CTableHeaderCell>Both</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {departmentlist
                      ?.filter((i) => i.department_name !== 'Board')
                      .map((val) => (
                        <CTableRow key={val.department_id}>
                          <CTableDataCell>{val.department_name}</CTableDataCell>
                          <CTableDataCell>
                            {
                              stafflist?.filter((i) =>
                                assessmentresult.some(
                                  (u) =>
                                    u.staff_id === i.staff_id &&
                                    u.department_id === val.department_id &&
                                    u.staff_assessor_type === 'self',
                                ),
                              ).length
                            }
                          </CTableDataCell>
                          <CTableDataCell>
                            {
                              stafflist?.filter((i) =>
                                assessmentresult.some(
                                  (u) =>
                                    u.staff_id === i.staff_id &&
                                    u.department_id === val.department_id &&
                                    u.staff_assessor_type === 'superior',
                                ),
                              ).length
                            }
                          </CTableDataCell>
                          <CTableDataCell>
                            {
                              stafflist?.filter(
                                (i) =>
                                  assessmentresult.some(
                                    (u) =>
                                      u.staff_id === i.staff_id &&
                                      u.department_id === val.department_id &&
                                      u.staff_assessor_type === 'self',
                                  ) &&
                                  assessmentresult.some(
                                    (u) =>
                                      u.staff_id === i.staff_id &&
                                      u.department_id === val.department_id &&
                                      u.staff_assessor_type === 'superior',
                                  ),
                              ).length
                            }
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                  </CTableBody>
                </CTable>
              </CCard>
            </CCol>
            <CCol md={8}>
              {/* RESULT SUMMARY */}
              <CCard>
                <CCardHeader>Result Summary</CCardHeader>
                <CTable small responsive bordered>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell rowSpan={2}>Competency</CTableHeaderCell>
                      <CTableHeaderCell className="text-center" colSpan={2}>
                        Number of Staff
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Total</CTableHeaderCell>
                      <CTableHeaderCell>Avg Gap &gt; 1.5</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell></CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

// PROPS VALIDATION
IndividualDevelopmentPlan1.propTypes = {
  stafflist: PropTypes.array.isRequired,
  departmentlist: PropTypes.array.isRequired,
  positionlist: PropTypes.array.isRequired,
  jobcompetency: PropTypes.array.isRequired,
  clusterlist: PropTypes.array.isRequired,
  assessmentlist: PropTypes.array.isRequired,
  assessmentresult: PropTypes.array.isRequired,
  competencylist: PropTypes.array.isRequired,
}

export default IndividualDevelopmentPlan1
