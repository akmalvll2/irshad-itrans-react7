import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
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
  CFormCheck,
  CAvatar,
  CCard,
  CCardHeader,
  CCardFooter,
  CFormInput,
  CFormTextarea,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CPopover,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilCheckAlt, cilInfo, cilMinus, cilXCircle, cilX, cilCheck } from '@coreui/icons'

const AssessmentFormUser = ({
  visible,
  setVisible,
  stafflist,
  jobcompetency,
  user,
  assessmentid,
  createAssessmentResult,
  assessors,
  assessmentresult,
  assessmentdata,
  indicators,
}) => {
  const [selectedStaff, setSelectedStaff] = useState()
  const [activeKey, setActiveKey] = useState(1)
  const [assessmentResult, setAssessmentResult] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      createAssessmentResult(assessmentResult)
      setVisible(!visible)
      setSelectedStaff('')
      setAssessmentResult([])
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChangeMessage = (index, value) => {
    const newArray = [...assessmentResult]
    newArray[index] = { ...newArray[index], assessmentresultmessage: value }
    setAssessmentResult(newArray)
  }

  const handleOnChange1 = (index, val, id, indicatorid) => {
    const newArray = [...assessmentResult]
    newArray[index] = {
      ...newArray[index],
      competencyid: id,
      indicatorid: indicatorid,
      assessmentresultscore: val,
      assessmentid: assessmentid,
      staffassessorid: assessors.find(
        (i) => i.staff_id?.toString() === selectedStaff && i.assessor_id?.toString() === user.id,
      )?.staff_assessor_id,
    }
    setAssessmentResult(newArray)
  }

  const [exampleData, setExampleData] = useState([
    {
      id: 1,
      name: 'Core Values',
      type: 'Core',
      description: 'Knowledge on organization core values',
      q1: 'Does the personel aware of the group core values ?',
      q2: 'Does the personel have knowledge of the group core values ?',
      i1: 'Awareness of group core values',
      i2: 'Knowledge of group core values',
    },
  ])
  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => {
          setVisible(false)
          setSelectedStaff('')
          setAssessmentResult([])
        }}
        size="xl"
      >
        <CForm onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>
              Assessment:{' '}
              <span style={{ color: 'blue' }}>
                {assessmentdata.find((i) => i.assessment_id === assessmentid)?.assessment_name}
              </span>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CAlert color="secondary">
              <ul>
                <li>
                  Hover on <CIcon className="mx-2" icon={cilInfo} /> icon to view detail information
                </li>
                <li>
                  <p>Leveling Description</p>
                  <ol>
                    <li>
                      <strong>Able to state the meaning of the competency correctly</strong>
                    </li>
                    <li>
                      <strong>
                        Able to explain how to apply/use the competency in the job, but not able to
                        actually apply independently yet{' '}
                      </strong>
                    </li>
                    <li>
                      <strong>
                        {' '}
                        Able to actually apply, practice, perform or use the competency effectively
                        on the job (in normal condition)
                      </strong>
                    </li>
                    <li>
                      <strong>
                        Able to coach or teach others on how to apply or perform the competency, and
                        can apply in complex situation
                      </strong>
                    </li>
                    <li>
                      <strong>
                        Able to create/develop new approach/tools/methods/product related to the
                        competency or Certified as Expert
                      </strong>
                    </li>
                  </ol>
                </li>
              </ul>
            </CAlert>
            <CFormSelect
              label="Please choose assessed individual"
              size="sm"
              name="staffid"
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option>..Choose Staff..</option>
              {stafflist
                ?.filter((i) =>
                  user.role === 'admin'
                    ? true
                    : assessors.some(
                        (u) => u.staff_id === i.staff_id && u.assessor_id?.toString() === user.id,
                      ),
                )
                .map((val, key) => {
                  return (
                    <option key={key} value={val.staff_id}>
                      {val.staff_name}
                    </option>
                  )
                })}
            </CFormSelect>
            {assessmentresult.filter(
              (u) =>
                u.staff_id?.toString() === selectedStaff &&
                u.assessor_id?.toString() === user.id &&
                u.assessment_id === assessmentid,
            ).length > 0
              ? stafflist // STAFF CARD IF THERE ARE ASSESSMENT RESULT
                  ?.filter((fil) => fil.staff_id?.toString() === selectedStaff)
                  .map((val, key) => {
                    return (
                      <CCard className="my-4" key={key}>
                        <CCardHeader>
                          <CAvatar
                            size="xl"
                            shape="rounded"
                            className="m-2 float-start bg-secondary"
                            src={val.staff_image}
                          />
                          <span>
                            <div>
                              <b>Name :</b> {val.staff_name}
                            </div>
                            <div>
                              <b>Position :</b> {val.position_name}
                            </div>
                            <div>
                              <b>Department :</b> {val.department_name}
                            </div>
                          </span>
                          <br />
                        </CCardHeader>
                        <CTabContent>
                          <CTabPane
                            role="tabpanel"
                            aria-labelledby="home-tab-pane"
                            visible={activeKey === 1}
                          >
                            {assessmentdata.find((i) => i.assessment_id === assessmentid)
                              ?.assessment_type === 'leadership' ? (
                              <CTable small responsive bordered className="my-0">
                                <CTableHead className=" text-center">
                                  {key === 0 &&
                                  jobcompetency?.filter(
                                    (fil) => fil.position_id === val.position_id,
                                  ).length > 0 ? (
                                    <CTableRow>
                                      <CTableHeaderCell>No</CTableHeaderCell>
                                      <CTableHeaderCell>Competency</CTableHeaderCell>
                                      {/*<CTableHeaderCell>Expected Level</CTableHeaderCell>*/}
                                      <CTableHeaderCell>Indicator</CTableHeaderCell>
                                    </CTableRow>
                                  ) : (
                                    <CTableRow>
                                      <CTableDataCell colSpan={3}>
                                        <CAlert className="m-0" color="danger">
                                          No Data Available
                                        </CAlert>
                                      </CTableDataCell>
                                    </CTableRow>
                                  )}
                                </CTableHead>
                                {jobcompetency
                                  ?.filter((fil) => fil.position_id === val.position_id)
                                  .map((val2, key2) => {
                                    const competencyIndicators = indicators.filter(
                                      (i) => i.competency_id === val2.competency_id,
                                    )
                                    return (
                                      <CTableBody key={key2}>
                                        <CTableRow>
                                          <CTableDataCell>{key2 + 1}</CTableDataCell>
                                          <CTableDataCell>
                                            {val2.competency_name}
                                            <CPopover
                                              content={
                                                <div>
                                                  <p>
                                                    <b>Description :</b>{' '}
                                                    {val2.competency_description}
                                                  </p>
                                                  <p>
                                                    <b>Group :</b>{' '}
                                                    <CBadge color={val2.cluster_color}>
                                                      {val2.cluster_name}
                                                    </CBadge>
                                                  </p>
                                                </div>
                                              }
                                              placement="auto"
                                              trigger={['hover', 'focus']}
                                              title="Detail"
                                            >
                                              <CIcon className="mx-2" icon={cilInfo} />
                                            </CPopover>
                                          </CTableDataCell>
                                          {/*<CTableDataCell>
                                            {val2.position_competency_expected_level}
                                            </CTableDataCell>*/}
                                          <CTableDataCell>
                                            <CTable small bordered>
                                              <CTableHead>
                                                <CTableRow>
                                                  <CTableHeaderCell>Indicator</CTableHeaderCell>
                                                  <CTableHeaderCell>1</CTableHeaderCell>
                                                  <CTableHeaderCell>2</CTableHeaderCell>
                                                  <CTableHeaderCell>3</CTableHeaderCell>
                                                  <CTableHeaderCell>4</CTableHeaderCell>
                                                  <CTableHeaderCell>5</CTableHeaderCell>
                                                  <CTableHeaderCell>Remarks</CTableHeaderCell>
                                                </CTableRow>
                                              </CTableHead>
                                              <CTableBody>
                                                {competencyIndicators.map((ind, indkey) => {
                                                  return (
                                                    <CTableRow key={indkey}>
                                                      <CTableDataCell>
                                                        {ind.indicator_description}
                                                      </CTableDataCell>
                                                      <CTableDataCell className=" text-center">
                                                        {assessmentresult.find(
                                                          (i) =>
                                                            i.assessor_id?.toString() === user.id &&
                                                            i.staff_id?.toString() ===
                                                              selectedStaff &&
                                                            i.assessment_id === assessmentid &&
                                                            i.indicator_id === ind.indicator_id &&
                                                            i.competency_id === val2.competency_id,
                                                        )?.assessment_result_score === 1 ? (
                                                          <CButton color="success" disabled>
                                                            <CIcon icon={cilCheckAlt} />
                                                          </CButton>
                                                        ) : (
                                                          <CButton color="secondary" disabled>
                                                            <CIcon icon={cilXCircle} />
                                                          </CButton>
                                                        )}
                                                      </CTableDataCell>
                                                      <CTableDataCell className=" text-center">
                                                        {assessmentresult.find(
                                                          (i) =>
                                                            i.assessor_id?.toString() === user.id &&
                                                            i.staff_id?.toString() ===
                                                              selectedStaff &&
                                                            i.assessment_id === assessmentid &&
                                                            i.indicator_id === ind.indicator_id &&
                                                            i.competency_id === val2.competency_id,
                                                        )?.assessment_result_score === 2 ? (
                                                          <CButton color="success" disabled>
                                                            <CIcon icon={cilCheckAlt} />
                                                          </CButton>
                                                        ) : (
                                                          <CButton color="secondary" disabled>
                                                            <CIcon icon={cilXCircle} />
                                                          </CButton>
                                                        )}
                                                      </CTableDataCell>
                                                      <CTableDataCell className=" text-center">
                                                        {assessmentresult.find(
                                                          (i) =>
                                                            i.assessor_id?.toString() === user.id &&
                                                            i.staff_id?.toString() ===
                                                              selectedStaff &&
                                                            i.assessment_id === assessmentid &&
                                                            i.indicator_id === ind.indicator_id &&
                                                            i.competency_id === val2.competency_id,
                                                        )?.assessment_result_score === 3 ? (
                                                          <CButton color="success" disabled>
                                                            <CIcon icon={cilCheckAlt} />
                                                          </CButton>
                                                        ) : (
                                                          <CButton color="secondary" disabled>
                                                            <CIcon icon={cilXCircle} />
                                                          </CButton>
                                                        )}
                                                      </CTableDataCell>
                                                      <CTableDataCell className=" text-center">
                                                        {assessmentresult.find(
                                                          (i) =>
                                                            i.assessor_id?.toString() === user.id &&
                                                            i.staff_id?.toString() ===
                                                              selectedStaff &&
                                                            i.assessment_id === assessmentid &&
                                                            i.indicator_id === ind.indicator_id &&
                                                            i.competency_id === val2.competency_id,
                                                        )?.assessment_result_score === 4 ? (
                                                          <CButton color="success" disabled>
                                                            <CIcon icon={cilCheckAlt} />
                                                          </CButton>
                                                        ) : (
                                                          <CButton color="secondary" disabled>
                                                            <CIcon icon={cilXCircle} />
                                                          </CButton>
                                                        )}
                                                      </CTableDataCell>
                                                      <CTableDataCell className=" text-center">
                                                        {assessmentresult.find(
                                                          (i) =>
                                                            i.assessor_id?.toString() === user.id &&
                                                            i.staff_id?.toString() ===
                                                              selectedStaff &&
                                                            i.assessment_id === assessmentid &&
                                                            i.indicator_id === ind.indicator_id &&
                                                            i.competency_id === val2.competency_id,
                                                        )?.assessment_result_score === 5 ? (
                                                          <CButton color="success" disabled>
                                                            <CIcon icon={cilCheckAlt} />
                                                          </CButton>
                                                        ) : (
                                                          <CButton color="secondary" disabled>
                                                            <CIcon icon={cilXCircle} />
                                                          </CButton>
                                                        )}
                                                      </CTableDataCell>
                                                      <CTableDataCell>
                                                        {
                                                          assessmentresult.find(
                                                            (i) =>
                                                              i.assessor_id?.toString() ===
                                                                user.id &&
                                                              i.staff_id?.toString() ===
                                                                selectedStaff &&
                                                              i.assessment_id === assessmentid &&
                                                              i.indicator_id === ind.indicator_id &&
                                                              i.competency_id ===
                                                                val2.competency_id,
                                                          )?.assessment_result_message
                                                        }
                                                      </CTableDataCell>
                                                    </CTableRow>
                                                  )
                                                })}
                                              </CTableBody>
                                            </CTable>
                                          </CTableDataCell>
                                        </CTableRow>
                                      </CTableBody>
                                    )
                                  })}
                              </CTable>
                            ) : (
                              <CTable small responsive bordered className="my-0">
                                <CTableHead className=" text-center">
                                  {key === 0 &&
                                  jobcompetency?.filter(
                                    (fil) => fil.position_id === val.position_id,
                                  ).length > 0 ? (
                                    <CTableRow>
                                      <CTableHeaderCell>No</CTableHeaderCell>
                                      <CTableHeaderCell>Competency</CTableHeaderCell>
                                      {/*<CTableHeaderCell>Expected Level</CTableHeaderCell>*/}
                                      <CTableHeaderCell>1</CTableHeaderCell>
                                      <CTableHeaderCell>2</CTableHeaderCell>
                                      <CTableHeaderCell>3</CTableHeaderCell>
                                      <CTableHeaderCell>4</CTableHeaderCell>
                                      <CTableHeaderCell>5</CTableHeaderCell>
                                      <CTableHeaderCell>Remarks</CTableHeaderCell>
                                    </CTableRow>
                                  ) : (
                                    <CTableRow>
                                      <CTableDataCell colSpan={3}>
                                        <CAlert className="m-0" color="danger">
                                          No Data Available
                                        </CAlert>
                                      </CTableDataCell>
                                    </CTableRow>
                                  )}
                                </CTableHead>
                                {jobcompetency
                                  ?.filter((fil) => fil.position_id === val.position_id)
                                  .map((val2, key2) => {
                                    return (
                                      <CTableBody key={key2}>
                                        <CTableRow>
                                          <CTableDataCell>{key2 + 1}</CTableDataCell>
                                          <CTableDataCell>
                                            {val2.competency_name}
                                            <CPopover
                                              content={
                                                <div>
                                                  <p>
                                                    <b>Description :</b>{' '}
                                                    {val2.competency_description}
                                                  </p>
                                                  <p>
                                                    <b>Group :</b>{' '}
                                                    <CBadge color={val2.cluster_color}>
                                                      {val2.cluster_name}
                                                    </CBadge>
                                                  </p>
                                                </div>
                                              }
                                              placement="auto"
                                              trigger={['hover', 'focus']}
                                              title="Detail"
                                            >
                                              <CIcon className="mx-2" icon={cilInfo} />
                                            </CPopover>
                                          </CTableDataCell>
                                          {/*<CTableDataCell>
                                            {val2.position_competency_expected_level}
                                            </CTableDataCell>*/}
                                          <CTableDataCell className=" text-center">
                                            {assessmentresult.find(
                                              (i) =>
                                                i.assessor_id?.toString() === user.id &&
                                                i.staff_id?.toString() === selectedStaff &&
                                                i.assessment_id === assessmentid &&
                                                i.competency_id === val2.competency_id,
                                            )?.assessment_result_score === 1 ? (
                                              <CButton color="success" disabled>
                                                <CIcon icon={cilCheckAlt} />
                                              </CButton>
                                            ) : (
                                              <CButton color="secondary" disabled>
                                                <CIcon icon={cilXCircle} />
                                              </CButton>
                                            )}
                                          </CTableDataCell>
                                          <CTableDataCell className=" text-center">
                                            {assessmentresult.find(
                                              (i) =>
                                                i.assessor_id?.toString() === user.id &&
                                                i.staff_id?.toString() === selectedStaff &&
                                                i.assessment_id === assessmentid &&
                                                i.competency_id === val2.competency_id,
                                            )?.assessment_result_score === 2 ? (
                                              <CButton color="success" disabled>
                                                <CIcon icon={cilCheckAlt} />
                                              </CButton>
                                            ) : (
                                              <CButton color="secondary" disabled>
                                                <CIcon icon={cilXCircle} />
                                              </CButton>
                                            )}
                                          </CTableDataCell>
                                          <CTableDataCell className=" text-center">
                                            {assessmentresult.find(
                                              (i) =>
                                                i.assessor_id?.toString() === user.id &&
                                                i.staff_id?.toString() === selectedStaff &&
                                                i.assessment_id === assessmentid &&
                                                i.competency_id === val2.competency_id,
                                            )?.assessment_result_score === 3 ? (
                                              <CButton color="success" disabled>
                                                <CIcon icon={cilCheckAlt} />
                                              </CButton>
                                            ) : (
                                              <CButton color="secondary" disabled>
                                                <CIcon icon={cilXCircle} />
                                              </CButton>
                                            )}
                                          </CTableDataCell>
                                          <CTableDataCell className=" text-center">
                                            {assessmentresult.find(
                                              (i) =>
                                                i.assessor_id?.toString() === user.id &&
                                                i.staff_id?.toString() === selectedStaff &&
                                                i.assessment_id === assessmentid &&
                                                i.competency_id === val2.competency_id,
                                            )?.assessment_result_score === 4 ? (
                                              <CButton color="success" disabled>
                                                <CIcon icon={cilCheckAlt} />
                                              </CButton>
                                            ) : (
                                              <CButton color="secondary" disabled>
                                                <CIcon icon={cilXCircle} />
                                              </CButton>
                                            )}
                                          </CTableDataCell>
                                          <CTableDataCell className=" text-center">
                                            {assessmentresult.find(
                                              (i) =>
                                                i.assessor_id?.toString() === user.id &&
                                                i.staff_id?.toString() === selectedStaff &&
                                                i.assessment_id === assessmentid &&
                                                i.competency_id === val2.competency_id,
                                            )?.assessment_result_score === 5 ? (
                                              <CButton color="success" disabled>
                                                <CIcon icon={cilCheckAlt} />
                                              </CButton>
                                            ) : (
                                              <CButton color="secondary" disabled>
                                                <CIcon icon={cilXCircle} />
                                              </CButton>
                                            )}
                                          </CTableDataCell>
                                          <CTableDataCell>
                                            {
                                              assessmentresult.find(
                                                (i) =>
                                                  i.assessor_id?.toString() === user.id &&
                                                  i.staff_id?.toString() === selectedStaff &&
                                                  i.assessment_id === assessmentid &&
                                                  i.competency_id === val2.competency_id,
                                              )?.assessment_result_message
                                            }
                                          </CTableDataCell>
                                        </CTableRow>
                                      </CTableBody>
                                    )
                                  })}
                              </CTable>
                            )}
                          </CTabPane>
                        </CTabContent>
                        <CCardFooter className=" d-flex justify-content-center">
                          Submitted On:{' '}
                          {moment(
                            assessmentresult.find(
                              (i) =>
                                i.assessor_id?.toString() === user.id &&
                                i.staff_id?.toString() === selectedStaff &&
                                i.assessment_id === assessmentid,
                            )?.assessment_result_date,
                          ).format('Do MMMM YYYY')}
                        </CCardFooter>
                      </CCard>
                    )
                  })
              : stafflist //STAFF CARD IF NO ASSESSMENT RESULT
                  ?.filter((fil) => fil.staff_id?.toString() === selectedStaff)
                  .map((val, key) => {
                    return (
                      <CCard className="my-4" key={key}>
                        <CCardHeader>
                          <CAvatar
                            size="xl"
                            shape="rounded"
                            className="m-2 float-start bg-secondary"
                            src={val.staff_image}
                          />
                          <span>
                            <div>
                              <b>Name :</b> {val.staff_name}
                            </div>
                            <div>
                              <b>Position :</b> {val.position_name}
                            </div>
                            <div>
                              <b>Department :</b> {val.department_name}
                            </div>
                          </span>
                          <br />
                        </CCardHeader>
                        <CTabContent>
                          <CTabPane
                            role="tabpanel"
                            aria-labelledby="home-tab-pane"
                            visible={activeKey === 1}
                          >
                            <CTable small responsive className=" m-0">
                              <CTableHead color="dark">
                                <CTableRow>
                                  <CTableHeaderCell>Competency</CTableHeaderCell>
                                  <CTableHeaderCell>Description</CTableHeaderCell>
                                  <CTableHeaderCell>Indicator</CTableHeaderCell>
                                  <CTableHeaderCell>Question</CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableHead color="secondary">
                                <CTableRow>
                                  <CTableHeaderCell colSpan={4}>
                                    <center>CORE</center>
                                  </CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                {exampleData?.map((val, key) => (
                                  <CTableRow key={key}>
                                    <CTableDataCell>{val.name}</CTableDataCell>
                                    <CTableDataCell>{val.description}</CTableDataCell>
                                    <CTableDataCell>{val.i1}</CTableDataCell>
                                    <CTableDataCell>{val.q1}</CTableDataCell>
                                  </CTableRow>
                                ))}
                              </CTableBody>
                            </CTable>
                          </CTabPane>
                        </CTabContent>
                        {stafflist.filter(
                          (i) =>
                            i.staff_id?.toString() === selectedStaff &&
                            jobcompetency.some((u) => u.position_id === i.position_id) &&
                            assessors.some(
                              (u) =>
                                u.staff_id === i.staff_id && u.assessor_id?.toString() === user.id,
                            ),
                        ).length > 0 ? (
                          <CCardFooter className=" d-flex justify-content-center">
                            <CButton size="sm" color="success" variant="outline" type="submit">
                              Submit
                            </CButton>
                          </CCardFooter>
                        ) : (
                          ''
                        )}
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

AssessmentFormUser.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  stafflist: PropTypes.array.isRequired,
  jobcompetency: PropTypes.array,
  user: PropTypes.object.isRequired,
  assessmentid: PropTypes.number,
  createAssessmentResult: PropTypes.func.isRequired,
  assessors: PropTypes.array.isRequired,
  assessmentresult: PropTypes.array.isRequired,
  assessmentdata: PropTypes.array.isRequired,
  indicators: PropTypes.array.isRequired,
}

export default AssessmentFormUser
