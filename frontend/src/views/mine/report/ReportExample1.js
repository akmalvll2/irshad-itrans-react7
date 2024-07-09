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
} from '@coreui/react'

import { CChart } from '@coreui/react-chartjs'

import MyContext from '../data/MyContext'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilCheckAlt } from '@coreui/icons'

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
  const [selectedAssessment, setSelectedAssessment] = useState()
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
        i.staff_assessor_type === type &&
        i.assessment_id.toString() === selectedAssessment,
    )?.assessment_result_score
    return score
  }
  const recTrainingCore = competency
    .filter((i) => i.cluster_name === 'Core')
    .map((val) => ({
      competency_id: val.competency_id,
      competency: val.competency_name,
      nostaff: staff.filter((i) =>
        (positionCompetency.find(
          (u) => u.position_id === i.position_id && u.competency_id === val.competency_id,
        )?.position_competency_expected_level -
          score(i.staff_id, val.competency_id, 'self')) *
          0.3 +
          (positionCompetency.find(
            (u) => u.position_id === i.position_id && u.competency_id === val.competency_id,
          )?.position_competency_expected_level -
            score(i.staff_id, val.competency_id, 'superior')) *
            0.7 >
        1.5
          ? true
          : false,
      ).length,
    }))

  const recTrainingGeneric = competency
    .filter((i) => i.cluster_name === 'Generic')
    .map((val) => ({
      competency_id: val.competency_id,
      competency: val.competency_name,
      nostaff: staff.filter((i) =>
        (positionCompetency.find(
          (u) => u.position_id === i.position_id && u.competency_id === val.competency_id,
        )?.position_competency_expected_level -
          score(i.staff_id, val.competency_id, 'self')) *
          0.3 +
          (positionCompetency.find(
            (u) => u.position_id === i.position_id && u.competency_id === val.competency_id,
          )?.position_competency_expected_level -
            score(i.staff_id, val.competency_id, 'superior')) *
            0.7 >
        1.5
          ? true
          : false,
      ).length,
    }))

  const recTrainingFunctional = competency
    .filter((i) => i.cluster_name === 'Functional')
    .map((val) => ({
      competency_id: val.competency_id,
      competency: val.competency_name,
      nostaff: staff.filter((i) =>
        (positionCompetency.find(
          (u) => u.position_id === i.position_id && u.competency_id === val.competency_id,
        )?.position_competency_expected_level -
          score(i.staff_id, val.competency_id, 'self')) *
          0.3 +
          (positionCompetency.find(
            (u) => u.position_id === i.position_id && u.competency_id === val.competency_id,
          )?.position_competency_expected_level -
            score(i.staff_id, val.competency_id, 'superior')) *
            0.7 >
        1.5
          ? true
          : false,
      ).length,
    }))
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
      {/* CORE SECTION */}
      <CAlert color="secondary">
        <h6>Filter</h6>
        <CFormSelect onChange={(e) => setSelectedAssessment(e.target.value)}>
          <option value="">Assessment</option>
          {assessment?.map((val) => (
            <option value={val.assessment_id} key={val.assessment_id}>
              {val.assessment_name}
            </option>
          ))}
        </CFormSelect>
      </CAlert>
      <h6 className="text-center">RECOMMENDED TRAINING BASED ON COMPETENCY</h6>
      <CRow>
        <CCol md={12}>
          <CCard className="m-2">
            <CCardHeader>Recommended Training ( Group : CORE )</CCardHeader>
            <CRow>
              <CCol md={5} className="d-flex justify-content-center align-items-center">
                <CCardBody>
                  <CChart
                    type="bar"
                    data={{
                      labels: [...recTrainingCore]
                        .sort((a, b) => b.nostaff - a.nostaff)
                        .slice(0, 5)
                        .map((val) => val.competency),
                      datasets: [
                        {
                          label: 'Number of Staff to Attend',
                          backgroundColor: '#4F81BD',
                          data: [...recTrainingCore]
                            .sort((a, b) => b.nostaff - a.nostaff)
                            .slice(0, 5)
                            .map((val) => val.nostaff),
                        },
                      ],
                    }}
                    labels="months"
                    options={{
                      responsive: 'true',
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
              </CCol>
              <CCol md={7}>
                <CTable small responsive bordered className="m-0">
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell>Competency</CTableHeaderCell>
                      <CTableHeaderCell>Number of Staff to Attend</CTableHeaderCell>
                      <CTableHeaderCell></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {[...recTrainingCore]
                      .sort((a, b) => b.nostaff - a.nostaff)
                      .slice(0, 5)
                      .map((val) => (
                        <CTableRow key={val.id}>
                          <CTableDataCell>{val.competency}</CTableDataCell>
                          <CTableDataCell>
                            <CProgress value={val.nostaff}>{val.nostaff}</CProgress>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              size="sm"
                              color="link"
                              onClick={() => {
                                setVisible(true)
                                setSelectedCompetency(val.competency_id)
                              }}
                            >
                              View Details
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
          </CCard>
        </CCol>
      </CRow>
      {/* GENERIC SECTION */}
      <CRow>
        <CCol md={12}>
          <CCard className="m-2">
            <CCardHeader>Recommended Training ( Group : GENERIC )</CCardHeader>
            <CRow>
              <CCol md={5} className="d-flex justify-content-center align-items-center">
                <CCardBody>
                  <CChart
                    type="bar"
                    data={{
                      labels: [...recTrainingGeneric]
                        .sort((a, b) => b.nostaff - a.nostaff)
                        .slice(0, 5)
                        .map((val) => val.competency),
                      datasets: [
                        {
                          label: 'Number of Staff to Attend',
                          backgroundColor: '#4F81BD',
                          data: [...recTrainingGeneric]
                            .sort((a, b) => b.nostaff - a.nostaff)
                            .slice(0, 5)
                            .map((val) => val.nostaff),
                        },
                      ],
                    }}
                    labels="months"
                    options={{
                      responsive: 'true',
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
              </CCol>
              <CCol md={7}>
                <CTable small responsive bordered className="m-0">
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell>Competency</CTableHeaderCell>
                      <CTableHeaderCell>Number of Staff to Attend</CTableHeaderCell>
                      <CTableHeaderCell></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {[...recTrainingGeneric]
                      .sort((a, b) => b.nostaff - a.nostaff)
                      .slice(0, 5)
                      .map((val) => (
                        <CTableRow key={val.id}>
                          <CTableDataCell>{val.competency}</CTableDataCell>
                          <CTableDataCell>
                            <CProgress value={val.nostaff}>{val.nostaff}</CProgress>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              size="sm"
                              color="link"
                              onClick={() => {
                                setVisible(true)
                                setSelectedCompetency(val.competency_id)
                              }}
                            >
                              View Details
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
          </CCard>
        </CCol>
      </CRow>
      {/* FUNCTIONAL SECTION */}
      <CRow>
        <CCol md={12}>
          <CCard className="m-2">
            <CCardHeader>Recommended Training ( Group : FUNCTIONAL )</CCardHeader>
            <CRow>
              <CCol md={5} className="d-flex justify-content-center align-items-center">
                <CCardBody>
                  <CChart
                    type="bar"
                    data={{
                      labels: [...recTrainingFunctional]
                        .sort((a, b) => b.nostaff - a.nostaff)
                        .slice(0, 5)
                        .map((val) => val.competency),
                      datasets: [
                        {
                          label: 'Number of Staff to Attend',
                          backgroundColor: '#4F81BD',
                          data: [...recTrainingFunctional]
                            .sort((a, b) => b.nostaff - a.nostaff)
                            .slice(0, 5)
                            .map((val) => val.nostaff),
                        },
                      ],
                    }}
                    labels="months"
                    options={{
                      responsive: 'true',
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
              </CCol>
              <CCol md={7}>
                <CTable small responsive bordered className="m-0">
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell>Competency</CTableHeaderCell>
                      <CTableHeaderCell>Number of Staff to Attend</CTableHeaderCell>
                      <CTableHeaderCell></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {[...recTrainingFunctional]
                      .sort((a, b) => b.nostaff - a.nostaff)
                      .slice(0, 5)
                      .map((val) => (
                        <CTableRow key={val.id}>
                          <CTableDataCell>{val.competency}</CTableDataCell>
                          <CTableDataCell>
                            <CProgress value={val.nostaff}>{val.nostaff}</CProgress>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              size="sm"
                              color="link"
                              onClick={() => {
                                setVisible(true)
                                setSelectedCompetency(val.competency_id)
                              }}
                            >
                              View Details
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
          </CCard>
        </CCol>
      </CRow>
      {/* LIST OF STAFF */}
      <CModal
        size="lg"
        backdrop="static"
        visible={visible}
        onClose={() => {
          setVisible(false)
          setSelectedCompetency('')
        }}
      >
        <CModalHeader>
          <CModalTitle>
            Training :{' '}
            {competency.find((i) => i.competency_id === selectedCompetency)?.competency_name}
          </CModalTitle>
        </CModalHeader>
        <CTable small responsive className="m-0">
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell>No</CTableHeaderCell>
              <CTableHeaderCell>Staff</CTableHeaderCell>
              <CTableHeaderCell>Position</CTableHeaderCell>
              <CTableHeaderCell>Department</CTableHeaderCell>
              <CTableHeaderCell>Competency Score</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {staff
              .filter((i) =>
                (positionCompetency.find(
                  (u) => u.position_id === i.position_id && u.competency_id === selectedCompetency,
                )?.position_competency_expected_level -
                  score(i.staff_id, selectedCompetency, 'self')) *
                  0.3 +
                  (positionCompetency.find(
                    (u) =>
                      u.position_id === i.position_id && u.competency_id === selectedCompetency,
                  )?.position_competency_expected_level -
                    score(i.staff_id, selectedCompetency, 'superior')) *
                    0.7 >
                1.5
                  ? true
                  : false,
              )
              .map((val, id) => (
                <CTableRow key={id}>
                  <CTableDataCell>{id + 1}</CTableDataCell>
                  <CTableDataCell>{val.staff_name}</CTableDataCell>
                  <CTableDataCell>{val.position_name}</CTableDataCell>
                  <CTableDataCell>{val.department_name}</CTableDataCell>
                  <CTableDataCell>
                    {roundedResult(
                      (positionCompetency.find(
                        (u) =>
                          u.position_id === val.position_id &&
                          u.competency_id === selectedCompetency,
                      )?.position_competency_expected_level -
                        score(val.staff_id, selectedCompetency, 'self')) *
                        0.3 +
                        (positionCompetency.find(
                          (u) =>
                            u.position_id === val.position_id &&
                            u.competency_id === selectedCompetency,
                        )?.position_competency_expected_level -
                          score(val.staff_id, selectedCompetency, 'superior')) *
                          0.7,
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))}
          </CTableBody>
        </CTable>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ReportTable1
