import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import img2 from '../../assets/images/4.png'

//path to userType component
import { userType } from 'src/userType'

import MyContext from '../mine/data/MyContext'

// IMPORT COREUI COMPONENT
import {
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
  CSpinner,
} from '@coreui/react'

import { CChart } from '@coreui/react-chartjs'

const DashboardInfo1 = () => {
  const { staff, department, loading } = useContext(MyContext)

  // loading state if the data are not available
  if (loading.staff || loading.department) {
    return <CSpinner />
  }
  return (
    <div>
      <CCard className="my-2">
        <CCardHeader
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'navy',
            textAlign: 'center',
          }}
        >
          Department Summary
        </CCardHeader>
        <CCardBody>
          <b className="float-start">Department Information</b>
          <hr />
          <CRow>
            <CCol md={12}>
              {department
                ?.filter(
                  (i) =>
                    i.department_id ===
                    staff.find((u) => u.staff_id.toString() === userType?.id)?.department_id,
                )
                .map((val) => (
                  <CTable small responsive borderless align="middle" key={val.department_id}>
                    <CTableBody>
                      <CTableRow>
                        <CTableHeaderCell className="text-secondary">Department</CTableHeaderCell>
                        <CTableDataCell>{val.department_name}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell className="text-secondary">
                          Number of Staff
                        </CTableHeaderCell>
                        <CTableDataCell>{staff?.length}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell className="text-secondary">
                          Number of Relevance Competency
                        </CTableHeaderCell>
                        <CTableDataCell>
                          7 Core <br /> 8 Generic <br /> 15 Functional
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                ))}
            </CCol>
          </CRow>
          <b className="float-start">Training Recommendation</b>
          <hr />
          <CRow>
            <CCol md={6}>
              <CChart
                type="line"
                data={{
                  labels: [
                    'Microsoft',
                    'HR System',
                    'Programming',
                    'Learning Management System',
                    'Training Need Analysis',
                    'UI/UX',
                    'Software Design',
                  ],
                  datasets: [
                    {
                      label: 'Latest Assessment',
                      backgroundColor: 'rgba(220, 220, 220, 0.2)',
                      borderColor: 'rgba(220, 220, 220, 1)',
                      pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                      pointBorderColor: '#fff',
                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                    },
                    {
                      label: 'Past Assessment',
                      backgroundColor: 'rgba(151, 187, 205, 0.2)',
                      borderColor: 'rgba(151, 187, 205, 1)',
                      pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                      pointBorderColor: '#fff',
                      data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: 'gray',
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: 'lightgray',
                      },
                      ticks: {
                        color: 'gray',
                      },
                    },
                    y: {
                      grid: {
                        color: 'lightgray',
                      },
                      ticks: {
                        color: 'gray',
                      },
                    },
                  },
                }}
              />
            </CCol>
            <CCol md={6}>
              <CTable small responsive borderless>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell className="text-secondary">
                      Recommended Training
                    </CTableHeaderCell>
                    <CTableDataCell>
                      - Microsoft Advance Training <br />
                      - HR System Management <br />
                      - Training Need Analysis Course <br />
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell className="text-secondary">Past Training</CTableHeaderCell>
                    <CTableDataCell>
                      - Learning Management System Course <br />
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCol>
          </CRow>
          <b className="float-start">Competency Performance</b>
          <hr />
          <CRow>
            <CCol md={6}>
              <CChart
                type="bar"
                data={{
                  labels: [
                    'Microsoft',
                    'HR System',
                    'Programming',
                    'Learning Management System',
                    'Training Need Analysis',
                    'UI/UX',
                    'Software Design',
                  ],
                  datasets: [
                    {
                      label: 'GitHub Commits',
                      backgroundColor: '#C9C9C9',
                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                    },
                  ],
                }}
                labels="months"
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: 'gray',
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: 'lightgrey',
                      },
                      ticks: {
                        color: 'gray',
                      },
                    },
                    y: {
                      grid: {
                        color: 'lightgrey',
                      },
                      ticks: {
                        color: 'gray',
                      },
                    },
                  },
                }}
              />
            </CCol>
            <CCol md={6}>
              <CTable small responsive borderless>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell className="text-secondary">
                      Excellence Competency
                    </CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell className="text-secondary">
                      Critical Competency
                    </CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCol>
          </CRow>
          {/* STAFF PERFORMANCE */}
          {/*<b className="float-start">Staff Performance</b>
          <hr />
          <CTable small responsive bordered>
            <CTableHead color="secondary">
              <CTableRow>
                <CTableHeaderCell>Staff</CTableHeaderCell>
                <CTableHeaderCell>Position</CTableHeaderCell>
                <CTableHeaderCell>Gap Rating</CTableHeaderCell>
                <CTableHeaderCell>Excellent Competency</CTableHeaderCell>
                <CTableHeaderCell>Critical Competency</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>Amirhamzah</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>Badrul Akmal</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          */}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DashboardInfo1
