import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CContainer,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import img2 from '../../../assets/images/4.png'

import packageJson from '../../../../package.json'
const { config } = packageJson

const ReportTable1 = () => {
  const [cgaData, setCgaData] = useState([])
  const [cgaDataLoad, setCgaDataLoad] = useState(false)

  const [positionData, setPositionData] = useState([])
  const [positionDataLoad, setPositionDataLoad] = useState(false)

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

    console.log(cgaData)
  }, [cgaData])
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
              <h6>COMPETENCY BASED REPORT</h6>
            </center>
          </CCardHeader>
          <CCardBody>
            <CTable small responsive bordered>
              <CTableHead style={{ fontSize: '15px' }}>
                <CTableRow>
                  <CTableHeaderCell>FUNCTIONAL COMPETENCY</CTableHeaderCell>
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
                {cgaData
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
                                cgaData?.filter(
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

export default ReportTable1
