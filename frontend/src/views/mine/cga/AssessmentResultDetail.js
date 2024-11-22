import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MyContext from '../data/MyContext'
import { usePDF } from 'react-to-pdf'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CAvatar,
  CButtonGroup,
  CProgress,
  CProgressBar,
  CCardHeader,
  CSpinner,
  CCardFooter,
} from '@coreui/react'

// Icon
import CIcon from '@coreui/icons-react'
import { cilFile, cilWarning } from '@coreui/icons'

const AssessmentResultDetail = ({
  visible,
  setVisible,
  stafflist,
  jobcompetency,
  assessmentresultlist,
  selectedStaff,
}) => {
  const { cluster, loading } = useContext(MyContext)
  const [selectedCluster, setSelectedCluster] = useState()
  const selectedStaffData = stafflist.find((i) => i.staff_id === selectedStaff)
  const { toPDF, targetRef } = usePDF({
    filename: `Assessment_Result_${selectedStaffData?.staff_name}.pdf`,
  })

  const assessmentResult = (competencyid, type) => {
    const score = assessmentresultlist.find(
      (i) =>
        i.competency_id === competencyid &&
        i.staff_id === selectedStaff &&
        i.staff_assessor_type === type,
    )?.assessment_result_score

    const message = assessmentresultlist.find(
      (i) =>
        i.competency_id === competencyid &&
        i.staff_id === selectedStaff &&
        i.staff_assessor_type === type,
    )?.assessment_result_message

    return { score, message }
  }

  const roundedResult = (data) => {
    return data !== null ? Number(data.toFixed(2)) : null
  }

  const calculateTotalAverage = () => {
    const competencies = jobcompetency.filter(
      (i) => i.position_id === selectedStaffData?.position_id && i.cluster_id === selectedCluster,
    )
    const totalScores = competencies.reduce((total, val) => {
      const selfScore = assessmentResult(val.competency_id, 'self').score
      const superiorScore = assessmentResult(val.competency_id, 'superior').score
      const totalAverage =
        selfScore && superiorScore ? roundedResult(selfScore * 0.3 + superiorScore * 0.7) : null
      return totalAverage !== null ? total + totalAverage : total
    }, 0)
    const totalAveragePercentage = totalScores / competencies.length // Converts the score out of 5 to a percentage
    return roundedResult(totalAveragePercentage)
  }

  useEffect(() => {
    setSelectedCluster(cluster[0]?.cluster_id)
  }, [])

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

  const totalAveragePercentage = calculateTotalAverage()

  return (
    <>
      <CModal
        backdrop="static"
        size="xl"
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
      >
        <CModalHeader>
          <CModalTitle>Assessment Result Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCard ref={targetRef}>
            <CCardHeader>
              <h6 className="float-start">Staff Details</h6>
              <CButtonGroup className="float-end">
                <CButton size="sm" color="secondary" onClick={() => toPDF()}>
                  Save PDF <CIcon icon={cilFile} />
                </CButton>
              </CButtonGroup>
            </CCardHeader>
            <CCardBody>
              <CRow className="align-items-center">
                <CCol md={2}>
                  <CAvatar src={selectedStaffData?.staff_image} size="xl" />
                </CCol>
                <CCol md={10}>
                  <div>
                    <strong>Name:</strong> {selectedStaffData?.staff_name}
                  </div>
                  <div>
                    <strong>Position:</strong> {selectedStaffData?.position_name}
                  </div>
                  <div>
                    <strong>Department:</strong> {selectedStaffData?.department_name}
                  </div>
                </CCol>
              </CRow>
              <br />
              <h6 className="float-start">Result Details</h6>
              <hr />
              <CButtonGroup>
                {cluster?.map((val, key) => (
                  <CButton
                    size="sm"
                    variant="outline"
                    color="secondary"
                    key={key}
                    onClick={() => setSelectedCluster(val.cluster_id)}
                    active={selectedCluster === val.cluster_id}
                  >
                    {val.cluster_name}
                  </CButton>
                ))}
              </CButtonGroup>
              <br />
              <br />
              <CCard className="mb-4">
                <CCardBody className="text-center">
                  <h5>Average Score</h5>
                  <h2 className="text-primary">
                    {totalAveragePercentage ? `${totalAveragePercentage}` : 'N/A'}
                  </h2>
                </CCardBody>
              </CCard>
              <CTable small responsive bordered>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell rowSpan={2} className="align-middle">
                      Competency
                    </CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2} className="align-middle">
                      RCL
                    </CTableHeaderCell>
                    <CTableHeaderCell colSpan={2} className="text-center">
                      Result Summary
                    </CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2} className="align-middle">
                      Total Score
                    </CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2} className="align-middle">
                      Total Gap
                    </CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2} className="align-middle">
                      Remarks
                    </CTableHeaderCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell
                      style={{ width: '100px' }}
                      className="align-middle text-center"
                    >
                      Self
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      style={{ width: '100px' }}
                      className="align-middle text-center"
                    >
                      Superior
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {assessmentresultlist.filter((i) => i.staff_id === selectedStaff).length > 0 ? (
                  <CTableBody>
                    {jobcompetency
                      .filter(
                        (i) =>
                          i.position_id === selectedStaffData?.position_id &&
                          i.cluster_id === selectedCluster,
                      )
                      .map((val) => {
                        const selfScore = assessmentResult(val.competency_id, 'self').score
                        const superiorScore = assessmentResult(val.competency_id, 'superior').score
                        const selfMessage = assessmentResult(val.competency_id, 'self').message
                        const superiorMessage = assessmentResult(
                          val.competency_id,
                          'superior',
                        ).message
                        const totalAverage =
                          selfScore &&
                          superiorScore &&
                          assessmentresultlist[0].assessment_type === 'gap'
                            ? roundedResult(
                                5 -
                                  ((val.position_competency_expected_level - selfScore) * 0.3 +
                                    (val.position_competency_expected_level - superiorScore) * 0.7),
                              )
                            : selfScore &&
                              superiorScore &&
                              assessmentresultlist[0].assessment_type === 'rating'
                            ? roundedResult(selfScore * 0.3 + superiorScore * 0.7)
                            : null

                        const totalGap =
                          totalAverage !== null
                            ? roundedResult(5 - totalAverage)
                            : totalAverage !== null &&
                              assessmentresultlist[0].assessment_type === 'gap'
                            ? roundedResult(totalAverage)
                            : null

                        return (
                          <CTableRow key={val.competency_id}>
                            <CTableDataCell className="align-middle">
                              {val.competency_name}
                            </CTableDataCell>
                            <CTableDataCell className="align-middle text-center">
                              {val.position_competency_expected_level}
                            </CTableDataCell>
                            <CTableDataCell
                              style={{ width: '100px' }}
                              className="align-middle text-center"
                            >
                              {selfScore !== undefined ? (
                                <>
                                  <CProgress className="mb-2">
                                    <CProgressBar value={(selfScore / 5) * 100} color="success">
                                      {selfScore} / 5
                                    </CProgressBar>
                                  </CProgress>
                                </>
                              ) : (
                                <span className="text-danger">Incomplete</span>
                              )}
                            </CTableDataCell>
                            <CTableDataCell
                              style={{ width: '100px' }}
                              className="align-middle text-center"
                            >
                              {superiorScore !== undefined ? (
                                <>
                                  <CProgress className="mb-2">
                                    <CProgressBar value={(superiorScore / 5) * 100} color="success">
                                      {superiorScore} / 5
                                    </CProgressBar>
                                  </CProgress>
                                </>
                              ) : (
                                <span className="text-danger">Incomplete</span>
                              )}
                            </CTableDataCell>
                            <CTableDataCell className="align-middle text-center">
                              {totalAverage !== null ? (
                                `${totalAverage}`
                              ) : (
                                <span className="text-danger">Incomplete</span>
                              )}
                            </CTableDataCell>
                            <CTableDataCell className="align-middle text-center">
                              {totalGap !== null ? (
                                <span className={totalGap > 2.6 ? 'text-danger' : ''}>
                                  {totalGap} {totalGap > 2.6 ? <CIcon icon={cilWarning} /> : ''}
                                </span>
                              ) : (
                                <span className="text-danger">Incomplete</span>
                              )}
                            </CTableDataCell>
                            <CTableDataCell className="align-middle">
                              <b>Self : </b>
                              {selfMessage}
                              <br />
                              <b>Superior : </b>
                              {superiorMessage}
                            </CTableDataCell>
                          </CTableRow>
                        )
                      })}
                  </CTableBody>
                ) : (
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell colSpan={7} className="text-center">
                        No Assessment Data Available
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                )}
              </CTable>
            </CCardBody>
            <CCardFooter>
              <small>
                Note: The average percentage is calculated based on the weighted average of
                self-assessment and superior assessment scores.
              </small>
            </CCardFooter>
          </CCard>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

AssessmentResultDetail.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  stafflist: PropTypes.array,
  jobcompetency: PropTypes.array,
  assessmentresultlist: PropTypes.array,
  selectedStaff: PropTypes.number,
}

export default AssessmentResultDetail
