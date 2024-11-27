import React, { useState, useContext, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CCol,
  CTableDataCell,
  CSpinner,
  CFormSelect,
} from '@coreui/react'

import MyContext from '../data/MyContext'

const ReportDepartment1 = () => {
  const {
    staff,
    competency,
    positionCompetency,
    assessment,
    assessmentResult,
    cluster,
    department,
    loading,
  } = useContext(MyContext)

  const [selectedDepartment, setSelectedDepartment] = useState()
  const [selectedAssessment, setSelectedAssessment] = useState()
  const [filteredStaff, setFilteredStaff] = useState(staff)
  const [selectedCluster, setSelectedCluster] = useState()

  const roundedResult = (data) => {
    return data !== null ? Number(data.toFixed(2)) : null
  }

  const relevantPositionIds = filteredStaff?.map((s) => s.position_id)
  const relevantCompetencyIds = positionCompetency
    ?.filter((pc) => relevantPositionIds.includes(pc.position_id))
    .map((pc) => pc.competency_id)

  const filteredCompetency = competency?.filter((c) =>
    relevantCompetencyIds.includes(c.competency_id),
  )

  const assessmentresult = (staffid, competencyid, type) => {
    const result = assessmentResult?.find(
      (i) =>
        i.competency_id === competencyid &&
        i.staff_id === staffid &&
        i.assessment_id.toString() === selectedAssessment &&
        i.staff_assessor_type === type,
    )
    return result
      ? {
          score: result.assessment_result_score,
          message: result.assessment_result_message,
        }
      : { score: null, message: null }
  }

  useEffect(() => {
    setFilteredStaff(staff?.filter((i) => i.department_id.toString() === selectedDepartment))
  }, [selectedDepartment])

  if (
    loading.staff ||
    loading.competency ||
    loading.positionCompetency ||
    loading.assessment ||
    loading.assessmentResult ||
    loading.cluster ||
    loading.department
  ) {
    return <CSpinner />
  }

  return (
    <>
      <CCard>
        <CCardHeader>Department Summary</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={3}>
              <CFormSelect size="sm" onChange={(e) => setSelectedAssessment(e.target.value)}>
                <option value="">..Choose Assessment..</option>
                {assessment?.map((val) => (
                  <option key={val.id} value={val.assessment_id}>
                    {val.assessment_name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CFormSelect size="sm" onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value="">..Choose Department..</option>
                {department?.map((val) => (
                  <option key={val.id} value={val.department_id}>
                    {val.department_name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CFormSelect size="sm" onChange={(e) => setSelectedCluster(e.target.value)}>
                <option value="">..Choose Group..</option>
                {cluster?.map((val, key) => (
                  <option key={key} value={val.cluster_id}>
                    {val.cluster_name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CTable small bordered responsive className="mt-2">
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell className="text-center align-middle text-dark">
                  {cluster?.find((i) => i.cluster_id.toString() === selectedCluster)?.cluster_name}
                </CTableHeaderCell>
                {filteredStaff?.map((val, key) => (
                  <CTableHeaderCell
                    key={key}
                    className="text-uppercase"
                    style={{ fontSize: '70%' }}
                  >
                    {val.staff_name}
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableBody>
            {cluster
              ?.filter((i) => i.cluster_id.toString() === selectedCluster)
              .map((cl, clkey) => (
                <CTableBody key={clkey}>
                  {filteredCompetency
                    ?.filter((i) => i.cluster_id === cl.cluster_id)
                    .map((cc, cckey) => (
                      <CTableRow key={cckey}>
                        <CTableDataCell
                          style={{
                            fontSize: '70%',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                          }}
                        >
                          {cc.competency_name}
                        </CTableDataCell>
                        {filteredStaff?.map((val, key) => {
                          const totalscore = roundedResult(
                            assessmentresult(val.staff_id, cc.competency_id, 'self').score * 0.3 +
                              assessmentresult(val.staff_id, cc.competency_id, 'superior').score *
                                0.7,
                          )

                          return (
                            <CTableDataCell
                              key={key}
                              className="text-center"
                              style={{ fontSize: '70%' }}
                            >
                              {totalscore ? <span>{totalscore}</span> : 'N/A'}
                            </CTableDataCell>
                          )
                        })}
                      </CTableRow>
                    ))}
                </CTableBody>
              ))}
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ReportDepartment1
