import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { usePDF } from 'react-to-pdf'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormSelect,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CAlert,
  CBadge,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCardHeader,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CAvatar,
  CButtonGroup,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilFile } from '@coreui/icons'

const AssessmentResultDetail = ({
  visible,
  setVisible,
  stafflist,
  jobcompetency,
  assessmentresultlist,
  assessmentid,
  assessors,
  selectedStaff,
}) => {
  const selectedStaffData = stafflist.find((i) => i.staff_id === selectedStaff)
  const { toPDF, targetRef } = usePDF({
    filename: `Assessment_Result_${selectedStaffData?.staff_name}.pdf`,
  })

  const roundedResult = (data) => {
    var res
    data ? (res = Number(data.toFixed(2))) : (res = null)
    return res
  }

  const assessmentResult = (competencyid, type) => {
    const result = assessmentresultlist.find(
      (i) =>
        i.competency_id === competencyid &&
        i.staff_id === selectedStaff &&
        i.staff_assessor_type === type,
    )?.assessment_result_score
    return result
  }
  return (
    <>
      <CModal
        backdrop="static"
        size="xl"
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
      >
        <CModalHeader>
          <CModalTitle>Assessment Result Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CAlert color="secondary">
            <h6 className="float-start">Action</h6>
            <hr />
            <CButtonGroup>
              <CButton size="sm" color="secondary" variant="outline" onClick={() => toPDF()}>
                Save PDF <CIcon icon={cilFile} />
              </CButton>
            </CButtonGroup>
          </CAlert>
          <CAlert color="info" ref={targetRef}>
            <h6 className="float-start">Staff Details</h6>
            <hr />
            <CRow>
              <CCol md={2}>
                <CAvatar src={selectedStaffData?.staff_image} size="xl" />
              </CCol>
              <CCol md={10}>
                <div>Name: {selectedStaffData?.staff_name}</div>
                <div>Position: {selectedStaffData?.position_name}</div>
                <div>Department: {selectedStaffData?.department_name}</div>
              </CCol>
            </CRow>
            <br />
            <h6 className="float-start">Result Details</h6>
            <hr />
            <CTable small responsive bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell rowSpan={3}>Competency</CTableHeaderCell>
                  <CTableHeaderCell rowSpan={3}>Expected Level</CTableHeaderCell>
                  <CTableHeaderCell colSpan={7} className="text-center">
                    Result Summary
                  </CTableHeaderCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell colSpan={3}>Self</CTableHeaderCell>
                  <CTableHeaderCell colSpan={3}>Superior</CTableHeaderCell>
                  <CTableHeaderCell rowSpan={2}>Total Average</CTableHeaderCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Score</CTableHeaderCell>
                  <CTableHeaderCell>Gap</CTableHeaderCell>
                  <CTableHeaderCell>30%</CTableHeaderCell>
                  <CTableHeaderCell>Score</CTableHeaderCell>
                  <CTableHeaderCell>Gap</CTableHeaderCell>
                  <CTableHeaderCell>70%</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {jobcompetency
                  .filter((i) => i.position_id === selectedStaffData?.position_id)
                  .map((val) => (
                    <CTableRow key={val.competency_id}>
                      <CTableDataCell>{val.competency_name}</CTableDataCell>
                      <CTableDataCell>{val.position_competency_expected_level}</CTableDataCell>
                      <CTableDataCell className=" text-info">
                        {assessmentResult(val.competency_id, 'self') ? (
                          assessmentResult(val.competency_id, 'self')
                        ) : (
                          <span className="text-danger">Incomplete</span>
                        )}
                      </CTableDataCell>
                      <CTableDataCell className=" text-info">
                        {assessmentResult(val.competency_id, 'self') ? (
                          val.position_competency_expected_level -
                          assessmentResult(val.competency_id, 'self')
                        ) : (
                          <span className="text-danger">Incomplete</span>
                        )}
                      </CTableDataCell>
                      <CTableDataCell className=" text-info">
                        {assessmentResult(val.competency_id, 'self') ? (
                          roundedResult(
                            (val.position_competency_expected_level -
                              assessmentResult(val.competency_id, 'self')) *
                              0.3,
                          )
                        ) : (
                          <span className="text-danger">Incomplete</span>
                        )}
                      </CTableDataCell>
                      <CTableDataCell className=" text-info">
                        {assessmentResult(val.competency_id, 'superior') ? (
                          assessmentResult(val.competency_id, 'superior')
                        ) : (
                          <span className="text-danger">Incomplete</span>
                        )}
                      </CTableDataCell>
                      <CTableDataCell className=" text-info">
                        {assessmentResult(val.competency_id, 'superior') ? (
                          val.position_competency_expected_level -
                          assessmentResult(val.competency_id, 'superior')
                        ) : (
                          <span className="text-danger">Incomplete</span>
                        )}
                      </CTableDataCell>
                      <CTableDataCell className=" text-info">
                        {assessmentResult(val.competency_id, 'superior') ? (
                          roundedResult(
                            (val.position_competency_expected_level -
                              assessmentResult(val.competency_id, 'superior')) *
                              0.7,
                          )
                        ) : (
                          <span className="text-danger">Incomplete</span>
                        )}
                      </CTableDataCell>
                      <CTableDataCell className=" text-info">
                        {roundedResult(
                          assessmentResult(val.competency_id, 'self') &&
                            assessmentResult(val.competency_id, 'superior') ? (
                            (val.position_competency_expected_level -
                              assessmentResult(val.competency_id, 'self')) *
                              0.3 +
                              (val.position_competency_expected_level -
                                assessmentResult(val.competency_id, 'superior')) *
                                0.7
                          ) : assessmentResult(val.competency_id, 'self') ? (
                            val.position_competency_expected_level -
                            assessmentResult(val.competency_id, 'self')
                          ) : assessmentResult(val.competency_id, 'superior') ? (
                            val.position_competency_expected_level -
                            assessmentResult(val.competency_id, 'superior')
                          ) : (
                            <span className="text-danger">Incomplete</span>
                          ),
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          </CAlert>
        </CModalBody>
        <CModalFooter>
          <CButton
            size="sm"
            color="secondary"
            onClick={() => {
              setVisible(false)
            }}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

AssessmentResultDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  stafflist: PropTypes.array.isRequired,
  jobcompetency: PropTypes.array,
  assessmentresultlist: PropTypes.array.isRequired,
  assessmentid: PropTypes.number,
  assessors: PropTypes.array.isRequired,
  selectedStaff: PropTypes.number,
}

export default AssessmentResultDetail
