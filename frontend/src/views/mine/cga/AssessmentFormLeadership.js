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

const AssessmentFormLeadership = ({
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

  const handleOnChange1 = (index, val, id) => {
    const newArray = [...assessmentResult]
    newArray[index] = {
      ...newArray[index],
      competencyid: id,
      assessmentresultscore: val,
      assessmentid: assessmentid,
      staffassessorid: assessors.find(
        (i) => i.staff_id?.toString() === selectedStaff && i.assessor_id?.toString() === user.id,
      )?.staff_assessor_id,
    }
    setAssessmentResult(newArray)
  }
  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => {
          setVisible(false)
          setSelectedStaff('')
        }}
        size="lg"
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
                            <CTable small responsive bordered className="my-0">
                              <CTableHead className=" text-center">
                                {key === 0 &&
                                jobcompetency?.filter((fil) => fil.position_id === val.position_id)
                                  .length > 0 ? (
                                  <CTableRow>
                                    <CTableHeaderCell>No</CTableHeaderCell>
                                    <CTableHeaderCell>Competency</CTableHeaderCell>
                                    <CTableHeaderCell>Expected Level</CTableHeaderCell>
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
                                                  <b>Description :</b> {val2.competency_description}
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
                                        <CTableDataCell>
                                          {val2.position_competency_expected_level}
                                        </CTableDataCell>
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
                        {/*stafflist.filter(
                          (i) =>
                            i.staff_id.toString() === selectedStaff &&
                            jobcompetency.some((u) => u.position_id === i.position_id),
                        ).length > 0 ? (
                          <CCardFooter className=" d-flex justify-content-center">
                            <CButton size="sm" color="primary" variant="outline" type="submit">
                              Edit
                            </CButton>
                          </CCardFooter>
                        ) : (
                          ''
                        )*/}
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
                          {/*<CNav variant="tabs" className="card-header-tabs">
                      <CNavItem>
                        <CNavLink
                          active={activeKey === 1}
                          component="button"
                          role="tab"
                          aria-controls="home-tab-pane"
                          aria-selected={activeKey === 1}
                          onClick={() => setActiveKey(1)}
                        >
                          Core
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink
                          active={activeKey === 2}
                          component="button"
                          role="tab"
                          aria-controls="home-tab-pane"
                          aria-selected={activeKey === 2}
                          onClick={() => setActiveKey(2)}
                        >
                          Generic
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink
                          active={activeKey === 3}
                          component="button"
                          role="tab"
                          aria-controls="profile-tab-pane"
                          aria-selected={activeKey === 3}
                          onClick={() => setActiveKey(3)}
                        >
                          Functional
                        </CNavLink>
                      </CNavItem>
              </CNav>*/}
                        </CCardHeader>
                        <CTabContent>
                          <CTabPane
                            role="tabpanel"
                            aria-labelledby="home-tab-pane"
                            visible={activeKey === 1}
                          >
                            <CTable small responsive bordered className="my-0">
                              <CTableHead className=" text-center">
                                {key === 0 &&
                                jobcompetency?.filter((fil) => fil.position_id === val.position_id)
                                  .length > 0 ? (
                                  <CTableRow>
                                    <CTableHeaderCell>No</CTableHeaderCell>
                                    <CTableHeaderCell>Competency</CTableHeaderCell>
                                    <CTableHeaderCell>Expected Level</CTableHeaderCell>
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
                                                  <b>Description :</b> {val2.competency_description}
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
                                        <CTableDataCell>
                                          {val2.position_competency_expected_level}
                                        </CTableDataCell>
                                        <CTableDataCell className=" text-center">
                                          <CFormCheck
                                            button={{ color: 'primary', variant: 'outline' }}
                                            label={<CIcon icon={cilCheckAlt} />}
                                            id={`btn${key2}1`}
                                            type="radio"
                                            name={`currentvalue_${key2}`}
                                            value={1}
                                            onChange={(e) =>
                                              handleOnChange1(
                                                key2,
                                                e.target.value,
                                                val2.competency_id,
                                              )
                                            }
                                            checked={
                                              assessmentResult[key2]?.assessmentresultscore === '1'
                                                ? true
                                                : false
                                            }
                                            required
                                          />
                                        </CTableDataCell>
                                        <CTableDataCell className=" text-center">
                                          <CFormCheck
                                            button={{ color: 'primary', variant: 'outline' }}
                                            label={<CIcon icon={cilCheckAlt} />}
                                            id={`btn${key2}2`}
                                            type="radio"
                                            name={`currentvalue_${key2}`}
                                            value={2}
                                            onChange={(e) =>
                                              handleOnChange1(
                                                key2,
                                                e.target.value,
                                                val2.competency_id,
                                              )
                                            }
                                            checked={
                                              assessmentResult[key2]?.assessmentresultscore === '2'
                                                ? true
                                                : false
                                            }
                                            required
                                          />
                                        </CTableDataCell>
                                        <CTableDataCell className=" text-center">
                                          <CFormCheck
                                            button={{ color: 'primary', variant: 'outline' }}
                                            label={<CIcon icon={cilCheckAlt} />}
                                            id={`btn${key2}3`}
                                            type="radio"
                                            name={`currentvalue_${key2}`}
                                            value={3}
                                            onChange={(e) =>
                                              handleOnChange1(
                                                key2,
                                                e.target.value,
                                                val2.competency_id,
                                              )
                                            }
                                            checked={
                                              assessmentResult[key2]?.assessmentresultscore === '3'
                                                ? true
                                                : false
                                            }
                                            required
                                          />
                                        </CTableDataCell>
                                        <CTableDataCell className=" text-center">
                                          <CFormCheck
                                            button={{ color: 'primary', variant: 'outline' }}
                                            label={<CIcon icon={cilCheckAlt} />}
                                            id={`btn${key2}4`}
                                            type="radio"
                                            name={`currentvalue_${key2}`}
                                            value={4}
                                            onChange={(e) =>
                                              handleOnChange1(
                                                key2,
                                                e.target.value,
                                                val2.competency_id,
                                              )
                                            }
                                            checked={
                                              assessmentResult[key2]?.assessmentresultscore === '4'
                                                ? true
                                                : false
                                            }
                                            required
                                          />
                                        </CTableDataCell>
                                        <CTableDataCell className=" text-center">
                                          <CFormCheck
                                            button={{ color: 'primary', variant: 'outline' }}
                                            label={<CIcon icon={cilCheckAlt} />}
                                            id={`btn${key2}5`}
                                            type="radio"
                                            name={`currentvalue_${key2}`}
                                            value={5}
                                            onChange={(e) =>
                                              handleOnChange1(
                                                key2,
                                                e.target.value,
                                                val2.competency_id,
                                              )
                                            }
                                            checked={
                                              assessmentResult[key2]?.assessmentresultscore === '5'
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
                                              handleOnChangeMessage(key2, e.target.value)
                                            }
                                            //text="Must be 8-20 words long."
                                          />
                                        </CTableDataCell>
                                      </CTableRow>
                                    </CTableBody>
                                  )
                                })}
                            </CTable>
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

AssessmentFormLeadership.propTypes = {
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
}

export default AssessmentFormLeadership
