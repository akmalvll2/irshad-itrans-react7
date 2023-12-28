import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CCallout,
  CCard,
  CCardBody,
  CCardHeader,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CContainer,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CCol,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import img2 from '../../../assets/images/4.png'

import packageJson from '../../../../package.json'
const { config } = packageJson

const ReportTable2 = () => {
  const [cgaData, setCgaData] = useState([])
  const [cgaDataLoad, setCgaDataLoad] = useState(false)

  const [positionData, setPositionData] = useState([])
  const [positionDataLoad, setPositionDataLoad] = useState(false)

  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')

  const handleOption1 = (e) => {
    e.preventDefault()
    setOption1(e.target.value)
  }

  const handleOption2 = (e) => {
    e.preventDefault()
    setOption2(e.target.value)
  }

  const handleOption3 = (e) => {
    e.preventDefault()
    setOption3(e.target.value)
  }

  const filteredData = cgaData?.filter((itm) => {
    return option1 === '' || itm.competency_cluster === option1
  })

  useEffect(() => {
    const fetchPositionData = async () => {
      try {
        setPositionDataLoad(true)
        await axios.get(`${config.REACT_APP_API_ENDPOINT}/position`).then((response) => {
          if (response) {
            setPositionData(response.data)
          }
        })
      } catch (err) {
        console.log(err)
      } finally {
        setPositionDataLoad(false)
      }
    }
    const fetchCgaData = async () => {
      try {
        setCgaDataLoad(true)
        await axios.post(`${config.REACT_APP_API_ENDPOINT}/cgaresultall`).then((response) => {
          if (response) {
            setCgaData(response.data)
          }
        })
      } catch (err) {
        console.log(err)
      } finally {
        setCgaDataLoad(false)
      }
    }
    fetchCgaData()
    fetchPositionData()
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
            <center>
              <h6>SUMMARY ( NUMBER OF STAFF WITH GAP )</h6>
            </center>
          </CCardHeader>
          <CCardBody>
            <CAccordion>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>Filter</CAccordionHeader>
                <CAccordionBody>
                  <CRow>
                    <CCol xs={2}>Group</CCol>
                    <CCol xs={10}>
                      <CFormSelect className="my-2" onChange={handleOption1}>
                        <option value="">All</option>
                        <option value="Core">Core</option>
                        <option value="Generic">Generic</option>
                        <option value="Functional">Functional</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  {/*<CRow>
                    <CCol xs={2}>Gap Range</CCol>
                    <CCol xs={10}>
                      <CFormSelect className="my-2" onChange={handleOption2}>
                        <option value="">All</option>
                        <option value="1">More Than 1.5 ( Very High )</option>
                        <option value="2">1 to 1.5 ( High )</option>
                        <option value="3">0 to 1 ( Low )</option>
                        <option value="4">Less Than 0 ( Very Low )</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs={2}>Position Level</CCol>
                    <CCol xs={10}>
                      <CFormSelect className="my-2" onChange={handleOption3}>
                        <option value="">All</option>
                        <option value="">Non Executive</option>
                        <option value="">Executive</option>
                        <option value="">Manager</option>
                        <option value="">Head</option>
                      </CFormSelect>
                    </CCol>
          </CRow>*/}
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
            <br />
            <CTable small responsive bordered>
              <CTableHead style={{ fontSize: '15px' }}>
                <CTableRow>
                  <CTableHeaderCell>COMPETENCY</CTableHeaderCell>
                  {positionData?.map((val, key) => {
                    return (
                      <CTableHeaderCell key={key} style={{ writingMode: 'vertical-rl' }}>
                        {val.job_title}
                      </CTableHeaderCell>
                    )
                  })}
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ fontSize: '13px' }}>
                {filteredData
                  ?.reduce((acc, current) => {
                    if (!acc?.includes(current.competency_name)) {
                      acc.push(current.competency_name)
                    }
                    return acc
                  }, [])
                  ?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{val}</CTableDataCell>
                        {positionData?.map((val2, key2) => {
                          return (
                            <CTableDataCell key={key2}>
                              {
                                filteredData?.filter(
                                  (itm) =>
                                    itm?.competency_name === val &&
                                    itm.job_id === positionData[key2]?.job_id &&
                                    itm.staff_competency_session === 1 &&
                                    itm.expected_level - itm.current_competency_level > 0,
                                ).length
                              }
                            </CTableDataCell>
                          )
                        })}
                      </CTableRow>
                    )
                  })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  )
}

export default ReportTable2
