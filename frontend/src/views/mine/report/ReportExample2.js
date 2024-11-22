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
  CFormInput,
  CFormLabel,
  CCardTitle,
  CCardSubtitle,
  CContainer,
} from '@coreui/react'

import { CChart } from '@coreui/react-chartjs'

import MyContext from '../data/MyContext'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilCheckAlt, cilPeople, cilArrowLeft } from '@coreui/icons'

const ReportTable1 = () => {
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

  const [content, setContent] = useState('')
  const [selectedAssessment, setSelectedAssessment] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedCluster, setSelectedCluster] = useState('')

  const [top5comp, settop5comp] = useState()

  const handleGenerate = () => {
    selectedAssessment && selectedDepartment && selectedCluster
      ? setContent(true)
      : setContent(false)
  }

  //Top 5 Competency with Highest Score
  useEffect(() => {
    const newCompetency = competency
      ?.filter((i) => i.cluster_id.toString() === selectedCluster)
      .map((comp) => {
        const totalscore = 0
        const totalstaff = 0
        staff
          ?.filter((i) => i.department_id.toString() === selectedDepartment)
          .map((sta) => {
            const selfscore = assessmentResult?.find(
              (i) => i.assessment_id.toString() === selectedAssessment,
            ).assessment_result_score

            return selfscore
          })
        return {
          competencyid: comp.competency_id,
          competencyname: comp.competency_name,
          competencyscore: staff.selfscore,
          competencygap: null,
        }
      })

    settop5comp(newCompetency)
  }, [selectedAssessment, selectedDepartment, selectedCluster])

  useEffect(() => {
    console.log(top5comp)
  }, [top5comp])

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
      <CRow className="my-2">
        {/* FILTER SETTINGS */}
        <CCol md={3}>
          <CCard color="light">
            <CCardHeader>Filter Settings</CCardHeader>
            {!content ? (
              <CCardBody>
                <CFormSelect
                  label="Assessment"
                  size="sm"
                  onChange={(e) => setSelectedAssessment(e.target.value)}
                >
                  <option value="">..assessment..</option>
                  {assessment?.map((val, key) => (
                    <option key={key} value={val.assessment_id}>
                      {val.assessment_name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormSelect
                  label="Department"
                  size="sm"
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">..department..</option>
                  {department?.map((val, key) => (
                    <option key={key} value={val.department_id}>
                      {val.department_name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormSelect
                  label="Group"
                  size="sm"
                  onChange={(e) => setSelectedCluster(e.target.value)}
                >
                  <option value="">..group..</option>
                  {cluster?.map((val, key) => (
                    <option key={key} value={val.cluster_id}>
                      {val.cluster_name}
                    </option>
                  ))}
                </CFormSelect>
                <CButton size="sm" className="my-2 w-100" onClick={handleGenerate}>
                  Generate Report
                </CButton>
              </CCardBody>
            ) : (
              <CCardBody>
                <CButton size="sm" color="link" onClick={() => setContent(false)}>
                  <CIcon icon={cilArrowLeft} /> Generate New Report
                </CButton>
                <hr />
                <CButton size="sm" color="info" className="text-white w-100">
                  <CIcon icon={cilSave} /> Save Full Report
                </CButton>
              </CCardBody>
            )}
          </CCard>
        </CCol>
        {/* REPORT CONTENT */}
        <CCol md={9}>
          <CCard className="h-100">
            {/* ALERT BEFORE GENERATE */}
            {!content ? (
              <CCardBody className="text-center">
                Please filter settings and click generate to view report
              </CCardBody>
            ) : (
              <CCardBody>
                {/* CONTENT AFTER GENERATE */}
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardBody className="text-center">
                        <h5>
                          {
                            assessment?.find(
                              (i) => i.assessment_id.toString() === selectedAssessment,
                            ).assessment_name
                          }
                        </h5>
                        <div>
                          {
                            department?.find(
                              (i) => i.department_id.toString() === selectedDepartment,
                            ).department_name
                          }
                        </div>
                        <div>
                          {
                            cluster?.find((i) => i.cluster_id.toString() === selectedCluster)
                              .cluster_name
                          }{' '}
                          cluster
                        </div>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
                <CRow className="mt-2">
                  <CCol>
                    <CCard>
                      <CCardBody>
                        <CCardTitle>Competency</CCardTitle>
                        <CRow>
                          <CCol>
                            <span>Top 5 competencies with highest</span>
                            <h6 className="text-success">Score</h6>
                            <CChart
                              type="bar"
                              data={{
                                labels: top5comp?.slice(0, 5).map((val) => val.competencyname),
                                datasets: [
                                  {
                                    label: 'Score',
                                    backgroundColor: 'lightgreen',
                                    data: [40, 20, 12, 39, 10],
                                  },
                                ],
                              }}
                              labels="Competency"
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
                                      color: 'white',
                                    },
                                    ticks: {
                                      color: 'gray',
                                    },
                                  },
                                  y: {
                                    grid: {
                                      color: 'white',
                                    },
                                    ticks: {
                                      color: 'gray',
                                    },
                                  },
                                },
                              }}
                            />
                            <CButton size="sm" color="link">
                              View Details
                            </CButton>
                          </CCol>
                          <CCol>
                            <span>Top 5 competencies with highest</span>
                            <h6 className="text-danger">Gap</h6>
                            <CChart
                              type="bar"
                              data={{
                                labels: top5comp?.slice(0, 5).map((val) => val.competencyname),
                                datasets: [
                                  {
                                    label: 'Score',
                                    backgroundColor: 'darkred',
                                    data: [40, 20, 12, 3, 2],
                                  },
                                ],
                              }}
                              labels="Competency"
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
                                      color: 'white',
                                    },
                                    ticks: {
                                      color: 'gray',
                                    },
                                  },
                                  y: {
                                    grid: {
                                      color: 'white',
                                    },
                                    ticks: {
                                      color: 'gray',
                                    },
                                  },
                                },
                              }}
                            />
                            <CButton size="sm" color="link">
                              View Details
                            </CButton>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
                <CRow className="mt-2">
                  <CCol>
                    <CCard>
                      <CCardBody>
                        <CCardTitle>Training</CCardTitle>
                        <CRow>
                          <CCol>
                            <span>Highest recommended training</span>
                            <CTable small bordered>
                              <CTableHead color="light">
                                <CTableRow>
                                  <CTableHeaderCell>Training</CTableHeaderCell>
                                  <CTableHeaderCell>No of Staff Should Enroll</CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                <CTableRow>
                                  <CTableDataCell>Business Writing Skill Training</CTableDataCell>
                                  <CTableDataCell>12</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                  <CTableDataCell>Customer Satisfaction Training</CTableDataCell>
                                  <CTableDataCell>9</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                  <CTableDataCell>Microsoft Office Training</CTableDataCell>
                                  <CTableDataCell>8</CTableDataCell>
                                </CTableRow>
                              </CTableBody>
                            </CTable>
                            <CButton size="sm" color="link">
                              View Details
                            </CButton>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CCardBody>
            )}
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ReportTable1
