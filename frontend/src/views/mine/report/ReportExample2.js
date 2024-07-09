import React, { useContext, useEffect, useState } from 'react'
import img2 from '../../../assets/images/4.png'
import {
  CCard,
  CCardHeader,
  CButtonGroup,
  CButton,
  CCardBody,
  CFormSelect,
  CAlert,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CTableBody,
  CTableDataCell,
  CAvatar,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CCol,
  CSpinner,
  CProgress,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

import { CChart } from '@coreui/react-chartjs'

import MyContext from '../data/MyContext'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilCheckAlt, cilPeople } from '@coreui/icons'

const ReportTable1 = () => {
  const [visible, setVisible] = useState(false)
  const [selectedCompetency, setSelectedCompetency] = useState()
  //const [selectedAssessment, setSelectedAssessment] = useState(assessment.find())
  const {
    staff,
    position,
    department,
    competency,
    cluster,
    assessment,
    assessmentResult,
    positionCompetency,
    loading,
  } = useContext(MyContext)
  const roundedResult = (data) => {
    var res
    data ? (res = Number(data.toFixed(2))) : (res = null)
    return res
  }
  const score = (staff_id, competency_id, type) => {
    const score = assessmentResult.find(
      (i) =>
        i.staff_id === staff_id &&
        i.competency_id === competency_id &&
        i.staff_assessor_type === type,
    )?.assessment_result_score
    return score
  }

  useEffect(() => {
    console.log('Set Selected Competency')
  }, [selectedCompetency])
  if (
    loading.staff ||
    loading.position ||
    loading.department ||
    loading.competency ||
    loading.cluster ||
    loading.assessment ||
    loading.assessmentResult ||
    loading.positionCompetency
  ) {
    return <CSpinner />
  }
  return (
    <>
      <CRow>
        <CCol>
          <CCard className="m-1">
            <CCardBody>
              <CIcon icon={cilPeople} /> 3<h4>Communication Training</h4>
              <span>Core</span>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard className="m-1">
            <CCardBody>
              <CIcon icon={cilPeople} /> 7<h4>Client Management</h4>
              <span>Generic</span>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard className="m-1">
            <CCardBody>
              <CIcon icon={cilPeople} /> 12<h4>On-Boarding Course</h4>
              <span>Functional</span>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={4}>
          <CCard className=" m-1">
            <CCardHeader>Training Needs By Priority</CCardHeader>
            <CCardBody>
              <CChart
                type="bar"
                data={{
                  labels: ['Urgents', 'High', 'Medium', 'Low'],
                  datasets: [
                    {
                      label: 'Priority',
                      backgroundColor: '#BAC3E7 ',
                      data: [40, 20, 12, 39],
                    },
                  ],
                }}
                labels="months"
                options={{
                  indexAxis: 'y',
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
            </CCardBody>
          </CCard>
          <CCard className=" m-1">
            <CCardHeader>Training Needs By Department</CCardHeader>
            <CCardBody>
              <CChart
                type="bar"
                data={{
                  labels: ['CTD', 'LTM', 'SAC', 'HRC', 'ESD'],
                  datasets: [
                    {
                      label: 'Department',
                      backgroundColor: '#BAC3E7 ',
                      data: [40, 20, 12, 39, 30],
                    },
                  ],
                }}
                labels="months"
                options={{
                  indexAxis: 'y',
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
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={8}>
          <CCard className="m-1">
            <CCardHeader>Training Needs by Position Category and Priority</CCardHeader>
            <CRow>
              <CCol>
                <CCardBody>
                  <CChart
                    type="bar"
                    data={{
                      labels: ['CTD', 'LTM', 'SAC', 'HRC', 'ESD'],
                      datasets: [
                        {
                          label: 'Department',
                          backgroundColor: '#BAC3E7 ',
                          data: [40, 20, 12, 39, 30],
                        },
                      ],
                    }}
                    labels="months"
                    options={{
                      indexAxis: 'y',
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
                </CCardBody>
              </CCol>
              <CCol>
                <CCardBody>
                  <CChart
                    type="bar"
                    data={{
                      labels: [
                        'Top Management',
                        'Consultant',
                        'Associate',
                        'Executive',
                        'Non-Executive',
                      ],
                      datasets: [
                        {
                          label: 'Urgents',
                          backgroundColor: '#FFBDA8',
                          data: [40, 20, 12, 39, 30],
                        },
                        {
                          label: 'High',
                          backgroundColor: '#FEBB65',
                          data: [30, 15, 9, 30, 20],
                        },
                        {
                          label: 'Medium',
                          backgroundColor: '#6DFFE2',
                          data: [30, 15, 9, 30, 20],
                        },
                        {
                          label: 'Low',
                          backgroundColor: '#6DC3FF ',
                          data: [30, 15, 9, 30, 20],
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
                </CCardBody>
              </CCol>
            </CRow>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ReportTable1
