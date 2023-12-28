import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CWidgetStatsE,
  CCardHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChartPie, cilChartLine, cilPrint } from '@coreui/icons'
import { CChart, CChartBar } from '@coreui/react-chartjs'

import packageJson from '../../../../package.json'
const { config } = packageJson

const RepTable1 = () => {
  const componentRef = useRef()
  const [topTraining, setTopTraining] = useState([])

  const fetchTopTraining = async (e) => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/toptraining`).then((response) => {
        if (response.data) {
          console.log(response.data)
          setTopTraining(response.data)
        } else {
          console.log('Data unavailable')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  const maxItem = topTraining?.reduce(
    (prev, current) => (prev.count > current.count ? prev : current),
    0,
  )
  useEffect(() => {
    fetchTopTraining()
  }, [])
  return (
    <>
      <CRow>
        <CCol lg={8} style={{ maxHeight: '400px', overflow: 'auto' }}>
          <CRow>
            <CCol lg={12}>
              <CWidgetStatsE
                className="mb-3"
                chart={
                  <CChartBar
                    className="mx-auto"
                    style={{ height: '40px', width: '80px' }}
                    data={{
                      labels: topTraining?.map((val) => val.training_name),
                      datasets: [
                        {
                          backgroundColor: '#02125E',
                          data: topTraining?.map((val) => val.count),
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      scales: {
                        x: {
                          display: false,
                        },
                        y: {
                          display: false,
                        },
                      },
                    }}
                  />
                }
                title="HIGHEST RATE TRAINING"
                value={maxItem.training_name}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>TRAINING STAT</CCardHeader>
                <CCardBody>
                  <CTable striped small style={{ fontSize: '15px' }}>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>NO</CTableHeaderCell>
                        <CTableHeaderCell>TRAINING NAME</CTableHeaderCell>
                        <CTableHeaderCell>STAFF TO ATTEND</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {topTraining?.map((val, key) => {
                        return (
                          <CTableRow key={key}>
                            <CTableDataCell>{key + 1}</CTableDataCell>
                            <CTableDataCell>{val.training_name}</CTableDataCell>
                            <CTableDataCell>{val.count}</CTableDataCell>
                          </CTableRow>
                        )
                      })}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
        <CCol lg={4}>
          <CRow>
            <CCol lg={12}>
              <CCard>
                <CCardHeader>FOUR HIGHEST TRAINING</CCardHeader>
                <CCardBody>
                  <CChart
                    type="pie"
                    data={{
                      labels: topTraining?.map((val) => val.training_name),
                      datasets: [
                        {
                          backgroundColor: ['#02125E', '#1F36A2', '#5A74EC', '#C1CBFC'],
                          data: topTraining?.map((val) => val.count),
                        },
                      ],
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default RepTable1
