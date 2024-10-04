import React, { useContext, useState } from 'react'
import MyContext from '../mine/data/MyContext'
import moment from 'moment'
import { userType } from 'src/userType'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CWidgetStatsF,
  CCardTitle,
  CSpinner,
  CCardSubtitle,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButtonGroup,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilClipboard, cilWarning, cilCheckAlt, cilCircle } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'

const DbIdp = () => {
  const {
    staff,
    assessment,
    assessmentResult,
    department,
    cluster,
    positionCompetency,
    competency,
    position,
    company,
    loading,
  } = useContext(MyContext)

  const [selectedCluster, setSelectedCluster] = useState()

  const selectedCompany = company[0]

  const latestAssessment = assessment.reduce((latest, current) => {
    const currentEndDate = moment(current.assessment_end_date)
    const latestEndDate = moment(latest.assessment_end_date)

    return currentEndDate.isAfter(latestEndDate) ? current : latest
  }, assessment[0])
  const latestAssessmentResult = assessmentResult?.filter(
    (i) => i.assessment_id === latestAssessment?.assessment_id,
  )
  const selectedStaff = staff?.find((i) => i.staff_id.toString() === userType.id)
  const selectedPosition = positionCompetency?.filter(
    (i) => i.position_id === selectedStaff?.position_id,
  )

  const assessmentResultScore = (competencyid, type) => {
    const score = assessmentResult.find(
      (i) =>
        i.assessment_id === latestAssessment?.assessment_id &&
        i.competency_id === competencyid &&
        i.staff_id === selectedStaff?.staff_id &&
        i.staff_assessor_type === type,
    )?.assessment_result_score

    const message = assessmentResult.find(
      (i) =>
        i.assessment_id === latestAssessment?.assessment_id &&
        i.competency_id === competencyid &&
        i.staff_id === selectedStaff?.staff_id &&
        i.staff_assessor_type === type,
    )?.assessment_result_message

    return { score, message }
  }

  const roundedResult = (data) => {
    return data !== null ? Number(data.toFixed(2)) : null
  }

  if (
    loading.staff ||
    loading.assessment ||
    loading.assessmentResult ||
    loading.department ||
    loading.cluster ||
    loading.positionCompetency ||
    loading.competency ||
    loading.company ||
    loading.position
  ) {
    return <CSpinner />
  }

  return (
    <>
      <CCard className="my-2">
        <CCardHeader
          style={{
            backgroundColor: `${selectedCompany.company_system_primary_color}`,
            color: 'ghostwhite',
          }}
          className="text-center"
        >
          <CIcon icon={cilClipboard} /> INDIVIDUAL DEVELOPMENT PLAN
        </CCardHeader>
        <CCardBody>
          <CButtonGroup>
            {cluster?.map((val, key) => (
              <CButton
                variant="outline"
                color="secondary"
                className="mb-2"
                key={key}
                value={val.cluster_id}
                onClick={(e) => setSelectedCluster(e.target.value)}
              >
                {val.cluster_name}
              </CButton>
            ))}
          </CButtonGroup>
          <CTable small responsive strip bordered hover>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell rowSpan={2}>Competency</CTableHeaderCell>
                <CTableHeaderCell rowSpan={2}>RCL</CTableHeaderCell>
                <CTableHeaderCell rowSpan={2}>Self Score</CTableHeaderCell>
                <CTableHeaderCell rowSpan={2}>Superior Score</CTableHeaderCell>
                <CTableHeaderCell rowSpan={2} className="border-end-2">
                  Total
                </CTableHeaderCell>
                <CTableHeaderCell colSpan={4}>Development Strategy</CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>Training</CTableHeaderCell>
                <CTableHeaderCell>Coaching</CTableHeaderCell>
                <CTableHeaderCell>Self Learning</CTableHeaderCell>
                <CTableHeaderCell>Enhance Competency Through Working Experience</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {selectedPosition
                ?.filter((i) => i.cluster_id.toString() === selectedCluster)
                .map((com, comkey) => (
                  <CTableRow key={comkey}>
                    <CTableDataCell>{com.competency_name}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {com.position_competency_expected_level}
                    </CTableDataCell>
                    <CTableDataCell>
                      {assessmentResultScore(com.competency_id, 'self').score}(
                      {roundedResult(assessmentResultScore(com.competency_id, 'self').score * 0.3)})
                    </CTableDataCell>
                    <CTableDataCell>
                      {assessmentResultScore(com.competency_id, 'superior').score}(
                      {roundedResult(
                        assessmentResultScore(com.competency_id, 'superior').score * 0.7,
                      )}
                      )
                    </CTableDataCell>
                    <CTableDataCell className="border-end-2">
                      {roundedResult(
                        assessmentResultScore(com.competency_id, 'self').score * 0.3 +
                          assessmentResultScore(com.competency_id, 'superior').score * 0.7,
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {roundedResult(
                        assessmentResultScore(com.competency_id, 'self').score * 0.3 +
                          assessmentResultScore(com.competency_id, 'superior').score * 0.7,
                      ) < 2.4 ? (
                        <CIcon className="text-danger" icon={cilCheckAlt} />
                      ) : (
                        '...'
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {roundedResult(
                        assessmentResultScore(com.competency_id, 'self').score * 0.3 +
                          assessmentResultScore(com.competency_id, 'superior').score * 0.7,
                      ) < 3.5 ? (
                        <CIcon className="text-danger" icon={cilCheckAlt} />
                      ) : (
                        '...'
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {roundedResult(
                        assessmentResultScore(com.competency_id, 'self').score * 0.3 +
                          assessmentResultScore(com.competency_id, 'superior').score * 0.7,
                      ) < 4.5 ? (
                        <CIcon className="text-danger" icon={cilCheckAlt} />
                      ) : (
                        '...'
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CIcon className="text-danger" icon={cilCheckAlt} />
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default DbIdp
