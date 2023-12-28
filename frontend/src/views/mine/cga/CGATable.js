import {
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CFormSelect,
  CCardFooter,
  CButton,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { userType } from 'src/userType'
import Form from './Form'
import Form2 from './Form2'

import packageJson from '../../../../package.json'
const { config } = packageJson

const CGATable = () => {
  const [optlist, setOptlist] = useState([])
  const [pick, setPick] = useState()
  const [onModal, setOnModal] = useState(false)
  const [onModal2, setOnModal2] = useState(false)
  const [survey, setSurvey] = useState()

  const fetchOptList = async () => {
    try {
      const user = userType?.data[0].staff_id
      await axios.post(`${config.REACT_APP_API_ENDPOINT}/cgaoptlist`, { user }).then((response) => {
        if (response.data) {
          setOptlist(response.data)
        } else {
          console.log('Error providing data')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pick) {
      setOnModal(!onModal)
    } else if (!pick || pick === 'novalue') {
      setOnModal(false)
    }
  }

  useEffect(() => {
    fetchOptList()
  })
  return (
    <>
      <CContainer>
        <CCard>
          <CCardHeader>COMPETENCY ASSESSMENT</CCardHeader>
          <CCardBody>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              onChange={(e) => setPick(e.target.value)}
              required
            >
              <option value="novalue">...Choose Staff To Assess...</option>
              {optlist?.map((val, key) => {
                return (
                  <option key={key} value={val.staff_id}>
                    {val.staff_name}
                  </option>
                )
              })}
            </CFormSelect>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              onChange={(e) => setSurvey(e.target.value)}
              required
            >
              <option>...Choose Survey...</option>
              <option value="1">Leadership</option>
              <option value="2">Functional</option>
            </CFormSelect>
          </CCardBody>
          <CCardFooter>
            <CButton size="sm" onClick={handleSubmit}>
              Start Evaluate
            </CButton>
          </CCardFooter>
        </CCard>
      </CContainer>
      <Form onModal={onModal} setOnModal={setOnModal} pick={pick} survey={survey} />
      <Form2 onModal={onModal2} setOnModal={setOnModal2} pick={pick} survey={survey} />
    </>
  )
}

export default CGATable
