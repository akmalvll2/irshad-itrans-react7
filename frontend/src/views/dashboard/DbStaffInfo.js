import React, { useContext } from 'react'
import moment from 'moment'

//path to userType component
import { userType } from 'src/userType'

import MyContext from '../mine/data/MyContext'

// IMPORT COREUI COMPONENT
import {
  CSpinner,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CAlert,
  CCardSubtitle,
  CCardText,
} from '@coreui/react'

import { CChart } from '@coreui/react-chartjs'

const DashboardInfo1 = () => {
  const { staff, loading } = useContext(MyContext)

  // loading state if the data are not available
  if (loading.staff) {
    return <CSpinner />
  }

  return (
    <div>
      <CCard className="m-2">
        <CCardHeader>STAFF</CCardHeader>
        <CCardBody>
          <b className="float-start">Staff Information</b>
          <hr />
          <CRow>
            <CCol>
              {staff
                .filter((i) => i.staff_id.toString() === userType?.id)
                ?.map((val, key) => (
                  <CTable small responsive borderless key={key}>
                    <CTableBody>
                      <CTableRow>
                        <CTableHeaderCell className="text-secondary">Name:</CTableHeaderCell>
                        <CTableDataCell className=" text-capitalize text-lowercase">
                          {val.staff_name}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell className="text-secondary">Position:</CTableHeaderCell>
                        <CTableDataCell>{val.position_name}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell className="text-secondary">Department:</CTableHeaderCell>
                        <CTableDataCell className=" text-lowercase text-capitalize">
                          {val.department_name}
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                ))}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DashboardInfo1
