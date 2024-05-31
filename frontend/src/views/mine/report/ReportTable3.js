import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
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
  CCardSubtitle,
  CCardText,
} from '@coreui/react'

import { CChart } from '@coreui/react-chartjs'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilCheckAlt } from '@coreui/icons'

const ReportTable3 = ({
  stafflist,
  departmentlist,
  positionlist,
  jobcompetency,
  clusterlist,
  assessmentlist,
  assessmentresult,
  competencylist,
}) => {
  const [activeKey, setActiveKey] = useState(1)

  // FILTER USESTATE
  const [assessment, setAssessment] = useState()
  const [group, setGroup] = useState()
  const [department, setDepartment] = useState()

  // ROUNDED RESULT
  const roundedNumber = (num) => {
    const fixNum = parseFloat(num)
    return fixNum.toFixed(1)
  }

  const assessmentResult = (staff_id, competencyid, type) => {
    const result = assessmentresult.find(
      (i) =>
        i.competency_id === competencyid &&
        i.staff_id === staff_id &&
        i.staff_assessor_type === type,
    )?.assessment_result_score
    return result
  }

  const [topfivecomparr1, settopfivecomparr1] = useState([])
  const [topfivecomparr2, settopfivecomparr2] = useState([])
  const [topfivecomparr3, settopfivecomparr3] = useState([])

  const topfivecompetencies1 = topfivecomparr1.sort((a, b) => b.score - a.score).slice(0, 5)
  const topfivecompetencies2 = topfivecomparr2.sort((a, b) => b.score - a.score).slice(0, 5)
  const topfivecompetencies3 = topfivecomparr3.sort((a, b) => b.score - a.score).slice(0, 5)
  useEffect(() => {
    const updateCompetencyList1 = competencylist.map((i) => ({
      competency: i.competency_name,
      score: stafflist.filter((u) =>
        assessmentResult(u.staff_id, i.competency_id, 'self') * 0.3 +
          assessmentResult(u.staff_id, i.competency_id, 'superior') * 0.7 >
        0
          ? true
          : false,
      ).length,
    }))
    settopfivecomparr1(updateCompetencyList1)

    const updateCompetencyList2 = competencylist.map((i) => ({
      competency: i.competency_name,
      score: stafflist.filter((u) =>
        assessmentResult(u.staff_id, i.competency_id, 'self') > 0 ? true : false,
      ).length,
    }))
    settopfivecomparr2(updateCompetencyList2)
    const updateCompetencyList3 = competencylist.map((i) => ({
      competency: i.competency_name,
      score: stafflist.filter((u) =>
        assessmentResult(u.staff_id, i.competency_id, 'superior') > 0 ? true : false,
      ).length,
    }))
    settopfivecomparr3(updateCompetencyList3)
  }, [competencylist])
  return (
    <>
      <CCard>
        <CCardHeader
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'navy',
          }}
          className="text-center"
        >
          <h6>REPORT AND ANALYSIS</h6>
        </CCardHeader>
      </CCard>
      <CRow>
        {/* Training with highest number of staff to attend */}
        <CCol md={4}>
          <CCard className="my-2">
            <CCardHeader>Competency with High Gap Rating ( Overall )</CCardHeader>
            <CCardBody>
              <CChart
                type="bar"
                data={{
                  labels: topfivecompetencies1.map((i) => i.competency),
                  datasets: [
                    {
                      label: 'Number of Staff',
                      backgroundColor: '#4F81BD',
                      data: topfivecompetencies1.map((i) => i.score),
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
                        color: 'whitesmoke',
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
        <CCol md={4}>
          <CCard className="my-2">
            <CCardHeader>Competency with High Gap Rating ( Self )</CCardHeader>
            <CCardBody>
              <CChart
                type="bar"
                data={{
                  labels: topfivecompetencies2.map((i) => i.competency),
                  datasets: [
                    {
                      label: 'Number of Staff',
                      backgroundColor: '#4F81BD',
                      data: topfivecompetencies2.map((i) => i.score),
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
                        color: 'whitesmoke',
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
        <CCol md={4}>
          <CCard className="my-2">
            <CCardHeader>Competency with High Gap Rating ( Superior )</CCardHeader>
            <CCardBody>
              <CChart
                type="bar"
                data={{
                  labels: topfivecompetencies3.map((i) => i.competency),
                  datasets: [
                    {
                      label: 'Number of Staff',
                      backgroundColor: '#4F81BD',
                      data: topfivecompetencies3.map((i) => i.score),
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
                        color: 'whitesmoke',
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
      {/* 5 staff with high gap rating */}
      <CRow>
        <CCol>
          <CCard className="my-2">
            <CCardHeader>Staff with High Gap Rating</CCardHeader>
            <CTable small responsive className="m-0">
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell>Staff</CTableHeaderCell>
                  <CTableHeaderCell>Competency</CTableHeaderCell>
                  <CTableHeaderCell>Average Gap</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>SYAHZANA BINTI MOHD MARZUKI</CTableDataCell>
                  <CTableDataCell>Server Management</CTableDataCell>
                  <CTableDataCell>3</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

// PROPS VALIDATION
ReportTable3.propTypes = {
  stafflist: PropTypes.array.isRequired,
  departmentlist: PropTypes.array.isRequired,
  positionlist: PropTypes.array.isRequired,
  jobcompetency: PropTypes.array.isRequired,
  clusterlist: PropTypes.array.isRequired,
  assessmentlist: PropTypes.array.isRequired,
  assessmentresult: PropTypes.array.isRequired,
  competencylist: PropTypes.array.isRequired,
}

export default ReportTable3
