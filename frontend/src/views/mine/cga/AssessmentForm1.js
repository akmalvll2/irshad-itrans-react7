import React, { useContext, useState } from 'react'
import propTypes from 'prop-types'
import MyContext from '../data/MyContext'
import { userType } from 'src/userType'
import {
  CAlert,
  CForm,
  CModal,
  CModalHeader,
  CModalBody,
  CCardBody,
  CCard,
  CTable,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CRow,
  CCol,
  CAvatar,
  CFormCheck,
  CFormTextarea,
  CTableHead,
  CPopover,
  CButton,
  CSpinner,
  CFormSelect,
  CModalFooter,
  CButtonGroup,
  CTooltip,
  CCardImage,
  CCardImageOverlay,
  CAccordion,
  CAccordionBody,
  CAccordionItem,
  CAccordionHeader,
  CBadge,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilBriefcase, cilBuilding, cilStar, cilInfo } from '@coreui/icons'

const AssessmentForm1 = ({ visible, setVisible, assessmentid, createAssessmentResult }) => {
  const {
    staff,
    staffAssessor,
    assessment,
    assessmentResult,
    positionCompetency,
    company,
    cluster,
    loading,
  } = useContext(MyContext)
  const [result, setResult] = useState([])
  const [selectedStaffId, setSelectedStaffId] = useState()

  const listStaff = staff?.filter(
    (i) => i.manager_id.toString() === userType.id || i.staff_id.toString() === userType.id,
  )
  const selectedAssessment = assessment?.find((i) => i.assessment_id === assessmentid)
  const selectedStaff = staff?.find((i) => i.staff_id.toString() === selectedStaffId)
  const selectedPosition = positionCompetency?.filter(
    (i) => i.position_id === selectedStaff?.position_id,
  )
  const assessmentResultStatus = assessmentResult?.filter(
    (i) =>
      i.assessment_id === assessmentid &&
      i.staff_id.toString() === selectedStaffId &&
      i.assessor_id.toString() === userType.id,
  )

  const handleSetResult = (competencyid, ccl) => {
    const newArray = [...result]
    // Find the index of the object with the matching competencyid
    const index = newArray.findIndex((item) => item.competencyid === competencyid)
    if (index !== -1) {
      // If found, update the existing object
      newArray[index] = {
        ...newArray[index],
        assessmentresultscore: ccl,
      }
    } else {
      // If not found, create a new object
      newArray.push({
        competencyid: competencyid,
        assessmentid: assessmentid,
        staffassessorid: staffAssessor?.find(
          (i) =>
            i.staff_id.toString() === selectedStaffId && i.assessor_id.toString() === userType.id,
        )?.staff_assessor_id,
        assessmentresultscore: ccl,
      })
    }
    setResult(newArray)
  }

  const handleMessageResult = (competencyid, message) => {
    const newArray = [...result]
    // Find the index of the object with the matching competencyid
    const index = newArray.findIndex((item) => item.competencyid === competencyid)
    if (index !== -1) {
      // If found, update the existing object
      newArray[index] = {
        ...newArray[index],
        assessmentresultmessage: message,
      }
    } else {
      // If not found, create a new object
      newArray.push({
        competencyid: competencyid,
        assessmentresultmessage: message,
      })
    }
    setResult(newArray)
  }

  const handleSubmit = () => {
    try {
      createAssessmentResult(result)
    } catch (err) {
      console.log(err)
    } finally {
      setVisible(false)
      alert('Your submission has been saved. Thank you.')
      setResult([])
    }
  }

  const listfunc = (data) => {
    const listItems = data?.split(/\s*#\s*/).filter((item) => item.trim() !== '')
    return listItems
  }

  if (
    loading.staff ||
    loading.staffAssessor ||
    loading.assessment ||
    loading.assessmentResult ||
    loading.positionCompetency ||
    loading.company ||
    loading.cluster
  )
    <CSpinner />
  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CModal
          static
          scrollable
          backdrop="static"
          visible={visible}
          onClose={() => setVisible(false)}
          size="xl"
        >
          <CModalHeader
            closeButton={false}
            className=" bg-secondary"
            style={{
              backgroundImage: `url('https://vestar.com/wp-content/uploads/2015/04/leadership-header.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: '0.5',
            }}
          ></CModalHeader>
          <CModalBody>
            <CCard className="my-2">
              <CCardBody className="bg-light">
                <CRow>
                  <CCol md={8}>
                    <h5 className=" text-info text-center">
                      {selectedAssessment?.assessment_name}
                    </h5>
                  </CCol>
                  <CCol md={4}>
                    <CFormSelect onChange={(e) => setSelectedStaffId(e.target.value)}>
                      <option value="">..Choose Staff..</option>
                      {listStaff?.map((val, key) => (
                        <option key={key} value={val.staff_id}>
                          {val.staff_name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            {selectedStaff ? (
              <CRow>
                <CCol md={4}>
                  <CCard className="my-2" style={{ minHeight: '350px' }}>
                    <CCardImage src={company[0]?.company_logo} style={{ opacity: '0.1' }} />
                    <CCardImageOverlay>
                      <center>
                        <CAvatar
                          src={selectedStaff?.staff_image}
                          size="xl"
                          className="bg-secondary m-0"
                        />
                        <h6 className="text-uppercase mt-2">{selectedStaff?.staff_name}</h6>
                        <hr />
                      </center>
                      <CRow>
                        <CCol md={2}>
                          <CIcon icon={cilBriefcase} className="mx-2" />
                        </CCol>
                        <CCol md={10}>{selectedStaff?.position_name}</CCol>
                      </CRow>
                      <CRow>
                        <CCol md={2}>
                          <CIcon icon={cilBuilding} className="mx-2" />
                        </CCol>
                        <CCol md={10}>{selectedStaff?.division_name}</CCol>
                      </CRow>
                      <CRow>
                        <CCol md={2}>
                          <CIcon icon={cilBuilding} className="mx-2" />
                        </CCol>
                        <CCol md={10}>{selectedStaff?.department_name}</CCol>
                      </CRow>
                    </CCardImageOverlay>
                  </CCard>
                </CCol>
                <CCol md={8}>
                  {assessmentResultStatus?.length > 0 ? (
                    <CAlert color="info" className="my-2">
                      This assessment has been submitted. Please view in the result page.
                    </CAlert>
                  ) : (
                    <CAccordion alwaysOpen className="my-2">
                      {cluster?.map((cls, clskey) => (
                        <CAccordionItem itemKey={clskey + 1} key={clskey}>
                          <CAccordionHeader>{cls.cluster_name}</CAccordionHeader>
                          <CAccordionBody className="p-0">
                            <CCard>
                              <CCardBody>
                                <CTable small borderless responsive>
                                  <CTableHead>
                                    <CTableRow>
                                      <CTableHeaderCell className="text-center">
                                        NO
                                      </CTableHeaderCell>
                                      <CTableHeaderCell>COMPETENCY</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center">
                                        <CTooltip content="Required Competency Level">
                                          <div>RCL</div>
                                        </CTooltip>
                                      </CTableHeaderCell>
                                      <CTableHeaderCell className="text-center">
                                        <CTooltip content="Foundation">
                                          <div>1</div>
                                        </CTooltip>
                                      </CTableHeaderCell>
                                      <CTableHeaderCell className="text-center">
                                        <CTooltip content="Intermediate">
                                          <div>2</div>
                                        </CTooltip>
                                      </CTableHeaderCell>
                                      <CTableHeaderCell className="text-center">
                                        <CTooltip content="Proficient">
                                          <div>3</div>
                                        </CTooltip>
                                      </CTableHeaderCell>
                                      <CTableHeaderCell className="text-center">
                                        <CTooltip content="Expert">
                                          <div>4</div>
                                        </CTooltip>
                                      </CTableHeaderCell>
                                      <CTableHeaderCell className="text-center">
                                        <CTooltip content="Mastery">
                                          <div>5</div>
                                        </CTooltip>
                                      </CTableHeaderCell>
                                      <CTableHeaderCell>REMARKS</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>
                                    {selectedPosition
                                      ?.filter((i) => i.cluster_id === cls.cluster_id)
                                      .map((val, key) => {
                                        return (
                                          <CTableRow key={key}>
                                            <CTableDataCell className="align-middle text-center">
                                              {key + 1}
                                            </CTableDataCell>
                                            <CTableDataCell className="align-middle">
                                              {val.competency_name}
                                              <CPopover
                                                content={
                                                  <>
                                                    <CRow>
                                                      <CCol md={2}>
                                                        <h6>Competency</h6>
                                                      </CCol>
                                                      <CCol md={10}>{val.competency_name}</CCol>
                                                    </CRow>
                                                    <CRow>
                                                      <CCol md={2}>
                                                        <h6>Group</h6>
                                                      </CCol>
                                                      <CCol md={10}>
                                                        <CBadge color={val.cluster_color}>
                                                          {val.cluster_name}
                                                        </CBadge>
                                                      </CCol>
                                                    </CRow>
                                                    <CRow>
                                                      <CCol md={2}>
                                                        <h6>Description</h6>
                                                      </CCol>
                                                      <CCol md={10}>
                                                        {val.competency_description}
                                                      </CCol>
                                                    </CRow>
                                                    <CTable
                                                      small
                                                      responsive
                                                      bordered
                                                      className="mt-2"
                                                    >
                                                      <CTableHead color="light">
                                                        <CTableRow>
                                                          <CTableHeaderCell>
                                                            Level 1
                                                          </CTableHeaderCell>
                                                          <CTableHeaderCell>
                                                            Level 2
                                                          </CTableHeaderCell>
                                                          <CTableHeaderCell>
                                                            Level 3
                                                          </CTableHeaderCell>
                                                          <CTableHeaderCell>
                                                            Level 4
                                                          </CTableHeaderCell>
                                                          <CTableHeaderCell>
                                                            Level 5
                                                          </CTableHeaderCell>
                                                        </CTableRow>
                                                      </CTableHead>
                                                      <CTableBody>
                                                        <CTableRow>
                                                          <CTableDataCell>
                                                            <ul>
                                                              {listfunc(val.competency_level1)?.map(
                                                                (i) => (
                                                                  <li key={i.id}>{i}</li>
                                                                ),
                                                              )}
                                                            </ul>
                                                          </CTableDataCell>
                                                          <CTableDataCell>
                                                            <ul>
                                                              {listfunc(val.competency_level2)?.map(
                                                                (i) => (
                                                                  <li key={i.id}>{i}</li>
                                                                ),
                                                              )}
                                                            </ul>
                                                          </CTableDataCell>
                                                          <CTableDataCell>
                                                            <ul>
                                                              {listfunc(val.competency_level3)?.map(
                                                                (i) => (
                                                                  <li key={i.id}>{i}</li>
                                                                ),
                                                              )}
                                                            </ul>
                                                          </CTableDataCell>
                                                          <CTableDataCell>
                                                            <ul>
                                                              {listfunc(val.competency_level4)?.map(
                                                                (i) => (
                                                                  <li key={i.id}>{i}</li>
                                                                ),
                                                              )}
                                                            </ul>
                                                          </CTableDataCell>
                                                          <CTableDataCell>
                                                            <ul>
                                                              {listfunc(val.competency_level5)?.map(
                                                                (i) => (
                                                                  <li key={i.id}>{i}</li>
                                                                ),
                                                              )}
                                                            </ul>
                                                          </CTableDataCell>
                                                        </CTableRow>
                                                      </CTableBody>
                                                    </CTable>
                                                  </>
                                                }
                                                placement="auto"
                                                trigger={['hover', 'focus']}
                                                title="Competency Detail"
                                                style={{ width: '1000px', maxWidth: '1000px' }}
                                              >
                                                <CIcon className="mx-2" icon={cilInfo} />
                                              </CPopover>
                                            </CTableDataCell>
                                            <CTableDataCell className="align-middle text-center">
                                              {val.position_competency_expected_level}
                                            </CTableDataCell>
                                            <CTableDataCell className="align-middle text-center">
                                              <CTooltip
                                                content="Foundation"
                                                trigger={['hover', 'focus']}
                                              >
                                                <span>
                                                  <CFormCheck
                                                    button={{
                                                      color: 'primary',
                                                      variant: 'outline',
                                                    }}
                                                    label={<CIcon icon={cilStar} />}
                                                    type="radio"
                                                    id={clskey + `ratingbutton1` + key}
                                                    name={clskey + `ratingbutton` + key}
                                                    onChange={(e) =>
                                                      handleSetResult(
                                                        val.competency_id,
                                                        e.target.value,
                                                      )
                                                    }
                                                    value={1}
                                                    checked={
                                                      result?.find(
                                                        (i) => i.competencyid === val.competency_id,
                                                      )?.assessmentresultscore === '1'
                                                        ? true
                                                        : false
                                                    }
                                                    disabled={
                                                      assessmentResultStatus.length > 0
                                                        ? true
                                                        : false
                                                    }
                                                    required
                                                  />
                                                </span>
                                              </CTooltip>
                                            </CTableDataCell>
                                            <CTableDataCell className="align-middle text-center">
                                              <CTooltip
                                                content="Intermediate"
                                                trigger={['hover', 'focus']}
                                              >
                                                <span>
                                                  <CFormCheck
                                                    button={{
                                                      color: 'primary',
                                                      variant: 'outline',
                                                    }}
                                                    label={<CIcon icon={cilStar} />}
                                                    type="radio"
                                                    id={clskey + `ratingbutton2` + key}
                                                    name={clskey + `ratingbutton` + key}
                                                    onChange={(e) =>
                                                      handleSetResult(
                                                        val.competency_id,
                                                        e.target.value,
                                                      )
                                                    }
                                                    value={2}
                                                    checked={
                                                      result?.find(
                                                        (i) => i.competencyid === val.competency_id,
                                                      )?.assessmentresultscore === '2'
                                                        ? true
                                                        : false
                                                    }
                                                    disabled={
                                                      assessmentResultStatus.length > 0
                                                        ? true
                                                        : false
                                                    }
                                                    required
                                                  />
                                                </span>
                                              </CTooltip>
                                            </CTableDataCell>
                                            <CTableDataCell className="align-middle text-center">
                                              <CTooltip
                                                content="Proficient"
                                                trigger={['hover', 'focus']}
                                              >
                                                <span>
                                                  <CFormCheck
                                                    button={{
                                                      color: 'primary',
                                                      variant: 'outline',
                                                    }}
                                                    label={<CIcon icon={cilStar} />}
                                                    type="radio"
                                                    id={clskey + `ratingbutton3` + key}
                                                    name={clskey + `ratingbutton` + key}
                                                    onChange={(e) =>
                                                      handleSetResult(
                                                        val.competency_id,
                                                        e.target.value,
                                                      )
                                                    }
                                                    value={3}
                                                    checked={
                                                      result?.find(
                                                        (i) => i.competencyid === val.competency_id,
                                                      )?.assessmentresultscore === '3'
                                                        ? true
                                                        : false
                                                    }
                                                    disabled={
                                                      assessmentResultStatus.length > 0
                                                        ? true
                                                        : false
                                                    }
                                                    required
                                                  />
                                                </span>
                                              </CTooltip>
                                            </CTableDataCell>
                                            <CTableDataCell className="align-middle text-center">
                                              <CTooltip
                                                content="Expert"
                                                trigger={['hover', 'focus']}
                                              >
                                                <span>
                                                  <CFormCheck
                                                    button={{
                                                      color: 'primary',
                                                      variant: 'outline',
                                                    }}
                                                    label={<CIcon icon={cilStar} />}
                                                    type="radio"
                                                    id={clskey + `ratingbutton4` + key}
                                                    name={clskey + `ratingbutton` + key}
                                                    onChange={(e) =>
                                                      handleSetResult(
                                                        val.competency_id,
                                                        e.target.value,
                                                      )
                                                    }
                                                    value={4}
                                                    checked={
                                                      result?.find(
                                                        (i) => i.competencyid === val.competency_id,
                                                      )?.assessmentresultscore === '4'
                                                        ? true
                                                        : false
                                                    }
                                                    disabled={
                                                      assessmentResultStatus.length > 0
                                                        ? true
                                                        : false
                                                    }
                                                    required
                                                  />
                                                </span>
                                              </CTooltip>
                                            </CTableDataCell>
                                            <CTableDataCell className="align-middle text-center">
                                              <CTooltip
                                                content="Mastery"
                                                trigger={['hover', 'focus']}
                                              >
                                                <span>
                                                  <CFormCheck
                                                    button={{
                                                      color: 'primary',
                                                      variant: 'outline',
                                                    }}
                                                    label={<CIcon icon={cilStar} />}
                                                    type="radio"
                                                    id={clskey + `ratingbutton5` + key}
                                                    name={clskey + `ratingbutton` + key}
                                                    onChange={(e) =>
                                                      handleSetResult(
                                                        val.competency_id,
                                                        e.target.value,
                                                      )
                                                    }
                                                    value={5}
                                                    checked={
                                                      result?.find(
                                                        (i) => i.competencyid === val.competency_id,
                                                      )?.assessmentresultscore === '5'
                                                        ? true
                                                        : false
                                                    }
                                                    disabled={
                                                      assessmentResultStatus.length > 0
                                                        ? true
                                                        : false
                                                    }
                                                    required
                                                  />
                                                </span>
                                              </CTooltip>
                                            </CTableDataCell>
                                            <CTableDataCell className="align-middle text-center">
                                              <CFormTextarea
                                                placeholder="Remarks"
                                                onChange={(e) =>
                                                  handleMessageResult(
                                                    val.competency_id,
                                                    e.target.value,
                                                  )
                                                }
                                              />
                                            </CTableDataCell>
                                          </CTableRow>
                                        )
                                      })}
                                  </CTableBody>
                                </CTable>
                              </CCardBody>
                            </CCard>
                          </CAccordionBody>
                        </CAccordionItem>
                      ))}
                    </CAccordion>
                  )}
                </CCol>
              </CRow>
            ) : null}
          </CModalBody>
          <CModalFooter className="bg-light">
            <CButtonGroup>
              <CButton size="sm" color="dark" variant="outline" onClick={() => setVisible(false)}>
                Close
              </CButton>
              {selectedStaff && selectedPosition && !assessmentResultStatus.length > 0 ? (
                <CButton type="submit" size="sm" color="dark" onClick={handleSubmit}>
                  Submit
                </CButton>
              ) : null}
            </CButtonGroup>
          </CModalFooter>
        </CModal>
      </CForm>
    </>
  )
}

AssessmentForm1.propTypes = {
  visible: propTypes.bool,
  setVisible: propTypes.func,
  assessmentid: propTypes.number,
  createAssessmentResult: propTypes.func,
}

export default AssessmentForm1
