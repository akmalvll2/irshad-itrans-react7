import React, { useContext, useState, useEffect } from 'react'
import MyContext from '../data/MyContext'
import { userType } from 'src/userType'
import moment from 'moment'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CWidgetStatsF,
  CCardTitle,
  CSpinner,
  CButton,
  CCardSubtitle,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  CCloseButton,
  COffcanvasTitle,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilClipboard, cilUser, cilUserPlus } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'

const ReportDepartment2 = () => {
  const {
    staff,
    cluster,
    assessment,
    assessmentResult,
    department,
    positionCompetency,
    competency,
    position,
    company,
    loading,
  } = useContext(MyContext)
  const [competencylist, setcompetencylist] = useState([])
  const [visible, setVisible] = useState()
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const selectedCompany = company[0]

  const activeStaff = staff?.filter((i) =>
    selectedDepartment
      ? i.department_id.toString() === selectedDepartment
      : i.department_id !== null,
  )

  // Data for Graph 'Number of Staff By Job Grade'
  const firstGraph = () => {
    const gradeList = activeStaff?.map((val) => val.position_grade)
    const distinctGradeList = [...new Set(activeStaff?.map((val) => val.position_grade))]
    const gradeCount = distinctGradeList?.map(
      (grade) => gradeList.filter((g) => g === grade).length,
    )

    return { gradeList, distinctGradeList, gradeCount }
  }
  const { gradeList, distinctGradeList, gradeCount } = firstGraph()

  const latestAssessment = assessment.reduce((latest, current) => {
    const currentEndDate = moment(current.assessment_end_date)
    const latestEndDate = moment(latest.assessment_end_date)

    return currentEndDate.isAfter(latestEndDate) ? current : latest
  }, assessment[0])

  const calculateOverallAverage = (type) => {
    if (competencylist.filter((i) => i.competencytype === type).length === 0) return 0

    const totalRatings = competencylist
      .filter((i) => i.competencytype === type)
      .reduce((total, item) => total + parseFloat(item.competencyrating), 0)

    return (totalRatings / competencylist.filter((i) => i.competencytype === type).length).toFixed(
      2,
    )
  }

  const filteredCompetency = competency?.filter((i) =>
    selectedDepartment
      ? positionCompetency.some(
          (u) =>
            u.competency_id === i.competency_id &&
            activeStaff.some((p) => p.position_id === u.position_id),
        )
      : i.competency !== null,
  )

  useEffect(() => {
    const newCompetency = filteredCompetency.map((comp) => {
      const staffIds = [
        ...new Set(
          assessmentResult.filter((i) =>
            selectedDepartment ? i.competency_id === comp.competency_id : i.department_id !== null,
          ),
        ),
      ]

      let totalScore = 0
      let staffCount = 0

      staffIds.forEach((staffId) => {
        // Get self and superior scores for each for this competency
        const selfScore =
          assessmentResult?.find(
            (i) =>
              i.assessment_id === latestAssessment?.assessment_id &&
              i.competency_id === comp.competency_id &&
              i.staff_id === staffId.staff_id &&
              i.staff_assessor_type === 'self',
          )?.assessment_result_score || 0

        const superiorScore =
          assessmentResult?.find(
            (i) =>
              i.assessment_id === latestAssessment?.assessment_id &&
              i.competency_id === comp.competency_id &&
              i.staff_id === staffId.staff_id &&
              i.staff_assessor_type === 'superior',
          )?.assessment_result_score || 0

        // Calculate weighted score for this staff
        const weightedScore = selfScore * 0.3 + superiorScore * 0.7

        // Add to the total score
        totalScore += weightedScore

        // Increment staff count
        staffCount = staffCount + 1
      })
      // Calculate the average score for this competency
      const averageCompetencyRating = staffCount > 0 ? (totalScore / staffCount).toFixed(2) : 0

      // Return the new competency object
      return {
        competencyname: comp.competency_name,
        competencytype: comp.cluster_name,
        competencyrating: averageCompetencyRating,
      }
    })

    // Sort the competency rating from highest to lowest
    const sortedNewCompetency = newCompetency.sort(
      (a, b) => b.competencyrating - a.competencyrating,
    )

    // set the competencylist with the newCompetency
    setcompetencylist(sortedNewCompetency)
  }, [assessmentResult, latestAssessment, selectedDepartment])

  if (
    loading.staff ||
    loading.cluster ||
    loading.assessment ||
    loading.assessmentResult ||
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
      <CCard className="m-2">
        <CCardHeader
        //style={{
        //  backgroundColor: `${selectedCompany.company_system_primary_color}`,
        //  color: 'ghostwhite',
        //}}
        >
          <CIcon icon={cilClipboard} /> DEPARTMENT SUMMARY
        </CCardHeader>
        <CCardBody>
          <CFormSelect className="mb-2" onChange={(e) => setSelectedDepartment(e.target.value)}>
            <option value="">...Select Department...</option>
            {department?.map((val, key) => (
              <option key={key} value={val.department_id}>
                {val.department_name}
              </option>
            ))}
          </CFormSelect>
          <CRow>
            <CCol md={6}>
              <CRow>
                <CCol md={12}>
                  <CCard className="mb-2">
                    <CCardBody>
                      <CCardTitle>
                        {
                          department?.find((i) => i.department_id.toString() === selectedDepartment)
                            ?.department_name
                        }
                      </CCardTitle>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <CRow>
                <CCol md={12}>
                  <CWidgetStatsF
                    className="mb-3"
                    color="primary"
                    icon={<CIcon icon={cilUser} height={24} />}
                    title="Number of Active Staff"
                    value={activeStaff.length}
                    style={{ maxHeight: '100%' }}
                  />
                </CCol>
                {/*<CCol md={6}>
                  <CWidgetStatsF
                    className="mb-3"
                    color="primary"
                    icon={<CIcon icon={cilUserPlus} height={24} />}
                    title="Number of Talent"
                    value="0"
                  />
                </CCol>*/}
              </CRow>
            </CCol>
            <CCol md={6}>
              <CCard>
                <CCardBody>
                  <CChart
                    type="bar"
                    data={{
                      labels: distinctGradeList,
                      datasets: [
                        {
                          label: 'Number of Staff By Job Grade',
                          backgroundColor: `${selectedCompany?.company_system_info_color}`,
                          data: gradeCount,
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
                            stepSize: 1,
                          },
                        },
                        y: {
                          grid: {
                            color: 'gray',
                          },
                          ticks: {
                            color: 'gray',
                            stepSize: 1,
                          },
                        },
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          {cluster?.map((val, key) => (
            <CRow className="mt-2" key={key}>
              <CCol md={12}>
                <CCard>
                  <CCardBody>
                    <CRow>
                      <CCol md={4}>
                        <CCardTitle>Average {val.cluster_name} Competency Score</CCardTitle>
                        <CButton
                          variant="outline"
                          color="dark"
                          style={{ width: '100%' }}
                          onClick={() => setVisible(val.cluster_id)}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <h5>
                            <b>{calculateOverallAverage(val.cluster_name)}</b>
                          </h5>
                          <h6>/5</h6>
                        </CButton>
                        <COffcanvas
                          placement="start"
                          style={{ width: '60%' }}
                          visible={visible === val.cluster_id ? true : false}
                          onHide={() => setVisible(null)}
                        >
                          <COffcanvasHeader>
                            <COffcanvasTitle>{val.cluster_name} Competency Score</COffcanvasTitle>
                            <CCloseButton className="text-reset" onClick={() => setVisible(null)} />
                          </COffcanvasHeader>
                          <COffcanvasBody>
                            <CRow>
                              <CCol md={12}>
                                <CCard>
                                  <CCardBody className="text-center">
                                    <h6>Score</h6>
                                    <CCardTitle>
                                      <b>{calculateOverallAverage(val.cluster_name)}</b>
                                    </CCardTitle>
                                  </CCardBody>
                                </CCard>
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol md={12}>
                                <CChart
                                  type="bar"
                                  data={{
                                    labels: competencylist
                                      ?.filter((i) => i.competencytype === val.cluster_name)
                                      .map((comp) => comp.competencyname),
                                    datasets: [
                                      {
                                        label: 'Overall Competency by Score',
                                        barThickness: 20,
                                        backgroundColor: `${selectedCompany?.company_system_info_color}`,
                                        data: competencylist
                                          ?.filter((i) => i.competencytype === val.cluster_name)
                                          .map((comp) => comp.competencyrating),
                                      },
                                    ],
                                  }}
                                  style={{ height: '100%' }}
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
                                        min: 0,
                                        max: 5,
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
                          </COffcanvasBody>
                        </COffcanvas>
                      </CCol>
                      <CCol md={8}>
                        <CChart
                          type="bar"
                          data={{
                            labels: competencylist
                              ?.filter((i) => i.competencytype === val.cluster_name)
                              .slice(0, 5)
                              .map((comp) => comp.competencyname),
                            datasets: [
                              {
                                label: 'Top 5 Competency by Score',
                                backgroundColor: `${selectedCompany?.company_system_info_color}`,
                                data: competencylist
                                  ?.filter((i) => i.competencytype === val.cluster_name)
                                  .slice(0, 5)
                                  .map((comp) => comp.competencyrating),
                              },
                            ],
                          }}
                          height={75}
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
                                min: 1,
                                max: 5,
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
          ))}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ReportDepartment2
