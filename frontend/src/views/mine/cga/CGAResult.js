import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { userType } from 'src/userType'
import CGAResultDetail from './CGAResultDetail'

import packageJson from '../../../../package.json'
const { config } = packageJson

const CGAResult = () => {
  const [cga, setCga] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const [visible, setVisible] = useState(false)

  const fetchCgaResult = async () => {
    try {
      const id = userType?.data[0].staff_id
      await axios.post(`${config.REACT_APP_API_ENDPOINT}/cgaresult`, { id }).then((response) => {
        if (response) {
          setCga(response.data)
        } else {
          console.log('No CGA Result can be fetched')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const cga1 = cga?.slice(0, 1)

  useEffect(() => {
    fetchCgaResult()
  })

  return (
    <>
      <CCard>
        <CCardHeader>COMPETENCY ASSESSMENT SUBMISSION</CCardHeader>
        <CCardBody>
          <CNav variant="tabs" role="tablist">
            <CNavItem>
              <CNavLink active={activeKey === 1}>
                <CButton variant="ghost" color="transparent" onClick={() => setActiveKey(1)}>
                  Leadership
                </CButton>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink active={activeKey === 2}>
                <CButton variant="ghost" color="transparent" onClick={() => setActiveKey(2)}>
                  Functional
                </CButton>
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
              <CTable small striped bordered hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Staff</CTableHeaderCell>
                    {/*<CTableHeaderCell>Date</CTableHeaderCell>*/}
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {cga1?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{key + 1}</CTableDataCell>
                        <CTableDataCell>{val.staff_id}</CTableDataCell>
                        {/*<CTableDataCell>{newDate}</CTableDataCell>*/}
                        {/*<CTableDataCell>
                          {val.staff_competency_session === 1 ? 'Self' : ''}
                          {val.staff_competency_session === 2 ? 'Supervisor' : ''}
                          {val.staff_competency_session === 3 ? 'Peers' : ''}
                    </CTableDataCell>*/}
                        <CTableDataCell>
                          <CDropdown placement="auto">
                            <CDropdownToggle color="transparent" caret={false} size="sm">
                              <CIcon icon={cilOptions} height={18} />
                            </CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem>
                                <CButton
                                  style={{ width: '100%' }}
                                  color="transparent"
                                  value={val.staff_competency_session}
                                  onClick={(e) => setVisible(!visible)}
                                >
                                  View
                                </CButton>
                              </CDropdownItem>
                              {/*<CDropdownItem>
                                <CButton
                                  style={{ width: '100%' }}
                                  color="transparent"
                                  value={val.staff_id}
                                  onClick={(e) => handleDelete(e, val.staff_id, newDate)}
                                >
                                  Delete
                                </CButton>
                  </CDropdownItem>*/}
                            </CDropdownMenu>
                          </CDropdown>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                  {cga1.length > 0 ? '' : 'No CGA Submitted'}
                </CTableBody>
              </CTable>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
              No Data for Functional Survey
            </CTabPane>
          </CTabContent>
        </CCardBody>
      </CCard>
      <CGAResultDetail visible={visible} setVisible={setVisible} cga={cga} />
    </>
  )
}

export default CGAResult
