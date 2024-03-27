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

const ReportTable1 = ({
  stafflist,
  departmentlist,
  positionlist,
  jobcompetency,
  clusterlist,
  assessmentlist,
  assessmentresult,
  competencylist,
}) => {
  const [activeKey, setActiveKey] = useState(1)

  // FILTER USESTATE
  const [assessment, setAssessment] = useState()
  const [group, setGroup] = useState()
  const [department, setDepartment] = useState()

  // ROUNDED RESULT
  const roundedNumber = (num) => {
    const fixNum = parseFloat(num)
    return fixNum.toFixed(1)
  }

  // SELF ASSESSMENT RESULT FUNCTION
  const selfAssessment = (staffid, competencyid, positionid) => {
    const result =
      (jobcompetency.find((i) => i.position_id === positionid && i.competency_id === competencyid)
        ?.position_competency_expected_level -
        assessmentresult.find(
          (i) =>
            i.staff_id === staffid &&
            i.assessment_id.toString() === assessment &&
            i.competency_id === competencyid &&
            i.staff_assessor_type === 'self',
        )?.assessment_result_score) *
      0.3

    if (result || result === 0) return roundedNumber(result)
    return 'N/A'
  }

  // SUPERIOR ASSESSMENT RESULT FUNCTION
  const superiorAssessment = (staffid, competencyid, positionid) => {
    const result =
      (jobcompetency.find((i) => i.position_id === positionid && i.competency_id === competencyid)
        ?.position_competency_expected_level -
        assessmentresult.find(
          (i) =>
            i.staff_id === staffid &&
            i.assessment_id.toString() === assessment &&
            i.competency_id === competencyid &&
            i.staff_assessor_type === 'superior',
        )?.assessment_result_score) *
      0.6

    if (result || result === 0) return roundedNumber(result)
    return 'N/A'
  }

  // SUBORDINATE ASSESSMENT RESULT FUNCTION
  const subordinateAssessment = (staffid, competencyid, positionid) => {
    const result =
      (assessmentresult
        .filter(
          (i) =>
            i.staff_id === staffid &&
            i.assessment_id.toString() === assessment &&
            i.competency_id === competencyid &&
            i.staff_assessor_type === 'subordinate',
        )
        .reduce(
          (acc, curr) =>
            acc +
            (jobcompetency.find(
              (i) => i.position_id === positionid && i.competency_id === competencyid,
            )?.position_competency_expected_level -
              curr.assessment_result_score),
          0,
        ) /
        assessmentresult.filter(
          (i) =>
            i.staff_id === staffid &&
            i.assessment_id.toString() === assessment &&
            i.competency_id === competencyid &&
            i.staff_assessor_type === 'subordinate',
        )?.length) *
      0.1

    if (result || result === 0) return roundedNumber(result)
    return 'N/A'
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
          <CCard>
            <CCardHeader>
              <h6>Report Filter</h6>
              <CRow>
                <CCol>
                  <CFormSelect
                    aria-label="Assessment"
                    size="sm"
                    name="assessmentid"
                    onChange={(e) => setAssessment(e.target.value)}
                  >
                    <option value="">..Assessment..</option>
                    {assessmentlist?.map((val, key) => {
                      return (
                        <option key={key} value={val.assessment_id}>
                          {val.assessment_name}
                        </option>
                      )
                    })}
                  </CFormSelect>
                </CCol>
                <CCol>
                  <CFormSelect
                    aria-label="Group"
                    size="sm"
                    name="clusterid"
                    onChange={(e) => setGroup(e.target.value)}
                  >
                    <option value="">..Group..</option>
                    {clusterlist?.map((val, key) => {
                      return (
                        <option key={key} value={val.cluster_id}>
                          {val.cluster_name}
                        </option>
                      )
                    })}
                  </CFormSelect>
                </CCol>
                <CCol>
                  <CFormSelect
                    aria-label="Department"
                    size="sm"
                    name="departmentid"
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="">..Department..</option>
                    {departmentlist?.map((val, key) => {
                      return (
                        <option key={key} value={val.department_id}>
                          {val.department_name}
                        </option>
                      )
                    })}
                  </CFormSelect>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              {group && department && assessment ? (
                <>
                  <h6>Staff with Average Gaps More Than 1.5</h6>
                  <CTable small responsive striped hover bordered>
                    <CTableHead color="dark">
                      <CTableRow>
                        <CTableHeaderCell rowSpan={2}>No</CTableHeaderCell>
                        <CTableHeaderCell rowSpan={2}>Competency</CTableHeaderCell>
                        <CTableHeaderCell
                          colSpan={
                            positionlist.filter((i) =>
                              stafflist.some(
                                (u) =>
                                  u.position_id === i.position_id &&
                                  u.department_id.toString() === department,
                              ),
                            )?.length
                          }
                        >
                          Number of Staff with Gap ( By Job Grade )
                        </CTableHeaderCell>
                        <CTableHeaderCell rowSpan={2}>
                          Total Number of Staff with Gap
                        </CTableHeaderCell>
                      </CTableRow>
                      <CTableRow>
                        {positionlist
                          .filter((i) =>
                            stafflist.some(
                              (u) =>
                                u.position_id === i.position_id &&
                                u.department_id.toString() === department,
                            ),
                          )
                          .map((val, key) => {
                            return (
                              <CTableHeaderCell key={key}>{val.position_grade}</CTableHeaderCell>
                            )
                          })}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {competencylist
                        .filter((i) => i.cluster_id.toString() === group)
                        .map((val, key) => {
                          return (
                            <CTableRow key={key}>
                              <CTableDataCell>{key + 1}</CTableDataCell>
                              <CTableDataCell>{val.competency_name}</CTableDataCell>
                              {positionlist
                                .filter((i) =>
                                  stafflist.some(
                                    (u) =>
                                      u.position_id === i.position_id &&
                                      u.department_id.toString() === department,
                                  ),
                                )
                                .map((val2, key2) => {
                                  return (
                                    <CTableDataCell key={key2}>
                                      {
                                        stafflist.filter(
                                          (i) =>
                                            i.department_id.toString() === department &&
                                            i.position_grade === val2.position_grade &&
                                            parseFloat(
                                              selfAssessment(
                                                i.staff_id,
                                                val.competency_id,
                                                i.position_id,
                                              ),
                                            ) +
                                              parseFloat(
                                                superiorAssessment(
                                                  i.staff_id,
                                                  val.competency_id,
                                                  i.position_id,
                                                ),
                                              ) +
                                              parseFloat(
                                                subordinateAssessment(
                                                  i.staff_id,
                                                  val.competency_id,
                                                  i.position_id,
                                                ),
                                              ) >
                                              1.4,
                                        )?.length
                                      }
                                    </CTableDataCell>
                                  )
                                })}
                              <CTableDataCell>
                                {
                                  stafflist.filter(
                                    (i) =>
                                      i.department_id.toString() === department &&
                                      parseFloat(
                                        selfAssessment(
                                          i.staff_id,
                                          val.competency_id,
                                          i.position_id,
                                        ),
                                      ) +
                                        parseFloat(
                                          superiorAssessment(
                                            i.staff_id,
                                            val.competency_id,
                                            i.position_id,
                                          ),
                                        ) +
                                        parseFloat(
                                          subordinateAssessment(
                                            i.staff_id,
                                            val.competency_id,
                                            i.position_id,
                                          ),
                                        ) >
                                        1.4,
                                  )?.length
                                }
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })}
                    </CTableBody>
                  </CTable>
                  <h6>Staff with Average Gaps More Than 0</h6>
                  <CTable small responsive striped hover bordered>
                    <CTableHead color="dark">
                      <CTableRow>
                        <CTableHeaderCell rowSpan={2}>No</CTableHeaderCell>
                        <CTableHeaderCell rowSpan={2}>Competency</CTableHeaderCell>
                        <CTableHeaderCell
                          colSpan={
                            positionlist.filter((i) =>
                              stafflist.some(
                                (u) =>
                                  u.position_id === i.position_id &&
                                  u.department_id.toString() === department,
                              ),
                            )?.length
                          }
                        >
                          Number of Staff with Gap ( By Job Grade )
                        </CTableHeaderCell>
                        <CTableHeaderCell rowSpan={2}>
                          Total Number of Staff with Gap
                        </CTableHeaderCell>
                      </CTableRow>
                      <CTableRow>
                        {positionlist
                          .filter((i) =>
                            stafflist.some(
                              (u) =>
                                u.position_id === i.position_id &&
                                u.department_id.toString() === department,
                            ),
                          )
                          .map((val, key) => {
                            return (
                              <CTableHeaderCell key={key}>{val.position_grade}</CTableHeaderCell>
                            )
                          })}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {competencylist
                        .filter((i) => i.cluster_id.toString() === group)
                        .map((val, key) => {
                          return (
                            <CTableRow key={key}>
                              <CTableDataCell>{key + 1}</CTableDataCell>
                              <CTableDataCell>{val.competency_name}</CTableDataCell>
                              {positionlist
                                .filter((i) =>
                                  stafflist.some(
                                    (u) =>
                                      u.position_id === i.position_id &&
                                      u.department_id.toString() === department,
                                  ),
                                )
                                .map((val2, key2) => {
                                  return (
                                    <CTableDataCell key={key2}>
                                      {
                                        stafflist.filter(
                                          (i) =>
                                            i.department_id.toString() === department &&
                                            i.position_grade === val2.position_grade &&
                                            parseFloat(
                                              selfAssessment(
                                                i.staff_id,
                                                val.competency_id,
                                                i.position_id,
                                              ),
                                            ) +
                                              parseFloat(
                                                superiorAssessment(
                                                  i.staff_id,
                                                  val.competency_id,
                                                  i.position_id,
                                                ),
                                              ) +
                                              parseFloat(
                                                subordinateAssessment(
                                                  i.staff_id,
                                                  val.competency_id,
                                                  i.position_id,
                                                ),
                                              ) >
                                              0,
                                        )?.length
                                      }
                                    </CTableDataCell>
                                  )
                                })}
                              <CTableDataCell>
                                {
                                  stafflist.filter(
                                    (i) =>
                                      i.department_id.toString() === department &&
                                      parseFloat(
                                        selfAssessment(
                                          i.staff_id,
                                          val.competency_id,
                                          i.position_id,
                                        ),
                                      ) +
                                        parseFloat(
                                          superiorAssessment(
                                            i.staff_id,
                                            val.competency_id,
                                            i.position_id,
                                          ),
                                        ) +
                                        parseFloat(
                                          subordinateAssessment(
                                            i.staff_id,
                                            val.competency_id,
                                            i.position_id,
                                          ),
                                        ) >
                                        0,
                                  )?.length
                                }
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })}
                    </CTableBody>
                  </CTable>
                </>
              ) : (
                <CAlert className="my-2" color="info">
                  Please choose from the filter options to view result
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCardBody>
      </CCard>
    </>
  )
}

// PROPS VALIDATION
ReportTable1.propTypes = {
  stafflist: PropTypes.array.isRequired,
  departmentlist: PropTypes.array.isRequired,
  positionlist: PropTypes.array.isRequired,
  jobcompetency: PropTypes.array.isRequired,
  clusterlist: PropTypes.array.isRequired,
  assessmentlist: PropTypes.array.isRequired,
  assessmentresult: PropTypes.array.isRequired,
  competencylist: PropTypes.array.isRequired,
}

export default ReportTable1
