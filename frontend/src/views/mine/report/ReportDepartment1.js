import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CCol,
} from '@coreui/react'

const ReportDepartment1 = () => {
  return (
    <>
      <CRow>
        <CCol md={6} className="my-2">
          <CCard>
            <CCardBody>Department Score</CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CCard>
        <CCardHeader>Department Summary</CCardHeader>
        <CCardBody>
          <CTable>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell>Head 1</CTableHeaderCell>
                <CTableHeaderCell>Head 2</CTableHeaderCell>
                <CTableHeaderCell>Head 3</CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>Head 1</CTableHeaderCell>
                <CTableHeaderCell>Head 2</CTableHeaderCell>
                <CTableHeaderCell>Head 3</CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>Head 1</CTableHeaderCell>
                <CTableHeaderCell>Head 2</CTableHeaderCell>
                <CTableHeaderCell>Head 3</CTableHeaderCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ReportDepartment1
