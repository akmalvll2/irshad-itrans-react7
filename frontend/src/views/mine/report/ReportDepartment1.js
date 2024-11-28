import React, { useState, useContext, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer'
import PropTypes from 'prop-types' // For prop validation
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CCol,
  CTableDataCell,
  CSpinner,
  CFormSelect,
  CAlert,
} from '@coreui/react'
import MyContext from '../data/MyContext'
import CIcon from '@coreui/icons-react'
import { cilAirplay, cilSave } from '@coreui/icons'

// Reusable Competency Table Component
const CompetencyTable = ({
  cluster,
  filteredCompetency,
  filteredStaff,
  assessmentresult,
  roundedResult,
}) => {
  if (!filteredStaff?.length || !filteredCompetency?.length) {
    return <CAlert color="info">No data available to display</CAlert>
  }

  return (
    <CTable small bordered responsive className="mt-2">
      {/* Table Header */}
      <CTableBody>
        <CTableRow>
          <CTableHeaderCell className="text-center align-middle text-dark">
            Group: <span className="text-info">{cluster?.cluster_name}</span>
          </CTableHeaderCell>
          {filteredStaff.map((val, key) => (
            <CTableHeaderCell
              key={key}
              className="text-uppercase bg-light"
              style={{ fontSize: '70%' }}
            >
              {val.staff_name} ({val.position_grade})
            </CTableHeaderCell>
          ))}
        </CTableRow>
      </CTableBody>
      {/* Table Body */}
      {filteredCompetency.map((comp, index) => (
        <CTableBody key={index}>
          <CTableRow>
            <CTableDataCell
              className="bg-light"
              style={{
                fontSize: '70%',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              {comp.competency_name}
            </CTableDataCell>
            {filteredStaff?.map((val, key) => {
              const totalscore = roundedResult(
                assessmentresult(val.staff_id, comp.competency_id, 'self').score * 0.3 +
                  assessmentresult(val.staff_id, comp.competency_id, 'superior').score * 0.7,
              )

              return (
                <CTableDataCell
                  key={key}
                  className="text-center align-middle"
                  style={{ fontSize: '70%' }}
                >
                  {totalscore ? <span>{totalscore}</span> : 'N/A'}
                </CTableDataCell>
              )
            })}
          </CTableRow>
        </CTableBody>
      ))}
    </CTable>
  )
}

// PropTypes validation for CompetencyTable
CompetencyTable.propTypes = {
  cluster: PropTypes.shape({
    cluster_name: PropTypes.string,
    cluster_id: PropTypes.number,
  }),
  filteredCompetency: PropTypes.arrayOf(
    PropTypes.shape({
      competency_id: PropTypes.number.isRequired,
      competency_name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  filteredStaff: PropTypes.arrayOf(
    PropTypes.shape({
      staff_id: PropTypes.number.isRequired,
      staff_name: PropTypes.string.isRequired,
      position_grade: PropTypes.string.isRequired,
    }),
  ).isRequired,
  assessmentresult: PropTypes.func.isRequired,
  roundedResult: PropTypes.func.isRequired,
}

const ReportDepartment1 = () => {
  const {
    staff,
    competency,
    positionCompetency,
    assessment,
    assessmentResult,
    cluster,
    department,
    loading,
  } = useContext(MyContext)

  const [selectedDepartment, setSelectedDepartment] = useState()
  const [selectedAssessment, setSelectedAssessment] = useState()
  const [filteredStaff, setFilteredStaff] = useState([])
  const [selectedCluster, setSelectedCluster] = useState()
  const [filteredCompetency, setFilteredCompetency] = useState([])

  const roundedResult = (data) => {
    return data !== null ? Number(data.toFixed(2)) : null
  }

  const assessmentresult = (staffid, competencyid, type) => {
    const result = assessmentResult?.find(
      (i) =>
        i.competency_id === competencyid &&
        i.staff_id === staffid &&
        i.assessment_id.toString() === selectedAssessment &&
        i.staff_assessor_type === type,
    )
    return result
      ? {
          score: result.assessment_result_score,
          message: result.assessment_result_message,
        }
      : { score: null, message: null }
  }

  // Filter staff by department
  useEffect(() => {
    if (selectedDepartment) {
      const departmentStaff = staff?.filter(
        (i) => i.department_id.toString() === selectedDepartment,
      )
      setFilteredStaff(departmentStaff)

      // Update filtered competencies
      const positionIds = departmentStaff?.map((s) => s.position_id)
      const competencyIds = positionCompetency
        ?.filter((pc) => positionIds.includes(pc.position_id))
        .map((pc) => pc.competency_id)
      setFilteredCompetency(competency?.filter((c) => competencyIds.includes(c.competency_id)))
    }
  }, [selectedDepartment, staff, positionCompetency, competency])

  if (
    loading.staff ||
    loading.competency ||
    loading.positionCompetency ||
    loading.assessment ||
    loading.assessmentResult ||
    loading.cluster ||
    loading.department
  ) {
    return <CSpinner />
  }

  // PDF Document
  const PDFDocument = () => (
    <Document>
      <Page size="A4" orientation="landscape" style={pdfStyles.page}>
        <Text style={pdfStyles.header}>Department Staff Competency Score Matrix</Text>
        <View style={pdfStyles.table}>
          {/* Header Row */}
          <View style={pdfStyles.row}>
            <Text style={[pdfStyles.cell, pdfStyles.headerCell]} flex={1.5}>
              Group: {cluster?.cluster_name || 'N/A'}
            </Text>
            {filteredStaff.map((staff, index) => (
              <Text
                key={index}
                style={[pdfStyles.cell, pdfStyles.headerCell]}
                flex={1}
                numberOfLines={1} // Prevent overflow
                wrap // Wrap long names to multiple lines
              >
                {staff.staff_name} ({staff.position_grade})
              </Text>
            ))}
          </View>

          {/* Competency Rows */}
          {filteredCompetency.map((comp, index) => (
            <View key={index} style={pdfStyles.row}>
              <Text style={[pdfStyles.cell, pdfStyles.bodyCell]} flex={1.5}>
                {comp.competency_name}
              </Text>
              {filteredStaff.map((staff) => {
                const totalscore = roundedResult(
                  assessmentresult(staff.staff_id, comp.competency_id, 'self').score * 0.3 +
                    assessmentresult(staff.staff_id, comp.competency_id, 'superior').score * 0.7,
                )
                return (
                  <Text key={staff.staff_id} style={[pdfStyles.cell, pdfStyles.bodyCell]} flex={1}>
                    {totalscore || 'N/A'}
                  </Text>
                )
              })}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )

  return (
    <>
      <CCard>
        <CCardHeader className="text-center">Department Staff Competency Score Matrix</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={3}>
              <CFormSelect size="sm" onChange={(e) => setSelectedAssessment(e.target.value)}>
                <option value="">..Choose Assessment..</option>
                {assessment?.map((val) => (
                  <option key={val.id} value={val.assessment_id}>
                    {val.assessment_name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CFormSelect size="sm" onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value="">..Choose Department..</option>
                {department?.map((val) => (
                  <option key={val.id} value={val.department_id}>
                    {val.department_name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CFormSelect size="sm" onChange={(e) => setSelectedCluster(e.target.value)}>
                <option value="">..Choose Group..</option>
                {cluster?.map((val, key) => (
                  <option key={key} value={val.cluster_id}>
                    {val.cluster_name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <PDFDownloadLink
                document={<PDFDocument />}
                fileName="Department_Staff_Competency_Matrix.pdf"
                className="btn btn-primary btn-sm float-end"
              >
                {({ loading }) => (loading ? 'Loading PDF...' : 'Save PDF')}
              </PDFDownloadLink>
            </CCol>
          </CRow>
          {/* Main Display Table */}
          {selectedAssessment && selectedDepartment && selectedCluster ? (
            <CompetencyTable
              cluster={cluster?.find((i) => i.cluster_id.toString() === selectedCluster)}
              filteredCompetency={filteredCompetency?.filter(
                (i) => i.cluster_id.toString() === selectedCluster,
              )}
              filteredStaff={filteredStaff}
              assessmentresult={assessmentresult}
              roundedResult={roundedResult}
            />
          ) : (
            <CAlert className="mt-2" color="info">
              Please choose the Assessment, Department, and Group to display the result
            </CAlert>
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

const pdfStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 8,
  },
  header: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: '100%',
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    paddingVertical: 5,
  },
  cell: {
    padding: 5,
    fontSize: 6,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
  },
  bodyCell: {
    fontSize: 6,
  },
})

export default ReportDepartment1
