import {
  CModal,
  CModalHeader,
  CModalTitle,
  CButton,
  CModalBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPopover,
} from '@coreui/react'
import React from 'react'
import axios from 'axios'
import propTypes from 'prop-types'
import { userType } from 'src/userType'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPrint, cilLightbulb } from '@coreui/icons'

import packageJson from '../../../../package.json'
const { config } = packageJson

const CGAResultDetail = ({ visible, setVisible, cga, staffList }) => {
  var cga1 = cga?.filter((item) => item.staff_competency_session === 1)
  var cga2 = cga?.filter((item) => item.staff_competency_session === 2)
  var cga3 = cga?.filter((item) => item.staff_competency_session === 3)
  var cga4 = cga?.filter((item) => item.staff_competency_session === 4)
  var cga5 = cga?.filter((item) => item.staff_competency_session === 5)
  var cga6 = cga?.filter((item) => item.staff_competency_session === 6)
  var cga7 = cga?.filter((item) => item.staff_competency_session === 7)
  var cga8 = cga?.filter((item) => item.staff_competency_session === 8)

  const fetchDate = (cga) => {
    const date = new Date(cga[0]?.staff_competency_date)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const newDate = `${year}-${month}-${day}`

    return newDate
  }

  const handleDelete = async (e, id, session, date) => {
    e.preventDefault()
    let confirmdelete = window.confirm('Delete Submission ?')
    if (confirmdelete) {
      try {
        const surveyType = 2
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/cgadelete`, { id, session, date, surveyType })
          .then((response) => {
            if (response) {
              alert(response.data)
              window.location.reload()
            } else {
              console.log('Error Deleting Submission')
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handlePrint = (id) => {
    const printContent = document.getElementById(id).innerHTML
    const originalContent = document.body.innerHTML

    document.body.innerHTML = printContent
    window.print()
    document.body.innerHTML = originalContent
    window.location.reload()
  }

  const rounded = (num) => {
    const roundnum = num.toFixed(2)
    return roundnum
  }

  return (
    <>
      <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader
          onClose={() => setVisible(false)}
          style={{ backgroundColor: '#4f5d73', color: 'whitesmoke' }}
        >
          <CModalTitle style={{ width: '100%', textAlign: 'center', textTransform: 'uppercase' }}>
            LEADERSHIP SUBMISSION <br />
            <div style={{ fontFamily: 'courier new' }}>
              NAME : <u>{cga?.slice(0, 1).map((item) => item.staff_name)}</u>
            </div>
            <div style={{ fontFamily: 'courier new' }}>
              DESIGNATION : <u>{cga?.slice(0, 1).map((item) => item.job_title)}</u>
            </div>
            <div style={{ fontFamily: 'courier new' }}>
              DEPARTMENT : <u>{cga?.slice(0, 1).map((item) => item.department_name)}</u>
            </div>
          </CModalTitle>
        </CModalHeader>
        <CModalBody style={{ fontFamily: 'sans serif' }}>
          {/* SELF SUBMISSION */}
          {cga1?.length > 0 ? (
            <div>
              {userType?.data[0].type === 'admin' ? (
                <div style={{ float: 'right' }}>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={() => handlePrint('tab1')}
                  >
                    <CIcon icon={cilPrint} />
                  </CButton>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={(e) =>
                      handleDelete(
                        e,
                        cga1[0]?.staff_id,
                        cga1[0]?.staff_competency_session,
                        fetchDate(cga1),
                      )
                    }
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </div>
              ) : (
                ''
              )}
              <div id="tab1">
                <CTable small striped bordered>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        colSpan={4}
                        style={{ backgroundColor: '#4f5d73', color: 'white' }}
                      >
                        <div style={{ float: 'left' }}>
                          <span style={{ color: 'orange' }}>SELF SUBMISSION</span> ( BY :{' '}
                          <u>{cga1[0]?.staff_name}</u> )
                        </div>
                        <div style={{ float: 'right' }}>
                          DATE : <u>{fetchDate(cga1)}</u>
                        </div>
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Competency</CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score1 !== null ? 'First Indicator' : 'First Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score2 !== null
                          ? 'Second Indicator'
                          : 'Second Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score3 !== null ? 'Third Indicator' : 'Third Indicator'}
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {cga1.map((val, key) => {
                      return (
                        <CTableRow key={key}>
                          <CTableDataCell>{val.competency_name}</CTableDataCell>
                          {val.indicator_score1 ? (
                            <CTableDataCell>{val.indicator_score1}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score2 ? (
                            <CTableDataCell>{val.indicator_score2}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score3 ? (
                            <CTableDataCell>{val.indicator_score3}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </div>
            </div>
          ) : (
            ''
          )}
          {/* MANAGER SUBMISSION */}
          {cga2?.length > 0 ? (
            <div>
              {userType?.data[0].type === 'admin' ? (
                <div style={{ float: 'right' }}>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={() => handlePrint('tab2')}
                  >
                    <CIcon icon={cilPrint} />
                  </CButton>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={(e) =>
                      handleDelete(
                        e,
                        cga2[0]?.staff_id,
                        cga2[0]?.staff_competency_session,
                        fetchDate(cga2),
                      )
                    }
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </div>
              ) : (
                ''
              )}
              <div id="tab2">
                <CTable small striped bordered>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        colSpan={4}
                        style={{ backgroundColor: '#4f5d73', color: 'white' }}
                      >
                        <div style={{ float: 'left' }}>
                          <span style={{ color: 'orange' }}>SUPERIOR SUBMISSION</span> ( BY :{' '}
                          <u>
                            {staffList
                              ?.filter((idx) => idx.staff_id === cga2[0]?.reporting_to)
                              .map((val) => val.staff_name)}
                          </u>{' '}
                          )
                        </div>
                        <div style={{ float: 'right' }}>
                          DATE : <u>{fetchDate(cga2)}</u>
                        </div>
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Competency</CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score1 !== null ? 'First Indicator' : 'First Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score2 !== null
                          ? 'Second Indicator'
                          : 'Second Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score3 !== null ? 'Third Indicator' : 'Third Indicator'}
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {cga2?.map((val, key) => {
                      return (
                        <CTableRow key={key}>
                          <CTableDataCell>{val.competency_name}</CTableDataCell>
                          {val.indicator_score1 ? (
                            <CTableDataCell>{val.indicator_score1}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score2 ? (
                            <CTableDataCell>{val.indicator_score2}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score3 ? (
                            <CTableDataCell>{val.indicator_score3}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </div>
            </div>
          ) : (
            ''
          )}
          {/* SUBORDINATE 1 SUBMISSION */}
          {cga3?.length > 0 ? (
            <div>
              {userType?.data[0].type === 'admin' ? (
                <div style={{ float: 'right' }}>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={() => handlePrint('tab3')}
                  >
                    <CIcon icon={cilPrint} />
                  </CButton>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={(e) =>
                      handleDelete(
                        e,
                        cga3[0]?.staff_id,
                        cga3[0]?.staff_competency_session,
                        fetchDate(cga3),
                      )
                    }
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </div>
              ) : (
                ''
              )}
              <div id="tab3">
                <CTable small striped bordered>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        colSpan={4}
                        style={{ backgroundColor: '#4f5d73', color: 'white' }}
                      >
                        <div style={{ float: 'left' }}>
                          <span style={{ color: 'orange' }}>SUBORDINATE SUBMISSION</span> ( BY :{' '}
                          <u>
                            {staffList
                              ?.filter((idx) => idx.staff_id === cga2[0]?.reviewer_one)
                              .map((val) => val.staff_name)}
                          </u>{' '}
                          )
                        </div>
                        <div style={{ float: 'right' }}>
                          DATE : <u>{fetchDate(cga3)}</u>
                        </div>
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Competency</CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score1 !== null ? 'First Indicator' : 'First Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score2 !== null
                          ? 'Second Indicator'
                          : 'Second Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score3 !== null ? 'Third Indicator' : 'Third Indicator'}
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {cga3.map((val, key) => {
                      return (
                        <CTableRow key={key}>
                          <CTableDataCell>{val.competency_name}</CTableDataCell>
                          {val.indicator_score1 ? (
                            <CTableDataCell>{val.indicator_score1}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score2 ? (
                            <CTableDataCell>{val.indicator_score2}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score3 ? (
                            <CTableDataCell>{val.indicator_score3}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </div>
            </div>
          ) : (
            ''
          )}
          {/* SUBORDINATE 2 SUBMISSION */}
          {cga4?.length > 0 ? (
            <div>
              {userType?.data[0].type === 'admin' ? (
                <div style={{ float: 'right' }}>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={() => handlePrint('tab4')}
                  >
                    <CIcon icon={cilPrint} />
                  </CButton>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={(e) =>
                      handleDelete(
                        e,
                        cga4[0]?.staff_id,
                        cga4[0]?.staff_competency_session,
                        fetchDate(cga4),
                      )
                    }
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </div>
              ) : (
                ''
              )}
              <div id="tab4">
                <CTable small striped bordered>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        colSpan={4}
                        style={{ backgroundColor: '#4f5d73', color: 'white' }}
                      >
                        <div style={{ float: 'left' }}>
                          <span style={{ color: 'orange' }}>SUBORDINATE SUBMISSION</span> ( BY :{' '}
                          <u>
                            {staffList
                              ?.filter((idx) => idx.staff_id === cga4[0]?.reviewer_two)
                              .map((val) => val.staff_name)}
                          </u>{' '}
                          )
                        </div>
                        <div style={{ float: 'right' }}>
                          DATE : <u>{fetchDate(cga4)}</u>
                        </div>
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Competency</CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score1 !== null ? 'First Indicator' : 'First Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score2 !== null
                          ? 'Second Indicator'
                          : 'Second Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score3 !== null ? 'Third Indicator' : 'Third Indicator'}
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {cga4.map((val, key) => {
                      return (
                        <CTableRow key={key}>
                          <CTableDataCell>{val.competency_name}</CTableDataCell>
                          {val.indicator_score1 ? (
                            <CTableDataCell>{val.indicator_score1}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score2 ? (
                            <CTableDataCell>{val.indicator_score2}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score3 ? (
                            <CTableDataCell>{val.indicator_score3}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </div>
            </div>
          ) : (
            ''
          )}
          {/* SUBORDINATE 3 SUBMISSION */}
          {cga5?.length > 0 ? (
            <div>
              {userType?.data[0].type === 'admin' ? (
                <div style={{ float: 'right' }}>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={() => handlePrint('tab5')}
                  >
                    <CIcon icon={cilPrint} />
                  </CButton>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={(e) =>
                      handleDelete(
                        e,
                        cga5[0]?.staff_id,
                        cga5[0]?.staff_competency_session,
                        fetchDate(cga5),
                      )
                    }
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </div>
              ) : (
                ''
              )}
              <div id="tab5">
                <CTable small striped bordered>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        colSpan={4}
                        style={{ backgroundColor: '#4f5d73', color: 'white' }}
                      >
                        <div style={{ float: 'left' }}>
                          <span style={{ color: 'orange' }}>SUBORDINATE SUBMISSION</span> ( BY :{' '}
                          <u>
                            {staffList
                              ?.filter((idx) => idx.staff_id === cga5[0]?.reviewer_three)
                              .map((val) => val.staff_name)}
                          </u>{' '}
                          )
                        </div>
                        <div style={{ float: 'right' }}>
                          DATE : <u>{fetchDate(cga5)}</u>
                        </div>
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Competency</CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score1 !== null ? 'First Indicator' : 'First Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score2 !== null
                          ? 'Second Indicator'
                          : 'Second Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score3 !== null ? 'Third Indicator' : 'Third Indicator'}
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {cga5.map((val, key) => {
                      return (
                        <CTableRow key={key}>
                          <CTableDataCell>{val.competency_name}</CTableDataCell>
                          {val.indicator_score1 ? (
                            <CTableDataCell>{val.indicator_score1}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score2 ? (
                            <CTableDataCell>{val.indicator_score2}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score3 ? (
                            <CTableDataCell>{val.indicator_score3}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </div>
            </div>
          ) : (
            ''
          )}
          {/* PEER 1 SUBMISSION */}
          {cga6?.length > 0 ? (
            <div>
              {userType?.data[0].type === 'admin' ? (
                <div style={{ float: 'right' }}>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={() => handlePrint('tab6')}
                  >
                    <CIcon icon={cilPrint} />
                  </CButton>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={(e) =>
                      handleDelete(
                        e,
                        cga6[0]?.staff_id,
                        cga6[0]?.staff_competency_session,
                        fetchDate(cga6),
                      )
                    }
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </div>
              ) : (
                ''
              )}
              <div id="tab6">
                <CTable small striped bordered>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        colSpan={4}
                        style={{ backgroundColor: '#4f5d73', color: 'white' }}
                      >
                        <div style={{ float: 'left' }}>
                          <span style={{ color: 'orange' }}>PEER SUBMISSION</span> ( BY :{' '}
                          <u>
                            {staffList
                              ?.filter((idx) => idx.staff_id === cga6[0]?.reviewer_four)
                              .map((val) => val.staff_name)}
                          </u>{' '}
                          )
                        </div>
                        <div style={{ float: 'right' }}>
                          DATE : <u>{fetchDate(cga6)}</u>
                        </div>
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Competency</CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score1 !== null ? 'First Indicator' : 'First Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score2 !== null
                          ? 'Second Indicator'
                          : 'Second Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score3 !== null ? 'Third Indicator' : 'Third Indicator'}
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {cga6.map((val, key) => {
                      return (
                        <CTableRow key={key}>
                          <CTableDataCell>{val.competency_name}</CTableDataCell>
                          {val.indicator_score1 ? (
                            <CTableDataCell>{val.indicator_score1}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score2 ? (
                            <CTableDataCell>{val.indicator_score2}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score3 ? (
                            <CTableDataCell>{val.indicator_score3}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </div>
            </div>
          ) : (
            ''
          )}
          {/* PEER 2 SUBMISSION */}
          {cga7?.length > 0 ? (
            <div>
              {userType?.data[0].type === 'admin' ? (
                <div style={{ float: 'right' }}>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={() => handlePrint('tab7')}
                  >
                    <CIcon icon={cilPrint} />
                  </CButton>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={(e) =>
                      handleDelete(
                        e,
                        cga7[0]?.staff_id,
                        cga7[0]?.staff_competency_session,
                        fetchDate(cga7),
                      )
                    }
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </div>
              ) : (
                ''
              )}
              <div id="tab7">
                <CTable small striped bordered>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        colSpan={4}
                        style={{ backgroundColor: '#4f5d73', color: 'white' }}
                      >
                        <div style={{ float: 'left' }}>
                          <span style={{ color: 'orange' }}>PEER SUBMISSION</span> ( BY :{' '}
                          <u>
                            {staffList
                              ?.filter((idx) => idx.staff_id === cga7[0]?.reviewer_five)
                              .map((val) => val.staff_name)}
                          </u>{' '}
                          )
                        </div>
                        <div style={{ float: 'right' }}>
                          DATE : <u>{fetchDate(cga7)}</u>
                        </div>
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Competency</CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score1 !== null ? 'First Indicator' : 'First Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score2 !== null
                          ? 'Second Indicator'
                          : 'Second Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score3 !== null ? 'Third Indicator' : 'Third Indicator'}
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {cga7.map((val, key) => {
                      return (
                        <CTableRow key={key}>
                          <CTableDataCell>{val.competency_name}</CTableDataCell>
                          {val.indicator_score1 ? (
                            <CTableDataCell>{val.indicator_score1}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score2 ? (
                            <CTableDataCell>{val.indicator_score2}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score3 ? (
                            <CTableDataCell>{val.indicator_score3}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </div>
            </div>
          ) : (
            ''
          )}
          {/* PEER 3 SUBMISSION */}
          {cga8?.length > 0 ? (
            <div>
              {userType?.data[0].type === 'admin' ? (
                <div style={{ float: 'right' }}>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={() => handlePrint('tab8')}
                  >
                    <CIcon icon={cilPrint} />
                  </CButton>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={(e) =>
                      handleDelete(
                        e,
                        cga8[0]?.staff_id,
                        cga8[0]?.staff_competency_session,
                        fetchDate(cga8),
                      )
                    }
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </div>
              ) : (
                ''
              )}
              <div id="tab8">
                <CTable small striped bordered>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        colSpan={4}
                        style={{ backgroundColor: '#4f5d73', color: 'white' }}
                      >
                        <div style={{ float: 'left' }}>
                          <span style={{ color: 'orange' }}>PEER SUBMISSION</span> ( BY :{' '}
                          <u>
                            {staffList
                              ?.filter((idx) => idx.staff_id === cga8[0]?.reviewer_six)
                              .map((val) => val.staff_name)}
                          </u>{' '}
                          )
                        </div>
                        <div style={{ float: 'right' }}>
                          DATE : <u>{fetchDate(cga8)}</u>
                        </div>
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Competency</CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score1 !== null ? 'First Indicator' : 'First Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score2 !== null
                          ? 'Second Indicator'
                          : 'Second Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        {cga[0]?.indicator_score3 !== null ? 'Third Indicator' : 'Third Indicator'}
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {cga8.map((val, key) => {
                      return (
                        <CTableRow key={key}>
                          <CTableDataCell>{val.competency_name}</CTableDataCell>
                          {val.indicator_score1 ? (
                            <CTableDataCell>{val.indicator_score1}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score2 ? (
                            <CTableDataCell>{val.indicator_score2}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.indicator_score3 ? (
                            <CTableDataCell>{val.indicator_score3}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </div>
            </div>
          ) : (
            ''
          )}
          {/* OVERALL RESULT */}
          {cga1?.length > 0 &&
          cga2?.length > 0 &&
          ((cga3?.length > 0 && cga3[0].reviewer_one !== null) ||
            (cga4?.length > 0 && cga4[0].reviewer_two !== null) ||
            (cga5?.length > 0 && cga5[0].reviewer_three !== null) ||
            (cga6?.length > 0 && cga6[0].reviewer_four !== null) ||
            (cga7?.length > 0 && cga7[0].reviewer_five !== null) ||
            (cga8?.length > 0 && cga8[0].reviewer_six !== null)) ? (
            <div>
              {/*userType?.data[0].type === 'admin' ? (
                <div style={{ float: 'right' }}>
                  <CButton
                    small
                    variant="outline"
                    color="secondary"
                    onClick={() => handlePrint('tab4')}
                  >
                    <CIcon icon={cilPrint} />
                  </CButton>
                </div>
              ) : (
                ''
              )*/}
              <div id="tab4">
                <CTable small striped responsive bordered>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        colSpan={14}
                        style={{ backgroundColor: '#4f5d73', color: 'white' }}
                      >
                        <div style={{ float: 'left' }}>
                          <span style={{ color: 'orange' }}>OVERALL</span>{' '}
                          <CPopover
                            content={
                              <div>
                                SLF = Self Assessment <br />
                                MNG = Manager/Superior Assessment <br />
                                PRS/SBO = Peers/Subordinate Assessment
                              </div>
                            }
                            placement="auto"
                            trigger={['hover', 'focus']}
                            sanitize={false}
                          >
                            <CIcon icon={cilLightbulb} />
                          </CPopover>
                        </div>
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell rowSpan={2}>Competency</CTableHeaderCell>
                      <CTableHeaderCell colSpan={4}>
                        {cga[0]?.indicator_score1 !== null ? <>First Indicator</> : 'No Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell colSpan={4}>
                        {cga[0]?.indicator_score2 !== null ? <>Second Indicator</> : 'No Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell colSpan={4}>
                        {cga[0]?.indicator_score3 !== null ? <>Third Indicator</> : 'No Indicator'}
                      </CTableHeaderCell>
                      <CTableHeaderCell rowSpan={2}>Total AVG</CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>SLF</CTableHeaderCell>
                      <CTableHeaderCell>MNG</CTableHeaderCell>
                      <CTableHeaderCell>PRS/SBO</CTableHeaderCell>
                      <CTableHeaderCell style={{ backgroundColor: 'lightgray' }}>
                        TOTAL
                      </CTableHeaderCell>
                      <CTableHeaderCell>SLF</CTableHeaderCell>
                      <CTableHeaderCell>MNG</CTableHeaderCell>
                      <CTableHeaderCell>PRS/SBO</CTableHeaderCell>
                      <CTableHeaderCell style={{ backgroundColor: 'lightgray' }}>
                        TOTAL
                      </CTableHeaderCell>
                      <CTableHeaderCell>SLF</CTableHeaderCell>
                      <CTableHeaderCell>MNG</CTableHeaderCell>
                      <CTableHeaderCell>PRS/SBO</CTableHeaderCell>
                      <CTableHeaderCell style={{ backgroundColor: 'lightgray' }}>
                        TOTAL
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {cga1.map((val, key) => {
                      return (
                        <CTableRow key={key}>
                          <CTableDataCell>
                            <CPopover
                              content={
                                <div>
                                  <CTable small responsive>
                                    <CTableHead>
                                      <CTableRow>
                                        <CTableHeaderCell>No</CTableHeaderCell>
                                        <CTableHeaderCell>Indicator</CTableHeaderCell>
                                        <CTableHeaderCell>Description</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                      <CTableRow>
                                        <CTableDataCell>{1}</CTableDataCell>
                                        <CTableDataCell>First</CTableDataCell>
                                        <CTableDataCell>{val.competency_indicator1}</CTableDataCell>
                                      </CTableRow>
                                      <CTableRow>
                                        <CTableDataCell>{2}</CTableDataCell>
                                        <CTableDataCell>Second</CTableDataCell>
                                        <CTableDataCell>{val.competency_indicator2}</CTableDataCell>
                                      </CTableRow>
                                      <CTableRow>
                                        <CTableDataCell>{3}</CTableDataCell>
                                        <CTableDataCell>Third</CTableDataCell>
                                        <CTableDataCell>{val.competency_indicator3}</CTableDataCell>
                                      </CTableRow>
                                    </CTableBody>
                                  </CTable>
                                </div>
                              }
                              placement="auto"
                              trigger={['hover', 'focus']}
                            >
                              <span className="d-inline-block" tabIndex={0}>
                                {val.competency_name}
                              </span>
                            </CPopover>
                          </CTableDataCell>
                          {cga1[key]?.indicator_score1 &&
                          cga2[key]?.indicator_score1 &&
                          cga3[key]?.indicator_score1 ? (
                            <>
                              <CTableDataCell>
                                {rounded(cga1[key]?.indicator_score1 * 0.3)}
                              </CTableDataCell>
                              <CTableDataCell>
                                {rounded(cga2[key]?.indicator_score1 * 0.6)}
                              </CTableDataCell>
                              <CTableDataCell>
                                {rounded(
                                  (cga3[key]?.indicator_score1
                                    ? cga3[key]?.indicator_score1
                                    : 0 + cga4[key]?.indicator_score1
                                    ? cga4[key]?.indicator_score1
                                    : 0 + cga5[key]?.indicator_score1
                                    ? cga5[key]?.indicator_score1
                                    : 0 + cga6[key]?.indicator_score1
                                    ? cga6[key]?.indicator_score1
                                    : 0 + cga7[key]?.indicator_score1
                                    ? cga7[key]?.indicator_score1
                                    : 0 + cga8[key]?.indicator_score1
                                    ? cga8[key]?.indicator_score1
                                    : 0) * 0.1,
                                )}
                              </CTableDataCell>
                              <CTableDataCell style={{ backgroundColor: 'lightgray' }}>
                                {rounded(
                                  cga1[key]?.indicator_score1 * 0.3 +
                                    cga2[key]?.indicator_score1 * 0.6 +
                                    (cga3[key]?.indicator_score1
                                      ? cga3[key]?.indicator_score1
                                      : 0 + cga4[key]?.indicator_score1
                                      ? cga4[key]?.indicator_score1
                                      : 0 + cga5[key]?.indicator_score1
                                      ? cga5[key]?.indicator_score1
                                      : 0 + cga6[key]?.indicator_score1
                                      ? cga6[key]?.indicator_score1
                                      : 0 + cga7[key]?.indicator_score1
                                      ? cga7[key]?.indicator_score1
                                      : 0 + cga8[key]?.indicator_score1
                                      ? cga8[key]?.indicator_score1
                                      : 0) *
                                      0.1,
                                )}
                              </CTableDataCell>
                            </>
                          ) : (
                            <CTableDataCell colSpan={3}>N/A</CTableDataCell>
                          )}
                          {cga1[key]?.indicator_score2 &&
                          cga2[key]?.indicator_score2 &&
                          cga3[key]?.indicator_score2 ? (
                            <>
                              <CTableDataCell>
                                {rounded(cga1[key]?.indicator_score2 * 0.3)}
                              </CTableDataCell>
                              <CTableDataCell>
                                {rounded(cga2[key]?.indicator_score2 * 0.6)}
                              </CTableDataCell>
                              <CTableDataCell>
                                {rounded(
                                  (cga3[key]?.indicator_score2
                                    ? cga3[key]?.indicator_score2
                                    : 0 + cga4[key]?.indicator_score2
                                    ? cga4[key]?.indicator_score2
                                    : 0 + cga5[key]?.indicator_score2
                                    ? cga5[key]?.indicator_score2
                                    : 0 + cga6[key]?.indicator_score2
                                    ? cga6[key]?.indicator_score2
                                    : 0 + cga7[key]?.indicator_score2
                                    ? cga7[key]?.indicator_score2
                                    : 0 + cga8[key]?.indicator_score2
                                    ? cga8[key]?.indicator_score2
                                    : 0) * 0.1,
                                )}
                              </CTableDataCell>
                              <CTableDataCell style={{ backgroundColor: 'lightgray' }}>
                                {rounded(
                                  cga1[key]?.indicator_score2 * 0.3 +
                                    cga2[key]?.indicator_score2 * 0.6 +
                                    (cga3[key]?.indicator_score2
                                      ? cga3[key]?.indicator_score2
                                      : 0 + cga4[key]?.indicator_score2
                                      ? cga4[key]?.indicator_score2
                                      : 0 + cga5[key]?.indicator_score2
                                      ? cga5[key]?.indicator_score2
                                      : 0 + cga6[key]?.indicator_score2
                                      ? cga6[key]?.indicator_score2
                                      : 0 + cga7[key]?.indicator_score2
                                      ? cga7[key]?.indicator_score2
                                      : 0 + cga8[key]?.indicator_score2
                                      ? cga8[key]?.indicator_score2
                                      : 0) *
                                      0.1,
                                )}
                              </CTableDataCell>
                            </>
                          ) : (
                            <CTableDataCell colSpan={3}>N/A</CTableDataCell>
                          )}
                          {cga1[key]?.indicator_score3 &&
                          cga2[key]?.indicator_score3 &&
                          cga3[key]?.indicator_score3 ? (
                            <>
                              <CTableDataCell>
                                {rounded(cga1[key]?.indicator_score3 * 0.3)}
                              </CTableDataCell>
                              <CTableDataCell>
                                {rounded(cga2[key]?.indicator_score3 * 0.6)}
                              </CTableDataCell>
                              <CTableDataCell>
                                {rounded(
                                  (cga3[key]?.indicator_score3
                                    ? cga3[key]?.indicator_score3
                                    : 0 + cga4[key]?.indicator_score3
                                    ? cga4[key]?.indicator_score3
                                    : 0 + cga5[key]?.indicator_score3
                                    ? cga5[key]?.indicator_score3
                                    : 0 + cga6[key]?.indicator_score3
                                    ? cga6[key]?.indicator_score3
                                    : 0 + cga7[key]?.indicator_score3
                                    ? cga7[key]?.indicator_score3
                                    : 0 + cga8[key]?.indicator_score3
                                    ? cga8[key]?.indicator_score3
                                    : 0) * 0.1,
                                )}
                              </CTableDataCell>
                              <CTableDataCell style={{ backgroundColor: 'lightgray' }}>
                                {rounded(
                                  cga1[key]?.indicator_score3 * 0.3 +
                                    cga2[key]?.indicator_score3 * 0.6 +
                                    (cga3[key]?.indicator_score3
                                      ? cga3[key]?.indicator_score3
                                      : 0 + cga4[key]?.indicator_score3
                                      ? cga4[key]?.indicator_score3
                                      : 0 + cga5[key]?.indicator_score3
                                      ? cga5[key]?.indicator_score3
                                      : 0 + cga6[key]?.indicator_score3
                                      ? cga6[key]?.indicator_score3
                                      : 0 + cga7[key]?.indicator_score3
                                      ? cga7[key]?.indicator_score3
                                      : 0 + cga8[key]?.indicator_score3
                                      ? cga8[key]?.indicator_score3
                                      : 0) *
                                      0.1,
                                )}
                              </CTableDataCell>
                            </>
                          ) : (
                            <CTableDataCell colSpan={3}>N/A</CTableDataCell>
                          )}
                          {cga1[key]?.indicator_score1 &&
                          cga2[key]?.indicator_score1 &&
                          cga3[key]?.indicator_score1 &&
                          cga1[key]?.indicator_score2 &&
                          cga2[key]?.indicator_score2 &&
                          cga3[key]?.indicator_score2 &&
                          cga1[key]?.indicator_score3 &&
                          cga2[key]?.indicator_score3 &&
                          cga3[key]?.indicator_score3 ? (
                            <>
                              <CTableDataCell>
                                {rounded(
                                  (cga1[key]?.indicator_score1 * 0.3 +
                                    cga2[key]?.indicator_score1 * 0.6 +
                                    (cga3[key]?.indicator_score1
                                      ? cga3[key]?.indicator_score1
                                      : 0 + cga4[key]?.indicator_score1
                                      ? cga4[key]?.indicator_score1
                                      : 0 + cga5[key]?.indicator_score1
                                      ? cga5[key]?.indicator_score1
                                      : 0 + cga6[key]?.indicator_score1
                                      ? cga6[key]?.indicator_score1
                                      : 0 + cga7[key]?.indicator_score1
                                      ? cga7[key]?.indicator_score1
                                      : 0 + cga8[key]?.indicator_score1
                                      ? cga8[key]?.indicator_score1
                                      : 0) *
                                      0.1 +
                                    (cga1[key]?.indicator_score2 * 0.3 +
                                      cga2[key]?.indicator_score2 * 0.6 +
                                      (cga3[key]?.indicator_score2
                                        ? cga3[key]?.indicator_score2
                                        : 0 + cga4[key]?.indicator_score2
                                        ? cga4[key]?.indicator_score2
                                        : 0 + cga5[key]?.indicator_score2
                                        ? cga5[key]?.indicator_score2
                                        : 0 + cga6[key]?.indicator_score2
                                        ? cga6[key]?.indicator_score2
                                        : 0 + cga7[key]?.indicator_score2
                                        ? cga7[key]?.indicator_score2
                                        : 0 + cga8[key]?.indicator_score2
                                        ? cga8[key]?.indicator_score2
                                        : 0) *
                                        0.1) +
                                    (cga1[key]?.indicator_score3 * 0.3 +
                                      cga2[key]?.indicator_score3 * 0.6 +
                                      (cga3[key]?.indicator_score3
                                        ? cga3[key]?.indicator_score3
                                        : 0 + cga4[key]?.indicator_score3
                                        ? cga4[key]?.indicator_score3
                                        : 0 + cga5[key]?.indicator_score3
                                        ? cga5[key]?.indicator_score3
                                        : 0 + cga6[key]?.indicator_score3
                                        ? cga6[key]?.indicator_score3
                                        : 0 + cga7[key]?.indicator_score3
                                        ? cga7[key]?.indicator_score3
                                        : 0 + cga8[key]?.indicator_score3
                                        ? cga8[key]?.indicator_score3
                                        : 0) *
                                        0.1)) /
                                    3,
                                )}
                              </CTableDataCell>
                            </>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </div>
            </div>
          ) : (
            <div style={{ color: 'crimson' }}>Complete All Assessment to View Overall Result</div>
          )}
        </CModalBody>
      </CModal>
    </>
  )
}

CGAResultDetail.propTypes = {
  visible: propTypes.bool,
  setVisible: propTypes.bool,
  cga: propTypes.array,
  staffList: propTypes.array,
}

export default CGAResultDetail
