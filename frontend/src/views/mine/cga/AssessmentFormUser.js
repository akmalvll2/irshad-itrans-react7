import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import MyContext from '../data/MyContext'
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
  CSpinner,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilCheckAlt, cilInfo, cilMinus, cilXCircle, cilX, cilCheck, cilStar } from '@coreui/icons'

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
  const { cluster, loading } = useContext(MyContext)
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

  var indcount = 0

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
                  assessors.some(
                    (u) => u.staff_id === i.staff_id && u.assessor_id?.toString() === user.id,
                  ),
                )
                .map((val, key) => {
                  return (
                    <option key={key} value={val.staff_id}>
                      {val.staff_name}{' '}
                      {/*assessmentresult.filter(
                        (v) =>
                          v.assessor_id?.toString() === user.id &&
                          v.staff_id === val.staff_id &&
                          v.assessment_id === assessmentid,
                      ).length > 0 ? (
                        <span style={{ color: 'blue' }}>Complete</span>
                      ) : (
                        'Incomplete'
                      )*/}
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
                            {assessmentdata.find((i) => i.assessment_id === assessmentid)
                              ?.assessment_type === 'leadership' ? (
                              <CTable small responsive bordered className="my-0">
                                {' '}
                                {/* WITH INDICATOR  */}
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

                                    const startIndex = indcount
                                    indcount += competencyIndicators.length
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
                                            <CTable className="m-0" small bordered>
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
                                                        <CFormCheck
                                                          button={{
                                                            color: 'primary',
                                                            variant: 'outline',
                                                          }}
                                                          label={<CIcon icon={cilCheckAlt} />}
                                                          id={`btn${startIndex + indkey}1`}
                                                          name={`btn${startIndex + indkey}`}
                                                          type="radio"
                                                          value={1}
                                                          onChange={(e) =>
                                                            handleOnChange1(
                                                              startIndex + indkey,
                                                              e.target.value,
                                                              val2.competency_id,
                                                              ind.indicator_id,
                                                            )
                                                          }
                                                          checked={
                                                            assessmentResult[startIndex + indkey]
                                                              ?.assessmentresultscore === '1'
                                                              ? true
                                                              : false
                                                          }
                                                          required
                                                        />
                                                      </CTableDataCell>
                                                      <CTableDataCell className=" text-center">
                                                        <CFormCheck
                                                          button={{
                                                            color: 'primary',
                                                            variant: 'outline',
                                                          }}
                                                          label={<CIcon icon={cilCheckAlt} />}
                                                          id={`btn${startIndex + indkey}2`}
                                                          name={`btn${startIndex + indkey}`}
                                                          type="radio"
                                                          value={2}
                                                          onChange={(e) =>
                                                            handleOnChange1(
                                                              startIndex + indkey,
                                                              e.target.value,
                                                              val2.competency_id,
                                                              ind.indicator_id,
                                                            )
                                                          }
                                                          checked={
                                                            assessmentResult[startIndex + indkey]
                                                              ?.assessmentresultscore === '2'
                                                              ? true
                                                              : false
                                                          }
                                                          required
                                                        />
                                                      </CTableDataCell>
                                                      <CTableDataCell className=" text-center">
                                                        <CFormCheck
                                                          button={{
                                                            color: 'primary',
                                                            variant: 'outline',
                                                          }}
                                                          label={<CIcon icon={cilCheckAlt} />}
                                                          id={`btn${startIndex + indkey}3`}
                                                          name={`btn${startIndex + indkey}`}
                                                          type="radio"
                                                          value={3}
                                                          onChange={(e) =>
                                                            handleOnChange1(
                                                              startIndex + indkey,
                                                              e.target.value,
                                                              val2.competency_id,
                                                              ind.indicator_id,
                                                            )
                                                          }
                                                          checked={
                                                            assessmentResult[startIndex + indkey]
                                                              ?.assessmentresultscore === '3'
                                                              ? true
                                                              : false
                                                          }
                                                          required
                                                        />
                                                      </CTableDataCell>
                                                      <CTableDataCell className=" text-center">
                                                        <CFormCheck
                                                          button={{
                                                            color: 'primary',
                                                            variant: 'outline',
                                                          }}
                                                          label={<CIcon icon={cilCheckAlt} />}
                                                          id={`btn${startIndex + indkey}4`}
                                                          name={`btn${startIndex + indkey}`}
                                                          type="radio"
                                                          value={4}
                                                          onChange={(e) =>
                                                            handleOnChange1(
                                                              startIndex + indkey,
                                                              e.target.value,
                                                              val2.competency_id,
                                                              ind.indicator_id,
                                                            )
                                                          }
                                                          checked={
                                                            assessmentResult[startIndex + indkey]
                                                              ?.assessmentresultscore === '4'
                                                              ? true
                                                              : false
                                                          }
                                                          required
                                                        />
                                                      </CTableDataCell>
                                                      <CTableDataCell className=" text-center">
                                                        <CFormCheck
                                                          button={{
                                                            color: 'primary',
                                                            variant: 'outline',
                                                          }}
                                                          label={<CIcon icon={cilCheckAlt} />}
                                                          id={`btn${startIndex + indkey}5`}
                                                          name={`btn${startIndex + indkey}`}
                                                          type="radio"
                                                          value={5}
                                                          onChange={(e) =>
                                                            handleOnChange1(
                                                              startIndex + indkey,
                                                              e.target.value,
                                                              val2.competency_id,
                                                              ind.indicator_id,
                                                            )
                                                          }
                                                          checked={
                                                            assessmentResult[startIndex + indkey]
                                                              ?.assessmentresultscore === '5'
                                                              ? true
                                                              : false
                                                          }
                                                          required
                                                        />
                                                      </CTableDataCell>
                                                      <CTableDataCell>
                                                        <CFormTextarea
                                                          id="exampleFormControlTextarea1"
                                                          //label="Example textarea"
                                                          rows={1}
                                                          placeholder="comments..."
                                                          onChange={(e) =>
                                                            handleOnChangeMessage(
                                                              startIndex + indkey,
                                                              e.target.value,
                                                            )
                                                          }
                                                          //text="Must be 8-20 words long."
                                                        />
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
                                <CTableHead className="text-center">
                                  {key === 0 &&
                                  jobcompetency?.filter(
                                    (fil) => fil.position_id === val.position_id,
                                  ).length > 0 ? (
                                    <CTableRow>
                                      <CTableHeaderCell>No</CTableHeaderCell>
                                      <CTableHeaderCell>Competency</CTableHeaderCell>
                                      <CTableHeaderCell>1</CTableHeaderCell>
                                      <CTableHeaderCell>2</CTableHeaderCell>
                                      <CTableHeaderCell>3</CTableHeaderCell>
                                      <CTableHeaderCell>4</CTableHeaderCell>
                                      <CTableHeaderCell>5</CTableHeaderCell>
                                      <CTableHeaderCell>Remarks</CTableHeaderCell>
                                    </CTableRow>
                                  ) : (
                                    <CTableRow>
                                      <CTableDataCell colSpan={8}>
                                        <CAlert className="m-0" color="danger">
                                          No Data Available
                                        </CAlert>
                                      </CTableDataCell>
                                    </CTableRow>
                                  )}
                                </CTableHead>
                                {cluster?.map((cluster, clusterkey) => (
                                  <CTableBody key={clusterkey}>
                                    <CTableRow className="table-dark">
                                      <CTableHeaderCell
                                        colSpan={8}
                                        className="text-center"
                                        style={{ fontWeight: 'bold' }}
                                      >
                                        {cluster.cluster_name}
                                      </CTableHeaderCell>
                                    </CTableRow>
                                    {jobcompetency
                                      ?.filter(
                                        (fil) =>
                                          fil.position_id === val.position_id &&
                                          fil.cluster_id === cluster.cluster_id,
                                      )
                                      .map((val2, key2) => (
                                        <CTableRow
                                          key={key2}
                                          className={key2 % 2 === 0 ? 'table-light' : ''}
                                        >
                                          <CTableDataCell>{key2 + 1}</CTableDataCell>
                                          <CTableDataCell>
                                            {val2.competency_name}
                                            <CPopover
                                              content={
                                                <div>
                                                  <p>
                                                    <b>Description:</b>{' '}
                                                    {val2.competency_description}
                                                  </p>
                                                  <p>
                                                    <b>Group:</b> {val2.cluster_name}
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
                                          {[1, 2, 3, 4, 5].map((level) => (
                                            <CTableDataCell className="text-center" key={level}>
                                              <CFormCheck
                                                button={{ color: 'primary', variant: 'outline' }}
                                                label={<CIcon icon={cilStar} />}
                                                id={`btn${key2}${level}`}
                                                type="radio"
                                                name={`currentvalue_${key2}`}
                                                value={level}
                                                onChange={(e) =>
                                                  handleOnChange1(
                                                    key2,
                                                    e.target.value,
                                                    val2.competency_id,
                                                    null,
                                                  )
                                                }
                                                checked={
                                                  assessmentResult[key2]?.assessmentresultscore ===
                                                  String(level)
                                                }
                                                required
                                              />
                                            </CTableDataCell>
                                          ))}
                                          <CTableDataCell>
                                            <CFormTextarea
                                              rows={1}
                                              placeholder="comments..."
                                              onChange={(e) =>
                                                handleOnChangeMessage(key2, e.target.value)
                                              }
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                      ))}
                                  </CTableBody>
                                ))}
                              </CTable>
                            )}
                          </CTabPane>
                        </CTabContent>
                        {stafflist.filter(
                          (i) =>
                            i.staff_id?.toString() === selectedStaff &&
                            jobcompetency.some((u) => u.position_id === i.position_id),
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
