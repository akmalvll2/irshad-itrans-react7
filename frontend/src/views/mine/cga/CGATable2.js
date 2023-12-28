import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CCardFooter,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButtonGroup,
  CSpinner,
} from '@coreui/react'
import Form from './Form'
import Form2 from './Form2'
import Form3 from './Form3'
import CGAResultDetail from './CGAResultDetail'
import CGAResultDetail2 from './CGAResultDetail2'
import CGAResultDetail3 from './CGAResultDetail3'
import CGASubmission1 from './CGASubmission1'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilNotes } from '@coreui/icons'
import { userType } from 'src/userType'
import img2 from '../../../assets/images/4.png'

import packageJson from '../../../../package.json'
const { config } = packageJson

const CGATable2 = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [onModal, setOnModal] = useState(false)
  const [onModal2, setOnModal2] = useState(false)
  const [onModal3, setOnModal3] = useState(false)
  const [pick, setPick] = useState()
  const [userStatus, setUserStatus] = useState()
  const [survey, setSurvey] = useState()
  const [staffList, setStaffList] = useState([])
  const [cga, setCga] = useState([])
  const [visibleDetail, setVisibleDetail] = useState(false)
  const [visibleDetail2, setVisibleDetail2] = useState(false)
  const [visibleDetail3, setVisibleDetail3] = useState(false)
  const [viewStatus, setViewStatus] = useState(false)
  const [activeCga, setActiveCga] = useState([])
  const [setting, setSetting] = useState([])

  const userid = userType?.data[0].staff_id

  const fetchStaffList = async () => {
    try {
      setIsLoading(true)
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/user`).then((response) => {
        if (response) {
          setStaffList(response.data)
        } else {
          console.log('Error fetching staff list')
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCga = async () => {
    try {
      await axios.post(`${config.REACT_APP_API_ENDPOINT}/cgaresultall`).then((response) => {
        if (response) {
          setCga(response.data)
        } else {
          console.log('Error retrieving data')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchAppSetting = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/appname`).then((response) => {
        if (response) {
          setSetting(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchStaffList()
    fetchCga()
    fetchAppSetting()
  }, [])
  return (
    <>
      <CContainer>
        <CCard>
          <CCardHeader
            style={{
              backgroundImage: `url(${img2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              textAlign: 'center',
            }}
          >
            COMPETENCY ASSESSMENT
          </CCardHeader>
          <CCardBody>
            {isLoading ? (
              <CSpinner component="span" size="sm" color="dark" aria-hidden="true" />
            ) : (
              <>
                <CTable small responsive bordered>
                  <CTableHead
                    style={{ textAlign: 'center', color: 'grey', backgroundColor: 'white' }}
                  >
                    <CTableRow>
                      <CTableHeaderCell rowSpan={2}>#</CTableHeaderCell>
                      <CTableHeaderCell rowSpan={2}>STAFF</CTableHeaderCell>
                      {userType?.data[0].type === 'admin' &&
                      setting[0]?.setting_app_survey_1 === 0 &&
                      setting[0]?.setting_app_survey_2 === 1 &&
                      setting[0]?.setting_app_survey_3 === 1 ? (
                        <CTableHeaderCell rowSpan={2}>SUBMISSION STATUS</CTableHeaderCell>
                      ) : (
                        ''
                      )}
                      <CTableHeaderCell
                        colSpan={
                          setting[0]?.setting_app_survey_1 +
                          setting[0]?.setting_app_survey_2 +
                          setting[0]?.setting_app_survey_3
                        }
                      >
                        ASSESSMENT
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      {setting[0]?.setting_app_survey_2 === 1 ? (
                        <CTableHeaderCell>LEADERSHIP</CTableHeaderCell>
                      ) : null}
                      {setting[0]?.setting_app_survey_3 === 1 ? (
                        <CTableHeaderCell>FUNCTIONAL</CTableHeaderCell>
                      ) : null}
                      {setting[0]?.setting_app_survey_1 === 1 ? (
                        <CTableHeaderCell>CGA</CTableHeaderCell>
                      ) : null}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {staffList
                      ?.filter((itm) =>
                        userType?.data[0].type === 'admin'
                          ? itm.staff_id !== null
                          : itm.staff_id === userid ||
                            itm.reporting_to === userid ||
                            itm.reviewer_one === userid ||
                            itm.reviewer_two === userid ||
                            itm.reviewer_three === userid ||
                            itm.reviewer_four === userid ||
                            itm.reviewer_five === userid ||
                            itm.reviewer_six === userid,
                      )
                      .map((val, key) => {
                        return (
                          <CTableRow key={key}>
                            <CTableDataCell>{key + 1}</CTableDataCell>
                            <CTableDataCell>{val.staff_name}</CTableDataCell>
                            {userType?.data[0].type === 'admin' ? (
                              <CTableDataCell>
                                <CButton
                                  size="sm"
                                  variant="outline"
                                  value={val.staff_id}
                                  onClick={(e) => {
                                    setViewStatus(!viewStatus)
                                    setUserStatus(e.target.value)
                                  }}
                                >
                                  View Status
                                </CButton>
                              </CTableDataCell>
                            ) : (
                              ''
                            )}
                            {/* LEADERSHIP ASSESSMENT */}
                            {setting[0]?.setting_app_survey_2 === 1 ? (
                              <CTableDataCell>
                                <CButtonGroup>
                                  {userType?.data[0].type === 'admin' ? (
                                    cga?.filter(
                                      (idx) =>
                                        idx.staff_id === val.staff_id &&
                                        idx.staff_competency_type === 2,
                                    ).length > 0 ? (
                                      <CButton
                                        size="sm"
                                        color="success"
                                        variant="outline"
                                        value={val.staff_id}
                                        onClick={(e) => {
                                          setVisibleDetail(!visibleDetail)
                                          setActiveCga(
                                            cga?.filter(
                                              (idx) =>
                                                idx.staff_id === val.staff_id &&
                                                idx.competency_cluster === 'Core' &&
                                                idx.staff_competency_type === 2,
                                            ),
                                          )
                                        }}
                                      >
                                        <CIcon icon={cilNotes} /> View
                                      </CButton>
                                    ) : (
                                      <CButton
                                        size="sm"
                                        color="secondary"
                                        variant="outline"
                                        value={val.staff_id}
                                        disabled
                                      >
                                        No Data
                                      </CButton>
                                    )
                                  ) : cga?.filter(
                                      (idx) =>
                                        idx.staff_id === val.staff_id &&
                                        idx.staff_competency_type === 2 &&
                                        idx.staff_id === userType?.data[0].staff_id,
                                    ).length > 0 ? (
                                    ''
                                  ) : (
                                    <CButton
                                      size="sm"
                                      color="secondary"
                                      variant="outline"
                                      value={val.staff_id}
                                      disabled
                                    >
                                      No Data
                                    </CButton>
                                  )}
                                  {staffList?.filter(
                                    (idx) =>
                                      (idx.staff_id === val.staff_id && idx.staff_id === userid) ||
                                      (idx.staff_id === val.staff_id &&
                                        idx.reporting_to === userid) ||
                                      (idx.staff_id === val.staff_id &&
                                        idx.reviewer_one === userid) ||
                                      (idx.staff_id === val.staff_id &&
                                        idx.reviewer_two === userid) ||
                                      (idx.staff_id === val.staff_id &&
                                        idx.reviewer_three === userid) ||
                                      (idx.staff_id === val.staff_id &&
                                        idx.reviewer_four === userid) ||
                                      (idx.staff_id === val.staff_id &&
                                        idx.reviewer_five === userid) ||
                                      (idx.staff_id === val.staff_id &&
                                        idx.reviewer_six === userid),
                                  ).length > 0 ? (
                                    cga?.filter(
                                      (idx) =>
                                        (idx.staff_id === val.staff_id &&
                                          idx.staff_id === userid &&
                                          idx.staff_competency_session === 1 &&
                                          idx.staff_competency_type === 2) ||
                                        (idx.staff_id === val.staff_id &&
                                          idx.reporting_to === userid &&
                                          idx.staff_competency_session === 2 &&
                                          idx.staff_competency_type === 2) ||
                                        (idx.staff_id === val.staff_id &&
                                          idx.reviewer_one === userid &&
                                          idx.staff_competency_session === 3 &&
                                          idx.staff_competency_type === 2) ||
                                        (idx.staff_id === val.staff_id &&
                                          idx.reviewer_two === userid &&
                                          idx.staff_competency_session === 4 &&
                                          idx.staff_competency_type === 2) ||
                                        (idx.staff_id === val.staff_id &&
                                          idx.reviewer_three === userid &&
                                          idx.staff_competency_session === 5 &&
                                          idx.staff_competency_type === 2) ||
                                        (idx.staff_id === val.staff_id &&
                                          idx.reviewer_four === userid &&
                                          idx.staff_competency_session === 6 &&
                                          idx.staff_competency_type === 2) ||
                                        (idx.staff_id === val.staff_id &&
                                          idx.reviewer_five === userid &&
                                          idx.staff_competency_session === 7 &&
                                          idx.staff_competency_type === 2) ||
                                        (idx.staff_id === val.staff_id &&
                                          idx.reviewer_six === userid &&
                                          idx.staff_competency_session === 8 &&
                                          idx.staff_competency_type === 2),
                                    ).length > 0 ? (
                                      ''
                                    ) : (
                                      <CButton
                                        size="sm"
                                        color="primary"
                                        variant="outline"
                                        value={val.staff_id}
                                        onClick={(e) => {
                                          setSurvey(1)
                                          setPick(e.target.value)
                                          setOnModal(!onModal)
                                        }}
                                        disabled={false}
                                      >
                                        <CIcon icon={cilPencil} /> Evaluate
                                      </CButton>
                                    )
                                  ) : (
                                    ''
                                  )}
                                </CButtonGroup>
                              </CTableDataCell>
                            ) : null}
                            {/* FUNCTIONAL ASSESSMENT */}
                            {setting[0]?.setting_app_survey_3 === 1 ? (
                              <CTableDataCell>
                                <CButtonGroup>
                                  {userType?.data[0].type === 'admin' ? (
                                    cga?.filter(
                                      (idx) =>
                                        idx.staff_id === val.staff_id &&
                                        idx.staff_competency_type === 3,
                                    ).length > 0 ? (
                                      <CButton
                                        size="sm"
                                        color="success"
                                        variant="outline"
                                        value={val.staff_id}
                                        onClick={(e) => {
                                          setVisibleDetail2(!visibleDetail2)
                                          setActiveCga(
                                            cga?.filter(
                                              (idx) =>
                                                idx.staff_id === val.staff_id &&
                                                idx.competency_cluster === 'Functional' &&
                                                idx.staff_competency_type === 3,
                                            ),
                                          )
                                        }}
                                      >
                                        <CIcon icon={cilNotes} /> View
                                      </CButton>
                                    ) : (
                                      <CButton
                                        size="sm"
                                        color="secondary"
                                        variant="outline"
                                        value={val.staff_id}
                                        disabled
                                      >
                                        No Data
                                      </CButton>
                                    )
                                  ) : (
                                    ''
                                  )}
                                  {staffList?.filter(
                                    (idx) =>
                                      (idx.staff_id === val.staff_id && idx.staff_id === userid) ||
                                      (idx.staff_id === val.staff_id &&
                                        idx.reporting_to === userid),
                                  ).length > 0 ? (
                                    cga?.filter(
                                      (idx) =>
                                        (idx.staff_id === val.staff_id &&
                                          idx.staff_id === userid &&
                                          idx.staff_competency_session === 1 &&
                                          idx.staff_competency_type === 3) ||
                                        (idx.staff_id === val.staff_id &&
                                          idx.reporting_to === userid &&
                                          idx.staff_competency_session === 2 &&
                                          idx.staff_competency_type === 3),
                                    ).length > 0 ? (
                                      ''
                                    ) : (
                                      <CButton
                                        size="sm"
                                        color="primary"
                                        variant="outline"
                                        value={val.staff_id}
                                        onClick={(e) => {
                                          setSurvey(2)
                                          setPick(e.target.value)
                                          setOnModal2(!onModal2)
                                        }}
                                        disabled={false}
                                      >
                                        <CIcon icon={cilPencil} /> Evaluate
                                      </CButton>
                                    )
                                  ) : (
                                    ''
                                  )}
                                </CButtonGroup>
                              </CTableDataCell>
                            ) : null}
                            {/* CGA SURVEY */}
                            {setting[0]?.setting_app_survey_1 === 1 ? (
                              <CTableDataCell>
                                <CButtonGroup>
                                  {userType?.data[0].type === 'admin' ? (
                                    cga?.filter(
                                      (idx) =>
                                        idx.staff_id === val.staff_id &&
                                        idx.staff_competency_type === 1,
                                    ).length > 0 ? (
                                      <CButton
                                        size="sm"
                                        color="success"
                                        variant="outline"
                                        value={val.staff_id}
                                        onClick={(e) => {
                                          setVisibleDetail3(!visibleDetail3)
                                          setActiveCga(
                                            cga?.filter(
                                              (idx) =>
                                                idx.staff_id === val.staff_id &&
                                                idx.staff_competency_type === 1,
                                            ),
                                          )
                                        }}
                                      >
                                        <CIcon icon={cilNotes} /> View
                                      </CButton>
                                    ) : (
                                      <CButton
                                        size="sm"
                                        color="secondary"
                                        variant="outline"
                                        value={val.staff_id}
                                        disabled
                                      >
                                        No Data
                                      </CButton>
                                    )
                                  ) : (
                                    ''
                                  )}
                                  {staffList?.filter(
                                    (idx) =>
                                      (idx.staff_id === val.staff_id && idx.staff_id === userid) ||
                                      (idx.staff_id === val.staff_id &&
                                        idx.reporting_to === userid),
                                  ).length > 0 ? (
                                    cga?.filter(
                                      (idx) =>
                                        (idx.staff_id === val.staff_id &&
                                          idx.staff_id === userid &&
                                          idx.staff_competency_session === 1 &&
                                          idx.staff_competency_type === 1) ||
                                        (idx.staff_id === val.staff_id &&
                                          idx.reporting_to === userid &&
                                          idx.staff_competency_session === 2 &&
                                          idx.staff_competency_type === 1),
                                    ).length > 0 ? (
                                      ''
                                    ) : (
                                      <CButton
                                        size="sm"
                                        color="primary"
                                        variant="outline"
                                        value={val.staff_id}
                                        onClick={(e) => {
                                          setSurvey(3)
                                          setPick(e.target.value)
                                          setOnModal3(!onModal3)
                                        }}
                                      >
                                        <CIcon icon={cilPencil} /> Evaluate
                                      </CButton>
                                    )
                                  ) : (
                                    ''
                                  )}
                                </CButtonGroup>
                              </CTableDataCell>
                            ) : null}
                          </CTableRow>
                        )
                      })}
                  </CTableBody>
                </CTable>
              </>
            )}
          </CCardBody>
          <CCardFooter style={{ backgroundColor: '#4f5d73', color: 'whitesmoke' }}>
            Competency Assessment are based on staff specific position
          </CCardFooter>
        </CCard>
      </CContainer>
      <Form onModal={onModal} setOnModal={setOnModal} pick={pick} survey={survey} />
      <Form2 onModal={onModal2} setOnModal={setOnModal2} pick={pick} survey={survey} />
      <Form3 onModal={onModal3} setOnModal={setOnModal3} pick={pick} survey={survey} />
      <CGAResultDetail
        visible={visibleDetail}
        setVisible={setVisibleDetail}
        cga={activeCga}
        staffList={staffList}
      />
      <CGAResultDetail2
        visible={visibleDetail2}
        setVisible={setVisibleDetail2}
        cga={activeCga}
        staffList={staffList}
      />
      <CGAResultDetail3
        visible={visibleDetail3}
        setVisible={setVisibleDetail3}
        cga={activeCga}
        staffList={staffList}
      />
      <CGASubmission1
        open={viewStatus}
        setOpen={setViewStatus}
        employeedata={staffList}
        userid={userStatus}
        cgadata={cga}
      />
    </>
  )
}

export default CGATable2
