import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  CContainer,
  CForm,
  CFormInput,
  CModal,
  CModalFooter,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CPopover,
  CLink,
  CWidgetStatsF,
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCallout,
  Flex,
} from '@coreui/react'

import FirstSection from './FirstSection'
import StaffInfo from './StaffInfo'

import { userType } from 'src/userType'

import packageJson from '../../../../frontend/package.json'
const { config } = packageJson

const Dashboard = () => {
  const [setting, setSetting] = useState([])

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        await axios
          .get(`${config.REACT_APP_API_ENDPOINT}/company/getallcompany`)
          .then((response) => {
            if (response) {
              setSetting(response.data)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
    fetchSetting()
  }, [])
  return (
    <>
      <div>Dashboard</div>
      {/*<CContainer
        style={{
          overflow: 'hidden',
          height: 'max-content',
          fontFamily: 'system-ui',
          padding: '2rem',
        }}
      >
        <h1
          style={{
            fontSize: '62px',
            background: '-webkit-linear-gradient(#02265B, #4220A1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          RECOMMENDED {setting[0]?.setting_app_short_name}
          <br />
          FIRST INITIALIZATION FLOW
        </h1>
        <hr />
        <CRow>
          <CCol>
            <CCallout color="primary">
              <h5>
                <b>FIRST STEP (1)</b>
              </h5>
              <p>
                <h6>ADD DEPARTMENT INFO</h6>
                <hr />
                ADD OR IMPORT NEW DEPARTMENT INFO THROUGH DEPARTMENT TAB UNDER ORGANIZATION SECTION
                ON THE SIDEBAR MENU
              </p>
            </CCallout>
          </CCol>
          <CCol>
            <CCallout color="secondary">
              <h5>
                <b>SECOND STEP (2)</b>
              </h5>
              <p>
                <h6>ADD JOB PROFILE INFO</h6>
                <hr />
                ADD OR IMPORT NEW JOB INFO THROUGH <Link to="/mine/job">JOB PROFILE TAB</Link> UNDER
                ORGANIZATION SECTION ON THE SIDEBAR MENU
              </p>
            </CCallout>
          </CCol>
          <CCol>
            <CCallout color="info">
              <h5>
                <b>THIRD STEP (3)</b>
              </h5>
              <p>
                <h6>ADD COMPETENCY LISTING</h6>
                <hr />
                ADD OR IMPORT NEW COMPETENCY INFO THROUGH
                <Link to="/mine/competency">COMPETENCY TAB</Link> AND LIST/MANAGE ON THE SIDEBAR
                MENU
              </p>
            </CCallout>
          </CCol>
          <CCol>
            <CCallout color="danger">
              <h5>
                <b>FOURTH STEP (4)</b>
              </h5>
              <p>
                <h6>ADD TRAINING LISTING</h6>
                <hr />
                ADD OR IMPORT NEW TRAINING INFO THROUGH
                <Link to="/mine/training"> TRAINING TAB </Link> AND LIST/MANAGE ON THE SIDEBAR MENU
              </p>
            </CCallout>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CCallout color="warning">
              <h5>
                <b>FIFTH STEP (5)</b>
              </h5>
              <p>
                <h6>MAPPING PROCESS</h6>
                <hr />
                CLICK MAPPING TAB ON THE SIDEBAR MENU TO AND CLICK
                <Link to="/mine/mapping">MAPPING</Link> TAB TO MAP EACH JOB WITH RELEVANT
                COMPETENCIES AND TO MAP EACH COMPETENCY WITH THEIR RESPECTIVE TRAINING
              </p>
            </CCallout>
          </CCol>
        </CRow>
      </CContainer>*/}
    </>
  )
}

export default Dashboard
