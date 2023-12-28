import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CFormSelect,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTabContent,
  CTabPane,
  CTableHead,
  CTableHeaderCell,
  CFormLabel,
  CSpinner,
  CBadge,
  CCardHeader,
  CCardTitle,
  CCardText,
  CFormInput,
  CCardFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilMinus } from '@coreui/icons'
import MapTable2 from './MapTable2'
import MapImport from './MapImport'

import packageJson from '../../../../package.json'
const { config } = packageJson

const MapTable = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [mapVisible, setMapVisible] = useState(true)
  const [position, setPosition] = useState([])
  const [competency, setCompetency] = useState([])
  const [currPosition, setCurrPosition] = useState()
  const [currPositionMapList, setCurrPositionMapList] = useState([])

  const [updComp, setUpdComp] = useState()
  const [updReq, setUpdReq] = useState()

  const updateMapList = async () => {
    try {
      setIsLoading(true)
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/updmaplist`, {
          currPost: currPosition,
          compid: updComp,
          compreq: updReq,
        })
        .then((response) => {
          if (response) {
            alert(response.data)
          } else {
            console.log('Error inserting data')
          }
        })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (deleteid) => {
    try {
      const dltMap = deleteid
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/dltmaplist`, { dltMap })
        .then((response) => {
          if (response) {
            alert(response.data)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  const getBadgeColor = (status) => {
    if (status === 'Core') {
      return 'success'
    } else if (status === 'Generic') {
      return 'info'
    } else {
      return 'secondary'
    }
  }

  const fetchPosition = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/positionmaplist`).then((response) => {
        if (response) {
          setPosition(response.data)
        } else {
          console.log('Error fetching position data')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  const fetchCurrMapList = async () => {
    try {
      const postid = currPosition
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/currentpositionmap`, { postid })
        .then((response) => {
          if (response) {
            setCurrPositionMapList(response.data)
          } else {
            console.log('Error fetching current position mapping data')
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
  const fetchCompetency = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/competency`).then((response) => {
        setCompetency(response.data)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPosition()
    fetchCompetency()
    fetchCurrMapList()
  })
  return (
    <>
      <div>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink active={mapVisible}>
              <CButton color="transparent" onClick={(e) => setMapVisible(true)}>
                Job & Competency
              </CButton>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={!mapVisible}>
              <CButton color="transparent" onClick={(e) => setMapVisible(false)}>
                Competency & Training
              </CButton>
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane visible={mapVisible}>
            <CCard>
              <CCardBody>
                <CTable bordered responsive stripedColumns>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell>
                        <CFormLabel>Choose Position</CFormLabel>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormSelect
                          aria-label="Default select example"
                          onChange={(e) => setCurrPosition(e.target.value)}
                        >
                          <option>..Choose Position..</option>
                          {position?.map((val, key) => {
                            return (
                              <option key={key} value={val.job_id}>
                                {val.job_title}
                              </option>
                            )
                          })}
                        </CFormSelect>
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell>
                        <CFormLabel>Choose Competency & Required Competency Level</CFormLabel>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormSelect
                          aria-label="Default select example"
                          onChange={(e) => setUpdComp(e.target.value)}
                        >
                          <option>...choose competency...</option>
                          {competency?.map((val, key) => {
                            return (
                              <option key={key} value={val.competency_id}>
                                {val.competency_name} ( {val.competency_cluster} )
                              </option>
                            )
                          })}
                        </CFormSelect>
                        <CFormSelect
                          aria-label="Default select example"
                          options={[
                            '..Choose Level..',
                            { label: '1 - Awareness', value: '1' },
                            { label: '2 - Knowledge', value: '2' },
                            { label: '3 - Skill', value: '3' },
                            { label: '4 - Advance', value: '4' },
                            { label: '5 - Expert', value: '5' },
                          ]}
                          onChange={(e) => setUpdReq(e.target.value)}
                        />
                        <CButton
                          variant="outline"
                          color="secondary"
                          onClick={(e) => updateMapList()}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <CSpinner component="span" size="sm" color="dark" aria-hidden="true" />
                          ) : (
                            <CIcon icon={cilPlus} />
                          )}
                        </CButton>
                        <CTable bordered>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell>Competency</CTableHeaderCell>
                              <CTableHeaderCell>Group</CTableHeaderCell>
                              <CTableHeaderCell>Required Competency Level</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {currPositionMapList?.map((val, key) => {
                              return (
                                <CTableRow key={key}>
                                  <CTableDataCell>{val.competency_name}</CTableDataCell>
                                  <CTableDataCell>{val.competency_cluster}</CTableDataCell>
                                  <CTableDataCell>{val.expected_level}</CTableDataCell>
                                  <CTableDataCell>
                                    <CButton
                                      variant="outline"
                                      color="secondary"
                                      value={val.job_competency_id}
                                      onClick={() => handleDelete(val.job_competency_id)}
                                    >
                                      <CIcon icon={cilMinus} />
                                    </CButton>
                                  </CTableDataCell>
                                </CTableRow>
                              )
                            })}
                            {currPositionMapList.length > 0 ? '' : 'No Competency Mapped'}
                          </CTableBody>
                        </CTable>
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
            <center>.. OR ..</center>
            <MapImport competency={competency} position={position} />
          </CTabPane>
          <CTabPane visible={!mapVisible}>
            <MapTable2 />
          </CTabPane>
        </CTabContent>
      </div>
    </>
  )
}

export default MapTable
