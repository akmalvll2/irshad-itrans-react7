import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CTable,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CSpinner,
  CBadge,
  CRow,
  CCol,
} from '@coreui/react'
import img2 from '../../assets/images/4.png'

import { userType } from 'src/userType'

import packageJson from '../../../package.json'
const { config } = packageJson

const StaffInfo = () => {
  const [user, setUser] = useState([])
  const [cga, setCga] = useState([])
  const [setting, setSetting] = useState([])
  const [loadUser, setLoadUser] = useState(false)
  const [loadCga, setLoadCga] = useState(false)

  var cga1 = cga?.filter(
    (item) => item.staff_competency_session === 1 && item.staff_id === userType?.data[0].staff_id,
  )
  var cga2 = cga?.filter(
    (item) => item.staff_competency_session === 2 && item.staff_id === userType?.data[0].staff_id,
  )
  var cga3 = cga?.filter(
    (item) => item.staff_competency_session === 3 && item.staff_id === userType?.data[0].staff_id,
  )
  var cga4 = cga?.filter(
    (item) => item.staff_competency_session === 4 && item.staff_id === userType?.data[0].staff_id,
  )
  var cga5 = cga?.filter(
    (item) => item.staff_competency_session === 5 && item.staff_id === userType?.data[0].staff_id,
  )
  var cga6 = cga?.filter(
    (item) => item.staff_competency_session === 6 && item.staff_id === userType?.data[0].staff_id,
  )
  var cga7 = cga?.filter(
    (item) => item.staff_competency_session === 7 && item.staff_id === userType?.data[0].staff_id,
  )
  var cga8 = cga?.filter(
    (item) => item.staff_competency_session === 8 && item.staff_id === userType?.data[0].staff_id,
  )

  const currUser = user?.filter((itm) => itm.staff_id === userType?.data[0].staff_id)
  const totalLeadershipSubmission = (type) => {
    var total = 0
    if (type === 'peer') {
      if (currUser[0]?.reviewer_one !== null) {
        total = total + 1
      }
      if (currUser[0]?.reviewer_two !== null) {
        total = total + 1
      }
      if (currUser[0]?.reviewer_three !== null) {
        total = total + 1
      }
      return total
    }
    if (type === 'subordinate') {
      if (currUser[0]?.reviewer_four !== null) {
        total = total + 1
      }
      if (currUser[0]?.reviewer_five !== null) {
        total = total + 1
      }
      if (currUser[0]?.reviewer_six !== null) {
        total = total + 1
      }
      return total
    }
  }

  const totalLeadershipComplete = (type) => {
    var total = 0
    if (type === 'peer') {
      if (
        cga3?.length > 0 &&
        currUser[0]?.reviewer_one !== null &&
        cga3[0]?.staff_competency_type === 2
      ) {
        total = total + 1
      }
      if (
        cga4?.length > 0 &&
        currUser[0]?.reviewer_two !== null &&
        cga4[0]?.staff_competency_type === 2
      ) {
        total = total + 1
      }
      if (
        cga5?.length > 0 &&
        currUser[0]?.reviewer_three !== null &&
        cga5[0]?.staff_competency_type === 2
      ) {
        total = total + 1
      }
      return total
    }
    if (type === 'subordinate') {
      if (
        cga6?.length > 0 &&
        currUser[0]?.reviewer_four !== null &&
        cga6[0]?.staff_competency_type === 2
      ) {
        total = total + 1
      }
      if (
        cga7?.length > 0 &&
        currUser[0]?.reviewer_five !== null &&
        cga7[0]?.staff_competency_type === 2
      ) {
        total = total + 1
      }
      if (
        cga8?.length > 0 &&
        currUser[0]?.reviewer_six !== null &&
        cga8[0]?.staff_competency_type === 2
      ) {
        total = total + 1
      }
      return total
    }
  }

  const totalToAssess = () => {
    const total = user?.filter(
      (itm) =>
        itm.reporting_to === currUser[0]?.staff_id ||
        itm.reviewer_one === currUser[0]?.staff_id ||
        itm.reviewer_two === currUser[0]?.staff_id ||
        itm.reviewer_three === currUser[0]?.staff_id ||
        itm.reviewer_four === currUser[0]?.staff_id ||
        itm.reviewer_five === currUser[0]?.staff_id ||
        itm.reviewer_six === currUser[0]?.staff_id,
    ).length

    return total
  }

  const totalCompleteToAssess = () => {
    var total = 0
    if (
      user?.filter(
        (itm) =>
          itm.reporting_to === currUser[0]?.staff_id &&
          itm.staff_id.includes(cga?.filter((itm) => itm.staff_competency_session === 2).staff_id),
      ).length > 0
    ) {
      total = total + 1
    }
    if (
      user?.filter(
        (itm) =>
          itm.reviewer_one === currUser[0]?.staff_id &&
          itm.staff_id.includes(cga?.filter((itm) => itm.staff_competency_session === 3).staff_id),
      ).length > 0
    ) {
      total = total + 1
    }
    if (
      user?.filter(
        (itm) =>
          itm.reviewer_two === currUser[0]?.staff_id &&
          itm.staff_id.includes(cga?.filter((itm) => itm.staff_competency_session === 4).staff_id),
      ).length > 0
    ) {
      total = total + 1
    }
    if (
      user?.filter(
        (itm) =>
          itm.reviewer_three === currUser[0]?.staff_id &&
          itm.staff_id.includes(cga?.filter((itm) => itm.staff_competency_session === 5).staff_id),
      ).length > 0
    ) {
      total = total + 1
    }
    if (
      user?.filter(
        (itm) =>
          itm.reviewer_four === currUser[0]?.staff_id &&
          itm.staff_id.includes(cga?.filter((itm) => itm.staff_competency_session === 6).staff_id),
      ).length > 0
    ) {
      total = total + 1
    }
    if (
      user?.filter(
        (itm) =>
          itm.reviewer_five === currUser[0]?.staff_id &&
          itm.staff_id.includes(cga?.filter((itm) => itm.staff_competency_session === 7).staff_id),
      ).length > 0
    ) {
      total = total + 1
    }
    if (
      user?.filter(
        (itm) =>
          itm.reviewer_six === currUser[0]?.staff_id &&
          itm.staff_id.includes(cga?.filter((itm) => itm.staff_competency_session === 8).staff_id),
      ).length > 0
    ) {
      total = total + 1
    }
    return total
  }

  const fetchSetting = async () => {
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

  const fetchUser = async () => {
    try {
      setLoadUser(true)
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/user`).then((response) => {
        if (response) {
          setUser(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoadUser(false)
    }
  }

  const fetchCga = async () => {
    try {
      setLoadCga(true)
      await axios.post(`${config.REACT_APP_API_ENDPOINT}/cgaresultall`).then((response) => {
        if (response) {
          setCga(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoadCga(false)
    }
  }

  const currentUser = user?.filter((itm) => itm.staff_id === userType?.data[0].staff_id)

  useEffect(() => {
    fetchUser()
    fetchSetting()
    fetchCga()
  }, [])
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader
              style={{
                backgroundImage: `url(${img2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <center>
                <CCardTitle style={{ color: 'navy' }}>STAFF INFORMATION</CCardTitle>
              </center>
            </CCardHeader>
            <CCardBody>
              {loadUser ? (
                <CSpinner component="span" size="lg" color="dark" aria-hidden="true" />
              ) : (
                <CTable responsive small bordered>
                  <CTableBody>
                    <CTableRow>
                      <CTableHeaderCell style={{ width: '12rem' }}>Name: </CTableHeaderCell>
                      <CTableDataCell>
                        {currentUser[0]?.staff_name ? (
                          currentUser[0]?.staff_name
                        ) : (
                          <CBadge size="sm" color="danger">
                            Not available
                          </CBadge>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Position & Grade: </CTableHeaderCell>
                      <CTableDataCell>
                        {currentUser[0]?.jobTitle ? (
                          currentUser[0]?.jobTitle
                        ) : (
                          <CBadge size="sm" color="danger">
                            Not available
                          </CBadge>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Department: </CTableHeaderCell>
                      <CTableDataCell>
                        {currentUser[0]?.departmentname ? (
                          currentUser[0]?.departmentname
                        ) : (
                          <CBadge size="sm" color="danger">
                            Not available
                          </CBadge>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Superior: </CTableHeaderCell>
                      <CTableDataCell>
                        {
                          user?.find((itm) => itm?.staff_id === currentUser[0]?.reporting_to)
                            ?.staff_name
                        }
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <br />
      <CRow>
        <CCol>
          <CCard className="">
            <CCardHeader
              style={{
                backgroundImage: `url(${img2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <center>
                <CCardTitle style={{ color: 'navy' }}>MY ASSESSMENT STATUS</CCardTitle>
              </center>
            </CCardHeader>
            <CCardBody>
              {/* FOR CGA SURVEY */}
              {setting[0]?.setting_app_survey_1 === 1 ? (
                <>
                  <CTable responsive small bordered>
                    <CTableBody>
                      <CTableRow>
                        <CTableHeaderCell>Self Assessment: </CTableHeaderCell>
                        <CTableDataCell>
                          {currentUser[0]?.stat !== null ? (
                            currentUser[0]?.stat > 0 ? (
                              <CBadge size="sm" color="info">
                                Complete
                              </CBadge>
                            ) : (
                              <CBadge size="sm" color="danger">
                                Incomplete
                              </CBadge>
                            )
                          ) : (
                            'Not available'
                          )}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell>Superior Assessment: </CTableHeaderCell>
                        <CTableDataCell>
                          {currentUser[0]?.stat2 !== null ? (
                            currentUser[0]?.stat2 > 0 ? (
                              <CBadge size="sm" color="info">
                                Complete
                              </CBadge>
                            ) : (
                              <CBadge size="sm" color="danger">
                                Incomplete
                              </CBadge>
                            )
                          ) : (
                            'Not available'
                          )}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell>Subordinate Assessment: </CTableHeaderCell>
                        <CTableDataCell>...</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell>Peers Assessment: </CTableHeaderCell>
                        <CTableDataCell>...</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </>
              ) : (
                ''
              )}
              {/* FOR LEADERSHIP SURVEY */}
              {setting[0]?.setting_app_survey_2 === 1 ? (
                <>
                  <center>
                    <h6>LEADERSHIP ASSESSMENT</h6>
                  </center>
                  <CTable responsive small bordered>
                    <CTableBody>
                      <CTableRow>
                        <CTableHeaderCell>Self Assessment: </CTableHeaderCell>
                        <CTableDataCell>
                          {currentUser[0]?.stat !== null ? (
                            currentUser[0]?.stat > 0 ? (
                              <CBadge size="sm" color="info">
                                Complete
                              </CBadge>
                            ) : (
                              <CBadge size="sm" color="danger">
                                Incomplete
                              </CBadge>
                            )
                          ) : (
                            'Not available'
                          )}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell>Superior Assessment: </CTableHeaderCell>
                        <CTableDataCell>
                          {currentUser[0]?.stat2 !== null ? (
                            currentUser[0]?.stat2 > 0 ? (
                              <CBadge size="sm" color="info">
                                Complete
                              </CBadge>
                            ) : (
                              <CBadge size="sm" color="danger">
                                Incomplete
                              </CBadge>
                            )
                          ) : (
                            'Not available'
                          )}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell>Subordinate Assessment: </CTableHeaderCell>
                        <CTableDataCell>
                          {userType?.data[0].type === 'admin' ? (
                            'Not Available'
                          ) : (
                            <>
                              <CBadge size="sm" color="success">
                                Total : {totalLeadershipSubmission('subordinate')}
                              </CBadge>
                              <CBadge size="sm" color="info">
                                Complete : {totalLeadershipComplete('subordinate')}
                              </CBadge>
                              <CBadge size="sm" color="danger">
                                Incomplete :{' '}
                                {totalLeadershipSubmission('subordinate') -
                                  totalLeadershipComplete('subordinate')}
                              </CBadge>
                            </>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell>Peers Assessment: </CTableHeaderCell>
                        <CTableDataCell>
                          {userType?.data[0].type === 'admin' ? (
                            'Not Available'
                          ) : (
                            <>
                              <CBadge size="sm" color="success">
                                Total : {totalLeadershipSubmission('peer')}
                              </CBadge>
                              <CBadge size="sm" color="info">
                                Complete : {totalLeadershipComplete('peer')}
                              </CBadge>
                              <CBadge size="sm" color="danger">
                                Incomplete :{' '}
                                {totalLeadershipSubmission('peer') -
                                  totalLeadershipComplete('peer')}
                              </CBadge>
                            </>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </>
              ) : (
                ''
              )}
              {/* FOR FUNCTIONAL SURVEY */}
              {setting[0]?.setting_app_survey_3 === 1 ? (
                <>
                  <center>
                    <h6>FUNCTIONAL ASSESSMENT</h6>
                  </center>
                  <CTable responsive small bordered>
                    <CTableBody>
                      <CTableRow>
                        <CTableHeaderCell>Self Assessment: </CTableHeaderCell>
                        <CTableDataCell>
                          {currentUser[0]?.stat !== null ? (
                            currentUser[0]?.stat > 0 ? (
                              <CBadge size="sm" color="info">
                                Complete
                              </CBadge>
                            ) : (
                              <CBadge size="sm" color="danger">
                                Incomplete
                              </CBadge>
                            )
                          ) : (
                            'Not available'
                          )}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell>Superior Assessment: </CTableHeaderCell>
                        <CTableDataCell>
                          {currentUser[0]?.stat2 !== null ? (
                            currentUser[0]?.stat2 > 0 ? (
                              <CBadge size="sm" color="info">
                                Complete
                              </CBadge>
                            ) : (
                              <CBadge size="sm" color="danger">
                                Incomplete
                              </CBadge>
                            )
                          ) : (
                            'Not available'
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </>
              ) : (
                ''
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader
              style={{
                backgroundImage: `url(${img2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <center>
                <CCardTitle style={{ color: 'navy' }}>MY ASSESSMENT TASK</CCardTitle>
              </center>
            </CCardHeader>
            <CCardBody>
              <CTable responsive small bordered>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell>Number of Staff To Assess: </CTableHeaderCell>
                    <CTableDataCell>
                      <CBadge size="sm" color="success">
                        {totalToAssess()}
                      </CBadge>
                    </CTableDataCell>
                  </CTableRow>
                  {/*<CTableRow>
                    <CTableHeaderCell>Complete Task: </CTableHeaderCell>
                    <CTableDataCell>{totalCompleteToAssess()}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell>Incomplete Task: </CTableHeaderCell>
                    <CTableDataCell>...</CTableDataCell>
            </CTableRow>*/}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default StaffInfo
