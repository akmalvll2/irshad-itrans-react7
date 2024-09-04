import React, { useContext } from 'react'
import MyContext from '../mine/data/MyContext'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CWidgetStatsF,
  CCardTitle,
  CSpinner,
  CCardSubtitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilClipboard, cilUser, cilUserPlus } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'

const DashboardInfo1 = () => {
  const { staff, department, positionCompetency, competency, position, company, loading } =
    useContext(MyContext)

  const selectedCompany = company[0]

  if (
    loading.staff ||
    loading.department ||
    loading.positionCompetency ||
    loading.competency ||
    loading.company ||
    loading.position
  ) {
    return <CSpinner />
  }

  return (
    <div>
      <CCard className="my-2">
        <CCardHeader
          style={{
            backgroundColor: `${selectedCompany.company_system_primary_color}`,
            color: 'ghostwhite',
          }}
        >
          <CIcon icon={cilClipboard} /> DEPARTMENT SUMMARY
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={3}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<CIcon icon={cilUser} height={24} />}
                title="Number of Active Staff"
                value="6"
              />
            </CCol>
            <CCol md={3}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<CIcon icon={cilUserPlus} height={24} />}
                title="Number of Talent"
                value="0"
              />
            </CCol>
            <CCol md={6}>
              <CCard>
                <CCardBody>
                  <CChart
                    type="bar"
                    data={{
                      labels: ['A2', 'E1', 'E2', 'M2'],
                      datasets: [
                        {
                          label: 'Number of Staff By Job Grade',
                          backgroundColor: `${selectedCompany?.company_system_info_color}`,
                          data: [1, 2, 2, 1],
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
                            color: 'whitesmoke',
                          },
                          ticks: {
                            color: 'gray',
                          },
                        },
                        y: {
                          grid: {
                            color: 'gray',
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
          </CRow>
          <CRow className="mt-2">
            <CCol md={12}>
              <CCard>
                <CCardBody>
                  <CRow>
                    <CCol md={4}>
                      <CCardTitle>Core Competencies Rating</CCardTitle>
                      <CCard>
                        <CCardBody className="text-center">
                          <CCardSubtitle>Gap</CCardSubtitle>
                          <CCardTitle className="text-danger">2.7/5</CCardTitle>
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol md={8}>
                      <CChart
                        type="bar"
                        data={{
                          labels: [
                            'COMMUNICATION',
                            'CORE VALUES & ETHICS',
                            'DRIVING EXCELLENCE',
                            'FOCUS & DISCIPLINE',
                          ],
                          datasets: [
                            {
                              label: 'Number of Staff By Job Grade',
                              backgroundColor: `${selectedCompany?.company_system_info_color}`,
                              data: [2, 3, 4, 1],
                            },
                          ],
                        }}
                        height={50}
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
                                color: 'gray',
                              },
                              ticks: {
                                color: 'gray',
                              },
                            },
                            y: {
                              grid: {
                                color: 'whitesmoke',
                              },
                              ticks: {
                                color: 'gray',
                              },
                            },
                          },
                        }}
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow className="mt-2">
            <CCol md={12}>
              <CCard>
                <CCardBody>
                  <CRow>
                    <CCol md={4}>
                      <CCardTitle>Generic Competencies Rating</CCardTitle>
                      <CCard>
                        <CCardBody className="text-center">
                          <CCardSubtitle>Gap</CCardSubtitle>
                          <CCardTitle className="text-danger">2.3/5</CCardTitle>
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol md={8}>
                      <CChart
                        type="bar"
                        data={{
                          labels: [
                            'ADAPTABILITY',
                            'ANALYTHICAL THINKING',
                            'CHANGE MANAGEMENT',
                            'CONFLICT MANAGEMENT',
                          ],
                          datasets: [
                            {
                              label: 'Number of Staff By Job Grade',
                              backgroundColor: `${selectedCompany?.company_system_info_color}`,
                              data: [2, 3, 4, 1],
                            },
                          ],
                        }}
                        height={50}
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
                                color: 'gray',
                              },
                              ticks: {
                                color: 'gray',
                              },
                            },
                            y: {
                              grid: {
                                color: 'whitesmoke',
                              },
                              ticks: {
                                color: 'gray',
                              },
                            },
                          },
                        }}
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow className="mt-2">
            <CCol md={12}>
              <CCard>
                <CCardBody>
                  <CRow>
                    <CCol md={4}>
                      <CCardTitle>Functional Competencies Rating</CCardTitle>
                      <CCard>
                        <CCardBody className="text-center">
                          <CCardSubtitle>Gap</CCardSubtitle>
                          <CCardTitle className="text-danger">2.5/5</CCardTitle>
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol md={8}>
                      <CChart
                        type="bar"
                        data={{
                          labels: [
                            'COMPPLIANCE AND REGULATORY KNOWLEDGE',
                            'CORRUPTION RISK ASSESSMENT',
                            'BRIBERY AND CORRUPTION TRAINING AND AWARENESS',
                            'IN-HOUSE RISK ASSESSMENT MODULE DEVELOPMENT',
                            'ISO AUDIT PROCESS',
                          ],
                          datasets: [
                            {
                              label: 'Number of Staff By Job Grade',
                              backgroundColor: `${selectedCompany?.company_system_info_color}`,
                              data: [2, 3, 4, 1, 2],
                            },
                          ],
                        }}
                        height={50}
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
                                color: 'gray',
                              },
                              ticks: {
                                color: 'gray',
                              },
                            },
                            y: {
                              grid: {
                                color: 'whitesmoke',
                              },
                              ticks: {
                                color: 'gray',
                              },
                            },
                          },
                        }}
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DashboardInfo1
