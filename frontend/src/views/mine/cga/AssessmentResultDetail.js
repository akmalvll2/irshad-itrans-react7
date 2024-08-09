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
} from '@coreui/react'

// Icon
import CIcon from '@coreui/icons-react'
import { cilFile } from '@coreui/icons'

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

  const getProgressColor = (score, expectedLevel) => {
    const percentage = (score / expectedLevel) * 100
    if (percentage >= 90) {
      return 'success'
    } else if (percentage >= 60) {
      return 'warning'
    } else {
      return 'danger'
    }
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
              <CTable small responsive bordered>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell rowSpan={2}>Competency</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>Expected Level</CTableHeaderCell>
                    <CTableHeaderCell colSpan={2} className="text-center">
                      Result Summary
                    </CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>Total Average</CTableHeaderCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell className="text-center">Self</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Superior</CTableHeaderCell>
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
                          selfScore && superiorScore
                            ? roundedResult(
                                (selfScore * 0.3 + superiorScore * 0.7) /
                                  val.position_competency_expected_level,
                              )
                            : null

                        return (
                          <CTableRow key={val.competency_id}>
                            <CTableDataCell>{val.competency_name}</CTableDataCell>
                            <CTableDataCell>
                              {val.position_competency_expected_level}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {selfScore !== undefined ? (
                                <>
                                  <CProgress className="mb-2">
                                    <CProgressBar
                                      value={
                                        (selfScore / val.position_competency_expected_level) * 100
                                      }
                                      color={getProgressColor(
                                        selfScore,
                                        val.position_competency_expected_level,
                                      )}
                                    >
                                      {selfScore} / {val.position_competency_expected_level}
                                    </CProgressBar>
                                  </CProgress>
                                  <div>
                                    <b>Gap:</b> {val.position_competency_expected_level - selfScore}
                                  </div>
                                  <div>
                                    <b>Weighted:</b>{' '}
                                    {roundedResult(
                                      (val.position_competency_expected_level - selfScore) * 0.3,
                                    )}
                                  </div>
                                  <div>
                                    <b>Remarks:</b> {selfMessage}
                                  </div>
                                </>
                              ) : (
                                <span className="text-danger">Incomplete</span>
                              )}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {superiorScore !== undefined ? (
                                <>
                                  <CProgress className="mb-2">
                                    <CProgressBar
                                      value={
                                        (superiorScore / val.position_competency_expected_level) *
                                        100
                                      }
                                      color={getProgressColor(
                                        superiorScore,
                                        val.position_competency_expected_level,
                                      )}
                                    >
                                      {superiorScore} / {val.position_competency_expected_level}
                                    </CProgressBar>
                                  </CProgress>
                                  <div>
                                    <b>Gap:</b>{' '}
                                    {val.position_competency_expected_level - superiorScore}
                                  </div>
                                  <div>
                                    <b>Weighted:</b>{' '}
                                    {roundedResult(
                                      (val.position_competency_expected_level - superiorScore) *
                                        0.7,
                                    )}
                                  </div>
                                  <div>
                                    <b>Remarks:</b> {superiorMessage}
                                  </div>
                                </>
                              ) : (
                                <span className="text-danger">Incomplete</span>
                              )}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {totalAverage !== null ? (
                                `${totalAverage}%`
                              ) : (
                                <span className="text-danger">Incomplete</span>
                              )}
                            </CTableDataCell>
                          </CTableRow>
                        )
                      })}
                  </CTableBody>
                ) : (
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell colSpan={5} className="text-danger text-center">
                        No Data Available
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                )}
              </CTable>
            </CCardBody>
          </CCard>
        </CModalBody>
        <CModalFooter>
          <CButton
            size="sm"
            color="secondary"
            onClick={() => {
              setVisible(false)
            }}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

AssessmentResultDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  stafflist: PropTypes.array.isRequired,
  jobcompetency: PropTypes.array,
  assessmentresultlist: PropTypes.array.isRequired,
  selectedStaff: PropTypes.number,
}

export default AssessmentResultDetail
