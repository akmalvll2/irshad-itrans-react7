import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardImage,
  CRow,
  CCol,
  CCardBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CCardHeader,
} from '@coreui/react'
import Img from '../../../assets/brand/IRSHAD.png'
import Kopetro from '../../../assets/brand/KOPETRO.png'

import packageJson from '../../../../package.json'
const { config } = packageJson

const Organization = () => {
  const [company, setCompany] = useState([])

  const fetchCompany = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/company`).then((response) => {
        if (response) {
          setCompany(response.data)
        } else {
          console.log('Cannot fetch company data')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCompany()
  })
  return (
    <>
      <CCard>
        <CRow>
          {/*<CCol lg={3} style={{ padding: '50px' }}>
            <CCardImage src={Kopetro} />
          </CCol>*/}
          <CCol lg={9}>
            <CCardBody>
              <CTable color="transparent" striped>
                {company?.map((val, key) => {
                  return (
                    <CTableBody key={key}>
                      <CTableRow>
                        <CTableDataCell>
                          <span style={{ color: 'navy' }}>Name</span> - {val.company_name}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>
                          <span style={{ color: 'navy' }}>Short Name</span> -{' '}
                          {val.company_short_name}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>
                          <span style={{ color: 'navy' }}>Registration No</span> -{' '}
                          {val.company_registration_number}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>
                          <span style={{ color: 'navy' }}>PIC Name</span> - {val.pic_name}
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  )
                })}
              </CTable>
            </CCardBody>
          </CCol>
        </CRow>
      </CCard>
    </>
  )
}

export default Organization
