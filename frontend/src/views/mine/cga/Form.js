import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { userType } from 'src/userType'
import axios from 'axios'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CFormCheck,
  CTableHead,
  CTableHeaderCell,
  CImage,
  CFormTextarea,
  CPopover,
  CForm,
  CToast,
  CToastBody,
  CToastHeader,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilZoom } from '@coreui/icons'

import packageJson from '../../../../package.json'
const { config } = packageJson

const Form = ({ pick, onModal, setOnModal, survey }) => {
  const [surveyDetail, setSurveyDetail] = useState([])
  const [staffDetail, setStaffDetail] = useState([])

  //const [answer, setAnswer] = useState([{ compid: '', currentLevel: '', message: '' }])
  const [formData1, setFormData1] = useState([])
  const [formData2, setFormData2] = useState([])
  const [formData3, setFormData3] = useState([])
  const [alertStatus, setAlertStatus] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData1)
    console.log(formData2)
    console.log(formData3)
    try {
      const id = pick
      const assessorid = userType.data[0].staff_id
      const surveyType = 2
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/cgaanswer`, {
          formData1,
          formData2,
          formData3,
          id,
          assessorid,
          surveyType,
        })
        .then((response) => {
          if (response) {
            //alert(response.data)
            //setOnModal(!onModal)
            setFormData1([])
            setFormData2([])
            setFormData3([])
          } else {
            console.log('Error Submitting Form')
          }
        })
    } catch (err) {
      console.log(err)
    } finally {
      setOnModal(!onModal)
      //window.location.reload()
      setAlertStatus(true)
    }
  }

  const handleChange1 = (e, index, compid) => {
    const { id, value } = e.target
    const comid = 'compid'
    const newFormData = [...formData1]
    newFormData[index] = { ...newFormData[index], [id]: value }
    newFormData[index] = { ...newFormData[index], [comid]: compid }
    setFormData1(newFormData)
  }

  const handleChange2 = (e, index, compid) => {
    const { id, value } = e.target
    const comid = 'compid'
    const newFormData = [...formData2]
    newFormData[index] = { ...newFormData[index], [id]: value }
    newFormData[index] = { ...newFormData[index], [comid]: compid }
    setFormData2(newFormData)
  }

  const handleChange3 = (e, index, compid) => {
    const { id, value } = e.target
    const comid = 'compid'
    const newFormData = [...formData3]
    newFormData[index] = { ...newFormData[index], [id]: value }
    newFormData[index] = { ...newFormData[index], [comid]: compid }
    setFormData3(newFormData)
  }

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const id = pick
        const cgasurvey = survey
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/cgasurvey`, { id, cgasurvey })
          .then((response) => {
            if (response.data) {
              setSurveyDetail(response.data)
            } else {
              alert('Error Getting Survey Data')
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
    const fetchSurveyDetail = async () => {
      try {
        const id = pick
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/cgasurveydetail`, { id })
          .then((response) => {
            if (response.data) {
              setStaffDetail(response.data)
            } else {
              alert('Error Getting Survey Data')
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
    fetchSurvey()
    fetchSurveyDetail()
  }, [pick, survey])
  if (surveyDetail.length > 0) {
    return (
      <>
        <CAlert
          color="info"
          dismissible
          visible={alertStatus}
          className="fixed-bottom fixed-right mr-4 mb-4"
          style={{ zIndex: 9999, width: '18rem' }}
          //onClose={setAlertStatus(false)}
        >
          Assessment Successfully Submited
        </CAlert>
        <CModal
          visible={onModal}
          alignment="top"
          scrollable
          size="xl"
          backdrop="static"
          onClose={() => setOnModal(false)}
        >
          <CModalHeader style={{ backgroundColor: '#4f5d73', color: 'whitesmoke' }}>
            LEADERSHIP COMPETENCY ASSESSMENT
          </CModalHeader>
          <CModalBody>
            <CTable small responsive bordered color="dark">
              {staffDetail?.map((val, key) => {
                return (
                  <CTableBody key={key}>
                    <CTableRow>
                      <CTableDataCell rowSpan={3}>
                        <center>
                          <CImage
                            fluid
                            width={100}
                            height={100}
                            src="https://static.vecteezy.com/system/resources/thumbnails/009/315/274/small/white-clipboard-task-management-todo-check-list-efficient-work-on-project-plan-fast-progress-level-up-concept-assignment-and-exam-productivity-solution-icon-3d-clipboard-render-free-png.png"
                          />
                        </center>
                      </CTableDataCell>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableDataCell>{val.staff_name}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Position</CTableHeaderCell>
                      <CTableDataCell>{val.job_title}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Department</CTableHeaderCell>
                      <CTableDataCell>{val.department_name}</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                )
              })}
            </CTable>
            <CToast animation={false} autohide={false} visible={true} style={{ width: '100%' }}>
              <CToastHeader>
                <div className="fw-bold me-auto">INSTRUCTION</div>
              </CToastHeader>
              <CToastBody>
                <CTable small responsive borderless>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell>1</CTableDataCell>
                      <CTableDataCell>
                        Please assess staff based on each <b>individual competency</b>.
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell>2</CTableDataCell>
                      <CTableDataCell>
                        Each <b>competency</b> has their respective <b>indicators</b>.
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell>3</CTableDataCell>
                      <CTableDataCell>
                        Each <b>indicators</b> are set from <b>1 to 3 level</b>. Choose accordingly
                        based on staff current skill
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell>4</CTableDataCell>
                      <CTableDataCell>
                        <b>Hover</b> on each <b>level</b> for their respective description.
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CToastBody>
            </CToast>
            <br />
            <CForm onSubmit={handleSubmit}>
              <CTable responsive small bordered striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Competency</CTableHeaderCell>
                    <CTableHeaderCell>
                      <CPopover
                        content={
                          <div style={{ whiteSpace: 'pre-wrap' }}>
                            <b>NO</b>
                          </div>
                        }
                        placement="auto"
                        trigger={['hover', 'focus']}
                      >
                        <span>1</span>
                      </CPopover>
                    </CTableHeaderCell>
                    <CTableHeaderCell>
                      <CPopover
                        content={
                          <div style={{ whiteSpace: 'pre-wrap' }}>
                            <b>NEUTRAL</b>
                          </div>
                        }
                        placement="auto"
                        trigger={['hover', 'focus']}
                      >
                        <span>2</span>
                      </CPopover>
                    </CTableHeaderCell>
                    <CTableHeaderCell>
                      <CPopover
                        content={
                          <div style={{ whiteSpace: 'pre-wrap' }}>
                            <b>YES</b>
                          </div>
                        }
                        placement="auto"
                        trigger={['hover', 'focus']}
                      >
                        <span>3</span>
                      </CPopover>
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {surveyDetail?.map((val, key) => {
                    return (
                      <>
                        <CTableRow key={key}>
                          <CTableDataCell rowSpan={val.competency_indicator3 === null ? 4 : 5}>
                            {key + 1}
                          </CTableDataCell>
                          <CTableDataCell colSpan={4}>
                            <div style={{ textTransform: 'uppercase' }}>
                              {val.competency_name}{' '}
                              <CPopover
                                content={val.competency_description}
                                placement="auto"
                                trigger="focus"
                              >
                                <CButton color="transparent" variant="outline" small>
                                  <CIcon icon={cilZoom} size="sm" />
                                </CButton>
                              </CPopover>
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                        {val.competency_indicator1 ? (
                          <CTableRow>
                            <CTableDataCell>{val.competency_indicator1}</CTableDataCell>
                            <CTableDataCell>
                              <CFormCheck
                                type="radio"
                                name={val.competency_id + 'i1'}
                                id="indicator1"
                                value="1"
                                onChange={(e) => handleChange1(e, key, val.competency_id)}
                                required
                              />
                            </CTableDataCell>
                            <CTableDataCell>
                              <CFormCheck
                                type="radio"
                                name={val.competency_id + 'i1'}
                                id="indicator1"
                                value="2"
                                onChange={(e) => handleChange1(e, key, val.competency_id)}
                                required
                              />
                            </CTableDataCell>
                            <CTableDataCell>
                              <CFormCheck
                                type="radio"
                                name={val.competency_id + 'i1'}
                                id="indicator1"
                                value="3"
                                onChange={(e) => handleChange1(e, key, val.competency_id)}
                                required
                              />
                            </CTableDataCell>
                          </CTableRow>
                        ) : (
                          ''
                        )}
                        {val.competency_indicator2 ? (
                          <CTableRow>
                            <CTableDataCell>{val.competency_indicator2}</CTableDataCell>
                            <CTableDataCell>
                              <CFormCheck
                                type="radio"
                                name={val.competency_id + 'i2'}
                                id="indicator2"
                                value="1"
                                onChange={(e) => handleChange2(e, key, val.competency_id)}
                                required
                              />
                            </CTableDataCell>
                            <CTableDataCell>
                              <CFormCheck
                                type="radio"
                                name={val.competency_id + 'i2'}
                                id="indicator2"
                                value="2"
                                onChange={(e) => handleChange2(e, key, val.competency_id)}
                                required
                              />
                            </CTableDataCell>
                            <CTableDataCell>
                              <CFormCheck
                                type="radio"
                                name={val.competency_id + 'i2'}
                                id="indicator2"
                                value="3"
                                onChange={(e) => handleChange2(e, key, val.competency_id)}
                                required
                              />
                            </CTableDataCell>
                          </CTableRow>
                        ) : (
                          ''
                        )}
                        {val.competency_indicator3 ? (
                          <CTableRow>
                            <CTableDataCell>{val.competency_indicator3}</CTableDataCell>
                            <CTableDataCell>
                              <CFormCheck
                                type="radio"
                                name={val.competency_id + 'i3'}
                                id="indicator3"
                                value="1"
                                onChange={(e) => handleChange3(e, key, val.competency_id)}
                                required
                              />
                            </CTableDataCell>
                            <CTableDataCell>
                              <CFormCheck
                                type="radio"
                                name={val.competency_id + 'i3'}
                                id="indicator3"
                                value="2"
                                onChange={(e) => handleChange3(e, key, val.competency_id)}
                                required
                              />
                            </CTableDataCell>
                            <CTableDataCell>
                              <CFormCheck
                                type="radio"
                                name={val.competency_id + 'i3'}
                                id="indicator3"
                                value="3"
                                onChange={(e) => handleChange3(e, key, val.competency_id)}
                                required
                              />
                            </CTableDataCell>
                          </CTableRow>
                        ) : (
                          ''
                        )}
                        <CTableRow>
                          <CTableDataCell colSpan={4}>
                            <CFormTextarea
                              id="message"
                              name="message"
                              rows={3}
                              floatingLabel={`Leave a comment here`}
                              placeholder={`Leave a comment here`}
                            />
                          </CTableDataCell>
                        </CTableRow>
                      </>
                    )
                  })}
                </CTableBody>
              </CTable>
              <CButton color="secondary" style={{ color: 'whitesmoke' }} type="submit">
                Submit
              </CButton>
            </CForm>
          </CModalBody>
        </CModal>
      </>
    )
  } else {
    return (
      <>
        <CModal
          visible={onModal}
          alignment="top"
          scrollable
          size="xl"
          backdrop="static"
          onClose={() => setOnModal(false)}
        >
          <CModalHeader>COMPETENCY GAP ANALYSIS SURVEY FORM</CModalHeader>
          <CModalBody>No Data Or Survey Available</CModalBody>
        </CModal>
      </>
    )
  }
}

Form.propTypes = {
  pick: PropTypes.string,
  onModal: PropTypes.bool,
  setOnModal: PropTypes.bool,
  survey: PropTypes.string,
}

export default Form
