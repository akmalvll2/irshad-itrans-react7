import React, { Suspense, useState, useEffect } from 'react'
import img2 from '../../../assets/images/4.png'
import axios from 'axios'
import {
  CSpinner,
  CCard,
  CCardHeader,
  CCardTitle,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCallout,
  CCardBody,
  CRow,
  CCol,
  CAlert,
} from '@coreui/react'

//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

const DepartmentTable = () => {
  const [departmentlist, setDepartmentlist] = useState([])

  useEffect(() => {
    const fetchAllDepartment = async () => {
      try {
        await axios
          .get(`${config.REACT_APP_API_ENDPOINT}/department/getalldepartment`)
          .then((response) => {
            if (response) {
              setDepartmentlist(response.data)
            }
          })
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllDepartment()
  }, [departmentlist])
  return (
    <>
      <div>
        <CCard>
          <CCardHeader
            style={{
              backgroundImage: `url(${img2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'navy',
            }}
          >
            <center>
              <h4>DEPARTMENT LIST</h4>
            </center>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol lg={4}>
                <CCallout color="primary">Total Department : {departmentlist.length}</CCallout>
              </CCol>
            </CRow>
          </CCardBody>
          <CTable small bordered>
            <CTableHead color="secondary">
              <CTableRow>
                <CTableHeaderCell>No</CTableHeaderCell>
                <CTableHeaderCell>Department</CTableHeaderCell>
                <CTableHeaderCell>Number of Staff</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {departmentlist.length > 0 ? (
                departmentlist?.map((val, key) => {
                  return (
                    <CTableRow key={key}>
                      <CTableDataCell>{key + 1}</CTableDataCell>
                      <CTableDataCell>{val.department_name}</CTableDataCell>
                      <CTableDataCell>4</CTableDataCell>
                    </CTableRow>
                  )
                })
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan={3}>
                    <CAlert color="danger">No Data Availalble</CAlert>
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCard>
      </div>
    </>
  )
}

export default DepartmentTable
