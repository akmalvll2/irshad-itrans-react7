import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import img2 from '../../../assets/images/4.png'
import MyContext from '../data/MyContext'
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
  CSpinner,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilCheckAlt, cilLibrary } from '@coreui/icons'

const IdpTable1 = ({
  stafflist,
  departmentlist,
  jobcompetency,
  assessmentlist,
  assessmentresult,
}) => {
  const { loading, company } = useContext(MyContext)
  const [selectedDepartment, setSelectedDepartment] = useState()
  const [selectedAssessment, setSelectedAssessment] = useState()

  const handleSelectAssessment = (assessmentid) => {
    setSelectedAssessment(assessmentid)
  }

  const handleSelectDepartment = (departmentid) => {
    setSelectedDepartment(departmentid)
  }

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
            i.assessment_id.toString() === selectedAssessment &&
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
            i.assessment_id.toString() === selectedAssessment &&
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
            i.assessment_id.toString() === selectedAssessment &&
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
            i.assessment_id.toString() === selectedAssessment &&
            i.competency_id === competencyid &&
            i.staff_assessor_type === 'subordinate',
        )?.length) *
      0.1

    if (result || result === 0) return roundedNumber(result)
    return 'N/A'
  }

  const selectedCompany = company[0]

  if (loading.company) <CSpinner />
  return (
    <>
      <CCard>
        <CCardHeader
          /*style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'navy',
          }}*/
          style={{
            backgroundColor: `${selectedCompany?.company_system_primary_color}`,
            color: 'ghostwhite',
          }}
        >
          <CIcon icon={cilLibrary} /> INDIVIDUAL DEVELOPMENT PLAN
        </CCardHeader>
        <CCardBody>
          <CAlert className="my-0" color="secondary">
            <h6>FILTER</h6>
            <CFormSelect
              aria-label="Assessment"
              size="sm"
              name="assessmentid"
              onChange={(e) => handleSelectAssessment(e.target.value)}
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
            <CFormSelect
              aria-label="Department"
              size="sm"
              name="departmentid"
              onChange={(e) => handleSelectDepartment(e.target.value)}
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
          </CAlert>
        </CCardBody>
        {selectedDepartment && selectedAssessment ? (
          <CAccordion alwaysOpen>
            {stafflist
              .filter((i) => i.department_id.toString() === selectedDepartment)
              .map((val, key) => {
                return (
                  <CAccordionItem key={key} itemKey={key + 1}>
                    <CAccordionHeader>
                      <CAvatar src={val.staff_image} size="lg" className="mx-2" /> {val.staff_name}{' '}
                      <br />
                      {val.position_name}
                    </CAccordionHeader>
                    <CAccordionBody>
                      <CTable small responsive striped bordered hover>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell rowSpan={2}>Competency</CTableHeaderCell>
                            <CTableHeaderCell rowSpan={2}>RCL</CTableHeaderCell>
                            <CTableHeaderCell rowSpan={2}>Self</CTableHeaderCell>
                            <CTableHeaderCell rowSpan={2}>Superior</CTableHeaderCell>
                            <CTableHeaderCell rowSpan={2}>Subordinate</CTableHeaderCell>
                            <CTableHeaderCell rowSpan={2}>Total</CTableHeaderCell>
                            <CTableHeaderCell colSpan={4}>Development Strategy</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableHeaderCell>Training</CTableHeaderCell>
                            <CTableHeaderCell>Coaching</CTableHeaderCell>
                            <CTableHeaderCell>Self Learning</CTableHeaderCell>
                            <CTableHeaderCell>
                              Enhance Competency Through Working Experience
                            </CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {jobcompetency
                            .filter((i) => i.position_id === val.position_id)
                            .map((jc, jckey) => {
                              return (
                                <CTableRow key={jckey}>
                                  <CTableDataCell>{jc.competency_name}</CTableDataCell>
                                  <CTableDataCell>
                                    {jc.position_competency_expected_level}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {selfAssessment(
                                      val.staff_id,
                                      jc.competency_id,
                                      val.position_id,
                                    )}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {superiorAssessment(
                                      val.staff_id,
                                      jc.competency_id,
                                      val.position_id,
                                    )}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {subordinateAssessment(
                                      val.staff_id,
                                      jc.competency_id,
                                      val.position_id,
                                    )}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {roundedNumber(
                                      parseFloat(
                                        selfAssessment(
                                          val.staff_id,
                                          jc.competency_id,
                                          val.position_id,
                                        ) ?? 0,
                                      ) +
                                        parseFloat(
                                          superiorAssessment(
                                            val.staff_id,
                                            jc.competency_id,
                                            val.position_id,
                                          ) ?? 0,
                                        ) /* +
                                        parseFloat(
                                          subordinateAssessment(
                                            val.staff_id,
                                            jc.competency_id,
                                            val.position_id,
                                          ) ?? 0.1,
                                        )*/,
                                    )}
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    {parseFloat(
                                      selfAssessment(
                                        val.staff_id,
                                        jc.competency_id,
                                        val.position_id,
                                      ),
                                    ) +
                                      parseFloat(
                                        superiorAssessment(
                                          val.staff_id,
                                          jc.competency_id,
                                          val.position_id,
                                        ),
                                      ) /*+
                                      parseFloat(
                                        subordinateAssessment(
                                          val.staff_id,
                                          jc.competency_id,
                                          val.position_id,
                                        ),
                                      )*/ >
                                    1.4 ? (
                                      <CIcon className=" text-success" icon={cilCheckAlt} />
                                    ) : (
                                      ''
                                    )}
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    {parseFloat(
                                      selfAssessment(
                                        val.staff_id,
                                        jc.competency_id,
                                        val.position_id,
                                      ),
                                    ) +
                                      parseFloat(
                                        superiorAssessment(
                                          val.staff_id,
                                          jc.competency_id,
                                          val.position_id,
                                        ),
                                      ) /*+
                                      parseFloat(
                                        subordinateAssessment(
                                          val.staff_id,
                                          jc.competency_id,
                                          val.position_id,
                                        ),
                                      )*/ >
                                    0.5 ? (
                                      <CIcon className=" text-success" icon={cilCheckAlt} />
                                    ) : (
                                      ''
                                    )}
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    {parseFloat(
                                      selfAssessment(
                                        val.staff_id,
                                        jc.competency_id,
                                        val.position_id,
                                      ),
                                    ) +
                                      parseFloat(
                                        superiorAssessment(
                                          val.staff_id,
                                          jc.competency_id,
                                          val.position_id,
                                        ),
                                      ) /*+
                                      parseFloat(
                                        subordinateAssessment(
                                          val.staff_id,
                                          jc.competency_id,
                                          val.position_id,
                                        ),
                                      )*/ >
                                    0 ? (
                                      <CIcon className=" text-success" icon={cilCheckAlt} />
                                    ) : (
                                      ''
                                    )}
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    <CIcon className=" text-success" icon={cilCheckAlt} />
                                  </CTableDataCell>
                                </CTableRow>
                              )
                            })}
                        </CTableBody>
                      </CTable>
                    </CAccordionBody>
                  </CAccordionItem>
                )
              })}
          </CAccordion>
        ) : (
          <CCardBody>
            <CAlert color="info">Please filter the options available to view result</CAlert>
          </CCardBody>
        )}
      </CCard>
    </>
  )
}

// PROPS VALIDATION
IdpTable1.propTypes = {
  stafflist: PropTypes.array.isRequired,
  departmentlist: PropTypes.array.isRequired,
  jobcompetency: PropTypes.array.isRequired,
  assessmentlist: PropTypes.array.isRequired,
  assessmentresult: PropTypes.array.isRequired,
}

export default IdpTable1
