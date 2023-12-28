import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CCard, CCardBody, CCardHeader, CCardTitle, CRow, CCol, CWidgetStatsB } from '@coreui/react'
import img2 from '../../assets/images/4.png'

import packageJson from '../../../package.json'
const { config } = packageJson

const FirstSection = () => {
  const [staffData, setStaffData] = useState([])
  const [positionData, setPositionData] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [competencyData, setCompetencyData] = useState([])
  const [trainingData, setTrainingData] = useState([])

  const [loadData, setLoadData] = useState(false)

  const fetchAllData = async () => {
    try {
      setLoadData(true)
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/user`).then((response) => {
        if (response) {
          setStaffData(response.data)
        }
      })
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/department`).then((response) => {
        if (response) {
          setDepartmentData(response.data)
        }
      })
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/position`).then((response) => {
        if (response) {
          setPositionData(response.data)
        }
      })
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/competency`).then((response) => {
        if (response) {
          setCompetencyData(response.data)
        }
      })
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/training`).then((response) => {
        if (response) {
          setTrainingData(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoadData(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])
  return (
    <>
      <CCard>
        <CCardHeader
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <center>
            <CCardTitle style={{ color: 'navy' }}>SYSTEM STATUS</CCardTitle>
          </center>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CWidgetStatsB
                className="mb-3"
                //progress={{ color: 'success', value: 75 }}
                //text="Total Number of Staff"
                title="STAFF"
                value={staffData?.length}
              />
            </CCol>
            <CCol>
              <CWidgetStatsB
                className="mb-3"
                //progress={{ color: 'success', value: 75 }}
                //text="Total Number of Department"
                title="DEPARTMENT"
                value={departmentData?.length}
              />
            </CCol>
            <CCol>
              <CWidgetStatsB
                className="mb-3"
                //progress={{ color: 'success', value: 75 }}
                //text="Total Number of Position"
                title="POSITION"
                value={positionData?.length}
              />
            </CCol>
            <CCol>
              <CWidgetStatsB
                className="mb-3"
                //progress={{ color: 'success', value: 75 }}
                //text="Total Number of Position"
                title="COMPETENCY"
                value={competencyData?.length}
              />
            </CCol>
            <CCol>
              <CWidgetStatsB
                className="mb-3"
                //progress={{ color: 'success', value: 75 }}
                //text="Total Number of Position"
                title="TRAINING"
                value={trainingData?.length}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default FirstSection
