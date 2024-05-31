import React, { useState } from 'react'
import PropTypes from 'prop-types'
import img2 from '../../../assets/images/4.png'
import { usePDF } from 'react-to-pdf'
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

const ReportTable2 = ({
  stafflist,
  departmentlist,
  positionlist,
  jobcompetency,
  clusterlist,
  assessmentlist,
  assessmentresult,
  competencylist,
}) => {
  const { toPDF, targetRef } = usePDF({ filename: 'test.pdf' })
  const scoring = (staff_id, competency_id, type) => {
    var totalscore = 0
    var result = 0
    assessmentresult
      ?.filter(
        (i) =>
          i.staff_id === staff_id &&
          i.competency_id === competency_id &&
          i.staff_assessor_type === type,
      )
      .map((ar) => (totalscore += ar.assessment_result_score))
    result = (totalscore / 25) * 100
    return result
  }

  const generatePDF = () => {
    try {
      toPDF()
    } catch (err) {
      console.log(err)
    }
  }
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
          <CButton size="sm" onClick={generatePDF}>
            Save PDF
          </CButton>
          <CTable small responsive bordered ref={targetRef}>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell rowSpan={3}>Competency</CTableHeaderCell>
                <CTableHeaderCell colSpan={10} className="text-center">
                  Total Staff That Meet The Range Percentage
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell colSpan={2}>0% - 20%</CTableHeaderCell>
                <CTableHeaderCell colSpan={2}>21% - 40%</CTableHeaderCell>
                <CTableHeaderCell colSpan={2}>41% - 60%</CTableHeaderCell>
                <CTableHeaderCell colSpan={2}>61% - 80%</CTableHeaderCell>
                <CTableHeaderCell colSpan={2}>81% - 100%</CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>Self</CTableHeaderCell>
                <CTableHeaderCell>Superior</CTableHeaderCell>
                <CTableHeaderCell>Self</CTableHeaderCell>
                <CTableHeaderCell>Superior</CTableHeaderCell>
                <CTableHeaderCell>Self</CTableHeaderCell>
                <CTableHeaderCell>Superior</CTableHeaderCell>
                <CTableHeaderCell>Self</CTableHeaderCell>
                <CTableHeaderCell>Superior</CTableHeaderCell>
                <CTableHeaderCell>Self</CTableHeaderCell>
                <CTableHeaderCell>Superior</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {competencylist?.map((val) => (
                <CTableRow key={val.competency_id}>
                  <CTableDataCell>{val.competency_name}</CTableDataCell>
                  <CTableDataCell>
                    {
                      stafflist?.filter((i) =>
                        scoring(i.staff_id, val.competency_id, 'self') > 0 &&
                        scoring(i.staff_id, val.competency_id, 'self') < 21
                          ? true
                          : false,
                      ).length
                    }
                  </CTableDataCell>
                  <CTableDataCell>
                    {
                      stafflist?.filter((i) =>
                        scoring(i.staff_id, val.competency_id, 'superior') > 0 &&
                        scoring(i.staff_id, val.competency_id, 'superior') < 21
                          ? true
                          : false,
                      ).length
                    }
                  </CTableDataCell>
                  <CTableDataCell>
                    {
                      stafflist?.filter((i) =>
                        scoring(i.staff_id, val.competency_id, 'self') > 20 &&
                        scoring(i.staff_id, val.competency_id, 'self') < 41
                          ? true
                          : false,
                      ).length
                    }
                  </CTableDataCell>
                  <CTableDataCell>
                    {
                      stafflist?.filter((i) =>
                        scoring(i.staff_id, val.competency_id, 'superior') > 20 &&
                        scoring(i.staff_id, val.competency_id, 'superior') < 41
                          ? true
                          : false,
                      ).length
                    }
                  </CTableDataCell>
                  <CTableDataCell>
                    {
                      stafflist?.filter((i) =>
                        scoring(i.staff_id, val.competency_id, 'self') > 40 &&
                        scoring(i.staff_id, val.competency_id, 'self') < 61
                          ? true
                          : false,
                      ).length
                    }
                  </CTableDataCell>
                  <CTableDataCell>
                    {
                      stafflist?.filter((i) =>
                        scoring(i.staff_id, val.competency_id, 'superior') > 40 &&
                        scoring(i.staff_id, val.competency_id, 'superior') < 61
                          ? true
                          : false,
                      ).length
                    }
                  </CTableDataCell>
                  <CTableDataCell>
                    {
                      stafflist?.filter((i) =>
                        scoring(i.staff_id, val.competency_id, 'self') > 60 &&
                        scoring(i.staff_id, val.competency_id, 'self') < 81
                          ? true
                          : false,
                      ).length
                    }
                  </CTableDataCell>
                  <CTableDataCell>
                    {
                      stafflist?.filter((i) =>
                        scoring(i.staff_id, val.competency_id, 'superior') > 60 &&
                        scoring(i.staff_id, val.competency_id, 'superior') < 81
                          ? true
                          : false,
                      ).length
                    }
                  </CTableDataCell>
                  <CTableDataCell>
                    {
                      stafflist?.filter((i) =>
                        scoring(i.staff_id, val.competency_id, 'self') > 80 &&
                        scoring(i.staff_id, val.competency_id, 'self') < 101
                          ? true
                          : false,
                      ).length
                    }
                  </CTableDataCell>
                  <CTableDataCell>
                    {
                      stafflist?.filter((i) =>
                        scoring(i.staff_id, val.competency_id, 'superior') > 80 &&
                        scoring(i.staff_id, val.competency_id, 'superior') < 101
                          ? true
                          : false,
                      ).length
                    }
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol md={12}>
              {/* RESULT SUMMARY */}
              {stafflist
                ?.filter((i) => i.position_name.includes('EKSEKUTIF'))
                .map((val) => (
                  <CCard key={val.staff_id}>
                    <CCardHeader>
                      Staff Name: {val.staff_name} <br />
                      Position: {val.position_name} <br />
                      Department: {val.department_name} <br />
                    </CCardHeader>
                    <CTable small responsive bordered>
                      <CTableHead color="dark">
                        <CTableRow>
                          <CTableHeaderCell rowSpan={2}>Competency</CTableHeaderCell>
                          <CTableHeaderCell className="text-center" colSpan={2}>
                            Score
                          </CTableHeaderCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableHeaderCell>Self</CTableHeaderCell>
                          <CTableHeaderCell>Superior</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {competencylist
                          ?.filter((i) =>
                            jobcompetency.some(
                              (u) =>
                                i.competency_id === u.competency_id &&
                                u.position_id === val.position_id,
                            ),
                          )
                          .map((comp) => (
                            <CTableRow key={comp.competency_id}>
                              <CTableDataCell>{comp.competency_name}</CTableDataCell>
                              <CTableDataCell>
                                {scoring(val.staff_id, comp.competency_id, 'self')}%
                              </CTableDataCell>
                              <CTableDataCell>
                                {scoring(val.staff_id, comp.competency_id, 'superior')}%
                              </CTableDataCell>
                            </CTableRow>
                          ))}
                      </CTableBody>
                    </CTable>
                  </CCard>
                ))}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

// PROPS VALIDATION
ReportTable2.propTypes = {
  stafflist: PropTypes.array.isRequired,
  departmentlist: PropTypes.array.isRequired,
  positionlist: PropTypes.array.isRequired,
  jobcompetency: PropTypes.array.isRequired,
  clusterlist: PropTypes.array.isRequired,
  assessmentlist: PropTypes.array.isRequired,
  assessmentresult: PropTypes.array.isRequired,
  competencylist: PropTypes.array.isRequired,
}

export default ReportTable2
