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
import { cilTrash, cilPrint } from '@coreui/icons'

import packageJson from '../../../../package.json'
const { config } = packageJson

const CGAResultDetail2 = ({ visible, setVisible, cga, staffList }) => {
  const cga1 = cga?.filter((item) => item.staff_competency_session === 1)
  const cga2 = cga?.filter((item) => item.staff_competency_session === 2)

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
        const surveyType = 3
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
  return (
    <>
      <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader
          onClose={() => setVisible(false)}
          style={{ backgroundColor: '#4f5d73', color: 'whitesmoke' }}
        >
          <CModalTitle style={{ width: '100%', textAlign: 'center', textTransform: 'uppercase' }}>
            FUNCTIONAL SUBMISSION <br />
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
                        <CPopover
                          content="Required Competency Level ( Expected Level )"
                          placement="auto"
                          trigger={['hover', 'focus']}
                        >
                          <div>RCL</div>
                        </CPopover>
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        <CPopover
                          content="Current Competency Level ( Actual Level )"
                          placement="auto"
                          trigger={['hover', 'focus']}
                        >
                          <div>CCL</div>
                        </CPopover>
                      </CTableHeaderCell>
                      <CTableHeaderCell>GAP</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {cga1.map((val, key) => {
                      return (
                        <CTableRow key={key}>
                          <CTableDataCell>{val.competency_name}</CTableDataCell>
                          {val.expected_level ? (
                            <CTableDataCell>{val.expected_level}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.current_competency_level ? (
                            <CTableDataCell>{val.current_competency_level}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.current_competency_level && val.expected_level ? (
                            <CTableDataCell>
                              {val.expected_level - val.current_competency_level}
                            </CTableDataCell>
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
            <CTable>
              <CTableRow>
                <CTableDataCell colSpan={4} style={{ color: 'red' }}>
                  No Self Submission
                </CTableDataCell>
              </CTableRow>
            </CTable>
          )}
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
                        <CPopover
                          content="Required Competency Level ( Expected Level )"
                          placement="auto"
                          trigger={['hover', 'focus']}
                        >
                          <div>RCL</div>
                        </CPopover>
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        <CPopover
                          content="Current Competency Level ( Actual Level )"
                          placement="auto"
                          trigger={['hover', 'focus']}
                        >
                          <div>CCL</div>
                        </CPopover>
                      </CTableHeaderCell>
                      <CTableHeaderCell>GAP</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {cga2?.map((val, key) => {
                      return (
                        <CTableRow key={key}>
                          <CTableDataCell>{val.competency_name}</CTableDataCell>
                          {val.expected_level ? (
                            <CTableDataCell>{val.expected_level}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.current_competency_level ? (
                            <CTableDataCell>{val.current_competency_level}</CTableDataCell>
                          ) : (
                            <CTableDataCell>N/A</CTableDataCell>
                          )}
                          {val.current_competency_level && val.expected_level ? (
                            <CTableDataCell>
                              {val.expected_level - val.current_competency_level}
                            </CTableDataCell>
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
            <CTable>
              <CTableRow>
                <CTableDataCell colSpan={4} style={{ color: 'red' }}>
                  No Superior Submission
                </CTableDataCell>
              </CTableRow>
            </CTable>
          )}
        </CModalBody>
      </CModal>
    </>
  )
}

CGAResultDetail2.propTypes = {
  visible: propTypes.bool,
  setVisible: propTypes.bool,
  cga: propTypes.array,
  staffList: propTypes.array,
}

export default CGAResultDetail2
