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
  CPopover,
  CToast,
  CToastHeader,
  CToastBody,
  CForm,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilZoom } from '@coreui/icons'

import packageJson from '../../../../package.json'
const { config } = packageJson

const Form3 = ({ pick, onModal, setOnModal, survey }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [surveyDetail, setSurveyDetail] = useState([])
  const [staffDetail, setStaffDetail] = useState([])
  const [answer, setAnswer] = useState([])

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

  const handleChange = (e, idx, superior) => {
    const { id, value } = e.target
    const var1 = 'value'
    const var2 = 'competency_id'
    const var3 = 'type'
    const var4 = 'staff_id'
    const var5 = 'date'
    const var6 = 'superior'
    const var7 = 'session'
    const currentDate = new Date()
    const sessionid = userType?.data[0].staff_id
    let session
    if (sessionid === staffDetail[0]?.staff_id) {
      session = '1'
    } else if (sessionid === staffDetail[0]?.reporting_to) {
      session = '2'
    } else {
      session = '3'
    }
    const newFormData = [...answer]
    newFormData[idx] = { ...newFormData[idx], [var2]: id }
    newFormData[idx] = { ...newFormData[idx], [var1]: value }
    newFormData[idx] = { ...newFormData[idx], [var3]: '1' }
    newFormData[idx] = { ...newFormData[idx], [var4]: pick }
    newFormData[idx] = { ...newFormData[idx], [var5]: fetchDate(currentDate) }
    newFormData[idx] = { ...newFormData[idx], [var6]: superior }
    newFormData[idx] = { ...newFormData[idx], [var7]: session }
    setAnswer(newFormData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/cgaanswer3`, { answer })
        .then((response) => {
          if (response) {
            alert(response.data)
            setOnModal(!onModal)
            setAnswer([])
          } else {
            alert('Error Submitting')
          }
        })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
      window.reload()
    }
  }

  const fetchDate = (cga) => {
    const date = cga
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const newDate = `${year}-${month}-${day}`

    return newDate
  }

  useEffect(() => {
    fetchSurvey()
    fetchSurveyDetail()
  })
  return (
    <form>
      <CModal
        visible={onModal}
        alignment="top"
        scrollable
        size="xl"
        backdrop="static"
        onClose={() => setOnModal(false)}
      >
        <CModalHeader style={{ backgroundColor: '#4f5d73', color: 'whitesmoke' }}>
          COMPETENCY GAP ANALYSIS ASSESSMENT
        </CModalHeader>
        <CModalBody>
          <CTable small responsive bordered color="dark">
            <CTableBody>
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
                <CTableDataCell>{staffDetail?.map((val) => val.staff_name)}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>Position</CTableHeaderCell>
                <CTableDataCell>{staffDetail?.map((val) => val.job_title)}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>Department</CTableHeaderCell>
                <CTableDataCell>{staffDetail?.map((val) => val.department_name)}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          {surveyDetail?.length > 0 ? (
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
                        Each competency is set to <b>five (5) level, 1 to 5</b>. Choose level
                        accordingly <b>based on staff current skill</b>.
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell>3</CTableDataCell>
                      <CTableDataCell>
                        <b>Hover</b> on each <b>level</b> for their respective description.
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CToastBody>
            </CToast>
          ) : (
            ''
          )}
          <br />
          {surveyDetail?.length > 0 ? (
            <CForm onSubmit={handleSubmit}>
              <CTable style={{ textTransform: 'uppercase' }} responsive small striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Competency</CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'center' }}>
                      1
                      <CPopover trigger={['hover', 'focus']} content="Awareness">
                        <CIcon icon={cilZoom} size="sm" />
                      </CPopover>
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'center' }}>
                      2
                      <CPopover trigger={['hover', 'focus']} content="Knowledge">
                        <CIcon icon={cilZoom} size="sm" />
                      </CPopover>
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'center' }}>
                      3
                      <CPopover trigger={['hover', 'focus']} content="Skill">
                        <CIcon icon={cilZoom} size="sm" />
                      </CPopover>
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'center' }}>
                      4
                      <CPopover trigger={['hover', 'focus']} content="Advance">
                        <CIcon icon={cilZoom} size="sm" />
                      </CPopover>
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'center' }}>
                      5
                      <CPopover trigger={['hover', 'focus']} content="Expert">
                        <CIcon icon={cilZoom} size="sm" />
                      </CPopover>
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {surveyDetail?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{key + 1}</CTableDataCell>
                        <CTableDataCell>{val.competency_name}</CTableDataCell>
                        <CTableDataCell style={{ textAlign: 'center' }}>
                          <CFormCheck
                            type="radio"
                            name={'t1' + val.competency_id}
                            id={val.competency_id}
                            value="1"
                            onChange={(e) => handleChange(e, key, staffDetail[0]?.reporting_to)}
                            required
                          />
                        </CTableDataCell>
                        <CTableDataCell style={{ textAlign: 'center' }}>
                          <CFormCheck
                            type="radio"
                            name={'t1' + val.competency_id}
                            id={val.competency_id}
                            value="2"
                            onChange={(e) => handleChange(e, key, staffDetail[0]?.reporting_to)}
                            required
                          />
                        </CTableDataCell>
                        <CTableDataCell style={{ textAlign: 'center' }}>
                          <CFormCheck
                            type="radio"
                            name={'t1' + val.competency_id}
                            id={val.competency_id}
                            value="3"
                            onChange={(e) => handleChange(e, key, staffDetail[0]?.reporting_to)}
                            required
                          />
                        </CTableDataCell>
                        <CTableDataCell style={{ textAlign: 'center' }}>
                          <CFormCheck
                            type="radio"
                            name={'t1' + val.competency_id}
                            id={val.competency_id}
                            value="4"
                            onChange={(e) => handleChange(e, key, staffDetail[0]?.reporting_to)}
                            required
                          />
                        </CTableDataCell>
                        <CTableDataCell style={{ textAlign: 'center' }}>
                          <CFormCheck
                            type="radio"
                            name={'t1' + val.competency_id}
                            id={val.competency_id}
                            value="5"
                            onChange={(e) => handleChange(e, key, staffDetail[0]?.reporting_to)}
                            required
                          />
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                  {surveyDetail?.length > 0 ? (
                    <CButton color="secondary" disabled={isLoading} type="submit">
                      {isLoading ? (
                        <CSpinner component="span" size="sm" color="dark" aria-hidden="true" />
                      ) : (
                        'Submit'
                      )}
                    </CButton>
                  ) : (
                    ''
                  )}
                </CTableBody>
              </CTable>
            </CForm>
          ) : (
            'No Available Assessment'
          )}
        </CModalBody>
      </CModal>
    </form>
  )
}

Form3.propTypes = {
  pick: PropTypes.string,
  onModal: PropTypes.bool,
  setOnModal: PropTypes.bool,
  survey: PropTypes.string,
}

export default Form3
