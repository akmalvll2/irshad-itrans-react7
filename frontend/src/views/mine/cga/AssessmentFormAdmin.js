import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormSelect,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CAlert,
  CBadge,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCardHeader,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CAvatar,
} from '@coreui/react'

const AssessmentFormAdmin = ({
  visible,
  setVisible,
  stafflist,
  jobcompetency,
  assessmentresultlist,
  assessmentid,
  assessors,
}) => {
  const [selectedStaff, setSelectedStaff] = useState()
  const [activeKey, setActiveKey] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  const roundedNumber = (num) => {
    const fixNum = parseFloat(num)
    return fixNum.toFixed(1)
  }
  return (
    <>
      <CModal
        backdrop="static"
        size="lg"
        visible={visible}
        onClose={() => {
          setVisible(false)
          setSelectedStaff('')
        }}
      >
        <CForm onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>Assessment Form Review</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormSelect
              label="Please choose assessed individual"
              size="sm"
              name="staffid"
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option>..Choose Staff..</option>
              {stafflist?.map((val, key) => {
                return (
                  <option key={key} value={val.staff_id}>
                    {val.staff_name}
                  </option>
                )
              })}
            </CFormSelect>

            {stafflist
              ?.filter((fil) => fil.staff_id.toString() === selectedStaff)
              .map((val, key) => {
                return (
                  <CCard key={key} className="my-2">
                    <CCardHeader>
                      <CAlert color="secondary">
                        <CRow>
                          <CCol xs={2}>
                            <CAvatar src={val.staff_image} size="xl" />
                          </CCol>
                          <CCol xs={10}>
                            {val.staff_name}
                            <br />
                            {val.position_name}
                            <br />
                            {val.department_name}
                          </CCol>
                        </CRow>
                      </CAlert>
                      <CNav variant="tabs" className="card-header-tabs">
                        <CNavItem>
                          <CNavLink
                            active={activeKey === 1}
                            component="button"
                            role="tab"
                            aria-controls="home-tab-pane"
                            aria-selected={activeKey === 1}
                            onClick={(e) => {
                              e.preventDefault()
                              setActiveKey(1)
                            }}
                          >
                            Competency
                          </CNavLink>
                        </CNavItem>
                        <CNavItem>
                          <CNavLink
                            active={activeKey === 2}
                            component="button"
                            role="tab"
                            aria-controls="home-tab-pane"
                            aria-selected={activeKey === 2}
                            onClick={(e) => {
                              e.preventDefault()
                              setActiveKey(2)
                            }}
                          >
                            Self
                          </CNavLink>
                        </CNavItem>
                        <CNavItem>
                          <CNavLink
                            active={activeKey === 3}
                            component="button"
                            role="tab"
                            aria-controls="profile-tab-pane"
                            aria-selected={activeKey === 3}
                            onClick={(e) => {
                              e.preventDefault()
                              setActiveKey(3)
                            }}
                          >
                            Superior
                          </CNavLink>
                        </CNavItem>
                        <CNavItem>
                          <CNavLink
                            active={activeKey === 4}
                            component="button"
                            role="tab"
                            aria-controls="profile-tab-pane"
                            aria-selected={activeKey === 4}
                            onClick={(e) => {
                              e.preventDefault()
                              setActiveKey(4)
                            }}
                          >
                            Subordinate/Peers
                          </CNavLink>
                        </CNavItem>
                        <CNavItem>
                          <CNavLink
                            active={activeKey === 5}
                            component="button"
                            role="tab"
                            aria-controls="profile-tab-pane"
                            aria-selected={activeKey === 5}
                            onClick={(e) => {
                              e.preventDefault()
                              setActiveKey(5)
                            }}
                          >
                            Summary
                          </CNavLink>
                        </CNavItem>
                      </CNav>
                    </CCardHeader>
                    <CCardBody>
                      <CTabContent>
                        <CTabPane
                          role="tabpanel"
                          aria-labelledby="home-tab-pane"
                          visible={activeKey === 1}
                        >
                          {jobcompetency.filter((i) => i.position_id === val.position_id).length >
                          0 ? (
                            <CTable small responsive striped borderless>
                              <CTableHead color="dark">
                                <CTableRow>
                                  <CTableHeaderCell>No</CTableHeaderCell>
                                  <CTableHeaderCell>Competency</CTableHeaderCell>
                                  <CTableHeaderCell>Expected Level</CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                {jobcompetency
                                  .filter((i) => i.position_id === val.position_id)
                                  .map((val2, key2) => {
                                    return (
                                      <CTableRow key={key2}>
                                        <CTableDataCell>{key2 + 1}</CTableDataCell>
                                        <CTableDataCell>{val2.competency_name}</CTableDataCell>
                                        <CTableDataCell>
                                          {val2.position_competency_expected_level}
                                        </CTableDataCell>
                                      </CTableRow>
                                    )
                                  })}
                              </CTableBody>
                            </CTable>
                          ) : (
                            <CAlert className="my-0" color="danger">
                              No Data Available
                            </CAlert>
                          )}
                        </CTabPane>
                        <CTabPane
                          role="tabpanel"
                          aria-labelledby="home-tab-pane"
                          visible={activeKey === 2}
                        >
                          {assessmentresultlist.filter(
                            (i) =>
                              i.staff_id.toString() === selectedStaff &&
                              i.staff_assessor_type === 'self' &&
                              i.assessment_id === assessmentid,
                          ).length > 0 ? (
                            <CTable small responsive striped borderless>
                              <CTableHead color="dark">
                                <CTableRow>
                                  <CTableDataCell colSpan={6}>
                                    {stafflist
                                      .filter((i) =>
                                        assessors.some(
                                          (u) =>
                                            u.staff_id.toString() === selectedStaff &&
                                            u.assessor_id === i.staff_id &&
                                            u.staff_assessor_type === 'self',
                                        ),
                                      )
                                      .map((val, key) => {
                                        return (
                                          <div key={key}>
                                            Assessor: <CAvatar src={val.staff_image} size="sm" />
                                            {val.staff_name}
                                          </div>
                                        )
                                      })}
                                  </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                  <CTableHeaderCell>No</CTableHeaderCell>
                                  <CTableHeaderCell>Competency</CTableHeaderCell>
                                  <CTableHeaderCell>Expected Level</CTableHeaderCell>
                                  <CTableHeaderCell>Score</CTableHeaderCell>
                                  <CTableHeaderCell>Gap</CTableHeaderCell>
                                  <CTableHeaderCell>Remarks</CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                {assessmentresultlist
                                  .filter(
                                    (i) =>
                                      i.staff_id.toString() === selectedStaff &&
                                      i.staff_assessor_type === 'self' &&
                                      i.assessment_id === assessmentid,
                                  )
                                  .map((val2, key2) => {
                                    return (
                                      <CTableRow key={key2}>
                                        <CTableDataCell>{key2 + 1}</CTableDataCell>
                                        <CTableDataCell>{val2.competency_name}</CTableDataCell>
                                        <CTableDataCell>
                                          {
                                            jobcompetency.find(
                                              (i) =>
                                                i.position_id === val.position_id &&
                                                i.competency_id === val2.competency_id,
                                            ).position_competency_expected_level
                                          }
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {val2.assessment_result_score}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {jobcompetency.find(
                                            (i) =>
                                              i.position_id === val.position_id &&
                                              i.competency_id === val2.competency_id,
                                          ).position_competency_expected_level -
                                            val2.assessment_result_score}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {val2.assessment_result_message}
                                        </CTableDataCell>
                                      </CTableRow>
                                    )
                                  })}
                              </CTableBody>
                            </CTable>
                          ) : (
                            <CAlert className="my-0" color="danger">
                              No Data Available
                            </CAlert>
                          )}
                        </CTabPane>
                        <CTabPane
                          role="tabpanel"
                          aria-labelledby="home-tab-pane"
                          visible={activeKey === 3}
                        >
                          {assessmentresultlist.filter(
                            (i) =>
                              i.staff_id.toString() === selectedStaff &&
                              i.staff_assessor_type === 'superior' &&
                              i.assessment_id === assessmentid,
                          ).length > 0 ? (
                            <CTable small responsive striped borderless>
                              <CTableHead color="dark">
                                <CTableRow>
                                  <CTableDataCell colSpan={6}>
                                    {stafflist
                                      .filter((i) =>
                                        assessors.some(
                                          (u) =>
                                            u.staff_id.toString() === selectedStaff &&
                                            u.assessor_id === i.staff_id &&
                                            u.staff_assessor_type === 'superior',
                                        ),
                                      )
                                      .map((val, key) => {
                                        return (
                                          <div key={key}>
                                            Assessor: <CAvatar src={val.staff_image} size="sm" />
                                            {val.staff_name}
                                          </div>
                                        )
                                      })}
                                  </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                  <CTableHeaderCell>No</CTableHeaderCell>
                                  <CTableHeaderCell>Competency</CTableHeaderCell>
                                  <CTableHeaderCell>Expected Level</CTableHeaderCell>
                                  <CTableHeaderCell>Score</CTableHeaderCell>
                                  <CTableHeaderCell>Gap</CTableHeaderCell>
                                  <CTableHeaderCell>Remarks</CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                {assessmentresultlist
                                  .filter(
                                    (i) =>
                                      i.staff_id.toString() === selectedStaff &&
                                      i.staff_assessor_type === 'superior' &&
                                      i.assessment_id === assessmentid,
                                  )
                                  .map((val2, key2) => {
                                    return (
                                      <CTableRow key={key2}>
                                        <CTableDataCell>{key2 + 1}</CTableDataCell>
                                        <CTableDataCell>{val2.competency_name}</CTableDataCell>
                                        <CTableDataCell>
                                          {
                                            jobcompetency.find(
                                              (i) =>
                                                i.position_id === val.position_id &&
                                                i.competency_id === val2.competency_id,
                                            )?.position_competency_expected_level
                                          }
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {val2.assessment_result_score}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {jobcompetency.find(
                                            (i) =>
                                              i.position_id === val.position_id &&
                                              i.competency_id === val2.competency_id,
                                          ).position_competency_expected_level -
                                            val2.assessment_result_score}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {val2.assessment_result_message}
                                        </CTableDataCell>
                                      </CTableRow>
                                    )
                                  })}
                              </CTableBody>
                            </CTable>
                          ) : (
                            <CAlert className="my-0" color="danger">
                              No Data Available
                            </CAlert>
                          )}
                        </CTabPane>
                        <CTabPane
                          role="tabpanel"
                          aria-labelledby="home-tab-pane"
                          visible={activeKey === 4}
                        >
                          {stafflist.filter((i) =>
                            assessors.some(
                              (u) =>
                                u.staff_id.toString() === selectedStaff &&
                                u.assessor_id === i.staff_id &&
                                u.staff_assessor_type === 'subordinate',
                            ),
                          ).length > 0 ? (
                            stafflist
                              .filter((i) =>
                                assessors.some(
                                  (u) =>
                                    u.staff_id.toString() === selectedStaff &&
                                    u.assessor_id === i.staff_id &&
                                    u.staff_assessor_type === 'subordinate',
                                ),
                              )
                              .map((val2, key2) => {
                                return (
                                  <CTable key={key2} small striped responsive bordered>
                                    <CTableHead color="dark">
                                      <CTableRow>
                                        <CTableHeaderCell colSpan={5}>
                                          Assessor: <CAvatar src={val2.staff_image} size="sm" />{' '}
                                          {val2.staff_name}
                                        </CTableHeaderCell>
                                      </CTableRow>
                                      <CTableRow>
                                        <CTableHeaderCell>Competency</CTableHeaderCell>
                                        <CTableHeaderCell>Expected Level</CTableHeaderCell>
                                        <CTableHeaderCell>Score</CTableHeaderCell>
                                        <CTableHeaderCell>Gap</CTableHeaderCell>
                                        <CTableHeaderCell>Remarks</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                      {assessmentresultlist
                                        .filter(
                                          (i) =>
                                            i.assessment_id === assessmentid &&
                                            i.staff_id.toString() === selectedStaff &&
                                            i.assessor_id === val2.staff_id,
                                        )
                                        .map((val3, key3) => {
                                          return (
                                            <CTableRow key={key3}>
                                              <CTableDataCell>
                                                {val3.competency_name}
                                              </CTableDataCell>
                                              <CTableDataCell>
                                                {
                                                  jobcompetency.find(
                                                    (i) =>
                                                      i.position_id === val.position_id &&
                                                      i.competency_id === val3.competency_id,
                                                  )?.position_competency_expected_level
                                                }
                                              </CTableDataCell>
                                              <CTableDataCell>
                                                {val3.assessment_result_score}
                                              </CTableDataCell>
                                              <CTableDataCell>
                                                {jobcompetency.find(
                                                  (i) =>
                                                    i.position_id === val.position_id &&
                                                    i.competency_id === val3.competency_id,
                                                )?.position_competency_expected_level -
                                                  val3.assessment_result_score}
                                              </CTableDataCell>
                                              <CTableDataCell>
                                                {val3.assessment_result_message}
                                              </CTableDataCell>
                                            </CTableRow>
                                          )
                                        })}
                                    </CTableBody>
                                  </CTable>
                                )
                              })
                          ) : (
                            <CAlert className="my-0" color="danger">
                              No Data Available
                            </CAlert>
                          )}
                        </CTabPane>
                        <CTabPane
                          role="tabpanel"
                          aria-labelledby="home-tab-pane"
                          visible={activeKey === 5}
                        >
                          {jobcompetency.filter((i) => i.position_id === val.position_id).length >
                          0 ? (
                            <CTable small striped responsive bordered>
                              <CTableHead color="dark">
                                <CTableRow>
                                  <CTableHeaderCell rowSpan={2}>Competency</CTableHeaderCell>
                                  <CTableHeaderCell rowSpan={2}>Expected Level</CTableHeaderCell>
                                  <CTableHeaderCell colSpan={2}>Self</CTableHeaderCell>
                                  <CTableHeaderCell colSpan={2}>Superior</CTableHeaderCell>
                                  <CTableHeaderCell colSpan={2}>Subordinate/Peers</CTableHeaderCell>
                                  <CTableHeaderCell rowSpan={2}>Total Average</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                  <CTableDataCell>Score</CTableDataCell>
                                  <CTableDataCell>30%</CTableDataCell>
                                  <CTableDataCell>Score</CTableDataCell>
                                  <CTableDataCell>60%</CTableDataCell>
                                  <CTableDataCell>Score</CTableDataCell>
                                  <CTableDataCell>10%</CTableDataCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                {jobcompetency
                                  .filter((i) => i.position_id === val.position_id)
                                  .map((val2, key2) => {
                                    return (
                                      <CTableRow key={key2}>
                                        <CTableDataCell>{val2.competency_name}</CTableDataCell>
                                        <CTableDataCell>
                                          {val2.position_competency_expected_level}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {
                                            //SELF SCORE
                                            assessmentresultlist.find(
                                              (i) =>
                                                i.assessment_id === assessmentid &&
                                                i.staff_id.toString() === selectedStaff &&
                                                i.staff_assessor_type === 'self' &&
                                                i.competency_id === val2.competency_id,
                                            )?.assessment_result_score
                                              ? assessmentresultlist.find(
                                                  (i) =>
                                                    i.assessment_id === assessmentid &&
                                                    i.staff_id.toString() === selectedStaff &&
                                                    i.staff_assessor_type === 'self' &&
                                                    i.competency_id === val2.competency_id,
                                                )?.assessment_result_score
                                              : 'N/A'
                                          }
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {
                                            //SELF SCORE 30%
                                            assessmentresultlist.find(
                                              (i) =>
                                                i.assessment_id === assessmentid &&
                                                i.staff_id.toString() === selectedStaff &&
                                                i.staff_assessor_type === 'self' &&
                                                i.competency_id === val2.competency_id,
                                            )?.assessment_result_score
                                              ? roundedNumber(
                                                  assessmentresultlist.find(
                                                    (i) =>
                                                      i.assessment_id === assessmentid &&
                                                      i.staff_id.toString() === selectedStaff &&
                                                      i.staff_assessor_type === 'self' &&
                                                      i.competency_id === val2.competency_id,
                                                  )?.assessment_result_score * 0.3,
                                                )
                                              : 'N/A'
                                          }
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {
                                            //SUPERIOR SCORE
                                            assessmentresultlist.find(
                                              (i) =>
                                                i.assessment_id === assessmentid &&
                                                i.staff_id.toString() === selectedStaff &&
                                                i.staff_assessor_type === 'superior' &&
                                                i.competency_id === val2.competency_id,
                                            )?.assessment_result_score
                                              ? assessmentresultlist.find(
                                                  (i) =>
                                                    i.assessment_id === assessmentid &&
                                                    i.staff_id.toString() === selectedStaff &&
                                                    i.staff_assessor_type === 'superior' &&
                                                    i.competency_id === val2.competency_id,
                                                )?.assessment_result_score
                                              : 'N/A'
                                          }
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {
                                            //SUPERIOR SCORE 60%
                                            assessmentresultlist.find(
                                              (i) =>
                                                i.assessment_id === assessmentid &&
                                                i.staff_id.toString() === selectedStaff &&
                                                i.staff_assessor_type === 'superior' &&
                                                i.competency_id === val2.competency_id,
                                            )?.assessment_result_score
                                              ? roundedNumber(
                                                  assessmentresultlist.find(
                                                    (i) =>
                                                      i.assessment_id === assessmentid &&
                                                      i.staff_id.toString() === selectedStaff &&
                                                      i.staff_assessor_type === 'superior' &&
                                                      i.competency_id === val2.competency_id,
                                                  )?.assessment_result_score * 0.6,
                                                )
                                              : 'N/A'
                                          }
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {
                                            //SUBORDINATE SCORE
                                            assessmentresultlist.filter(
                                              (i) =>
                                                i.assessment_id === assessmentid &&
                                                i.staff_id.toString() === selectedStaff &&
                                                i.staff_assessor_type === 'subordinate' &&
                                                i.competency_id === val2.competency_id,
                                            ).length > 0
                                              ? assessmentresultlist
                                                  .filter(
                                                    (i) =>
                                                      i.assessment_id === assessmentid &&
                                                      i.staff_id.toString() === selectedStaff &&
                                                      i.staff_assessor_type === 'subordinate' &&
                                                      i.competency_id === val2.competency_id,
                                                  )
                                                  .reduce(
                                                    (acc, curr) =>
                                                      acc + curr.assessment_result_score,
                                                    0,
                                                  ) /
                                                assessmentresultlist.filter(
                                                  (i) =>
                                                    i.assessment_id === assessmentid &&
                                                    i.staff_id.toString() === selectedStaff &&
                                                    i.staff_assessor_type === 'subordinate' &&
                                                    i.competency_id === val2.competency_id,
                                                ).length
                                              : 'N/A'
                                          }
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {
                                            //SUBORDINATE SCORE
                                            assessmentresultlist.filter(
                                              (i) =>
                                                i.assessment_id === assessmentid &&
                                                i.staff_id.toString() === selectedStaff &&
                                                i.staff_assessor_type === 'subordinate' &&
                                                i.competency_id === val2.competency_id,
                                            ).length > 0
                                              ? roundedNumber(
                                                  (assessmentresultlist
                                                    .filter(
                                                      (i) =>
                                                        i.assessment_id === assessmentid &&
                                                        i.staff_id.toString() === selectedStaff &&
                                                        i.staff_assessor_type === 'subordinate' &&
                                                        i.competency_id === val2.competency_id,
                                                    )
                                                    .reduce(
                                                      (acc, curr) =>
                                                        acc + curr.assessment_result_score,
                                                      0,
                                                    ) /
                                                    assessmentresultlist.filter(
                                                      (i) =>
                                                        i.assessment_id === assessmentid &&
                                                        i.staff_id.toString() === selectedStaff &&
                                                        i.staff_assessor_type === 'subordinate' &&
                                                        i.competency_id === val2.competency_id,
                                                    ).length) *
                                                    0.1,
                                                )
                                              : 'N/A'
                                          }
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {
                                            //TOTAL AVERAGE SCORE
                                            roundedNumber(
                                              (assessmentresultlist.find(
                                                (i) =>
                                                  i.assessment_id === assessmentid &&
                                                  i.staff_id.toString() === selectedStaff &&
                                                  i.staff_assessor_type === 'self' &&
                                                  i.competency_id === val2.competency_id,
                                              )?.assessment_result_score || 0) *
                                                0.3 +
                                                (assessmentresultlist.find(
                                                  (i) =>
                                                    i.assessment_id === assessmentid &&
                                                    i.staff_id.toString() === selectedStaff &&
                                                    i.staff_assessor_type === 'superior' &&
                                                    i.competency_id === val2.competency_id,
                                                )?.assessment_result_score || 0) *
                                                  0.6,
                                            )
                                          }
                                        </CTableDataCell>
                                      </CTableRow>
                                    )
                                  })}
                              </CTableBody>
                            </CTable>
                          ) : (
                            <CAlert className="my-0" color="danger">
                              No Data Available
                            </CAlert>
                          )}
                        </CTabPane>
                      </CTabContent>
                    </CCardBody>
                  </CCard>
                )
              })}
          </CModalBody>
          <CModalFooter>
            <CButton
              size="sm"
              color="secondary"
              onClick={() => {
                setVisible(false)
                setSelectedStaff('')
              }}
            >
              Close
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

AssessmentFormAdmin.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  stafflist: PropTypes.array.isRequired,
  jobcompetency: PropTypes.array,
  assessmentresultlist: PropTypes.array.isRequired,
  assessmentid: PropTypes.number,
  assessors: PropTypes.array.isRequired,
}

export default AssessmentFormAdmin
